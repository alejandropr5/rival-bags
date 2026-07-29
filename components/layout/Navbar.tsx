'use client';

import { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import Image from 'next/image';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onNavigate,
  activeSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', id: 'inicio' },
    { name: 'CATÁLOGO', id: 'catalogo' },
    { name: 'NOSOTRAS', id: 'nosotras' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#3B141E] text-[#FAF6EE] shadow-md transition-all duration-300 border-b border-[#4A1D29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Left: Mobile menu toggle button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#FAF6EE] hover:bg-[#4A1D29] focus:outline-none transition"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo Brand */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <button
              id="brand-logo-btn"
              onClick={() => onNavigate('inicio')}
              className="group flex items-center justify-center cursor-pointer focus:outline-none"
            >
              <Image
                src="/images/Logo_RB_white.svg"
                alt="Rival Bags Logo"
                width={100}
                height={100}
                priority
                className="h-24 w-24 sm:h-30 sm:w-30 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => onNavigate(link.id)}
                  className={`font-sans-luxury text-xs tracking-[0.18em] font-medium transition-all relative py-1 ${
                    isActive
                      ? 'text-[#FAF6EE] font-semibold'
                      : 'text-[#D8C2B0] hover:text-[#FAF6EE]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C5A059] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Icon */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="p-2 rounded-full text-[#FAF6EE] hover:text-[#C5A059] hover:bg-[#4A1D29] transition-colors focus:outline-none"
              title="Buscar en el catálogo"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Account / User Icon
            <button
              id="nav-user-btn"
              onClick={() => onNavigate('contacto')}
              className="p-2 rounded-full text-[#FAF6EE] hover:text-[#C5A059] hover:bg-[#4A1D29] transition-colors focus:outline-none hidden sm:inline-flex"
              title="Mi cuenta / Contacto"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </button> */}

            {/* Shopping Cart Icon with Badge */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-[#FAF6EE] hover:text-[#C5A059] hover:bg-[#4A1D29] transition-colors focus:outline-none flex items-center justify-center group"
              title="Ver Carrito de Compras"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-[#2B0C15] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#3B141E] shadow-sm transform group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2B0C15] border-t border-[#4A1D29] px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`mobile-nav-${link.id}`}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-sans-luxury text-sm tracking-[0.2em] text-[#FAF6EE] hover:text-[#C5A059] py-2 border-b border-[#3B141E]"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2 flex items-center justify-between text-xs text-[#C5A059]">
            <span>Envíos a toda Colombia 🇨🇴</span>
            <span>Atención Personalizada</span>
          </div>
        </div>
      )}
    </header>
  );
}
