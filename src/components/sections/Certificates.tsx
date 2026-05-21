import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { fetchCertificates, type DBCertificate } from "@/lib/data";

export function Certificates() {
  const { t } = useI18n();
  const { data: certificates = [] } = useQuery({ queryKey: ["certificates"], queryFn: fetchCertificates });
  const [active, setActive] = useState<DBCertificate | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="certificates" className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{t("certs.title")}</div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            {t("certs.headline1")} <span className="text-gradient">{t("certs.headline2")}</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">{t("certs.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certificates.map((c, i) => (
            <motion.button
              type="button"
              onClick={() => setActive(c)}
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1 text-left"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={c.image_url} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-4">
                <div className="text-xs text-muted-foreground">{c.issuer}</div>
                <h3 className="font-medium mt-1 leading-snug">{c.title}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 size-10 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground grid place-items-center"
          >
            <X className="size-5" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.image_url}
              alt={active.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="text-center">
              <div className="text-xs text-muted-foreground">{active.issuer}</div>
              <h3 className="font-display text-lg font-semibold">{active.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
