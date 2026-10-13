import React from 'react';
import { Zap, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="w-full bg-neutral-950 border-b border-neutral-800 text-neutral-300 py-2.5 px-4 sm:px-8 lg:px-12 text-xs tracking-wider">
      <div className="w-full max-w-[1760px] mx-auto flex items-center justify-between text-[11px] font-medium">
        
        {/* Left: Dispatch Hubs */}
        <div className="hidden md:flex items-center gap-2 text-neutral-400">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-semibold text-neutral-200">Hyderabad Local Dispatch:</span>
          <span>Banjara Hills & Jubilee Hills Hubs Active</span>
        </div>

        {/* Center: Main USP */}
        <div className="flex items-center justify-center gap-4 mx-auto md:mx-0">
          <div className="flex items-center gap-1.5 text-white font-bold tracking-tight">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>FREE SAME-DAY HYDERABAD EXPRESS DELIVERY ON ORDERS OVER ₹1499</span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-neutral-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Cash On Delivery Available</span>
          </div>
        </div>

        {/* Right: Signature USP */}
        <div className="hidden lg:flex items-center gap-1.5 text-neutral-300 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>"Flat-Lay ↔ Athlete Fit" Live Reveal</span>
        </div>

      </div>
    </div>
  );
};

export default AnnouncementBar;
