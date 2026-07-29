'use client';

import { Search, X, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
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
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'Todos' ||
    maxPrice < maxCatalogPrice ||
    sortOption !== 'featured';

  const formatCOP = (val: number) =>
    `$${val.toLocaleString('es-CO')} COP`;

  return (
    <div id="search-filter-section" className="bg-[#FAF6EE] pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Search Bar & Primary Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xs border border-[#EBE3D5] space-y-5">
        
        {/* Top Row: Search Input + Sorting */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A6B]" />
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, modelo, color o material..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#FAF6EE] border border-[#E0D5C1] rounded-lg font-sans-luxury text-sm text-[#2A181C] placeholder-[#8C7A6B] focus:outline-none focus:ring-2 focus:ring-[#3B141E] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#8C7A6B] hover:text-[#2A181C] hover:bg-[#EBE3D5]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 shrink-0">
            <label htmlFor="sort-dropdown" className="font-sans-luxury text-xs text-[#6B5848] font-medium flex items-center gap-1.5 whitespace-nowrap">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#3B141E]" />
              Ordenar por:
            </label>
            <select
              id="sort-dropdown"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-[#FAF6EE] border border-[#E0D5C1] rounded-lg px-3 py-2 font-sans-luxury text-xs text-[#2A181C] focus:outline-none focus:ring-2 focus:ring-[#3B141E] cursor-pointer"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre (A - Z)</option>
            </select>
          </div>

        </div>

        {/* Filter Categories Chips */}
        <div className="space-y-2 pt-1 border-t border-[#F2EBDC]">
          <span className="font-sans-luxury text-xs text-[#6B5848] uppercase tracking-wider font-semibold block">
            Categoría:
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-sans-luxury text-xs tracking-wider transition-all cursor-pointer ${
                    active
                      ? 'bg-[#3B141E] text-[#FAF6EE] font-medium shadow-xs'
                      : 'bg-[#FAF6EE] text-[#5C493B] hover:bg-[#EBE3D5] hover:text-[#2A181C] border border-[#E0D5C1]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Slider Filter Row */}
        <div className="pt-2 border-t border-[#F2EBDC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-72 space-y-1.5">
            <div className="flex items-center justify-between font-sans-luxury text-xs text-[#6B5848]">
              <span className="font-medium">Precio Máximo:</span>
              <span className="font-semibold text-[#3B141E]">{formatCOP(maxPrice)}</span>
            </div>
            <input
              id="price-range-slider"
              type="range"
              min={minCatalogPrice}
              max={maxCatalogPrice}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#3B141E] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#8C7A6B]">
              <span>{formatCOP(minCatalogPrice)}</span>
              <span>{formatCOP(maxCatalogPrice)}</span>
            </div>
          </div>

          {/* Results Counter & Reset Button */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
            <span className="font-sans-luxury text-xs text-[#6B5848]">
              Mostrando <strong className="text-[#3B141E]">{resultsCount}</strong> de {totalCount} productos
            </span>

            {isFiltered && (
              <button
                id="reset-filters-btn"
                type="button"
                onClick={onResetFilters}
                className="flex items-center gap-1.5 text-xs text-[#8B3A4C] hover:text-[#3B141E] font-medium hover:underline transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
