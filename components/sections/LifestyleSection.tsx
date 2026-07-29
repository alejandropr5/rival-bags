'use client';

import Image from 'next/image';

export default function LifestyleSection() {
  const photos = [
    {
      src: '/images/lifestyle_bar.jpg',
      alt: 'Noche de cocteles con Rival Bag',
      title: 'Noches Elegantes',
    },
    {
      src: '/images/lifestyle_brunch.jpg',
      alt: 'Brunch al aire libre con amigas',
      title: 'Encuentros de Sol',
    },
    {
      src: '/images/lifestyle_street.jpg',
      alt: 'Paseo urbano de lujo',
      title: 'Estilo Urbano',
    },
    {
      src: '/images/lifestyle_dining.jpg',
      alt: 'Cena gourmet exclusiva',
      title: 'Momentos Unicos',
    },
  ];

  return (
    <section className="bg-[#FAF6EE] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t border-[#EBE3D5]">
      
      {/* Golden Luxury Heading */}
      <div className="mb-10 space-y-2">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#C5A059] tracking-wider uppercase">
          LIFESTYLE & INSPIRATION
        </h2>
        <div className="w-16 h-0.5 bg-[#C5A059] mx-auto opacity-60" />
      </div>

      {/* 4 Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {photos.map((item, index) => (
          <div
            key={index}
            className="group relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-sm border border-[#EBE3D5] cursor-pointer"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            
            {/* Subtle Gradient & Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute bottom-4 left-4 right-4 text-left">
              <span className="font-sans-luxury text-[11px] text-[#E8D7C3] uppercase tracking-widest block font-medium">
                Punto Zero
              </span>
              <h3 className="font-serif-luxury text-lg text-[#FAF6EE] font-semibold tracking-wide">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
