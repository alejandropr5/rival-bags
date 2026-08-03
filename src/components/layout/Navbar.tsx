'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('navbar');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchValue.trim()) {
        router.push(`/productos?q=${encodeURIComponent(searchValue.trim())}`);
        setIsSearchExpanded(false);
        setSearchValue('');
      }
    }
  };

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
    { name: t('links.inicio'), id: 'inicio' },
    { name: t('links.coleccion'), id: 'catalogo' },
    { name: t('links.nosotras'), id: 'nosotras' },
  ];

  return (
    <>
      {/* Dark Overlay when search is expanded */}
      {isSearchExpanded && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 transition-opacity duration-300" 
          onClick={() => setIsSearchExpanded(false)}
        />
      )}
      <header className={`sticky top-0 z-40 bg-brand-burgundy text-brand-cream shadow-md transition-all duration-300 border-b border-brand-burgundy-light`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-10 sm:h-14' : 'h14 sm:h-18'}`}>
          
          {/* Left: Mobile menu toggle button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-brand-cream hover:bg-brand-burgundy-light focus:outline-none transition"
              aria-label={t('ariaOpenMenu')}
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
                alt={t('logoAlt')}
                width={120}
                height={120}
                priority
                className={`object-contain transition-all duration-300 group-hover:scale-105 ${
                  isScrolled 
                    ? 'h-16 w-16 sm:h-22 sm:w-22' 
                    : 'h-20 w-20 sm:h-26 sm:w-26'
                }`}
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
                  className={`font-sans-luxury text-xs tracking-[0.18em] font-medium transition-all relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-brand-gold font-semibold'
                      : 'text-brand-cream hover:text-brand-gold'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Icon / Input */}
            <div className="relative flex items-center">
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${
                  isSearchExpanded ? 'w-48 sm:w-64 opacity-100 mr-2' : 'w-0 opacity-0 mr-0'
                }`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-transparent border-b border-brand-cream/50 text-brand-cream placeholder-brand-cream/70 focus:outline-none focus:border-brand-gold py-1 text-sm font-sans"
                />
              </div>
              <button
                id="nav-search-btn"
                onClick={() => isSearchExpanded ? setIsSearchExpanded(false) : setIsSearchExpanded(true)}
                className="p-2 rounded-full text-brand-cream hover:text-brand-gold hover:bg-brand-burgundy-light transition-colors focus:outline-none cursor-pointer"
                title={t('searchTitle')}
              >
                {isSearchExpanded ? <X className="w-5 h-5 stroke-[1.75]" /> : <Search className="w-5 h-5 stroke-[1.75]" />}
              </button>
            </div>

            {/* Shopping Cart Icon with Badge */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-brand-cream hover:text-brand-gold hover:bg-brand-burgundy-light transition-colors focus:outline-none flex items-center justify-center group cursor-pointer"
              title={t('cartTitle')}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white group-hover:bg-brand-gold text-brand-burgundy-dark text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-burgundy shadow-sm transform group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-burgundy-dark border-t border-brand-burgundy-light px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`mobile-nav-${link.id}`}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-sans-luxury text-sm tracking-[0.2em] text-brand-cream hover:text-brand-gold py-2 border-b border-brand-burgundy"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2 flex items-center justify-between text-xs text-brand-gold">
            <span>{t('mobileShipping')}</span>
            <span>{t('mobileAttention')}</span>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
