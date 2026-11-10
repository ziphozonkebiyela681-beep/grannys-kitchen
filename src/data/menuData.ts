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
  // Stews & Curries (Full authentic images with background)
  {
    id: 'beef-stew',
    name: 'Beef Stew + 1 Starch + 2 Veg',
    category: 'stews',
    price: 70,
    image: '/assets/menu_full/beef_stew.jpg',
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
    image: '/assets/menu_full/lamb_curry.jpg',
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
    image: '/assets/menu_full/chicken_stew.jpg',
    description: "Tender chicken pieces simmered in a rich flavourful broth with Granny's secret touch.",
    hasStarchChoice: true,
    hasVegChoice: true,
    popular: true,
  },

  // Chicken Dust (Full authentic images with background)
  {
    id: 'chicken-dust-chips',
    name: 'Chicken Qtr Leg + Chips',
    category: 'chicken_dust',
    price: 65,
    image: '/assets/menu_full/chicken_dust_chips.jpg',
    description: 'Crispy charcoal braai seasoned chicken quarter leg served with golden chips dusted in Aromat.',
    popular: true,
    badge: 'Flame Seasoned',
  },
  {
    id: 'chicken-dust-pap',
    name: 'Chicken Qtr Leg + Pap + Gravy',
    category: 'chicken_dust',
    price: 65,
    image: '/assets/menu_full/chicken_dust_pap.jpg',
    description: 'Flame-seasoned chicken quarter leg served with fluffy traditional pap and rich tomato-onion gravy.',
    popular: true,
    badge: 'Traditional Favourite',
  },

  // Chips (Full authentic images with background)
  {
    id: 'chips-small',
    name: 'Small Crispy Chips (with Aromat)',
    category: 'chips',
    price: 20,
    image: '/assets/menu_full/chips_small.jpg',
    description: 'Fresh hand-cut golden potatoes, fried crisp and generously dusted with savoury Aromat.',
  },
  {
    id: 'chips-medium',
    name: 'Medium Crispy Chips (with Aromat)',
    category: 'chips',
    price: 25,
    image: '/assets/menu_full/chips_medium.jpg',
    description: 'Generous portion of hot crispy chips tossed in Granny’s signature Aromat seasoning.',
    popular: true,
  },
  {
    id: 'chips-large',
    name: 'Large Crispy Chips (with Aromat)',
    category: 'chips',
    price: 35,
    image: '/assets/menu_full/chips_large.jpg',
    description: 'Big sharing portion of crispy golden chips with that unforgettable yellow Aromat punch.',
    popular: true,
    badge: 'Sharing Size',
  },
  {
    id: 'fish-and-chips',
    name: 'Fish + Chips or Salad (with Aromat)',
    category: 'chips',
    price: 70,
    image: '/assets/menu_full/fish_and_chips.jpg',
    description: 'Crispy golden battered hake fillet served with hot seasoned chips or a crisp fresh side salad.',
    popular: true,
    badge: 'Crispy Golden Hake',
  },

  // Supreme Kota (Full authentic images with background)
  {
    id: 'mince-kota',
    name: 'Supreme Mince Kota (with Aromat)',
    category: 'kota',
    price: 50,
    image: '/assets/menu_full/mince_kota.jpg',
    description: 'Supreme Kota stuffed with savoury seasoned beef mince, crispy chips, fried egg, melted cheese, and atchar.',
    popular: true,
    badge: 'Granny’s Special Mince',
  },
  {
    id: 'kota-base',
    name: 'Supreme Kota Base (Chips, Cheese, Egg + Atchar)',
    category: 'kota',
    price: 35,
    image: '/assets/menu_full/supreme_kota.jpg',
    description: 'Hollowed fresh quarter loaf stuffed with crispy hot chips, melted cheese, fried egg, and spicy mango atchar.',
    popular: true,
    badge: 'Fourways Commuter Favourite',
  },

  // Breakfast & Amagwinya (Full authentic image with background)
  {
    id: 'amagwinya-plain',
    name: 'Fresh Amagwinya (Golden Vetkoek)',
    category: 'breakfast',
    price: 1.5,
    image: '/assets/menu_full/amagwinya.jpg',
    description: 'Golden fried, fluffy on the inside, crisp on the outside. Served fresh hot from the pot with your choice of savory toppings.',
    popular: true,
    badge: 'Fresh from 06:00 AM • From R1.50',
  },

  // Salads (Full authentic images with background)
  {
    id: 'coleslaw',
    name: 'Tangy Homestyle Coleslaw',
    category: 'salads',
    price: 15,
    image: '/assets/menu_full/coleslaw.jpg',
    description: 'Crisp hand-shredded cabbage and sweet grated carrots tossed in Granny’s chilled, creamy homemade dressing.',
    popular: true,
    badge: "Granny's Homemade Dressing • R15",
  },
  {
    id: 'green-salad',
    name: 'Fresh Green Garden Salad',
    category: 'salads',
    price: 20,
    image: '/assets/menu_full/green_salad.jpg',
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
