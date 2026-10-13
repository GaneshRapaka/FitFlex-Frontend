import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Ruler, 
  Heart,
  ChevronRight,
  Info,
  Zap,
  ArrowRight
} from 'lucide-react';

const ProductDetailModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    setIsCartOpen
  } = useApp();

  const [activeView, setActiveView] = useState('model'); // 'apparel' or 'model'
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [pincode, setPincode] = useState('500081');
  const [pincodeChecked, setPincodeChecked] = useState(true);

  useEffect(() => {
    if (quickViewProduct?.variants?.length) {
      setSelectedSize(quickViewProduct.variants[0]?.size || 'M');
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isWishlisted(product.id);

  const selectedVariant = product.variants?.find(v => v.size === selectedSize);
  const stock = selectedVariant ? selectedVariant.stockQuantity : 10;

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-2xl my-6 text-neutral-900 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Floating Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/90 hover:bg-neutral-100 text-neutral-700 hover:text-black transition border border-neutral-200 shadow-md"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
          
          {/* Left Column: Visual Showcase & Dual-Perspective Switcher */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col items-center justify-between bg-neutral-50/70">
            
            {/* Main Visual Display */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm group">
              <img
                src={activeView === 'apparel' ? product.apparelImageUrl : product.modelImageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500 transform group-hover:scale-105"
              />

              {/* Top View Badge */}
              <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-neutral-900 border border-neutral-200 flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                <span>{activeView === 'apparel' ? 'Standalone Apparel Silhouette' : 'On-Athlete Muscular Fit'}</span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md border shadow-xs transition ${
                  wishlisted 
                    ? 'bg-neutral-950 border-neutral-800 text-rose-500' 
                    : 'bg-white/90 border-neutral-200 text-neutral-700 hover:text-black'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Segmented Dual-View Toggle Pill */}
            <div className="w-full max-w-sm mt-5">
              <div className="flex bg-neutral-200/70 p-1.5 rounded-2xl border border-neutral-200 shadow-inner">
                <button
                  onClick={() => setActiveView('apparel')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeView === 'apparel'
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  <span>Flat Lay Silhouette</span>
                </button>
                <button
                  onClick={() => setActiveView('model')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeView === 'model'
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  <span>Worn On Athlete</span>
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 mt-2 text-center">
                Toggle above to compare garment drape and athlete muscle cut.
              </p>
            </div>

            {/* Store Hub info under visual */}
            <div className="mt-5 w-full bg-white border border-neutral-200 rounded-2xl p-3.5 flex items-center justify-between text-xs shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-neutral-950 text-xs">{product.store?.storeName}</h5>
                  <span className="text-[11px] text-neutral-500">{product.store?.locality}, Hyderabad Hub</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-neutral-950 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                VERIFIED STORE
              </span>
            </div>

          </div>

          {/* Right Column: Specifications, Sizing, Pincode & Actions */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
            
            <div className="space-y-4">
              
              {/* Top Tags */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-neutral-100 border border-neutral-200 text-neutral-900 text-[10px] font-extrabold px-2.5 py-0.8 rounded uppercase tracking-wider">
                    {product.badge || 'HYD DROP'}
                  </span>
                  <span className="text-neutral-500 text-xs font-semibold">
                    {product.gender} • {product.category?.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span className="text-neutral-950">{product.rating || 4.9}</span>
                  <span className="text-neutral-400 text-[10px]">({product.reviewCount || 42} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 font-heading">
                {product.name}
              </h2>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-neutral-950">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">₹{product.originalPrice}</span>
                )}
                {product.discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.description || product.fabricDetails}
              </p>

              {/* Technical Spec Chips */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                  <span className="text-neutral-400 block uppercase font-bold text-[10px]">Fabric Weight</span>
                  <span className="text-neutral-900 font-bold">{product.fabricDetails}</span>
                </div>
                <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                  <span className="text-neutral-400 block uppercase font-bold text-[10px]">Cut Profile</span>
                  <span className="text-neutral-900 font-bold">{product.fitType || "Athletic Tapered"}</span>
                </div>
              </div>

              {/* Size Selector with Size Chart Trigger */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-700">Select Size:</span>
                    <span className="text-xs font-black text-neutral-950">{selectedSize}</span>
                    {stock <= 5 && (
                      <span className="text-[10px] text-amber-600 font-bold ml-1">
                        (Only {stock} remaining in Banjara hub)
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs text-neutral-900 hover:text-neutral-600 font-bold flex items-center gap-1 underline decoration-dotted"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showSizeGuide ? "Hide Size Chart" : "Size Chart & Fit Guide"}</span>
                  </button>
                </div>

                {/* Size Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {(product.variants || []).map((v) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedSize(v.size)}
                      className={`text-xs font-bold py-2 px-3.5 rounded-xl border transition-all ${
                        selectedSize === v.size
                          ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs scale-105'
                          : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>

                {/* Collapsible Size Guide Table */}
                {showSizeGuide && product.sizeGuide && (
                  <div className="mt-3 p-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs space-y-2 animate-in fade-in">
                    <span className="font-bold text-neutral-950 block text-[11px] uppercase tracking-wider">
                      Measurements (Inches)
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
                      <div className="text-neutral-400">Size</div>
                      <div className="text-neutral-600">Chest</div>
                      <div className="text-neutral-600">Length</div>
                      <div className="text-neutral-600">Shoulder</div>
                      {Object.entries(product.sizeGuide).map(([sz, meas]) => (
                        <React.Fragment key={sz}>
                          <div className={`py-1 rounded font-bold ${sz === selectedSize ? 'bg-neutral-950 text-white' : 'text-neutral-800'}`}>
                            {sz}
                          </div>
                          <div className="py-1 text-neutral-700">{meas.chest}</div>
                          <div className="py-1 text-neutral-700">{meas.length || '-'}</div>
                          <div className="py-1 text-neutral-700">{meas.shoulder || '-'}</div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Local Hyderabad Delivery Checker */}
              <div className="bg-neutral-50 border border-neutral-200 p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                    <Truck className="w-3.5 h-3.5 text-neutral-900" />
                    <span>Hyderabad Delivery Estimate</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">100% COD</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Hyderabad Pincode"
                    className="bg-white border border-neutral-300 rounded-xl px-3 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 w-36 focus:outline-none focus:border-black font-mono"
                  />
                  <button
                    onClick={() => setPincodeChecked(true)}
                    className="bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition shadow-xs"
                  >
                    Check
                  </button>
                  {pincodeChecked && (
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Same-Day Local Dispatch (2-4 hrs)</span>
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Bottom Actions Row: Quantity, Add to Cart & Buy Now */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center bg-neutral-100 border border-neutral-200 rounded-xl p-1 text-xs font-bold">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-black rounded-lg hover:bg-white"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-neutral-950">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-black rounded-lg hover:bg-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-950 font-extrabold py-3 rounded-2xl transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-neutral-900" />
                  <span>Add to Cart</span>
                </button>

                {/* Buy with COD Now */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-neutral-950 hover:bg-neutral-850 text-white font-extrabold py-3 rounded-2xl transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Order with COD</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Doorstep Trial Available</span>
                </span>
                <span>•</span>
                <span>Hyderabad Instant Exchanges</span>
                <span>•</span>
                <span>Zero Advance Payment</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailModal;
