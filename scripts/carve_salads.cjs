const sharp = require('sharp');
const fs = require('fs');

async function carveSalads() {
  console.log('Processing Salads from WhatsApp_Image_2026-11-07_at_3.52.46_PM_4efd8ff1.jpeg...');
  const inputPath = 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.52.46_PM_4efd8ff1.jpeg';
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // 1. CARVE LEFT BOWL: COLESLAW
  {
    console.log('Carving Left Bowl: Coleslaw...');
    const mask = new Uint8Array(w * h);
    const isBg = new Uint8Array(w * h);
    const queue = new Int32Array(w * h);
    let qHead = 0, qTail = 0;

    // Center approx: (308, 785)
    // Left bowl is contained strictly in x in [25, 585], y in [530, 1040]
    function isLeftBg(x, y) {
      if (x < 28 || x > 584 || y < 535 || y > 1038) return true;

      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];

      // Wood table conditions:
      if (r > 80 && r > g + 22 && g > b + 10) return true;
      if (y > 1025 && r < 45 && g < 35 && b < 30) return true; // contact shadow
      if (y < 570 && r > 100 && r > g + 15) return true; // wood behind rim

      // Outside bowl ellipse test:
      // Approximate bowl shape:
      // Top rim ellipse: center (308, 595), rx=265, ry=68
      // Bottom base ellipse: center (308, 1010), rx=180, ry=38
      // For any y < 595:
      if (y < 595) {
        const dx = (x - 308) / 265;
        const dy = (y - 595) / 68;
        if (dx * dx + dy * dy > 1.0) return true;
      }
      // For any y > 1010:
      if (y > 1010) {
        const dx = (x - 308) / 185;
        const dy = (y - 1010) / 36;
        if (dx * dx + dy * dy > 1.0) return true;
      }

      return false;
    }

    // Seed outer boundary of Left region
    for (let x = 0; x <= 600; x++) {
      isBg[0 * w + x] = 1; queue[qTail++] = (0 * w + x);
      isBg[(h - 1) * w + x] = 1; queue[qTail++] = ((h - 1) * w + x);
    }
    for (let y = 0; y < h; y++) {
      isBg[y * w + 0] = 1; queue[qTail++] = (y * w + 0);
      isBg[y * w + 600] = 1; queue[qTail++] = (y * w + 600);
    }

    while (qHead < qTail) {
      const pos = queue[qHead++];
      const x = pos % w;
      const y = Math.floor(pos / w);
      const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];

      for (let i = 0; i < 4; i++) {
        const nx = neighbors[i][0], ny = neighbors[i][1];
        if (nx >= 0 && nx <= 600 && ny >= 0 && ny < h) {
          const nPos = ny * w + nx;
          if (!isBg[nPos] && isLeftBg(nx, ny)) {
            isBg[nPos] = 1;
            queue[qTail++] = nPos;
          }
        }
      }
    }

    let minX = w, maxX = 0, minY = h, maxY = 0;
    for (let y = 500; y < 1100; y++) {
      for (let x = 20; x < 600; x++) {
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

    console.log(`Coleslaw bowl bounds: [${minX}, ${minY}, ${maxX}, ${maxY}]`);

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
        }
      }
    }

    // Defringe brown wood table contamination at edges
    for (let i = 0; i < outBuf.length; i += 4) {
      const a = outBuf[i + 3];
      if (a > 0 && a < 220) {
        const r = outBuf[i], g = outBuf[i + 1], b = outBuf[i + 2];
        // If it's warm brown wood tone
        if (r > 70 && r > g + 20 && g > b + 10) {
          outBuf[i + 3] = 0;
        }
      }
    }

    await sharp(outBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
      .png()
      .toFile('public/assets/plates/coleslaw_plate.png');

    console.log('Saved public/assets/plates/coleslaw_plate.png');
  }

  // 2. CARVE RIGHT BOWL: GREEN SALAD
  {
    console.log('Carving Right Bowl: Green Salad...');
    const mask = new Uint8Array(w * h);
    const isBg = new Uint8Array(w * h);
    const queue = new Int32Array(w * h);
    let qHead = 0, qTail = 0;

    // Center approx: (895, 785)
    // Right bowl is contained strictly in x in [615, 1175], y in [515, 1040]
    function isRightBg(x, y) {
      if (x < 614 || x > 1175 || y < 515 || y > 1038) return true;

      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];

      if (r > 80 && r > g + 22 && g > b + 10) return true;
      if (y > 1025 && r < 45 && g < 35 && b < 30) return true;
      if (y < 560 && r > 100 && r > g + 15) return true;

      // Top rim ellipse: center (895, 590), rx=272, ry=72
      if (y < 590) {
        const dx = (x - 895) / 272;
        const dy = (y - 590) / 72;
        if (dx * dx + dy * dy > 1.0) return true;
      }
      // Bottom base ellipse: center (895, 1010), rx=185, ry=36
      if (y > 1010) {
        const dx = (x - 895) / 185;
        const dy = (y - 1010) / 36;
        if (dx * dx + dy * dy > 1.0) return true;
      }

      return false;
    }

    for (let x = 600; x < w; x++) {
      isBg[0 * w + x] = 1; queue[qTail++] = (0 * w + x);
      isBg[(h - 1) * w + x] = 1; queue[qTail++] = ((h - 1) * w + x);
    }
    for (let y = 0; y < h; y++) {
      isBg[y * w + 600] = 1; queue[qTail++] = (y * w + 600);
      isBg[y * w + (w - 1)] = 1; queue[qTail++] = (y * w + (w - 1));
    }

    while (qHead < qTail) {
      const pos = queue[qHead++];
      const x = pos % w;
      const y = Math.floor(pos / w);
      const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];

      for (let i = 0; i < 4; i++) {
        const nx = neighbors[i][0], ny = neighbors[i][1];
        if (nx >= 600 && nx < w && ny >= 0 && ny < h) {
          const nPos = ny * w + nx;
          if (!isBg[nPos] && isRightBg(nx, ny)) {
            isBg[nPos] = 1;
            queue[qTail++] = nPos;
          }
        }
      }
    }

    let minX = w, maxX = 0, minY = h, maxY = 0;
    for (let y = 500; y < 1100; y++) {
      for (let x = 600; x < w; x++) {
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

    console.log(`Green Salad bowl bounds: [${minX}, ${minY}, ${maxX}, ${maxY}]`);

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
        }
      }
    }

    for (let i = 0; i < outBuf.length; i += 4) {
      const a = outBuf[i + 3];
      if (a > 0 && a < 220) {
        const r = outBuf[i], g = outBuf[i + 1], b = outBuf[i + 2];
        if (r > 70 && r > g + 20 && g > b + 10) {
          outBuf[i + 3] = 0;
        }
      }
    }

    await sharp(outBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
      .png()
      .toFile('public/assets/plates/green_salad_plate.png');

    console.log('Saved public/assets/plates/green_salad_plate.png');
  }

  console.log('Both salad bowls carved and defringed successfully!');
}

carveSalads().catch(console.error);
