'use client';

import { useState } from 'react';
import { Instagram, MessageCircle, Send, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-[#3B141E] text-[#FAF6EE] pt-14 pb-8 border-t border-[#4A1D29]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#4A1D29]">
          
          {/* Column 1: RIVAL BAGS */}
          <div className="space-y-4">
            <h4 className="font-sans-luxury text-xs font-semibold tracking-[0.25em] uppercase text-[#E8D7C3]">
              RIVAL BAGS
            </h4>
            <ul className="space-y-2.5 font-sans-luxury text-xs text-[#D8C2B0] font-light">
              <li>
                <button
                  id="footer-nav-rival"
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-[#FAF6EE] transition-colors"
                >
                  Rival Bags
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-colecciones"
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-[#FAF6EE] transition-colors"
                >
                  Colecciones
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-nosotras"
                  onClick={() => onNavigate('nosotras')}
                  className="hover:text-[#FAF6EE] transition-colors"
                >
                  Nosotras
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: SERVICIO AL CLIENTE */}
          <div className="space-y-4">
            <h4 className="font-sans-luxury text-xs font-semibold tracking-[0.25em] uppercase text-[#E8D7C3]">
              SERVICIO AL CLIENTE
            </h4>
            <ul className="space-y-2.5 font-sans-luxury text-xs text-[#D8C2B0] font-light">
              <li>
                <button
                  id="footer-nav-servicio"
                  onClick={() => onNavigate('contacto')}
                  className="hover:text-[#FAF6EE] transition-colors"
                >
                  Servicio al cliente
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-envios"
                  onClick={() => onNavigate('contacto')}
                  className="hover:text-[#FAF6EE] transition-colors"
                >
                  Envíos y devoluciones
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contacto"
                  onClick={() => onNavigate('contacto')}
                  className="hover:text-[#FAF6EE] transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: SEGUIRNOS */}
          <div className="space-y-4">
            <h4 className="font-sans-luxury text-xs font-semibold tracking-[0.25em] uppercase text-[#E8D7C3]">
              SEGUIRNOS
            </h4>
            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://www.instagram.com/rivalbags_/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#D8C2B0] flex items-center justify-center text-[#FAF6EE] hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#2B0C15] transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/573150264979"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#D8C2B0] flex items-center justify-center text-[#FAF6EE] hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 4: SUSCRIBIRSE */}
          <div className="space-y-4">
            <h4 className="font-sans-luxury text-xs font-semibold tracking-[0.25em] uppercase text-[#E8D7C3]">
              SUSCRIBIRSE
            </h4>
            
            {subscribed ? (
              <div className="p-2.5 bg-[#4A1D29] rounded-sm text-xs text-[#C5A059] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>¡Gracias por suscribirte a Rival Bags!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  id="footer-subscribe-input"
                  type="email"
                  required
                  placeholder="Suscribirse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF6EE] text-[#2A181C] placeholder-[#8C7A6B] font-sans-luxury text-xs rounded-sm focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#3B141E] text-[#FAF6EE] text-xs hover:bg-[#C5A059] hover:text-[#2B0C15] transition-colors rounded-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <p className="font-sans-luxury text-[11px] text-[#A89280]">
              Recibe invitaciones exclusivas a nuevos lanzamientos y ofertas privadas.
            </p>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 text-center">
          <p className="font-sans-luxury text-[11px] text-[#A89280] tracking-wider">
            Copyright © 2026 · All RIVAL BAGS
          </p>
        </div>

      </div>
    </footer>
  );
}
