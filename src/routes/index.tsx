import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Courses } from "@/components/sections/Courses";
import { Certificates } from "@/components/sections/Certificates";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
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
