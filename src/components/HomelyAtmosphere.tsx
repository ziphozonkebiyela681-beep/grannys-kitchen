import React from 'react';
import {
  Heart,
  Utensils,
  Sparkles,
  MapPin,
  Quote,
  Shield,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Award,
} from 'lucide-react';

interface HomelyAtmosphereProps {
  onGoToSummary?: () => void;
  onGoToFullMenu?: () => void;
  onOpenOrder?: () => void;
}

export const HomelyAtmosphere: React.FC<HomelyAtmosphereProps> = ({
  onGoToSummary,
  onGoToFullMenu,
  onOpenOrder,
}) => {
  return (
    <section id="our-story" className="w-full max-w-5xl mx-auto px-4 py-6 scroll-mt-6 select-none">
      {/* Top Breadcrumb Navigation Bar for the Story Page */}
      {(onGoToSummary || onGoToFullMenu) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          {onGoToSummary && (
            <button
              onClick={onGoToSummary}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fffdf9] hover:bg-[#f7eedf] text-[#361a15] border border-[#cbbaa4] text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-[#8b1d20]" />
              <span>← Back to Page 1: Menu Summary</span>
            </button>
          )}

          {onGoToFullMenu && (
            <button
              onClick={onGoToFullMenu}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2d1b16] hover:bg-[#422820] text-[#fffdfa] border border-[#e5a84b]/50 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
            >
              <span>View Page 2: Complete Menu</span>
              <ArrowRight className="w-4 h-4 text-[#e5a84b]" />
            </button>
          )}
        </div>
      )}

      {/* Main Story Container */}
      <div className="bg-[#fffdf9] border-2 border-[#8b1d20]/40 rounded-3xl overflow-hidden shadow-xl relative">
        {/* Top Header Tartan Ribbon */}
        <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3.5 py-1.5 rounded-xl border border-[#e5a84b]/60 shadow-sm">
            <Heart className="w-4 h-4 text-[#e5a84b] fill-[#e5a84b]" />
            <span className="font-condensed tracking-wider uppercase text-xs sm:text-sm font-extrabold text-[#fffcf7]">
              OUR STORY • SINCE 1997
            </span>
          </div>
          <span className="text-xs text-[#3d2319] font-body font-bold bg-[#fffdfa]/95 px-3 py-1 rounded-lg border border-[#c4a683] hidden sm:inline shadow-2xs">
            From Katlehong to Fourways Mall
          </span>
        </div>

        {/* Story Body */}
        <div className="p-6 sm:p-10 bg-gradient-to-b from-[#fffdf9] via-[#fbf6ec] to-[#f7eedf]">
          {/* Main Title & Lead Subtitle */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-9">
            <h2 className="font-display text-3xl sm:text-4xl text-[#361a15] tracking-wide uppercase drop-shadow-xs mb-3">
              Our Story
            </h2>
            <p className="font-editorial text-lg sm:text-xl text-[#7a2225] font-semibold italic leading-snug">
              "Since 1997, one mother has been feeding a nation, one plate at a time."
            </p>
          </div>

          {/* Tasteful Hero Portrait Feature of Mam Nomsa "Granny" Moeketsi */}
          <div className="max-w-3xl mx-auto mb-10 bg-[#fffdfa] border-2 border-[#d8c3ad] rounded-2xl p-4 sm:p-6 shadow-md overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Granny's Photo with Tasteful Tartan & Golden Frame */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative p-2 bg-scottish-tartan rounded-2xl shadow-xl border-2 border-[#8b1d20]/50 max-w-[280px] w-full">
                  <div className="relative overflow-hidden rounded-xl border-2 border-[#e5a84b]/70 bg-[#1c1d20] shadow-inner group">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_10.19.27_PM_9b1ea36f.jpg"
                      alt="Mam Nomsa 'Granny' Moeketsi at Granny's Kitchen Fourways Mall"
                      className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle warm lighting vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 inset-x-2 text-center pointer-events-none">
                      <span className="inline-block bg-[#2d1b16]/90 text-[#fad194] px-2.5 py-0.5 rounded-full text-[11px] font-condensed uppercase tracking-wider font-extrabold border border-[#e5a84b]/40 shadow-xs">
                        Mam Nomsa "Granny"
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#715446] font-body text-center mt-2 font-medium italic">
                  Mam Nomsa Moeketsi at Granny's Kitchen, Fourways Mall
                </p>
              </div>

              {/* Story Introduction Beside Granny's Portrait */}
              <div className="md:col-span-7 space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6ebdc] border border-[#d8c3ad] text-xs font-condensed font-bold uppercase tracking-wider text-[#7a2225]">
                  <Award className="w-3.5 h-3.5 text-[#e5a84b]" />
                  <span>Founder & Head Cook • 29+ Years of Love</span>
                </div>

                <h3 className="font-condensed text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#361a15] leading-tight">
                  Before there was Granny's Kitchen, there was the canteen.
                </h3>

                <p className="text-sm sm:text-base text-[#4d2f25] leading-relaxed font-body">
                  In the township of Katlehong, Mam Nomsa "Granny" Moeketsi ran canteens. Every morning she woke up early and cooked from her own pots — pap, kota, vetkoek, stewed beef, salads. Home dishes. Plates of love.
                </p>

                <div className="p-3.5 bg-[#fbf5eb] rounded-xl border-l-4 border-[#8b1d20] text-left">
                  <p className="font-editorial italic text-xs sm:text-sm text-[#701518] font-semibold">
                    "Every pot started before dawn in Katlehong with fresh ingredients, seasoned hands, and an open heart for anyone who walked through the door."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Timeline Ribbon */}
          <div className="max-w-2xl mx-auto mb-8 bg-[#f2e5d4] border border-[#d8c3ad] rounded-2xl p-3 sm:p-4 shadow-inner">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8b1d20] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </span>
                <div>
                  <span className="font-condensed uppercase font-extrabold text-[#3d191b] block">
                    1997 • Katlehong Township
                  </span>
                  <span className="text-[11px] text-[#715446]">Canteen Pots & Home Recipes</span>
                </div>
              </div>

              <div className="hidden sm:block text-[#a48671] font-bold">➔</div>

              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8b1d20] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </span>
                <div>
                  <span className="font-condensed uppercase font-extrabold text-[#3d191b] block">
                    Feeding Community & Family
                  </span>
                  <span className="text-[11px] text-[#715446]">Plates of Love & Resilience</span>
                </div>
              </div>

              <div className="hidden sm:block text-[#a48671] font-bold">➔</div>

              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8b1d20] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </span>
                <div>
                  <span className="font-condensed uppercase font-extrabold text-[#3d191b] block">
                    Today • Fourways Mall
                  </span>
                  <span className="text-[11px] text-[#715446]">BTC05 Taxi Terminal Door</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Paragraphs & The 4 Plates of Love */}
          <div className="max-w-2xl mx-auto space-y-6 text-[#45271d] font-body text-sm sm:text-base leading-relaxed">
            {/* The 4 Plates of Love Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-[#fffdfa] border border-[#d8c3ad] hover:border-[#8b1d20]/50 p-4 rounded-xl shadow-xs transition-all">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#faedd9] text-[#8b1d20] shrink-0 mt-0.5">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-condensed uppercase tracking-wider text-xs font-bold text-[#8b1d20] block">
                      More Than Food
                    </span>
                    <p className="font-bold text-sm sm:text-base text-[#381617] mt-0.5">
                      Those plates did more than feed people.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#fffdfa] border border-[#d8c3ad] hover:border-[#8b1d20]/50 p-4 rounded-xl shadow-xs transition-all">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#faedd9] text-[#8b1d20] shrink-0 mt-0.5">
                    <Heart className="w-4 h-4 fill-[#8b1d20]" />
                  </div>
                  <div>
                    <span className="font-condensed uppercase tracking-wider text-xs font-bold text-[#8b1d20] block">
                      Raising Children
                    </span>
                    <p className="font-bold text-sm sm:text-base text-[#381617] mt-0.5">
                      Those plates raised her children.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#fffdfa] border border-[#d8c3ad] hover:border-[#8b1d20]/50 p-4 rounded-xl shadow-xs transition-all">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#faedd9] text-[#8b1d20] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-condensed uppercase tracking-wider text-xs font-bold text-[#8b1d20] block">
                      Education & Future
                    </span>
                    <p className="font-bold text-sm sm:text-base text-[#381617] mt-0.5">
                      Those plates put her children through school.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#fffdfa] border border-[#d8c3ad] hover:border-[#8b1d20]/50 p-4 rounded-xl shadow-xs transition-all">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#faedd9] text-[#8b1d20] shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-condensed uppercase tracking-wider text-xs font-bold text-[#8b1d20] block">
                      Building A Family
                    </span>
                    <p className="font-bold text-sm sm:text-base text-[#381617] mt-0.5">
                      Those plates made a living, and built a family.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="italic text-[#5e4134] text-center pt-1 font-editorial text-base sm:text-lg">
              Her children grew up on those plates. Her community in Katlehong grew up on those plates.
            </p>

            <div className="bg-[#f5eade] rounded-2xl p-5 sm:p-6 border border-[#dec9b4] space-y-3">
              <h4 className="font-condensed font-extrabold text-base sm:text-lg uppercase text-[#5a171a] tracking-wider">
                And now, after all those years — from Katlehong to Fourways — she has her own door. Her own shop.
              </h4>
              <p className="font-display text-xl sm:text-2xl text-[#361a15] tracking-wide uppercase">
                Granny's Kitchen at Fourways Mall.
              </p>
              <p className="pt-1">
                Now, those same home-cooked, cultural dishes — filled with Granny's love — are not just for her family anymore. They are for everyone.
              </p>

              {/* Who it is for tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="px-3 py-1 bg-[#fffdfa] rounded-lg border border-[#cbb399] text-xs font-bold text-[#422219]">
                  For the commuter rushing to work
                </span>
                <span className="px-3 py-1 bg-[#fffdfa] rounded-lg border border-[#cbb399] text-xs font-bold text-[#422219]">
                  For the taxi driver
                </span>
                <span className="px-3 py-1 bg-[#fffdfa] rounded-lg border border-[#cbb399] text-xs font-bold text-[#422219]">
                  For the mother
                </span>
                <span className="px-3 py-1 bg-[#fffdfa] rounded-lg border border-[#cbb399] text-xs font-bold text-[#422219]">
                  For the student
                </span>
                <span className="px-3 py-1 bg-[#fffdfa] rounded-lg border border-[#8b1d20]/50 text-xs font-extrabold text-[#7a2225]">
                  For everyone who is hungry for home.
                </span>
              </div>
            </div>

            <p className="text-center font-medium pt-2">
              Because Mam Nomsa "Granny" Moeketsi has always believed one thing:
            </p>

            {/* The Climax Quote Banner */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#8b1d20]/60 shadow-xl bg-scottish-tartan p-2">
              <div className="bg-[#241712] text-[#fffcf7] rounded-xl p-5 sm:p-7 text-center border border-[#e5a84b]/50 relative">
                <Quote className="w-8 h-8 text-[#e5a84b]/30 mx-auto mb-2" />
                <blockquote className="font-editorial text-xl sm:text-2xl font-bold italic text-[#fffdf7] leading-snug">
                  "No one should go hungry when there is a Granny's Kitchen nearby."
                </blockquote>
                <div className="mt-3 pt-3 border-t border-[#e5a84b]/30">
                  <p className="font-condensed font-extrabold uppercase tracking-widest text-xs sm:text-sm text-[#e5a84b]">
                    Mam Nomsa "Granny" Moeketsi
                  </p>
                  <p className="text-[11px] text-[#e0cfbe] font-body">
                    Founder & Head Cook • Katlehong to Fourways Mall
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Link Actions from Story to Menu */}
            {(onGoToSummary || onGoToFullMenu) && (
              <div className="pt-6 border-t border-[#ebdccb] text-center space-y-3">
                <p className="text-xs uppercase font-condensed tracking-wider font-bold text-[#735041]">
                  Taste Mam Nomsa's Home Cooking Today
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {onGoToSummary && (
                    <button
                      onClick={onGoToSummary}
                      className="py-2.5 px-5 bg-[#301c15] hover:bg-[#482c22] text-[#fffdfa] border border-[#e5a84b]/50 rounded-xl text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-md hover:shadow-xl transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#e5a84b]" />
                      <span>Explore Page 1: Menu Summary</span>
                    </button>
                  )}

                  {onGoToFullMenu && (
                    <button
                      onClick={onGoToFullMenu}
                      className="py-2.5 px-5 bg-[#7a2225] hover:bg-[#91282c] text-[#fffdfa] border border-[#e5a84b]/50 rounded-xl text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-md hover:shadow-xl transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                    >
                      <Utensils className="w-4 h-4 text-[#e5a84b]" />
                      <span>View Page 2: Complete Menu</span>
                    </button>
                  )}

                  {onOpenOrder && (
                    <button
                      onClick={onOpenOrder}
                      className="py-2.5 px-4 bg-[#f2e6d6] hover:bg-[#e4d3bc] text-[#3e1416] border border-[#c5ab8f] rounded-xl text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-xs transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#8b1d20]" />
                      <span>Takeaway Bag</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
