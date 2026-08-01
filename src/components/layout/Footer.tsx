'use client';

import Image from 'next/image';
import { Instagram, MessageCircle } from 'lucide-react';
import { BRAND_CONSTANTS } from '@/lib/constants';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#3B141E] text-[#FAF6EE] pt-16 pb-8 border-t border-[#4A1D29]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Main Section */}
        <div className="flex flex-col items-center justify-center space-y-2 pb-12 border-b border-[#4A1D29]">
          
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('inicio')}
            className="group flex items-center justify-center cursor-pointer focus:outline-none"
          >
            <Image
              src="/images/Logo_RB_white.svg"
              alt="Rival Bags Logo"
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
                className="hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                Catálogo
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('nosotras')}
                className="hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                Nosotras
              </button>
            </li>
          </ul>

          {/* Socials */}
          <div className="flex items-center space-x-5 pt-8">
            <a
              href={BRAND_CONSTANTS.INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[#D8C2B0] flex items-center justify-center text-[#FAF6EE] hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#2B0C15] transition-all"
              title="Instagram"
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a
              href={BRAND_CONSTANTS.WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[#D8C2B0] flex items-center justify-center text-[#FAF6EE] hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all"
              title="WhatsApp"
            >
              <MessageCircle className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 text-center flex flex-col items-center">
          <p className="font-sans-luxury text-[11px] text-[#A89280] tracking-wider uppercase">
            © {new Date().getFullYear()} Rival Bags · Todos los derechos reservados
          </p>
        </div>

      </div>
    </footer>
  );
}
