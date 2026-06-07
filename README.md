# Dendy Septian Armanda — CV / Portfolio

Bilingual (🇮🇩 / 🇬🇧) personal CV & portfolio site for a **Banking Software Engineer**.
Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com).
Static, fast, ~zero JavaScript. Deploys for free on **GitHub Pages** and **Vercel**.

- **Indonesian (default):** `/`
- **English:** `/en/`
- **Print/PDF résumé:** `/cv` and `/en/cv` (click "Simpan sebagai PDF" → Save as PDF)

---

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output → dist/
npm run preview  # preview the production build
```

---

## ✏️ How to edit your content

Everything lives in **one file**: [`src/data/cv.ts`](src/data/cv.ts).
Each field has an `id` (Indonesian) and `en` (English) value. Edit, save, redeploy.

UI labels (nav, buttons) are in [`src/i18n/ui.ts`](src/i18n/ui.ts).

### TODO — replace placeholders (search the code for `TODO`)

- [ ] `src/data/cv.ts` → **experience** (company names, roles, periods, highlights)
- [ ] `src/data/cv.ts` → **projects** (real projects + optional repo links)
- [ ] `src/data/cv.ts` → **skills** (adjust to your stack)
- [ ] `src/data/cv.ts` → **profile.location** (your city)
- [ ] `src/data/cv.ts` → **profile.social.linkedin** (your real LinkedIn URL)
- [ ] `src/components/Contact.astro` → **`WEB3FORMS_ACCESS_KEY`** (see below)

### Contact form (Web3Forms — free)

1. Go to <https://web3forms.com>, enter your email, copy the **Access Key**.
2. In `src/components/Contact.astro`, replace `YOUR_WEB3FORMS_ACCESS_KEY`.
3. Redeploy. Until then, the manual `mailto:` link below the form still works.

---

## 🚀 Deploy

### GitHub Pages (primary — `https://dendyarmanda.github.io`)

Already wired via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
After the first push to `main`:

1. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Every push to `main` rebuilds and deploys automatically.

### Vercel (secondary mirror)

1. <https://vercel.com> → **Add New → Project** → import this repo.
2. Vercel auto-detects Astro (build `astro build`, output `dist`). No config needed.
3. Deploy. Every push to `main` also redeploys here.

> The canonical URL (`site` in `astro.config.mjs`) points to GitHub Pages, so
> search engines treat the Pages URL as primary and the Vercel URL as a mirror.
