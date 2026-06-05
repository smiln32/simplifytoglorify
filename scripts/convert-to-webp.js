import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const publicDir = path.join(__dirname, '../public/images');

const images = fs.readdirSync(publicDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

(async () => {
  for (const file of images) {
    const input = path.join(publicDir, file);
    const output = path.join(publicDir, file.replace(/\.(png|jpg|jpeg)$/, '.webp'));
    const before = fs.statSync(input).size;
    await sharp(input).webp({ quality: 82 }).toFile(output);
    const after = fs.statSync(output).size;
    const saved = Math.round((1 - after / before) * 100);
    console.log(`${file} → ${path.basename(output)}  ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB  (-${saved}%)`);
  }
  console.log(`\nDone. Converted ${images.length} files.`);
})();
