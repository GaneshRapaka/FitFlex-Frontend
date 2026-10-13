import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Flame, ArrowRight, MapPin } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../api/productsApi';
import api from '../api/client';

const POPULAR_SEARCHES = [
  'Oversized Pump Cover',
  'Tennis Dress',
  'Raw-Cut Stringer',
  '240 GSM Acid Wash',
  'Seamless Legging Set',
  'Banjara Hills'
];

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setFilters, setQuickViewProduct } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [catalogItems, setCatalogItems] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    if (isSearchOpen) {
      api.get('/products')
        .then(res => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setCatalogItems(res.data);
          }
        })
        .catch(() => {});
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredResults = searchTerm.trim() === '' 
    ? [] 
    : catalogItems.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.fabricDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.store?.locality?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleSelectProduct = (product) => {
    setQuickViewProduct(product);
    setIsSearchOpen(false);
  };

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    setFilters(prev => ({ ...prev, query: tag }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Bar */}
        <div className="relative border-b border-neutral-200 p-4 sm:p-5 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search activewear, 240 GSM pump covers, gym sets..."
            className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="p-1 text-neutral-400 hover:text-black rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-neutral-500 bg-neutral-100 hover:bg-neutral-200 px-2 py-1 rounded font-medium border border-neutral-200"
          >
            ESC
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-5 bg-white">
          
          {/* Quick Tags / Trending */}
          {searchTerm.trim() === '' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                <Flame className="w-3.5 h-3.5 text-neutral-900" />
                <span>Trending Hyderabad Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="text-xs bg-neutral-100 hover:bg-neutral-950 hover:text-white border border-neutral-200 text-neutral-800 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5"
                  >
                    <span>{tag}</span>
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {filteredResults.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Found {filteredResults.length} matching drops:
              </span>
              <div className="divide-y divide-neutral-100">
                {filteredResults.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center gap-3.5 py-3 px-2 hover:bg-neutral-50 rounded-xl cursor-pointer transition"
                  >
                    <img
                      src={product.apparelImageUrl}
                      alt={product.name}
                      className="w-12 h-14 object-cover rounded-lg bg-neutral-100 border border-neutral-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-neutral-950 truncate">{product.name}</h4>
                        <span className="text-[10px] text-neutral-700 font-semibold bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">
                          {product.gender}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 truncate">{product.fabricDetails}</p>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-neutral-500" />
                        <span>{product.store.locality}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-neutral-950">₹{product.price}</span>
                      {product.discountPercent > 0 && (
                        <div className="text-[10px] font-bold text-emerald-600">{product.discountPercent}% OFF</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchTerm.trim() !== '' && filteredResults.length === 0 && (
            <div className="py-12 text-center text-neutral-500">
              <p className="text-sm font-semibold text-neutral-800">No activewear pieces found for "{searchTerm}"</p>
              <p className="text-xs text-neutral-400 mt-1">Try searching for "Oversized", "Dress", "Banjara Hills", or "240 GSM".</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default SearchModal;
