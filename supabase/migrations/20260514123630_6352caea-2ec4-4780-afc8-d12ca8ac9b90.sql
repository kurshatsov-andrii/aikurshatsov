
-- Site content (about + per-page SEO) editable via admin
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_content" ON public.site_content
  FOR SELECT TO public USING (true);

CREATE POLICY "Admins insert site_content" ON public.site_content
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update site_content" ON public.site_content
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete site_content" ON public.site_content
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed: About section
INSERT INTO public.site_content (key, value) VALUES
('about', jsonb_build_object(
  'photo_url', '',
  'description_uk', 'Куршацов Андрій — AI Creator та digital-спеціаліст з багаторічним досвідом у рекламі, створенні сайтів, AI-контенті, генерації музики, відео та вайбкодінгу. Допомагаю брендам і авторам говорити мовою майбутнього.',
  'description_en', 'Andrii Kurshatsov is an AI Creator and digital specialist with deep experience in advertising, web, AI content, music & video generation, and vibe coding. I help brands and creators speak the language of the future.',
  'tags', jsonb_build_array('Suno','Runway','Kling','Midjourney','TanStack','Supabase')
)),
('seo:/', jsonb_build_object(
  'title_uk','Куршацов Андрій — AI Creator & Vibe Coding Developer',
  'title_en','Kurshatsov Andrii — AI Creator & Vibe Coding Developer',
  'description_uk','Преміум-портфоліо: AI-музика, AI-відеореклама, vibe-coded продукти та AI-курси.',
  'description_en','Premium portfolio: AI music, AI video ads, vibe-coded products and AI courses.'
)),
('seo:/ai-songs', jsonb_build_object(
  'title_uk','AI музика — Куршацов Андрій',
  'title_en','AI Songs — Kurshatsov Andrii',
  'description_uk','AI-згенеровані пісні: synthwave, electronic, lo-fi pop.',
  'description_en','AI-generated songs: synthwave, electronic, lo-fi pop.'
)),
('seo:/ai-video-ads', jsonb_build_object(
  'title_uk','AI відеореклама — Куршацов Андрій',
  'title_en','AI Video Ads — Kurshatsov Andrii',
  'description_uk','AI-згенерована відеореклама для брендів.',
  'description_en','AI-generated video ads for brands.'
)),
('seo:/vibe-coding', jsonb_build_object(
  'title_uk','Vibe Coding — Куршацов Андрій',
  'title_en','Vibe Coding — Kurshatsov Andrii',
  'description_uk','Vibe-coded продукти та сайти.',
  'description_en','Vibe-coded products and websites.'
)),
('seo:/courses', jsonb_build_object(
  'title_uk','Курси — Куршацов Андрій',
  'title_en','Courses — Kurshatsov Andrii',
  'description_uk','AI-курси: створи пісню та кліп з ШІ, створи рекламу бренду з ШІ.',
  'description_en','AI courses: make songs & video ads with AI.'
)),
('seo:/certificates', jsonb_build_object(
  'title_uk','Сертифікати — Куршацов Андрій',
  'title_en','Certificates — Kurshatsov Andrii',
  'description_uk','Підтверджена експертиза в AI, відео, музиці та веб-розробці.',
  'description_en','Verified expertise in AI, video, music and web development.'
));
