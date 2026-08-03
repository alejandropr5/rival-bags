'use client';

import { useState } from 'react';
import { X, MessageCircle, Mail, MapPin, Phone, Send, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useTranslations('contactModal');
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
        className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-brand-border-light overflow-hidden relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-contact-modal-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-brand-cream text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5">
          
          {/* Left info column */}
          <div className="md:col-span-2 bg-brand-burgundy text-brand-cream p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-sans-luxury text-[10px] text-brand-gold uppercase tracking-widest font-semibold block">
                {t('attentionBadge')}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-brand-cream">
                {t('title')}
              </h3>
              <p className="font-sans-luxury text-xs text-brand-border-gold leading-relaxed">
                {t('description')}
              </p>
            </div>

            <div className="space-y-4 font-sans-luxury text-xs text-brand-border-soft">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{t('whatsapp')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{t('email')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{t('showroom')}</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-brand-gold">
              {t('schedule')}
            </div>
          </div>

          {/* Right form column */}
          <div className="md:col-span-3 p-6 sm:p-8 bg-white flex flex-col justify-between">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-10">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif-luxury text-xl font-bold text-brand-burgundy">
                  {t('sentTitle')}
                </h4>
                <p className="font-sans-luxury text-xs text-brand-text-light">
                  {t('sentMessage')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans-luxury text-xs">
                <h4 className="font-serif-luxury text-xl font-semibold text-brand-ink">
                  {t('formTitle')}
                </h4>

                <div>
                  <label className="block text-brand-text-subtle font-semibold mb-1">{t('labelName')}</label>
                  <input
                    type="text"
                    required
                    placeholder={t('placeholderName')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-brand-cream border border-brand-border-input rounded-md focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-brand-text-subtle font-semibold mb-1">{t('labelEmail')}</label>
                  <input
                    type="email"
                    required
                    placeholder={t('placeholderEmail')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-brand-cream border border-brand-border-input rounded-md focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-brand-text-subtle font-semibold mb-1">{t('labelMessage')}</label>
                  <textarea
                    required
                    rows={3}
                    placeholder={t('placeholderMessage')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-brand-cream border border-brand-border-input rounded-md focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-burgundy hover:bg-brand-burgundy-dark text-brand-cream font-bold tracking-widest uppercase rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {t('sendButton')}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
