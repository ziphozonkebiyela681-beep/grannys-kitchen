import React from 'react';
import {
  Heart,
  Utensils,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Clock,
  MapPin,
  Camera,
  Users,
  BookOpen,
  Plus,
  Check,
  Instagram,
} from 'lucide-react';
import { CartItem } from './MenuSection';
import { MenuItem, MENU_ITEMS } from '../data/menuData';
import { useRestaurantStatus } from '../utils/operatingHours';
import { AromatSeasoningBadge, AromatFlavourBar } from './AromatSeasoningBadge';
import { AppPage } from './CornerNavigation';

interface HomePageProps {
  onNavigate: (page: AppPage) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenConfigurator: (item: MenuItem) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAddToCart,
  onOpenConfigurator,
  onOpenCart,
  cartCount,
}) => {
  const status = useRestaurantStatus();

  // Top 4 curated favourite dishes for quick picking on the Home Page
  const topPicks = [
    MENU_ITEMS.find((m) => m.id === 'beef-stew')!,
    MENU_ITEMS.find((m) => m.id === 'chicken-dust-chips')!,
    MENU_ITEMS.find((m) => m.id === 'mince-kota')!,
    MENU_ITEMS.find((m) => m.id === 'chips-medium')!,
  ].filter(Boolean);

  const handleQuickAdd = (item: MenuItem) => {
    if (item.hasStarchChoice || item.category === 'kota' || item.category === 'breakfast') {
      onOpenConfigurator(item);
    } else {
      const cartItem: CartItem = {
        cartId: `${item.id}-${Date.now()}`,
        item,
        quantity: 1,
        totalPrice: item.price,
      };
      onAddToCart(cartItem);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-6 select-none">
      {/* 1. SHORT, CLEAR WELCOME CARD (Only the Most Important Points) */}
      <section className="bg-[#fffdfa] border-2 border-[#8b1d20]/40 rounded-3xl overflow-hidden shadow-lg">
        {/* Tartan Ribbon Top Header */}
        <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3 py-1 rounded-xl border border-[#e5a84b]/60 shadow-sm">
            <Heart className="w-4 h-4 text-[#e5a84b] fill-[#e5a84b]" />
            <span className="font-condensed tracking-wider uppercase text-xs sm:text-sm font-extrabold text-[#fffcf7]">
              WELCOME TO GRANNY'S KITCHEN
            </span>
          </div>
          <span className="text-xs text-[#3d2319] font-body font-bold bg-[#fffdfa]/95 px-3 py-0.5 rounded-lg border border-[#c4a683] hidden sm:inline">
            Since 1997 • Fourways Mall BTC05
          </span>
        </div>

        {/* Welcome Message */}
        <div className="p-5 sm:p-7 text-center bg-gradient-to-b from-[#fffdfa] via-[#fcf6ec] to-[#f7eedf]">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl text-[#361a15] tracking-wide uppercase">
              Real Home-Cooked Food
            </h2>
            <p className="font-editorial text-base sm:text-lg text-[#7a2225] font-semibold italic">
              "A home away from home, built on family, tradition, and generous plates."
            </p>
            <p className="text-xs sm:text-sm text-[#5c4436] font-body leading-relaxed pt-1">
              Welcome to Granny's Kitchen! Started in 1997 by Mam Nomsa, we serve hearty South African meals prepared fresh each morning at the Fourways Mall taxi terminal.
            </p>
          </div>

          {/* 4 Most Important Points (Clean, Scannable Grid) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mt-6 text-left">
            {/* Point 1: What We Cook */}
            <div className="bg-white/95 border border-[#dfceb9] p-3 rounded-2xl shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#8b1d20]/10 text-[#8b1d20] flex items-center justify-center mb-1.5 font-bold">
                <Utensils className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#3b1c15] uppercase tracking-wide">
                Hearty Meals
              </h4>
              <p className="text-[11px] text-[#6d4f40] leading-snug mt-0.5">
                Stews from R70, Chicken Dust R45, Kotas R35, Chips from R20.
              </p>
            </div>

            {/* Point 2: Dining Choice */}
            <div className="bg-white/95 border border-[#dfceb9] p-3 rounded-2xl shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#8b1d20]/10 text-[#8b1d20] flex items-center justify-center mb-1.5 font-bold">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#3b1c15] uppercase tracking-wide">
                Eat In or Take Away
              </h4>
              <p className="text-[11px] text-[#6d4f40] leading-snug mt-0.5">
                Ceramic tableware for sit-down, or hot 3-compartment boxes for the road.
              </p>
            </div>

            {/* Point 3: Location */}
            <div className="bg-white/95 border border-[#dfceb9] p-3 rounded-2xl shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#8b1d20]/10 text-[#8b1d20] flex items-center justify-center mb-1.5 font-bold">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#3b1c15] uppercase tracking-wide">
                BTC05 Terminal
              </h4>
              <p className="text-[11px] text-[#6d4f40] leading-snug mt-0.5">
                Lower Ground floor at Fourways Mall, right by taxi loading bays.
              </p>
            </div>

            {/* Point 4: Hours */}
            <div className="bg-white/95 border border-[#dfceb9] p-3 rounded-2xl shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#8b1d20]/10 text-[#8b1d20] flex items-center justify-center mb-1.5 font-bold">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#3b1c15] uppercase tracking-wide">
                Daily Hours
              </h4>
              <p className="text-[11px] text-[#6d4f40] leading-snug mt-0.5">
                Mon–Sat: 06:00 – 19:00<br />
                Sunday: 08:00 – 17:00
              </p>
            </div>
          </div>

          {/* Quick Primary Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('full-menu')}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#7a2225] via-[#8b1d20] to-[#601416] hover:brightness-110 border-2 border-[#e5a84b]/60 text-white font-condensed tracking-widest text-xs sm:text-sm uppercase shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-extrabold"
            >
              <Utensils className="w-4 h-4 text-[#e5a84b]" />
              <span>Explore Full Menu & Prices</span>
            </button>

            <button
              onClick={() => onNavigate('tour')}
              className="py-2.5 px-5 rounded-xl bg-[#2d1b16] hover:bg-[#452b23] border border-[#e5a84b]/40 text-[#fad194] font-condensed tracking-widest text-xs sm:text-sm uppercase shadow-xs active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-bold"
            >
              <Camera className="w-4 h-4 text-[#e5a84b]" />
              <span>Take Inside Tour</span>
            </button>

            {cartCount > 0 && (
              <button
                onClick={onOpenCart}
                className="py-2.5 px-4 rounded-xl bg-[#fffdf9] hover:bg-[#f6ebd9] border border-[#cbbaa4] text-[#361a15] font-condensed tracking-widest text-xs sm:text-sm uppercase shadow-xs active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-bold"
              >
                <ShoppingBag className="w-4 h-4 text-[#8b1d20]" />
                <span>Bag ({cartCount})</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. TOP FAVOURITES ROW (Crisp 4 dishes with authentic pictures & Aromat pairing) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#8b1d20] uppercase tracking-wider font-condensed">
              POPULAR CHOICES
            </span>
            <h3 className="font-display text-xl sm:text-2xl text-[#361a15] uppercase tracking-wide">
              Top Customer Favourites
            </h3>
          </div>

          <button
            onClick={() => onNavigate('full-menu')}
            className="inline-flex items-center gap-1 text-xs text-[#8b1d20] hover:text-[#5e1214] font-bold font-condensed uppercase tracking-wider cursor-pointer"
          >
            <span>See All 15+ Dishes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topPicks.map((item) => (
            <div
              key={item.id}
              className="bg-[#faf4ea] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-3.5 flex flex-col justify-between transition-all hover:shadow-lg group relative"
            >
              {/* Badge */}
              {item.badge && (
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="text-[9px] font-bold text-[#541416] bg-[#fff8ee] border border-[#d8c3ad] px-2 py-0.5 rounded-full uppercase tracking-wider font-condensed shadow-2xs">
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Food Image with Aromat pairing */}
              <div className="w-full h-36 rounded-xl overflow-visible mb-2.5 relative bg-[#231510] shadow-xs border border-[#decbb7]">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                </div>

                {item.aromatSeasoning && (
                  <AromatSeasoningBadge
                    aromat={item.aromatSeasoning}
                    placement={item.aromatPlacement || 'beside'}
                    size="sm"
                  />
                )}
              </div>

              {/* Title & Price */}
              <div className="text-center grow flex flex-col justify-between pt-1 border-t border-[#e5d4c1]">
                <div>
                  <h4 className="font-bold text-sm text-[#3b181a] leading-tight">
                    {item.name}
                  </h4>
                  <div className="font-mono text-lg font-black text-[#7a1c1d] my-1">
                    R{item.price.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => handleQuickAdd(item)}
                  className="w-full mt-2 py-2 px-3 bg-[#2d1b16] hover:bg-[#452b23] text-white rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5 text-[#e5a84b]" />
                  <span>
                    {item.hasStarchChoice || item.category === 'kota' ? 'Choose Options' : 'Add to Bag'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AROMAT FLAVOUR SHOWCASE BAR */}
      <AromatFlavourBar />

      {/* 4. EXPLORE OTHER SECTIONS (Clean Cards with Plain English) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        {/* Card A: Our Story */}
        <div
          onClick={() => onNavigate('story')}
          className="bg-[#fffdf9] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#8b1d20]/10 text-[#8b1d20] flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#381a17]">
                Our Story
              </h4>
            </div>
            <p className="text-xs text-[#6e5040] leading-relaxed">
              Read how Mam Nomsa started cooking in Katlehong in 1997 with maternal care and family love.
            </p>
          </div>
          <div className="mt-3 text-xs font-bold text-[#8b1d20] flex items-center gap-1 font-condensed uppercase tracking-wider">
            <span>Read Story</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card B: Granny's Team */}
        <div
          onClick={() => onNavigate('team')}
          className="bg-[#fffdf9] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#8b1d20]/10 text-[#8b1d20] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#381a17]">
                Granny's Team
              </h4>
            </div>
            <p className="text-xs text-[#6e5040] leading-relaxed">
              See the smiling faces of our waiters, our 4 service principles, and eat-in vs takeaway photos.
            </p>
          </div>
          <div className="mt-3 text-xs font-bold text-[#8b1d20] flex items-center gap-1 font-condensed uppercase tracking-wider">
            <span>Meet Team</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card C: Inside Tour */}
        <div
          onClick={() => onNavigate('tour')}
          className="bg-[#fffdf9] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#8b1d20]/10 text-[#8b1d20] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Camera className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#381a17]">
                Inside Tour
              </h4>
            </div>
            <p className="text-xs text-[#6e5040] leading-relaxed">
              Smooth slideshow walkthrough of the menu board, red chair seating, and family memory wall.
            </p>
          </div>
          <div className="mt-3 text-xs font-bold text-[#8b1d20] flex items-center gap-1 font-condensed uppercase tracking-wider">
            <span>Step Inside</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>
    </div>
  );
};
