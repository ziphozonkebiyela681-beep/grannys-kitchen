export interface MenuItem {
  id: string;
  name: string;
  category: 'stews' | 'chicken_dust' | 'chips' | 'kota' | 'breakfast' | 'salads';
  price: number;
  description?: string;
  image?: string;
  hasStarchChoice?: boolean;
  hasVegChoice?: boolean;
  options?: { name: string; price: number }[];
  popular?: boolean;
  badge?: string;
}

export const STARCH_CHOICES = [
  'Fluffy Pap',
  'Steamed Rice',
  'Homemade Dumpling (Dombolo)',
  'Homestyle Samp',
];

export const VEG_CHOICES = [
  'Spicy Chakalaka',
  'Creamed Spinach (Morogo style)',
  'Sweet Cinnamon Butternut',
  'Pickled Beetroot',
  'Tangy Coleslaw',
];

export const MENU_CATEGORIES = [
  { id: 'all', name: 'Full Menu' },
  { id: 'stews', name: 'Slow-Cooked Stews & Curry' },
  { id: 'chicken_dust', name: 'Chicken Dust' },
  { id: 'kota', name: 'Supreme Kotas' },
  { id: 'chips', name: 'Chips with Aromat' },
  { id: 'breakfast', name: 'Amagwinya & Breakfast' },
  { id: 'salads', name: 'Fresh Salads' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // Stews & Curries (with isolated real plate images carved from background)
  {
    id: 'beef-stew',
    name: 'Beef Stew + 1 Starch + 2 Veg',
    category: 'stews',
    price: 70,
    image: '/assets/plates/beef_stew_plate.png',
    description: 'Classic comfort food. Slow-cooked beef in a hearty gravy with homely seasoning and care.',
    hasStarchChoice: true,
    hasVegChoice: true,
    popular: true,
    badge: "Granny's Signature",
  },
  {
    id: 'lamb-curry',
    name: 'Lamb Curry + 1 Starch + 2 Veg',
    category: 'stews',
    price: 80,
    image: '/assets/plates/lamb_curry_plate.png',
    description: 'Tender lamb slow simmered in fragrant curry spices, bringing warmth and depth to every bite.',
    hasStarchChoice: true,
    hasVegChoice: true,
    popular: true,
    badge: 'Chef Special',
  },
  {
    id: 'chicken-stew',
    name: 'Chicken Stew + 1 Starch + 2 Veg',
    category: 'stews',
    price: 70,
    image: '/assets/plates/chicken_stew_plate.png',
    description: "Tender chicken pieces simmered in a rich flavourful broth with Granny's secret touch.",
    hasStarchChoice: true,
    hasVegChoice: true,
    popular: true,
  },

  // Chicken Dust (with isolated real plate images carved from background)
  {
    id: 'chicken-dust-chips',
    name: 'Chicken Qtr Leg + Chips',
    category: 'chicken_dust',
    price: 65,
    image: '/assets/plates/chicken_dust_chips_plate.png',
    description: 'Crispy charcoal braai seasoned chicken quarter leg served with golden chips dusted in Aromat.',
    popular: true,
    badge: 'Flame Seasoned',
  },
  {
    id: 'chicken-dust-pap',
    name: 'Chicken Qtr Leg + Pap + Gravy',
    category: 'chicken_dust',
    price: 65,
    image: '/assets/plates/chicken_dust_pap_plate.png',
    description: 'Flame-seasoned chicken quarter leg served with fluffy traditional pap and rich tomato-onion gravy.',
    popular: true,
    badge: 'Traditional Favourite',
  },

  // Chips (with isolated real plate images carved from background)
  {
    id: 'chips-small',
    name: 'Small Crispy Chips (with Aromat)',
    category: 'chips',
    price: 20,
    image: '/assets/plates/chips_small_plate.png',
    description: 'Fresh hand-cut golden potatoes, fried crisp and generously dusted with savoury Aromat.',
  },
  {
    id: 'chips-medium',
    name: 'Medium Crispy Chips (with Aromat)',
    category: 'chips',
    price: 25,
    image: '/assets/plates/chips_medium_plate.png',
    description: 'Generous portion of hot crispy chips tossed in Granny’s signature Aromat seasoning.',
    popular: true,
  },
  {
    id: 'chips-large',
    name: 'Large Crispy Chips (with Aromat)',
    category: 'chips',
    price: 35,
    image: '/assets/plates/chips_large_plate.png',
    description: 'Big sharing portion of crispy golden chips with that unforgettable yellow Aromat punch.',
    popular: true,
    badge: 'Sharing Size',
  },
  {
    id: 'fish-and-chips',
    name: 'Fish + Chips or Salad (with Aromat)',
    category: 'chips',
    price: 70,
    image: '/assets/plates/fish_and_chips_plate.png',
    description: 'Crispy golden battered hake fillet served with hot seasoned chips or a crisp fresh side salad.',
    popular: true,
    badge: 'Crispy Golden Hake',
  },

  // Supreme Kota (with isolated real plate images carved from background)
  {
    id: 'mince-kota',
    name: 'Supreme Mince Kota (with Aromat)',
    category: 'kota',
    price: 50,
    image: '/assets/plates/mince_kota_plate.png',
    description: 'Supreme Kota stuffed with savoury seasoned beef mince, crispy chips, fried egg, melted cheese, and atchar.',
    popular: true,
    badge: 'Granny’s Special Mince',
  },
  {
    id: 'kota-base',
    name: 'Supreme Kota Base (Chips, Cheese, Egg + Atchar)',
    category: 'kota',
    price: 35,
    image: '/assets/plates/supreme_kota_plate.png',
    description: 'Hollowed fresh quarter loaf stuffed with crispy hot chips, melted cheese, fried egg, and spicy mango atchar.',
    popular: true,
    badge: 'Fourways Commuter Favourite',
  },

  // Breakfast & Amagwinya (with isolated real plate carved from background)
  {
    id: 'amagwinya-plain',
    name: 'Fresh Amagwinya (Golden Vetkoek)',
    category: 'breakfast',
    price: 1.5,
    image: '/assets/plates/amagwinya_plate.png',
    description: 'Golden fried, fluffy on the inside, crisp on the outside. Served fresh hot from the pot with your choice of savory toppings.',
    popular: true,
    badge: 'Fresh from 06:00 AM • From R1.50',
  },

  // Salads (with isolated real ceramic bowls carved from background)
  {
    id: 'coleslaw',
    name: 'Tangy Homestyle Coleslaw',
    category: 'salads',
    price: 15,
    image: '/assets/plates/coleslaw_plate.png',
    description: 'Crisp hand-shredded cabbage and sweet grated carrots tossed in Granny’s chilled, creamy homemade dressing.',
    popular: true,
    badge: "Granny's Homemade Dressing • R15",
  },
  {
    id: 'green-salad',
    name: 'Fresh Green Garden Salad',
    category: 'salads',
    price: 20,
    image: '/assets/plates/green_salad_plate.png',
    description: 'Crisp fresh lettuce, sliced cucumber rounds, ripe vine-tomato wedges, and red onion rings with a light homestyle dressing.',
    popular: true,
    badge: 'Garden Crisp & Fresh • R20',
  },
];

export const KOTA_EXTRAS = [
  { id: 'extra-mince', name: 'Extra Mince', price: 15 },
  { id: 'extra-cheese', name: 'Extra Cheese', price: 5 },
  { id: 'extra-egg', name: 'Extra Fried Egg', price: 5 },
  { id: 'extra-atchar', name: 'Extra Atchar', price: 10 },
  { id: 'add-extras-bundle', name: 'Add Extras Bundle', price: 35 },
];

export const AMAGWINYA_TOPPINGS = [
  { id: 'top-egg', name: 'Boiled Egg', price: 5 },
  { id: 'top-cheese', name: 'Cheddar Cheese', price: 5 },
  { id: 'top-atchar', name: 'Spicy Mango Atchar', price: 10 },
  { id: 'top-mince', name: 'Savoury Beef Mince', price: 15 },
];
