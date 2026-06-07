// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Primary (canonical) URL = GitHub Pages user site.
// Vercel serves the same build at its own URL as a secondary mirror.
export default defineConfig({
  site: 'https://dendyarmanda.github.io',
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: {
      // Indonesian served at "/", English at "/en/".
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'id',
        locales: { id: 'id-ID', en: 'en-US' },
      },
    }),
  ],
});
