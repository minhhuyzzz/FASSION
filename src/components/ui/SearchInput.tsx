"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { searchProducts } from "@/lib/productSearch";
import type { Product } from "@/types/product";

// Định nghĩa kiểu dữ liệu (Interface) cho Props
interface SearchInputProps {
  initialValue?: string;
}

export default function SearchInput({ initialValue = "" }: SearchInputProps) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cập nhật lại query khi giá trị initialValue thay đổi (khi quay lại trang)
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Xử lý tìm kiếm gợi ý
  useEffect(() => {
    if (query.trim().length >= 1) {
      const matches = searchProducts(products, query);
      setSuggestions(matches.slice(0, 5)); 
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto z-[100]">
      <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 focus-within:border-rose-accent/40 focus-within:bg-white/[0.05] transition-all duration-500">
        <Search size={20} className="text-rose-accent/60 mr-4 shrink-0" strokeWidth={1.5} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
          placeholder="Tìm tên mẫu, chất liệu, mã sp..."
          className="flex-1 bg-transparent outline-none text-ivory text-base font-light placeholder:text-white/20 tracking-wide"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-white/20 hover:text-rose-accent transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-3 bg-[#0A0A0A] border border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden backdrop-blur-2xl"
          >
            {suggestions.length > 0 ? (
              <div className="py-3">
                <div className="px-5 py-2 flex items-center justify-between border-b border-white/5 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-rose-accent font-bold">Gợi ý từ Atelier</span>
                  <Sparkles size={12} className="text-rose-accent/40" />
                </div>
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSearch(product.name)}
                    className="w-full flex items-center gap-5 px-5 py-3 hover:bg-white/[0.04] transition-all text-left group"
                  >
                    <div className="relative w-12 h-16 bg-white/[0.03] shrink-0 rounded-sm overflow-hidden ring-1 ring-white/10">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-ivory text-sm font-playfair italic truncate group-hover:text-rose-accent transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[9px] text-white/30 uppercase tracking-[0.15em] mt-1.5 flex items-center gap-2">
                        <span>{product.category}</span>
                        <span className="w-1 h-1 bg-white/10 rounded-full" />
                        <span className="text-rose-accent/60 font-inter">{product.price} VNĐ</span>
                      </p>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => handleSearch(query)}
                  className="w-full py-4 text-[9px] uppercase tracking-[0.4em] text-white/25 hover:text-rose-accent hover:bg-white/[0.02] transition-all border-t border-white/5 mt-2 font-bold"
                >
                  Xem tất cả kết quả cho &quot;{query}&quot;
                </button>
              </div>
            ) : (
              <div className="p-10 text-center text-white/20 text-[10px] uppercase tracking-widest italic">
                Atelier chưa tìm thấy tuyệt tác phù hợp...
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}