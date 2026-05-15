import { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useActiveAnnouncementBar } from '@/cms/hooks/useCMSPage';

export default function AnnouncementBar() {
  const bar = useActiveAnnouncementBar();
  const [dismissed, setDismissed] = useState(false);

  if (!bar || dismissed) return null;

  return (
    <div
      className="w-full px-4 py-2.5 flex items-center justify-center gap-4 text-center relative"
      style={{ backgroundColor: bar.bg_color || '#000000', color: bar.text_color || '#ffffff' }}
    >
      <p className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-ui font-bold flex-1 text-center">
        {bar.message}
        {bar.cta_href && bar.cta_label && (
          <Link
            to={bar.cta_href}
            className="ml-3 underline underline-offset-2 hover:no-underline transition-all"
          >
            {bar.cta_label}
          </Link>
        )}
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
