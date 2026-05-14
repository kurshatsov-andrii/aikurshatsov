import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "uk" | "en";

const dict = {
  uk: {
    "nav.home": "Головна",
    "nav.about": "Про мене",
    "nav.portfolio": "Портфоліо",
    "nav.courses": "Курси",
    "nav.certificates": "Сертифікати",
    "nav.contact": "Контакти",

    "hero.lastName": "Куршацов",
    "hero.firstName": "Андрій",
    "hero.role": "AI Creator • Vibe Coding Developer • Digital Producer",
    "hero.tagline": "Перетворюю ідеї на ШІ-музику, кінорекламу та продукти, що оживають у браузері.",
    "hero.cta.portfolio": "Переглянути портфоліо",
    "hero.cta.courses": "Мої курси",
    "hero.cta.contact": "Зв’язатися",

    "stats.ai": "у ШІ",
    "stats.ads": "у рекламі",
    "stats.web": "у веб-розробці",
    "stats.vibe": "у Vibe Coding",
    "stats.seo": "у SEO",
    "stats.teach": "навчаю ШІ",

    "about.title": "Про мене",
    "about.headline1": "Код + креатив.",
    "about.headline2": "Від ідеї до запуску.",
    "about.body":
      "Куршацов Андрій — AI Creator та digital-спеціаліст з багаторічним досвідом у рекламі, створенні сайтів, AI-контенті, генерації музики, відео та вайбкодінгу. Допомагаю брендам і авторам говорити мовою майбутнього.",

    "portfolio.title": "Портфоліо",
    "portfolio.subtitle": "Вибрані роботи на перетині мистецтва, технологій і реклами.",
    "portfolio.headline1": "Вибрані",
    "portfolio.headline2": "роботи",
    "portfolio.tab.songs": "ШІ пісні",
    "portfolio.tab.video": "ШІ реклама",
    "portfolio.tab.clips": "ШІ кліпи",
    "page.songs.h1a": "ШІ",
    "page.songs.h1b": "музика",
    "page.video.h1a": "ШІ",
    "page.video.h1b": "відеореклама",
    "page.clips.h1a": "ШІ",
    "page.clips.h1b": "кліпи",
    "portfolio.tab.code": "Вайбкодінг",
    "portfolio.viewAll": "Переглянути всі",
    "portfolio.view": "Відкрити",
    "portfolio.empty": "Скоро тут з’являться роботи.",

    "courses.title": "Курси",
    "courses.subtitle": "Навчись створювати з ШІ — від ідеї до релізу.",
    "courses.headline1": "Навчись створювати",
    "courses.headline2": "з ШІ",
    "courses.cta": "Перейти до курсу",
    "course.song.title": "Створи пісню та кліп з ШІ",
    "course.song.desc": "Повний шлях: текст → музика → відеокліп. Працюємо з Suno, Udio, Runway та Kling.",
    "course.ad.title": "Створи рекламу бренду з ШІ",
    "course.ad.desc": "Сценарій, продакшн та постпродакшн відеореклами повністю засобами ШІ.",

    "certs.title": "Сертифікати",
    "certs.subtitle": "Підтверджена експертиза.",
    "certs.headline1": "Підтверджена",
    "certs.headline2": "експертиза",

    "testimonials.title": "Відгуки",
    "testimonials.subtitle": "Про роботу зі мною — словами клієнтів і студентів.",
    "testimonials.headline1": "Слова",
    "testimonials.headline2": ", що мотивують",

    "contact.title": "Зв’язатися",
    "contact.subtitle": "Відповім на всі ваші питання.",
    "contact.headline1": "Напишіть мені,",
    "contact.headline2": "зворотній зв’язок",
    "contact.quick": "Швидкий зв’язок: Telegram або Instagram",
    "contact.name": "Ім’я",
    "contact.email": "Email",
    "contact.message": "Повідомлення",
    "contact.send": "Надіслати",
    "contact.sent": "Дякую! Я зв’яжуся з тобою найближчим часом.",

    "social.title": "Знайди мене",

    "nav.services": "Послуги",
    "svc.title": "Послуги",
    "svc.headline1": "Що я",
    "svc.headline2": "створюю",
    "svc.subtitle": "ШІ-музика, відео та сайти для бізнесу і особистого бренду — від ідеї до запуску.",
    "svc.songs.title": "ШІ-пісні для бізнесу",
    "svc.songs.price": "від $25",
    "svc.songs.desc": "Унікальний трек під ваш бренд або особистий проєкт.",
    "svc.clips.title": "Відеокліпи",
    "svc.clips.price": "від $500 / 3 хв",
    "svc.clips.desc": "Музичні кліпи з ШІ — для артистів і брендів.",
    "svc.ads.title": "Відеореклама",
    "svc.ads.price": "від $300 / 1 хв",
    "svc.ads.desc": "Кінематографічна відеореклама для бізнесу.",
    "svc.websites.title": "Сайти для бізнесу",
    "svc.websites.price": "від $500",
    "svc.websites.desc": "Сайти, лендінги та продукти для бізнесу й особистого бренду.",
    "svc.priceNote": "Фінальна вартість залежить від складності проєкту.",
    "svc.selected": "Обрано",
    "svc.brief.title": "Бриф",
    "svc.brief.headline": "Заповніть бриф — і я зв'яжуся з вами",
    "svc.brief.service": "Послуга",
    "svc.brief.desc": "Опис — що ви хочете отримати",
    "svc.brief.descPlaceholder": "Розкажіть про задачу, бренд, референси, бажаний стиль і дедлайн…",
    "svc.brief.name": "Ім'я (необов'язково)",
    "svc.brief.channel": "Канал зв'язку",
    "svc.brief.contact": "Контакт",
    "svc.brief.telegram": "Telegram",
    "svc.brief.viber": "Viber",
    "svc.brief.phone": "Телефон",
    "svc.submit": "Надіслати бриф",
    "svc.sending": "Надсилаю…",
    "svc.sent": "Надіслано ✓",
    "svc.err.desc": "Опишіть задачу детальніше",
    "svc.err.contact": "Вкажіть контакт для зв'язку",
    "svc.err.send": "Не вдалося надіслати. Спробуйте ще раз.",

    "footer.rights": "Усі права захищені.",
    "footer.role": "AI Creator та Vibe Coding Developer",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.portfolio": "Portfolio",
    "nav.courses": "Courses",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",

    "hero.lastName": "Kurshatsov",
    "hero.firstName": "Andrii",
    "hero.role": "AI Creator • Vibe Coding Developer • Digital Producer",
    "hero.tagline": "I turn ideas into AI music, cinematic ads, and products that come alive in the browser.",
    "hero.cta.portfolio": "View portfolio",
    "hero.cta.courses": "My courses",
    "hero.cta.contact": "Get in touch",

    "stats.ai": "in AI",
    "stats.ads": "in advertising",
    "stats.web": "in web development",
    "stats.vibe": "in Vibe Coding",
    "stats.seo": "in SEO",
    "stats.teach": "teaching AI",

    "about.title": "About me",
    "about.headline1": "Code + creativity.",
    "about.headline2": "From idea to launch.",
    "about.body":
      "Andrii Kurshatsov is an AI Creator and digital specialist with deep experience in advertising, web, AI content, music & video generation, and vibe coding. I help brands and creators speak the language of the future.",

    "portfolio.title": "Portfolio",
    "portfolio.subtitle": "Selected work at the intersection of art, technology, and advertising.",
    "portfolio.headline1": "Selected",
    "portfolio.headline2": "work",
    "portfolio.tab.songs": "AI Songs",
    "portfolio.tab.video": "AI Video Ads",
    "portfolio.tab.clips": "AI Clips",
    "page.songs.h1a": "AI",
    "page.songs.h1b": "music",
    "page.video.h1a": "AI",
    "page.video.h1b": "video ads",
    "page.clips.h1a": "AI",
    "page.clips.h1b": "clips",
    "portfolio.tab.code": "Vibe Coding",
    "portfolio.viewAll": "View all",
    "portfolio.view": "Open",
    "portfolio.empty": "Work will appear here soon.",

    "courses.title": "Courses",
    "courses.subtitle": "Learn to create with AI — from idea to release.",
    "courses.headline1": "Learn to create",
    "courses.headline2": "with AI",
    "courses.cta": "Open course",
    "course.song.title": "Make a song & music video with AI",
    "course.song.desc": "End-to-end: lyrics → music → video. We use Suno, Udio, Runway, and Kling.",
    "course.ad.title": "Create brand ads with AI",
    "course.ad.desc": "Script, production, and post — full video ads built entirely with AI tools.",

    "certs.title": "Certificates",
    "certs.subtitle": "Verified expertise.",
    "certs.headline1": "Verified",
    "certs.headline2": "expertise",

    "testimonials.title": "Testimonials",
    "testimonials.subtitle": "What clients and students say about working with me.",
    "testimonials.headline1": "Words",
    "testimonials.headline2": " that inspire",

    "contact.title": "Get in touch",
    "contact.subtitle": "I’ll answer all your questions.",
    "contact.headline1": "Write to me,",
    "contact.headline2": "let’s get in touch",
    "contact.quick": "Quick contact: Telegram or Instagram",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.sent": "Thanks! I’ll get back to you shortly.",

    "social.title": "Find me",

    "nav.services": "Services",
    "svc.title": "Services",
    "svc.headline1": "What I",
    "svc.headline2": "create",
    "svc.subtitle": "AI music, video, and websites for businesses and personal brands — from idea to launch.",
    "svc.songs.title": "AI songs for business",
    "svc.songs.price": "from $25",
    "svc.songs.desc": "A unique track for your brand or personal project.",
    "svc.clips.title": "Music videos",
    "svc.clips.price": "from $500 / 3 min",
    "svc.clips.desc": "AI-generated music videos for artists and brands.",
    "svc.ads.title": "Video ads",
    "svc.ads.price": "from $300 / 1 min",
    "svc.ads.desc": "Cinematic AI video ads for business.",
    "svc.websites.title": "Websites for business",
    "svc.websites.price": "from $500",
    "svc.websites.desc": "Websites, landing pages and products for business & personal branding.",
    "svc.priceNote": "Final price depends on project complexity.",
    "svc.selected": "Selected",
    "svc.brief.title": "Brief",
    "svc.brief.headline": "Fill out the brief — I'll get back to you",
    "svc.brief.service": "Service",
    "svc.brief.desc": "Description — what you want",
    "svc.brief.descPlaceholder": "Tell me about the task, brand, references, style, and deadline…",
    "svc.brief.name": "Name (optional)",
    "svc.brief.channel": "Contact channel",
    "svc.brief.contact": "Contact",
    "svc.brief.telegram": "Telegram",
    "svc.brief.viber": "Viber",
    "svc.brief.phone": "Phone",
    "svc.submit": "Send brief",
    "svc.sending": "Sending…",
    "svc.sent": "Sent ✓",
    "svc.err.desc": "Please describe your task in more detail",
    "svc.err.contact": "Please provide a contact",
    "svc.err.send": "Failed to send. Please try again.",

    "footer.rights": "All rights reserved.",
    "footer.role": "AI Creator & Vibe Coding Developer",
  },
} as const;

type Key = keyof (typeof dict)["uk"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "uk",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uk");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "uk" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
      document.documentElement.lang = l;
    }
  };

  const t = (k: Key) => dict[lang][k] ?? k;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
