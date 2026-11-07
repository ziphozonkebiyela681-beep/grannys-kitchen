const sharp = require('sharp');
const fs = require('fs');

// Helper: Color distance
function colorDist(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

async function carveMinceKota() {
  console.log('Processing Mince Kota...');
  const inputPath = 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_5.11.37_PM_54db3e3e.jpg';
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Mask: 0 = transparent, 255 = foreground
  const mask = new Uint8Array(w * h);

  // Mince Kota plate bottom rim:
  // Center is approx (960, 1100).
  // Ellipse approximation for lower plate boundary:
  // Center: (960, 850), rx = 780, ry = 255 (so at x=960, y = 850 + 255 = 1105).
  // At x = 200: (200-960)^2 / 780^2 = 0.949 => dy = 255 * sqrt(1 - 0.949) = 57 => y = 907. Fits sampled rim points!

  // Flood fill from border for background
  const isBg = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let qHead = 0, qTail = 0;

  // Background criteria:
  // Above the plate rim (or anywhere outside the plate ellipse):
  // Near-white or grey shadow
  function checkBgPixel(x, y) {
    const idx = (y * w + x) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const sat = maxC - minC;

    // Check if below lower plate boundary
    // Ellipse test for lower boundary:
    const dx = (x - 960) / 780;
    const dyRel = (y - 850) / 255;
    const isBelowPlateRim = (y >= 850 && (dx * dx + dyRel * dyRel) >= 1.0);

    if (isBelowPlateRim) {
      // Anything below the plate rim is definitely background/shadow!
      return true;
    }

    // Left or right beyond plate rim
    if (x < 175 || x > 1745) {
      return true;
    }

    // Above the bread top (y < 210)
    if (y < 210) {
      return true;
    }

    // Top background regions (y < 700):
    // Studio white background is near neutral and bright
    if (y < 700) {
      if (minC > 220 && sat < 25) {
        return true;
      }
      if (minC > 240 && sat < 35) {
        return true;
      }
    }

    // Sides of the bread (between y=210 and y=700, x outside bread bounds):
    if (y < 700) {
      // Bread is roughly between x=520 and x=1240
      if ((x < 510 || x > 1250) && minC > 205 && sat < 30) {
        return true;
      }
    }

    return false;
  }

  // Seed borders
  for (let x = 0; x < w; x++) {
    queue[qTail++] = (0 * w + x);
    queue[qTail++] = ((h - 1) * w + x);
    isBg[0 * w + x] = 1;
    isBg[(h - 1) * w + x] = 1;
  }
  for (let y = 0; y < h; y++) {
    queue[qTail++] = (y * w + 0);
    queue[qTail++] = (y * w + (w - 1));
    isBg[y * w + 0] = 1;
    isBg[y * w + (w - 1)] = 1;
  }

  while (qHead < qTail) {
    const pos = queue[qHead++];
    const x = pos % w;
    const y = Math.floor(pos / w);

    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
    ];

    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nPos = ny * w + nx;
        if (!isBg[nPos]) {
          if (checkBgPixel(nx, ny)) {
            isBg[nPos] = 1;
            queue[qTail++] = nPos;
          }
        }
      }
    }
  }

  // Build foreground mask
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pos = y * w + x;
      if (!isBg[pos]) {
        mask[pos] = 255;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Mince Kota bounding box: [${minX}, ${minY}, ${maxX}, ${maxY}]`);

  // Pad bounding box
  const pad = 12;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(w, maxX + pad) - cropX;
  const cropH = Math.min(h, maxY + pad) - cropY;

  // Create RGBA buffer with defringing & edge smoothing
  const outBuf = Buffer.alloc(cropW * cropH * 4);

  // Smooth mask using simple 3x3 box blur for 1-pixel feathering
  for (let cy = 0; cy < cropH; cy++) {
    const srcY = cropY + cy;
    for (let cx = 0; cx < cropW; cx++) {
      const srcX = cropX + cx;
      const srcPos = srcY * w + srcX;
      const outIdx = (cy * cropW + cx) * 4;

      // Check 3x3 neighborhood in mask
      let sum = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const sy = Math.min(h - 1, Math.max(0, srcY + dy));
          const sx = Math.min(w - 1, Math.max(0, srcX + dx));
          sum += mask[sy * w + sx];
        }
      }
      const alpha = Math.round(sum / 9);

      if (alpha > 0) {
        const srcIdx = srcPos * 3;
        outBuf[outIdx] = data[srcIdx];
        outBuf[outIdx + 1] = data[srcIdx + 1];
        outBuf[outIdx + 2] = data[srcIdx + 2];
        outBuf[outIdx + 3] = alpha;
      } else {
        outBuf[outIdx + 3] = 0;
      }
    }
  }

  await sharp(outBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile('public/assets/plates/mince_kota_plate.png');

  console.log('Saved public/assets/plates/mince_kota_plate.png');
}

async function carveSupremeKota() {
  console.log('Processing Supreme Kota...');
  const inputPath = 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_5.11.37_PM__1__f7faaf51.jpg';
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  const mask = new Uint8Array(w * h);
  const isBg = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let qHead = 0, qTail = 0;

  // Supreme Kota plate bottom rim:
  // Center approx: (640, 1378).
  // Ellipse approximation for lower plate boundary:
  // Center: (640, 1140), rx = 600, ry = 238 => at x=640, y = 1140 + 238 = 1378.
  // At x=50: dx = (50-640)/600 = -0.983 => dy = 238 * sqrt(1 - 0.983^2) = 43 => y = 1183. Matches sampled rim!

  function checkBgPixel(x, y) {
    const idx = (y * w + x) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const sat = maxC - minC;

    // Below plate rim:
    const dx = (x - 640) / 605;
    const dyRel = (y - 1140) / 238;
    const isBelowPlateRim = (y >= 1140 && (dx * dx + dyRel * dyRel) >= 1.0);

    if (isBelowPlateRim) {
      return true;
    }

    // Left or right beyond plate / sausage rim
    if (x < 15 || x > 1255) {
      return true;
    }

    // Above the bread top (y < 660)
    if (y < 660) {
      return true;
    }

    // Background above plate (y < 1140)
    if (y < 1140) {
      if (minC > 215 && sat < 30) {
        return true;
      }
      if (minC > 240) {
        return true;
      }
    }

    return false;
  }

  // Seed borders
  for (let x = 0; x < w; x++) {
    queue[qTail++] = (0 * w + x);
    queue[qTail++] = ((h - 1) * w + x);
    isBg[0 * w + x] = 1;
    isBg[(h - 1) * w + x] = 1;
  }
  for (let y = 0; y < h; y++) {
    queue[qTail++] = (y * w + 0);
    queue[qTail++] = (y * w + (w - 1));
    isBg[y * w + 0] = 1;
    isBg[y * w + (w - 1)] = 1;
  }

  while (qHead < qTail) {
    const pos = queue[qHead++];
    const x = pos % w;
    const y = Math.floor(pos / w);

    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
    ];

    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nPos = ny * w + nx;
        if (!isBg[nPos]) {
          if (checkBgPixel(nx, ny)) {
            isBg[nPos] = 1;
            queue[qTail++] = nPos;
          }
        }
      }
    }
  }

  // Build foreground mask
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pos = y * w + x;
      if (!isBg[pos]) {
        mask[pos] = 255;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Supreme Kota bounding box: [${minX}, ${minY}, ${maxX}, ${maxY}]`);

  const pad = 12;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(w, maxX + pad) - cropX;
  const cropH = Math.min(h, maxY + pad) - cropY;

  const outBuf = Buffer.alloc(cropW * cropH * 4);

  for (let cy = 0; cy < cropH; cy++) {
    const srcY = cropY + cy;
    for (let cx = 0; cx < cropW; cx++) {
      const srcX = cropX + cx;
      const srcPos = srcY * w + srcX;
      const outIdx = (cy * cropW + cx) * 4;

      let sum = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const sy = Math.min(h - 1, Math.max(0, srcY + dy));
          const sx = Math.min(w - 1, Math.max(0, srcX + dx));
          sum += mask[sy * w + sx];
        }
      }
      const alpha = Math.round(sum / 9);

      if (alpha > 0) {
        const srcIdx = srcPos * 3;
        outBuf[outIdx] = data[srcIdx];
        outBuf[outIdx + 1] = data[srcIdx + 1];
        outBuf[outIdx + 2] = data[srcIdx + 2];
        outBuf[outIdx + 3] = alpha;
      } else {
        outBuf[outIdx + 3] = 0;
      }
    }
  }

  await sharp(outBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile('public/assets/plates/supreme_kota_plate.png');

  console.log('Saved public/assets/plates/supreme_kota_plate.png');
}

async function carveAmagwinya() {
  console.log('Processing Amagwinya...');
  const inputPath = 'src/assets/images/amagwinya_isolated_1794065524491.jpg';
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  const mask = new Uint8Array(w * h);
  const isBg = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let qHead = 0, qTail = 0;

  // Amagwinya plate bottom rim:
  // Center is approx (512, 770).
  // Ellipse approximation for lower plate boundary:
  // Center: (512, 550), rx = 420, ry = 225 => at x=512, y = 550 + 225 = 775.
  function checkBgPixel(x, y) {
    const idx = (y * w + x) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const sat = maxC - minC;

    // Below plate rim:
    const dx = (x - 512) / 420;
    const dyRel = (y - 550) / 225;
    const isBelowPlateRim = (y >= 550 && (dx * dx + dyRel * dyRel) >= 1.0);

    if (isBelowPlateRim) {
      return true;
    }

    // Left or right beyond plate rim
    if (x < 90 || x > 934) {
      return true;
    }

    // Above top dough (y < 255)
    if (y < 255) {
      return true;
    }

    // Background around the plate (y < 550)
    if (y < 550) {
      if (minC > 215 && sat < 30) {
        return true;
      }
      if (minC > 235) {
        return true;
      }
    }

    return false;
  }

  // Seed borders
  for (let x = 0; x < w; x++) {
    queue[qTail++] = (0 * w + x);
    queue[qTail++] = ((h - 1) * w + x);
    isBg[0 * w + x] = 1;
    isBg[(h - 1) * w + x] = 1;
  }
  for (let y = 0; y < h; y++) {
    queue[qTail++] = (y * w + 0);
    queue[qTail++] = (y * w + (w - 1));
    isBg[y * w + 0] = 1;
    isBg[y * w + (w - 1)] = 1;
  }

  while (qHead < qTail) {
    const pos = queue[qHead++];
    const x = pos % w;
    const y = Math.floor(pos / w);

    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
    ];

    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nPos = ny * w + nx;
        if (!isBg[nPos]) {
          if (checkBgPixel(nx, ny)) {
            isBg[nPos] = 1;
            queue[qTail++] = nPos;
          }
        }
      }
    }
  }

  // Build foreground mask
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pos = y * w + x;
      if (!isBg[pos]) {
        mask[pos] = 255;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Amagwinya bounding box: [${minX}, ${minY}, ${maxX}, ${maxY}]`);

  const pad = 12;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(w, maxX + pad) - cropX;
  const cropH = Math.min(h, maxY + pad) - cropY;

  const outBuf = Buffer.alloc(cropW * cropH * 4);

  for (let cy = 0; cy < cropH; cy++) {
    const srcY = cropY + cy;
    for (let cx = 0; cx < cropW; cx++) {
      const srcX = cropX + cx;
      const srcPos = srcY * w + srcX;
      const outIdx = (cy * cropW + cx) * 4;

      let sum = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const sy = Math.min(h - 1, Math.max(0, srcY + dy));
          const sx = Math.min(w - 1, Math.max(0, srcX + dx));
          sum += mask[sy * w + sx];
        }
      }
      const alpha = Math.round(sum / 9);

      if (alpha > 0) {
        const srcIdx = srcPos * 3;
        outBuf[outIdx] = data[srcIdx];
        outBuf[outIdx + 1] = data[srcIdx + 1];
        outBuf[outIdx + 2] = data[srcIdx + 2];
        outBuf[outIdx + 3] = alpha;
      } else {
        outBuf[outIdx + 3] = 0;
      }
    }
  }

  await sharp(outBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile('public/assets/plates/amagwinya_plate.png');

  console.log('Saved public/assets/plates/amagwinya_plate.png');
}

async function run() {
  await carveMinceKota();
  await carveSupremeKota();
  await carveAmagwinya();
  console.log('All 3 plates carved successfully!');
}

run().catch(console.error);
