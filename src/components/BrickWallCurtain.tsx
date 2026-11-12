import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Sparkles, MapPin, Clock } from 'lucide-react';
import { useRestaurantStatus } from '../utils/operatingHours';

interface BrickWallCurtainProps {
  onRevealChange?: (revealed: boolean) => void;
  children?: React.ReactNode;
}

export const BrickWallCurtain: React.FC<BrickWallCurtainProps> = ({
  onRevealChange,
  children,
}) => {
  // Starts CLOSED by default so the person must press the "Step In" button to open the doors
  const [isRevealed, setIsRevealed] = useState(false);
  const status = useRestaurantStatus();

  const handleOpenDoors = () => {
    setIsRevealed(true);
    onRevealChange?.(true);
  };

  const handleToggle = () => {
    const nextState = !isRevealed;
    setIsRevealed(nextState);
    onRevealChange?.(nextState);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Central Content - Spanning full space without narrow side walls */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>

      {/* Floating Curtain Control to easily replay or close the brick entrance */}
      {isRevealed && (
        <div className="fixed top-4 right-4 z-30 flex items-center gap-2 bg-[#2d1b14]/90 backdrop-blur-md text-[#f7eedf] border border-[#e5a84b]/40 px-3 py-1.5 rounded-full shadow-xl hover:bg-[#3d241c] transition-all text-xs font-semibold cursor-pointer select-none">
          <button
            onClick={handleToggle}
            className="flex items-center gap-1.5 focus:outline-none cursor-pointer"
            title="Re-close Brick Doors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#e5a84b]" />
            <span>Brick Doors</span>
          </button>
        </div>
      )}

      {/* The Two Sliding Brick Walls (Left & Right)
          When closed: they meet seamlessly in the middle covering the viewport.
          When person presses "Step In": they slide completely off-screen (-105% / +105%) and become invisible,
          leaving the website on full space screen! */}
      <div
        className={`fixed inset-0 z-30 flex overflow-hidden ${
          isRevealed ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        {/* Left Grey Brick Wall Curtain */}
        <motion.div
          className="relative h-full"
          initial={false}
          animate={{
            x: isRevealed ? '-105%' : '0%',
            opacity: isRevealed ? 0 : 1,
          }}
          transition={{
            duration: 2.4, // Slower slide for dramatic anticipation of revelation
            ease: [0.22, 1, 0.36, 1], // Smooth cinematic deceleration
          }}
          style={{ width: '54vw' }}
        >
          <div
            className="w-full h-full relative shadow-[-16px_0_40px_rgba(0,0,0,0.85)] border-r-2 border-black/50"
            style={{
              backgroundImage: "url('/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.31.53_PM_215f9de8.jpg')",
              backgroundPosition: 'left center',
              backgroundSize: 'cover',
            }}
          >
            {/* Dark vignette gradient on the left and center seam */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Right Grey Brick Wall Curtain */}
        <motion.div
          className="relative h-full ml-auto"
          initial={false}
          animate={{
            x: isRevealed ? '105%' : '0%',
            opacity: isRevealed ? 0 : 1,
          }}
          transition={{
            duration: 2.4, // Slower slide for dramatic anticipation of revelation
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ width: '54vw' }}
        >
          <div
            className="w-full h-full relative shadow-[16px_0_40px_rgba(0,0,0,0.85)] border-l-2 border-black/50"
            style={{
              backgroundImage: "url('/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.31.53_PM_215f9de8.jpg')",
              backgroundPosition: 'right center',
              backgroundSize: 'cover',
            }}
          >
            {/* Dark vignette gradient on the right and center seam */}
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Initial Closed Door Welcome Overlay & Person Must Press "Step In" */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center p-2.5 sm:p-6 pointer-events-auto bg-black/60 backdrop-blur-[2px] select-none overflow-y-auto overflow-x-hidden"
          >
            {/* Center Area with Red Bistro Chairs flanking on desktop & small table setup directly below on vertical phones */}
            <div className="relative max-w-xl w-full flex flex-col items-center justify-center my-auto py-1 sm:py-2">
              {/* Left Red Bistro Chair (Desktop & Tablet flanking) */}
              <div className="hidden sm:block absolute -left-8 md:-left-16 lg:-left-24 bottom-2 md:bottom-3 w-20 md:w-28 lg:w-36 pointer-events-none select-none z-20">
                <img
                  src="/assets/decorations/red_bistro_chair_left.png"
                  alt="Red Bistro Chair"
                  className="w-full h-auto drop-shadow-[-8px_14px_18px_rgba(0,0,0,0.75)] transform -rotate-2"
                />
              </div>

              {/* Central Welcome Card (The Description Square) */}
              <div className="max-w-lg w-full relative z-10 p-1 sm:p-2 bg-scottish-tartan rounded-2xl shadow-2xl border-2 border-[#8b1d20]/50 flex flex-col">
                <div className="bg-[#fffdf9] rounded-xl p-3 sm:p-7 text-center border border-[#e5a84b]/40">
                  {/* The EXACT Granny's Kitchen Logo Graphic */}
                  <div className="w-full flex items-center justify-center mb-2 sm:mb-4 px-2">
                    <img
                      src="/assets/logos/grannys_kitchen_logo.png"
                      alt="Granny's Kitchen"
                      className="w-full max-w-[180px] sm:max-w-[340px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(40,15,10,0.2)] select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Status Badge: Open or Closed based on operating hours (06:00 - 19:00 SAST) */}
                  <div className="mb-1.5 sm:mb-3">
                    {status.isOpen ? (
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-emerald-800 text-white rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm border border-emerald-600/50">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>{status.statusText}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-[#421618] text-[#ffe8e8] rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm border border-[#e5a84b]/40">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#fbbf24]" />
                        <span>{status.statusText} • {status.opensAtText}</span>
                      </div>
                    )}
                  </div>

                  <p className="flex items-center justify-center gap-1 text-[11px] sm:text-xs font-bold text-[#633a28] uppercase tracking-wider mb-1 sm:mb-1.5">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e5a84b]" />
                    <span>Fourways Mall • BTC05 Taxi Terminal</span>
                  </p>

                  {/* Operating Hours Note */}
                  <p className="text-[10px] sm:text-xs text-[#785341] font-semibold mb-1.5 sm:mb-2.5">
                    Hours: {status.hoursText} <span className="opacity-70">({status.currentTimeStr})</span>
                  </p>

                  <p className="text-[11px] sm:text-sm text-[#5c4a3b] mb-3 sm:mb-4 font-body leading-snug sm:leading-relaxed px-1">
                    {status.isOpen
                      ? "Welcome to Granny's Kitchen! Step inside to explore our home-cooked meals, flame-grilled chicken dust, rich stews, supreme kotas, fresh vetkoek, and crisp salads."
                      : "The kitchen is currently closed for the night. You can step inside to browse our full menu, dishes, and prices ahead of opening!"}
                  </p>

                  {/* The "Step Inside" Button that explicitly opens the brick walls */}
                  <button
                    onClick={handleOpenDoors}
                    className="w-full py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-[#7a2225] via-[#8b1d20] to-[#601416] hover:brightness-110 border-2 border-[#e5a84b]/60 text-[#fffdfa] font-condensed tracking-widest text-sm sm:text-lg uppercase shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer font-extrabold ring-2 ring-[#e5a84b]/30"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#e5a84b] group-hover:rotate-12 transition-transform" />
                    <span>{status.isOpen ? "Step Inside • View Menu & Order" : "Step Inside • Browse Menu"}</span>
                  </button>
                </div>
              </div>

              {/* Right Red Bistro Chair (Desktop & Tablet flanking) */}
              <div className="hidden sm:block absolute -right-8 md:-right-16 lg:-right-24 bottom-2 md:bottom-3 w-22 md:w-32 lg:w-40 pointer-events-none select-none z-20">
                <img
                  src="/assets/decorations/red_bistro_chair_right.png"
                  alt="Red Bistro Chair"
                  className="w-full h-auto drop-shadow-[8px_14px_18px_rgba(0,0,0,0.75)] transform rotate-2"
                />
              </div>

              {/* Vertical Phone Entrance Setup: Small & clearly visible just under the square */}
              <div className="block sm:hidden w-full max-w-[140px] mx-auto mt-2 text-center pointer-events-none select-none z-20 animate-fade-in">
                <img
                  src="/assets/decorations/bistro_table_and_chairs.png"
                  alt="Granny's Kitchen Bistro Dining Table & Chairs"
                  className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
                />
                <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 border border-[#e5a84b]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5a84b] animate-pulse shrink-0" />
                  <span className="text-[9px] text-[#f7eedf] font-condensed uppercase tracking-wider font-bold whitespace-nowrap">
                    A warm table awaits
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
