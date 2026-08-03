'use client';
import { use, useState } from 'react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PRODUCTS } from '@data/products';
import { useCart } from '@/context/CartContext';
import { BRAND_CONSTANTS } from '@/lib/constants';
import { ShoppingBag, ArrowLeft, Truck, ShieldCheck, HeartHandshake, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function FullProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = PRODUCTS.find((p) => p.id === id);
  const router = useRouter();
  const t = useTranslations('productDetailPage');
  const tWhatsApp = useTranslations('whatsapp');

  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!product) return notFound();

  const formatCOP = (val: number) => `$${val.toLocaleString('es-CO')} COP`;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1200);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      tWhatsApp('productInquiry', {
        name: product.name,
        color: selectedColor,
        price: product.price.toLocaleString('es-CO'),
      })
    );
    const phone = BRAND_CONSTANTS.WHATSAPP_NUMBER.replace(/\+/g, '');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-brand-text-light hover:text-brand-burgundy transition-colors font-sans-luxury text-xs font-semibold tracking-widest uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backButton')}
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-brand-border-light overflow-hidden flex flex-col lg:flex-row">
          
          {/* Image Gallery Column */}
          <div className="lg:w-1/2 bg-brand-cream-ultralight p-8 sm:p-12 flex items-center justify-center relative min-h-[400px]">
            {product.isNew && (
              <span className="absolute top-6 left-6 bg-brand-burgundy text-brand-cream text-xs font-sans-luxury font-semibold uppercase tracking-widest px-3 py-1 rounded-sm shadow-md z-10">
                {t('newBadge')}
              </span>
            )}
            <div className="relative w-full aspect-square max-w-md">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col">
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-brand-ink font-semibold tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="font-sans-luxury text-sm tracking-widest uppercase text-brand-text-light mb-6">
              {product.category}
            </p>
            
            <p className="font-sans-luxury text-2xl font-bold text-brand-burgundy tracking-wide mb-8">
              {formatCOP(product.price)}
            </p>
            
            <div className="prose prose-sm font-sans text-brand-text-muted leading-relaxed mb-8">
              <p>{product.description}</p>
              <ul className="mt-4 space-y-1">
                <li><strong>{t('materialLabel')}</strong> {product.material}</li>
                <li><strong>{t('dimensionsLabel')}</strong> {product.dimensions}</li>
              </ul>
            </div>

            <div className="mb-8">
              <label className="block font-sans-luxury text-xs font-semibold tracking-widest text-brand-ink uppercase mb-3">
                {t('colorLabel')} <span className="text-brand-text-light">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs font-sans font-medium uppercase tracking-wider rounded-sm transition-all border ${
                      selectedColor === color
                        ? 'border-brand-burgundy bg-brand-burgundy text-white shadow-md'
                        : 'border-brand-border-input text-brand-text-muted hover:border-brand-burgundy hover:text-brand-burgundy'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 flex items-center gap-4">
              <label className="font-sans-luxury text-xs font-semibold tracking-widest text-brand-ink uppercase">
                {t('quantityLabel')}
              </label>
              <div className="flex items-center border border-brand-border-input rounded-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-brand-text-muted hover:text-brand-burgundy hover:bg-brand-cream-ultralight transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-sans-luxury text-sm text-brand-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-brand-text-muted hover:text-brand-burgundy hover:bg-brand-cream-ultralight transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button
                variant="primary"
                className={`flex-1 py-4 text-sm ${addedSuccess ? 'bg-emerald-700 hover:bg-emerald-800' : ''}`}
                onClick={handleAddToCart}
              >
                {addedSuccess ? (
                  <><Check className="w-5 h-5 mr-1" /> {t('addedToCartBtn')}</>
                ) : (
                  <><ShoppingBag className="w-5 h-5 mr-1" /> {t('addToCartBtn')}</>
                )}
              </Button>
              <Button
                variant="outline"
                className="flex-1 py-4 text-sm"
                onClick={handleWhatsAppInquiry}
              >
                {t('inquiryBtn')}
              </Button>
            </div>
            
            {/* Features Row */}
            <div className="mt-8 pt-8 border-t border-brand-border-light grid grid-cols-3 gap-4">
               <div className="flex flex-col items-center text-center gap-2 text-brand-text-light">
                 <Truck className="w-5 h-5" />
                 <span className="font-sans-luxury text-[10px] uppercase tracking-wider">{t('badgeShipping')}</span>
               </div>
               <div className="flex flex-col items-center text-center gap-2 text-brand-text-light">
                 <HeartHandshake className="w-5 h-5" />
                 <span className="font-sans-luxury text-[10px] uppercase tracking-wider">{t('badgeHandcraft')}</span>
               </div>
               <div className="flex flex-col items-center text-center gap-2 text-brand-text-light">
                 <ShieldCheck className="w-5 h-5" />
                 <span className="font-sans-luxury text-[10px] uppercase tracking-wider">{t('badgePayment')}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
