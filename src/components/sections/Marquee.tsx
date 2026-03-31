"use client";

import { motion } from "framer-motion";

const items = [
  "Couture 2026", "✦", "Bridal Collection", "✦", "Handcrafted in Saigon", 
  "✦", "As Seen In Vogue", "✦", "Bespoke Atelier", "✦", "Artisanal Excellence", "✦"
];

export default function Marquee() {
  // Nhân đôi để tạo vòng lặp vô tận
  const duplicatedItems = [...items, ...items];

  return (
    <div className="bg-black py-4 overflow-hidden border-y border-white/5 flex">
      <motion.div 
        className="flex whitespace-nowrap"
        // CHỈ CẦN DÒNG NÀY: Chạy từ 0 đến -50% chiều dài
        animate={{ x: [0, "-50%"] }} 
        transition={{ 
          repeat: Infinity, 
          duration: 20, 
          ease: "linear" 
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span
            key={i}
            className="font-inter text-[0.6rem] tracking-[0.4em] text-white uppercase mx-10 font-light italic"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}