import React from 'react';
import { MapPin, Navigation, Clock, CreditCard, ShieldCheck, Bus } from 'lucide-react';

export const LocationGuide: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="bg-[#fcf8f0] border-2 border-[#d5c3aa] rounded-2xl p-5 sm:p-8 shadow-md relative overflow-hidden">
        {/* Subtle decorative check ribbon line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-scottish-tartan" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3d2018] uppercase tracking-widest bg-white/90 px-3 py-1 rounded-full border border-[#d5c3aa] mb-2 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#e5a84b]" />
            <span>Finding Granny's Kitchen</span>
          </div>
          <h3 className="font-condensed text-2xl sm:text-3xl text-[#361a15] font-bold uppercase tracking-wide">
            Fourways Mall • BTC05 Taxi Terminal
          </h3>
          <p className="text-xs sm:text-sm text-[#6c483b] max-w-lg mx-auto">
            Conveniently located for shoppers, taxi operators, daily commuters, and mall staff craving hot home-cooked meals.
          </p>
        </div>

        {/* 3 Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Card 1: Taxi Terminal Access */}
          <div className="bg-white border border-[#e2d5c3] p-4 rounded-xl shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#8b1d20]/15 text-[#8b1d20] flex items-center justify-center mb-3">
              <Bus className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#3d1819] uppercase tracking-wide mb-1">
              Terminal Proximity
            </h4>
            <p className="text-xs text-[#6e5143] leading-relaxed">
              Directly opposite the main loading bays at BTC05. Grab your warm Kota or takeaway beef stew box right before boarding!
            </p>
          </div>

          {/* Card 2: Hours */}
          <div className="bg-white border border-[#e2d5c3] p-4 rounded-xl shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#8b1d20]/15 text-[#8b1d20] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#3d1819] uppercase tracking-wide mb-1">
              Service Hours
            </h4>
            <p className="text-xs text-[#6e5143] leading-relaxed">
              <strong>Mon – Sat:</strong> 06:00 AM – 19:00 PM<br />
              <strong>Sunday:</strong> 08:00 AM – 17:00 PM<br />
              Fresh morning amagwinya ready from 06:00.
            </p>
          </div>

          {/* Card 3: Easy Payment */}
          <div className="bg-white border border-[#e2d5c3] p-4 rounded-xl shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#8b1d20]/15 text-[#8b1d20] flex items-center justify-center mb-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#3d1819] uppercase tracking-wide mb-1">
              Payment & Takeaway
            </h4>
            <p className="text-xs text-[#6e5143] leading-relaxed">
              Cash, Card Speedpoint & SnapScan accepted. Sturdy leak-proof packaging keeps your stew and gravy piping hot.
            </p>
          </div>
        </div>

        {/* Taxi Routes Supported */}
        <div className="bg-[#f4ebe0] border border-[#d8c7b3] p-4 rounded-xl text-center">
          <p className="text-xs text-[#520d0f] font-semibold mb-2">
            Serving commuters across all Fourways Mall transit routes:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#664b3e]">
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#dac8b5]">Diepsloot</span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#dac8b5]">Cosmo City</span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#dac8b5]">Alexandra</span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#dac8b5]">Randburg</span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#dac8b5]">Midrand / Tembisa</span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#dac8b5]">Lanseria</span>
          </div>
        </div>
      </div>
    </section>
  );
};
