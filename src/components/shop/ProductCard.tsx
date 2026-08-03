'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, color: string) => void;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const t = useTranslations('productCard');

  const formatCOP = (val: number) =>
    `$${val.toLocaleString('es-CO')} COP`;

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group cursor-pointer bg-white rounded-md overflow-hidden transition-all duration-300 flex flex-col justify-between relative"
    >
      {/* Whole Card Link (Hard Navigation to bypass interceptor) */}
      <a 
        href={`/product/${product.id}`} 
        className="absolute inset-0 z-0" 
        title={product.name}
      />

      {/* Top Image Container */}
      <div className="relative w-full aspect-square bg-brand-cream overflow-hidden flex items-center justify-center p-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain object-center group-hover:scale-105 transition-transform duration-500 pointer-events-none"
          referrerPolicy="no-referrer"
        />

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <Link
            id={`quick-view-btn-${product.id}`}
            href={`/product/${product.id}`}
            scroll={false}
            className="w-full py-3 bg-brand-burgundy/60 backdrop-blur-sm text-brand-cream font-sans-luxury text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-brand-burgundy-dark/70 transition-colors"
          >
            <Eye className="w-4 h-4" />
            {t('quickViewBtn')}
          </Link>
        </div>
      </div>

      {/* Product Details Box */}
      <div className="p-5 text-left flex flex-col flex-1 justify-between space-y-2 bg-white pointer-events-none">
        <div>
          <h3 className="font-serif-luxury text-l sm:text-xl text-brand-ink font-bold tracking-tight leading-snug">
            {product.name}
          </h3>
        </div>

        <p className="font-sans-luxury text-sm font-medium text-brand-text-muted tracking-wide">
          {formatCOP(product.price)}
        </p>
      </div>
    </div>
  );
}
