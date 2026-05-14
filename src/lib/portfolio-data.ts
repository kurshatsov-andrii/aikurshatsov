export type Song = {
  id: string;
  title: string;
  description: { uk: string; en: string };
  genre: string;
  tags: string[];
  audioUrl?: string;
  cover: string;
};

export type VideoAd = {
  id: string;
  title: string;
  brand: string;
  description: { uk: string; en: string };
  videoUrl: string;
  thumbnail: string;
  platform: "Instagram" | "YouTube" | "TikTok";
};

export type VibeProject = {
  id: string;
  title: string;
  description: { uk: string; en: string };
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  screenshot: string;
};

const cover = (q: string, seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80&${encodeURIComponent(q)}`;

export const songs: Song[] = [
  {
    id: "neon-drift",
    title: "Neon Drift",
    description: { uk: "Synthwave-нічна поїздка з кінематографічними клавішами.", en: "A synthwave night drive with cinematic keys." },
    genre: "Synthwave",
    tags: ["Suno", "AI Music", "Cinematic"],
    cover: cover("synthwave", "photo-1518609878373-06d740f60d8b"),
  },
  {
    id: "kyiv-pulse",
    title: "Kyiv Pulse",
    description: { uk: "Електронний гімн рідному місту.", en: "Electronic anthem for the home city." },
    genre: "Electronic",
    tags: ["Udio", "Anthem"],
    cover: cover("city night", "photo-1519501025264-65ba15a82390"),
  },
  {
    id: "soft-machine",
    title: "Soft Machine",
    description: { uk: "Лоу-фай-поп з теплими гармоніями.", en: "Lo-fi pop with warm harmonies." },
    genre: "Lo-fi Pop",
    tags: ["Suno", "Lofi"],
    cover: cover("studio", "photo-1511671782779-c97d3d27a1d4"),
  },
];

export const videos: VideoAd[] = [
  {
    id: "lumen",
    title: "Lumen — Light Reimagined",
    brand: "Lumen Studio",
    description: { uk: "Кінематографічна реклама нової лінійки світильників.", en: "Cinematic ad for a new lighting line." },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: cover("interior light", "photo-1505691938895-1758d7feb511"),
    platform: "YouTube",
  },
  {
    id: "atelier",
    title: "Atelier 22",
    brand: "Fashion Brand",
    description: { uk: "Reels-кампанія для модного бренду.", en: "Reels campaign for a fashion brand." },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: cover("fashion editorial", "photo-1490481651871-ab68de25d43d"),
    platform: "Instagram",
  },
  {
    id: "drift",
    title: "Drift Coffee",
    brand: "Drift",
    description: { uk: "Короткий ШІ-ролик для кав’ярні.", en: "Short AI spot for a coffee brand." },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: cover("coffee", "photo-1495474472287-4d71bcdd2085"),
    platform: "TikTok",
  },
];

export const vibeProjects: VibeProject[] = [
  {
    id: "promptdeck",
    title: "PromptDeck",
    description: { uk: "Бібліотека промптів з командою та шерингом.", en: "A prompt library with teams and sharing." },
    stack: ["React", "TanStack", "Supabase", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    features: ["Real-time sync", "Auth", "Tagging"],
    screenshot: cover("dashboard ui", "photo-1551288049-bebda4e38f71"),
  },
  {
    id: "studio-os",
    title: "Studio OS",
    description: { uk: "Кабінет креативної студії з керуванням проєктами.", en: "Creative studio dashboard with project mgmt." },
    stack: ["Next.js", "Postgres", "tRPC"],
    liveUrl: "#",
    features: ["Kanban", "Invoices", "Client portal"],
    screenshot: cover("workspace", "photo-1517245386807-bb43f82c33c4"),
  },
  {
    id: "lumen-site",
    title: "Lumen Brand Site",
    description: { uk: "Premium лендінг для бренду світильників.", en: "Premium landing for a lighting brand." },
    stack: ["TanStack Start", "Framer Motion"],
    liveUrl: "#",
    features: ["3D hero", "CMS", "i18n"],
    screenshot: cover("modern site", "photo-1467232004584-a241de8bcf5d"),
  },
];

export const certificates = [
  { id: "1", title: "Prompt Engineering Specialization", issuer: "DeepLearning.AI", image: cover("certificate", "photo-1606761568499-6d2451b23c66") },
  { id: "2", title: "Generative AI with LLMs", issuer: "Coursera", image: cover("diploma", "photo-1517842645767-c639042777db") },
  { id: "3", title: "Advanced Video AI", issuer: "Runway Academy", image: cover("video", "photo-1574717024653-61fd2cf4d44d") },
  { id: "4", title: "Music AI Production", issuer: "Suno Pro", image: cover("music studio", "photo-1511379938547-c1f69419868d") },
];

export const testimonials = [
  {
    id: "1",
    name: "Olena K.",
    role: { uk: "Засновниця бренду", en: "Brand Founder" },
    text: {
      uk: "Андрій зробив рекламу, яку наші клієнти показують одне одному. Дуже професійно.",
      en: "Andrii produced ads our clients literally show to each other. Pure craft.",
    },
  },
  {
    id: "2",
    name: "Mark D.",
    role: { uk: "Студент курсу", en: "Course Student" },
    text: {
      uk: "Курс відкрив для мене ШІ-музику з нуля. За тиждень випустив перший трек.",
      en: "The course opened AI music for me from scratch. Released my first track in a week.",
    },
  },
  {
    id: "3",
    name: "Iryna P.",
    role: { uk: "Маркетинг-директор", en: "Marketing Director" },
    text: {
      uk: "Швидко, дорого виглядає, без води. Саме те, що потрібно бренду.",
      en: "Fast, premium-looking, no fluff. Exactly what a brand needs.",
    },
  },
];
