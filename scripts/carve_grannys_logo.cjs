const sharp = require('sharp');
const fs = require('fs');

async function carveLogo() {
  fs.mkdirSync('public/assets/logos', { recursive: true });
  fs.mkdirSync('dist/assets/logos', { recursive: true });

  const inputPath = 'public/assets/aistudio/WhatsApp_Image_2026-11-08_at_8.18.59_PM_e2383ac4.jpg';
  const outputPath = 'public/assets/logos/grannys_kitchen_logo.png';
  const distPath = 'dist/assets/logos/grannys_kitchen_logo.png';

  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Background is pure/near white
  const isBg = (x, y) => {
    const idx = (y * width + x) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    return r > 230 && g > 230 && b > 230;
  };

  const visited = new Uint8Array(width * height);
  const queueX = new Int32Array(width * height);
  const queueY = new Int32Array(width * height);
  let head = 0, tail = 0;

  for (let x = 0; x < width; x++) {
    if (isBg(x, 0)) {
      visited[x] = 1; queueX[tail] = x; queueY[tail] = 0; tail++;
    }
    const bIdx = (height - 1) * width + x;
    if (isBg(x, height - 1)) {
      visited[bIdx] = 1; queueX[tail] = x; queueY[tail] = height - 1; tail++;
    }
  }

  for (let y = 0; y < height; y++) {
    const lIdx = y * width;
    if (isBg(0, y) && !visited[lIdx]) {
      visited[lIdx] = 1; queueX[tail] = 0; queueY[tail] = y; tail++;
    }
    const rIdx = y * width + (width - 1);
    if (isBg(width - 1, y) && !visited[rIdx]) {
      visited[rIdx] = 1; queueX[tail] = width - 1; queueY[tail] = y; tail++;
    }
  }

  while (head < tail) {
    const cx = queueX[head]; const cy = queueY[head]; head++;
    const neighbors = [[cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]];
    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0]; const ny = neighbors[i][1];
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const idx = ny * width + nx;
        if (!visited[idx] && isBg(nx, ny)) {
          visited[idx] = 1; queueX[tail] = nx; queueY[tail] = ny; tail++;
        }
      }
    }
  }

  const rgba = Buffer.alloc(width * height * 4);
  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIdx = y * width + x;
      const srcIdx = pIdx * 3;
      const destIdx = pIdx * 4;

      if (visited[pIdx]) {
        rgba[destIdx] = 0;
        rgba[destIdx + 1] = 0;
        rgba[destIdx + 2] = 0;
        rgba[destIdx + 3] = 0;
      } else {
        rgba[destIdx] = data[srcIdx];
        rgba[destIdx + 1] = data[srcIdx + 1];
        rgba[destIdx + 2] = data[srcIdx + 2];
        rgba[destIdx + 3] = 255;

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Defringe white border
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const idx = (y * width + x) * 4;
      if (rgba[idx + 3] === 255) {
        let hasTrans = false;
        if (x > 0 && rgba[idx - 4 + 3] === 0) hasTrans = true;
        else if (x < width - 1 && rgba[idx + 4 + 3] === 0) hasTrans = true;
        else if (y > 0 && rgba[((y - 1) * width + x) * 4 + 3] === 0) hasTrans = true;
        else if (y < height - 1 && rgba[((y + 1) * width + x) * 4 + 3] === 0) hasTrans = true;

        if (hasTrans) {
          const r = rgba[idx], g = rgba[idx + 1], b = rgba[idx + 2];
          if (r > 215 && g > 215 && b > 215) {
            rgba[idx + 3] = 0;
          }
        }
      }
    }
  }

  // Recompute bounding box
  minX = width; maxX = 0; minY = height; maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  console.log(`Carved logo: [${minX}, ${minY}, ${maxX}, ${maxY}], w=${cropW}, h=${cropH}`);

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: cropW, height: cropH })
    .png()
    .toFile(outputPath);

  fs.copyFileSync(outputPath, distPath);
  console.log('Saved logo to public and dist successfully!');
}

carveLogo().catch(console.error);
