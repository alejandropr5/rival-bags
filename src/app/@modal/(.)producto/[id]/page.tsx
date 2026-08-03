import { PRODUCTS } from '@data/products';
import { notFound } from 'next/navigation';
import InterceptedModalClient from './InterceptedModalClient';

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function InterceptedProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);
  
  if (!product) return notFound();
  
  return <InterceptedModalClient product={product} />;
}
