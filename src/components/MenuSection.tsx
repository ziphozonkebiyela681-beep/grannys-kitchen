import React, { useState } from 'react';
import {
  MENU_ITEMS,
  MENU_CATEGORIES,
  STARCH_CHOICES,
  VEG_CHOICES,
  KOTA_EXTRAS,
  AMAGWINYA_TOPPINGS,
  MenuItem,
} from '../data/menuData';
import { Plus, Check, ShoppingBag, Utensils, Flame, Sparkles, Clock, ArrowLeft } from 'lucide-react';
import { useRestaurantStatus } from '../utils/operatingHours';

export interface CartItem {
  cartId: string;
  item: MenuItem;
  selectedStarch?: string;
  selectedVeg?: string[];
  selectedExtras?: { name: string; price: number }[];
  quantity: number;
  totalPrice: number;
}

interface MenuSectionProps {
  onAddToCart: (cartItem: CartItem) => void;
  cartCount: number;
  onOpenCart: () => void;
  initialCategory?: string;
  onBackToSummary?: () => void;
  initialConfiguringItem?: MenuItem | null;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  cartCount,
  onOpenCart,
  initialCategory,
  onBackToSummary,
  initialConfiguringItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  const status = useRestaurantStatus();

  // Customizer modal / expand state
  const [configuringItem, setConfiguringItem] = useState<MenuItem | null>(initialConfiguringItem || null);
  const [chosenStarch, setChosenStarch] = useState<string>(STARCH_CHOICES[0]);
  const [chosenVeg, setChosenVeg] = useState<string[]>([VEG_CHOICES[0], VEG_CHOICES[1]]);
  const [chosenExtras, setChosenExtras] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync initialCategory when it changes from summary page selection
  React.useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialConfiguringItem) {
      setConfiguringItem(initialConfiguringItem);
      setChosenStarch(STARCH_CHOICES[0]);
      setChosenVeg([VEG_CHOICES[0], VEG_CHOICES[1]]);
      setChosenExtras([]);
      setQuantity(1);
    }
  }, [initialConfiguringItem]);

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const openConfigurator = (item: MenuItem) => {
    setConfiguringItem(item);
    setChosenStarch(STARCH_CHOICES[0]);
    setChosenVeg([VEG_CHOICES[0], VEG_CHOICES[1]]);
    setChosenExtras([]);
    setQuantity(1);
  };

  const handleQuickAdd = (item: MenuItem) => {
    if (item.hasStarchChoice || item.category === 'kota' || item.category === 'breakfast') {
      openConfigurator(item);
    } else {
      const cartItem: CartItem = {
        cartId: `${item.id}-${Date.now()}`,
        item,
        quantity: 1,
        totalPrice: item.price,
      };
      onAddToCart(cartItem);
      showToast(`Added ${item.name} to takeaway bag!`);
    }
  };

  const handleConfirmCustomization = () => {
    if (!configuringItem) return;

    const extrasTotal = chosenExtras.reduce((sum, ext) => sum + ext.price, 0);
    const unitPrice = configuringItem.price + extrasTotal;
    const finalPrice = unitPrice * quantity;

    const cartItem: CartItem = {
      cartId: `${configuringItem.id}-${Date.now()}`,
      item: configuringItem,
      selectedStarch: configuringItem.hasStarchChoice ? chosenStarch : undefined,
      selectedVeg: configuringItem.hasVegChoice ? chosenVeg : undefined,
      selectedExtras: chosenExtras.length > 0 ? chosenExtras : undefined,
      quantity,
      totalPrice: finalPrice,
    };

    onAddToCart(cartItem);
    showToast(`Added ${quantity}x ${configuringItem.name} to takeaway bag!`);
    setConfiguringItem(null);
  };

  const toggleVeg = (veg: string) => {
    if (chosenVeg.includes(veg)) {
      if (chosenVeg.length > 1) {
        setChosenVeg(chosenVeg.filter((v) => v !== veg));
      }
    } else {
      if (chosenVeg.length < 2) {
        setChosenVeg([...chosenVeg, veg]);
      } else {
        // Replace second veg
        setChosenVeg([chosenVeg[0], veg]);
      }
    }
  };

  const toggleExtra = (extra: { name: string; price: number }) => {
    const exists = chosenExtras.some((e) => e.name === extra.name);
    if (exists) {
      setChosenExtras(chosenExtras.filter((e) => e.name !== extra.name));
    } else {
      setChosenExtras([...chosenExtras, extra]);
    }
  };

  return (
    <section id="menu-section" className="w-full max-w-4xl mx-auto px-4 py-8 relative">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#501012] text-[#fbf6ec] border-2 border-[#e5a84b] px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-[#e5a84b]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Navigation Breadcrumb: Back to Page 1 (Summary) */}
      {onBackToSummary && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            onClick={onBackToSummary}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#fffdf9] hover:bg-[#f7eedf] text-[#361a15] border border-[#cbbaa4] text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#8b1d20]" />
            <span>← Back to Menu Summary (Page 1)</span>
          </button>
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-[#8b1d20] uppercase tracking-wider font-condensed">
              Page 2 • Complete Menu
            </span>
            <p className="text-[11px] text-[#735041]">All 15+ dishes, starches & toppings</p>
          </div>
        </div>
      )}

      {/* Menu Header Board (Celebrating the Scottish Tartan Pattern & Logo Motif) */}
      <div className="relative rounded-t-2xl overflow-hidden border-2 border-b-0 border-[#d5c3aa] shadow-md bg-scottish-tartan p-1.5 sm:p-2">
        <div className="bg-[#2a1711] text-[#fcf7ee] rounded-xl p-4 sm:p-5 text-center border border-[#e5a84b]/40 shadow-inner relative">
          <h2 className="font-display text-2xl sm:text-4xl tracking-wider uppercase text-[#fffcf7] mb-1 drop-shadow-md">
            GRANNY'S KITCHEN
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1.5">
            <div className="inline-flex items-center gap-2 bg-black/45 px-3.5 py-1 rounded-full border border-white/10">
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                }`}
              />
              <p
                className={`font-condensed text-xs sm:text-sm tracking-widest uppercase font-bold ${
                  status.isOpen ? 'text-[#f5eedf]' : 'text-[#fca5a5]'
                }`}
              >
                {status.isOpen ? 'KITCHEN OPEN NOW (06:00 – 19:00)' : 'KITCHEN CLOSED (OPENS 06:00 AM)'}
              </p>
            </div>
            <span className="text-[11px] text-[#e8c89b] font-body bg-black/30 px-2.5 py-1 rounded-full hidden sm:inline border border-white/5">
              Fourways Mall BTC05 • {status.currentTimeStr}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="bg-[#f2e6d6] border-x-2 border-[#d5c3aa] p-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-condensed tracking-wide uppercase font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-scottish-tartan text-[#3a1314] border-2 border-[#8b1d20] shadow-sm font-black'
                  : 'text-[#42251a] hover:bg-[#e4d3bc] border border-transparent'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Main Menu Parchment Body */}
      <div className="bg-[#fffdf9] border-2 border-t-0 border-[#d5c3aa] rounded-b-2xl p-4 sm:p-7 shadow-lg">
        {/* Section Groups */}
        <div className="space-y-7">
          {/* Group 1: CHICKEN DUST */}
          {/* Group 1: CHICKEN DUST - Featured with Isolated Carved Plates */}
          {(activeCategory === 'all' || activeCategory === 'chicken_dust') && (
            <div className="border-2 border-[#8b1d20]/30 rounded-2xl overflow-hidden bg-[#fffdfa] shadow-md">
              <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3.5 py-1.5 rounded-xl border border-[#e5a84b]/60 shadow-sm">
                  <Flame className="w-4 h-4 text-[#e5a84b]" />
                  <span className="font-condensed tracking-wider uppercase text-sm sm:text-base font-extrabold text-[#fffcf7]">
                    CHICKEN DUST
                  </span>
                </div>
                <span className="text-xs text-[#3d2319] font-body font-bold bg-[#fffdfa]/95 px-3 py-1 rounded-lg border border-[#c4a683] hidden sm:inline shadow-2xs">
                  Flame seasoned & braai-spiced chicken quarters
                </span>
              </div>

              {/* 2 Featured Isolated Chicken Dust Plates */}
              <div className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-[#5c1c1e] uppercase tracking-widest bg-[#f7eedf] px-3.5 py-1 rounded-full border border-[#d8c4ad]">
                    Braai-Flame Seasoned • Hot Off The Grill
                  </span>
                  <p className="text-xs text-[#6e4e3f] mt-1.5 font-body">
                    Succulent quarter leg seasoned with Granny’s secret chicken dust rub, paired with your choice of gravy-drizzled pap or hot Aromat chips.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 max-w-3xl mx-auto">
                  {filteredItems
                    .filter((item) => item.category === 'chicken_dust')
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#faf4ea] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group relative"
                      >
                        {/* Popular Badge */}
                        {item.badge && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="text-[10px] font-bold text-[#541416] bg-[#fff8ee] border border-[#d8c3ad] px-2.5 py-0.5 rounded-full shadow-2xs uppercase tracking-wider font-condensed">
                              {item.badge}
                            </span>
                          </div>
                        )}

                        {/* Top: Isolated Carved Plate Image */}
                        <div className="w-full flex items-center justify-center py-2">
                          <div className="relative w-52 h-44 sm:w-60 sm:h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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
                                <Flame className="w-8 h-8 text-[#8b1d20]" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bottom: Description & Price Underneath Each Plate */}
                        <div className="mt-3 flex flex-col grow justify-between text-center pt-2 border-t border-[#e2d0ba]">
                          <div>
                            <h4 className="font-bold text-base sm:text-lg text-[#3e1416] font-body leading-snug">
                              {item.name}
                            </h4>

                            <div className="my-1.5">
                              <span className="font-mono tabular-nums text-2xl font-black text-[#69181a]">
                                R{item.price.toFixed(2)}
                              </span>
                            </div>

                            {item.description && (
                              <p className="text-xs sm:text-sm text-[#5f473b] mt-1 leading-relaxed px-1">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="mt-4 pt-2">
                            <button
                              onClick={() => handleQuickAdd(item)}
                              className="w-full py-2.5 px-4 bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border border-[#e5a84b]/40 rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 group-hover:brightness-105"
                            >
                              <Plus className="w-4 h-4 text-[#e5a84b]" />
                              <span>Add to Bag</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Group 2: SLOW-COOKED STEWS & CURRIES (Featured with Isolated Carved Plates) */}
          {(activeCategory === 'all' || activeCategory === 'stews') && (
            <div className="border-2 border-[#8b1d20]/30 rounded-2xl overflow-hidden bg-[#fffdfa] shadow-md">
              {/* Header */}
              <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3.5 py-1.5 rounded-xl border border-[#e5a84b]/60 shadow-sm">
                  <Utensils className="w-4 h-4 text-[#e5a84b]" />
                  <span className="font-condensed tracking-wider uppercase text-sm sm:text-base font-extrabold text-[#fffcf7]">
                    SLOW COOKED STEWS & CURRY
                  </span>
                </div>
                <span className="text-xs text-[#3d2319] font-body font-bold bg-[#fffdfa]/95 px-3 py-1 rounded-lg border border-[#c4a683] hidden sm:inline shadow-2xs">
                  Every plate includes 1 Starch + 2 Fresh Veggies
                </span>
              </div>

              {/* 3 Featured Isolated Plates Showcase */}
              <div className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-[#5c1c1e] uppercase tracking-widest bg-[#f7eedf] px-3.5 py-1 rounded-full border border-[#d8c4ad]">
                    Carved Fresh Daily • Real Homestyle Plates
                  </span>
                  <p className="text-xs text-[#6e4e3f] mt-1.5 font-body">
                    Cooked low and slow in Granny's heavy cast iron pots. Choose your starch and two fresh sides.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
                  {filteredItems
                    .filter((item) => item.category === 'stews')
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#faf4ea] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group relative"
                      >
                        {/* Popular / Chef Badge */}
                        {item.badge && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="text-[10px] font-bold text-[#541416] bg-[#fff8ee] border border-[#d8c3ad] px-2.5 py-0.5 rounded-full shadow-2xs uppercase tracking-wider font-condensed">
                              {item.badge}
                            </span>
                          </div>
                        )}

                        {/* Top: Isolated Carved Plate Image */}
                        <div className="w-full flex items-center justify-center py-2">
                          <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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

                        {/* Bottom: Description & Price Underneath Each Plate */}
                        <div className="mt-3 flex flex-col grow justify-between text-center pt-2 border-t border-[#e2d0ba]">
                          <div>
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <h4 className="font-bold text-base sm:text-lg text-[#3e1416] font-body leading-snug">
                                {item.name}
                              </h4>
                            </div>

                            <div className="my-1.5">
                              <span className="font-mono tabular-nums text-2xl font-black text-[#69181a]">
                                R{item.price.toFixed(2)}
                              </span>
                            </div>

                            {item.description && (
                              <p className="text-xs sm:text-sm text-[#5f473b] mt-1 leading-relaxed px-1">
                                {item.description}
                              </p>
                            )}

                            {/* Plate Content Hint */}
                            <p className="text-[11px] text-[#85604b] mt-2 font-medium bg-[#f0e4d2] py-1 px-2.5 rounded-md inline-block">
                              Choice of Pap, Dombolo Dumpling, Rice or Samp + 2 Veg
                            </p>
                          </div>

                          <div className="mt-4 pt-2">
                            <button
                              onClick={() => openConfigurator(item)}
                              className="w-full py-2.5 px-4 bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border border-[#e5a84b]/40 rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 group-hover:brightness-105"
                            >
                              <Plus className="w-4 h-4 text-[#e5a84b]" />
                              <span>Select Starches & Sides</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Group 3: CRISPY CHIPS & FISH (WITH AROMAT) - Featured with Isolated Carved Plates */}
          {(activeCategory === 'all' || activeCategory === 'chips') && (
            <div className="border-2 border-[#8b1d20]/30 rounded-2xl overflow-hidden bg-[#fffdfa] shadow-md">
              <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3.5 py-1.5 rounded-xl border border-[#e5a84b]/60 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#e5a84b]" />
                  <span className="font-condensed tracking-wider uppercase text-sm sm:text-base font-extrabold text-[#fffcf7]">
                    CRISPY CHIPS (WITH AROMAT) & GOLDEN FISH
                  </span>
                </div>
                <span className="text-xs text-[#3d2319] font-body font-bold bg-[#fffdfa]/95 px-3 py-1 rounded-lg border border-[#c4a683] hidden sm:inline shadow-2xs">
                  Hand-cut daily & tossed in authentic Aromat
                </span>
              </div>

              {/* 4 Featured Isolated Plates Showcase */}
              <div className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-[#5c1c1e] uppercase tracking-widest bg-[#f7eedf] px-3.5 py-1 rounded-full border border-[#d8c4ad]">
                    Hot From The Fryer • Dusted in South African Aromat
                  </span>
                  <p className="text-xs text-[#6e4e3f] mt-1.5 font-body">
                    Hand-cut golden chips, crispy edges, soft fluffy center, and freshly battered golden hake fillets.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                  {filteredItems
                    .filter((item) => item.category === 'chips')
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#faf4ea] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group relative"
                      >
                        {/* Badge if present */}
                        {item.badge && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="text-[10px] font-bold text-[#541416] bg-[#fff8ee] border border-[#d8c3ad] px-2 py-0.5 rounded-full shadow-2xs uppercase tracking-wider font-condensed">
                              {item.badge}
                            </span>
                          </div>
                        )}

                        {/* Top: Isolated Carved Plate Image */}
                        <div className="w-full flex items-center justify-center py-2">
                          <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            {/* Realistic soft radial shadow under the floating plate */}
                            <div className="absolute inset-3 rounded-full bg-black/20 blur-md -bottom-1 pointer-events-none transform scale-90" />
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_14px_rgba(40,15,10,0.28)] filter"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-[#e8dac7] flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-[#8b1d20]" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bottom: Description & Price Underneath Each Plate */}
                        <div className="mt-2 flex flex-col grow justify-between text-center pt-2 border-t border-[#e2d0ba]">
                          <div>
                            <h4 className="font-bold text-sm sm:text-base text-[#3e1416] font-body leading-snug">
                              {item.name}
                            </h4>

                            <div className="my-1.5">
                              <span className="font-mono tabular-nums text-xl sm:text-2xl font-black text-[#69181a]">
                                R{item.price.toFixed(2)}
                              </span>
                            </div>

                            {item.description && (
                              <p className="text-xs text-[#5f473b] mt-1 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="mt-3.5 pt-2">
                            <button
                              onClick={() => handleQuickAdd(item)}
                              className="w-full py-2 px-3 bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border border-[#e5a84b]/40 rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 group-hover:brightness-105"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#e5a84b]" />
                              <span>Add to Bag</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Group 4: SUPREME KOTA - Featured with Isolated Carved Plates */}
          {(activeCategory === 'all' || activeCategory === 'kota') && (
            <div className="border-2 border-[#8b1d20]/30 rounded-2xl overflow-hidden bg-[#fffdfa] shadow-md">
              <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3.5 py-1.5 rounded-xl border border-[#e5a84b]/60 shadow-sm">
                  <Utensils className="w-4 h-4 text-[#e5a84b]" />
                  <span className="font-condensed tracking-wider uppercase text-sm sm:text-base font-extrabold text-[#fffcf7]">
                    SUPREME KOTA
                  </span>
                </div>
                <span className="text-xs text-[#3d2319] font-body font-bold bg-[#fffdfa]/95 px-3 py-1 rounded-lg border border-[#c4a683] hidden sm:inline shadow-2xs">
                  Taxi Rank Legendary Quarter Loaf
                </span>
              </div>

              {/* 2 Featured Isolated Kota Plates Showcase */}
              <div className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-[#5c1c1e] uppercase tracking-widest bg-[#f7eedf] px-3.5 py-1 rounded-full border border-[#d8c4ad]">
                    Stacked High & Freshly Toasted
                  </span>
                  <p className="text-xs text-[#6e4e3f] mt-1.5 font-body">
                    Hollowed fresh quarter loaf, packed with hot Aromat chips, melted cheese, egg, savoury fillings and Granny’s spicy mango atchar.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 max-w-3xl mx-auto">
                  {filteredItems
                    .filter((item) => item.category === 'kota')
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#faf4ea] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group relative"
                      >
                        {/* Popular / Commuter Badge */}
                        {item.badge && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="text-[10px] font-bold text-[#541416] bg-[#fff8ee] border border-[#d8c3ad] px-2.5 py-0.5 rounded-full shadow-2xs uppercase tracking-wider font-condensed">
                              {item.badge}
                            </span>
                          </div>
                        )}

                        {/* Top: Isolated Carved Plate Image */}
                        <div className="w-full flex items-center justify-center py-2">
                          <div className="relative w-56 h-44 sm:w-64 sm:h-52 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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

                        {/* Bottom: Description & Price Underneath Each Plate */}
                        <div className="mt-3 flex flex-col grow justify-between text-center pt-2 border-t border-[#e2d0ba]">
                          <div>
                            <h4 className="font-bold text-base sm:text-lg text-[#3e1416] font-body leading-snug">
                              {item.name}
                            </h4>

                            <div className="my-1.5">
                              <span className="font-mono tabular-nums text-2xl font-black text-[#69181a]">
                                R{item.price.toFixed(2)}
                              </span>
                            </div>

                            {item.description && (
                              <p className="text-xs sm:text-sm text-[#5f473b] mt-1 leading-relaxed px-1">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="mt-4 pt-2">
                            <button
                              onClick={() => openConfigurator(item)}
                              className="w-full py-2.5 px-4 bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border border-[#e5a84b]/40 rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 group-hover:brightness-105"
                            >
                              <Plus className="w-4 h-4 text-[#e5a84b]" />
                              <span>Customize & Add Extras</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Kota Add-on extras legend as shown on reference menu */}
                <div className="bg-[#f5ecde] border border-[#d8c5af] p-3.5 rounded-xl text-xs text-[#63483b] mt-6 max-w-3xl mx-auto">
                  <span className="font-bold text-[#520d0f] block mb-1.5 uppercase tracking-wide">
                    Available Kota Extras upon request:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {KOTA_EXTRAS.map((ex) => (
                      <span key={ex.id} className="bg-white border border-[#ded0bf] px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                        {ex.name} (+R{ex.price.toFixed(2)})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Group 5: BREAKFAST & AMAGWINYA - Featured with Isolated Carved Plate */}
          {(activeCategory === 'all' || activeCategory === 'breakfast') && (
            <div className="border-2 border-[#8b1d20]/30 rounded-2xl overflow-hidden bg-[#fffdfa] shadow-md">
              <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3.5 py-1.5 rounded-xl border border-[#e5a84b]/60 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#e5a84b]" />
                  <span className="font-condensed tracking-wider uppercase text-sm sm:text-base font-extrabold text-[#fffcf7]">
                    BREAKFAST & FRESH AMAGWINYA
                  </span>
                </div>
                <span className="text-xs text-[#3d2319] font-body font-bold bg-[#fffdfa]/95 px-3 py-1 rounded-lg border border-[#c4a683] hidden sm:inline shadow-2xs">
                  Fried golden & hot from 06:00 AM daily
                </span>
              </div>

              <div className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-[#5c1c1e] uppercase tracking-widest bg-[#f7eedf] px-3.5 py-1 rounded-full border border-[#d8c4ad]">
                    Hot Off The Pot • Golden Puffed Vetkoek
                  </span>
                  <p className="text-xs text-[#6e4e3f] mt-1.5 font-body">
                    Piping hot golden amagwinya, crisp exterior, pillowy soft interior. Enjoy plain or loaded with your favorite toppings.
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  {filteredItems
                    .filter((item) => item.category === 'breakfast')
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#faf4ea] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group relative"
                      >
                        {/* Badge */}
                        {item.badge && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="text-[10px] font-bold text-[#541416] bg-[#fff8ee] border border-[#d8c3ad] px-2.5 py-0.5 rounded-full shadow-2xs uppercase tracking-wider font-condensed">
                              {item.badge}
                            </span>
                          </div>
                        )}

                        {/* Top: Isolated Carved Plate Image */}
                        <div className="w-full flex items-center justify-center py-2">
                          <div className="relative w-56 h-44 sm:w-64 sm:h-52 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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
                                <Sparkles className="w-8 h-8 text-[#8b1d20]" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bottom: Description & Price Underneath Plate */}
                        <div className="mt-3 flex flex-col grow justify-between text-center pt-2 border-t border-[#e2d0ba]">
                          <div>
                            <h4 className="font-bold text-base sm:text-lg text-[#3e1416] font-body leading-snug">
                              {item.name}
                            </h4>

                            <div className="my-1.5 flex items-center justify-center gap-2">
                              <span className="text-xs uppercase font-condensed tracking-wider text-[#735041] font-bold">
                                Starting at
                              </span>
                              <span className="font-mono tabular-nums text-2xl font-black text-[#69181a]">
                                R{item.price.toFixed(2)}
                              </span>
                              <span className="text-xs text-[#735041] font-body">each</span>
                            </div>

                            {item.description && (
                              <p className="text-xs sm:text-sm text-[#5f473b] mt-1 leading-relaxed px-1">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="mt-4 pt-2">
                            <button
                              onClick={() => openConfigurator(item)}
                              className="w-full py-2.5 px-4 bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border border-[#e5a84b]/40 rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 group-hover:brightness-105"
                            >
                              <Plus className="w-4 h-4 text-[#e5a84b]" />
                              <span>Customize Toppings & Order</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Amagwinya Toppings as listed in user reference menu */}
                <div className="bg-[#f5ecde] border border-[#d8c5af] p-3.5 rounded-xl text-xs text-[#63483b] mt-6 max-w-md mx-auto">
                  <span className="font-bold text-[#520d0f] block mb-1.5 uppercase tracking-wide">
                    Add Magwinya Toppings:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {AMAGWINYA_TOPPINGS.map((top) => (
                      <span key={top.id} className="bg-white border border-[#ded0bf] px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                        {top.name} (+R{top.price.toFixed(2)})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Group 6: FRESH SALADS - Featured with 2 Isolated Carved Ceramic Bowls */}
          {(activeCategory === 'all' || activeCategory === 'salads') && (
            <div className="border-2 border-[#8b1d20]/30 rounded-2xl overflow-hidden bg-[#fffdfa] shadow-md">
              <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3.5 py-1.5 rounded-xl border border-[#e5a84b]/60 shadow-sm">
                  <Utensils className="w-4 h-4 text-[#e5a84b]" />
                  <span className="font-condensed tracking-wider uppercase text-sm sm:text-base font-extrabold text-[#fffcf7]">
                    FRESH HOMESTYLE SALADS
                  </span>
                </div>
                <span className="text-xs text-[#3d2319] font-body font-bold bg-[#fffdfa]/95 px-3 py-1 rounded-lg border border-[#c4a683] hidden sm:inline shadow-2xs">
                  Hand-tossed daily in authentic ceramic bowls
                </span>
              </div>

              {/* 2 Featured Isolated Salad Bowls Showcase */}
              <div className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-[#5c1c1e] uppercase tracking-widest bg-[#f7eedf] px-3.5 py-1 rounded-full border border-[#d8c4ad]">
                    Chilled & Crispy • Real Ceramic Bowls
                  </span>
                  <p className="text-xs text-[#6e4e3f] mt-1.5 font-body">
                    Prepared fresh each morning to accompany your warm stews, chicken dust, and hot chips.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 max-w-3xl mx-auto">
                  {filteredItems
                    .filter((item) => item.category === 'salads')
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#faf4ea] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group relative"
                      >
                        {/* Badge */}
                        {item.badge && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="text-[10px] font-bold text-[#541416] bg-[#fff8ee] border border-[#d8c3ad] px-2.5 py-0.5 rounded-full shadow-2xs uppercase tracking-wider font-condensed">
                              {item.badge}
                            </span>
                          </div>
                        )}

                        {/* Top: Isolated Carved Bowl Image */}
                        <div className="w-full flex items-center justify-center py-2">
                          <div className="relative w-52 h-44 sm:w-60 sm:h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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

                        {/* Bottom: Description & Price Underneath Each Bowl */}
                        <div className="mt-3 flex flex-col grow justify-between text-center pt-2 border-t border-[#e2d0ba]">
                          <div>
                            <h4 className="font-bold text-base sm:text-lg text-[#3e1416] font-body leading-snug">
                              {item.name}
                            </h4>

                            <div className="my-1.5">
                              <span className="font-mono tabular-nums text-2xl font-black text-[#69181a]">
                                R{item.price.toFixed(2)}
                              </span>
                            </div>

                            {item.description && (
                              <p className="text-xs sm:text-sm text-[#5f473b] mt-1 leading-relaxed px-1">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="mt-4 pt-2">
                            <button
                              onClick={() => handleQuickAdd(item)}
                              className="w-full py-2.5 px-4 bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border border-[#e5a84b]/40 rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 group-hover:brightness-105"
                            >
                              <Plus className="w-4 h-4 text-[#e5a84b]" />
                              <span>Add to Bag</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Menu Footer Lockup Styled with Scottish Tartan Ribbon */}
        <div className="mt-8 pt-5 border-t-2 border-dashed border-[#c9b49b] text-center">
          <div className="relative rounded-xl p-1 bg-scottish-tartan shadow-md max-w-xl mx-auto border border-[#8b1d20]/40">
            <div className="bg-[#2a1711] text-[#f7eedf] py-2.5 px-4 rounded-lg font-condensed text-sm sm:text-base tracking-widest uppercase font-bold border border-[#e5a84b]/40">
              GRANNY'S KITCHEN • THANK YOU, COME AGAIN!
            </div>
          </div>
          <p className="text-xs text-[#7d5e4f] mt-2 font-editorial italic">
            Prepared fresh daily at Fourways Mall, BTC05 Taxi Terminal. Home cooked with love!
          </p>
        </div>
      </div>

      {/* Item Customizer Modal (For choosing Starch, Veg, and Extras) */}
      {configuringItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#fffcf7] border-2 border-[#8b1d20]/50 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative">
            {/* Top Tartan Accent */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-scottish-tartan rounded-t-xl" />

            {/* Top Image if meal has an isolated plate */}
            {configuringItem.image && (
              <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-2 flex items-center justify-center">
                <img
                  src={configuringItem.image}
                  alt={configuringItem.name}
                  className="w-full h-full object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.3)] filter"
                />
              </div>
            )}

            <h3 className="font-display text-xl sm:text-2xl text-[#361a15] uppercase mb-1 text-center">
              {configuringItem.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#6c4e40] mb-4 text-center">
              {configuringItem.description}
            </p>

            {/* Starch Choice (if meal includes starch) */}
            {configuringItem.hasStarchChoice && (
              <div className="mb-5 bg-[#f8f1e6] p-3.5 rounded-xl border border-[#decbb7]">
                <label className="block text-xs font-bold text-[#520d0f] uppercase tracking-wider mb-2">
                  1. Pick Your Starch (Included):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STARCH_CHOICES.map((starch) => (
                    <button
                      key={starch}
                      onClick={() => setChosenStarch(starch)}
                      className={`p-2.5 rounded-lg text-xs font-semibold text-left transition-all border cursor-pointer ${
                        chosenStarch === starch
                          ? 'bg-[#301c15] text-white border-[#e5a84b]/60 shadow-xs'
                          : 'bg-white text-[#3d241c] border-[#d5c2ad] hover:bg-[#faebd7]'
                      }`}
                    >
                      {starch}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2 Veg Choice (if meal includes veg) */}
            {configuringItem.hasVegChoice && (
              <div className="mb-5 bg-[#f8f1e6] p-3.5 rounded-xl border border-[#decbb7]">
                <label className="block text-xs font-bold text-[#520d0f] uppercase tracking-wider mb-1">
                  2. Pick Any 2 Veggies (Included):
                </label>
                <p className="text-[11px] text-[#735242] mb-2">
                  Selected: {chosenVeg.join(', ') || 'None selected'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {VEG_CHOICES.map((veg) => {
                    const isSelected = chosenVeg.includes(veg);
                    return (
                      <button
                        key={veg}
                        onClick={() => toggleVeg(veg)}
                        className={`p-2 rounded-lg text-xs font-medium text-left transition-all border flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#301c15] text-white border-[#e5a84b]/60'
                            : 'bg-white text-[#3d241c] border-[#d5c2ad] hover:bg-[#faebd7]'
                        }`}
                      >
                        <span>{veg}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#e5a84b]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extras for Kota */}
            {configuringItem.category === 'kota' && (
              <div className="mb-5 bg-[#f8f1e6] p-3.5 rounded-xl border border-[#decbb7]">
                <label className="block text-xs font-bold text-[#520d0f] uppercase tracking-wider mb-2">
                  Add Extras to your Kota:
                </label>
                <div className="space-y-2">
                  {KOTA_EXTRAS.map((extra) => {
                    const isSelected = chosenExtras.some((e) => e.name === extra.name);
                    return (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra)}
                        className={`w-full p-2.5 rounded-lg text-xs font-medium transition-all border flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#301c15] text-white border-[#e5a84b]/60'
                            : 'bg-white text-[#3d241c] border-[#d5c2ad] hover:bg-[#faebd7]'
                        }`}
                      >
                        <span>{extra.name}</span>
                        <span className="font-mono font-bold">+R{extra.price.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Toppings for Amagwinya */}
            {configuringItem.category === 'breakfast' && (
              <div className="mb-5 bg-[#f8f1e6] p-3.5 rounded-xl border border-[#decbb7]">
                <label className="block text-xs font-bold text-[#520d0f] uppercase tracking-wider mb-2">
                  Add Toppings for Amagwinya:
                </label>
                <div className="space-y-2">
                  {AMAGWINYA_TOPPINGS.map((top) => {
                    const isSelected = chosenExtras.some((e) => e.name === top.name);
                    return (
                      <button
                        key={top.id}
                        onClick={() => toggleExtra(top)}
                        className={`w-full p-2.5 rounded-lg text-xs font-medium transition-all border flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#301c15] text-white border-[#e5a84b]/60'
                            : 'bg-white text-[#3d241c] border-[#d5c2ad] hover:bg-[#faebd7]'
                        }`}
                      >
                        <span>{top.name}</span>
                        <span className="font-mono font-bold">+R{top.price.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between py-3 border-t border-[#e2d2be] mb-4">
              <span className="text-xs font-bold text-[#520d0f] uppercase tracking-wider">
                Quantity:
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-[#f0e4d2] text-[#520d0f] font-bold text-base flex items-center justify-center hover:bg-[#e4d3bc] cursor-pointer"
                >
                  -
                </button>
                <span className="font-mono font-bold text-lg text-[#3a1214]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-[#f0e4d2] text-[#520d0f] font-bold text-base flex items-center justify-center hover:bg-[#e4d3bc] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setConfiguringItem(null)}
                className="w-1/3 py-2.5 rounded-xl border border-[#cbb396] text-[#520d0f] font-bold text-xs uppercase tracking-wider hover:bg-[#f3e7d6] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCustomization}
                className="w-2/3 py-2.5 rounded-xl bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border border-[#e5a84b]/50 font-condensed tracking-wider text-base uppercase font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Add to Bag (R{((configuringItem.price + chosenExtras.reduce((s, e) => s + e.price, 0)) * quantity).toFixed(2)})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
