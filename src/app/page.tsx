'use client';

import Hero from '@/components/sections/Hero';
import BrandMessageBar from '@/components/sections/BrandMessageBar';
import ProductCard from '@/components/shop/ProductCard';
import LifestyleSection from '@/components/sections/LifestyleSection';
import CategorySection from '@/components/sections/CategorySection';
import WhyShopWithUs from '@/components/sections/WhyShopWithUs';

import { PRODUCTS } from '@data/products';
import { useCart } from '@/context/CartContext';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Home() {
  const { addToCart } = useCart();
  const router = useRouter();
  const t = useTranslations('home');

  // Pick top 4 products for featured section
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="bg-brand-cream">
      <Hero />
      {/* <BrandMessageBar /> */}

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <div className="flex items-center space-x-2 text-brand-gold">
            <Sparkles className="w-5 h-5" />
            <span className="font-sans-luxury text-sm tracking-[0.2em] uppercase font-semibold">
              {t('featuredBadge')}
            </span>
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-ink text-center max-w-2xl leading-tight">
            {t('featuredTitle')}
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
            onClick={() => router.push('/products')}
          >
            {t('viewAllBtn')}
          </Button>
        </div>
      </section>

      <CategorySection />
      
      <LifestyleSection />
      
      <WhyShopWithUs />
    </div>
  );
}
