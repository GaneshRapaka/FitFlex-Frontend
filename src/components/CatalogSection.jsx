import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchProducts } from '../api/productsApi';
import ProductCard from './ProductCard';
import { 
  Filter, 
  Sparkles, 
  MapPin, 
  SlidersHorizontal,
  Flame, 
  RotateCcw,
  Eye,
  Check
} from 'lucide-react';

const CATEGORIES = [
  { slug: 'all', label: 'All Drops' },
  { slug: 'oversized-tees', label: 'Oversized Tees' },
  { slug: 'active-dresses-sets', label: 'Dresses & Sets' },
  { slug: 'stringers-tanks', label: 'Stringers & Tanks' },
  { slug: 'compression-wear', label: 'Compression' },
  { slug: 'joggers-shorts', label: 'Joggers & Shorts' },
];

const LOCALITIES = [
  { slug: 'all', label: 'All Localities' },
  { slug: 'Banjara Hills', label: 'Banjara Hills' },
  { slug: 'Jubilee Hills', label: 'Jubilee Hills' },
  { slug: 'Madhapur', label: 'Madhapur' },
  { slug: 'Gachibowli', label: 'Gachibowli' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Drops' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const CatalogSection = () => {
  const { filters, setFilters } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const items = await fetchProducts(filters);
      setProducts(items);
      setLoading(false);
    };
    loadData();
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      category: 'all',
      gender: 'all',
      locality: 'all',
      query: '',
      sortBy: 'featured'
    });
  };

  return (
    <section className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12 space-y-8">
      
      {/* Interactive Feature Announcement Card */}
      <div className="bg-white border border-neutral-200/90 rounded-3xl p-5 sm:p-6 lg:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs card-tactile">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Eye className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black uppercase text-neutral-950 tracking-wider font-heading">
                Dual-Perspective Fit Experience
              </h3>
              <span className="text-[10px] bg-neutral-950 text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                SIGNATURE
              </span>
            </div>
            <p className="text-xs text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Default view presents the piece in clean flat-lay silhouette. <strong className="text-neutral-950 font-semibold">Hover your cursor (or tap the toggle)</strong> on any drop to see real fabric drape and athletic movement on a fitness model!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 shrink-0 bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Verified Local Hyderabad Garments</span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-4">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.slug }))}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider ${
                filters.category === cat.slug
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'bg-white text-neutral-700 border border-neutral-200/90 hover:text-black hover:border-neutral-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Toolbar: Gender, Locality, Sort, Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-200/80">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Gender Pills */}
            <div className="flex items-center bg-neutral-100 border border-neutral-200 p-1 rounded-xl text-xs font-semibold text-neutral-600">
              {['all', 'Men', 'Women'].map(gender => (
                <button
                  key={gender}
                  onClick={() => setFilters(prev => ({ ...prev, gender }))}
                  className={`px-3.5 py-1 rounded-lg transition uppercase text-[11px] font-bold ${
                    filters.gender === gender 
                      ? 'bg-white text-neutral-950 shadow-xs' 
                      : 'hover:text-black'
                  }`}
                >
                  {gender === 'all' ? 'All Genders' : gender}
                </button>
              ))}
            </div>

            {/* Locality Selector Pill */}
            <div className="relative">
              <select
                value={filters.locality === 'all' ? 'All Localities' : filters.locality}
                onChange={(e) => {
                  const val = e.target.value;
                  setFilters(prev => ({ ...prev, locality: val === 'All Localities' ? 'all' : val }));
                }}
                className="bg-white border border-neutral-200 text-xs text-neutral-800 font-semibold rounded-xl py-1.5 pl-7 pr-3 appearance-none focus:outline-none focus:border-black cursor-pointer shadow-2xs hover:border-neutral-400 transition"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc.slug} value={loc.label} className="bg-white text-neutral-900">
                    {loc.label}
                  </option>
                ))}
              </select>
              <MapPin className="w-3.5 h-3.5 text-neutral-800 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Active search tag if query active */}
            {filters.query && (
              <div className="flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-900 text-xs px-3 py-1 rounded-xl">
                <span>Search: "{filters.query}"</span>
                <button 
                  onClick={() => setFilters(prev => ({ ...prev, query: '' }))}
                  className="hover:text-black font-bold ml-1"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Sort By Dropdown & Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500 hidden sm:inline">
              Showing <strong className="text-neutral-900">{products.length}</strong> drops
            </span>

            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-800 shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
              <select
                value={filters.sortBy || 'featured'}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="bg-transparent text-neutral-900 focus:outline-none cursor-pointer text-xs"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-white text-neutral-900">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            {(filters.category !== 'all' || filters.gender !== 'all' || filters.locality !== 'all' || filters.query) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-neutral-600 hover:text-black transition"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 xl:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="bg-white rounded-2xl border border-neutral-200 aspect-[3/4] animate-pulse" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 xl:gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white border border-neutral-200 rounded-3xl p-8 card-tactile">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-400 mx-auto flex items-center justify-center">
            <Filter className="w-8 h-8 stroke-1" />
          </div>
          <h3 className="text-base font-bold text-neutral-950 uppercase tracking-tight">No Activewear Found</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            No drops match the current filters. Try selecting a different category or clearing your locality filter.
          </p>
          <button
            onClick={resetFilters}
            className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase px-5 py-2.5 rounded-xl transition"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </section>
  );
};

export default CatalogSection;
