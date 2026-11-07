const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Ensure directories
fs.mkdirSync('public/assets/patterns', { recursive: true });
fs.mkdirSync('dist/assets/patterns', { recursive: true });

// 1. Process and save cloth pattern
async function processCloth() {
  const clothSource = 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_6.05.31_PM_7c44e7c1.jpg';
  await sharp(clothSource)
    .jpeg({ quality: 90 })
    .toFile('public/assets/patterns/clothy_checkered_pattern.jpg');

  fs.copyFileSync(
    'public/assets/patterns/clothy_checkered_pattern.jpg',
    'dist/assets/patterns/clothy_checkered_pattern.jpg'
  );
  console.log('Saved clothy_checkered_pattern.jpg successfully');
}

// 2. Carve a bowl on white/light background cleanly
async function carveBowl(inputPath, outputPath, distPath) {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Let's create an alpha mask using flood-fill from edges
  // Background is light/white (R > 220, G > 220, B > 220) and soft shadow (R > 180, G > 180, B > 180 with low saturation |R-G| < 20, |G-B| < 20)
  // The bowl has rich teal/turquoise ceramic colors (high saturation, blue/green > red) and warm terracotta rim (red > green + 30).
  const isBgCandidate = (x, y) => {
    const idx = (y * width + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    // Very bright near-white
    if (r > 225 && g > 225 && b > 225) return true;

    // Neutral gray shadow outside the bowl
    // Soft shadow on white: R, G, B are similar and > 175
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    if (r > 170 && g > 170 && b > 170 && maxDiff <= 25) {
      // Check if this pixel is outside the main bowl region
      // Bowl is centered roughly (x: 100..924, y: 150..880)
      return true;
    }
    return false;
  };

  // BFS flood-fill from borders
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height * 2);
  let qHead = 0;
  let qTail = 0;

  function pushQ(x, y) {
    const idx = y * width + x;
    if (!visited[idx]) {
      visited[idx] = 1;
      queue[qTail++] = x;
      queue[qTail++] = y;
    }
  }

  // Seed with all borders
  for (let x = 0; x < width; x++) {
    if (isBgCandidate(x, 0)) pushQ(x, 0);
    if (isBgCandidate(x, height - 1)) pushQ(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    if (isBgCandidate(0, y)) pushQ(0, y);
    if (isBgCandidate(width - 1, y)) pushQ(width - 1, y);
  }

  while (qHead < qTail) {
    const cx = queue[qHead++];
    const cy = queue[qHead++];

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx] && isBgCandidate(nx, ny)) {
          visited[nIdx] = 1;
          queue[qTail++] = nx;
          queue[qTail++] = ny;
        }
      }
    }
  }

  // Now create RGBA buffer
  const rgba = Buffer.alloc(width * height * 4);
  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIdx = y * width + x;
      const srcIdx = pIdx * 3;
      const destIdx = pIdx * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      if (visited[pIdx]) {
        rgba[destIdx] = 0;
        rgba[destIdx + 1] = 0;
        rgba[destIdx + 2] = 0;
        rgba[destIdx + 3] = 0;
      } else {
        // Foreground bowl pixel
        rgba[destIdx] = r;
        rgba[destIdx + 1] = g;
        rgba[destIdx + 2] = b;
        rgba[destIdx + 3] = 255;

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Carved ${path.basename(outputPath)}: bbox [${minX}, ${minY}, ${maxX}, ${maxY}], w: ${maxX - minX + 1}, h: ${maxY - minY + 1}`);

  // Defringe 1-2 px at edge if it has a white halo (r>215 && g>215 && b>215)
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const idx = (y * width + x) * 4;
      if (rgba[idx + 3] === 255) {
        // Check if neighbor is transparent
        let hasTransNeighbor = false;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              if (rgba[(ny * width + nx) * 4 + 3] === 0) {
                hasTransNeighbor = true;
                break;
              }
            }
          }
          if (hasTransNeighbor) break;
        }

        if (hasTransNeighbor) {
          const r = rgba[idx];
          const g = rgba[idx + 1];
          const b = rgba[idx + 2];
          // If outer border pixel is near white/light gray halo, make transparent
          if (r > 200 && g > 200 && b > 200) {
            rgba[idx + 3] = 0;
          }
        }
      }
    }
  }

  // Crop to bounding box
  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  await sharp(rgba, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
    .extract({ left: minX, top: minY, width: cropW, height: cropH })
    .png()
    .toFile(outputPath);

  fs.copyFileSync(outputPath, distPath);
  console.log(`Saved ${outputPath} and copied to ${distPath}`);
}

async function main() {
  await processCloth();
  await carveBowl(
    'src/assets/images/coleslaw_bowl_1794068009917.jpg',
    'public/assets/plates/coleslaw_plate.png',
    'dist/assets/plates/coleslaw_plate.png'
  );
  await carveBowl(
    'src/assets/images/green_salad_bowl_1794068010082.jpg',
    'public/assets/plates/green_salad_plate.png',
    'dist/assets/plates/green_salad_plate.png'
  );
}

main().catch(console.error);
