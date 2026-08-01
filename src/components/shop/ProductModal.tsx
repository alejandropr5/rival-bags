'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { X, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, MessageCircle } from 'lucide-react';

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
      `Hola Rival Bags 🌸, estoy interesada en el bolso *${product.name}* en color *${selectedColor}* ($${product.price.toLocaleString('es-CO')} COP). ¿Tienen disponibilidad inmediata?`
    );
    window.open(`https://wa.me/573000000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-[#EBE3D5] relative flex flex-col md:flex-row max-h-[90vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FAF6EE] text-[#3B141E] hover:bg-[#3B141E] hover:text-white transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 bg-[#FAF6EE] p-8 flex flex-col items-center justify-center relative min-h-[320px]">
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

          <div className="mt-4 flex items-center gap-2 text-xs text-[#8C7A6B]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Pieza artesanal 100% tejida a mano</span>
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="font-sans-luxury text-xs text-[#C5A059] uppercase tracking-widest font-semibold">
                {product.category}
              </span>
              {product.isNew && (
                <span className="bg-[#3B141E] text-[#FAF6EE] text-[10px] font-sans-luxury uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold">
                  Colección Punto Zero
                </span>
              )}
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#2A181C]">
              {product.name}
            </h2>

            <p className="font-sans-luxury text-xl font-bold text-[#3B141E]">
              {formatCOP(product.price)}
            </p>

            <p className="font-sans-luxury text-sm text-[#5C493B] leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches Selection */}
            <div className="space-y-2 pt-2 border-t border-[#F2EBDC]">
              <label className="font-sans-luxury text-xs text-[#6B5848] font-semibold uppercase tracking-wider block">
                Color seleccionado: <span className="text-[#3B141E] font-bold">{selectedColor}</span>
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
                          ? 'bg-[#3B141E] text-white font-medium shadow-xs ring-2 ring-offset-1 ring-[#3B141E]'
                          : 'bg-[#FAF6EE] text-[#5C493B] border border-[#E0D5C1] hover:bg-[#EBE3D5]'
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dimensions & Materials Accordion/List */}
            <div className="space-y-2 text-xs text-[#6B5848] pt-2 border-t border-[#F2EBDC]">
              <p><strong>Dimensiones:</strong> {product.dimensions}</p>
              <p><strong>Materiales & Acabados:</strong> {product.material}</p>
            </div>

            {/* Quantity Selector */}
            <div className="pt-2 flex items-center gap-4">
              <span className="font-sans-luxury text-xs font-semibold uppercase tracking-wider text-[#6B5848]">
                Cantidad:
              </span>
              <div className="flex items-center border border-[#E0D5C1] rounded-lg overflow-hidden bg-[#FAF6EE]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold text-[#3B141E] hover:bg-[#EBE3D5] transition"
                >
                  -
                </button>
                <span className="px-4 py-1 font-sans-luxury text-sm font-semibold text-[#2A181C]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-bold text-[#3B141E] hover:bg-[#EBE3D5] transition"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#F2EBDC]">
            <button
              id="modal-add-to-cart-btn"
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 font-sans-luxury text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#3B141E] text-[#FAF6EE] hover:bg-[#2B0C15]'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡AGREGADO AL CARRITO!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  AÑADIR AL CARRITO ({formatCOP(product.price * quantity)})
                </>
              )}
            </button>

            <button
              id="modal-whatsapp-btn"
              type="button"
              onClick={handleWhatsAppInquiry}
              className="w-full py-3 px-6 border border-[#25D366] text-[#128C7E] hover:bg-[#25D366] hover:text-white font-sans-luxury text-xs font-medium tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              CONSULTAR POR WHATSAPP
            </button>

            {showMoreDetailsBtn && (
              <a
                href={`/producto/${product.id}`}
                className="w-full py-3 px-6 border border-[#3B141E] text-[#3B141E] hover:bg-[#3B141E] hover:text-[#FAF6EE] font-sans-luxury text-xs font-medium tracking-wider rounded-sm transition-colors items-center justify-center gap-2 cursor-pointer mt-2 block text-center"
              >
                VER MÁS DETALLES
              </a>
            )}

            {/* Badges */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#8C7A6B] pt-2">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Envíos a nivel nacional 🇨🇴</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Garantía de artesanía 100%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
