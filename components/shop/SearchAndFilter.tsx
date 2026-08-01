'use client';

import { Filter, ChevronDown, X } from 'lucide-react';
import { CATEGORIES } from '@/data/products';
import { SortOption } from '@/types/product';

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  minCatalogPrice: number;
  maxCatalogPrice: number;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  resultsCount: number;
  totalCount: number;
  onResetFilters: () => void;
}

export default function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  minCatalogPrice,
  maxCatalogPrice,
  sortOption,
  setSortOption,
  resultsCount,
  totalCount,
  onResetFilters,
}: SearchAndFilterProps) {
  return (
    <div id="search-filter-section" className="bg-[#FAF6EE] pt-12 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Row: Title & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        
        {/* Title */}
        <div>
          <h1 className="font-sans text-3xl md:text-4xl text-[#2A181C] uppercase tracking-wider leading-[1.2]">
            {searchQuery ? (
              <>RESULTADOS PARA &quot;{searchQuery}&quot;</>
            ) : (
              <>Explorar Colección <br className="hidden md:block" /> De Piezas Únicas</>
            )}
          </h1>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-2 font-sans text-xs sm:text-sm text-[#8C7A6B] hover:text-[#2A181C] transition-colors flex items-center gap-1 relative group uppercase tracking-widest cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span className="border-b border-[#8C7A6B] group-hover:border-[#2A181C] pb-0.5">borrar búsqueda</span>
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-6 font-sans text-xs text-[#594A42] tracking-wider uppercase">
          
          <button className="flex items-center gap-2 hover:text-[#2A181C] transition-colors">
            <Filter className="w-4 h-4" />
            Filtros
          </button>

          <div className="flex items-center gap-2">
            <span>Ordenar por:</span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer text-[#2A181C] capitalize pr-4 font-normal"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Menor Precio</option>
                <option value="price-desc">Mayor Precio</option>
                <option value="name-asc">Nombre (A-Z)</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#2A181C]" />
            </div>
          </div>

        </div>
      </div>

      {/* Categories Row & Results Count */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        <div className="flex flex-wrap gap-6 font-sans text-[13px] md:text-sm text-[#594A42]">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-1 transition-all hover:text-[#2A181C] ${
                  active 
                    ? 'border-b border-[#2A181C] text-[#2A181C] font-medium' 
                    : 'border-b border-transparent'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="font-sans text-xs md:text-[13px] text-[#594A42]">
          Mostrando <b>{resultsCount}</b> de {totalCount} productos
        </div>

      </div>

    </div>
  );
}
