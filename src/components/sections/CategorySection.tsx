'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function CategorySection() {
  const t = useTranslations('categorySection');
  const router = useRouter();
  
  const categories = [
    { name: 'Tote Bags', image: '/images/nara_tote.jpg' },
    { name: 'Hand Bags', image: '/images/olivia_hand.jpg' },
    { name: 'Shoulder Bags', image: '/images/siena_shoulder.jpg' },
    { name: 'Mini Bags', image: '/images/isabella_tophandle.jpg' },
  ];

  return (
    <section className="bg-brand-cream py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t border-brand-border-light">
      <div className="mb-10 space-y-2">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-burgundy tracking-wider uppercase">
          {t('title')}
        </h2>
        <div className="w-16 h-0.5 bg-brand-gold mx-auto opacity-60" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => router.push(`/products?category=${encodeURIComponent(cat.name)}`)}
            className="group relative aspect-square sm:aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-brand-border-light cursor-pointer bg-white"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="inline-block px-6 py-2.5 bg-white/95 backdrop-blur-md text-brand-burgundy font-sans-luxury text-xs font-semibold tracking-widest uppercase rounded-sm shadow-lg">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
