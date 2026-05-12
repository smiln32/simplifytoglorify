import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync, readFileSync } from 'fs';
import { join, extname } from 'path';

const dir = new URL('../public/images', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const MAX_DIM = 1600;

const files = readdirSync(dir).filter(f => /\.(png|jpe?g)$/i.test(f));

for (const file of files) {
  const path = join(dir, file);
  const ext = extname(file).toLowerCase();
  const before = statSync(path).size;

  try {
    const inputBuf = readFileSync(path);
    let pipeline = sharp(inputBuf, { failOnError: false })
      .rotate()
      .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true });

    const buf = ext === '.png'
      ? await pipeline.png({ compressionLevel: 9, effort: 10 }).toBuffer()
      : await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();

    if (buf.length < before) {
      writeFileSync(path, buf);
      console.log(`✓ ${file}: ${Math.round(before / 1024)}KB → ${Math.round(buf.length / 1024)}KB`);
    } else {
      console.log(`= ${file}: already optimal (${Math.round(before / 1024)}KB)`);
    }
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`);
  }
}

console.log('\nDone.');
