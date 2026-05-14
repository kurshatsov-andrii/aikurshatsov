import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/sections/Services";
import { fetchSeo, seoMeta } from "@/lib/site-content";

export const Route = createFileRoute("/services")({
  loader: async () => ({ seo: await fetchSeo("/services") }),
  head: ({ loaderData }) =>
    seoMeta(
      loaderData?.seo ?? null,
      "Послуги — AI пісні, відео, реклама та сайти",
      "ШІ-музика, відеокліпи, відеореклама та сайти для бізнесу і особистого бренду. Заповніть бриф — отримайте оцінку.",
      "/services"
    ),
  component: () => (
    <div className="pt-24">
      <Services />
    </div>
  ),
});
