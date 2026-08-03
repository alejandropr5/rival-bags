'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function LifestyleSection() {
  const t = useTranslations('lifestyleSection');

  const photos = [
    {
      src: '/images/lifestyle_bar.jpg',
      alt: t('photos.bar.alt'),
      title: t('photos.bar.title'),
    },
    {
      src: '/images/lifestyle_brunch.jpg',
      alt: t('photos.brunch.alt'),
      title: t('photos.brunch.title'),
    },
    {
      src: '/images/lifestyle_street.jpg',
      alt: t('photos.street.alt'),
      title: t('photos.street.title'),
    },
    {
      src: '/images/lifestyle_dining.jpg',
      alt: t('photos.dining.alt'),
      title: t('photos.dining.title'),
    },
  ];

  return (
    <section className="bg-brand-cream py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t border-brand-border-light">
      
      {/* Golden Luxury Heading */}
      <div className="mb-10 space-y-2">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-gold tracking-wider uppercase">
          {t('heading')}
        </h2>
        <div className="w-16 h-0.5 bg-brand-gold mx-auto opacity-60" />
      </div>

      {/* 4 Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {photos.map((item, index) => (
          <div
            key={index}
            className="group relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-sm border border-brand-border-light cursor-pointer"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            
            {/* Subtle Gradient & Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute bottom-4 left-4 right-4 text-left">
              <span className="font-sans-luxury text-[11px] text-brand-text-warm uppercase tracking-widest block font-medium">
                {t('collectionLabel')}
              </span>
              <h3 className="font-serif-luxury text-lg text-brand-cream font-semibold tracking-wide">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
