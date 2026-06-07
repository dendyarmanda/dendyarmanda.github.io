import type { Locale } from '../data/cv';

export const languages: Record<Locale, string> = { id: 'ID', en: 'EN' };
export const defaultLang: Locale = 'id';

export const ui = {
  id: {
    'nav.about': 'Tentang',
    'nav.experience': 'Pengalaman',
    'nav.skills': 'Keahlian',
    'nav.projects': 'Proyek',
    'nav.contact': 'Kontak',
    'hero.cta.cv': 'Unduh CV',
    'hero.cta.contact': 'Hubungi Saya',
    'hero.available': 'Terbuka untuk peluang baru',
    'about.title': 'Tentang Saya',
    'about.focus': 'Fokus Domain',
    'experience.title': 'Pengalaman Kerja',
    'skills.title': 'Keahlian Teknis',
    'projects.title': 'Proyek Pilihan',
    'projects.visit': 'Lihat proyek',
    'contact.title': 'Hubungi Saya',
    'contact.subtitle': 'Tertarik bekerja sama atau punya pertanyaan? Kirim pesan.',
    'contact.name': 'Nama',
    'contact.email': 'Email',
    'contact.message': 'Pesan',
    'contact.send': 'Kirim Pesan',
    'contact.sending': 'Mengirim...',
    'contact.success': 'Terima kasih! Pesan Anda telah terkirim.',
    'contact.error': 'Maaf, terjadi kesalahan. Coba lagi atau email langsung.',
    'contact.or': 'Atau email langsung ke',
    'cv.title': 'Curriculum Vitae',
    'cv.download': 'Simpan sebagai PDF',
    'cv.back': '← Kembali ke situs',
    'footer.rights': 'Hak cipta dilindungi.',
    'footer.built': 'Dibuat dengan Astro.',
    'theme.toggle': 'Ganti tema',
  },
  en: {
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.cta.cv': 'Download CV',
    'hero.cta.contact': 'Get in Touch',
    'hero.available': 'Open to opportunities',
    'about.title': 'About Me',
    'about.focus': 'Domain Focus',
    'experience.title': 'Work Experience',
    'skills.title': 'Technical Skills',
    'projects.title': 'Featured Projects',
    'projects.visit': 'View project',
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Interested in working together or have a question? Send a message.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Thank you! Your message has been sent.',
    'contact.error': 'Sorry, something went wrong. Try again or email directly.',
    'contact.or': 'Or email directly at',
    'cv.title': 'Curriculum Vitae',
    'cv.download': 'Save as PDF',
    'cv.back': '← Back to site',
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Built with Astro.',
    'theme.toggle': 'Toggle theme',
  },
} as const;

export function useTranslations(lang: Locale) {
  return function t(key: keyof (typeof ui)['id']): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
