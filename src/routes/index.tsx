import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Courses } from "@/components/sections/Courses";
import { Certificates } from "@/components/sections/Certificates";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { fetchSeo, seoMeta } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  loader: async () => ({ seo: await fetchSeo("/") }),
  head: ({ loaderData }) =>
    seoMeta(
      loaderData?.seo ?? null,
      "Куршацов Андрій — AI Creator & Vibe Coding Developer",
      "Преміум-портфоліо: AI-музика, AI-відеореклама, vibe-coded продукти та AI-курси.",
      "/"
    ),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Courses />
      <Certificates />
      <Testimonials />
      <Contact />
    </>
  );
}
