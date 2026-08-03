'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { X, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BRAND_CONSTANTS } from '@/lib/constants';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string, quantity: number) => void;
  showMoreDetailsBtn?: boolean;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  showMoreDetailsBtn,
}: ProductModalProps) {
  const tProduct = useTranslations('productModal');
  const tWhatsApp = useTranslations('whatsapp');

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0] || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!product) return null;

  const formatCOP = (val: number) =>
    `$${val.toLocaleString('es-CO')} COP`;

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      tWhatsApp('productInquiry', {
        name: product.name,
        color: selectedColor,
        price: product.price.toLocaleString('es-CO')
      })
    );
    const phone = BRAND_CONSTANTS.WHATSAPP_NUMBER.replace(/\+/g, '');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-brand-border-light relative flex flex-col md:flex-row max-h-[90vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-cream text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 bg-brand-cream p-8 flex flex-col items-center justify-center relative min-h-[320px]">
          <div className="relative w-full h-80 sm:h-96">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-brand-text-light">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{tProduct('handmadeBadge')}</span>
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="font-sans-luxury text-xs text-brand-gold uppercase tracking-widest font-semibold">
                {product.category}
              </span>
              {product.isNew && (
                <span className="bg-brand-burgundy text-brand-cream text-[10px] font-sans-luxury uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold">
                  {tProduct('newBadge')}
                </span>
              )}
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-brand-ink">
              {product.name}
            </h2>

            <p className="font-sans-luxury text-xl font-bold text-brand-burgundy">
              {formatCOP(product.price)}
            </p>

            <p className="font-sans-luxury text-sm text-brand-text-secondary leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches Selection */}
            <div className="space-y-2 pt-2 border-t border-brand-border-divider">
              <label className="font-sans-luxury text-xs text-brand-text-subtle font-semibold uppercase tracking-wider block">
                {tProduct('colorLabel')} <span className="text-brand-burgundy font-bold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={color}
                      id={`modal-color-${color.toLowerCase().replace(/\s+/g, '-')}`}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-full font-sans-luxury text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-brand-burgundy text-white font-medium shadow-xs ring-2 ring-offset-1 ring-brand-burgundy'
                          : 'bg-brand-cream text-brand-text-secondary border border-brand-border-input hover:bg-brand-border-light'
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dimensions & Materials Accordion/List */}
            <div className="space-y-2 text-xs text-brand-text-subtle pt-2 border-t border-brand-border-divider">
              <p><strong>{tProduct('dimensionsLabel')}</strong> {product.dimensions}</p>
              <p><strong>{tProduct('materialsLabel')}</strong> {product.material}</p>
            </div>

            {/* Quantity Selector */}
            <div className="pt-2 flex items-center gap-4">
              <span className="font-sans-luxury text-xs font-semibold uppercase tracking-wider text-brand-text-subtle">
                {tProduct('quantityLabel')}
              </span>
              <div className="flex items-center border border-brand-border-input rounded-lg overflow-hidden bg-brand-cream">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold text-brand-burgundy hover:bg-brand-border-light transition"
                >
                  -
                </button>
                <span className="px-4 py-1 font-sans-luxury text-sm font-semibold text-brand-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-bold text-brand-burgundy hover:bg-brand-border-light transition"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-brand-border-divider">
            <button
              id="modal-add-to-cart-btn"
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 font-sans-luxury text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-700 text-white'
                  : 'bg-brand-burgundy text-brand-cream hover:bg-brand-burgundy-dark'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  {tProduct('addedToCartBtn')}
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  {tProduct('addToCartBtn', { price: formatCOP(product.price * quantity) })}
                </>
              )}
            </button>

            <button
              id="modal-whatsapp-btn"
              type="button"
              onClick={handleWhatsAppInquiry}
              className="w-full py-3 px-6 border border-brand-whatsapp text-brand-whatsapp-dark hover:bg-brand-whatsapp hover:text-white font-sans-luxury text-xs font-medium tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              {tProduct('whatsappBtn')}
            </button>

            {showMoreDetailsBtn && (
              <a
                href={`/producto/${product.id}`}
                className="w-full py-3 px-6 border border-brand-burgundy text-brand-burgundy hover:bg-brand-burgundy hover:text-brand-cream font-sans-luxury text-xs font-medium tracking-wider rounded-sm transition-colors items-center justify-center gap-2 cursor-pointer mt-2 block text-center"
              >
                {tProduct('moreDetailsBtn')}
              </a>
            )}

            {/* Badges */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-brand-text-light pt-2">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-gold" />
                <span>{tProduct('badgeShipping')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                <span>{tProduct('badgeHandcraft')}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
