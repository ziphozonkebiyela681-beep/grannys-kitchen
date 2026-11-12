import React, { useState } from 'react';
import { GrannyExactHeader } from './components/GrannyExactHeader';
import { BrickWallCurtain } from './components/BrickWallCurtain';
import { MenuSection, CartItem } from './components/MenuSection';
import { HomePage } from './components/HomePage';
import { CornerNavigation, AppPage } from './components/CornerNavigation';
import { TakeawayBagModal } from './components/TakeawayBagModal';
import { LocationGuide } from './components/LocationGuide';
import { HomelyAtmosphere } from './components/HomelyAtmosphere';
import { ServiceWithLovePage } from './components/ServiceWithLovePage';
import { RestaurantTourSection } from './components/RestaurantTourSection';
import {
  ShoppingBag,
  Check,
  Instagram,
  Phone,
} from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const handleAddToCartWithToast = (item: CartItem) => {
    handleAddToCart(item);
    showToast(`Added ${item.item.name} to order bag!`);
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

  const scrollToSection = () => {
    const el = document.getElementById('main-content-area');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    scrollToSection();
  };

  return (
    <div className="min-h-screen bg-cream-panel text-[#2c1810] font-body relative overflow-x-hidden">
      {/* 1. SLIDING BRICK CURTAIN REVEAL SYSTEM:
          When the website first loads, the brick walls are joined covering the screen,
          then slide smoothly open to the sides with dramatic anticipation revealing the website! */}
      <BrickWallCurtain>
        <div className="relative w-full min-h-screen bg-cream-panel">
          {/* Main Content Area - Full-Width Expansive Display with zero gaps on the sides */}
          <main className="w-full min-h-screen bg-cream-panel relative pb-16">
            {/* Subtle warm lighting vignette over the cream panel */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#f3e9d8]/30 to-[#e4d4bd]/40 pointer-events-none" />

            <div className="relative z-10 w-full">
              {/* Header with authentic Tartan and Logo */}
              <GrannyExactHeader onOrderClick={() => setIsBagOpen(true)} />

              {/* Toast Feedback for Quick Adds */}
              {toastMessage && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#501012] text-[#fbf6ec] border-2 border-[#e5a84b] px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
                  <Check className="w-4 h-4 text-[#e5a84b]" />
                  <span>{toastMessage}</span>
                </div>
              )}

              {/* Small Corner Column & Streamlined Navigation:
                  - Fixed corner directory column in top-right corner on desktop
                  - Expandable corner button on mobile/tablet
                  - Sleek top pill navigation for instant access to:
                    Home | Our Story | Full Menu | Granny's Team | Inside Tour */}
              <CornerNavigation
                currentPage={currentPage}
                onNavigate={handleNavigate}
                cartCount={totalItemsCount}
                cartTotal={totalCartAmount}
                onOpenCart={() => setIsBagOpen(true)}
              />

              {/* ACTIVE PAGE CONTENT */}
              <div id="main-content-area" className="mt-4 sm:mt-6">
                {currentPage === 'home' && (
                  <HomePage
                    onAddToCart={handleAddToCartWithToast}
                    onOpenCart={() => setIsBagOpen(true)}
                    cartCount={totalItemsCount}
                  />
                )}

                {currentPage === 'story' && (
                  <HomelyAtmosphere
                    onOpenOrder={() => setIsBagOpen(true)}
                  />
                )}

                {currentPage === 'full-menu' && (
                  <MenuSection
                    onAddToCart={handleAddToCart}
                    cartCount={totalItemsCount}
                    onOpenCart={() => setIsBagOpen(true)}
                  />
                )}

                {currentPage === 'team' && (
                  <ServiceWithLovePage
                    onOpenOrder={() => setIsBagOpen(true)}
                  />
                )}

                {currentPage === 'tour' && (
                  <RestaurantTourSection
                    onOpenOrder={() => setIsBagOpen(true)}
                  />
                )}
              </div>

              {/* Fourways Mall BTC05 Taxi Terminal Guide */}
              <LocationGuide />

              {/* Footer with warm signoff, Desk Number & Instagram */}
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
                <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-[#8b1d20] mt-3">
                  <a
                    href="tel:0723147152"
                    className="cursor-pointer inline-flex items-center gap-1.5 bg-[#2d1b16] text-[#fad194] border border-[#e5a84b]/50 px-3.5 py-1.5 rounded-full shadow-xs hover:bg-[#422820] active:scale-95 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#e5a84b]" />
                    <span>Order Desk: 072 314 7152</span>
                  </a>
                  <a
                    href="https://www.instagram.com/granny_kitchen_fourways"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer inline-flex items-center gap-1.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-3.5 py-1.5 rounded-full shadow-xs hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5 text-white" />
                    <span>granny's_kitchen_fourways</span>
                  </a>
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
