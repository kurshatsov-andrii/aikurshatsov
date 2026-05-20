import { useState } from "react";
import { Music, Film, Video, Globe, Sparkles, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


type ServiceKey = "songs" | "clips" | "ads" | "websites";

export function Services() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<ServiceKey>("songs");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contactType, setContactType] = useState("telegram");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const services: { key: ServiceKey; Icon: typeof Music; titleK: any; priceK: any; descK: any; gradient: string }[] = [
    { key: "songs", Icon: Music, titleK: "svc.songs.title", priceK: "svc.songs.price", descK: "svc.songs.desc", gradient: "from-violet to-fuchsia-500" },
    { key: "clips", Icon: Film, titleK: "svc.clips.title", priceK: "svc.clips.price", descK: "svc.clips.desc", gradient: "from-cyan to-violet" },
    { key: "ads", Icon: Video, titleK: "svc.ads.title", priceK: "svc.ads.price", descK: "svc.ads.desc", gradient: "from-fuchsia-500 to-cyan" },
    { key: "websites", Icon: Globe, titleK: "svc.websites.title", priceK: "svc.websites.price", descK: "svc.websites.desc", gradient: "from-cyan to-fuchsia-500" },
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim().length < 5) {
      toast.error(t("svc.err.desc"));
      return;
    }
    if (contact.trim().length < 3) {
      toast.error(t("svc.err.contact"));
      return;
    }
    setLoading(true);
    const svc = services.find((s) => s.key === selected);
    const serviceLabel = svc ? (t(svc.titleK) as string) : selected;
    const trimmedDesc = description.trim().slice(0, 2000);
    const trimmedName = name.trim().slice(0, 100);
    const trimmedContact = contact.trim().slice(0, 200);
    const { error } = await (supabase as any).from("briefs").insert({
      service: serviceLabel,
      description: trimmedDesc,
      name: trimmedName || null,
      contact: trimmedContact,
      contact_type: contactType,
    });
    if (error) {
      setLoading(false);
      toast.error(t("svc.err.send"));
      return;
    }
    try {
      await sendBriefToTelegram({
        data: {
          service: serviceLabel,
          description: trimmedDesc,
          name: trimmedName,
          contact: trimmedContact,
          contactType,
        },
      });
    } catch (e) {
      console.error("Telegram notify failed", e);
    }
    setLoading(false);
    setSent(true);
    setDescription("");
    setName("");
    setContact("");
    toast.success(t("svc.sent"));
  };

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{t("svc.title")}</div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            <span className="text-gradient">{t("svc.headline1")}</span> {t("svc.headline2")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{t("svc.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {services.map((s) => {
            const active = selected === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => {
                  setSelected(s.key);
                  document.getElementById("brief-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`group relative overflow-hidden rounded-3xl glass p-6 text-left transition-all hover:-translate-y-1 hover:shadow-elegant ${
                  active ? "ring-2 ring-violet" : ""
                }`}
              >
                <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${s.gradient} opacity-30 blur-3xl group-hover:opacity-50 transition-opacity`} />
                <div className="relative">
                  <span className="size-11 grid place-items-center rounded-xl bg-secondary/60">
                    <s.Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold mt-5 leading-tight">{t(s.titleK)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(s.descK)}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-medium text-gradient">{t(s.priceK)}</span>
                    {active && (
                      <span className="inline-flex items-center gap-1 text-xs text-violet">
                        <Check className="size-3.5" /> {t("svc.selected")}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mb-8">{t("svc.priceNote")}</p>

        <form
          id="brief-form"
          onSubmit={submit}
          className="glass rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{t("svc.brief.title")}</div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-6">{t("svc.brief.headline")}</h3>

          <div className="space-y-5">
            <div>
              <label className="text-xs text-muted-foreground">{t("svc.brief.service")}</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSelected(s.key)}
                    className={`rounded-full px-4 h-10 text-sm transition-all ${
                      selected === s.key
                        ? "bg-foreground text-background"
                        : "glass hover:bg-secondary/60"
                    }`}
                  >
                    {t(s.titleK)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground" htmlFor="brief-desc">{t("svc.brief.desc")}</label>
              <textarea
                id="brief-desc"
                required
                rows={5}
                maxLength={2000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("svc.brief.descPlaceholder")}
                className="mt-1 w-full rounded-xl bg-secondary/50 border border-border px-4 py-3 outline-none focus:border-violet transition-colors resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="brief-name">{t("svc.brief.name")}</label>
                <input
                  id="brief-name"
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full h-12 rounded-xl bg-secondary/50 border border-border px-4 outline-none focus:border-violet transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">{t("svc.brief.channel")}</label>
                <div className="mt-1 flex gap-1.5">
                  {(["telegram", "viber", "phone"] as const).map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setContactType(c)}
                      className={`flex-1 h-12 rounded-xl text-sm transition-all ${
                        contactType === c
                          ? "bg-foreground text-background"
                          : "glass hover:bg-secondary/60"
                      }`}
                    >
                      {t(`svc.brief.${c}` as any)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground" htmlFor="brief-contact">{t("svc.brief.contact")}</label>
              <input
                id="brief-contact"
                required
                maxLength={200}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={
                  contactType === "phone"
                    ? "+380 ..."
                    : contactType === "viber"
                      ? "+380 ..."
                      : "@username"
                }
                className="mt-1 w-full h-12 rounded-xl bg-secondary/50 border border-border px-4 outline-none focus:border-violet transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 h-12 text-sm font-medium hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Sparkles className="size-4" />
              {loading ? t("svc.sending") : sent ? t("svc.sent") : t("svc.submit")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
