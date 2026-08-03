'use client';

import Image from 'next/image';
import { Instagram, MessageCircle } from 'lucide-react';
import { BRAND_CONSTANTS } from '@/lib/constants';
import { useTranslations } from 'next-intl';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const t = useTranslations('footer');

  return (
    <footer className="bg-brand-burgundy text-brand-cream pt-16 pb-8 border-t border-brand-burgundy-light">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Main Section */}
        <div className="flex flex-col items-center justify-center space-y-2 pb-12 border-b border-brand-burgundy-light">
          
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('inicio')}
            className="group flex items-center justify-center cursor-pointer focus:outline-none"
          >
            <Image
              src="/images/Logo_RB_white.svg"
              alt={t('logoAlt')}
              width={160}
              height={160}
              priority
              className="h-24 w-24 sm:h-30 sm:w-30 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </button>
          
          {/* Navigation */}
          <ul className="flex-row items-center space-y-4 sm:space-y-6 font-sans-luxury text-xs font-semibold tracking-[0.2em] uppercase text-white">
            <li>
              <button
                onClick={() => onNavigate('catalogo')}
                className="hover:text-brand-gold transition-colors cursor-pointer"
              >
                {t('navCatalog')}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('nosotras')}
                className="hover:text-brand-gold transition-colors cursor-pointer"
              >
                {t('navNosotras')}
              </button>
            </li>
          </ul>

          {/* Socials */}
          <div className="flex items-center space-x-5 pt-8">
            <a
              href={BRAND_CONSTANTS.INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-brand-border-gold flex items-center justify-center text-brand-cream hover:bg-brand-gold hover:border-brand-gold hover:text-brand-burgundy-dark transition-all"
              title={t('instagramTitle')}
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a
              href={BRAND_CONSTANTS.WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-brand-border-gold flex items-center justify-center text-brand-cream hover:bg-brand-whatsapp hover:border-brand-whatsapp hover:text-white transition-all"
              title={t('whatsappTitle')}
            >
              <MessageCircle className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 text-center flex flex-col items-center">
          <p className="font-sans-luxury text-[11px] text-brand-text-caption tracking-wider uppercase">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>

      </div>
    </footer>
  );
}
