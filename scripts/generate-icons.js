import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, '../public/STG-logo-transparent.png');
const out = join(__dirname, '../public');

const bg = { r: 255, g: 255, b: 255, alpha: 1 };

async function make(size, filename, transparent = false) {
  const img = sharp(src).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  if (!transparent) {
    await img.flatten({ background: bg }).png().toFile(join(out, filename));
  } else {
    await img.png().toFile(join(out, filename));
  }
  console.log(`✓ ${filename} (${size}x${size})`);
}

// Generate a simple ICO by creating a 32x32 PNG (browsers accept .ico as PNG)
async function makeIco() {
  await sharp(src)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: bg })
    .png()
    .toFile(join(out, 'favicon.ico'));
  console.log('✓ favicon.ico (32x32)');
}

(async () => {
  await make(180, 'apple-touch-icon.png');
  await make(192, 'icon-192.png', true);
  await make(512, 'icon-512.png', true);
  await makeIco();
  console.log('\nAll icons generated.');
})().catch(console.error);
