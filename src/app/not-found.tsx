import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-serif text-brand-ink mb-4">{t('title')}</h1>
      <p className="text-brand-text-muted mb-8 font-sans">{t('message')}</p>
      <Link
        href="/productos"
        className="px-6 py-3 bg-brand-burgundy text-brand-cream font-sans-luxury text-xs uppercase tracking-widest rounded-sm hover:bg-brand-burgundy-dark transition-colors"
      >
        {t('backButton')}
      </Link>
    </div>
  );
}
