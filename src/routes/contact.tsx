import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/sections/Contact";
import { fetchSeo, seoMeta } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  loader: async () => ({ seo: await fetchSeo("/contact") }),
  head: ({ loaderData }) =>
    seoMeta(
      loaderData?.seo ?? null,
      "Контакти — Kurshatsov.ai",
      "Напишіть мені — відповім на всі ваші питання. Telegram, Viber, Instagram.",
      "/contact"
    ),
  component: () => (
    <div className="pt-24">
      <Contact />
    </div>
  ),
});
