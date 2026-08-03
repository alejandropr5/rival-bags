'use client';

import { useTranslations } from 'next-intl';

export default function BrandMessageBar() {
  const t = useTranslations('brandMessageBar');

  return (
    <section className="bg-brand-burgundy text-brand-cream py-7 px-6 sm:px-12 text-center border-y border-brand-burgundy-light">
      <div className="max-w-4xl mx-auto">
        <p className="font-sans-luxury text-xs sm:text-sm md:text-base leading-relaxed tracking-wide text-brand-border-soft font-light italic sm:not-italic">
          <span className="font-semibold text-brand-cream">{t('brandName')}</span> {t('message')}
        </p>
      </div>
    </section>
  );
}
