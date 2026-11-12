import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Maximize2,
  Minimize2,
  Heart,
  Sparkles,
  Utensils,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Camera,
  Layers,
  ShoppingBag,
} from 'lucide-react';
import { soulfulAudio } from '../utils/soulfulAudio';

export interface TourScene {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  description: string;
  highlightPoints: string[];
  cameraMotion: {
    initialScale: number;
    targetScale: number;
    initialX: string;
    targetX: string;
    initialY: string;
    targetY: string;
  };
}

export const TOUR_SCENES: TourScene[] = [
  {
    id: 'scene-menu',
    stepNumber: 1,
    title: 'The Menu Board & Kitchen Counter',
    subtitle: 'What We Cook • Chicken Dust, Hearty Stews & Kotas',
    image: '/assets/restaurant_tour/1_illuminated_menu_board.jpeg',
    badge: '1. The Food & Menu',
    description:
      'The large illuminated menu board hangs right above our chilled drinks fridge and open kitchen hatch. Here you can see our full spread — flame-grilled Chicken Dust, slow-cooked Beef Stew, tender Lamb Curry, Chicken Stew, golden Chips with Aromat, Supreme Kotas, fresh Amagwinya, and crisp salads.',
    highlightPoints: [
      'Full illuminated menu board with authentic food photography',
      'Chicken Dust (R45), Stews with starch & 2 veg (R70-R80), Kotas (R35)',
      'Cold drinks fridge stocked with Stoney, Coke, Fanta & water',
      'Open hatch where you can smell the pots simmering daily',
    ],
    cameraMotion: {
      initialScale: 1.05,
      targetScale: 1.18,
      initialX: '-2%',
      targetX: '2%',
      initialY: '2%',
      targetY: '-2%',
    },
  },
  {
    id: 'scene-seating',
    stepNumber: 2,
    title: 'The Dining Tables & Red Chairs',
    subtitle: 'Where You Sit Down • Red Bistro Chairs & Aromat on the Table',
    image: '/assets/restaurant_tour/3_seating_area_table.jpeg',
    badge: '2. The Seating Area',
    description:
      'Pull up a seat at our clean light-wood tables and bright red metal bistro chairs. Every table is set with tomato sauce, Aromat seasoning shakers, and a small fresh green plant, with rustic brick walls and warm lighting all around.',
    highlightPoints: [
      'Comfortable bright red metal chairs & smooth wooden tables',
      'Aromat seasoning shakers and sauces on every single table',
      'Small fresh potted plant adding life and grandma’s touch',
      'Clean, cosy dining area for lunch breaks, commuters & families',
    ],
    cameraMotion: {
      initialScale: 1.05,
      targetScale: 1.15,
      initialX: '-3%',
      targetX: '1%',
      initialY: '2%',
      targetY: '-1%',
    },
  },
  {
    id: 'scene-family-wall',
    stepNumber: 3,
    title: 'The Family Memory Wall',
    subtitle: 'Our Roots • Six Silver Frames Celebrating Mam Nomsa & Generations',
    image: '/assets/restaurant_tour/2_family_memory_wall.jpeg',
    badge: '3. Family History',
    description:
      'A nostalgic wall of six framed family photographs in polished silver frames. In the centre sits Mam Nomsa “Granny” Moeketsi smiling warmly, surrounded by family moments and the original 1980s delivery van that started our humble journey.',
    highlightPoints: [
      'Six framed silver photographs capturing four decades of family',
      'Mam Nomsa smiling warmly at the centre of the wall',
      'Original vintage delivery van photograph honouring our beginnings',
      'A real reminder that Granny’s Kitchen is built on family love',
    ],
    cameraMotion: {
      initialScale: 1.08,
      targetScale: 1.16,
      initialX: '2%',
      targetX: '-2%',
      initialY: '-2%',
      targetY: '2%',
    },
  },
  {
    id: 'scene-hearth',
    stepNumber: 4,
    title: 'The Glowing Amber Sign & Velvet Booth',
    subtitle: 'The Atmosphere • Amber Glow & Red Booth Comfort',
    image: '/assets/restaurant_tour/4_illuminated_neon_wall.jpeg',
    badge: '4. Warm Atmosphere',
    description:
      'The illuminated amber GRANNY’S KITCHEN wall sign casts a warm, relaxing glow across our crimson-red booth seating and exposed brick pillars. Overhead warm downlights make it feel peaceful, welcoming, and just like grandma’s home.',
    highlightPoints: [
      'Hand-crafted glowing amber GRANNY’S KITCHEN wall sign',
      'Plush crimson-red velvet booth seating for groups & friends',
      'Warm golden lighting creating a calm sanctuary in Fourways',
      'True home-away-from-home comfort away from the taxi rush',
    ],
    cameraMotion: {
      initialScale: 1.04,
      targetScale: 1.15,
      initialX: '1%',
      targetX: '-2%',
      initialY: '-1%',
      targetY: '2%',
    },
  },
];

interface RestaurantTourSectionProps {
  onGoToMenu?: () => void;
  onGoToStory?: () => void;
  onGoToService?: () => void;
  onOpenOrder?: () => void;
}

export const RestaurantTourSection: React.FC<RestaurantTourSectionProps> = ({
  onGoToMenu,
  onGoToStory,
  onGoToService,
  onOpenOrder,
}) => {
  // Slides: 0 to 3 are the 4 scenes, 4 is the finale overall summary slide
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideDuration, setSlideDuration] = useState(8); // seconds per slide
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = TOUR_SCENES.length + 1; // 4 photo scenes + 1 finale summary card
  const isSummarySlide = currentIndex === TOUR_SCENES.length;
  const currentScene = !isSummarySlide ? TOUR_SCENES[currentIndex] : null;

  // Music toggle handler
  const handleToggleMusic = () => {
    const newState = soulfulAudio.toggle();
    setIsMusicOn(newState);
  };

  // Auto-advance loop timer
  useEffect(() => {
    if (!isPlaying) return;

    setProgress(0);
    const intervalMs = 100;
    const step = 100 / ((slideDuration * 1000) / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next slide in loop
          setCurrentIndex((curr) => (curr + 1) % totalSlides);
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, slideDuration, totalSlides]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  };

  const handleJumpToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      soulfulAudio.pause();
    };
  }, []);

  return (
    <section
      id="restaurant-tour"
      ref={containerRef}
      className={`w-full max-w-5xl mx-auto px-2 sm:px-4 py-6 scroll-mt-6 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 max-w-none p-0 m-0 bg-black' : ''
      }`}
    >
      {/* Top Header Card */}
      {!isFullscreen && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-xs font-condensed uppercase tracking-wider font-extrabold text-[#7a2225] bg-[#fbf3e6] px-3 py-1 rounded-full border border-[#d8c4ad]">
              VIRTUAL RESTAURANT TOUR • INSIDE GRANNY'S KITCHEN
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Music Toggle Button with Soulful Note */}
            <button
              onClick={handleToggleMusic}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-condensed uppercase tracking-wider font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95 ${
                isMusicOn
                  ? 'bg-gradient-to-r from-[#8b1d20] to-[#5c1316] text-[#fffdfa] border border-[#e5a84b]'
                  : 'bg-[#fffdf9] hover:bg-[#f7eedf] text-[#361a15] border border-[#cbbaa4]'
              }`}
              title={isMusicOn ? 'Mute Soulful Music' : 'Play Soulful Kitchen Melodies'}
            >
              {isMusicOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#e5a84b] animate-pulse" />
                  <span>Soulful Music: Playing</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#8b1d20]" />
                  <span>Play Soulful Music</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Slideshow Frame */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8b1d20]/50 bg-[#1a1311] flex flex-col">
        {/* Top Tartan Accent Banner */}
        <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-4 sm:px-6 py-2.5 flex items-center justify-between text-[#fffcf7] relative z-20">
          <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3 py-1 rounded-xl border border-[#e5a84b]/60 shadow-sm">
            <Camera className="w-4 h-4 text-[#e5a84b]" />
            <span className="font-condensed tracking-wider uppercase text-xs sm:text-sm font-extrabold text-[#fffcf7]">
              Step Inside • Authentic Interior Walkthrough
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#fad194] font-condensed uppercase tracking-wider font-bold hidden sm:inline">
              Fourways Mall BTC05 Terminal
            </span>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-[#2d1b16] hover:bg-[#43271f] text-[#fad194] border border-[#e5a84b]/40 cursor-pointer transition-all"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Cinematic Viewport Container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[640px] overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            {!isSummarySlide && currentScene ? (
              // Individual Photo Scene with Smooth Ken Burns Pan and Zoom
              <motion.div
                key={currentScene.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Slow Panning & Zooming Image */}
                <motion.div
                  className="w-full h-full origin-center"
                  initial={{
                    scale: currentScene.cameraMotion.initialScale,
                    x: currentScene.cameraMotion.initialX,
                    y: currentScene.cameraMotion.initialY,
                  }}
                  animate={{
                    scale: currentScene.cameraMotion.targetScale,
                    x: currentScene.cameraMotion.targetX,
                    y: currentScene.cameraMotion.targetY,
                  }}
                  transition={{
                    duration: slideDuration + 1,
                    ease: 'linear',
                  }}
                >
                  <img
                    src={currentScene.image}
                    alt={currentScene.title}
                    className="w-full h-full object-cover object-center pointer-events-none select-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Warm Homey Vignette Overlays & Ambient Lighting */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none" />
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                {/* Top Scene Badge */}
                <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-10 flex items-center gap-2">
                  <span className="bg-[#8b1d20]/95 backdrop-blur-md text-[#fffcf7] px-3.5 py-1.5 rounded-full text-xs font-condensed uppercase tracking-wider font-extrabold border border-[#e5a84b]/70 shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#e5a84b]" />
                    <span>{currentScene.badge}</span>
                  </span>
                </div>

                {/* Bottom Overlay Captions & Narrative */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.8 }}
                  className="absolute bottom-0 inset-x-0 p-4 sm:p-7 z-10 text-white"
                >
                  <div className="max-w-2xl bg-[#1e1310]/85 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-[#e5a84b]/40 shadow-2xl space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#e5a84b] animate-ping" />
                      <span className="text-[11px] sm:text-xs text-[#e5a84b] font-condensed uppercase tracking-widest font-extrabold">
                        {currentScene.subtitle}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-[#fffdfa] uppercase tracking-wide drop-shadow-md leading-tight">
                      {currentScene.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#ecd9c7] font-body leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {currentScene.description}
                    </p>

                    {/* Highlight pills */}
                    <div className="pt-2 hidden sm:flex flex-wrap gap-1.5">
                      {currentScene.highlightPoints.slice(0, 3).map((pt, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-black/60 text-[#f7eedf] px-2.5 py-1 rounded-md border border-[#c4a683]/40"
                        >
                          ✓ {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              // Finale Slide: The Overall Tour Summary
              <motion.div
                key="scene-summary"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-8"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at center, rgba(139, 29, 32, 0.45) 0%, rgba(20, 14, 12, 0.95) 100%), url('/assets/restaurant_tour/4_illuminated_neon_wall.jpeg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="max-w-2xl w-full bg-[#1e1310]/95 backdrop-blur-lg p-6 sm:p-10 rounded-3xl border-2 border-[#e5a84b]/70 shadow-2xl text-center space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8b1d20] text-white border border-[#e5a84b]/60 text-xs font-condensed uppercase tracking-wider font-extrabold shadow-md">
                    <Heart className="w-3.5 h-3.5 text-[#e5a84b] fill-[#e5a84b]" />
                    <span>The Heart of Granny’s Kitchen</span>
                  </div>

                  {/* The requested overall summary quote */}
                  <blockquote className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#fffdfa] leading-relaxed italic drop-shadow-lg">
                    “Granny’s Kitchen is more than a restaurant. It is a home away from home, built on family, tradition and real home-cooked food.”
                  </blockquote>

                  <p className="text-xs sm:text-sm text-[#ecd9c7] max-w-lg mx-auto font-body leading-relaxed">
                    From the glowing menu board above the simmering pots to the six family portraits watching over every plate, you are welcomed with the unconditional love of a grandmother's kitchen.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    {onOpenOrder && (
                      <button
                        onClick={onOpenOrder}
                        className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#7a2225] via-[#8b1d20] to-[#601416] hover:brightness-110 border-2 border-[#e5a84b]/60 text-white font-condensed tracking-widest text-xs sm:text-sm uppercase shadow-xl font-bold cursor-pointer active:scale-95 flex items-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#e5a84b]" />
                        <span>Order Hot Meal Now</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleJumpToSlide(0)}
                      className="py-3 px-6 rounded-xl bg-[#2d1b16] hover:bg-[#452b23] border border-[#e5a84b]/50 text-[#fad194] font-condensed tracking-widest text-xs sm:text-sm uppercase shadow-md font-bold cursor-pointer active:scale-95 flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4 text-[#e5a84b]" />
                      <span>Replay Tour From Start</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous Scene"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center shadow-xl cursor-pointer active:scale-90 transition-all backdrop-blur-xs"
          >
            <ArrowLeft className="w-5 h-5 text-[#fad194]" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Scene"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center shadow-xl cursor-pointer active:scale-90 transition-all backdrop-blur-xs"
          >
            <ArrowRight className="w-5 h-5 text-[#fad194]" />
          </button>
        </div>

        {/* Progress Bar showing current slide elapsed time */}
        <div className="w-full h-1.5 bg-[#2d1a16] relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8b1d20] via-[#e5a84b] to-[#8b1d20] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom Playback & Scene Selector Controls */}
        <div className="bg-[#241713] p-3 sm:p-4 border-t border-[#462d24] flex flex-col md:flex-row items-center justify-between gap-3 text-white">
          {/* Play/Pause & Speed Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl bg-[#8b1d20] hover:bg-[#a12327] text-white shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-condensed uppercase tracking-wider font-bold border border-[#e5a84b]/40"
              title={isPlaying ? 'Pause Rotating Tour' : 'Play Rotating Tour'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#ecd9c7] transition-all cursor-pointer"
              title="Previous"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#ecd9c7] transition-all cursor-pointer"
              title="Next"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Slide Speed Selector */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-condensed uppercase text-[#d5c3aa] bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/10">
              <span className="opacity-70">Pacing:</span>
              <button
                onClick={() => setSlideDuration(5)}
                className={`px-1.5 py-0.5 rounded ${slideDuration === 5 ? 'bg-[#8b1d20] text-white font-bold' : 'hover:text-white'}`}
              >
                Fast (5s)
              </button>
              <span>•</span>
              <button
                onClick={() => setSlideDuration(8)}
                className={`px-1.5 py-0.5 rounded ${slideDuration === 8 ? 'bg-[#8b1d20] text-white font-bold' : 'hover:text-white'}`}
              >
                Normal (8s)
              </button>
              <span>•</span>
              <button
                onClick={() => setSlideDuration(12)}
                className={`px-1.5 py-0.5 rounded ${slideDuration === 12 ? 'bg-[#8b1d20] text-white font-bold' : 'hover:text-white'}`}
              >
                Slow (12s)
              </button>
            </div>
          </div>

          {/* Interactive Scene Jump Thumbnails */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {TOUR_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => handleJumpToSlide(idx)}
                className={`group relative flex items-center gap-2 p-1.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                  currentIndex === idx
                    ? 'bg-[#8b1d20] border-[#e5a84b] text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-[#d8c3ad] hover:bg-white/10'
                }`}
              >
                <div className="w-9 h-7 rounded-lg overflow-hidden shrink-0 border border-black/40">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="text-left hidden lg:block pr-1">
                  <span className="text-[10px] font-bold block uppercase leading-tight font-condensed">
                    Scene {scene.stepNumber}
                  </span>
                  <span className="text-[9px] text-[#f7eedf]/80 block truncate max-w-[90px]">
                    {scene.title.split(' ')[1] || scene.title}
                  </span>
                </div>
              </button>
            ))}

            {/* Overall Summary Slide Button */}
            <button
              onClick={() => handleJumpToSlide(TOUR_SCENES.length)}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-[11px] font-condensed uppercase tracking-wider font-bold transition-all cursor-pointer shrink-0 ${
                isSummarySlide
                  ? 'bg-[#8b1d20] border-[#e5a84b] text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-[#d8c3ad] hover:bg-white/10'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-[#e5a84b]" />
              <span>Summary</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK SCANNABLE TOUR SUMMARY (Categorised by What is Most Important First) */}
      <div className="mt-8 bg-[#fffdf9] border-2 border-[#8b1d20]/30 rounded-3xl p-5 sm:p-7 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#ebdccb] pb-3">
          <div>
            <span className="text-[10px] font-bold text-[#8b1d20] uppercase tracking-widest font-condensed">
              SCANNABLE TOUR OVERVIEW
            </span>
            <h3 className="font-display text-xl sm:text-2xl text-[#361a15] uppercase tracking-wide">
              Inside Granny's: 4 Key Areas (Most Important First)
            </h3>
          </div>
          <span className="text-xs text-[#7d5d4c] font-semibold bg-[#f7eedf] px-3 py-1 rounded-xl border border-[#d8c3ad]">
            Tap any area to jump to it
          </span>
        </div>

        {/* 4 Cards ordered by importance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOUR_SCENES.map((scene, idx) => (
            <div
              key={scene.id}
              onClick={() => handleJumpToSlide(idx)}
              className="bg-[#faf4ea] border-2 border-[#dfceb9] hover:border-[#8b1d20]/60 rounded-2xl p-4 transition-all hover:shadow-md cursor-pointer flex gap-3 group"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-[#cbbaa4] shadow-xs">
                <img
                  src={scene.image}
                  alt={scene.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-bold text-[#8b1d20] bg-[#fff8ee] border border-[#d8c3ad] px-2 py-0.5 rounded-full uppercase tracking-wider font-condensed">
                      {scene.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#381a17] leading-snug">
                    {scene.title}
                  </h4>
                  <p className="text-[11px] text-[#634839] line-clamp-2 mt-1 leading-snug">
                    {scene.description}
                  </p>
                </div>

                <div className="mt-2 text-[11px] font-bold text-[#8b1d20] flex items-center gap-1 font-condensed uppercase tracking-wider">
                  <span>View in Slideshow</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Home away from home banner */}
        <div className="bg-[#2d1b16] text-[#fffcf7] p-4 sm:p-5 rounded-2xl border border-[#e5a84b]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-condensed font-black tracking-widest uppercase text-[#e5a84b]">
              THE HEART OF GRANNY'S KITCHEN
            </span>
            <p className="font-editorial text-sm sm:text-base text-[#fad194] italic font-semibold">
              "Granny's Kitchen is more than a restaurant. It is a home away from home, built on family, tradition and real home-cooked food."
            </p>
          </div>
          {onOpenOrder && (
            <button
              onClick={onOpenOrder}
              className="py-2.5 px-5 rounded-xl bg-[#8b1d20] hover:bg-[#a12327] border border-[#e5a84b]/60 text-white font-condensed uppercase tracking-wider text-xs font-extrabold shadow-md active:scale-95 transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#e5a84b]" />
              <span>Order Desk: 072 314 7152</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
