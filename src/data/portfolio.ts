export interface ProjectItem {
  id: string;
  title: string;
  year: string;
  stack: string;
  summary: string;
  liveUrl: string;
  liveLabel: string;
  repoUrl?: string;
  imageSrc: string;
  imageAlt: string;
}

export interface StackCategory {
  title: string;
  items: string;
}

export interface ProfileMetaItem {
  label: string;
  value: string;
}

export const PORTFOLIO_PROFILE = {
  brandName: "Atnan Septian",
  fullName: "Atnan Septian Wijanarko",
  role: "Pengembang Software: App, Web, dan IoT",
  heroIntro:
    "Mahasiswa Teknik Informatika di Universitas Muhammadiyah Surakarta sejak 2024. Berfokus merancang dan membangun aplikasi, situs web modern, serta sistem IoT.",
  portraitSrc: "/images/atnan-portrait.webp",
  portraitWidth: 747,
  portraitHeight: 899,
  portraitAlt: "Potret monokrom Atnan Septian Wijanarko dengan pencahayaan studio",
  aboutLead:
    "Membangun perangkat lunak yang fungsional, cepat diakses, dan terstruktur dari antarmuka hingga perangkat terhubung.",
  aboutBody:
    "Sejak menempuh studi Teknik Informatika di Universitas Muhammadiyah Surakarta pada 2024, aku mendalami pengembangan aplikasi, arsitektur web modern, dan sistem IoT. Fokus utamaku adalah menghadirkan produk web yang rapi secara teknis serta nyaman dipakai oleh pengguna nyata.",
  email: "atnanseptian1@gmail.com",
  githubUrl: "https://github.com/Atnan49",
  githubHandle: "github.com/Atnan49",
  footerText: "Atnan Septian Wijanarko / Teknik Informatika UMS",
} as const;

export const PROFILE_META: ProfileMetaItem[] = [
  { label: "Kampus", value: "Teknik Informatika, UMS" },
  { label: "Angkatan", value: "Sejak 2024" },
  { label: "Fokus", value: "App, Web, dan IoT" },
];

export const STACK_CATEGORIES: StackCategory[] = [
  {
    title: "Web & Frontend",
    items: "React, Next.js, TypeScript, Tailwind CSS, Alpine.js, HTML5, CSS3",
  },
  {
    title: "Backend & Data",
    items: "Laravel (PHP), Prisma, PostgreSQL, MySQL, Firebase",
  },
  {
    title: "App, PWA & IoT",
    items: "Service Worker, Dexie.js, Python, ESP8266, RFID PN532/RC522",
  },
];

export const SELECTED_PROJECTS: ProjectItem[] = [
  {
    id: "parti-ums",
    title: "PARTI HIMATIF UMS 2026",
    year: "2026",
    stack: "Laravel, Blade, Tailwind CSS, Alpine.js, PWA",
    summary:
      "Platform web resmi Parade Teknik Informatika (PARTI) HIMATIF UMS. Menyediakan katalog sub-acara kompetisi, alur waktu kegiatan, pencarian FAQ dinamis, dukungan PWA offline, serta panel admin multi-tahun.",
    liveUrl: "https://partiums.himatifums.org/",
    liveLabel: "Kunjungi partiums.himatifums.org",
    repoUrl: "https://github.com/Atnan49/Parti_mini_version",
    imageSrc: "/images/projects/parti.webp",
    imageAlt: "Pratinjau halaman depan platform web PARTI HIMATIF UMS 2026",
  },
  {
    id: "qomar",
    title: "QOMAR (Komik Digital Bahasa Arab)",
    year: "2026",
    stack: "HTML5, CSS3, JavaScript, Universal Design for Learning, PWA",
    summary:
      "Platform pembelajaran Bahasa Arab berbasis komik digital interaktif untuk siswa kelas IV MI dengan pendekatan UDL, latihan kosa kata, video, kuis, dan dukungan PWA offline.",
    liveUrl: "https://qomar-mi.vercel.app/",
    liveLabel: "Buka Aplikasi",
    repoUrl: "https://github.com/Atnan49/Qomar",
    imageSrc: "/images/projects/qomar.webp",
    imageAlt: "Pratinjau platform belajar komik digital QOMAR",
  },
  {
    id: "ebook-fikih",
    title: "Smart E-Book Digital Fikih",
    year: "2026",
    stack: "HTML5, CSS3, Vanilla JS, Web Speech API, UDL, PWA",
    summary:
      "Media pembelajaran interaktif Fikih Kelas 2 SD tanpa framework dengan mode disleksia OpenDyslexic, zoom teks 100% hingga 160%, Text-to-Speech Bahasa Indonesia, dan akses offline.",
    liveUrl: "https://ebook-fikih.vercel.app/",
    liveLabel: "Buka Aplikasi",
    repoUrl: "https://github.com/Atnan49/Ebook-Fikih",
    imageSrc: "/images/projects/ebook-fikih.webp",
    imageAlt: "Pratinjau aplikasi buku digital interaktif Smart E-Book Fikih",
  },
  {
    id: "miftah-shorof",
    title: "Miftah Kaidah Shorof",
    year: "2026",
    stack: "HTML5, CSS3, JavaScript, Universal Design for Learning, PWA",
    summary:
      "Buku digital interaktif ilmu shorof berbasis UDL dan PWA untuk pembelajaran kaidah perubahan bentuk kata Bahasa Arab bagi santri Kelas VII SMP Pondok Pesantren Al-Ikhlas Mantingan.",
    liveUrl: "https://kaidahsorof.vercel.app/",
    liveLabel: "Buka Aplikasi",
    imageSrc: "/images/projects/kaidah-sorof.webp",
    imageAlt: "Pratinjau buku digital interaktif Miftah Kaidah Shorof",
  },
];
