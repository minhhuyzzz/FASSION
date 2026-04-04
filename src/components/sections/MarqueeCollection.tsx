"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import ProductModal from "@/components/sections/ProductModal";
import type { Product } from "@/types/product";

export default function MarqueeCollection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Nhân đôi mảng để tạo vòng lặp vô tận mượt mà
  const row1 = [...products, ...products, ...products];
  const row2 = [...products, ...products, ...products];

  return (
    <section className="relative py-24 overflow-hidden flex flex-col justify-center min-h-[90vh] bg-[#050505]">
      
      {/* NỀN PHA TRỘN MÀU NÂU HỒNG - Dùng GPU để render */}
      <div className="absolute inset-0 z-0 pointer-events-none will-change-transform">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5c3d42] opacity-20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#3d1f24] opacity-25 blur-[120px] rounded-full" />
      </div>

      {/* CHỮ SERENA HIỆU ỨNG GƯƠNG TỐI ƯU */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="relative px-16 py-10 rounded-[3rem] border border-white/5 bg-black/20 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center">
          <h2 className="font-playfair text-7xl md:text-9xl text-white/90 italic tracking-tighter">
            SERENA
          </h2>
          <div className="w-20 h-px bg-rose-accent/40 mt-4 mb-4" />
          <span className="text-[0.6rem] md:text-[0.7rem] tracking-[1.2em] uppercase text-rose-accent font-bold">
            Vision . Visual . Me
          </span>
        </div>
      </div>

      {/* DẢI ẢNH CHẠY BẰNG CSS (KHÔNG DÙNG JS NÊN KHÔNG LAG) */}
      <div className="relative z-10 space-y-8">
        
        {/* HÀNG 1: CHẠY TRÁI */}
        <div className="flex overflow-hidden select-none">
          <div className="flex gap-6 animate-scroll-left will-change-transform">
            {row1.map((product, idx) => (
              <MarqueeItem key={`r1-${idx}`} product={product} onSelect={setSelectedProduct} />
            ))}
          </div>
        </div>

        {/* HÀNG 2: CHẠY PHẢI (CHẬM) */}
        <div className="flex overflow-hidden select-none">
          <div className="flex gap-6 animate-scroll-right will-change-transform">
            {row2.map((product, idx) => (
              <MarqueeItem key={`r2-${idx}`} product={product} onSelect={setSelectedProduct} />
            ))}
          </div>
        </div>

      </div>

      {/* CSS CUSTOM CHO ANIMATION MƯỢT MÀ */}
      <style jsx>{`
        .animate-scroll-left {
          animation: scroll-left 100s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 120s linear infinite;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>

      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-30 pointer-events-none" />
    </section>
  );
}

function MarqueeItem({ product, onSelect }: any) {
  return (
    <div 
      onClick={() => onSelect(product)}
      className="relative w-48 h-36 sm:w-64 sm:h-48 md:w-[28rem] md:h-64 shrink-0 cursor-pointer overflow-hidden rounded-[2.5rem] transition-transform duration-500 hover:scale-105 active:scale-95"
    >
      <Image 
        src={product.images[0]} 
        alt={product.name}
        fill 
        className="object-cover"
        sizes="500px"
        priority={false}
      />
      <div className="absolute inset-0 bg-[#2d1a1c]/5 hover:bg-transparent transition-colors duration-300" />
    </div>
  );
}