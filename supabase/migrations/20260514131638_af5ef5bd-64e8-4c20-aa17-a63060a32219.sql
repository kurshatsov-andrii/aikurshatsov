CREATE TABLE public.briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL,
  description text NOT NULL,
  name text,
  contact text NOT NULL,
  contact_type text NOT NULL DEFAULT 'telegram',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.briefs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit briefs"
ON public.briefs FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(description) BETWEEN 1 AND 2000
  AND length(contact) BETWEEN 1 AND 200
  AND length(service) BETWEEN 1 AND 100
  AND (name IS NULL OR length(name) <= 100)
);

CREATE POLICY "Admins read briefs"
ON public.briefs FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update briefs"
ON public.briefs FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete briefs"
ON public.briefs FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));