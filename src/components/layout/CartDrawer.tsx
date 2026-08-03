'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CartItem } from '@/types/product';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, MessageCircle, CheckCircle, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BRAND_CONSTANTS } from '@/lib/constants';

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
  const tCart = useTranslations('cart');
  const tCheckout = useTranslations('checkout');
  const tWhatsApp = useTranslations('whatsapp');

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
          tWhatsApp('cartItemLine', {
            name: item.product.name,
            color: item.selectedColor,
            quantity: item.quantity,
            price: (item.product.price * item.quantity).toLocaleString('es-CO')
          })
      )
      .join('\n');

    const totalStr = subtotal.toLocaleString('es-CO');

    const message = `${tWhatsApp('cartGreeting')}\n\n${itemsListText}\n\n${tWhatsApp('cartTotalLine', { total: totalStr })}\n${tWhatsApp('cartShippingLine', { shipping: subtotal >= FREE_SHIPPING_THRESHOLD ? tWhatsApp('cartShippingFree') : tWhatsApp('cartShippingConvenir') })}\n\n${tWhatsApp('cartClosing')}`;

    const phone = BRAND_CONSTANTS.WHATSAPP_NUMBER.replace(/\+/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
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
      <div className="relative w-full max-w-md bg-brand-cream h-full shadow-2xl border-l border-brand-border-light flex flex-col justify-between z-10 animate-slide-left">
        
        {/* Drawer Header */}
        <div className="p-5 bg-brand-burgundy text-brand-cream flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-brand-gold" />
            <h2 className="font-serif-luxury text-xl font-semibold tracking-wide">
              {tCart('title')}
            </h2>
            <span className="bg-brand-gold text-brand-burgundy-dark text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <button
            id="close-cart-drawer-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-brand-cream hover:bg-brand-burgundy-light hover:text-brand-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Bar Indicator */}
        <div className="bg-brand-border-soft px-5 py-3 border-b border-brand-border-gold">
          <div className="flex items-center justify-between text-xs font-sans-luxury text-brand-ink mb-1.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-4 h-4 text-brand-burgundy" />
              {amountForFreeShipping > 0 ? (
                <>{tCart('freeShippingBefore')} <strong className="text-brand-burgundy">{formatCOP(amountForFreeShipping)}</strong> {tCart('freeShippingAfter')}</>
              ) : (
                <strong className="text-emerald-800">{tCart('freeShippingReached')}</strong>
              )}
            </span>
          </div>
          <div className="w-full bg-brand-border-gold h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-burgundy h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-border-light flex items-center justify-center text-brand-text-light">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-serif-luxury text-xl text-brand-burgundy font-medium">
                {tCart('emptyTitle')}
              </p>
              <p className="font-sans-luxury text-xs text-brand-text-light">
                {tCart('emptyMessage')}
              </p>
              <button
                id="cart-empty-explore-btn"
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-brand-burgundy text-brand-cream font-sans-luxury text-xs font-semibold tracking-wider rounded-xs hover:bg-brand-burgundy-dark transition"
              >
                {tCart('emptyButton')}
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="bg-white p-3.5 rounded-xl border border-brand-border-light shadow-xs flex items-center gap-3"
              >
                <div className="relative w-16 h-16 bg-brand-cream rounded-lg overflow-hidden shrink-0">
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
                  <h4 className="font-serif-luxury text-base text-brand-ink font-semibold truncate">
                    {item.product.name}
                  </h4>
                  <p className="font-sans-luxury text-[11px] text-brand-text-light">
                    {tCart('itemColor')} <span className="text-brand-burgundy font-medium">{item.selectedColor}</span>
                  </p>
                  <p className="font-sans-luxury text-xs font-bold text-brand-burgundy mt-0.5">
                    {formatCOP(item.product.price * item.quantity)}
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                    className="text-brand-text-light hover:text-brand-burgundy-accent p-1 transition"
                    title={tCart('removeItemTitle')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-brand-border-input rounded-md bg-brand-cream">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, -1)}
                      className="px-2 py-0.5 text-xs font-bold text-brand-burgundy hover:bg-brand-border-light"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 font-sans-luxury text-xs font-semibold text-brand-ink">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, 1)}
                      className="px-2 py-0.5 text-xs font-bold text-brand-burgundy hover:bg-brand-border-light"
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
          <div className="p-5 bg-white border-t border-brand-border-light space-y-3 shadow-lg">
            
            <div className="space-y-1.5 text-xs font-sans-luxury">
              <div className="flex justify-between text-brand-text-subtle">
                <span>{tCart('subtotal', { count: cartItems.reduce((sum, i) => sum + i.quantity, 0) })}</span>
                <span className="font-semibold text-brand-ink">{formatCOP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-text-subtle">
                <span>{tCart('estimatedShipping')}</span>
                <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? tCart('shippingFree') : tCart('shippingCost')}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-brand-burgundy pt-2 border-t border-brand-border-divider">
                <span>{tCart('estimatedTotal')}</span>
                <span>{formatCOP(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12000))}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                id="whatsapp-checkout-btn"
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-sans-luxury text-xs font-bold tracking-wider uppercase rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-brand-whatsapp" />
                {tCart('whatsappButton')}
              </button>

              <button
                id="online-checkout-btn"
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3 bg-brand-burgundy hover:bg-brand-burgundy-dark text-brand-cream font-sans-luxury text-xs font-bold tracking-[0.15em] uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{tCart('checkoutButton')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Simulated Checkout Form Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-brand-border-light space-y-4 relative animate-scale-up">
            
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-brand-text-light hover:text-brand-burgundy"
            >
              <X className="w-5 h-5" />
            </button>

            {orderConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="font-serif-luxury text-2xl font-bold text-brand-burgundy">
                  {tCheckout('confirmedTitle')}
                </h3>
                <p className="font-sans-luxury text-xs text-brand-text-secondary">
                  {tCheckout('confirmedMessage', { name: customerName, phone: customerPhone })}
                </p>
                <p className="font-sans-luxury text-xs text-brand-gold font-semibold">
                  {tCheckout('confirmedTagline')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulatedCheckoutSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-brand-burgundy">
                    {tCheckout('title')}
                  </h3>
                  <p className="font-sans-luxury text-xs text-brand-text-light">
                    {tCheckout('subtitle')}
                  </p>
                </div>

                <div className="space-y-3 font-sans-luxury text-xs">
                  <div>
                    <label className="block text-brand-text-subtle font-semibold mb-1">{tCheckout('labelName')}</label>
                    <input
                      required
                      type="text"
                      placeholder={tCheckout('placeholderName')}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-brand-cream border border-brand-border-input rounded-md focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-text-subtle font-semibold mb-1">{tCheckout('labelPhone')}</label>
                    <input
                      required
                      type="tel"
                      placeholder={tCheckout('placeholderPhone')}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-brand-cream border border-brand-border-input rounded-md focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-brand-text-subtle font-semibold mb-1">{tCheckout('labelCity')}</label>
                      <input
                        required
                        type="text"
                        placeholder={tCheckout('placeholderCity')}
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        className="w-full px-3 py-2 bg-brand-cream border border-brand-border-input rounded-md focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-text-subtle font-semibold mb-1">{tCheckout('labelAddress')}</label>
                      <input
                        required
                        type="text"
                        placeholder={tCheckout('placeholderAddress')}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-brand-cream border border-brand-border-input rounded-md focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-brand-cream rounded-lg border border-brand-border-input">
                    <span className="font-semibold text-brand-burgundy block mb-1">{tCheckout('paymentMethodLabel')}</span>
                    <span className="text-xs text-brand-text-secondary">{tCheckout('paymentMethodValue')}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-burgundy hover:bg-brand-burgundy-dark text-brand-cream font-sans-luxury text-xs font-bold tracking-widest uppercase rounded-sm shadow-md transition"
                  >
                    {tCheckout('confirmButton', { amount: formatCOP(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12000)) })}
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
