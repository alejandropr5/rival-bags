'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import ContactModal from './ContactModal';
import { useCart } from '@/src/context/CartContext';
import { usePathname, useRouter } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { 
    isMounted, 
    totalCartCount, 
    isCartOpen, 
    setIsCartOpen,
    isContactOpen,
    setIsContactOpen,
    cartItems,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();

  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'contacto') {
      setIsContactOpen(true);
      return;
    }
    
    if (sectionId === 'inicio') {
      router.push('/');
    } else if (sectionId === 'catalogo' || sectionId === 'punto-zero') {
      router.push('/productos');
    } else if (sectionId === 'nosotras') {
      router.push('/nosotras');
    } else {
      router.push(`/${sectionId}`);
    }
  };

  const handleOpenSearch = () => {
    router.push('/productos');
    // We could pass a query param or just navigate
  };

  return (
    <>
      <Navbar
        cartCount={isMounted ? totalCartCount : 0}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={handleOpenSearch}
        onNavigate={handleNavigate}
        activeSection={pathname === '/' ? 'inicio' : pathname === '/productos' ? 'catalogo' : pathname === '/nosotras' ? 'nosotras' : ''}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer onNavigate={handleNavigate} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
