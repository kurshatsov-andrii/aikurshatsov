import { Send, MessageCircle, Instagram, Linkedin, Github, Music2, Sparkles, Phone } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { fetchSiteContent } from "@/lib/site-content";


type SocialsValue = Partial<Record<"telegram" | "viber" | "instagram" | "linkedin" | "github" | "tiktok", string>>;

const defaultSocials: SocialsValue = {
  telegram: "https://t.me/",
  viber: "viber://chat?number=",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
  github: "https://github.com/",
  tiktok: "https://tiktok.com/@",
};

const socialMeta: { key: keyof SocialsValue; name: string; Icon: typeof Send; color: string }[] = [
  { key: "telegram", name: "Telegram", Icon: Send, color: "text-cyan" },
  { key: "viber", name: "Viber", Icon: Phone, color: "text-violet" },
  { key: "instagram", name: "Instagram", Icon: Instagram, color: "text-violet" },
  { key: "linkedin", name: "LinkedIn", Icon: Linkedin, color: "text-cyan" },
  { key: "github", name: "GitHub", Icon: Github, color: "text-foreground" },
  { key: "tiktok", name: "TikTok", Icon: Music2, color: "text-violet" },
];

export function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const { data: socialsData } = useQuery({
    queryKey: ["site_content", "socials"],
    queryFn: () => fetchSiteContent<SocialsValue>("socials"),
  });
  const socialsMap = { ...defaultSocials, ...(socialsData ?? {}) };
  const socials = socialMeta
    .map((m) => ({ ...m, href: (socialsMap[m.key] || "").trim() }))
    .filter((s) => s.href.length > 0);
  const tgHref = socialsMap.telegram || "https://t.me/";
  const igHref = socialsMap.instagram || "https://instagram.com/";

  return (
    <section id="contact" className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {t("contact.title")}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              {t("contact.headline1")} <span className="text-gradient">{t("contact.headline2")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("contact.subtitle")}</p>

            <form
              noValidate
              onSubmit={async (e) => {
                e.preventDefault();
                if (sending) return;
                const form = e.currentTarget;
                const fd = new FormData(form);
                const payload = {
                  name: String(fd.get("name") || "").trim().slice(0, 100),
                  email: String(fd.get("email") || "").trim().slice(0, 255),
                  message: String(fd.get("message") || "").trim().slice(0, 1000),
                };
                if (!payload.name || !payload.email || !payload.message) {
                  toast.error("Заповніть ім’я, email і повідомлення.");
                  return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
                  toast.error("Вкажіть коректний email.");
                  return;
                }
                setSending(true);
                try {
                  const res = await fetch("/api/public/notify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type: "contact", ...payload }),
                  });
                  if (!res.ok) throw new Error(await res.text());
                  setSent(true);
                  form.reset();
                  toast.success("Повідомлення надіслано в Telegram.");
                } catch (err) {
                  console.error(err);
                  toast.error("Не вдалося надіслати. Спробуйте пізніше.");
                } finally {
                  setSending(false);
                }
              }}
              className="mt-8 space-y-4"
            >
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="name">{t("contact.name")}</label>
                <input
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  className="mt-1 w-full h-12 rounded-xl bg-secondary/50 border border-border px-4 outline-none focus:border-violet transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="email">{t("contact.email")}</label>
                <input
                  id="email"
                  name="email"
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
                  name="message"
                  required
                  rows={5}
                  maxLength={1000}
                  className="mt-1 w-full rounded-xl bg-secondary/50 border border-border px-4 py-3 outline-none focus:border-violet transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 h-12 text-sm font-medium hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Sparkles className="size-4" />
                {sending ? "..." : sent ? t("contact.sent") : t("contact.send")}
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
                {t("contact.quick")}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={tgHref} target="_blank" rel="noreferrer noopener" className="rounded-full bg-foreground text-background px-4 h-10 inline-flex items-center text-sm hover:opacity-90 transition-opacity">
                  Telegram
                </a>
                <a href={igHref} target="_blank" rel="noreferrer noopener" className="rounded-full glass px-4 h-10 inline-flex items-center text-sm hover:bg-secondary/60 transition-colors">
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
