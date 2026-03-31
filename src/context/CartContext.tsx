"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Thêm sản phẩm (kèm size) vào giỏ
  const addToCart = (product: any) => {
    setCartItems((prev) => [...prev, product]);
  };

  // Xóa một món khỏi giỏ theo vị trí (index)
  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Xóa toàn bộ giỏ hàng (Dùng sau khi thanh toán thành công)
  const clearCart = () => {
    setCartItems([]);
  };

  // Tính tổng tiền từ chuỗi giá "1.880.000"
  const cartTotal = cartItems.reduce((total, item) => {
    const priceNum = parseInt(item.price.replace(/\./g, ""));
    return total + priceNum;
  }, 0).toLocaleString("vi-VN");

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        cartCount: cartItems.length, 
        addToCart, 
        removeFromCart, 
        clearCart, // Đã thêm hàm này
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