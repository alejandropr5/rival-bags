'use client';

import Image from 'next/image';
import { Sparkles, Heart, Shield, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="nosotras" className="bg-brand-cream pb-16 pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Brand Story Image */}
        <div className="relative h-96 sm:h-[480px] rounded-2xl overflow-hidden shadow-lg border border-brand-border-light">
          <Image
            src="/images/lifestyle_bar.jpg"
            alt={t('imageAlt')}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-brand-cream space-y-1">
            <span className="font-sans-luxury text-xs text-brand-gold uppercase tracking-widest font-semibold">
              {t('imageBadge')}
            </span>
            <h3 className="font-serif-luxury text-2xl font-semibold">
              {t('imageTitle')}
            </h3>
          </div>
        </div>

        {/* Right: Narrative */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-sans-luxury text-xs text-brand-gold uppercase tracking-widest font-semibold block">
              {t('badge')}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-brand-burgundy font-semibold leading-tight">
              {t('title')}
            </h2>
          </div>

          <p className="font-sans-luxury text-sm text-brand-text-secondary leading-relaxed">
            {t('paragraph1Before')}<strong>{t('paragraph1Brand')}</strong>{t('paragraph1After')}
          </p>

          <p className="font-sans-luxury text-sm text-brand-text-secondary leading-relaxed">
            {t('paragraph2Before')}<strong>{t('paragraph2Collection')}</strong>{t('paragraph2After')}
          </p>

          {/* Core Brand Pillars */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-border-input">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans-luxury text-xs font-bold text-brand-burgundy uppercase">{t('pillar1Title')}</h4>
                <p className="font-sans-luxury text-[11px] text-brand-text-light">{t('pillar1Desc')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Heart className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans-luxury text-xs font-bold text-brand-burgundy uppercase">{t('pillar2Title')}</h4>
                <p className="font-sans-luxury text-[11px] text-brand-text-light">{t('pillar2Desc')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans-luxury text-xs font-bold text-brand-burgundy uppercase">{t('pillar3Title')}</h4>
                <p className="font-sans-luxury text-[11px] text-brand-text-light">{t('pillar3Desc')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Award className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans-luxury text-xs font-bold text-brand-burgundy uppercase">{t('pillar4Title')}</h4>
                <p className="font-sans-luxury text-[11px] text-brand-text-light">{t('pillar4Desc')}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
