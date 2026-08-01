export interface Product {
  id: string;
  name: string;
  category: 'Tote Bags' | 'Hand Bags' | 'Top Handle Bags' | 'Shoulder Bags' | 'Mini Bags';
  price: number; // In COP
  image: string;
  isNew?: boolean;
  colors: string[];
  dimensions: string;
  material: string;
  description: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  quantity: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
