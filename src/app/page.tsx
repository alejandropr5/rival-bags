'use client';

import Hero from '@/src/components/sections/Hero';
import BrandMessageBar from '@/src/components/sections/BrandMessageBar';
import ProductCard from '@/src/components/shop/ProductCard';
import LifestyleSection from '@/src/components/sections/LifestyleSection';
import CategorySection from '@/src/components/sections/CategorySection';
import WhyShopWithUs from '@/src/components/sections/WhyShopWithUs';

import { PRODUCTS } from '@/data/products';
import { useCart } from '@/src/context/CartContext';
import { Sparkles } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { addToCart } = useCart();
  const router = useRouter();

  // Pick top 4 products for featured section
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="bg-[#FAF6EE]">
      <Hero />
      <BrandMessageBar />

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <div className="flex items-center space-x-2 text-[#C5A059]">
            <Sparkles className="w-5 h-5" />
            <span className="font-sans-luxury text-sm tracking-[0.2em] uppercase font-semibold">
              Colección Destacada
            </span>
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A181C] text-center max-w-2xl leading-tight">
            Nuestros Diseños Más Icónicos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p, color) => addToCart(p, color)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            className="px-8 py-3"
            onClick={() => router.push('/productos')}
          >
            Ver Colección Completa
          </Button>
        </div>
      </section>

      <CategorySection />
      
      <LifestyleSection />
      
      <WhyShopWithUs />
    </div>
  );
}
