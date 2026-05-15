import { Suspense } from 'react';
import { useSEO } from '@/lib/useSEO';
import { useCMSPage } from '@/cms/hooks/useCMSPage';
import { SECTION_COMPONENTS } from '@/cms/registry';
import type { CMSSection } from '@/cms/types';

function SectionRenderer({ section }: { section: CMSSection }) {
  const Component = SECTION_COMPONENTS[section.section_type as keyof typeof SECTION_COMPONENTS];
  if (!Component) return null;
  return (
    <Suspense fallback={null}>
      <Component section={section} />
    </Suspense>
  );
}

export default function Home() {
  useSEO({
    title: 'VAULT 26 — Premium Streetwear Archive',
    description: 'Where high fashion meets street authenticity. Not just worn. Remembered.',
  });
  const { sections, loading } = useCMSPage('home');

  if (loading) return <div className="min-h-screen bg-white" />;

  return (
    <div className="bg-white">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
