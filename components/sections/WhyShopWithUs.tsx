'use client';

import { Truck, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function WhyShopWithUs() {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-[#C5A059]" />,
      title: "Envíos a Nivel Nacional",
      desc: "Entregas seguras a toda Colombia. Gratis por compras superiores a $200.000 COP."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-[#C5A059]" />,
      title: "Artesanía 100% Colombiana",
      desc: "Cada pieza es tejida a mano por artesanas expertas, garantizando exclusividad y calidad."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#C5A059]" />,
      title: "Pagos 100% Seguros",
      desc: "Múltiples medios de pago con la más alta seguridad para proteger tus datos."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#C5A059]" />,
      title: "Diseño Único",
      desc: "Producción limitada (Punto Zero). No encontrarás dos bolsos exactamente iguales."
    }
  ];

  return (
    <section className="bg-[#FAF6EE] text-[#2A181C] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#EBE3D5]">
      <div className="max-w-7xl mx-auto text-center space-y-16">
        <div className="space-y-4">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#3B141E] uppercase tracking-widest">
            ¿Por qué elegir Rival Bags?
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto opacity-60" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div key={i} className="flex flex-col items-center space-y-5 p-8 bg-white rounded-2xl shadow-sm border border-[#EBE3D5] hover:-translate-y-2 transition-transform duration-300">
              <div className="p-4 bg-[#F9F7F2] rounded-full border border-[#EBE3D5] shadow-inner text-[#3B141E]">
                {item.icon}
              </div>
              <h3 className="font-sans-luxury text-sm font-semibold tracking-wider uppercase text-[#3B141E]">
                {item.title}
              </h3>
              <p className="font-sans-luxury text-xs text-[#594A42] leading-relaxed max-w-[250px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
