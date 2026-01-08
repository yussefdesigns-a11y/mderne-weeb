
export type Category = 'Men' | 'Women' | 'Streetwear' | 'Essentials' | 'Modern';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  longDescription: string;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  sizes: string[];
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface LookbookItem {
  id: string;
  imageUrl: string;
  location: string;
  productName: string;
}

export interface CategoryCard {
  name: Category;
  image: string;
  count: number;
}
