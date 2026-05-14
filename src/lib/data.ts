import { supabase } from "@/integrations/supabase/client";

export type Lang = "uk" | "en";

export type DBSong = {
  id: string;
  title_uk: string;
  title_en: string;
  description_uk: string;
  description_en: string;
  genre: string;
  tags: string[];
  audio_url: string | null;
  cover_url: string;
  sort_order: number;
};

export type DBVideo = {
  id: string;
  title_uk: string;
  title_en: string;
  brand: string;
  description_uk: string;
  description_en: string;
  video_url: string;
  thumbnail_url: string;
  platform: string;
  sort_order: number;
};

export type DBVibeProject = {
  id: string;
  title_uk: string;
  title_en: string;
  description_uk: string;
  description_en: string;
  stack: string[];
  features: string[];
  live_url: string | null;
  github_url: string | null;
  screenshot_url: string;
  sort_order: number;
};

export type DBCourse = {
  id: string;
  title_uk: string;
  title_en: string;
  description_uk: string;
  description_en: string;
  icon: string;
  price: string | null;
  link_url: string | null;
  sort_order: number;
};

export type DBCertificate = {
  id: string;
  title: string;
  issuer: string;
  image_url: string;
  sort_order: number;
};

export type DBTestimonial = {
  id: string;
  name: string;
  role_uk: string;
  role_en: string;
  text_uk: string;
  text_en: string;
  avatar_url: string | null;
  sort_order: number;
};

const order = (table: string) =>
  supabase.from(table).select("*").order("sort_order", { ascending: true });

export const fetchSongs = async () => {
  const { data, error } = await order("songs");
  if (error) throw error;
  return (data ?? []) as DBSong[];
};
export const fetchVideos = async () => {
  const { data, error } = await order("videos");
  if (error) throw error;
  return (data ?? []) as DBVideo[];
};
export const fetchVibeProjects = async () => {
  const { data, error } = await order("vibe_projects");
  if (error) throw error;
  return (data ?? []) as DBVibeProject[];
};
export const fetchCourses = async () => {
  const { data, error } = await order("courses");
  if (error) throw error;
  return (data ?? []) as DBCourse[];
};
export const fetchCertificates = async () => {
  const { data, error } = await order("certificates");
  if (error) throw error;
  return (data ?? []) as DBCertificate[];
};
export const fetchTestimonials = async () => {
  const { data, error } = await order("testimonials");
  if (error) throw error;
  return (data ?? []) as DBTestimonial[];
};

export const pick = (lang: Lang, uk: string, en: string) =>
  lang === "uk" ? uk : en || uk;
