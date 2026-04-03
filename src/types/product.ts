/** Sản phẩm dùng chung cho shop, modal giỏ hàng và section nổi bật. */
export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  images: string[];
  description?: string;
  care?: string;
  tag?: string;
  sizes?: string[];
  /** Gợi ý hiển thị trên thẻ (nếu không có, dùng category) */
  material?: string;
};
