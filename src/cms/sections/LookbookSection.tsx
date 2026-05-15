import { motion } from 'framer-motion';
import type { CMSSection, LookbookConfig } from '../types';

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000',
  'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1000',
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000',
];

export default function LookbookSection({ section }: { section: CMSSection }) {
  const cfg = section.config as LookbookConfig;
  const images: string[] = Array.isArray(cfg.images) && cfg.images.length > 0
    ? cfg.images
    : DEFAULT_IMAGES;
  const heading = cfg.heading || 'Lookbook';

  return (
    <section id="lookbook" className="py-24 container-px bg-white">
      <div className="max-w-[1600px] mx-auto">
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl lg:text-9xl tracking-tight leading-none font-elegant font-light italic"
          >
            {heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden group cursor-pointer aspect-[3/4]"
            >
              <img
                src={img}
                alt={`Lookbook ${index + 1}`}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
