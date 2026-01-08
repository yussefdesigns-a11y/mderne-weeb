
import { Product, Testimonial, LookbookItem, CategoryCard } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Oversized Midnight Tee',
    price: 45,
    category: 'Streetwear',
    description: 'A premium heavyweight cotton tee with a modern boxy fit.',
    longDescription: 'Crafted from 100% organic heavy-duty cotton, the Midnight Tee is designed for the modern street aesthetic. Featuring drop shoulders and a relaxed collar, it offers unmatched comfort without sacrificing style.',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 124,
    features: ['100% Organic Cotton', 'Heavyweight Fabric', 'Preshrunk'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Midnight Black', 'Slate Grey', 'Off-White']
  },
  {
    id: '2',
    name: 'Essential Slim Chinos',
    price: 85,
    category: 'Men',
    description: 'Perfectly tapered chinos for a clean, professional look.',
    longDescription: 'The Essential Chinos bridge the gap between comfort and sophistication. Made with a hint of stretch, these trousers move with you while maintaining a sharp silhouette from desk to dinner.',
    image: 'https://i.postimg.cc/s2xwCgFQ/BQG86-2-ZC1.png',
    rating: 4.9,
    reviews: 89,
    features: ['Stretch Twill', 'Reinforced Pockets', 'Premium Hardware'],
    sizes: ['30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Olive']
  },
  {
    id: '3',
    name: 'Silk Blend Slip Dress',
    price: 120,
    category: 'Women',
    description: 'Elegant and effortless slip dress for evening or casual wear.',
    longDescription: 'This luxurious silk blend slip dress features adjustable spaghetti straps and a subtle cowl neckline. It drapes beautifully over the body, making it a versatile piece for any wardrobe.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 56,
    features: ['Silk & Viscose Blend', 'Adjustable Straps', 'Bias Cut'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Champagne', 'Ruby', 'Noir']
  },
  {
    id: '4',
    name: 'Tech-Utility Cargo Pants',
    price: 110,
    category: 'Streetwear',
    description: 'High-performance cargo pants with multiple utility pockets.',
    longDescription: 'Fusing tactical functionality with urban style, these cargo pants are made from water-resistant nylon ripstop. Features include 6 functional pockets and adjustable ankle cuffs.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 142,
    features: ['Water Resistant', '6-Pocket Design', 'Durable Ripstop'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Shadow Grey', 'Forest', 'Desert']
  },
  {
    id: '5',
    name: 'Minimalist Wool Overcoat',
    price: 240,
    category: 'Modern',
    description: 'Tailored wool blend overcoat for a timeless winter silhouette.',
    longDescription: 'A winter staple designed with a structured shoulder and clean lines. This overcoat is fully lined and features a high-quality wool blend that provides warmth without excessive bulk.',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: 32,
    features: ['80% Virgin Wool', 'Fully Lined', 'Inner Pockets'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Camel', 'Charcoal', 'Navy']
  },
  {
    id: '6',
    name: 'Active-Seamless Set',
    price: 95,
    category: 'Women',
    description: 'Moisture-wicking seamless activewear set for ultimate comfort.',
    longDescription: 'Engineered for high-intensity training, this seamless set features a high-waisted legging and matching sports bra. The breathable fabric provides compression where you need it most.',
    image: 'https://images.unsplash.com/photo-1548330065-2956a164551c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 215,
    features: ['Seamless Technology', '4-Way Stretch', 'Breathable Mesh'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Lavender', 'Mint', 'Sky Blue']
  }
];

export const CATEGORIES: CategoryCard[] = [
  { 
    name: 'Men', 
    image: 'https://i.postimg.cc/NfvTkfpb/CDA47-1-ZC1-(1).png',
    count: 24
  },
  { 
    name: 'Women', 
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
    count: 32
  },
  { 
    name: 'Streetwear', 
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&q=80&w=800',
    count: 18
  },
  { 
    name: 'Modern', 
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800',
    count: 12
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    role: 'Fashion Blogger',
    content: "The quality of the Midnight Tee is insane. I've washed it 10 times and it still looks brand new. Best streetwear brand in the game.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Creative Director',
    content: "Minimalist designs that actually fit well. MODERN-STITCH is my go-to for capsule wardrobe essentials.",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '3',
    name: 'Jordan Smith',
    role: 'UX Designer',
    content: "Buying was so seamless. The AI stylist helped me pick the perfect outfit for my portfolio shoot. 10/10 experience.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'l1',
    imageUrl: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=800',
    location: 'Brooklyn, NY',
    productName: 'Oversized Midnight Tee'
  },
  {
    id: 'l2',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
    location: 'Shibuya, Tokyo',
    productName: 'Tech-Utility Cargo Pants'
  },
  {
    id: 'l3',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    location: 'Marais, Paris',
    productName: 'Silk Blend Slip Dress'
  },
  {
    id: 'l4',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
    location: 'Venice Beach, LA',
    productName: 'Essential Slim Chinos'
  }
];

export const BRAND_STORY_IMAGE = "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=1200";
