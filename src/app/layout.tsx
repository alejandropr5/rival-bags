import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import ClientLayout from '@/components/layout/ClientLayout';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rival Bags',
  description: 'Catálogo oficial de Rival Bags. Bolsos artesanales tejidos individualmente, donde el diseño contemporáneo y la artesanía se encuentran.',
};

export default async function RootLayout({ 
  children,
  modal
}: { 
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-brand-cream text-brand-ink selection:bg-brand-burgundy selection:text-brand-cream flex flex-col min-h-screen" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
            {modal}
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
