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

    "hero.role": "AI Creator • Vibe Coding Developer • Digital Producer",
    "hero.tagline": "Перетворюю ідеї на ШІ-музику, кінорекламу та продукти, що оживають у браузері.",
    "hero.cta.portfolio": "Переглянути портфоліо",
    "hero.cta.courses": "Мої курси",
    "hero.cta.contact": "Зв’язатися",

    "stats.ai": "років у ШІ",
    "stats.ads": "років у рекламі",
    "stats.web": "років у веб-розробці",
    "stats.vibe": "року у Vibe Coding",
    "stats.teach": "роки у навчанні",
    "stats.courses": "AI-курсів створено",

    "about.title": "Про мене",
    "about.body":
      "Куршацов Андрій — AI Creator та digital-спеціаліст з багаторічним досвідом у рекламі, створенні сайтів, AI-контенті, генерації музики, відео та вайбкодінгу. Допомагаю брендам і авторам говорити мовою майбутнього.",

    "portfolio.title": "Портфоліо",
    "portfolio.subtitle": "Вибрані роботи на перетині мистецтва, технологій і реклами.",
    "portfolio.tab.songs": "AI Songs",
    "portfolio.tab.video": "AI Video Ads",
    "portfolio.tab.code": "Vibe Coding",
    "portfolio.viewAll": "Переглянути всі",
    "portfolio.view": "Відкрити",
    "portfolio.empty": "Скоро тут з’являться роботи.",

    "courses.title": "Курси",
    "courses.subtitle": "Навчись створювати з ШІ — від ідеї до релізу.",
    "courses.cta": "Перейти до курсу",
    "course.song.title": "Створи пісню та кліп з ШІ",
    "course.song.desc": "Повний шлях: текст → музика → відеокліп. Працюємо з Suno, Udio, Runway та Kling.",
    "course.ad.title": "Створи рекламу бренду з ШІ",
    "course.ad.desc": "Сценарій, продакшн та постпродакшн відеореклами повністю засобами ШІ.",

    "certs.title": "Сертифікати",
    "certs.subtitle": "Підтверджена експертиза.",

    "testimonials.title": "Відгуки",
    "testimonials.subtitle": "Про роботу зі мною — словами клієнтів і студентів.",

    "contact.title": "Зв’язатися",
    "contact.subtitle": "Розкажи про проєкт — відповім протягом 24 годин.",
    "contact.name": "Ім’я",
    "contact.email": "Email",
    "contact.message": "Повідомлення",
    "contact.send": "Надіслати",
    "contact.sent": "Дякую! Я зв’яжуся з тобою найближчим часом.",

    "social.title": "Знайди мене",

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

    "hero.role": "AI Creator • Vibe Coding Developer • Digital Producer",
    "hero.tagline": "I turn ideas into AI music, cinematic ads, and products that come alive in the browser.",
    "hero.cta.portfolio": "View portfolio",
    "hero.cta.courses": "My courses",
    "hero.cta.contact": "Get in touch",

    "stats.ai": "years in AI",
    "stats.ads": "years in advertising",
    "stats.web": "years in web development",
    "stats.vibe": "year in Vibe Coding",
    "stats.teach": "years teaching",
    "stats.courses": "AI courses created",

    "about.title": "About me",
    "about.body":
      "Andrii Kurshatsov is an AI Creator and digital specialist with deep experience in advertising, web, AI content, music & video generation, and vibe coding. I help brands and creators speak the language of the future.",

    "portfolio.title": "Portfolio",
    "portfolio.subtitle": "Selected work at the intersection of art, technology, and advertising.",
    "portfolio.tab.songs": "AI Songs",
    "portfolio.tab.video": "AI Video Ads",
    "portfolio.tab.code": "Vibe Coding",
    "portfolio.viewAll": "View all",
    "portfolio.view": "Open",
    "portfolio.empty": "Work will appear here soon.",

    "courses.title": "Courses",
    "courses.subtitle": "Learn to create with AI — from idea to release.",
    "courses.cta": "Open course",
    "course.song.title": "Make a song & music video with AI",
    "course.song.desc": "End-to-end: lyrics → music → video. We use Suno, Udio, Runway, and Kling.",
    "course.ad.title": "Create brand ads with AI",
    "course.ad.desc": "Script, production, and post — full video ads built entirely with AI tools.",

    "certs.title": "Certificates",
    "certs.subtitle": "Verified expertise.",

    "testimonials.title": "Testimonials",
    "testimonials.subtitle": "What clients and students say about working with me.",

    "contact.title": "Get in touch",
    "contact.subtitle": "Tell me about your project — I’ll reply within 24 hours.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.sent": "Thanks! I’ll get back to you shortly.",

    "social.title": "Find me",

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
