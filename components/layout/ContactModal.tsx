'use client';

import { useState } from 'react';
import { X, MessageCircle, Mail, MapPin, Phone, Send, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-[#EBE3D5] overflow-hidden relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-contact-modal-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FAF6EE] text-[#3B141E] hover:bg-[#3B141E] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5">
          
          {/* Left info column */}
          <div className="md:col-span-2 bg-[#3B141E] text-[#FAF6EE] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-sans-luxury text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold block">
                ATENCIÓN PERSONALIZADA
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#FAF6EE]">
                Contacto Rival Bags
              </h3>
              <p className="font-sans-luxury text-xs text-[#D8C2B0] leading-relaxed">
                Estamos aquí para asesorarte en la elección del bolso ideal o responder cualquier duda sobre la Colección Punto Zero.
              </p>
            </div>

            <div className="space-y-4 font-sans-luxury text-xs text-[#EAE0D5]">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>WhatsApp: +57 300 000 0000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>contacto@rivalbags.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Showroom: El Poblado, Medellín</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-[#C5A059]">
              Horario: Lunes a Sábado de 9:00 am a 7:00 pm
            </div>
          </div>

          {/* Right form column */}
          <div className="md:col-span-3 p-6 sm:p-8 bg-white flex flex-col justify-between">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-10">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif-luxury text-xl font-bold text-[#3B141E]">
                  ¡Mensaje Enviado!
                </h4>
                <p className="font-sans-luxury text-xs text-[#8C7A6B]">
                  Te responderemos a la brevedad posible. Gracias por escribir a Rival Bags.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans-luxury text-xs">
                <h4 className="font-serif-luxury text-xl font-semibold text-[#2A181C]">
                  Escríbenos un Mensaje
                </h4>

                <div>
                  <label className="block text-[#6B5848] font-semibold mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E0D5C1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B141E]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5848] font-semibold mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E0D5C1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B141E]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5848] font-semibold mb-1">Mensaje o Consulta *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="¿En qué bolso estás interesada? ¿Tienes alguna consulta especial?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E0D5C1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B141E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#3B141E] hover:bg-[#2B0C15] text-[#FAF6EE] font-bold tracking-widest uppercase rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  ENVIAR MENSAJE
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
