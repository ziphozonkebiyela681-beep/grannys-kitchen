import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Utensils,
  Users,
  Camera,
  ShoppingBag,
  Instagram,
  Phone,
  Menu,
  X,
  ChevronRight,
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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 select-none">
      {/* Expandable Corner Menu Box */}
      {isOpen && (
        <div className="w-64 sm:w-72 bg-[#fffdf9] border-2 border-[#8b1d20] rounded-xl shadow-2xl overflow-hidden p-1.5 bg-scottish-tartan animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#fffdf9] rounded-lg p-3.5 border border-[#e5a84b]/50 space-y-2.5">
            {/* Header label */}
            <div className="flex items-center justify-between pb-2 border-b border-[#ebdccb]">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <span className="text-[11px] font-condensed font-black tracking-widest uppercase text-[#8b1d20]">
                  MENU
                </span>
              </div>
              <span className="text-[10px] text-[#7c5947] font-semibold">
                Granny's Kitchen
              </span>
            </div>

            {/* The 5 Pages */}
            <nav aria-label="Site Pages" className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPage(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-condensed uppercase tracking-wider font-bold transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-[#8b1d20] text-white shadow-sm border border-[#e5a84b]/60'
                        : 'text-[#442217] hover:bg-[#f6ebd9] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#e5a84b]' : 'text-[#8b1d20]'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive ? (
                      <span className="text-[9px] bg-black/40 text-[#fad194] px-1.5 py-0.5 rounded font-bold">
                        OPEN
                      </span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Action: Takeaway Bag summary if items inside */}
            {cartCount > 0 && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenCart();
                }}
                className="w-full py-2.5 px-3 bg-[#2d1b16] hover:bg-[#422820] text-[#fffdfa] rounded-lg text-xs font-condensed uppercase tracking-wider font-bold border border-[#e5a84b]/50 shadow-xs flex items-center justify-between cursor-pointer active:scale-95 transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#e5a84b]" />
                  <span>Order Bag ({cartCount})</span>
                </div>
                <span className="text-[#fad194] font-mono font-bold text-[11px]">
                  R{cartTotal.toFixed(2)}
                </span>
              </button>
            )}

            {/* Desk Number & Instagram Footer */}
            <div className="pt-2 border-t border-[#ebdccb] space-y-1.5 text-center">
              <a
                href="tel:0723147152"
                className="w-full py-1.5 px-2.5 bg-[#f7eedf] hover:bg-[#f0dec4] border border-[#d8c3ad] rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#3d1c15] transition-colors"
              >
                <Phone className="w-3 h-3 text-[#8b1d20]" />
                <span>Order Desk: 0723147152</span>
              </a>

              <a
                href="https://www.instagram.com/granny_kitchen_fourways"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-[11px] text-[#704230] hover:text-[#8b1d20] font-semibold transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#d62976]" />
                <span>granny's_kitchen_fourways</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Corner Menu CUBE Button (The only way to access the other pages) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Open menu"
        className="w-16 h-16 p-1 bg-scottish-tartan rounded-lg shadow-[4px_4px_0px_#5c1214] hover:shadow-[2px_2px_0px_#5c1214] hover:translate-x-0.5 hover:translate-y-0.5 border-2 border-[#8b1d20] transition-all active:scale-95 cursor-pointer flex items-center justify-center"
        title="Menu"
      >
        <div className="w-full h-full bg-[#2d1b16] text-[#fffdfa] rounded-md flex flex-col items-center justify-center gap-0.5 border border-[#e5a84b]/60">
          {isOpen ? (
            <X className="w-5 h-5 text-[#e5a84b]" />
          ) : (
            <Menu className="w-5 h-5 text-[#e5a84b]" />
          )}
          <span className="font-condensed uppercase tracking-widest text-[10px] font-extrabold text-[#fffdfa] leading-none">
            {isOpen ? 'CLOSE' : 'MENU'}
          </span>
        </div>
      </button>
    </div>
  );
};
