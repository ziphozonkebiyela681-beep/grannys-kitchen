const sharp = require('sharp');
const fs = require('fs');

async function processCloth() {
  fs.mkdirSync('public/assets/patterns', { recursive: true });
  fs.mkdirSync('dist/assets/patterns', { recursive: true });
  fs.mkdirSync('public/assets/plates', { recursive: true });
  fs.mkdirSync('dist/assets/plates', { recursive: true });

  const clothSource = 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_6.05.31_PM_7c44e7c1.jpg';
  await sharp(clothSource)
    .jpeg({ quality: 92 })
    .toFile('public/assets/patterns/clothy_checkered_pattern.jpg');

  fs.copyFileSync(
    'public/assets/patterns/clothy_checkered_pattern.jpg',
    'dist/assets/patterns/clothy_checkered_pattern.jpg'
  );
  console.log('Saved cloth pattern to public and dist');
}

async function carveSalad(inputFile, outputFile, distFile, maxBottomY) {
  const { data, info } = await sharp(inputFile).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const isBackground = (x, y) => {
    // Anything strictly below the bowl base is shadow/floor
    if (y > maxBottomY) return true;

    const idx = (y * width + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    // Studio white background: very bright
    if (r > 215 && g > 215 && b > 215) return true;

    // Neutral gray shadow: any shadow outside the bowl
    // Cast shadow is achromatic (max difference between RGB is low)
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    if (r > 120 && g > 120 && b > 120 && maxDiff <= 25) {
      // If below mid-height or near bottom/right where cast shadow falls
      if (y > height * 0.55) {
        return true;
      }
      if (r > 180 && maxDiff <= 20) {
        return true;
      }
    }

    return false;
  };

  // Connected flood-fill from all 4 borders
  const visited = new Uint8Array(width * height);
  const queueX = new Int32Array(width * height);
  const queueY = new Int32Array(width * height);
  let head = 0, tail = 0;

  for (let x = 0; x < width; x++) {
    if (isBackground(x, 0)) {
      visited[x] = 1;
      queueX[tail] = x;
      queueY[tail] = 0;
      tail++;
    }
    const bIdx = (height - 1) * width + x;
    if (isBackground(x, height - 1)) {
      visited[bIdx] = 1;
      queueX[tail] = x;
      queueY[tail] = height - 1;
      tail++;
    }
  }

  for (let y = 0; y < height; y++) {
    const lIdx = y * width;
    if (isBackground(0, y) && !visited[lIdx]) {
      visited[lIdx] = 1;
      queueX[tail] = 0;
      queueY[tail] = y;
      tail++;
    }
    const rIdx = y * width + (width - 1);
    if (isBackground(width - 1, y) && !visited[rIdx]) {
      visited[rIdx] = 1;
      queueX[tail] = width - 1;
      queueY[tail] = y;
      tail++;
    }
  }

  while (head < tail) {
    const cx = queueX[head];
    const cy = queueY[head];
    head++;

    const neighbors = [
      [cx - 1, cy],
      [cx + 1, cy],
      [cx, cy - 1],
      [cx, cy + 1]
    ];

    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const idx = ny * width + nx;
        if (!visited[idx] && isBackground(nx, ny)) {
          visited[idx] = 1;
          queueX[tail] = nx;
          queueY[tail] = ny;
          tail++;
        }
      }
    }
  }

  // Create RGBA image
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
      const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

      // Extra check: any unvisited pixel in the bottom half that is clearly neutral shadow
      const isResidualShadow = y > height * 0.58 && r > 125 && g > 125 && b > 125 && maxDiff <= 22 && (g - r < 18) && (b - r < 18);

      if (visited[pIdx] || isResidualShadow) {
        rgba[destIdx] = 0;
        rgba[destIdx + 1] = 0;
        rgba[destIdx + 2] = 0;
        rgba[destIdx + 3] = 0;
      } else {
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

  // Defringe 1-2px border to eliminate light/gray halo
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
          const r = rgba[idx];
          const g = rgba[idx + 1];
          const b = rgba[idx + 2];
          const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
          if (r > 175 && g > 175 && b > 175 && maxDiff <= 25) {
            rgba[idx + 3] = 0;
          }
        }
      }
    }
  }

  // Recompute bounding box after defringe
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

  console.log(`Carved clean ${outputFile}: [${minX}, ${minY}, ${maxX}, ${maxY}], w=${cropW}, h=${cropH}`);

  await sharp(rgba, {
    raw: { width, height, channels: 4 }
  })
    .extract({ left: minX, top: minY, width: cropW, height: cropH })
    .png()
    .toFile(outputFile);

  fs.copyFileSync(outputFile, distFile);
}

async function run() {
  await processCloth();
  await carveSalad(
    'src/assets/images/coleslaw_bowl_1794068009917.jpg',
    'public/assets/plates/coleslaw_plate.png',
    'dist/assets/plates/coleslaw_plate.png',
    872
  );
  await carveSalad(
    'src/assets/images/green_salad_bowl_1794068010082.jpg',
    'public/assets/plates/green_salad_plate.png',
    'dist/assets/plates/green_salad_plate.png',
    862
  );
  console.log('Finished clean carve!');
}

run().catch(console.error);
