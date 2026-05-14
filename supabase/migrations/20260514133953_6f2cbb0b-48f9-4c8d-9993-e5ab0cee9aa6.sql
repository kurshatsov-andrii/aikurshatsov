CREATE TABLE public.clips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_uk TEXT NOT NULL,
  title_en TEXT NOT NULL,
  artist TEXT NOT NULL DEFAULT '',
  description_uk TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT NOT NULL DEFAULT '',
  platform TEXT NOT NULL DEFAULT 'YouTube',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read clips" ON public.clips FOR SELECT USING (true);
CREATE POLICY "Admins insert clips" ON public.clips FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update clips" ON public.clips FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete clips" ON public.clips FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER set_clips_updated_at BEFORE UPDATE ON public.clips FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();