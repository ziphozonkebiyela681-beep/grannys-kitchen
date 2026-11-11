import React from 'react';
import {
  Heart,
  Sparkles,
  Smile,
  ShieldCheck,
  Utensils,
  Clock,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Users,
  Award,
  Sun,
  Coffee,
  Instagram,
} from 'lucide-react';

interface ServiceWithLovePageProps {
  onGoToSummary: () => void;
  onGoToFullMenu: () => void;
  onGoToStory: () => void;
  onOpenOrder: () => void;
}

export const ServiceWithLovePage: React.FC<ServiceWithLovePageProps> = ({
  onGoToSummary,
  onGoToFullMenu,
  onGoToStory,
  onOpenOrder,
}) => {
  const servicePrinciples = [
    {
      icon: Heart,
      title: 'Ubuntu & The Family Spirit',
      subtitle: 'You are never just a customer — you are family.',
      description:
        'When you walk up to our counter at Fourways Mall BTC05, you are stepping into Granny’s dining room. We greet everyone with eye contact, sincere smiles, and the deep-rooted respect instilled by Mam Nomsa.',
      quote: '"If they leave with a full belly and a happy heart, our work is done."',
    },
    {
      icon: Utensils,
      title: "The Mother's Generous Hand",
      subtitle: 'Plates scooped with love and abundance.',
      description:
        'Granny always said that a skimpy plate has no soul. Our team plates every dish generously — ladles of rich stew gravy, crisp hot Aromat chips, and fresh sides packed with true homestyle care.',
      quote: '"We dish up for you the exact way we dish up for our own children at home."',
    },
    {
      icon: Smile,
      title: 'Warmth in the Rush',
      subtitle: 'Patience and care, even during peak rank hours.',
      description:
        'Whether you have 5 minutes before your taxi leaves or a quiet lunch break, our team works swiftly without losing our warmth. A friendly word in the morning can change someone’s entire day.',
      quote: '"Fast service never means cold service."',
    },
    {
      icon: Award,
      title: 'Dignity, Cleanliness & Pride',
      subtitle: 'Carrying the Granny’s Kitchen badge with honour.',
      description:
        'From our clean, crisp uniforms to our spotless kitchen and tray presentation, we treat food and hospitality as sacred. Serving a hard-working community is a responsibility we cherish.',
      quote: '"Do everything with excellence, because Granny’s name is on our chest."',
    },
  ];

  return (
    <section id="service-with-love" className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6 scroll-mt-6 select-none">
      {/* Top Breadcrumb Navigation */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
        <button
          onClick={onGoToSummary}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fffdf9] hover:bg-[#f7eedf] text-[#361a15] border border-[#cbbaa4] text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-[#8b1d20]" />
          <span>← Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onGoToStory}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fffdf9] hover:bg-[#f7eedf] text-[#361a15] border border-[#cbbaa4] text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 text-[#8b1d20]" />
            <span>Our Story</span>
          </button>
          <button
            onClick={onGoToFullMenu}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2d1b16] hover:bg-[#422820] text-[#fffdfa] border border-[#e5a84b]/50 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 text-[#e5a84b]" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#fffdf9] border-2 border-[#8b1d20]/40 rounded-3xl overflow-hidden shadow-xl relative">
        {/* Top Header Tartan Ribbon */}
        <div className="bg-scottish-tartan border-b-2 border-[#8b1d20]/40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 bg-[#2d1b16] text-[#fffcf7] px-3.5 py-1.5 rounded-xl border border-[#e5a84b]/60 shadow-sm">
            <Users className="w-4 h-4 text-[#e5a84b]" />
            <span className="font-condensed tracking-wider uppercase text-xs sm:text-sm font-extrabold text-[#fffcf7]">
              GRANNY'S TEAM • SERVED WITH LOVE
            </span>
          </div>
          <span className="text-xs text-[#3d2319] font-body font-bold bg-[#fffdfa]/95 px-3 py-1 rounded-lg border border-[#c4a683] hidden sm:inline shadow-2xs">
            Principles Instilled by Mam Nomsa
          </span>
        </div>

        {/* Hero Section */}
        <div className="p-5 sm:p-8 md:p-10 bg-gradient-to-b from-[#fffdf9] via-[#fbf6ec] to-[#f6ebd9]">
          {/* Main Title & Lead Heading */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#8b1d20] uppercase tracking-widest bg-[#f7eedf] px-3.5 py-1 rounded-full border border-[#d8c3ad] mb-2.5">
              <Heart className="w-3.5 h-3.5 text-[#e5a84b] fill-[#e5a84b]" />
              <span>Hospitality with Heart & Dignity</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#361a15] tracking-wide uppercase drop-shadow-xs mb-3">
              Served With Love
            </h2>
            <p className="font-editorial text-lg sm:text-xl text-[#7a2225] font-semibold italic leading-relaxed">
              "Good service isn’t just about putting down a plate — it is about making you feel like you just came home."
            </p>
          </div>

          {/* Hero Feature Box with Waiters Photo */}
          <div className="bg-[#fffcf7] border-2 border-[#decbb7] rounded-2xl p-4 sm:p-7 shadow-lg mb-10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Photo of Waiters */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative p-2 bg-scottish-tartan rounded-2xl shadow-xl border-2 border-[#8b1d20]/50 max-w-[320px] w-full">
                  <div className="relative overflow-hidden rounded-xl border-2 border-[#e5a84b]/70 bg-[#1c1d20] shadow-inner group">
                    <img
                      src="/assets/team/our_waiters.jpg"
                      alt="The Granny's Kitchen Service Team in Uniform"
                      className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 inset-x-2 text-center pointer-events-none">
                      <span className="inline-block bg-[#2d1b16]/95 text-[#fad194] px-3 py-1 rounded-full text-xs font-condensed uppercase tracking-wider font-extrabold border border-[#e5a84b]/50 shadow-xs">
                        The Smiling Faces of Granny's Kitchen
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#785341] text-center mt-2 font-medium italic">
                  Always ready to welcome you with a warm smile and a fresh tray.
                </p>
              </div>

              {/* Story & Philosophy */}
              <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#5c1c1e] uppercase tracking-wider font-condensed bg-[#f5ecde] px-3 py-1 rounded-md border border-[#d5c2ae]">
                  <Sparkles className="w-3.5 h-3.5 text-[#e5a84b]" />
                  <span>The Spirit Behind the Apron</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[#3a1517] leading-snug">
                  "Every Tray is Carried with Love, Every Guest is Cherished."
                </h3>

                <p className="text-sm sm:text-base text-[#5c4235] leading-relaxed font-body">
                  When Mam Nomsa "Granny" Moeketsi opened Granny's Kitchen at Fourways Mall, she didn't just teach recipes — she taught a way of being. She taught us that someone coming to our counter might have had a long commute, a tough day at work, or might be missing their grandmother’s cooking hundreds of kilometres away.
                </p>

                <p className="text-sm sm:text-base text-[#5c4235] leading-relaxed font-body">
                  That is why our team treats every interaction as an opportunity to share warmth, care, and family dignity. When we hand you a steaming quarter loaf Kota or a tray of hot amagwinya, it is handed to you with genuine pride and a sincere blessing for your day.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <div className="flex items-center gap-2 bg-[#f4ebe0] px-3 py-1.5 rounded-lg border border-[#ded0bf] text-xs font-bold text-[#442217]">
                    <Sun className="w-4 h-4 text-[#e5a84b]" />
                    <span>Serving From 06:00 AM Daily</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f4ebe0] px-3 py-1.5 rounded-lg border border-[#ded0bf] text-xs font-bold text-[#442217]">
                    <Coffee className="w-4 h-4 text-[#e5a84b]" />
                    <span>Fourways Mall BTC05 Terminal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Granny's 4 Core Service Principles */}
          <div className="mb-10">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-[#5c1c1e] uppercase tracking-widest bg-[#f7eedf] px-3.5 py-1 rounded-full border border-[#d8c4ad]">
                Instilled by Granny Moeketsi
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#361a15] tracking-wide uppercase mt-2">
                Our 4 Service Principles
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {servicePrinciples.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#faf4ea] border-2 border-[#decbb7] hover:border-[#8b1d20]/60 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#2d1b16] text-[#e5a84b] flex items-center justify-center border border-[#e5a84b]/40 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#8b1d20] uppercase tracking-wider font-condensed">
                            Principle #{idx + 1}
                          </span>
                          <h4 className="font-bold text-base sm:text-lg text-[#3e1416] font-body leading-snug">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-[#734a38] mb-2 font-editorial italic">
                        {item.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm text-[#5f473b] leading-relaxed font-body">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#e5d5c3] text-xs font-editorial italic text-[#8b1d20] bg-[#f2e5d5] px-3 py-2 rounded-lg">
                      {item.quote}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Option: Eat In or Take Away Showcase */}
          <div className="mb-12 bg-[#fffcf7] border-2 border-[#8b1d20]/30 rounded-3xl p-5 sm:p-8 shadow-md">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#8b1d20] uppercase tracking-widest bg-[#f7eedf] px-3.5 py-1 rounded-full border border-[#d8c3ad] mb-2">
                <Utensils className="w-3.5 h-3.5 text-[#e5a84b]" />
                <span>Dining Options For Everyone</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#361a15] tracking-wide uppercase">
                Eat In Or Take Away
              </h3>
              <p className="text-xs sm:text-sm text-[#6f4f3e] mt-1.5 font-body leading-relaxed">
                Whether pulling up a red chair in our welcoming diner or grabbing a hot, compartmentalized meal box for your commute, Granny's love is served fresh either way.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Option 1: Sit Down & Eat In */}
              <div className="bg-[#faf4ea] border-2 border-[#decbb7] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  {/* Photo of Eat-In Plate */}
                  <div className="w-full h-56 sm:h-64 relative bg-[#231510] overflow-hidden">
                    <img
                      src="/assets/dining_options/eat_in_plate.jpg"
                      alt="Sit Down & Eat In on Granny's Ceramic Tableware"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#8b1d20] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-condensed shadow-sm border border-[#e5a84b]/50">
                        Option 1 • Sit Down & Eat In
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-xs font-condensed uppercase tracking-wider font-semibold text-[#f7eedf]/90 block">
                        Classic Ceramic Tableware
                      </span>
                      <h4 className="font-display text-lg sm:text-xl uppercase tracking-wide text-white drop-shadow-sm">
                        Relaxed Homestyle Dining
                      </h4>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <p className="text-xs sm:text-sm text-[#5c4235] leading-relaxed font-body">
                      Pull up one of our signature red bistro chairs, take a deep breath, and let us take care of you. Your meal is dished up piping hot on Granny’s classic ceramic dinner plates with generous scoops of rich gravy, tender meats, and fresh country veggies.
                    </p>

                    <div className="space-y-2 pt-1 border-t border-[#ebdccb]">
                      <div className="flex items-start gap-2 text-xs text-[#442217]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8b1d20] mt-1.5 shrink-0" />
                        <span><strong>Plated Fresh on Ceramic Dinnerware:</strong> Hot from the heavy pots straight to your table.</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#442217]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8b1d20] mt-1.5 shrink-0" />
                        <span><strong>Attentive Table Hospitality:</strong> Smiling service, extra serviettes, and a warm family atmosphere.</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#442217]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8b1d20] mt-1.5 shrink-0" />
                        <span><strong>Refreshing Cold Drinks:</strong> Enjoy iced mint lemonade, juices, or traditional soft drinks.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="bg-[#f0e2d0] rounded-xl p-3 text-center border border-[#dec9b4]">
                    <span className="text-[11px] font-bold text-[#633a28] uppercase tracking-wider font-condensed">
                      Perfect for workers on lunch, friends & families
                    </span>
                  </div>
                </div>
              </div>

              {/* Option 2: Takeaway */}
              <div className="bg-[#faf4ea] border-2 border-[#decbb7] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  {/* Photo of Takeaway Box */}
                  <div className="w-full h-56 sm:h-64 relative bg-[#231510] overflow-hidden">
                    <img
                      src="/assets/dining_options/takeaway_box.jpg"
                      alt="Piping Hot Takeaway in 3-Compartment Box"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#2d1b16] text-[#fad194] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-condensed shadow-sm border border-[#e5a84b]/50">
                        Option 2 • Hot Takeaway
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-xs font-condensed uppercase tracking-wider font-semibold text-[#f7eedf]/90 block">
                        3-Compartment Secure Container
                      </span>
                      <h4 className="font-display text-lg sm:text-xl uppercase tracking-wide text-white drop-shadow-sm">
                        Packed For The Commuter & Home
                      </h4>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <p className="text-xs sm:text-sm text-[#5c4235] leading-relaxed font-body">
                      Catching your taxi at the BTC05 rank or bringing dinner home to the kids? Our crystal-clear 3-compartment takeaway boxes keep starches, rich gravies, and seasonal veggies neatly separated, insulated, and piping hot for the trip.
                    </p>

                    <div className="space-y-2 pt-1 border-t border-[#ebdccb]">
                      <div className="flex items-start gap-2 text-xs text-[#442217]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8b1d20] mt-1.5 shrink-0" />
                        <span><strong>Neat 3-Compartment Partitioning:</strong> No messy gravy spills or soggy starches in transit.</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#442217]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8b1d20] mt-1.5 shrink-0" />
                        <span><strong>Swift Taxi Rank Turnaround:</strong> Packed fast and securely with cutlery and serviettes.</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#442217]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8b1d20] mt-1.5 shrink-0" />
                        <span><strong>Pre-Order on WhatsApp:</strong> Order ahead so your hot box is ready the minute you walk in.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="bg-[#f0e2d0] rounded-xl p-3 text-center border border-[#dec9b4]">
                    <span className="text-[11px] font-bold text-[#633a28] uppercase tracking-wider font-condensed">
                      Ideal for taxi rank commuters, shoppers & home dinner
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial / Experience Banner */}
          <div className="relative rounded-2xl p-1 bg-scottish-tartan shadow-lg border border-[#8b1d20]/50 mb-6">
            <div className="bg-[#2a1711] text-[#fffcf7] rounded-xl p-5 sm:p-7 text-center border border-[#e5a84b]/40">
              <Sparkles className="w-6 h-6 text-[#e5a84b] mx-auto mb-2" />
              <h4 className="font-display text-xl sm:text-2xl text-[#fffdfa] uppercase tracking-wider mb-2">
                "You Don't Just Eat at Granny's. You Belong."
              </h4>
              <p className="text-xs sm:text-sm text-[#ead3be] max-w-xl mx-auto leading-relaxed font-body">
                Next time you pass through the BTC05 taxi rank or visit Fourways Mall, say hello to our team. We have a hot meal and a warm table waiting for you.
              </p>
            </div>
          </div>

          {/* Official Instagram Connection Card */}
          <div className="bg-[#faf4eb] border-2 border-[#e2d2c1] rounded-2xl p-4 sm:p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center text-white shadow-md shrink-0">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#8b1d20] uppercase tracking-widest font-condensed">
                  Follow Our Daily Kitchen Stories
                </span>
                <h4 className="font-bold text-base sm:text-lg text-[#321612]">
                  Instagram: @granny_kitchen_fourways
                </h4>
                <p className="text-xs text-[#735443]">
                  Watch our daily pots simmering, see menu specials, and tag us when enjoying your meal!
                </p>
              </div>
            </div>

            <a
              href="https://www.instagram.com/granny_kitchen_fourways"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:brightness-110 text-white font-condensed tracking-wider text-xs sm:text-sm uppercase font-bold shadow-md active:scale-95 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>Visit @granny_kitchen_fourways</span>
            </a>
          </div>

          {/* Bottom Call to Actions */}
          <div className="text-center pt-2">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onGoToFullMenu}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#7a2225] via-[#8b1d20] to-[#601416] hover:brightness-110 border-2 border-[#e5a84b]/60 text-[#fffdfa] font-condensed tracking-widest text-sm sm:text-base uppercase shadow-lg active:scale-98 transition-all flex items-center gap-2 cursor-pointer font-bold"
              >
                <Utensils className="w-4 h-4 text-[#e5a84b]" />
                <span>Explore The Menu & Order</span>
              </button>

              <button
                onClick={onOpenOrder}
                className="py-3 px-6 rounded-xl bg-[#2d1b16] hover:bg-[#40261e] border-2 border-[#cbbaa4] text-[#fffdfa] font-condensed tracking-widest text-sm sm:text-base uppercase shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer font-bold"
              >
                <ShoppingBag className="w-4 h-4 text-[#e5a84b]" />
                <span>Open Takeaway Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
