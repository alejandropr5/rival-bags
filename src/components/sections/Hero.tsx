'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const router = useRouter();
  const t = useTranslations('hero');

  return (
    <section id="inicio" className="relative w-full h-[82vh] min-h-[520px] max-h-[780px] overflow-hidden bg-brand-burgundy-dark">
      {/* Background Hero Image */}
      <div className="absolute inset-0 transition-transform duration-1000 scale-100 hover:scale-105">
        <Image
          src="/images/lifestyle_street.jpg"
          alt={t('imageAlt')}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft vignette gradient overlays for contrast and luxury mood */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-dark/80 via-transparent to-black/30 z-10" /> */}
      </div>

      {/* Hero Content Box */}
      <div className="relative max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-12 flex flex-col justify-center items-start text-left z-10">
        <div className="max-w-xl text-brand-cream space-y-4 sm:space-y-6">
          
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight drop-shadow-md">
            {t('title1')} <br />
            <span className="font-semibold tracking-normal">{t('title2')}</span>
          </h1>

          {/* <p className="font-sans-luxury text-sm sm:text-base tracking-[0.15em] text-brand-text-warm font-light">
            {t('collectionLabel')} <span className="font-medium text-brand-cream">{t('collectionName')}</span>
          </p> */}

          <div className="pt-2 sm:pt-4">
            <button
              id="hero-explore-btn"
              onClick={() => router.push('/productos')}
              className="inline-block px-8 py-3.5 bg-brand-cream-light text-brand-burgundy hover:bg-brand-cream font-sans-luxury text-xs tracking-[0.2em] font-medium uppercase rounded-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-brand-cream"
            >
              {t('ctaButton')}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
