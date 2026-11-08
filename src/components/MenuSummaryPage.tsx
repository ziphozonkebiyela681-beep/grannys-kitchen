import React from 'react';
import {
  Flame,
  Utensils,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Plus,
  Clock,
  MapPin,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { CartItem } from './MenuSection';
import { MenuItem, MENU_ITEMS } from '../data/menuData';
import { useRestaurantStatus } from '../utils/operatingHours';

interface MenuSummaryPageProps {
  onGoToFullMenu: (categoryId?: string) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenConfigurator: (item: MenuItem) => void;
  onOpenCart: () => void;
  cartCount: number;
}

interface CategoryHighlight {
  categoryId: 'chicken_dust' | 'stews' | 'chips' | 'kota' | 'breakfast' | 'salads';
  categoryTitle: string;
  tagline: string;
  badge: string;
  accentColor: string;
  itemCountText: string;
  featuredItemId: string;
  customDescription: string;
  servingTime?: string;
}

const CATEGORY_HIGHLIGHTS: CategoryHighlight[] = [
  {
    categoryId: 'chicken_dust',
    categoryTitle: 'Chicken Dust',
    tagline: 'Flame-Grilled Quarter Leg & Pap',
    badge: 'Township Style Classic',
    accentColor: '#8b1d20',
    itemCountText: '2 Plate Combos',
    featuredItemId: 'chicken-dust-pap',
    customDescription:
      'Seasoned chicken quarter leg, charred to perfection on open flame and simmered in Granny’s savoury onion gravy with steaming hot maize meal pap.',
    servingTime: 'Available from 10:30 AM',
  },
  {
    categoryId: 'stews',
    categoryTitle: 'Slow-Cooked Stews & Curry',
    tagline: 'Tender Beef Stew with 1 Starch & 2 Veg',
    badge: "Granny's Signature Pot",
    accentColor: '#701518',
    itemCountText: '3 Slow-Simmered Pots',
    featuredItemId: 'beef-stew',
    customDescription:
      'Slow-cooked until melt-in-your-mouth tender in rich homestyle beef broth. Served with your choice of fluffy Pap, Steamed Rice, or Dumpling plus 2 seasonal veggies.',
    servingTime: 'Simmering hot all day',
  },
  {
    categoryId: 'chips',
    categoryTitle: 'Crispy Chips & Golden Fish',
    tagline: 'Hand-Cut Chips with Authentic Aromat & Hake Fillet',
    badge: 'Fresh From The Fryer',
    accentColor: '#96381a',
    itemCountText: '4 Chip Sizes & Combos',
    featuredItemId: 'fish-chips',
    customDescription:
      'Golden, crispy on the edges, fluffy inside, generously dusted in South African Aromat seasoning. Paired with crispy battered hake fillets.',
    servingTime: 'Cooked fresh on order',
  },
  {
    categoryId: 'kota',
    categoryTitle: 'Supreme Kotas',
    tagline: 'Quarter Loaf Stuffed with Chips, Cheese & Egg',
    badge: 'Commuter Favourite',
    accentColor: '#7d1f22',
    itemCountText: 'Mince & Classic Bases',
    featuredItemId: 'kota-base',
    customDescription:
      'Hollowed fresh quarter loaf packed to the brim with hot chips, golden melted cheddar, fried egg, and spicy mango atchar. Loaded with optional savoury mince.',
    servingTime: 'Served fresh & piping hot',
  },
  {
    categoryId: 'breakfast',
    categoryTitle: 'Breakfast & Amagwinya',
    tagline: 'Piping Hot Golden Vetkoek',
    badge: 'From R1.50 • Fresh from 06:00 AM',
    accentColor: '#8a2b13',
    itemCountText: 'Vetkoek & 4 Savoury Toppings',
    featuredItemId: 'amagwinya-plain',
    customDescription:
      'Traditional golden puffed vetkoek with crisp blistered crusts and pillowy soft insides. Enjoy plain or loaded with cheddar cheese, savoury beef mince, egg, or atchar.',
    servingTime: 'Daily from 06:00 AM',
  },
  {
    categoryId: 'salads',
    categoryTitle: 'Fresh Homestyle Salads',
    tagline: 'Tangy Homemade Coleslaw & Garden Salad',
    badge: 'Chilled & Crisp Side',
    accentColor: '#5c2214',
    itemCountText: '2 Crisp Ceramic Bowls',
    featuredItemId: 'coleslaw',
    customDescription:
      'Hand-shredded green and red cabbage with sweet grated carrots tossed in Granny’s chilled, creamy signature dressing in an artisanal ceramic bowl.',
    servingTime: 'Chilled & crisp daily',
  },
];

export const MenuSummaryPage: React.FC<MenuSummaryPageProps> = ({
  onGoToFullMenu,
  onAddToCart,
  onOpenConfigurator,
  onOpenCart,
  cartCount,
}) => {
  const status = useRestaurantStatus();

  const handleQuickAddOrCustomize = (item: MenuItem) => {
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
    <div className="w-full space-y-8 select-none">
      {/* 1. Page Header & Introduction Banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#8b1d20]/40 shadow-lg bg-[#fffdf9]">
        {/* Tartan Ribbon Top Header */}
        <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3.5 py-1.5 rounded-xl border border-[#e5a84b]/60 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#e5a84b]" />
            <span className="font-condensed tracking-wider uppercase text-xs sm:text-sm font-extrabold text-[#fffcf7]">
              MENU HIGHLIGHTS & CATEGORY SHOWCASE
            </span>
          </div>
          <span className="text-xs text-[#3d2319] font-body font-bold bg-[#fffdfa]/95 px-3 py-1 rounded-lg border border-[#c4a683] hidden sm:inline shadow-2xs">
            1 Signature Dish per Category
          </span>
        </div>

        {/* Narrative / Welcome Card */}
        <div className="p-5 sm:p-7 text-center bg-gradient-to-b from-[#fffdf9] to-[#fbf5eb]">
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#8b1d20] uppercase tracking-widest bg-[#f7eedf] px-3 py-1 rounded-full border border-[#d8c3ad] mb-1">
              <Heart className="w-3.5 h-3.5 text-[#e5a84b] fill-[#e5a84b]" />
              <span>Since 1997 • Mam Nomsa "Granny" Moeketsi</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#361a15] tracking-wide uppercase drop-shadow-xs">
              Home-Cooked With Love
            </h2>
            <p className="font-editorial text-sm sm:text-base text-[#7a2225] font-semibold italic">
              "Since 1997, one mother has been feeding a nation, one plate at a time."
            </p>
            <p className="text-xs sm:text-sm text-[#5f473b] leading-relaxed font-body">
              From Katlehong canteens to Fourways Mall (BTC05 Taxi Terminal). Here is a summary of our 6 food categories, featuring the signature hero dish of each category. Tap any dish to order or explore the full menu!
            </p>
          </div>

          {/* Quick CTA to Full Menu */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onGoToFullMenu()}
              className="py-2.5 px-5 bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border-2 border-[#e5a84b]/60 rounded-xl text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-md hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95 group"
            >
              <span>View Full Menu (All 15+ Dishes & Extras)</span>
              <ArrowRight className="w-4 h-4 text-[#e5a84b] group-hover:translate-x-1 transition-transform" />
            </button>

            {cartCount > 0 && (
              <button
                onClick={onOpenCart}
                className="py-2.5 px-4 bg-[#7a2225] hover:bg-[#91282c] text-[#fffdfa] border border-[#e5a84b]/40 rounded-xl text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-[#e5a84b]" />
                <span>View Takeaway Bag ({cartCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Six Category Showcase Cards (1 Dish Representing Each Category) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {CATEGORY_HIGHLIGHTS.map((cat, index) => {
          const item = MENU_ITEMS.find((m) => m.id === cat.featuredItemId);
          if (!item) return null;

          return (
            <div
              key={cat.categoryId}
              className="bg-[#fffdf9] border-2 border-[#decbb7] hover:border-[#8b1d20]/70 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Card Header Ribbon */}
              <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3 py-1 rounded-lg border border-[#e5a84b]/40 shadow-xs">
                  <span className="font-condensed tracking-wider uppercase text-xs sm:text-sm font-extrabold text-[#fffcf7]">
                    #{index + 1} {cat.categoryTitle}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#441a1c] bg-[#fffdfa]/95 px-2.5 py-0.5 rounded-md border border-[#c4a683] shadow-2xs font-condensed tracking-wide uppercase">
                  {cat.itemCountText}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col grow justify-between">
                {/* Badge if present */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-[#5c1c1e] bg-[#f9f1e4] border border-[#d8c3ad] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-condensed">
                    {cat.badge}
                  </span>
                  {cat.servingTime && (
                    <span className="text-[10px] text-[#7a5745] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#e5a84b]" />
                      <span>{cat.servingTime}</span>
                    </span>
                  )}
                </div>

                {/* Plate Image Showcase */}
                <div className="w-full flex items-center justify-center py-3 my-1">
                  <div className="relative w-48 h-44 sm:w-56 sm:h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {/* Realistic soft radial shadow under the floating plate */}
                    <div className="absolute inset-4 rounded-full bg-black/25 blur-md -bottom-2 pointer-events-none transform scale-90" />
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain relative z-10 drop-shadow-[0_12px_16px_rgba(40,15,10,0.3)] filter"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-[#e8dac7] flex items-center justify-center">
                        <Utensils className="w-8 h-8 text-[#8b1d20]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Dish Info Underneath Plate */}
                <div className="mt-2 text-center pt-2 border-t border-[#ebdccb] space-y-1.5">
                  <h3 className="font-bold text-base sm:text-lg text-[#3e1416] font-body leading-snug">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-center gap-2 py-0.5">
                    <span className="text-xs uppercase font-condensed tracking-wider text-[#735041] font-bold">
                      Price:
                    </span>
                    <span className="font-mono tabular-nums text-2xl font-black text-[#69181a]">
                      R{item.price.toFixed(2)}
                    </span>
                    {item.hasStarchChoice && (
                      <span className="text-[11px] text-[#735041] font-body">
                        (incl. 1 starch + 2 veg)
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#5f473b] leading-relaxed px-1 font-body">
                    {cat.customDescription}
                  </p>
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-5 pt-3 border-t border-[#ebdccb] grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickAddOrCustomize(item)}
                    className="w-full py-2.5 px-3 bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border border-[#e5a84b]/40 rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 group-hover:brightness-105"
                  >
                    <Plus className="w-4 h-4 text-[#e5a84b]" />
                    <span>
                      {item.hasStarchChoice || item.category === 'kota' || item.category === 'breakfast'
                        ? 'Customize & Order'
                        : 'Add to Bag'}
                    </span>
                  </button>

                  <button
                    onClick={() => onGoToFullMenu(cat.categoryId)}
                    className="w-full py-2.5 px-3 bg-[#f2e6d6] hover:bg-[#e6d5bf] text-[#3e1416] border border-[#c5ab8f] rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  >
                    <span>See All {cat.categoryTitle}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8b1d20]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Big Banner to encourage navigating to the full menu */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#8b1d20]/50 shadow-xl bg-scottish-tartan p-2">
        <div className="bg-[#241712] text-[#fffcf7] rounded-xl p-5 sm:p-7 text-center border border-[#e5a84b]/40">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-black/40 px-3.5 py-1 rounded-full border border-white/10 text-xs text-[#e5a84b] uppercase font-condensed tracking-wider font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Restaurant Experience</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-[#fffcf7]">
              Want To See Everything On The Menu?
            </h3>

            <p className="text-xs sm:text-sm text-[#d8c3aa] leading-relaxed font-body">
              Our 2nd page features the complete menu: slow-simmered Lamb Curry, Chicken Stew with dumplings, multiple chip sizes, loaded kota add-ons, savoury vetkoek fillings, and fresh salads.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onGoToFullMenu()}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#7a2225] to-[#91282c] hover:brightness-110 border-2 border-[#e5a84b]/60 text-white font-condensed tracking-widest text-base uppercase font-bold shadow-xl active:scale-98 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Go to Page 2 • The Full Menu</span>
                <ArrowRight className="w-5 h-5 text-[#e5a84b]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
