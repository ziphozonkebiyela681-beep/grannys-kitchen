import React from 'react';
import { AromatInfo } from '../data/menuData';
import { Sparkles } from 'lucide-react';

interface AromatSeasoningBadgeProps {
  aromat: AromatInfo;
  placement?: 'beside' | 'behind';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const AromatSeasoningBadge: React.FC<AromatSeasoningBadgeProps> = ({
  aromat,
  placement = 'beside',
  size = 'md',
  showLabel = true,
}) => {
  // Canister sizing
  const canHeightClass =
    size === 'sm'
      ? 'h-16 sm:h-20'
      : size === 'lg'
      ? 'h-24 sm:h-32'
      : 'h-20 sm:h-26';

  // Beside placement: positioned beside/overlapping bottom corner of the dish image
  if (placement === 'beside') {
    return (
      <div className="absolute -bottom-2 -right-1 z-20 flex flex-col items-end pointer-events-none select-none">
        <div className="relative group/aromat">
          <img
            src={aromat.image}
            alt={aromat.name}
            className={`${canHeightClass} w-auto object-contain drop-shadow-[-6px_8px_14px_rgba(0,0,0,0.85)] filter contrast-105 transform hover:scale-110 hover:-rotate-6 transition-all duration-300`}
            referrerPolicy="no-referrer"
          />
          {showLabel && (
            <div className="absolute -bottom-1 right-0 translate-y-1/2 whitespace-nowrap">
              <span
                className={`text-[9px] sm:text-[10px] font-condensed font-extrabold uppercase tracking-wider text-white px-2 py-0.5 rounded-full shadow-lg border border-white/40 flex items-center gap-1 ${aromat.badgeBg}`}
              >
                <Sparkles className="w-2.5 h-2.5 text-[#fbbf24]" />
                <span>{aromat.name}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Behind placement: rising from behind the top-right / corner of the dish photo frame
  return (
    <div className="absolute -top-3 -right-2 z-10 flex flex-col items-end pointer-events-none select-none">
      <div className="relative group/aromat">
        <img
          src={aromat.image}
          alt={aromat.name}
          className={`${canHeightClass} w-auto object-contain drop-shadow-[-4px_6px_12px_rgba(0,0,0,0.75)] filter contrast-105 transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300`}
          referrerPolicy="no-referrer"
        />
        {showLabel && (
          <div className="absolute top-1 right-1 translate-y-[-20%] whitespace-nowrap">
            <span
              className={`text-[9px] sm:text-[10px] font-condensed font-extrabold uppercase tracking-wider text-white px-2 py-0.5 rounded-full shadow-lg border border-white/40 flex items-center gap-1 ${aromat.badgeBg}`}
            >
              <Sparkles className="w-2.5 h-2.5 text-[#fbbf24]" />
              <span>{aromat.name}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const AromatFlavourBar: React.FC = () => {
  return (
    <div className="w-full bg-[#fbf5eb] border-2 border-[#decbb7] rounded-2xl p-4 sm:p-5 shadow-sm my-6 select-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b1d20] to-[#5a1215] flex items-center justify-center text-white border border-[#e5a84b]/50 shadow-xs shrink-0">
            <Sparkles className="w-6 h-6 text-[#fbbf24]" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#8b1d20] uppercase tracking-widest font-condensed">
              Authentic South African Taste
            </span>
            <h4 className="font-bold text-base sm:text-lg text-[#301614] leading-snug">
              Served With Knorr Aromat Seasoning
            </h4>
            <p className="text-xs text-[#6e5041]">
              Every batch of our chips, kotas, and braai chicken is dusted with authentic Aromat shakers for that unmistakable golden kick!
            </p>
          </div>
        </div>

        {/* 4 Shakers preview row */}
        <div className="flex items-end justify-center gap-2 sm:gap-3 shrink-0">
          <div className="flex flex-col items-center">
            <img
              src="/assets/aromat/aromat_original.png"
              alt="Aromat Original"
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-md hover:scale-110 transition-transform"
            />
            <span className="text-[9px] font-bold text-[#8b1d20] mt-1 font-condensed uppercase">Original</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/assets/aromat/aromat_cheese.png"
              alt="Aromat Cheese"
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-md hover:scale-110 transition-transform"
            />
            <span className="text-[9px] font-bold text-[#b45309] mt-1 font-condensed uppercase">Cheese</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/assets/aromat/aromat_chilli_beef.png"
              alt="Aromat Chilli Beef"
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-md hover:scale-110 transition-transform"
            />
            <span className="text-[9px] font-bold text-[#881337] mt-1 font-condensed uppercase">Chilli Beef</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/assets/aromat/aromat_peri_peri.png"
              alt="Aromat Peri-Peri"
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-md hover:scale-110 transition-transform"
            />
            <span className="text-[9px] font-bold text-[#ea580c] mt-1 font-condensed uppercase">Peri-Peri</span>
          </div>
        </div>
      </div>
    </div>
  );
};
