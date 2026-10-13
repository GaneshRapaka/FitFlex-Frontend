import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Dumbbell, 
  ShoppingBag, 
  Search, 
  MapPin, 
  Truck, 
  User, 
  Heart, 
  ChevronDown, 
  Store, 
  ShieldAlert, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

const HYDERABAD_LOCALITIES = [
  'All Hyderabad',
  'Banjara Hills',
  'Jubilee Hills',
  'Madhapur',
  'Gachibowli',
  'Kukatpally',
  'Kondapur',
  'Secunderabad'
];

const Navbar = () => {
  const { 
    currentRole, 
    switchRole, 
    currentUser,
    cart, 
    setIsCartOpen, 
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAuthModalOpen,
    filters, 
    setFilters,
    orders,
    setTrackingOrder 
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleTrackLastOrder = () => {
    if (orders && orders.length > 0) {
      setTrackingOrder(orders[0]);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] w-full">
      
      {/* Role Banner if in Seller or Admin mode */}
      {currentRole !== 'BUYER' && (
        <div className="bg-neutral-100 border-b border-neutral-200 py-2 px-4 sm:px-8 lg:px-12 text-xs flex items-center justify-between text-neutral-800">
          <div className="flex items-center gap-2 font-bold max-w-[1760px] mx-auto w-full">
            <span className="w-2 h-2 rounded-full bg-neutral-950 animate-pulse" />
            <span>Active Portal: {currentRole === 'SELLER' ? 'Merchant Dashboard (IronCore Banjara Hills)' : 'Platform Administration Operations HQ'}</span>
            <button
              onClick={() => switchRole('BUYER')}
              className="ml-auto underline hover:text-black font-semibold flex items-center gap-1 text-[11px]"
            >
              <span>Return to Customer Store</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0" 
            onClick={() => {
              if (currentRole !== 'BUYER') switchRole('BUYER');
              setFilters(prev => ({ ...prev, category: 'all', gender: 'all', locality: 'all', query: '' }));
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-neutral-950 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-neutral-950 uppercase italic font-heading">
                  FIT<span className="text-neutral-500">FLEX</span>
                </span>
                <span className="text-[10px] bg-neutral-100 text-neutral-900 font-extrabold px-1.5 py-0.5 rounded tracking-widest border border-neutral-300">
                  HYD
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                Athletic Marketplace
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Centered & Freely Spaced) */}
          {currentRole === 'BUYER' && (
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-xs font-extrabold uppercase tracking-wider text-neutral-600">
              <button 
                onClick={() => setFilters(prev => ({ ...prev, gender: 'all', category: 'all' }))}
                className={`transition-colors hover:text-black py-1 ${
                  filters.gender === 'all' && filters.category === 'all' 
                    ? 'text-black font-black border-b-2 border-black' 
                    : ''
                }`}
              >
                All Drops
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'oversized-tees', gender: 'all' }))}
                className={`transition-colors hover:text-black py-1 ${
                  filters.category === 'oversized-tees' 
                    ? 'text-black font-black border-b-2 border-black' 
                    : ''
                }`}
              >
                Oversized
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'active-dresses-sets', gender: 'all' }))}
                className={`transition-colors hover:text-black py-1 ${
                  filters.category === 'active-dresses-sets' 
                    ? 'text-black font-black border-b-2 border-black' 
                    : ''
                }`}
              >
                Dresses & Sets
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'stringers-tanks', gender: 'all' }))}
                className={`transition-colors hover:text-black py-1 ${
                  filters.category === 'stringers-tanks' 
                    ? 'text-black font-black border-b-2 border-black' 
                    : ''
                }`}
              >
                Stringers
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'joggers-shorts', gender: 'all' }))}
                className={`transition-colors hover:text-black py-1 ${
                  filters.category === 'joggers-shorts' 
                    ? 'text-black font-black border-b-2 border-black' 
                    : ''
                }`}
              >
                Joggers & Shorts
              </button>
            </nav>
          )}

          {/* Right Section: Compact Search, Locality Selector & Action Tools */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Compact Search Trigger (Reduced width by several cm since modal handles full search) */}
            {currentRole === 'BUYER' && (
              <>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex w-40 lg:w-48 bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/90 rounded-full py-2 px-3.5 items-center justify-between text-xs text-neutral-600 transition shadow-2xs group cursor-pointer"
                  title="Search drops (⌘K)"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors shrink-0" />
                    <span className="truncate text-[11px] font-medium text-neutral-500">Search drops...</span>
                  </div>
                  <span className="text-[10px] bg-white border border-neutral-200 text-neutral-500 px-1.5 py-0.2 rounded font-mono shadow-2xs shrink-0 ml-1">
                    ⌘K
                  </span>
                </button>

                {/* Mobile Search Button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="md:hidden p-2.5 text-neutral-700 hover:text-black bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 rounded-full transition"
                  title="Search drops"
                >
                  <Search className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Locality Dropdown */}
            {currentRole === 'BUYER' && (
              <div className="relative hidden lg:block shrink-0">
                <select
                  value={filters.locality === 'all' ? 'All Hyderabad' : filters.locality}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFilters(prev => ({ ...prev, locality: val === 'All Hyderabad' ? 'all' : val }));
                  }}
                  className="bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/90 text-[11px] text-neutral-800 font-semibold rounded-full py-2 pl-7 pr-3 appearance-none focus:outline-none focus:border-black cursor-pointer transition shadow-2xs"
                >
                  {HYDERABAD_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc} className="bg-white text-neutral-900">
                      {loc}
                    </option>
                  ))}
                </select>
                <MapPin className="w-3.5 h-3.5 text-neutral-800 absolute left-2.5 top-2.5 pointer-events-none" />
              </div>
            )}

            {/* Live Delivery Tracker Pill */}
            {orders.length > 0 && (
              <button
                onClick={handleTrackLastOrder}
                className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:text-black bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 px-3.5 py-2 rounded-full transition shadow-xs"
                title="Track Live Hyderabad Delivery"
              >
                <Truck className="w-3.5 h-3.5 text-neutral-800" />
                <span className="hidden xl:inline">Track</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 text-neutral-700 hover:text-rose-600 bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 rounded-full transition"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-950 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-neutral-950 hover:bg-neutral-850 text-white font-bold p-2.5 sm:px-4 sm:py-2.5 rounded-full transition flex items-center gap-2 shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-white text-neutral-950 text-[10px] font-black px-1.5 py-0.2 rounded-full border border-neutral-300">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 p-1.5 sm:px-3 sm:py-2 rounded-full text-xs font-semibold text-neutral-800 transition"
              >
                <div className="w-7 h-7 rounded-full bg-neutral-950 flex items-center justify-center text-white font-black text-xs">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <span className="hidden lg:inline text-xs max-w-[100px] truncate font-bold text-neutral-900">{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white border border-neutral-200 rounded-2xl shadow-xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 text-neutral-900"
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  <div className="p-3 border-b border-neutral-100">
                    <p className="font-bold text-neutral-950 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                      {currentRole === 'BUYER' ? 'Verified Buyer' : currentRole === 'SELLER' ? 'Merchant Partner' : 'Admin Operations'}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleTrackLastOrder();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-xl flex items-center gap-2 font-medium"
                    >
                      <Truck className="w-3.5 h-3.5 text-neutral-800" />
                      <span>My Orders & Tracking</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsWishlistOpen(true);
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-xl flex items-center gap-2 font-medium"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>Saved Wishlist ({wishlist.length})</span>
                    </button>
                  </div>

                  {/* Portal & Demo Switcher Section */}
                  <div className="pt-2 border-t border-neutral-100">
                    <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                      Portal & Account Access
                    </span>

                    {currentRole !== 'BUYER' && (
                      <button
                        onClick={() => {
                          switchRole('BUYER');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-xl flex items-center gap-2 font-medium"
                      >
                        <User className="w-3.5 h-3.5 text-neutral-800" />
                        <span>Buyer Marketplace</span>
                      </button>
                    )}

                    {currentRole !== 'SELLER' && (
                      <button
                        onClick={() => {
                          switchRole('SELLER');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-xl flex items-center gap-2 font-medium"
                      >
                        <Store className="w-3.5 h-3.5 text-neutral-800" />
                        <span>IronCore Seller Portal</span>
                      </button>
                    )}

                    {currentRole !== 'ADMIN' && (
                      <button
                        onClick={() => {
                          switchRole('ADMIN');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-xl flex items-center gap-2 font-medium"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-neutral-800" />
                        <span>Admin Oversight HQ</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-neutral-900 bg-neutral-100 hover:bg-neutral-200/70 rounded-xl flex items-center gap-2 font-bold mt-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Switch Account / Demo Logins</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-black rounded-lg bg-neutral-100 border border-neutral-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 bg-neutral-100 border border-neutral-200 rounded-xl p-2.5 text-xs text-neutral-600 flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-neutral-400" />
              <span>Search Hyderabad drops...</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider">
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, gender: 'all', category: 'all' }));
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-left hover:text-black"
            >
              All Drops
            </button>
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'oversized-tees' }));
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-left hover:text-black"
            >
              Oversized Tees
            </button>
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'active-dresses-sets' }));
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-left hover:text-black"
            >
              Dresses & Sets
            </button>
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'stringers-tanks' }));
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-left hover:text-black"
            >
              Stringers & Tanks
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
            <span className="text-neutral-500">Hyderabad Hub:</span>
            <select
              value={filters.locality === 'all' ? 'All Hyderabad' : filters.locality}
              onChange={(e) => {
                const val = e.target.value;
                setFilters(prev => ({ ...prev, locality: val === 'All Hyderabad' ? 'all' : val }));
              }}
              className="bg-neutral-100 border border-neutral-200 text-xs text-neutral-900 font-bold rounded-lg py-1 px-2"
            >
              {HYDERABAD_LOCALITIES.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
