'use client';

import ProductModal from '@/components/shop/ProductModal';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

export default function InterceptedModalClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <ProductModal
      product={product}
      onClose={() => router.back()}
      onAddToCart={addToCart}
      showMoreDetailsBtn={true}
    />
  );
}
