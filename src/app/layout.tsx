import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/src/context/CartContext';
import ClientLayout from '@/src/components/layout/ClientLayout';

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

export default function RootLayout({ 
  children,
  modal
}: { 
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-[#FAF6EE] text-[#2A181C] selection:bg-[#3B141E] selection:text-[#FAF6EE] flex flex-col min-h-screen" suppressHydrationWarning>
        <CartProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
          {modal}
        </CartProvider>
      </body>
    </html>
  );
}
