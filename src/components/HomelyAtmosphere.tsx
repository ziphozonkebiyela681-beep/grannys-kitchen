import React from 'react';
import { Heart, Flame, Shield, Sparkles } from 'lucide-react';

export const HomelyAtmosphere: React.FC = () => {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-[#fcf8f0] border-2 border-[#d5c3aa] rounded-2xl p-6 sm:p-9 shadow-md relative overflow-hidden">
        {/* Subtle decorative check ribbon line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-scottish-tartan" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8b1d20] uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-[#8b1d20]/20 mb-2">
            <Heart className="w-3.5 h-3.5 text-[#e5a84b] fill-[#e5a84b]" />
            <span>The Taste of Home</span>
          </div>
          <h3 className="font-condensed text-3xl sm:text-4xl text-[#520d0f] font-bold uppercase tracking-wide">
            Cooked with Patience, Served with Pride
          </h3>
          <p className="font-editorial italic text-base text-[#7c282a] mt-1 font-semibold">
            "No one leaves Granny’s kitchen hungry."
          </p>
          <p className="text-xs sm:text-sm text-[#664b3f] mt-3 font-body leading-relaxed">
            At Fourways Mall BTC05, we believe good food takes time. While fast food rushes, Granny’s pots simmer gently. Every ladle of beef gravy, every steaming quarter loaf kota, and every golden spoonful of chakalaka carries the warmth of a Sunday family kitchen right into your daily commute.
          </p>
        </div>

        {/* 4 Pillars of Granny's Kitchen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#e2d5c3] p-4 rounded-xl text-center shadow-xs">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#fdf0dc] text-[#8b1d20] flex items-center justify-center mb-2.5">
              <Flame className="w-5 h-5 text-[#8b1d20]" />
            </div>
            <h4 className="font-condensed text-sm font-bold uppercase text-[#3e1b1c] tracking-wider mb-1">
              Slow-Braised Stews
            </h4>
            <p className="text-xs text-[#705244] leading-relaxed">
              Beef and lamb simmered for hours until meltingly tender in rich homestyle pan gravy.
            </p>
          </div>

          <div className="bg-white border border-[#e2d5c3] p-4 rounded-xl text-center shadow-xs">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#fdf0dc] text-[#8b1d20] flex items-center justify-center mb-2.5">
              <Sparkles className="w-5 h-5 text-[#8b1d20]" />
            </div>
            <h4 className="font-condensed text-sm font-bold uppercase text-[#3e1b1c] tracking-wider mb-1">
              The Aromat Magic
            </h4>
            <p className="text-xs text-[#705244] leading-relaxed">
              Golden hand-cut chips and chicken dust seasoned generously with authentic Aromat.
            </p>
          </div>

          <div className="bg-white border border-[#e2d5c3] p-4 rounded-xl text-center shadow-xs">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#fdf0dc] text-[#8b1d20] flex items-center justify-center mb-2.5">
              <Heart className="w-5 h-5 text-[#8b1d20]" />
            </div>
            <h4 className="font-condensed text-sm font-bold uppercase text-[#3e1b1c] tracking-wider mb-1">
              Fresh 06:00 AM Dough
            </h4>
            <p className="text-xs text-[#705244] leading-relaxed">
              Golden, pillowy amagwinya kneaded and fried fresh from first light for R1.50 each.
            </p>
          </div>

          <div className="bg-white border border-[#e2d5c3] p-4 rounded-xl text-center shadow-xs">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#fdf0dc] text-[#8b1d20] flex items-center justify-center mb-2.5">
              <Shield className="w-5 h-5 text-[#8b1d20]" />
            </div>
            <h4 className="font-condensed text-sm font-bold uppercase text-[#3e1b1c] tracking-wider mb-1">
              Hearty Taxi Portions
            </h4>
            <p className="text-xs text-[#705244] leading-relaxed">
              Generous starch and two vegetable sides so you stay energized throughout the day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
