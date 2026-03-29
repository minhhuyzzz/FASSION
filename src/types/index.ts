export type TagType = 'New' | 'Bestseller' | 'Limited' | 'Couture';

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: string;
  url: string;
  is_main: boolean;
  alt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  tag: TagType | null;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}

// Kiểu dữ liệu cho Giỏ hàng
export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}