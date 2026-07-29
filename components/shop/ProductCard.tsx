'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/types/product';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, color: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const formatCOP = (val: number) =>
    `$${val.toLocaleString('es-CO')} COP`;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.colors[0]);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-white rounded-xl overflow-hidden border border-[#EBE3D5] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <Link 
        href={`/producto/${product.id}`}
        scroll={false}
        className="relative w-full aspect-square bg-[#FAF6EE] overflow-hidden cursor-pointer flex items-center justify-center p-4 block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Favorite Wishlist Icon Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#3B141E] hover:text-[#C5A059] shadow-xs hover:scale-110 transition-all z-10"
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#8B1E3F] text-[#8B1E3F]' : ''}`} />
        </button>

        {/* New Tag if product.isNew */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#3B141E] text-[#FAF6EE] text-[10px] font-sans-luxury font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-xs shadow-xs z-10">
            Punto Zero
          </span>
        )}

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none sm:pointer-events-auto z-20">
          <div
            id={`quick-view-btn-${product.id}`}
            className="px-4 py-2 bg-white/95 text-[#3B141E] font-sans-luxury text-xs font-semibold tracking-wider rounded-sm shadow-md hover:bg-[#3B141E] hover:text-white transition-all transform -translate-y-2 group-hover:translate-y-0"
          >
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              VISTA RÁPIDA
            </span>
          </div>
        </div>
      </Link>

      {/* Product Details Box */}
      <div className="p-5 text-center flex flex-col items-center flex-1 justify-between space-y-3 bg-white">
        
        <div>
          <h3 className="font-serif-luxury text-lg sm:text-xl text-[#2A181C] font-semibold tracking-tight leading-snug">
            {product.name}
          </h3>
          <p className="font-sans-luxury text-xs text-[#8C7A6B] mt-1">
            {product.colors.length} {product.colors.length === 1 ? 'color disponible' : 'colores disponibles'}
          </p>
        </div>

        <div className="space-y-3 w-full">
          <p className="font-sans-luxury text-sm font-bold text-[#3B141E] tracking-wide">
            {formatCOP(product.price)}
          </p>

          <div className="flex items-center gap-2 w-full pt-1">
            {/* Primary VER DETALLE Button */}
            <a
              id={`ver-detalle-btn-${product.id}`}
              href={`/producto/${product.id}`}
              className="flex-1 py-2 px-3 border border-[#3B141E] text-[#3B141E] hover:bg-[#3B141E] hover:text-[#FAF6EE] font-sans-luxury text-[11px] sm:text-xs font-medium tracking-[0.15em] uppercase transition-all duration-200 rounded-xs cursor-pointer block text-center"
            >
              VER DETALLE
            </a>

            {/* Quick Add To Cart Button */}
            <button
              id={`quick-add-btn-${product.id}`}
              type="button"
              onClick={handleQuickAdd}
              className={`p-2 rounded-xs border transition-all cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-[#3B141E] text-[#FAF6EE] border-[#3B141E] hover:bg-[#2B0C15]'
              }`}
              title="Añadir directo al carrito"
            >
              {addedAnimation ? (
                <Check className="w-4 h-4 animate-scale-in" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
