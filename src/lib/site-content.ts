import { supabase } from "@/integrations/supabase/client";

export type SeoValue = {
  title_uk: string;
  title_en: string;
  description_uk: string;
  description_en: string;
};

export type AboutValue = {
  photo_url: string;
  description_uk: string;
  description_en: string;
  tags: string[];
};

export async function fetchSiteContent<T = unknown>(key: string): Promise<T | null> {
  const { data, error } = await (supabase as any)
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) return null;
  return (data?.value ?? null) as T | null;
}

export async function fetchSeo(path: string): Promise<SeoValue | null> {
  return fetchSiteContent<SeoValue>(`seo:${path}`);
}

export function seoMeta(seo: SeoValue | null, fallbackTitle: string, fallbackDesc: string, path: string) {
  const title = seo?.title_uk || fallbackTitle;
  const description = seo?.description_uk || fallbackDesc;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: path },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
