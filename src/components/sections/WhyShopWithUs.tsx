'use client';

import { Truck, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhyShopWithUs() {
  const t = useTranslations('whyShopWithUs');

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-brand-gold" />,
      title: t('feature1Title'),
      desc: t('feature1Desc')
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-brand-gold" />,
      title: t('feature2Title'),
      desc: t('feature2Desc')
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-gold" />,
      title: t('feature3Title'),
      desc: t('feature3Desc')
    },
    {
      icon: <Sparkles className="w-8 h-8 text-brand-gold" />,
      title: t('feature4Title'),
      desc: t('feature4Desc')
    }
  ];

  return (
    <section className="bg-brand-cream text-brand-ink py-20 px-4 sm:px-6 lg:px-8 border-t border-brand-border-light">
      <div className="max-w-7xl mx-auto text-center space-y-16">
        <div className="space-y-4">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-brand-burgundy uppercase tracking-widest">
            {t('title')}
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto opacity-60" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div key={i} className="flex flex-col items-center space-y-5 p-8 bg-white rounded-2xl shadow-sm border border-brand-border-light hover:-translate-y-2 transition-transform duration-300">
              <div className="p-4 bg-brand-cream-ultralight rounded-full border border-brand-border-light shadow-inner text-brand-burgundy">
                {item.icon}
              </div>
              <h3 className="font-sans-luxury text-sm font-semibold tracking-wider uppercase text-brand-burgundy">
                {item.title}
              </h3>
              <p className="font-sans-luxury text-xs text-brand-text-muted leading-relaxed max-w-[250px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
