import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, ShieldCheck, Flame, ArrowRight, MapPin, Sparkles, Layers, Eye } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../api/productsApi';

const HeroBanner = () => {
  const { setFilters, setQuickViewProduct } = useApp();
  const [heroHover, setHeroHover] = useState(false);

  const heroFeaturedProduct = INITIAL_PRODUCTS[0];

  return (
    <div className="relative overflow-hidden bg-transparent border-b border-neutral-200/90 py-14 md:py-20">

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-300 px-4 py-1.5 rounded-full text-[11px] font-extrabold text-neutral-950 uppercase tracking-widest shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-neutral-950" />
              <span>HYDERABAD LOCAL ACTIVEWEAR MARKETPLACE</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-neutral-950 leading-[1.02] font-heading">
              BUILT FOR THE <span className="underline decoration-neutral-900 decoration-4 underline-offset-8">PUMP.</span><br />
              SOURCED IN <span className="text-neutral-500">HYDERABAD.</span>
            </h1>

            {/* Description */}
            <p className="text-neutral-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Curated athletic drops directly from verified fitness merchants in <strong className="text-neutral-950">Banjara Hills, Jubilee Hills, and Madhapur</strong>. 
              Featuring our signature <strong className="text-neutral-950 font-semibold">"Flat-Lay ↔ Athlete Fit"</strong> live comparison, same-day bike dispatch, and 100% Cash on Delivery.
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white border border-neutral-200 rounded-2xl p-4 text-left shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-black text-neutral-950 mb-0.5">
                  <Zap className="w-3.5 h-3.5 text-neutral-900" />
                  <span>24-48h Delivery</span>
                </div>
                <p className="text-[11px] text-neutral-500">Same-day local dispatch across Hyderabad</p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-4 text-left shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-black text-neutral-950 mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% COD</span>
                </div>
                <p className="text-[11px] text-neutral-500">Inspect at doorstep, pay Cash or UPI</p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-4 text-left col-span-2 sm:col-span-1 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-black text-neutral-950 mb-0.5">
                  <Eye className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Dual-View</span>
                </div>
                <p className="text-[11px] text-neutral-500">Compare flat-lay silhouette with athlete fit</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => setFilters(prev => ({ ...prev, category: 'oversized-tees', gender: 'all' }))}
                className="bg-neutral-950 hover:bg-neutral-850 text-white font-extrabold px-7 py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-xs uppercase tracking-wider active:scale-95"
              >
                <span>Shop 240 GSM Oversized</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setFilters(prev => ({ ...prev, category: 'active-dresses-sets', gender: 'all' }))}
                className="bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-900 font-bold px-7 py-4 rounded-xl transition text-xs uppercase tracking-wider shadow-xs"
              >
                <span>Women's Sculpt Sets</span>
              </button>
            </div>

          </div>

          {/* Right Hero: Live Interactive Dual-Perspective Card */}
          <div className="lg:col-span-5 relative w-full">
            <div 
              className="relative rounded-3xl overflow-hidden border border-neutral-200 bg-white p-4 shadow-xl group cursor-pointer"
              onMouseEnter={() => setHeroHover(true)}
              onMouseLeave={() => setHeroHover(false)}
              onClick={() => setQuickViewProduct(heroFeaturedProduct)}
            >
              
              {/* Feature Pill Top */}
              <div className="absolute top-7 left-7 z-20 flex items-center gap-2">
                <span className="bg-neutral-950 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  FEATURED DROP
                </span>
                <span className="bg-white/90 backdrop-blur-md border border-neutral-200 text-neutral-900 text-[10px] font-bold px-2.5 py-0.8 rounded-full flex items-center gap-1 shadow-2xs">
                  <MapPin className="w-3 h-3 text-neutral-900" />
                  <span>Banjara Hills</span>
                </span>
              </div>

              {/* Main Image Box */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80">
                
                {/* State 1: Standalone Garment Flat Lay */}
                <img
                  src={heroFeaturedProduct.apparelImageUrl}
                  alt="Flat Lay Apparel"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    heroHover ? 'opacity-0 scale-95 blur-xs' : 'opacity-100 scale-100'
                  }`}
                />

                {/* State 2: Muscular Athlete Worn View */}
                <img
                  src={heroFeaturedProduct.modelImageUrl}
                  alt="Athlete Wearing Tee"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    heroHover ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                  }`}
                />

                {/* Dark gradient for text legibility at bottom of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Interactive Hover Pill in Center-Bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight font-heading">
                      {heroFeaturedProduct.name}
                    </h3>
                    <p className="text-xs text-neutral-200 font-semibold mt-0.5">
                      ₹{heroFeaturedProduct.price} • Heavy French Terry (240 GSM)
                    </p>
                  </div>

                  <div className="bg-white/90 backdrop-blur-md text-neutral-950 text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shrink-0 shadow">
                    <Sparkles className="w-3 h-3 text-neutral-900" />
                    <span>{heroHover ? "On Athlete" : "Hover Me"}</span>
                  </div>
                </div>

              </div>

              {/* Caption Under Card */}
              <div className="pt-3.5 px-1 flex items-center justify-between text-[11px] text-neutral-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>In Stock in Banjara Hills (Ready for Dispatch)</span>
                </span>
                <span className="font-extrabold text-neutral-950 group-hover:underline">
                  Quick View ↗
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
