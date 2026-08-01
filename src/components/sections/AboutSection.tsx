'use client';

import Image from 'next/image';
import { Sparkles, Heart, Shield, Award } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="nosotras" className="bg-[#FAF6EE] pb-16 pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Brand Story Image */}
        <div className="relative h-96 sm:h-[480px] rounded-2xl overflow-hidden shadow-lg border border-[#EBE3D5]">
          <Image
            src="/images/lifestyle_bar.jpg"
            alt="Artesanía y diseño Rival Bags"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-[#FAF6EE] space-y-1">
            <span className="font-sans-luxury text-xs text-[#C5A059] uppercase tracking-widest font-semibold">
              Hecho a Mano en Colombia 🇨🇴
            </span>
            <h3 className="font-serif-luxury text-2xl font-semibold">
              Manos Maestras, Historias Tejidas
            </h3>
          </div>
        </div>

        {/* Right: Narrative */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-sans-luxury text-xs text-[#C5A059] uppercase tracking-widest font-semibold block">
              NUESTRA ESENCIA
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#3B141E] font-semibold leading-tight">
              Donde la tradición textil abraza la vanguardia del lujo
            </h2>
          </div>

          <p className="font-sans-luxury text-sm text-[#5C493B] leading-relaxed">
            En <strong>Rival Bags</strong>, cada bolso es concebido como una obra de arte portátil. Nacimos de la pasión por dignificar el saber hacer artesanal colombiano, fusionándolo con siluetas geométricas contemporáneas y una paleta cromática sofisticada.
          </p>

          <p className="font-sans-luxury text-sm text-[#5C493B] leading-relaxed">
            Nuestra colección inaugural, <strong>PUNTO ZERO</strong>, celebra el origen de cada hebra. Cada nudo representa horas de dedicación minuciosa por parte de mujeres artesanas, garantizando que nunca existan dos bolsos idénticos.
          </p>

          {/* Core Brand Pillars */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E0D5C1]">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans-luxury text-xs font-bold text-[#3B141E] uppercase">Unicidad Absoluta</h4>
                <p className="font-sans-luxury text-[11px] text-[#8C7A6B]">Cada pieza posee personalidad irrepetible.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Heart className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans-luxury text-xs font-bold text-[#3B141E] uppercase">Impacto Consciente</h4>
                <p className="font-sans-luxury text-[11px] text-[#8C7A6B]">Comercio justo con artesanas locales.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans-luxury text-xs font-bold text-[#3B141E] uppercase">Calidad Premium</h4>
                <p className="font-sans-luxury text-[11px] text-[#8C7A6B]">Cordones de alta resistencia duraderos.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Award className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans-luxury text-xs font-bold text-[#3B141E] uppercase">Sello de Autor</h4>
                <p className="font-sans-luxury text-[11px] text-[#8C7A6B]">Certificado de autenticidad en cada envío.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
