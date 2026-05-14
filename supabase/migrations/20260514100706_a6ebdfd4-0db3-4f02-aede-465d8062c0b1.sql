-- Drop public listing policy on storage.objects (public bucket still serves via CDN URLs)
DROP POLICY IF EXISTS "Public read media" ON storage.objects;

-- Restrict has_role execution to authenticated only
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- Replace FOR ALL admin policies with specific commands per table
-- songs
DROP POLICY IF EXISTS "Admins write songs" ON public.songs;
CREATE POLICY "Admins insert songs" ON public.songs FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update songs" ON public.songs FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete songs" ON public.songs FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- videos
DROP POLICY IF EXISTS "Admins write videos" ON public.videos;
CREATE POLICY "Admins insert videos" ON public.videos FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update videos" ON public.videos FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete videos" ON public.videos FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- vibe_projects
DROP POLICY IF EXISTS "Admins write vibe_projects" ON public.vibe_projects;
CREATE POLICY "Admins insert vibe_projects" ON public.vibe_projects FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update vibe_projects" ON public.vibe_projects FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete vibe_projects" ON public.vibe_projects FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- courses
DROP POLICY IF EXISTS "Admins write courses" ON public.courses;
CREATE POLICY "Admins insert courses" ON public.courses FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update courses" ON public.courses FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete courses" ON public.courses FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- certificates
DROP POLICY IF EXISTS "Admins write certificates" ON public.certificates;
CREATE POLICY "Admins insert certificates" ON public.certificates FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update certificates" ON public.certificates FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete certificates" ON public.certificates FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- testimonials
DROP POLICY IF EXISTS "Admins write testimonials" ON public.testimonials;
CREATE POLICY "Admins insert testimonials" ON public.testimonials FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update testimonials" ON public.testimonials FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete testimonials" ON public.testimonials FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- user_roles: split FOR ALL into specific commands too
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins insert roles" ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update roles" ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete roles" ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));