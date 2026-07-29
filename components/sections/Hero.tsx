'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Hero() {
  const router = useRouter();

  return (
    <section id="inicio" className="relative w-full h-[82vh] min-h-[520px] max-h-[780px] overflow-hidden bg-[#2B0C15]">
      {/* Background Hero Image */}
      <div className="absolute inset-0 transition-transform duration-1000 scale-100 hover:scale-105">
        <Image
          src="/images/hero_banner.png"
          alt="Rival Bags Hero Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft vignette gradient overlays for contrast and luxury mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B0C15]/80 via-transparent to-black/30 z-10" />
      </div>

      {/* Hero Content Box */}
      <div className="relative max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-12 flex flex-col justify-center items-start text-left z-10">
        <div className="max-w-xl text-[#FAF6EE] space-y-4 sm:space-y-6">
          
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight drop-shadow-md">
            EL LUJO DE LO <br />
            <span className="font-semibold tracking-normal">IRREPETIBLE</span>
          </h1>

          <p className="font-sans-luxury text-sm sm:text-base tracking-[0.15em] text-[#E8D7C3] font-light">
            Colección Inaugural: <span className="font-medium text-[#FAF6EE]">PUNTO ZERO</span>
          </p>

          <div className="pt-2 sm:pt-4">
            <button
              id="hero-explore-btn"
              onClick={() => router.push('/productos')}
              className="inline-block px-8 py-3.5 bg-[#F5EFE6] text-[#3B141E] hover:bg-[#FAF6EE] font-sans-luxury text-xs tracking-[0.2em] font-medium uppercase rounded-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-[#FAF6EE]"
            >
              EXPLORAR LA COLECCIÓN
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
