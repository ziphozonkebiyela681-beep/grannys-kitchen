import React, { useState } from 'react';
import { GrannyExactHeader } from './components/GrannyExactHeader';
import { BrickWallCurtain } from './components/BrickWallCurtain';
import { MenuSection, CartItem } from './components/MenuSection';
import { MenuSummaryPage } from './components/MenuSummaryPage';
import { MenuItem } from './data/menuData';
import { TakeawayBagModal } from './components/TakeawayBagModal';
import { LocationGuide } from './components/LocationGuide';
import { HomelyAtmosphere } from './components/HomelyAtmosphere';
import {
  ShoppingBag,
  ArrowDown,
  MapPin,
  Clock,
  Phone,
  Utensils,
  BookOpen,
  Sparkles,
  Check,
  Heart,
} from 'lucide-react';
import { useRestaurantStatus } from './utils/operatingHours';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'summary' | 'full-menu' | 'story'>('summary');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [configuringItem, setConfiguringItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const status = useRestaurantStatus();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const handleAddToCartWithToast = (item: CartItem) => {
    handleAddToCart(item);
    showToast(`Added ${item.item.name} to takeaway bag!`);
  };

  const handleUpdateQuantity = (cartId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          const unitPrice = item.totalPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            totalPrice: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGoToFullMenu = (categoryId?: string) => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    } else {
      setSelectedCategory('all');
    }
    setConfiguringItem(null);
    setCurrentPage('full-menu');
    scrollToMenu();
  };

  const handleOpenConfigurator = (item: MenuItem) => {
    setSelectedCategory(item.category);
    setConfiguringItem(item);
    setCurrentPage('full-menu');
    scrollToMenu();
  };

  const handleBackToSummary = () => {
    setConfiguringItem(null);
    setCurrentPage('summary');
    scrollToMenu();
  };

  const handleGoToStory = () => {
    setConfiguringItem(null);
    setCurrentPage('story');
    scrollToMenu();
  };

  return (
    <div className="min-h-screen bg-[#1c1d20] text-[#2c1810] font-body relative overflow-x-hidden">
      {/* 1. SLIDING BRICK CURTAIN REVEAL SYSTEM:
          When the website first loads, the grey brick walls are joined covering the screen,
          then slide smoothly open to the sides revealing the exact checked banner, logo and menu! */}
      <BrickWallCurtain>
        <div className="relative w-full min-h-screen flex justify-center bg-[#151210]">
          {/* Main Content Area - Generous Full Space Screen Display without narrow side walls */}
          <main className="w-full max-w-5xl lg:max-w-6xl min-h-screen bg-cream-panel relative shadow-2xl border-x-2 border-[#3e1b1c]/20 pb-16 mx-auto">
            {/* Subtle warm lighting vignette over the cream panel */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#f3e9d8]/30 to-[#e4d4bd]/50 pointer-events-none" />

            <div className="relative z-10">
              {/* 3. EXACT Checked Clothy Pattern & EXACT Logo Text Header */}
              <GrannyExactHeader onOrderClick={() => setIsBagOpen(true)} />

              {/* Toast Feedback for Quick Adds on Page 1 */}
              {toastMessage && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#501012] text-[#fbf6ec] border-2 border-[#e5a84b] px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
                  <Check className="w-4 h-4 text-[#e5a84b]" />
                  <span>{toastMessage}</span>
                </div>
              )}

              {/* Quick Action Navigation bar */}
              <div className="max-w-3xl mx-auto px-4 mt-6 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span
                    className={`w-2.5 h-2.5 rounded-full inline-block ${
                      status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <span className={status.isOpen ? 'text-[#361a15]' : 'text-[#7d3232]'}>
                    {status.isOpen ? 'Kitchen Open • Pots Simmering' : 'Kitchen Closed • Opens 06:00 AM'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGoToStory}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer ${
                      currentPage === 'story'
                        ? 'bg-[#8b1d20] text-white border border-[#e5a84b]/60'
                        : 'bg-[#fffdf9] hover:bg-[#f7eedf] text-[#361a15] border border-[#cbbaa4]'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 text-[#e5a84b] fill-[#e5a84b]" />
                    <span>Our Story</span>
                  </button>

                  <button
                    onClick={currentPage === 'summary' ? () => handleGoToFullMenu() : handleBackToSummary}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2d1b16] hover:bg-[#422820] text-[#fffdfa] border border-[#e5a84b]/50 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    <Utensils className="w-3.5 h-3.5 text-[#e5a84b]" />
                    <span>
                      {currentPage === 'summary'
                        ? 'View Full Menu'
                        : currentPage === 'full-menu'
                        ? 'View Highlights'
                        : 'View Menu & Order'}
                    </span>
                    <ArrowDown className="w-3.5 h-3.5 text-[#e5a84b] animate-bounce" />
                  </button>
                </div>
              </div>

              {/* 4. THE THREE-PAGE NAVIGATION SWITCHER (Page 1: Summary, Page 2: Complete Menu, Page 3: Our Story) */}
              <div className="max-w-3xl mx-auto px-4 mt-6">
                <div className="bg-[#ebdccb] p-1.5 rounded-2xl border-2 border-[#8b1d20]/40 shadow-md">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                    {/* PAGE 1: MENU SUMMARY */}
                    <button
                      onClick={() => handleBackToSummary()}
                      className={`relative py-3 px-3 sm:px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center sm:justify-start gap-2.5 text-center sm:text-left ${
                        currentPage === 'summary'
                          ? 'bg-scottish-tartan text-[#2e1315] border-2 border-[#8b1d20] shadow-md ring-2 ring-[#e5a84b]/50'
                          : 'bg-[#fffdf9]/70 hover:bg-[#fffdf9] text-[#553b30] border border-transparent'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          currentPage === 'summary'
                            ? 'bg-[#2b1812] text-[#e5a84b]'
                            : 'bg-[#e2d0be] text-[#553b30]'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                          <span className="font-condensed font-extrabold uppercase text-xs sm:text-sm tracking-wider truncate">
                            Page 1: Summary
                          </span>
                          {currentPage === 'summary' && (
                            <span className="text-[9px] font-bold bg-[#2b1812] text-[#fad194] px-1 py-0.2 rounded shrink-0">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#6d4d3d] font-body font-medium leading-tight truncate">
                          1 Hero Dish per Category
                        </p>
                      </div>
                    </button>

                    {/* PAGE 2: COMPLETE MENU */}
                    <button
                      onClick={() => handleGoToFullMenu()}
                      className={`relative py-3 px-3 sm:px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center sm:justify-start gap-2.5 text-center sm:text-left ${
                        currentPage === 'full-menu'
                          ? 'bg-scottish-tartan text-[#2e1315] border-2 border-[#8b1d20] shadow-md ring-2 ring-[#e5a84b]/50'
                          : 'bg-[#fffdf9]/70 hover:bg-[#fffdf9] text-[#553b30] border border-transparent'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          currentPage === 'full-menu'
                            ? 'bg-[#2b1812] text-[#e5a84b]'
                            : 'bg-[#e2d0be] text-[#553b30]'
                        }`}
                      >
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                          <span className="font-condensed font-extrabold uppercase text-xs sm:text-sm tracking-wider truncate">
                            Page 2: Full Menu
                          </span>
                          {currentPage === 'full-menu' && (
                            <span className="text-[9px] font-bold bg-[#2b1812] text-[#fad194] px-1 py-0.2 rounded shrink-0">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#6d4d3d] font-body font-medium leading-tight truncate">
                          All 15+ Dishes & Toppings
                        </p>
                      </div>
                    </button>

                    {/* PAGE 3: OUR STORY */}
                    <button
                      onClick={handleGoToStory}
                      className={`relative py-3 px-3 sm:px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center sm:justify-start gap-2.5 text-center sm:text-left ${
                        currentPage === 'story'
                          ? 'bg-scottish-tartan text-[#2e1315] border-2 border-[#8b1d20] shadow-md ring-2 ring-[#e5a84b]/50'
                          : 'bg-[#fffdf9]/70 hover:bg-[#fffdf9] text-[#553b30] border border-transparent'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          currentPage === 'story'
                            ? 'bg-[#2b1812] text-[#e5a84b]'
                            : 'bg-[#e2d0be] text-[#553b30]'
                        }`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                          <span className="font-condensed font-extrabold uppercase text-xs sm:text-sm tracking-wider truncate">
                            Our Story
                          </span>
                          {currentPage === 'story' && (
                            <span className="text-[9px] font-bold bg-[#2b1812] text-[#fad194] px-1 py-0.2 rounded shrink-0">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#6d4d3d] font-body font-medium leading-tight truncate">
                          Since 1997 • Mam Nomsa
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. ACTIVE PAGE CONTENT (Page 1 Summary, Page 2 Full Menu, or Page 3 Dedicated Story) */}
              <div id="menu-section" className="mt-6">
                {currentPage === 'summary' && (
                  <div className="px-4">
                    <MenuSummaryPage
                      onGoToFullMenu={handleGoToFullMenu}
                      onAddToCart={handleAddToCartWithToast}
                      onOpenConfigurator={handleOpenConfigurator}
                      onOpenCart={() => setIsBagOpen(true)}
                      cartCount={totalItemsCount}
                    />
                  </div>
                )}

                {currentPage === 'full-menu' && (
                  <MenuSection
                    onAddToCart={handleAddToCart}
                    cartCount={totalItemsCount}
                    onOpenCart={() => setIsBagOpen(true)}
                    initialCategory={selectedCategory}
                    onBackToSummary={handleBackToSummary}
                    initialConfiguringItem={configuringItem}
                  />
                )}

                {currentPage === 'story' && (
                  <HomelyAtmosphere
                    onGoToSummary={handleBackToSummary}
                    onGoToFullMenu={() => handleGoToFullMenu()}
                    onOpenOrder={() => setIsBagOpen(true)}
                  />
                )}
              </div>

              {/* 6. Fourways Mall BTC05 Taxi Terminal Guide */}
              <LocationGuide />

              {/* 7. Footer with warm signoff */}
              <footer className="mt-8 pt-8 pb-12 border-t-2 border-[#decbb7] text-center px-4">
                <div className="w-full max-w-md mx-auto h-2 bg-scottish-tartan rounded-full mb-5 opacity-90" />
                <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-display text-[#361a15] tracking-wide uppercase">
                  <span>Granny's Kitchen</span>
                  <span>•</span>
                  <span>Fourways Mall BTC05 Taxi Terminal</span>
                </div>
                <p className="text-xs text-[#75594b] mt-1 font-body">
                  Authentic South African Home-Cooked Food • Slow pots, hearty kotas, crispy Aromat chips, fresh salads, and warm hospitality.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#8b1d20] mt-2.5">
                  <button
                    onClick={handleGoToStory}
                    className="hover:underline cursor-pointer inline-flex items-center gap-1.5 bg-[#fbf5ea] px-3 py-1 rounded-full border border-[#d8c3ad]"
                  >
                    <Heart className="w-3 h-3 text-[#e5a84b] fill-[#e5a84b]" />
                    <span>Our Story: Since 1997 • Mam Nomsa "Granny" Moeketsi</span>
                  </button>
                </div>
                <div className="flex items-center justify-center gap-4 text-xs font-semibold text-[#663b28] mt-3">
                  <span>Mon–Sat: 06:00 – 19:00</span>
                  <span>•</span>
                  <span>Sun: 08:00 – 17:00</span>
                </div>
                <p className="text-[11px] text-[#937768] mt-3">
                  &copy; {new Date().getFullYear()} Granny's Kitchen. All rights reserved.
                </p>
              </footer>
            </div>
          </main>
        </div>
      </BrickWallCurtain>

      {/* Floating Takeaway Bag Trigger Button Styled with Scottish Tartan Ribbon */}
      {totalItemsCount > 0 && (
        <button
          onClick={() => setIsBagOpen(true)}
          className="fixed bottom-5 left-5 z-40 p-1 bg-scottish-tartan rounded-full shadow-2xl border-2 border-[#8b1d20]/50 transition-all active:scale-95 cursor-pointer animate-pulse"
          title="Open Takeaway Bag"
        >
          <div className="bg-[#2d1b16] text-white px-4 py-2.5 rounded-full flex items-center gap-2.5 border border-[#e5a84b]/40">
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#e5a84b]" />
              <span className="absolute -top-2 -right-2 bg-[#e5a84b] text-[#2d1b16] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItemsCount}
              </span>
            </div>
            <div className="text-left font-condensed tracking-wider">
              <span className="text-xs block leading-tight font-extrabold text-[#fffcf7]">BAG (R{totalCartAmount.toFixed(2)})</span>
              <span className="text-[10px] text-[#fad194] block uppercase leading-none font-semibold">Tap to order</span>
            </div>
          </div>
        </button>
      )}

      {/* Takeaway Order Modal */}
      <TakeawayBagModal
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
