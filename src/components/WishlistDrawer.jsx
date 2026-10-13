import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../api/productsApi';

const WishlistDrawer = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    setQuickViewProduct 
  } = useApp();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = INITIAL_PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 text-neutral-900 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <Heart className="w-4 h-4 fill-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold uppercase tracking-tight font-heading">Saved Drops</h3>
                <p className="text-xs text-neutral-500">{wishlist.length} item{wishlist.length === 1 ? '' : 's'} in your wishlist</p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400">
                  <Heart className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 uppercase">Your Wishlist is Empty</h4>
                  <p className="text-xs text-neutral-500 mt-1">Tap the heart icon on any drop to save pieces for your next order.</p>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-bold uppercase px-5 py-2.5 rounded-xl transition shadow-xs"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              wishlistedProducts.map(product => (
                <div key={product.id} className="py-4 first:pt-0 flex gap-3.5">
                  <img
                    src={product.apparelImageUrl}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-neutral-100 border border-neutral-200 shrink-0 cursor-pointer"
                    onClick={() => {
                      setQuickViewProduct(product);
                      setIsWishlistOpen(false);
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          className="text-xs font-bold text-neutral-950 hover:text-neutral-600 transition cursor-pointer line-clamp-1"
                          onClick={() => {
                            setQuickViewProduct(product);
                            setIsWishlistOpen(false);
                          }}
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-neutral-400 hover:text-rose-500 transition p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">{product.fabricDetails}</p>
                      <div className="text-xs font-black text-neutral-950 mt-1">
                        ₹{product.price}
                        {product.originalPrice && (
                          <span className="text-[10px] text-neutral-400 line-through ml-1.5 font-normal">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(product, 'M', 1);
                          toggleWishlist(product.id);
                        }}
                        className="bg-neutral-950 hover:bg-neutral-850 text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg flex items-center gap-1.5 shadow-xs transition active:scale-95"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
