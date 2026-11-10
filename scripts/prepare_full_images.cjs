const fs = require('fs');
const sharp = require('sharp');

async function prepareFullImages() {
  fs.mkdirSync('public/assets/menu_full', { recursive: true });
  fs.mkdirSync('dist/assets/menu_full', { recursive: true });

  const map = {
    'beef_stew.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.58.19_PM_d7e9ae89.jpeg',
    'lamb_curry.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.52.48_PM__1__f2f6b225.jpeg',
    'chicken_stew.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.52.47_PM__1__9ea896a4.jpeg',
    'chicken_dust_chips.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.52.47_PM__5__ba40e9f5.jpeg',
    'chicken_dust_pap.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_4.54.47_PM__1__c1f56598.jpeg',
    'chips_small.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_4.33.05_PM_b5169993.jpeg',
    'chips_medium.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_4.33.05_PM__2__35f1e8a0.jpeg',
    'chips_large.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_4.33.05_PM__1__cbe283c3.jpeg',
    'fish_and_chips.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_4.33.04_PM_6ab93bf2.jpeg',
    'mince_kota.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_5.11.37_PM_54db3e3e.jpg',
    'supreme_kota.jpg': 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_5.11.37_PM__1__f7faaf51.jpg',
    'amagwinya.jpg': 'src/assets/images/amagwinya_plate_1794161792481.jpg'
  };

  for (const [target, source] of Object.entries(map)) {
    const destPub = 'public/assets/menu_full/' + target;
    const destDist = 'dist/assets/menu_full/' + target;
    fs.copyFileSync(source, destPub);
    fs.copyFileSync(source, destDist);
    console.log(`Copied ${source} -> ${destPub}`);
  }

  // Also extract Coleslaw and Green Salad with full natural background
  const saladImg = 'public/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.52.46_PM_4efd8ff1.jpeg';
  await sharp(saladImg)
    .extract({ left: 0, top: 400, width: 620, height: 750 })
    .jpeg({ quality: 92 })
    .toFile('public/assets/menu_full/coleslaw.jpg');
  fs.copyFileSync('public/assets/menu_full/coleslaw.jpg', 'dist/assets/menu_full/coleslaw.jpg');

  await sharp(saladImg)
    .extract({ left: 580, top: 400, width: 627, height: 750 })
    .jpeg({ quality: 92 })
    .toFile('public/assets/menu_full/green_salad.jpg');
  fs.copyFileSync('public/assets/menu_full/green_salad.jpg', 'dist/assets/menu_full/green_salad.jpg');

  console.log('All full images prepared successfully with authentic backgrounds!');
}

prepareFullImages().catch(console.error);
