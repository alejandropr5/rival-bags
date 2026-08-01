'use client';

import ProductModal from '@/src/components/shop/ProductModal';
import { useRouter } from 'next/navigation';
import { useCart } from '@/src/context/CartContext';
import { Product } from '@/src/types/product';

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
