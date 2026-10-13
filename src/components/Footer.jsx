import React from 'react';
import { Dumbbell, MapPin, ShieldCheck, Zap, Heart, Store, Truck, Phone, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { switchRole, setIsAuthModalOpen, setTrackingOrder, orders } = useApp();

  const handleTrack = () => {
    if (orders && orders.length > 0) {
      setTrackingOrder(orders[0]);
    }
  };

  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 text-neutral-600 text-xs mt-20">
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center text-white shadow-md">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-neutral-950 uppercase font-heading">
                FIT<span className="text-neutral-500">FLEX</span> HYD
              </span>
            </div>
            <p className="text-neutral-600 leading-relaxed max-w-sm">
              Hyderabad’s premier hyper-local gym activewear marketplace. 
              Connecting lifters directly with boutique fitness apparel creators across Banjara Hills, Jubilee Hills, and Madhapur.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-950">
              <MapPin className="w-4 h-4 text-neutral-900" />
              <span>Hyderabad, Telangana, India (Same-Day Fleet Active)</span>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-neutral-950 font-bold uppercase tracking-wider text-xs font-heading">Customer Care</h4>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <button onClick={handleTrack} className="hover:text-black transition flex items-center gap-1">
                  <span>Track Live Delivery</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li><span className="hover:text-black transition cursor-pointer">Size & Fit Guide</span></li>
              <li><span className="hover:text-black transition cursor-pointer">100% Cash On Delivery Policy</span></li>
              <li><span className="hover:text-black transition cursor-pointer">48-Hour Doorstep Exchange</span></li>
              <li><span className="hover:text-black transition cursor-pointer">Hyderabad Fleet FAQ</span></li>
            </ul>
          </div>

          {/* Verified Hyderabad Hubs */}
          <div className="space-y-3">
            <h4 className="text-neutral-950 font-bold uppercase tracking-wider text-xs font-heading">Local Store Hubs</h4>
            <ul className="space-y-2 text-neutral-600">
              <li>IronCore Hub (Road No 10, Banjara Hills)</li>
              <li>AuraFlex Studios (Road No 36, Jubilee Hills)</li>
              <li>Madhapur Cyber Towers Dispatch</li>
              <li>Gachibowli Financial District Hub</li>
              <li>Kukatpally & Kondapur Express</li>
            </ul>
          </div>

          {/* Partner & Merchant Operations */}
          <div className="space-y-3">
            <h4 className="text-neutral-950 font-bold uppercase tracking-wider text-xs font-heading">Merchant & Admin</h4>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <button
                  onClick={() => switchRole('SELLER')}
                  className="hover:text-black transition flex items-center gap-1 text-left"
                >
                  <Store className="w-3.5 h-3.5 text-neutral-900" />
                  <span>IronCore Merchant Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchRole('ADMIN')}
                  className="hover:text-black transition flex items-center gap-1 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Admin Operations HQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="hover:text-black transition font-semibold text-neutral-900"
                >
                  Switch Demo Account ↗
                </button>
              </li>
              <li className="pt-2 text-[11px] text-neutral-500">
                Are you a Hyderabad gym or apparel maker? Partner with FitFlex for local delivery fleet access.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} FitFlex Hyderabad. All rights reserved. Shop Local. Stay Active.</p>
          <div className="flex items-center gap-4 text-neutral-700 font-semibold">
            <span>💵 100% Cash On Delivery</span>
            <span>•</span>
            <span>📱 UPI QR Accepted</span>
            <span>•</span>
            <span>⚡ Same-Day SwiftFleet</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
