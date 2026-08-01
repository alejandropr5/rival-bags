'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CartItem } from '@/types/product';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, MessageCircle, CheckCircle, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, selectedColor: string, delta: number) => void;
  onRemoveItem: (productId: string, selectedColor: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 200000;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const formatCOP = (val: number) =>
    `$${val.toLocaleString('es-CO')} COP`;

  // WhatsApp formatted order string generator
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let itemsListText = cartItems
      .map(
        (item) =>
          `• *${item.product.name}* (${item.selectedColor}) x${item.quantity} = $${(
            item.product.price * item.quantity
          ).toLocaleString('es-CO')} COP`
      )
      .join('\n');

    const totalStr = subtotal.toLocaleString('es-CO');

    const message = `Hola Rival Bags 🌸, deseo realizar el siguiente pedido:

${itemsListText}

*Total a Pagar:* $${totalStr} COP
*Envío:* ${subtotal >= FREE_SHIPPING_THRESHOLD ? '¡GRATIS a toda Colombia!' : 'A convenir'}

Quedo atenta a las instrucciones de pago. ¡Gracias!`;

    window.open(`https://wa.me/573000000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSimulatedCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerCity || !customerAddress) return;
    setOrderConfirmed(true);
    setTimeout(() => {
      setOrderConfirmed(false);
      setCheckoutModalOpen(false);
      onClearCart();
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide Drawer Content */}
      <div className="relative w-full max-w-md bg-[#FAF6EE] h-full shadow-2xl border-l border-[#EBE3D5] flex flex-col justify-between z-10 animate-slide-left">
        
        {/* Drawer Header */}
        <div className="p-5 bg-[#3B141E] text-[#FAF6EE] flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
            <h2 className="font-serif-luxury text-xl font-semibold tracking-wide">
              TU CARRITO
            </h2>
            <span className="bg-[#C5A059] text-[#2B0C15] text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <button
            id="close-cart-drawer-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#FAF6EE] hover:bg-[#4A1D29] hover:text-[#C5A059] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Bar Indicator */}
        <div className="bg-[#EAE0D5] px-5 py-3 border-b border-[#D8C2B0]">
          <div className="flex items-center justify-between text-xs font-sans-luxury text-[#2A181C] mb-1.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-4 h-4 text-[#3B141E]" />
              {amountForFreeShipping > 0 ? (
                <>Te faltan <strong className="text-[#3B141E]">{formatCOP(amountForFreeShipping)}</strong> para envío gratis</>
              ) : (
                <strong className="text-emerald-800">¡Felicidades! Tienes Envío Gratis 🇨🇴</strong>
              )}
            </span>
          </div>
          <div className="w-full bg-[#D8C2B0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#3B141E] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EBE3D5] flex items-center justify-center text-[#8C7A6B]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-serif-luxury text-xl text-[#3B141E] font-medium">
                Tu carrito está vacío
              </p>
              <p className="font-sans-luxury text-xs text-[#8C7A6B]">
                Explora la Colección Punto Zero y descubre piezas únicas hechas a mano.
              </p>
              <button
                id="cart-empty-explore-btn"
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#3B141E] text-[#FAF6EE] font-sans-luxury text-xs font-semibold tracking-wider rounded-xs hover:bg-[#2B0C15] transition"
              >
                VER PRODUCTOS
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="bg-white p-3.5 rounded-xl border border-[#EBE3D5] shadow-xs flex items-center gap-3"
              >
                <div className="relative w-16 h-16 bg-[#FAF6EE] rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-luxury text-base text-[#2A181C] font-semibold truncate">
                    {item.product.name}
                  </h4>
                  <p className="font-sans-luxury text-[11px] text-[#8C7A6B]">
                    Color: <span className="text-[#3B141E] font-medium">{item.selectedColor}</span>
                  </p>
                  <p className="font-sans-luxury text-xs font-bold text-[#3B141E] mt-0.5">
                    {formatCOP(item.product.price * item.quantity)}
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                    className="text-[#8C7A6B] hover:text-[#8B1E3F] p-1 transition"
                    title="Eliminar del carrito"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-[#E0D5C1] rounded-md bg-[#FAF6EE]">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, -1)}
                      className="px-2 py-0.5 text-xs font-bold text-[#3B141E] hover:bg-[#EBE3D5]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 font-sans-luxury text-xs font-semibold text-[#2A181C]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, 1)}
                      className="px-2 py-0.5 text-xs font-bold text-[#3B141E] hover:bg-[#EBE3D5]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Controls */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EBE3D5] space-y-3 shadow-lg">
            
            <div className="space-y-1.5 text-xs font-sans-luxury">
              <div className="flex justify-between text-[#6B5848]">
                <span>Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                <span className="font-semibold text-[#2A181C]">{formatCOP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#6B5848]">
                <span>Envío estimado</span>
                <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? 'GRATIS' : '$12,000 COP'}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#3B141E] pt-2 border-t border-[#F2EBDC]">
                <span>Total Estimado</span>
                <span>{formatCOP(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12000))}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                id="whatsapp-checkout-btn"
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans-luxury text-xs font-bold tracking-wider uppercase rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                PEDIR DIRECTO POR WHATSAPP
              </button>

              <button
                id="online-checkout-btn"
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3 bg-[#3B141E] hover:bg-[#2B0C15] text-[#FAF6EE] font-sans-luxury text-xs font-bold tracking-[0.15em] uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEDER AL PAGO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Simulated Checkout Form Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-[#EBE3D5] space-y-4 relative animate-scale-up">
            
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-[#8C7A6B] hover:text-[#3B141E]"
            >
              <X className="w-5 h-5" />
            </button>

            {orderConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="font-serif-luxury text-2xl font-bold text-[#3B141E]">
                  ¡Pedido Confirmado!
                </h3>
                <p className="font-sans-luxury text-xs text-[#5C493B]">
                  Gracias {customerName}, hemos recibido tu orden. Te enviaremos la guía de rastreo a tu teléfono: {customerPhone}.
                </p>
                <p className="font-sans-luxury text-xs text-[#C5A059] font-semibold">
                  Rival Bags - El Lujo de lo Irrepetible
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulatedCheckoutSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#3B141E]">
                    Datos de Envío & Pago
                  </h3>
                  <p className="font-sans-luxury text-xs text-[#8C7A6B]">
                    Ingresa tus datos para procesar el pedido simulado.
                  </p>
                </div>

                <div className="space-y-3 font-sans-luxury text-xs">
                  <div>
                    <label className="block text-[#6B5848] font-semibold mb-1">Nombre Completo *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Sofía Mendoza"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E0D5C1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B141E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B5848] font-semibold mb-1">Teléfono WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      placeholder="Ej. +57 300 123 4567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E0D5C1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B141E]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#6B5848] font-semibold mb-1">Ciudad *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Medellín"
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E0D5C1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B141E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#6B5848] font-semibold mb-1">Dirección *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Cra 43A # 1-50"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E0D5C1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B141E]"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF6EE] rounded-lg border border-[#E0D5C1]">
                    <span className="font-semibold text-[#3B141E] block mb-1">Método de Pago Seleccionado:</span>
                    <span className="text-xs text-[#5C493B]">PSE / Nequi / Tarjeta de Crédito (Simulación Segura)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#3B141E] hover:bg-[#2B0C15] text-[#FAF6EE] font-sans-luxury text-xs font-bold tracking-widest uppercase rounded-sm shadow-md transition"
                  >
                    CONFIRMAR PAGO DE {formatCOP(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12000))}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
