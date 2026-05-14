import { createFileRoute } from "@tanstack/react-router";
import { Certificates } from "@/components/sections/Certificates";
import { fetchSeo, seoMeta } from "@/lib/site-content";

export const Route = createFileRoute("/certificates")({
  loader: async () => ({ seo: await fetchSeo("/certificates") }),
  head: ({ loaderData }) =>
    seoMeta(
      loaderData?.seo ?? null,
      "Сертифікати — Куршацов Андрій",
      "Підтверджена експертиза в AI, відео, музиці та веб-розробці.",
      "/certificates"
    ),
  component: () => <Certificates />,
});
