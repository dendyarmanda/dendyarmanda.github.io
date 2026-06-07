// Generates public/og.png (1200x630) — the social share card.
// Run: node scripts/gen-og.mjs   (re-run if name/role/tags change)
// Uses sharp (already a dependency of Astro) to rasterize an SVG → PNG,
// so social scrapers (LinkedIn/WhatsApp/X) get a real raster image.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="18%" cy="12%" r="65%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="88%" cy="92%" r="60%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="name" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="55%" stop-color="#a5f3fc"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0a0e1a"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#1e293b" stroke-width="2"/>

  <text x="82" y="118" font-family="monospace" font-size="26" letter-spacing="4" fill="#67e8f9">BANKING SOFTWARE ENGINEER</text>

  <text x="76" y="250" font-family="sans-serif" font-weight="700" font-size="104" fill="url(#name)">Dendy Septian</text>
  <text x="76" y="360" font-family="sans-serif" font-weight="700" font-size="104" fill="url(#name)">Armanda</text>

  <rect x="82" y="398" width="160" height="5" rx="2.5" fill="#38bdf8"/>

  <text x="82" y="458" font-family="sans-serif" font-size="34" fill="#94a3b8">Reliable, secure, scalable banking systems.</text>

  <text x="82" y="545" font-family="monospace" font-size="25" fill="#7dd3fc">Core Banking   ·   ISO 8583   ·   Payment Switching   ·   PCI-DSS</text>
  <text x="82" y="592" font-family="monospace" font-size="23" fill="#64748b">dendyarmanda.github.io</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL('../public/og.png', import.meta.url), png);
console.log('wrote public/og.png —', png.length, 'bytes');
