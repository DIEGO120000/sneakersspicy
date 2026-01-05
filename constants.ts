
import { Product, BrandStock } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 's1',
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Nike',
    price: 180,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    description: 'The sneaker that started it all. Premium leather and iconic silhouette.',
    category: 'Shoes',
    availableSizes: [7, 8, 9, 10, 11, 12]
  },
  {
    id: 's2',
    name: 'Adidas Ultraboost Light',
    brand: 'Adidas',
    price: 190,
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=800',
    description: 'Experience epic energy with the lightest Ultraboost ever made.',
    category: 'Shoes',
    availableSizes: [8, 9, 10, 11, 12]
  },
  {
    id: 's3',
    name: 'Converse Chuck 70 Vintage',
    brand: 'Converse',
    price: 90,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800',
    description: 'A modern craftsmanship take on the classic 1970s design.',
    category: 'Shoes',
    availableSizes: [5, 6, 7, 8, 9, 10, 11]
  },
  {
    id: 's4',
    name: 'Puma RS-X Efekt PRM',
    brand: 'Puma',
    price: 120,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    description: 'Futuristic design meets retro aesthetic for ultimate street style.',
    category: 'Shoes',
    availableSizes: [8, 9, 10, 11]
  },
  {
    id: 's5',
    name: 'Nike Air Force 1 07',
    brand: 'Nike',
    price: 115,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    description: 'The classic basketball original with crisp leather and bold details.',
    category: 'Shoes',
    availableSizes: [7, 8, 9, 10, 11, 12, 13]
  },
  {
    id: 's6',
    name: 'Adidas Forum Low',
    brand: 'Adidas',
    price: 100,
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800',
    description: 'More than just a shoe, it is a statement of style and comfort.',
    category: 'Shoes',
    availableSizes: [7, 8, 9, 10, 11]
  }
];

export const TENNIS_BRANDS: BrandStock[] = [
  { 
    name: 'Nike', 
    logo: 'N', 
    availableSizes: [7, 8, 9, 10, 11, 12, 13],
    marqueeImage: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    name: 'Adidas', 
    logo: 'A', 
    availableSizes: [6, 7, 8, 9, 10, 11, 12],
    marqueeImage: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    name: 'Converse', 
    logo: 'C', 
    availableSizes: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    // Se ha corregido la imagen por una que muestra claramente unos Converse Chuck Taylor negros de corte alto.
    marqueeImage: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    name: 'Puma', 
    logo: 'P', 
    availableSizes: [7, 8, 9, 10, 11, 12],
    marqueeImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1200'
  }
];

export const CATEGORIES = ['All', 'Shoes', 'Apparel', 'Accessories'];
