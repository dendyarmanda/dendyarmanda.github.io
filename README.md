# 🪪 CV / Portfolio — Dendy Septian Armanda

Website CV pribadi buat **Banking Software Engineer**. Dua bahasa (🇮🇩/🇬🇧), gelap-elegan, ada partikel gerak di background, dan **gratis** (deploy ke GitHub Pages + Vercel sekaligus).

Dibikin pakai [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com). Static, ringan, hampir tanpa JavaScript → cepet + skor SEO bagus.

🔗 **Live:** https://dendyarmanda.github.io · https://profile-eight-inky-80.vercel.app

| Halaman | URL |
|---|---|
| Indonesia (default) | `/` |
| English | `/en/` |
| CV buat di-print/PDF | `/cv` · `/en/cv` (klik "Simpan sebagai PDF") |

---

## 🚀 Cara jalanin (Run Guide)

Butuh **Node.js versi 22.12 ke atas** (cek: `node -v`).

```bash
# 1. masuk folder project
cd profile

# 2. install dependency (sekali aja di awal)
npm install

# 3. jalanin mode development (auto-reload tiap nyimpen)
npm run dev
# → buka http://localhost:4321
```

Selesai. Tiap kamu edit file dan save, browser otomatis refresh.

Perintah lain:

```bash
npm run build     # build versi production ke folder dist/
npm run preview   # lihat hasil build production di lokal
```

---

## ✏️ Cara ganti isi CV

**Semua teks ada di SATU file:** [`src/data/cv.ts`](src/data/cv.ts).

Tiap data punya 2 versi bahasa — `id` (Indonesia) & `en` (Inggris). Tinggal ganti, save, beres. Contoh:

```ts
export const profile = {
  name: 'Dendy Septian Armanda',
  role: { id: 'Banking Software Engineer', en: 'Banking Software Engineer' },
  // ...
};
```

Cari komentar `// TODO` di file itu — itu bagian yang masih **dummy** dan perlu kamu ganti:
- pengalaman kerja (nama perusahaan, periode, pencapaian — pakai angka kalau bisa)
- proyek
- skill
- kota & URL LinkedIn

Label tombol / menu ada di [`src/i18n/ui.ts`](src/i18n/ui.ts).

### 📸 Ganti foto

Sekarang fotonya masih avatar dummy "DS". Mau pakai foto asli:

1. Taruh foto kamu di folder `public/`, misal `public/me.jpg`.
2. Buka `src/data/cv.ts`, ubah:
   ```ts
   photo: '/me.jpg',   // sesuaikan nama file-nya
   ```

Mau hilangin foto? Kosongin aja: `photo: ''`.

### 📨 Form kontak

Form kontak udah aktif (pakai layanan gratis **Web3Forms**), pesan masuk ke email kamu. Access key-nya ada di `src/components/Contact.astro` — aman ditaruh di kode publik (memang didesain begitu). Mau ganti email tujuan? Bikin key baru gratis di [web3forms.com](https://web3forms.com).

---

## 🌐 Cara deploy / update

Udah otomatis. **Cukup push ke GitHub:**

```bash
git add -A
git commit -m "update konten cv"
git push
```

Sekali push → **dua situs langsung ke-update sendiri** (GitHub Pages + Vercel). Tunggu ±1-2 menit.

---

## 🎨 Kalau ganti nama/role/tagline

Gambar preview yang muncul pas link di-share (di WA/LinkedIn) perlu di-generate ulang:

```bash
node scripts/gen-og.mjs   # bikin ulang public/og.png
```

---

## 📁 Struktur singkat

```
profile/
├─ src/
│  ├─ data/cv.ts          # ← semua isi CV (edit di sini)
│  ├─ i18n/ui.ts          # teks menu/tombol
│  ├─ layouts/Base.astro  # kerangka halaman (meta, font, background)
│  ├─ components/         # Hero, About, Experience, Skills, Projects, Contact, ...
│  └─ pages/              # index (id), en/, cv, en/cv
├─ public/                # favicon, og.png, foto
├─ scripts/               # generator og image & avatar
└─ astro.config.mjs       # konfigurasi (i18n, sitemap, dll)
```

---

## 🛠️ Mampet? (Troubleshooting)

- **`npm run dev` error soal Node** → Node kamu di bawah 22.12. Update Node dulu.
- **Font keliatan default/jelek** → pastikan dependency ke-install (`npm install`).
- **Port 4321 kepake** → Astro otomatis pindah ke 4322, lihat aja URL di terminal.
- **Habis push tapi situs belum berubah** → tunggu 1-2 menit (cache CDN), terus hard-refresh (`Ctrl+Shift+R`).

---

Dibikin dengan Astro · gratis selamanya · 💙
