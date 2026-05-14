import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-semibold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-5 h-11 text-sm font-medium text-background hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-foreground text-background px-5 h-11 text-sm font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Куршацов Андрій — AI Creator & Vibe Coding Developer" },
      { name: "description", content: "Premium portfolio: AI music, AI video ads, vibe-coded products and AI courses by Андрій Куршацов." },
      { name: "author", content: "Kurshatsov Andrii" },
      { property: "og:title", content: "Куршацов Андрій — AI Creator & Vibe Coding Developer" },
      { property: "og:description", content: "Premium portfolio: AI music, AI video ads, vibe-coded products and AI courses by Андрій Куршацов." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Kurshatsov.ai" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "google-site-verification", content: "nmvx4wn1_8D9Qci1LZyDE-woV5YYYj9N57iDayZJ0nQ" },
      { name: "theme-color", content: "#0a0612" },
      { name: "twitter:title", content: "Куршацов Андрій — AI Creator & Vibe Coding Developer" },
      { name: "twitter:description", content: "Premium portfolio: AI music, AI video ads, vibe-coded products and AI courses by Андрій Куршацов." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a3809d12-96bf-4848-a804-98219c876daf/id-preview-8fbf2a25--0038991a-76b5-48b6-9040-2f3de2eed392.lovable.app-1778753658481.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a3809d12-96bf-4848-a804-98219c876daf/id-preview-8fbf2a25--0038991a-76b5-48b6-9040-2f3de2eed392.lovable.app-1778753658481.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Андрій Куршацов",
          alternateName: "Kurshatsov Andrii",
          jobTitle: "AI Creator, Vibe Coding Developer, Digital Producer",
          knowsAbout: ["AI Music", "AI Video Ads", "Vibe Coding", "Generative AI", "Web Development"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <ScrollTop />
          <Header />
          <main id="main" className="pt-20">
            <Outlet />
          </main>
          <Footer />
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function ScrollTop() {
  const router = useRouter();
  useEffect(() => {
    return router.subscribe("onResolved", () => {
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    });
  }, [router]);
  return null;
}
