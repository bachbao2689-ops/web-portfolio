import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Preserve the source boards; web exports only resize/compress or crop a cover.
const root = 'Project IMG Port';
const audit = 'tmp/asset-audit';
const manifest = {};
async function asset(slug, name, source, crop) {
  const dir = `public/projects/${slug}`;
  await fs.mkdir(dir, { recursive: true });
  let image = sharp(source);
  if (crop) image = image.extract(crop);
  const output = `${dir}/${name}.webp`;
  await image.resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 88 }).toFile(output);
  const { width, height } = await sharp(output).metadata();
  manifest[`${slug}/${name}`] = { src: `/projects/${slug}/${name}.webp`, width, height };
}
await asset('nestle-ptit', 'overview', `${audit}/behance-03.png`);
await asset('nestle-ptit', 'cover', `${audit}/behance-03.png`, { left: 429, top: 78, width: 902, height: 632 });
for (const [name, n] of [['packaging', 4], ['motion', 5], ['social', 6]]) await asset('nestle-ptit', name, `${audit}/behance-0${n}.png`);
for (const [slug, folder, files] of [
  ['milo-erun', 'Milo', [['overview', 'Documentation.png'], ['print', 'In ấn.png'], ['social', 'Social.png']]],
  ['skinology', 'Cosmetic', [['overview', 'Documentation.png'], ['stopmotion', 'Stopmotion.png'], ['lifestyle', 'life style.png'], ['steps', 'Step.png']]],
  ['ecommerce', 'Ecom', [['overview', 'Documentation.png'], ...[1,2,3,4,5].map(n => [`board-${n}`, `${n}.png`])]],
  ['amazon', 'Ecom', [['overview', '6.png']]],
  ['gerber', 'Doc img', [['overview', 'Documentation.png'], ['packaging', 'Packaging.png'], ['social', 'Social media.png']]],
  ['maggi', 'Maggi', [['overview', 'Documentation.png'], ['cover', 'MAIN KV.png'], ['social', 'Social media.png'], ['food-process', 'Artboard 1.png'], ['food-final', 'Artboard 1 copy.png'], ['banner', '1200x391.png'], ...[1,2,3,4].map(n=>[`voucher-${n}`,`voucher ${n}.png`])]],
]) for (const [name, file] of files) await asset(slug, name, path.join(root, folder, file));
await asset('milo-erun', 'elements', `${root}/Maggi/visual element.png`);
await asset('milo-erun', 'cover', `${root}/Milo/Documentation.png`, { left: 560, top: 0, width: 1488, height: 1452 });
await asset('skinology', 'cover', `${root}/Cosmetic/Documentation.png`, { left: 0, top: 190, width: 2048, height: 750 });
await asset('ecommerce', 'cover', `${root}/Ecom/2.png`);
await asset('amazon', 'cover', `${audit}/behance-15.png`, { left: 449, top: 109, width: 862, height: 570 });
await asset('amazon', 'detail', `${audit}/behance-15.png`);
await asset('gerber', 'cover', `${root}/Doc img/Documentation.png`, { left: 1090, top: 130, width: 958, height: 1080 });
const ganh = (await fs.readdir(audit)).find(name => name.normalize('NFD').startsWith('Gá'));
for (const n of [1,2,4,5,6,7,8,9,10,11,12,18,20,21]) await asset('ganh-hoi', `page-${n}`, `${audit}/${ganh}/page-${String(n).padStart(2,'0')}.jpg`);
await fs.writeFile('src/data/project-assets.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Prepared ${Object.keys(manifest).length} web assets.`);
