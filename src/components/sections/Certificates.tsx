import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { certificates } from "@/lib/portfolio-data";

export function Certificates() {
  const { t } = useI18n();
  return (
    <section id="certificates" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            {t("certs.title")}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Підтверджена <span className="text-gradient">експертиза</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">{t("certs.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certificates.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-muted-foreground">{c.issuer}</div>
                <h3 className="font-medium mt-1 leading-snug">{c.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
