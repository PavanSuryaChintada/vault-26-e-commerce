import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type {
  CMSSection, Testimonial, FAQItem, AnnouncementBar,
  BrandSettings, ThemeSettings, SEOSettings,
} from '../types';

export function useCMSPage(slug: string) {
  const [sections, setSections] = useState<CMSSection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from('website_sections')
      .select('*')
      .eq('page_slug', slug)
      .eq('is_visible', true)
      .order('position', { ascending: true });
    setSections((data as unknown as CMSSection[]) ?? []);
    setLoading(false);
  }, [slug]);

  useEffect(() => { fetch(); }, [fetch]);

  return { sections, loading, refresh: fetch };
}

export function useTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('position', { ascending: true })
      .then(({ data }) => {
        setItems((data as unknown as Testimonial[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { items, loading };
}

export function useFAQs(category?: string) {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = supabase
      .from('faq_items')
      .select('*')
      .eq('is_active', true)
      .order('position', { ascending: true });
    if (category) q = q.eq('category', category);
    q.then(({ data }) => {
      setItems((data as unknown as FAQItem[]) ?? []);
      setLoading(false);
    });
  }, [category]);

  return { items, loading };
}

export function useActiveAnnouncementBar() {
  const [bar, setBar] = useState<AnnouncementBar | null>(null);

  useEffect(() => {
    const now = new Date().toISOString();
    supabase
      .from('announcement_bars')
      .select('*')
      .eq('is_active', true)
      .or(`starts_at.is.null,starts_at.lte.${now}`)
      .or(`ends_at.is.null,ends_at.gte.${now}`)
      .order('position', { ascending: true })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setBar(data as unknown as AnnouncementBar | null));
  }, []);

  return bar;
}

export function useBrandSettings() {
  const [brand, setBrand] = useState<BrandSettings | null>(null);
  useEffect(() => {
    supabase.from('brand_settings').select('*').limit(1).maybeSingle()
      .then(({ data }) => setBrand(data as unknown as BrandSettings | null));
  }, []);
  return brand;
}

export function useThemeSettings() {
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  useEffect(() => {
    supabase.from('theme_settings').select('*').limit(1).maybeSingle()
      .then(({ data }) => setTheme(data as unknown as ThemeSettings | null));
  }, []);
  return theme;
}
