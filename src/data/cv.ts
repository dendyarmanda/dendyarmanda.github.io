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

// DUMMY data — ganti dengan pengalaman kerja kamu yang sebenarnya.
export const experience: Experience[] = [
  {
    company: 'PT Bank Digital Nusantara', // TODO: perusahaan asli
    role: {
      id: 'Senior Banking Software Engineer',
      en: 'Senior Banking Software Engineer',
    },
    period: { id: '2022 — Sekarang', en: '2022 — Present' },
    highlights: [
      {
        id: 'Memimpin pengembangan layanan core banking berbasis microservices (Java Spring Boot) yang memproses 2 juta+ transaksi/hari.',
        en: 'Led microservices-based core banking services (Java Spring Boot) processing 2M+ transactions/day.',
      },
      {
        id: 'Membangun integrasi switching ISO 8583 untuk ATM, EDC, dan QRIS dengan uptime 99,95%.',
        en: 'Built ISO 8583 switching for ATM, EDC, and QRIS with 99.95% uptime.',
      },
      {
        id: 'Mengoptimasi query dan caching, menurunkan latensi transaksi hingga 40%.',
        en: 'Optimized queries and caching, cutting transaction latency by up to 40%.',
      },
    ],
  },
  {
    company: 'PT Pembayaran Andal Indonesia', // TODO
    role: { id: 'Backend Engineer', en: 'Backend Engineer' },
    period: { id: '2019 — 2022', en: '2019 — 2022' },
    highlights: [
      {
        id: 'Mengembangkan REST API payment gateway throughput tinggi (10k+ TPS) untuk 30+ merchant.',
        en: 'Developed high-throughput payment gateway REST APIs (10k+ TPS) for 30+ merchants.',
      },
      {
        id: 'Menerapkan rekonsiliasi transaksi otomatis, mengurangi kerja manual tim ops 70%.',
        en: 'Implemented automated transaction reconciliation, reducing ops manual work by 70%.',
      },
      {
        id: 'Menyiapkan pipeline CI/CD dan observability (Prometheus & Grafana).',
        en: 'Set up CI/CD pipelines and observability (Prometheus & Grafana).',
      },
    ],
  },
  {
    company: 'PT Solusi Teknologi Finansial', // TODO
    role: { id: 'Software Engineer', en: 'Software Engineer' },
    period: { id: '2017 — 2019', en: '2017 — 2019' },
    highlights: [
      {
        id: 'Membangun modul internet banking dan notifikasi transaksi real-time.',
        en: 'Built internet banking modules and real-time transaction notifications.',
      },
      {
        id: 'Berkontribusi pada audit keamanan dan kepatuhan PCI-DSS.',
        en: 'Contributed to security audits and PCI-DSS compliance.',
      },
    ],
  },
];

export interface SkillGroup {
  title: L;
  items: string[];
}

// TODO(dendy): sesuaikan daftar keahlian kamu.
export const skills: SkillGroup[] = [
  {
    title: { id: 'Bahasa Pemrograman', en: 'Languages' },
    items: ['Java', 'Kotlin', 'TypeScript', 'SQL', 'Python'],
  },
  {
    title: { id: 'Framework & Library', en: 'Frameworks & Libraries' },
    items: ['Spring Boot', 'Node.js', 'React', 'Astro'],
  },
  {
    title: { id: 'Domain Perbankan', en: 'Banking Domain' },
    items: ['Core Banking', 'ISO 8583', 'Payment Switching', 'BI-FAST', 'QRIS', 'PCI-DSS'],
  },
  {
    title: { id: 'DevOps & Tools', en: 'DevOps & Tools' },
    items: ['Docker', 'Kubernetes', 'Kafka', 'Jenkins', 'Git', 'Oracle', 'PostgreSQL'],
  },
];

export interface Project {
  name: string;
  description: L;
  tech: string[];
  link?: string;
}

// TODO(dendy): ganti dengan proyek kamu yang sebenarnya (boleh tambah link repo).
export const projects: Project[] = [
  {
    name: 'Core Banking Microservices',
    description: {
      id: 'Platform core banking berbasis microservices untuk pemrosesan transaksi real-time.',
      en: 'Microservices-based core banking platform for real-time transaction processing.',
    },
    tech: ['Java', 'Spring Boot', 'Kafka', 'Oracle'],
    // link: 'https://github.com/dendyarmanda/...',
  },
  {
    name: 'Payment Gateway Integration',
    description: {
      id: 'Integrasi switching ISO 8583 yang menghubungkan kanal ATM/EDC ke core banking.',
      en: 'ISO 8583 switching integration connecting ATM/EDC channels to core banking.',
    },
    tech: ['Java', 'Redis', 'ISO 8583'],
  },
  {
    name: 'Transaction Monitoring Dashboard',
    description: {
      id: 'Dashboard internal untuk memantau kesehatan transaksi dan alerting.',
      en: 'Internal dashboard to monitor transaction health and alerting.',
    },
    tech: ['React', 'TypeScript', 'Node.js'],
  },
];
