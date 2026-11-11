import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Utensils,
  Users,
  Camera,
  ShoppingBag,
  Instagram,
  Clock,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useRestaurantStatus } from '../utils/operatingHours';

export type AppPage = 'home' | 'story' | 'full-menu' | 'team' | 'tour';

interface CornerNavigationProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const CornerNavigation: React.FC<CornerNavigationProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  cartTotal,
  onOpenCart,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const status = useRestaurantStatus();

  const navItems: { id: AppPage; label: string; icon: React.ElementType; tag: string }[] = [
    { id: 'home', label: 'Home', icon: Home, tag: 'Welcome' },
    { id: 'story', label: 'Our Story', icon: BookOpen, tag: 'Since 1997' },
    { id: 'full-menu', label: 'Full Menu', icon: Utensils, tag: 'All Dishes' },
    { id: 'team', label: "Granny's Team", icon: Users, tag: 'With Love' },
    { id: 'tour', label: 'Inside Tour', icon: Camera, tag: 'Look Inside' },
  ];

  const handleSelectPage = (page: AppPage) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. DESKTOP CORNER COLUMN:
          Neat, compact, vertical column anchored in the top corner.
          Clean, homey, easy to click at any time without cluttering the page. */}
      <aside
        aria-label="Quick Corner Navigation"
        className="hidden xl:block fixed top-24 right-5 z-40 w-56 select-none"
      >
        <div className="bg-[#fffdf9] border-2 border-[#8b1d20]/50 rounded-2xl shadow-xl overflow-hidden p-1 bg-scottish-tartan">
          <div className="bg-[#fffdf9] rounded-xl p-3 border border-[#e5a84b]/40 space-y-2">
            {/* Header label */}
            <div className="flex items-center justify-between pb-2 border-b border-[#ebdccb]">
              <span className="text-[10px] font-condensed font-black tracking-widest uppercase text-[#8b1d20]">
                MENU DIRECTORY
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
                title={status.isOpen ? 'Open Now' : 'Closed'}
              />
            </div>

            {/* The 5 Main Pages */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPage(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-[#8b1d20] text-white shadow-sm border border-[#e5a84b]/60'
                        : 'text-[#442217] hover:bg-[#f6ebd9] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#e5a84b]' : 'text-[#8b1d20]'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive ? (
                      <span className="text-[8px] bg-black/40 text-[#fad194] px-1.5 py-0.2 rounded font-bold">
                        HERE
                      </span>
                    ) : (
                      <span className="text-[9px] text-[#9c7865] font-normal lowercase opacity-75">
                        {item.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Action: Takeaway Bag summary if items inside */}
            {cartCount > 0 && (
              <button
                onClick={onOpenCart}
                className="w-full mt-1.5 py-2 px-3 bg-[#2d1b16] hover:bg-[#422820] text-[#fffdfa] rounded-xl text-xs font-condensed uppercase tracking-wider font-bold border border-[#e5a84b]/50 shadow-xs flex items-center justify-between cursor-pointer active:scale-95 transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#e5a84b]" />
                  <span>Bag ({cartCount})</span>
                </div>
                <span className="text-[#fad194] font-mono font-bold text-[11px]">
                  R{cartTotal.toFixed(2)}
                </span>
              </button>
            )}

            {/* Instagram Link */}
            <div className="pt-2 border-t border-[#ebdccb] text-center">
              <a
                href="https://www.instagram.com/granny_kitchen_fourways"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] text-[#704230] hover:text-[#8b1d20] font-semibold transition-colors"
              >
                <Instagram className="w-3 h-3 text-[#d62976]" />
                <span>Granny's Kitchen</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. FLOATING CORNER TRIGGER ON MOBILE & TABLET:
          Fixed in the bottom-right or top-right corner with a clean menu badge */}
      <div className="xl:hidden fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 select-none">
        {/* Toggle Corner Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Open corner navigation menu"
          className="p-1 bg-scottish-tartan rounded-full shadow-2xl border-2 border-[#8b1d20]/50 transition-all active:scale-95 cursor-pointer"
        >
          <div className="bg-[#2d1b16] text-[#fffdfa] px-3.5 py-2.5 rounded-full flex items-center gap-2 border border-[#e5a84b]/40">
            {isOpen ? (
              <X className="w-4 h-4 text-[#e5a84b]" />
            ) : (
              <Menu className="w-4 h-4 text-[#e5a84b]" />
            )}
            <span className="font-condensed uppercase tracking-wider text-xs font-extrabold text-[#fffdfa]">
              {isOpen ? 'Close' : 'Menu'}
            </span>
          </div>
        </button>

        {/* Mobile Corner Pop-up Column */}
        {isOpen && (
          <div className="w-64 bg-[#fffdf9] border-2 border-[#8b1d20]/60 rounded-2xl shadow-2xl overflow-hidden p-1 bg-scottish-tartan animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="bg-[#fffdf9] rounded-xl p-3 border border-[#e5a84b]/40 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#ebdccb]">
                <span className="text-[11px] font-condensed font-black tracking-wider uppercase text-[#8b1d20]">
                  PAGES
                </span>
                <span className="text-[10px] text-[#8c6753] font-semibold">
                  Granny's Kitchen
                </span>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectPage(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all cursor-pointer text-left ${
                        isActive
                          ? 'bg-[#8b1d20] text-white shadow-sm border border-[#e5a84b]/60'
                          : 'text-[#442217] hover:bg-[#f6ebd9]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#e5a84b]' : 'text-[#8b1d20]'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  );
                })}
              </nav>

              {cartCount > 0 && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCart();
                  }}
                  className="w-full mt-1 py-2 px-3 bg-[#2d1b16] text-[#fffdfa] rounded-xl text-xs font-condensed uppercase tracking-wider font-bold border border-[#e5a84b]/50 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#e5a84b]" />
                    <span>View Bag ({cartCount})</span>
                  </div>
                  <span className="text-[#fad194] font-mono">R{cartTotal.toFixed(2)}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. TOP STREAMLINED NAVIGATION BAR (Visible across all screens for instant access):
          Simple, homey, easy for a visitor to find what they want in 1 tap */}
      <nav aria-label="Main Pages Navigation" className="max-w-4xl mx-auto px-4 mt-4 select-none">
        <div className="bg-[#fffdf9] p-1 rounded-2xl border-2 border-[#8b1d20]/30 shadow-sm flex items-center justify-center gap-1 flex-wrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectPage(item.id)}
                className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#8b1d20] text-[#fffdfa] shadow-xs border border-[#e5a84b]/50'
                    : 'text-[#4b281c] hover:bg-[#fbf4ea] hover:text-[#8b1d20]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#e5a84b]' : 'text-[#8b1d20]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
