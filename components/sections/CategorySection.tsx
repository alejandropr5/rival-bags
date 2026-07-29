'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CategorySection() {
  const router = useRouter();
  
  const categories = [
    { name: 'Tote Bags', image: '/images/nara_tote.jpg' },
    { name: 'Hand Bags', image: '/images/olivia_hand.jpg' },
    { name: 'Shoulder Bags', image: '/images/siena_shoulder.jpg' },
    { name: 'Mini Bags', image: '/images/isabella_tophandle.jpg' },
  ];

  return (
    <section className="bg-[#FAF6EE] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t border-[#EBE3D5]">
      <div className="mb-10 space-y-2">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3B141E] tracking-wider uppercase">
          Comprar por Categorías
        </h2>
        <div className="w-16 h-0.5 bg-[#C5A059] mx-auto opacity-60" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => router.push(`/productos?category=${encodeURIComponent(cat.name)}`)}
            className="group relative aspect-square sm:aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-[#EBE3D5] cursor-pointer bg-white"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="inline-block px-6 py-2.5 bg-white/95 backdrop-blur-md text-[#3B141E] font-sans-luxury text-xs font-semibold tracking-widest uppercase rounded-sm shadow-lg">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
