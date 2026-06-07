// Generates public/me.png — a DUMMY monogram avatar (placeholder, not a real
// photo). Replace public/me.png with a real headshot, or set profile.photo to
// '/your-photo.jpg' in src/data/cv.ts. Run: node scripts/gen-avatar.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="55%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="#0a0e1a"/>
  <rect x="16" y="16" width="368" height="368" rx="72" fill="url(#g)"/>
  <text x="200" y="212" font-family="sans-serif" font-weight="700" font-size="168"
    fill="#ffffff" text-anchor="middle" dominant-baseline="central">DS</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL('../public/me.png', import.meta.url), png);
console.log('wrote public/me.png —', png.length, 'bytes');
