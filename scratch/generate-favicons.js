const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="roseBrand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e" />
      <stop offset="100%" stop-color="#be123c" />
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#roseBrand)" />
  <g transform="translate(26.6, 26.6) scale(3.11)">
    <path fill="#ffffff" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </g>
</svg>`;

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'app');

  // 1. Write SVG to public and app
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent, 'utf8');
  fs.writeFileSync(path.join(appDir, 'apple-icon.svg'), svgContent, 'utf8');

  // 2. Convert to PNG using sharp
  const svgBuffer = Buffer.from(svgContent);

  // 32x32 favicon.png
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  // 16x16 favicon-16x16.png
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  // 180x180 apple-touch-icon.png
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // 192x192 icon-192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  // 512x512 icon-512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  // Generate favicon.ico (using 32x32 png as fallback standard ico buffer)
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), png32);

  console.log('Successfully generated all favicons and touch icons!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
