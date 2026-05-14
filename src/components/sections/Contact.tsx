import { Send, MessageCircle, Instagram, Linkedin, Github, Globe, Sparkles } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const socials = [
  { name: "Telegram", Icon: Send, href: "https://t.me/", color: "text-cyan" },
  { name: "Instagram", Icon: Instagram, href: "https://instagram.com/", color: "text-violet" },
  { name: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com/", color: "text-cyan" },
  { name: "GitHub", Icon: Github, href: "https://github.com/", color: "text-foreground" },
  { name: "Website", Icon: Globe, href: "#", color: "text-violet" },
];

export function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {t("contact.title")}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              Розкажи про <span className="text-gradient">проєкт</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("contact.subtitle")}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-8 space-y-4"
            >
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="name">{t("contact.name")}</label>
                <input
                  id="name"
                  required
                  maxLength={100}
                  className="mt-1 w-full h-12 rounded-xl bg-secondary/50 border border-border px-4 outline-none focus:border-violet transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="email">{t("contact.email")}</label>
                <input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  className="mt-1 w-full h-12 rounded-xl bg-secondary/50 border border-border px-4 outline-none focus:border-violet transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="message">{t("contact.message")}</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  maxLength={1000}
                  className="mt-1 w-full rounded-xl bg-secondary/50 border border-border px-4 py-3 outline-none focus:border-violet transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 h-12 text-sm font-medium hover:opacity-90 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="size-4" />
                {sent ? t("contact.sent") : t("contact.send")}
              </button>
            </form>
          </div>

          {/* Socials */}
          <div className="lg:pl-10">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {t("social.title")}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group glass rounded-2xl p-5 flex items-center gap-3 hover:shadow-elegant transition-all hover:-translate-y-0.5"
                >
                  <span className={`size-10 grid place-items-center rounded-xl bg-secondary/60 ${s.color} group-hover:scale-110 transition-transform`}>
                    <s.Icon className="size-5" />
                  </span>
                  <span className="font-medium">{s.name}</span>
                </a>
              ))}
            </div>

            <div className="mt-6 glass rounded-2xl p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="size-4 text-cyan" />
                Швидкий зв’язок: Telegram або Instagram
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="https://t.me/" className="rounded-full bg-foreground text-background px-4 h-10 inline-flex items-center text-sm hover:opacity-90 transition-opacity">
                  Telegram
                </a>
                <a href="https://instagram.com/" className="rounded-full glass px-4 h-10 inline-flex items-center text-sm hover:bg-secondary/60 transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
