# GLOSSARY — Istilah Teknis di CV

Kamus istilah yang dipakai di `src/data/cv.ts`, buat persiapan interview.
Format tiap istilah: **Apa** (definisi) → **Di project gue** (implementasi konkret) → **Jawaban interview** (kalimat siap ucap).

---

## Project: Enterprise Object Storage & Document Management Platform

### Object Storage

- **Apa:** Cara nyimpen file sebagai "object" (file + metadata + ID unik) di dalam bucket, diakses lewat HTTP API — bukan lewat filesystem hierarki (NAS) atau block device (SAN). Contoh terkenal: AWS S3.
- **Di project gue:** MinIO jadi object storage engine-nya. Tiap dokumen disimpan sebagai object di bucket, dengan layout `originals/<path>/<file>` dan `thumbnails/<path>/<file>`.
- **Jawaban interview:** "Kami pakai object storage karena dokumen bank itu write-once-read-many, butuh metadata kaya, dan harus scalable horizontal — object storage lebih cocok daripada NAS tradisional untuk pola itu."

### On-premise (on-prem)

- **Apa:** Infrastruktur jalan di data center milik sendiri, bukan di cloud publik (AWS/GCP/Azure).
- **Di project gue:** Seluruh stack (MinIO, Postgres, Cassandra, Typesense, Redis) jalan di server internal Bank Mega. Regulasi perbankan Indonesia (OJK/BI) membatasi data nasabah keluar ke cloud publik.
- **Jawaban interview:** "Karena data perbankan, semua harus on-prem. Konsekuensinya fitur yang di cloud tinggal aktifin — lifecycle policy, tiering, monitoring — harus kami bangun sendiri. Itu justru jadi bagian engineering paling menarik."

### MinIO

- **Apa:** Object storage server open-source yang API-nya kompatibel dengan AWS S3. Standar de-facto untuk S3 self-hosted.
- **Di project gue:** Bukan cuma satu instance — sistem kami mengelola **banyak cluster MinIO sekaligus** ("drive"). Tiap drive punya endpoint, credential (dienkripsi AES-256-GCM di database), dan tipe HOT/COLD. Dokumen tercatat ada di drive mana, jadi bisa dipindah antar cluster.
- **Jawaban interview:** "Kami abstraksi MinIO jadi konsep 'drive' — satu registry cluster di Postgres, client di-cache per drive, dan semua operasi lewat satu resolver yang menentukan tulis/baca ke cluster mana. Jadi nambah cluster baru tinggal insert row, bukan deploy ulang."

### PBAC / ABAC (vs RBAC)

- **Apa:**
  - **RBAC** (Role-Based): akses ditentukan role. "Admin boleh delete." Paling umum, paling kaku.
  - **ABAC** (Attribute-Based): akses ditentukan atribut — siapa, apa, dari mana, kapan. "Boleh download kalau dari jaringan kantor."
  - **PBAC** (Policy-Based): aturan akses ditulis sebagai *policy* (data di database), bukan hardcode — bisa diubah admin lewat UI tanpa deploy.
- **Di project gue:** Engine kustom: `Resource` (target + action, misal `document:read`) × `Condition` (field/operator/value, 12 operator termasuk `cidr`) × `Policy` (efek ALLOW/DENY + prioritas + subjek ROLE/USER/CHANNEL/GLOBAL). Admin bisa bikin aturan macam "channel X cuma boleh baca bucket dari IP range 10.x" tanpa nyentuh kode.
- **Jawaban interview:** "RBAC saja tidak cukup — kebutuhan bank itu granular: per user, per channel integrasi, bahkan per IP range. Jadi kami bangun policy engine di mana aturan akses adalah data, bukan kode. Ubah aturan = ubah row, bukan deploy."

### CASL

- **Apa:** Library JavaScript untuk authorization — mendefinisikan "ability" (siapa boleh apa terhadap apa) dan mengevaluasinya. Semacam rule engine kecil untuk permission.
- **Di project gue:** Policy dari database di-compile jadi CASL ability saat evaluasi. CASL yang mengevaluasi kondisi (pakai sintaks query mirip MongoDB), kami extend dengan operator custom `$cidr` untuk pencocokan IP range. Dipakai di backend (enforcement) dan frontend (hide/show tombol & halaman).
- **Jawaban interview:** "CASL kami pakai sebagai evaluator, bukan sebagai sumber aturan — aturan tetap di database. Keuntungannya satu format ability yang sama bisa dievaluasi di backend untuk enforcement dan di frontend untuk UX."

### CIDR

- **Apa:** Notasi range IP: `10.190.0.0/16` artinya semua IP yang 16 bit pertamanya sama (10.190.x.x). Dipakai untuk mendefinisikan jaringan/subnet.
- **Di project gue:** Salah satu operator condition di PBAC. Policy bisa membatasi akses berdasarkan IP asal request — misal API key channel tertentu hanya valid dari subnet data center partner.
- **Jawaban interview:** "Kondisi akses kami bisa turun sampai level jaringan — policy bisa bilang 'DENY kecuali request datang dari CIDR ini'. Berguna untuk channel integrasi machine-to-machine yang IP-nya tetap."

### HOT/COLD Storage Tiering

- **Apa:** Membagi storage jadi tier: **HOT** = storage cepat/mahal untuk data sering diakses, **COLD** = storage murah/lambat untuk data jarang diakses. Tujuan: hemat biaya tanpa hapus data.
- **Di project gue:** Drive MinIO ditandai HOT atau COLD. Background job ("cold-sweep", jalan via cron BullMQ) scan log aktivitas di Cassandra → dokumen di HOT drive yang diakses ≤N kali dalam M hari terakhir otomatis dimigrasi ke COLD drive. Prosesnya copy → verifikasi ukuran → flip pointer di DB → hapus sumber. Sumber tetap jadi acuan sampai copy terverifikasi, jadi zero-downtime.
- **Jawaban interview:** "Dokumen bank wajib disimpan bertahun-tahun tapi 90% tidak pernah dibuka lagi setelah 3 bulan. Tiering otomatis memindahkan yang dingin ke storage murah berdasarkan pola akses nyata, bukan umur file saja — dan keputusannya data-driven karena kami punya activity log per dokumen."

### S3 Intelligent-Tiering

- **Apa:** Fitur AWS S3 yang otomatis memindahkan object antar tier biaya berdasarkan pola akses. Di cloud, ini tinggal centang.
- **Di project gue:** Ini pembanding, bukan yang dipakai — kami **membangun perilaku setara** untuk on-prem MinIO, karena MinIO tidak punya fitur ini lintas cluster.
- **Jawaban interview:** "Frasa 'S3 Intelligent-Tiering equivalent' di CV maksudnya: kemampuan yang di AWS berupa checkbox, kami implementasi sendiri — deteksi pola akses, migrasi otomatis, verifikasi integritas — karena environment kami on-prem."

### Full-text Search (Typesense)

- **Apa:** Pencarian isi/metadata dokumen yang toleran typo, cepat, dan bisa difilter per kategori (faceted) — beda dengan `LIKE '%...%'` SQL yang lambat dan kaku. Typesense = search engine open-source sejenis Elasticsearch/Algolia tapi lebih ringan.
- **Di project gue:** Metadata dokumen di-index ke Typesense. Pencarian typo-tolerant + filter per bucket/mime-type. Penting: hasil search **difilter sesuai PBAC** — daftar bucket yang boleh dilihat user di-AND-kan ke query, jadi search tidak pernah membocorkan dokumen di luar akses user.
- **Jawaban interview:** "Tantangan utamanya bukan search-nya sendiri, tapi memastikan search tidak jadi celah akses — hasil harus di-scope ke bucket yang PBAC-visible untuk si pemanggil, dan itu kami cache per identitas biar tidak membebani tiap keystroke."

### Audit Trail

- **Apa:** Catatan permanen siapa-melakukan-apa-kapan terhadap data. Di perbankan ini kewajiban regulasi, bukan nice-to-have.
- **Di project gue:** Setiap aksi (view, download, upload, edit, move, delete) dicatat ke Cassandra per dokumen/bucket/drive, dengan actor + timestamp. Ditampilkan sebagai timeline aktivitas per dokumen di UI, dan — bonus — data ini juga yang jadi bahan bakar keputusan tiering HOT/COLD.
- **Jawaban interview:** "Audit trail kami append-only di Cassandra karena volumenya tinggi dan tidak pernah di-update. Menariknya, log audit itu tidak cuma untuk compliance — dia jadi sumber data pola akses yang menggerakkan tiering otomatis."

### Polyglot Persistence *(cerita interview — tidak ditulis di CV)*

- **Apa:** Pakai beberapa jenis database sekaligus, masing-masing untuk beban kerja yang paling cocok — bukan satu database untuk segalanya.
- **Di project gue:** 4 datastore, 4 alasan: **PostgreSQL** (data relasional/transaksional: user, role, policy, drive), **Cassandra** (activity log — append-only, volume tinggi, wide-column cocok untuk time-series), **Typesense** (full-text search), **Redis** (job queue BullMQ).
- **Jawaban interview:** "Bukan karena gaya-gayaan — activity log kalau ditaruh di Postgres akan jadi tabel terbesar yang bikin backup dan vacuum berat, padahal polanya append-only murni. Cassandra memang dibuat untuk itu. Setiap store dipilih dari bentuk beban kerjanya."

### Presigned URL *(cerita interview)*

- **Apa:** URL sementara + bertanda-tangan kriptografis yang memberi akses langsung ke satu object di storage tanpa perlu login — kedaluwarsa otomatis (misal 1 jam).
- **Di project gue:** Dua strategi serving file, dipilih sadar: **download & video streaming** pakai presigned URL (traffic binary besar langsung ke MinIO, tidak membebani backend), **preview gambar/PDF** di-proxy lewat backend ber-auth (konten tetap di belakang autentikasi, tidak ada link yang bisa disebar).
- **Jawaban interview:** "Trade-off-nya: presigned = hemat bandwidth backend tapi link-nya hidup sampai expired; proxy = terkontrol penuh tapi makan resource backend. Kami pakai keduanya sesuai sensitivitas use case-nya."

### Multi-tenant / Channel *(cerita interview)*

- **Apa:** Satu sistem melayani banyak "penyewa" (tenant) yang datanya saling terisolasi.
- **Di project gue:** Tenant = **Channel** (departemen atau sistem eksternal). Channel bisa punya API key sendiri (bisa di-rotate/revoke/extend) sehingga sistem lain bisa integrasi machine-to-machine tanpa akun user. Isolasi datanya di-enforce oleh PBAC.
- **Jawaban interview:** "Autentikasi kami dua jalur: JWT untuk manusia, API key untuk sistem — dan API key itu identitas channel, bukan user, dengan lifecycle penuh: create, rotate, revoke, expiry."

---

## Project: Standing Instruction — Recurring Payment Platform

### Standing Instruction

- **Apa:** Perintah tetap dari nasabah ke bank: "jalankan pembayaran ini berulang otomatis" — autodebet tagihan, transfer terjadwal.
- **Jawaban interview:** "Satu platform untuk semua pembayaran berulang bank — dari penjadwalan, eksekusi, sampai settlement."

### Idempotency / Anti-double-charge

- **Apa:** Operasi yang aman diulang — dijalankan 2× hasilnya sama dengan 1×. Krusial di pembayaran: retry tidak boleh bikin nasabah terdebet dua kali.
- **Di project gue:** Manual offset commit di Kafka consumer (offset baru di-commit setelah pembayaran benar-benar tercatat) + partition ordering per akun (semua event satu akun masuk partition sama, jadi urut) + idempotency key per attempt.
- **Jawaban interview:** "Prinsipnya: lebih baik memproses ulang lalu mendeteksi duplikat, daripada kehilangan event. Offset di-commit manual setelah persist, dan duplikat ditangkap idempotency key."

### DLQ (Dead Letter Queue)

- **Apa:** Antrian khusus untuk pesan yang gagal diproses berulang kali — dipinggirkan supaya tidak memblokir antrian utama, lalu ditangani manual/terpisah.
- **Jawaban interview:** "Retry berjenjang dulu; kalau tetap gagal, masuk DLQ dengan konteks error lengkap — jadi satu pembayaran bermasalah tidak menghentikan ribuan lainnya."

### Transaction Outbox

- **Apa:** Pola untuk masalah klasik "tulis ke database DAN kirim event — dua-duanya harus terjadi atau tidak sama sekali". Solusi: event ditulis ke tabel `outbox` **dalam transaksi database yang sama**, lalu proses terpisah mengirimkannya ke Kafka.
- **Jawaban interview:** "Tanpa outbox, crash di antara commit DB dan publish Kafka bikin state dan event tidak sinkron. Dengan outbox, keduanya atomik — kalau transaksi commit, event pasti terkirim (minimal sekali)."

### Reconciliation (Rekonsiliasi)

- **Apa:** Mencocokkan catatan dua sistem (misal catatan kami vs core banking) untuk menemukan selisih — transaksi yang tercatat sebelah, jumlah beda, dsb.
- **Jawaban interview:** "Otomatis tiap EOD: bandingkan catatan platform dengan respons switching, selisih di-flag untuk investigasi. Di pembayaran, pertanyaannya bukan 'apakah ada selisih' tapi 'seberapa cepat ketahuan'."

### Distributed Tracing

- **Apa:** Melacak satu request melintasi banyak service dengan trace ID yang sama, jadi kelihatan alur end-to-end dan di mana bottleneck/failure-nya.
- **Di project gue:** Tiap payment attempt punya trace ID (UUIDv7) yang ikut dari API → Kafka → consumer → audit log.
- **Jawaban interview:** "Satu pembayaran melewati 4 service — tanpa trace ID, debugging produksi itu menebak. Dengan trace ID, satu query langsung memperlihatkan seluruh perjalanan attempt tersebut."

### Graceful Shutdown Drain

- **Apa:** Saat service dimatikan (deploy/scale-down), dia berhenti menerima kerjaan baru tapi **menyelesaikan dulu yang sedang berjalan** sebelum exit.
- **Jawaban interview:** "Kubernetes bisa kill pod kapan saja. Consumer kami menangkap SIGTERM, berhenti mengambil pesan baru, menyelesaikan yang in-flight, commit offset, baru exit — supaya deploy tidak pernah memotong pembayaran di tengah jalan."

### PII Redaction

- **Apa:** Menyensor data pribadi (nomor rekening, nama, NIK) dari log aplikasi. Log tersebar ke banyak sistem — data sensitif tidak boleh ikut.
- **Jawaban interview:** "Field sensitif di-mask di lapisan logger sebelum ditulis — jadi tidak bergantung pada disiplin tiap developer mengingat untuk menyensor manual."

---

## Project: GBK Mobile API

### Clean Architecture (4-Layer)

- **Apa:** Pola pembagian kode jadi 4 lapisan dengan aturan ketergantungan satu arah — interface (route/HTTP) → application (use case/service) → domain (validasi/enum) → infrastructure (DB/plugin). Lapisan luar boleh bergantung ke dalam, tidak sebaliknya.
- **Di project gue:** 19 modul route, masing-masing punya use case sendiri di `application/use_cases`, validasi Zod di `domain/validation-schema`, dan akses data lewat Prisma di `infrastructure`. Business logic tidak pernah tahu soal Fastify atau Prisma secara langsung.
- **Jawaban interview:** "Pemisahan layer bikin business logic testable tanpa perlu HTTP server atau database jalan — dan kalau nanti ganti Fastify ke framework lain, cuma interface layer yang kesentuh."

### Fastify

- **Apa:** Web framework Node.js yang dioptimasi untuk throughput tinggi (JSON schema compile-time, plugin encapsulation) — alternatif Express yang lebih cepat.
- **Di project gue:** Semua 80+ endpoint didaftarkan sebagai Fastify plugin per modul, pakai `fastify-zod-openapi` supaya schema Zod otomatis jadi validasi request + dokumentasi OpenAPI.
- **Jawaban interview:** "Kami pilih Fastify karena skema validasinya di-compile ke JSON Schema saat startup — jauh lebih cepat dari validasi manual per-request, dan satu skema Zod dipakai ulang untuk validasi maupun dokumentasi API."

### GPS Activity Tracking

- **Apa:** Mencatat titik koordinat (lat/long + timestamp) selama aktivitas berjalan/lari, lalu menghitung jarak tempuh dari rangkaian titik tersebut (biasanya pakai formula Haversine untuk jarak antar koordinat di permukaan bumi).
- **Di project gue:** Modul `tracking` menyimpan rangkaian titik GPS per sesi aktivitas user, menghitung jarak & durasi, lalu jadi input leaderboard komunitas olahraga.
- **Jawaban interview:** "Tantangannya bukan nyimpen titik GPS-nya, tapi memastikan perhitungan jarak konsisten walau sample rate GPS device beda-beda — kami smoothing titik yang terlalu rapat/noise sebelum dihitung."

### Global API-Key Validation Plugin

- **Apa:** Middleware yang mengecek API key di setiap request masuk sebelum request diteruskan ke handler — satu titik kontrol, bukan dicek ulang di tiap route.
- **Di project gue:** Fastify `onRequest` hook yang didaftarkan sekali di level server, memvalidasi API key tiap client (mobile app, partner integrasi) terhadap key tersimpan sebelum request masuk ke route manapun.
- **Jawaban interview:** "Sebelumnya validasi API key ada yang lupa dipasang di route baru — saya pindahkan jadi global plugin di level server supaya tidak mungkin ada endpoint yang lolos tanpa validasi."

### Encrypted Third-Party API Integration

- **Apa:** Payload request/response ke API eksternal dienkripsi (bukan cuma HTTPS transport) — lapisan keamanan tambahan di atas koneksi, biasa jadi syarat partner API perbankan/pemerintah.
- **Di project gue:** Integrasi ke Reservation API pihak ketiga mensyaratkan payload dienkripsi/didekripsi di kedua sisi. Saya tangani encode/decode-nya plus logging payload hasil dekripsi untuk debugging tanpa membocorkan raw payload di log produksi.
- **Jawaban interview:** "Selain HTTPS, partner API ini juga minta payload-nya sendiri dienkripsi — jadi ada layer encrypt/decrypt sebelum request dikirim dan setelah response diterima, dan itu perlu hati-hati soal apa yang boleh masuk log."

### Deep Linking (Android/iOS)

- **Apa:** Link (`https://...`) yang saat diklik di HP langsung membuka app tertentu ke halaman spesifik (bukan cuma buka browser) — kalau app belum terinstall, fallback ke Play Store/App Store. Butuh file verifikasi khusus: `assetlinks.json` (Android App Links) dan `apple-app-site-association` (iOS Universal Links), di-host di domain yang sama dengan backend.
- **Di project gue:** Endpoint redirect + file verifikasi domain buat link notifikasi/share yang langsung membuka app di halaman terkait (misal detail event), dengan fallback ke store listing kalau app belum ada.
- **Jawaban interview:** "Deep link itu setengah backend setengah konfigurasi — filenya statis, tapi harus di-host persis di path yang dicek OS, dan redirect endpoint-nya perlu fallback yang benar kalau app belum terinstall."

---

## Cara pakai dokumen ini

1. Sebelum interview, baca ulang bagian **Jawaban interview** — itu kalimat pembuka; detail di **Di project gue** untuk pertanyaan lanjutan.
2. Jangan hafalkan verbatim — pahami *kenapa*-nya, karena interviewer bagus selalu tanya "kenapa tidak pakai X saja?"
3. Istilah baru masuk `cv.ts` → wajib tambah entri di sini (aturan di `CLAUDE.md`).
