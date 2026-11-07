import React from 'react';
import { MapPin, Clock, Phone, Sparkles } from 'lucide-react';

interface GrannyExactHeaderProps {
  onOrderClick?: () => void;
}

export const GrannyExactHeader: React.FC<GrannyExactHeaderProps> = ({ onOrderClick }) => {
  return (
    <header className="w-full flex flex-col items-center relative select-none">
      {/* Top Graphic Lockup featuring the EXACT Checked Cloth Banner & EXACT Logo Text */}
      <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-b-2xl shadow-xl relative bg-[#1c1d20]">
        <div className="relative w-full aspect-[1344/480] sm:aspect-[1344/430] overflow-hidden">
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.31.53_PM_215f9de8.jpg"
            alt="Granny's Kitchen Logo & Checked Cloth Banner"
            className="w-full h-auto object-cover object-top select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient blend to transition cleanly into the cream menu panel below */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbf7ee] via-[#fbf7ee]/60 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Immediate "NOW OPEN" & Location Announcement Bar - Styled with Tartan Ribbon Accents */}
      <div className="w-full max-w-3xl mx-auto -mt-6 sm:-mt-8 z-10 px-4">
        <div className="relative rounded-2xl p-1 bg-scottish-tartan shadow-2xl border-2 border-[#8b1d20]/50">
          <div className="bg-[#241712] text-[#fffcf7] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#e5a84b]/40">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="font-condensed uppercase tracking-wider text-sm sm:text-base font-extrabold text-[#e5a84b]">
                    NOW OPEN & SERVING
                  </span>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <span className="text-xs font-semibold text-[#f5ebd9]">Fourways Mall BTC05</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#d5c3aa] flex items-center gap-1 justify-center sm:justify-start mt-0.5">
                  <MapPin className="w-3 h-3 text-[#e5a84b] shrink-0" />
                  <span>Lower Ground • BTC05 Taxi Terminal Loading Bays</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 text-[11px] text-[#edd5b9] bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-3 h-3 text-[#e5a84b]" />
                <span>06:00 – 19:00 Daily</span>
              </div>
              {onOrderClick && (
                <button
                  onClick={onOrderClick}
                  className="px-4 py-2 bg-[#7a2225] hover:bg-[#91282c] border border-[#e5a84b]/60 text-white rounded-xl text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[#e5a84b]" />
                  <span>Takeaway Order</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
