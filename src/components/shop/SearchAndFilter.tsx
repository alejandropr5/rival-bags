'use client';

import { Filter, ChevronDown, X } from 'lucide-react';
import { CATEGORIES } from '@data/products';
import { SortOption } from '@/types/product';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('searchAndFilter');

  return (
    <div id="search-filter-section" className="bg-brand-cream pt-12 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Row: Title & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        
        {/* Title */}
        <div>
          <h1 className="font-sans text-3xl md:text-4xl text-brand-ink uppercase tracking-wider leading-[1.2]">
            {searchQuery ? (
              <>{t('titleSearch', { query: searchQuery })}</>
            ) : (
              <>{t('titleDefault1')} <br className="hidden md:block" /> {t('titleDefault2')}</>
            )}
          </h1>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-2 font-sans text-xs sm:text-sm text-brand-text-light hover:text-brand-ink transition-colors flex items-center gap-1 relative group uppercase tracking-widest cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span className="border-b border-brand-text-light group-hover:border-brand-ink pb-0.5">{t('clearSearch')}</span>
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-6 font-sans text-xs text-brand-text-muted tracking-wider uppercase">
          
          <button className="flex items-center gap-2 hover:text-brand-ink transition-colors">
            <Filter className="w-4 h-4" />
            {t('filters')}
          </button>

          <div className="flex items-center gap-2">
            <span>{t('sortBy')}</span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer text-brand-ink capitalize pr-4 font-normal"
              >
                <option value="featured">{t('sortFeatured')}</option>
                <option value="price-asc">{t('sortPriceAsc')}</option>
                <option value="price-desc">{t('sortPriceDesc')}</option>
                <option value="name-asc">{t('sortNameAsc')}</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-brand-ink" />
            </div>
          </div>

        </div>
      </div>

      {/* Categories Row & Results Count */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        <div className="flex flex-wrap gap-6 font-sans text-[13px] md:text-sm text-brand-text-muted">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-1 transition-all hover:text-brand-ink ${
                  active 
                    ? 'border-b border-brand-ink text-brand-ink font-medium' 
                    : 'border-b border-transparent'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="font-sans text-xs md:text-[13px] text-brand-text-muted">
          {t('showingResults', { count: resultsCount, total: totalCount })}
        </div>

      </div>

    </div>
  );
}
