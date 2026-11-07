import React, { useState } from 'react';
import { GrannyExactHeader } from './components/GrannyExactHeader';
import { BrickWallCurtain } from './components/BrickWallCurtain';
import { MenuSection, CartItem } from './components/MenuSection';
import { TakeawayBagModal } from './components/TakeawayBagModal';
import { LocationGuide } from './components/LocationGuide';
import { HomelyAtmosphere } from './components/HomelyAtmosphere';
import { ShoppingBag, ArrowDown, MapPin, Clock, Phone, Utensils } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
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

  return (
    <div className="min-h-screen bg-[#1c1d20] text-[#2c1810] font-body relative overflow-x-hidden">
      {/* 1. SLIDING BRICK CURTAIN REVEAL SYSTEM:
          When the website first loads, the grey brick walls are joined covering the screen,
          then slide smoothly open to the sides revealing the exact checked banner, logo and menu! */}
      <BrickWallCurtain>
        <div className="relative w-full min-h-screen flex justify-center bg-[#1c1d20]">
          {/* Left Brick Wall Flank on Desktop (Loyal to the exact brick setup in the image) */}
          <div
            className="hidden xl:block w-[18vw] min-h-screen shrink-0 border-r-2 border-black/30 pointer-events-none sticky top-0 h-screen"
            style={{
              backgroundImage: "url('/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.31.53_PM_215f9de8.jpg')",
              backgroundPosition: 'left center',
              backgroundSize: 'cover',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </div>

          {/* 2. CENTRE: Warm Cream / Off-White Panel for the Content and Menu */}
          <main className="w-full max-w-4xl min-h-screen bg-cream-panel relative shadow-2xl border-x-4 border-[#3e1b1c]/30 pb-16">
            {/* Subtle warm lighting vignette over the cream panel */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#f3e9d8]/30 to-[#e4d4bd]/50 pointer-events-none" />

            <div className="relative z-10">
              {/* 3. EXACT Checked Clothy Pattern & EXACT Logo Text Header */}
              <GrannyExactHeader onOrderClick={() => setIsBagOpen(true)} />

              {/* Quick Action Navigation bar */}
              <div className="max-w-3xl mx-auto px-4 mt-6 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-[#6e4e3f] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                  <span>Fresh pots simmering now</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={scrollToMenu}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2d1b16] hover:bg-[#422820] text-[#fffdfa] border border-[#e5a84b]/50 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    <Utensils className="w-3.5 h-3.5 text-[#e5a84b]" />
                    <span>View Menu & Order</span>
                    <ArrowDown className="w-3.5 h-3.5 text-[#e5a84b] animate-bounce" />
                  </button>
                </div>
              </div>

              {/* 4. THE OFFICIAL MENU: Clean, Prominent, Now Open */}
              <div className="mt-2">
                <MenuSection
                  onAddToCart={handleAddToCart}
                  cartCount={totalItemsCount}
                  onOpenCart={() => setIsBagOpen(true)}
                />
              </div>

              {/* 5. Food Story & South African Home-Cooked Heritage */}
              <HomelyAtmosphere />

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

          {/* Right Brick Wall Flank on Desktop (Loyal to the exact brick setup in the image) */}
          <div
            className="hidden xl:block w-[18vw] min-h-screen shrink-0 border-l-2 border-black/30 pointer-events-none sticky top-0 h-screen"
            style={{
              backgroundImage: "url('/assets/aistudio/WhatsApp_Image_2026-11-07_at_3.31.53_PM_215f9de8.jpg')",
              backgroundPosition: 'right center',
              backgroundSize: 'cover',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
          </div>
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
