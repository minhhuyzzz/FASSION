"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // 1. Thêm sản phẩm (Thông minh: Nếu trùng ID và Size thì tăng số lượng)
  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItemIndex !== -1) {
        // Nếu đã có món này với cùng size, chỉ tăng số lượng
        const updatedItems = [...prev];
        const currentQty = updatedItems[existingItemIndex].quantity || 1;
        const addQty = product.quantity || 1;
        updatedItems[existingItemIndex].quantity = currentQty + addQty;
        return updatedItems;
      }

      // Nếu là món mới hoặc size mới, thêm vào danh sách kèm quantity mặc định
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  // 2. CẬP NHẬT SỐ LƯỢNG (Hàm Quý cô đang thiếu)
  const updateQuantity = (index: number, newQty: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  // 3. Xóa một món khỏi giỏ
  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // 4. Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  // 5. TÍNH TỔNG TIỀN (Sửa lỗi: Giá x Số lượng)
  const totalAmount = cartItems.reduce((total, item) => {
    const priceNum = parseInt(item.price.replace(/\./g, ""));
    const qty = item.quantity || 1;
    return total + (priceNum * qty);
  }, 0);

  const cartTotal = totalAmount.toLocaleString("vi-VN");

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        cartCount: cartItems.length, 
        addToCart, 
        updateQuantity, // Cung cấp hàm này cho CartPage
        removeFromCart, 
        clearCart, 
        cartTotal 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};