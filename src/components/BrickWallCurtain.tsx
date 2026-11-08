import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, RefreshCw, Sparkles, MapPin, Clock } from 'lucide-react';
import { useRestaurantStatus } from '../utils/operatingHours';

interface BrickWallCurtainProps {
  onRevealChange?: (revealed: boolean) => void;
  children?: React.ReactNode;
}

export const BrickWallCurtain: React.FC<BrickWallCurtainProps> = ({
  onRevealChange,
  children,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const status = useRestaurantStatus();

  // Allow comfortable viewing of the entrance overlay card before auto-revealing if untouched
  useEffect(() => {
    if (hasInteracted) return;

    const timer = setTimeout(() => {
      setIsRevealed(true);
      onRevealChange?.(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, [hasInteracted, onRevealChange]);

  const handleOpenDoors = () => {
    setHasInteracted(true);
    setIsRevealed(true);
    onRevealChange?.(true);
  };

  const handleToggle = () => {
    setHasInteracted(true);
    const nextState = !isRevealed;
    setIsRevealed(nextState);
    onRevealChange?.(nextState);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Central Content (The Warm Cream Panel with the Menu) */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>

      {/* Floating Curtain Control to easily replay or inspect the brick reveal */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#2d1b14]/90 backdrop-blur-md text-[#f7eedf] border border-[#a43537]/50 px-3.5 py-2 rounded-full shadow-xl hover:bg-[#3d241c] transition-all text-xs font-semibold cursor-pointer">
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 focus:outline-none"
          title="Toggle Brick Walls"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#e5a84b] ${!isRevealed ? 'animate-spin' : ''}`} />
          <span>{isRevealed ? 'Slide Bricks Closed' : 'Slide Bricks Open'}</span>
        </button>
      </div>

      {/* The Two Sliding Brick Walls (Left & Right) using the exact brick visual */}
      <div className="fixed inset-0 pointer-events-none z-30 flex overflow-hidden">
        {/* Left Grey Brick Wall Curtain */}
        <motion.div
          className="relative h-full pointer-events-auto"
          initial={{ x: '0%' }}
          animate={{
            // When closed: covers 51% (meeting in center)
            // When opened: slides left out of the center channel
            x: isRevealed ? '-85%' : '0%',
          }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1], // Smooth organic deceleration
          }}
          style={{ width: '54vw' }}
        >
          <div
            className="w-full h-full relative shadow-[-12px_0_40px_rgba(0,0,0,0.85)] border-r-2 border-black/40"
            style={{
              backgroundImage: "url('/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.31.53_PM_215f9de8.jpg')",
              backgroundPosition: 'left center',
              backgroundSize: 'cover',
            }}
          >
            {/* Dark vignette gradient on the left edge */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/70 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Right Grey Brick Wall Curtain */}
        <motion.div
          className="relative h-full pointer-events-auto ml-auto"
          initial={{ x: '0%' }}
          animate={{
            // When closed: covers 51% (meeting in center)
            // When opened: slides right out of the center channel
            x: isRevealed ? '85%' : '0%',
          }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ width: '54vw' }}
        >
          <div
            className="w-full h-full relative shadow-[12px_0_40px_rgba(0,0,0,0.85)] border-l-2 border-black/40"
            style={{
              backgroundImage: "url('/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.31.53_PM_215f9de8.jpg')",
              backgroundPosition: 'right center',
              backgroundSize: 'cover',
            }}
          >
            {/* Dark vignette gradient on the right edge */}
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/70 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Initial Closed Door Welcome Overlay & Tap to Open */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 pointer-events-auto bg-black/45 backdrop-blur-[2px]"
          >
            <div className="max-w-lg w-full relative p-1.5 sm:p-2 bg-scottish-tartan rounded-2xl shadow-2xl border-2 border-[#8b1d20]/50">
              <div className="bg-[#fffdf9] rounded-xl p-5 sm:p-7 text-center border border-[#e5a84b]/40">
                {/* The EXACT Granny's Kitchen Logo Graphic */}
                <div className="w-full flex items-center justify-center mb-4 px-2">
                  <img
                    src="/assets/logos/grannys_kitchen_logo.png"
                    alt="Granny's Kitchen"
                    className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(40,15,10,0.2)] select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Status Badge: Open or Closed based on operating hours (06:00 - 19:00 SAST) */}
                <div className="mb-3">
                  {status.isOpen ? (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-800 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-emerald-600/50">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{status.statusText}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#421618] text-[#ffe8e8] rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-[#e5a84b]/40">
                      <Clock className="w-3.5 h-3.5 text-[#fbbf24]" />
                      <span>{status.statusText} • {status.opensAtText}</span>
                    </div>
                  )}
                </div>

                <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#633a28] uppercase tracking-wider mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#e5a84b]" />
                  <span>Fourways Mall • BTC05 Taxi Terminal</span>
                </p>

                {/* Operating Hours Note */}
                <p className="text-[11px] sm:text-xs text-[#785341] font-semibold mb-3">
                  Hours: {status.hoursText} <span className="opacity-70">({status.currentTimeStr})</span>
                </p>

                <p className="text-xs sm:text-sm text-[#5c4a3b] mb-5 font-body leading-relaxed px-1">
                  {status.isOpen
                    ? "Step right in for hearty slow-cooked beef stew, lamb curry, crispy chips with Aromat, loaded kotas, fresh amagwinya, and crisp salads."
                    : "The kitchen is currently closed for the night. You can browse our full menu, prices, and food items ahead of our 06:00 AM opening!"}
                </p>

                <button
                  onClick={handleOpenDoors}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#2d1b16] hover:bg-[#422820] border border-[#e5a84b]/50 text-[#fffdfa] font-condensed tracking-widest text-base sm:text-lg uppercase shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer font-bold"
                >
                  <Sparkles className="w-5 h-5 text-[#e5a84b] group-hover:rotate-12 transition-transform" />
                  <span>{status.isOpen ? "Step Inside • View Menu & Order" : "Step Inside • Browse Menu"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
