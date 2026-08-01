'use client';

import AboutSection from '@/src/components/sections/AboutSection';
import { Sparkles } from 'lucide-react';

export default function NosotrasPage() {
  return (
    <div className="bg-[#FAF6EE] min-h-screen pt-24 pb-16">
      {/* <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-[#C5A059]">
            <Sparkles className="w-5 h-5" />
            <span className="font-sans-luxury text-sm tracking-[0.2em] uppercase font-semibold">
              Nuestra Historia
            </span>
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#2A181C] text-center max-w-2xl leading-tight">
            Artesanía, Diseño y Pasión
          </h1>
        </div>
      </div> */}
      
      <AboutSection />
    </div>
  );
}
