# 🤝 Handoff — CV / Portfolio Dendy

Catatan serah-terima biar siapa pun (atau kamu sendiri nanti) gampang nerusin.
Update terakhir: Juni 2026.

---

## ✅ Status: LIVE & jalan

- 🟢 GitHub Pages: <https://dendyarmanda.github.io> (canonical/utama)
- 🟢 Vercel (mirror): <https://profile-eight-inky-80.vercel.app>
- 🟢 Push ke `main` → dua-duanya auto-deploy (~1-2 menit)
- 🟢 Form kontak aktif (Web3Forms) — sudah dites, email masuk
- 🟢 Bilingual id/en, dark theme, partikel interaktif, OG image, SEO/JSON-LD

## 🧱 Yang udah jadi

- [x] Setup Astro 6 + Tailwind v4 (static, zero-cost)
- [x] Bilingual: `/` (id) + `/en/`
- [x] Section: Hero, Tentang, Pengalaman, Keahlian, Proyek, Kontak
- [x] Halaman CV print: `/cv` + `/en/cv`
- [x] Tema "Aurora Dark / Fintech Premium" + partikel background interaktif
- [x] Font self-hosted (Space Grotesk + Inter + JetBrains Mono)
- [x] Hero 2 kolom + avatar, badge "open to opportunities", lokasi
- [x] Menu mobile (hamburger), scroll-reveal animasi
- [x] OG share image + JSON-LD Person + sitemap
- [x] Deploy ganda (GH Pages via Actions + Vercel git-connected)

## 🔧 Yang MASIH PENDING (perlu data asli kamu)

> Semua konten sekarang **DUMMY** — keliatan utuh tapi belum data beneran.

- [ ] **Konten asli** di `src/data/cv.ts` (cari `// TODO`): nama perusahaan asli, periode, pencapaian (pakai angka!), proyek nyata, skill, kota, **URL LinkedIn** beneran.
- [ ] **Foto asli** → timpa `public/me.jpg` (sekarang foto dummy stock dari pravatar; path sudah `'/me.jpg'`).
- [ ] (Opsional) **Section Education + Certifications** — belum dibuat, tinggal minta kalau mau.
- [ ] (Opsional) **Custom domain** (mis. `dendyarmanda.dev`, ~$10/thn) — satu-satunya yang berbayar; bikin lebih kredibel dari `*.github.io`.
- [ ] (Opsional) **Analytics** privacy-friendly (Umami / GoatCounter, gratis).

## 🔑 Akun & akses

- **Repo**: `github.com/dendyarmanda/dendyarmanda.github.io` (akun `dendyarmanda`).
  - Token `gh` udah punya scope `workflow` + git credential helper udah di-set.
- **Vercel**: project `profile` (akun `dendy-septian-armanda-s-projects`), udah konek ke repo (auto-deploy).
- **Web3Forms**: access key ada di `src/components/Contact.astro` (email tujuan: <dendyseptianarmanda@gmail.com>). Aman publik.

## 📐 Keputusan teknis (kenapa begini)

- **Tailwind via PostCSS**, bukan plugin Vite — plugin Vite crash di Astro 6 (rolldown). Jangan diganti.
- **Dark-only** — tema aurora emang didesain gelap; light mode setengah-setengah malah jelek. Toggle dihapus sengaja.
- **Repo user-site** (`username.github.io`) — biar serve di root, nggak ribet base-path di dua host.
- **Node 22 di-pin** (CI + `engines`) — Astro 6 minimal Node 22.12.
- Detail aturan teknis lengkap ada di [`CLAUDE.md`](CLAUDE.md).

## ▶️ Cara nerusin

1. Baca [`README.md`](README.md) — cara run, edit, deploy.
2. Edit konten di `src/data/cv.ts` (satu file).
3. `npm run dev` buat lihat lokal → `git push` buat live.
4. Kalau ganti nama/role/tagline: `node scripts/gen-og.mjs` (refresh share card).

## ⚠️ Catatan

- Screenshot dari environment AI ke-block (butuh sudo/browser) — verifikasi visual final dilakukan manual di browser asli.
- File `preview-*.png` itu hasil screenshot lokal, sengaja di-`.gitignore` (bukan bagian situs).
