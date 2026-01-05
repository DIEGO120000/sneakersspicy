
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  asset3d?: string; // Base64 or Blob URL of the 3D file
  description: string;
  category: 'Shoes' | 'Apparel' | 'Accessories' | 'Limited';
  availableSizes: number[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  links?: { title: string; uri: string }[];
}

export interface BrandStock {
  name: string;
  logo: string;
  availableSizes: number[];
  marqueeImage: string;
}
