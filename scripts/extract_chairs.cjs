const sharp = require('sharp');
const fs = require('fs');

async function extractChairs() {
  const inputFile = 'public/assets/aistudio/WhatsApp_Image_2026-11-08_at_11.01.19_PM_69258729.jpg';
  const { data, info } = await sharp(inputFile).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  fs.mkdirSync('public/assets/decorations', { recursive: true });
  fs.mkdirSync('dist/assets/decorations', { recursive: true });

  // 1. LEFT CHAIR: crop approx [20, 1220] to [375, 1960]
  // Let's find tight bounding box for the front-left chair
  const leftX1 = 20, leftX2 = 380, leftY1 = 1220, leftY2 = 1960;
  const leftW = leftX2 - leftX1;
  const leftH = leftY2 - leftY1;
  const leftRgba = Buffer.alloc(leftW * leftH * 4);

  for (let y = 0; y < leftH; y++) {
    for (let x = 0; x < leftW; x++) {
      const srcX = leftX1 + x;
      const srcY = leftY1 + y;
      const srcIdx = (srcY * w + srcX) * 3;
      const r = data[srcIdx], g = data[srcIdx + 1], b = data[srcIdx + 2];
      const dstIdx = (y * leftW + x) * 4;

      // Check if white background
      const minVal = Math.min(r, g, b);
      const isWhite = r > 242 && g > 242 && b > 242;

      leftRgba[dstIdx] = r;
      leftRgba[dstIdx + 1] = g;
      leftRgba[dstIdx + 2] = b;

      if (isWhite) {
        leftRgba[dstIdx + 3] = 0;
      } else if (minVal > 225) {
        // Soft feather edge
        const alpha = Math.max(0, Math.min(255, Math.floor((245 - minVal) * 12.75)));
        leftRgba[dstIdx + 3] = alpha;
      } else {
        leftRgba[dstIdx + 3] = 255;
      }
    }
  }

  // 2. RIGHT CHAIR: crop approx [520, 1220] to [980, 1960]
  const rightX1 = 520, rightX2 = 985, rightY1 = 1220, rightY2 = 1960;
  const rightW = rightX2 - rightX1;
  const rightH = rightY2 - rightY1;
  const rightRgba = Buffer.alloc(rightW * rightH * 4);

  for (let y = 0; y < rightH; y++) {
    for (let x = 0; x < rightW; x++) {
      const srcX = rightX1 + x;
      const srcY = rightY1 + y;
      const srcIdx = (srcY * w + srcX) * 3;
      const r = data[srcIdx], g = data[srcIdx + 1], b = data[srcIdx + 2];
      const dstIdx = (y * rightW + x) * 4;

      const minVal = Math.min(r, g, b);
      const isWhite = r > 242 && g > 242 && b > 242;

      rightRgba[dstIdx] = r;
      rightRgba[dstIdx + 1] = g;
      rightRgba[dstIdx + 2] = b;

      if (isWhite) {
        rightRgba[dstIdx + 3] = 0;
      } else if (minVal > 225) {
        const alpha = Math.max(0, Math.min(255, Math.floor((245 - minVal) * 12.75)));
        rightRgba[dstIdx + 3] = alpha;
      } else {
        rightRgba[dstIdx + 3] = 255;
      }
    }
  }

  // Save left chair
  await sharp(leftRgba, { raw: { width: leftW, height: leftH, channels: 4 } })
    .png()
    .toFile('public/assets/decorations/red_bistro_chair_left.png');
  fs.copyFileSync(
    'public/assets/decorations/red_bistro_chair_left.png',
    'dist/assets/decorations/red_bistro_chair_left.png'
  );

  // Save right chair
  await sharp(rightRgba, { raw: { width: rightW, height: rightH, channels: 4 } })
    .png()
    .toFile('public/assets/decorations/red_bistro_chair_right.png');
  fs.copyFileSync(
    'public/assets/decorations/red_bistro_chair_right.png',
    'dist/assets/decorations/red_bistro_chair_right.png'
  );

  console.log('Chairs extracted successfully!');
  console.log('Left chair:', leftW, 'x', leftH);
  console.log('Right chair:', rightW, 'x', rightH);
}

extractChairs().catch(console.error);
