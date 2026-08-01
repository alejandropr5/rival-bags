'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import SearchAndFilter from '@/components/shop/SearchAndFilter';
import ProductCard from '@/components/shop/ProductCard';
import ProductModal from '@/components/shop/ProductModal';
import { PRODUCTS } from '@data/products';
import { Product, SortOption } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function ProductosContent() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Min and Max catalog prices calculation
  const catalogPrices = PRODUCTS.map((p) => p.price);
  const minCatalogPrice = Math.min(...catalogPrices);
  const maxCatalogPrice = Math.max(...catalogPrices);

  // Filter and Search States from URL or defaults
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Todos');
  const [maxPrice, setMaxPrice] = useState(() => {
    const p = searchParams.get('maxPrice');
    return p ? parseInt(p, 10) : maxCatalogPrice;
  });
  const [sortOption, setSortOption] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'featured');

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'Todos') params.set('category', selectedCategory);
    if (maxPrice !== maxCatalogPrice) params.set('maxPrice', maxPrice.toString());
    if (sortOption !== 'featured') params.set('sort', sortOption);

    const newQuery = params.toString();
    const newUrl = `${pathname}${newQuery ? `?${newQuery}` : ''}`;
    
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, selectedCategory, maxPrice, sortOption, pathname, router, maxCatalogPrice]);

  // Sync URL to state if URL changes externally
  useEffect(() => {
    setTimeout(() => {
      setSearchQuery(searchParams.get('q') || '');
      setSelectedCategory(searchParams.get('category') || 'Todos');
      const p = searchParams.get('maxPrice');
      setMaxPrice(p ? parseInt(p, 10) : maxCatalogPrice);
      setSortOption((searchParams.get('sort') as SortOption) || 'featured');
    }, 0);
  }, [searchParams, maxCatalogPrice]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.colors.some((c: string) => c.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'Todos') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter((p) => p.price <= maxPrice);

    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [searchQuery, selectedCategory, maxPrice, sortOption]);

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-2">
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        {/* <div className="flex flex-col items-center mb-2 space-y-4 pt-12">
          <div className="flex items-center space-x-2 text-[#C5A059]">
            <Sparkles className="w-5 h-5" />
              <span className="font-sans-luxury text-sm tracking-[0.2em] uppercase font-semibold">
                Catálogo Completo
              </span>
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#2A181C] text-center max-w-2xl leading-tight">
            Catálogo Completo
          </h1>
          <p className="text-[#594A42] font-sans text-center max-w-xl text-lg pt-2">
            Explora nuestra colección de bolsos de lujo, diseñados meticulosamente y fabricados a mano.
          </p>
        </div> */}

        <div className="w-full mb-8">
          <SearchAndFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minCatalogPrice={minCatalogPrice}
            maxCatalogPrice={maxCatalogPrice}
            sortOption={sortOption}
            setSortOption={setSortOption}
            resultsCount={filteredProducts.length}
            totalCount={PRODUCTS.length}
            onResetFilters={() => {
              setSearchQuery('');
              setSelectedCategory('Todos');
              setMaxPrice(maxCatalogPrice);
              setSortOption('featured');
            }}
          />
        </div>

        <div className="w-full pb-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p, color) => addToCart(p, color)}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 bg-white/50 rounded-2xl border border-[#EBE3D5]">
              <ShoppingBag className="w-16 h-16 text-[#C5A059] opacity-50" />
              <p className="font-serif text-2xl text-[#2A181C]">No se encontraron bolsos en esta búsqueda.</p>
              <p className="font-sans text-[#594A42]">Prueba ajustando los filtros o usando otros términos de búsqueda.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                  setMaxPrice(maxCatalogPrice);
                  setSortOption('featured');
                }}
                className="mt-4 font-sans-luxury text-xs font-semibold tracking-wider text-[#3B141E] uppercase hover:text-[#C5A059] transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ProductosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center"><div className="font-sans-luxury tracking-[0.2em] text-[#3B141E] uppercase text-sm">Cargando catálogo...</div></div>}>
      <ProductosContent />
    </Suspense>
  );
}
