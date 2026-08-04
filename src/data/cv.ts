// =====================================================================
//  CV CONTENT — single source of truth (bilingual: id + en)
//  TODO(dendy): Ganti semua konten placeholder di bawah dengan data asli.
//  Tiap baris bertanda "// TODO" adalah tebakan — tolong dikoreksi.
// =====================================================================

export type Locale = 'id' | 'en';

/** A string available in both site languages. */
export type L = Record<Locale, string>;

export const profile = {
  name: 'Dendy Septian Armanda',
  role: {
    id: 'Banking Software Engineer',
    en: 'Banking Software Engineer',
  } as L,
  tagline: {
    id: 'Membangun sistem perbankan yang andal, aman, dan berskala besar.',
    en: 'Building reliable, secure, and scalable banking systems.',
  } as L,
  location: {
    id: 'Jakarta, Indonesia', // TODO: kota kamu
    en: 'Jakarta, Indonesia', // TODO: your city
  } as L,
  email: 'dendyseptianarmanda@gmail.com',
  // Optional headshot: drop a file in public/ (e.g. public/me.jpg), then set
  // the path here (e.g. '/me.jpg'). Leave '' to hide the avatar gracefully.
  photo: '/me.jpg', // DUMMY stock photo (pravatar) — ganti dengan foto asli
  // Show the "open to opportunities" availability badge in the hero.
  available: true,
  social: {
    github: 'https://github.com/dendyarmanda',
    // TODO: ganti dengan URL LinkedIn kamu yang benar
    linkedin: 'https://www.linkedin.com/in/dendyarmanda',
  },
};

export const about = {
  summary: {
    id: 'Banking Software Engineer dengan pengalaman membangun dan memelihara sistem inti perbankan (core banking), payment gateway, serta integrasi antar-sistem. Berfokus pada keandalan, keamanan, dan kepatuhan terhadap standar industri keuangan.',
    en: 'Banking Software Engineer experienced in building and maintaining core banking systems, payment gateways, and system integrations. Focused on reliability, security, and compliance with financial industry standards.',
  } as L,
  focus: [
    { id: 'Core Banking & Sistem Pembayaran', en: 'Core Banking & Payment Systems' },
    { id: 'Keamanan & Kepatuhan (PCI-DSS, ISO 27001)', en: 'Security & Compliance (PCI-DSS, ISO 27001)' },
    { id: 'Integrasi API & Switching ISO 8583', en: 'API Integration & ISO 8583 Switching' },
    { id: 'Arsitektur Microservices berskala besar', en: 'Scalable Microservices Architecture' },
  ] as L[],
};

export interface Experience {
  company: string;
  role: L;
  period: L;
  highlights: L[];
}

export const experience: Experience[] = [
  {
    company: 'PT Bank Mega Tbk',
    role: {
      id: 'Treasury & International Banking Specialist — Full Stack Engineer',
      en: 'Treasury & International Banking Specialist — Full Stack Engineer',
    },
    period: { id: 'Feb 2022 — Sekarang', en: 'Feb 2022 — Present' },
    highlights: [
      {
        id: 'Membangun platform standing instruction bank secara end-to-end — 4 service (core API, Kafka consumer, scheduler, admin dashboard) yang mengotomasi pembayaran berulang dari autodebet tagihan biller hingga transfer terjadwal.',
        en: "Built the bank's standing-instruction platform end-to-end — 4 services (core API, Kafka consumer, scheduler, admin dashboard) automating recurring payments from biller autodebet to scheduled transfers.",
      },
      {
        id: 'Merancang pipeline pembayaran Kafka yang idempotent dengan retry/DLQ dan pengaman anti-double-charge (manual offset commit, partition ordering per akun).',
        en: 'Designed an idempotent Kafka payment pipeline with retry/DLQ and double-charge safeguards (manual offset commit, per-account partition ordering).',
      },
      {
        id: 'Mengimplementasi audit trail dual-store (PostgreSQL + Cassandra) dengan distributed tracing end-to-end untuk setiap attempt pembayaran.',
        en: 'Implemented a dual-store audit trail (PostgreSQL + Cassandra) with end-to-end distributed tracing for every payment attempt.',
      },
      {
        id: 'Memimpin production hardening: transaction outbox + rekonsiliasi otomatis, graceful-shutdown drain, redaksi PII di log, health check Kubernetes, dan benchmark throughput consumer.',
        en: 'Led production hardening: transaction outbox + auto-reconciliation, graceful-shutdown drain, PII log redaction, Kubernetes health checks, and consumer throughput benchmarking.',
      },
    ],
  },
  {
    company: 'PT Bank Mega Tbk',
    role: {
      id: 'IT Development Program — Application Developer',
      en: 'IT Development Program — Application Developer',
    },
    period: { id: 'Agu 2022 — Feb 2023 (Kontrak)', en: 'Aug 2022 — Feb 2023 (Contract)' },
    highlights: [
      {
        id: 'Program pengembangan IT Bank Mega sebagai Application Developer — membangun aplikasi internal berbasis Java Spring Boot.',
        en: "Bank Mega's IT Development Program as an Application Developer — built internal applications with Java Spring Boot.",
      },
    ],
  },
];

export interface SkillGroup {
  title: L;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    title: { id: 'Bahasa Pemrograman', en: 'Languages' },
    items: ['TypeScript', 'JavaScript', 'SQL'],
  },
  {
    title: { id: 'Backend & Framework', en: 'Backend & Frameworks' },
    items: ['Bun', 'Node.js', 'Fastify', 'Next.js', 'React', 'Prisma', 'kafkajs', 'TanStack Query'],
  },
  {
    title: { id: 'Domain Perbankan', en: 'Banking Domain' },
    items: [
      'Standing Instruction / Recurring Payments',
      'Payment Switching Integration',
      'EOD Settlement & Reconciliation',
      'Idempotency Patterns',
      'RBAC & Data Scoping',
    ],
  },
  {
    title: { id: 'Data & Infrastruktur', en: 'Data & Infrastructure' },
    items: ['Kafka', 'PostgreSQL', 'Cassandra', 'Redis', 'Elasticsearch', 'Docker', 'Kubernetes', 'Linux cron', 'Git'],
  },
];

export interface Education {
  school: string;
  degree: L;
  period: L;
}

export const education: Education[] = [
  {
    school: 'Universitas Airlangga (UNAIR)',
    degree: { id: 'S1 Matematika', en: "Bachelor's degree, Mathematics" },
    period: { id: 'Agu 2017 — Jul 2022', en: 'Aug 2017 — Jul 2022' },
  },
];

export interface Project {
  name: string;
  description: L;
  tech: string[];
  link?: string;
  /** Optional — omit for projects whose timeframe is already clear from `experience`. */
  period?: L;
}

export const projects: Project[] = [
  {
    name: 'Standing Instruction — Recurring Payment Platform',
    description: {
      id: 'Platform standing instruction Bank untuk semua pembayaran berulang — autodebet tagihan biller hingga transfer terjadwal — otomatis dari penjadwalan, eksekusi, sampai settlement. Dibangun event-driven dengan jaminan idempotency anti-double-charge, audit trail dual-store, dan rekonsiliasi otomatis kelas perbankan.',
      en: 'Bank-wide standing-instruction platform automating every recurring payment — biller autodebet to scheduled transfers — from scheduling through execution to settlement. Event-driven with double-charge-safe idempotent processing, dual-store audit trail, and bank-grade automated reconciliation.',
    },
    tech: ['TypeScript', 'Bun', 'Fastify', 'Next.js', 'Kafka', 'PostgreSQL', 'Cassandra', 'Redis', 'Kubernetes'],
  },
  {
    name: 'Enterprise Object Storage & Document Management Platform',
    description: {
      id: 'Platform object storage & document management internal Bank yang menggantikan solusi vendor, dibangun sepenuhnya on-premise di atas MinIO. Fitur utama: engine otorisasi policy-based (PBAC) kustom dengan kondisi granular hingga level IP/CIDR, tiering penyimpanan HOT/COLD otomatis berbasis pola akses (setara S3 Intelligent-Tiering), pencarian full-text, serta audit trail lengkap untuk kebutuhan kepatuhan perbankan.',
      en: "The bank's internal object storage & document management platform replacing a vendor solution, built fully on-premise on MinIO. Key features: a custom policy-based authorization engine (PBAC) with granular conditions down to IP/CIDR level, automated access-pattern-driven HOT/COLD storage tiering (S3 Intelligent-Tiering equivalent), full-text search, and a complete audit trail for banking compliance.",
    },
    tech: ['TypeScript', 'Bun', 'Fastify', 'Next.js', 'MinIO', 'PostgreSQL', 'Cassandra', 'Typesense', 'Redis', 'Prisma', 'CASL'],
  },
  {
    name: 'GBK Mobile — Aplikasi Resmi Gelora Bung Karno',
    description: {
      id: 'Aplikasi resmi kawasan Gelora Bung Karno, live di Google Play — one-stop app untuk pengunjung GBK: komunitas & forum olahraga, tracking aktivitas lari berbasis GPS dengan leaderboard, reservasi venue olahraga, info parkir real-time, berita & event kawasan, hingga notifikasi push.',
      en: 'Official app of the Gelora Bung Karno sports complex, live on Google Play — a one-stop app for GBK visitors: sports communities & forums, GPS-based run tracking with leaderboards, sports venue reservations, real-time parking info, complex news & events, and push notifications.',
    },
    tech: ['TypeScript', 'Node.js', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis', 'MinIO', 'Firebase Admin', 'Zod', 'Argon2'],
    link: 'https://play.google.com/store/apps/details?id=id.gbk.mobile',
    period: { id: 'Nov 2025 — Feb 2026', en: 'Nov 2025 — Feb 2026' },
  },
];
