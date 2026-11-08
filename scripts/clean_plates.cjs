const sharp = require('sharp');
const fs = require('fs');

async function cleanOnlyMainComponent(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const rgba = Buffer.from(data);

  // 1. Identify all non-transparent pixels
  const isOpaque = (x, y) => rgba[(y * width + x) * 4 + 3] > 0;

  // 2. Connected-component labeling on opaque pixels
  const labels = new Int32Array(width * height);
  const compSizes = [0]; // label 0 = background
  let currentLabel = 0;

  // Queues for BFS
  const qx = new Int32Array(width * height);
  const qy = new Int32Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (isOpaque(x, y) && labels[idx] === 0) {
        currentLabel++;
        let compSize = 0;
        let head = 0, tail = 0;

        labels[idx] = currentLabel;
        qx[tail] = x;
        qy[tail] = y;
        tail++;

        while (head < tail) {
          const cx = qx[head];
          const cy = qy[head];
          head++;
          compSize++;

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
              const nIdx = ny * width + nx;
              if (isOpaque(nx, ny) && labels[nIdx] === 0) {
                labels[nIdx] = currentLabel;
                qx[tail] = nx;
                qy[tail] = ny;
                tail++;
              }
            }
          }
        }
        compSizes.push(compSize);
      }
    }
  }

  // Find label with largest size (the bowl)
  let maxLabel = 1;
  let maxSize = 0;
  for (let l = 1; l <= currentLabel; l++) {
    if (compSizes[l] > maxSize) {
      maxSize = compSizes[l];
      maxLabel = l;
    }
  }
  console.log(`${file}: found ${currentLabel} components, largest is ${maxSize} px`);

  // Zero out all components except the main bowl
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (labels[idx] !== maxLabel) {
        rgba[idx * 4 + 3] = 0;
      }
    }
  }

  // Also remove any stray pixels in bottom 15% that have high brightness/low saturation
  for (let y = Math.floor(height * 0.88); y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (rgba[idx + 3] > 0) {
        const r = rgba[idx], g = rgba[idx + 1], b = rgba[idx + 2];
        const spread = Math.max(r, g, b) - Math.min(r, g, b);
        if (spread < 22 && r > 120) {
          rgba[idx + 3] = 0;
        }
      }
    }
  }

  // Re-run connected component to trim any newly severed pixels
  const labels2 = new Int32Array(width * height);
  const compSizes2 = [0];
  let currentLabel2 = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (rgba[idx * 4 + 3] > 0 && labels2[idx] === 0) {
        currentLabel2++;
        let compSize = 0;
        let head = 0, tail = 0;

        labels2[idx] = currentLabel2;
        qx[tail] = x;
        qy[tail] = y;
        tail++;

        while (head < tail) {
          const cx = qx[head];
          const cy = qy[head];
          head++;
          compSize++;

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
              const nIdx = ny * width + nx;
              if (rgba[nIdx * 4 + 3] > 0 && labels2[nIdx] === 0) {
                labels2[nIdx] = currentLabel2;
                qx[tail] = nx;
                qy[tail] = ny;
                tail++;
              }
            }
          }
        }
        compSizes2.push(compSize);
      }
    }
  }

  let maxLabel2 = 1, maxSize2 = 0;
  for (let l = 1; l <= currentLabel2; l++) {
    if (compSizes2[l] > maxSize2) {
      maxSize2 = compSizes2[l];
      maxLabel2 = l;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (labels2[idx] !== maxLabel2) {
        rgba[idx * 4 + 3] = 0;
      }
    }
  }

  // Find tight bounding box
  let minX = width, maxX = 0, minY = height, maxY = 0;
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

  console.log(`Cleaned final ${file}: [${minX}, ${minY}, ${maxX}, ${maxY}], w=${cropW}, h=${cropH}`);

  await sharp(rgba, {
    raw: { width, height, channels: 4 }
  })
    .extract({ left: minX, top: minY, width: cropW, height: cropH })
    .png()
    .toFile(file);

  const distFile = file.replace('public/', 'dist/');
  fs.copyFileSync(file, distFile);
}

async function run() {
  await cleanOnlyMainComponent('public/assets/plates/coleslaw_plate.png');
  await cleanOnlyMainComponent('public/assets/plates/green_salad_plate.png');
}

run().catch(console.error);
