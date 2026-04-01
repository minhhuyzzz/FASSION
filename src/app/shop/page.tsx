"use client";
import { useState, useMemo, useEffect } from "react";
import { products } from "@/data/products";
import ProductModal from "@/components/sections/ProductModal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, ArrowUpDown, SlidersHorizontal, X } from "lucide-react";

// Cấu trúc danh mục 2 cấp
const navigation = [
  {
    id: "all",
    label: "Tất cả",
    children: []
  },
  {
    id: "fashion",
    label: "Thời trang",
    children: ["Áo", "Quần", "Set", "Váy"]
  },
  {
    id: "accessories",
    label: "Phụ kiện",
    children: ["Đồng hồ", "Túi xách", "Dây chuyền"]
  }
];

const sortOptions = [
  { label: "Mặc định", value: "default" },
  { label: "Giá: Thấp đến Cao", value: "price-asc" },
  { label: "Giá: Cao đến Thấp", value: "price-desc" },
];

export default function ShopPage() {
  const [activeParent, setActiveParent] = useState("all");
  const [activeChild, setActiveChild] = useState("all");
  const [maxPrice, setMaxPrice] = useState(200000000); 
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/\./g, ""));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Logic lọc theo 2 cấp
      let matchCategory = false;
      if (activeParent === "all") {
        matchCategory = true;
      } else {
        const parentObj = navigation.find(n => n.id === activeParent);
        if (activeChild === "all") {
          // Nếu chọn cấp cha nhưng chưa chọn con cụ thể -> Hiện tất cả thuộc cha
          matchCategory = parentObj?.children.includes(p.category) || false;
        } else {
          // Lọc chính xác theo cấp con
          matchCategory = p.category === activeChild;
        }
      }

      const priceNum = parsePrice(p.price);
      const matchPrice = priceNum <= maxPrice;
      return matchCategory && matchPrice;
    });

    if (sortBy === "price-asc") result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sortBy === "price-desc") result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    return result;
  }, [activeParent, activeChild, maxPrice, sortBy]);

  return (
    <main className="min-h-screen bg-noir pt-32 pb-20 px-6 md:px-12 relative">
      <div className="max-w-[1600px] mx-auto">
        
        {/* TIÊU ĐỀ SHOP */}
        <header className="mb-20 text-center relative">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-rose-accent text-[0.6rem] tracking-[0.6em] uppercase mb-4 font-bold"
          >
            Serana Atelier
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-playfair text-7xl md:text-9xl text-ivory italic tracking-tighter"
          >
            Bộ Sưu Tập
          </motion.h1>
        </header>

        {/* THANH LỌC SẢN PHẨM - PHÂN CẤP TINH TẾ */}
        <div className="sticky top-20 z-40 bg-noir/90 backdrop-blur-xl border-y border-white/5 py-8 mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            
            {/* DANH MỤC 2 CẤP */}
            <div className="flex flex-col gap-6 w-full lg:w-auto">
              {/* Cấp 1: Parent */}
              <div className="flex items-center gap-8 border-b border-white/5 pb-4">
                {navigation.map((nav) => (
                  <button 
                    key={nav.id} 
                    onClick={() => {
                      setActiveParent(nav.id);
                      setActiveChild("all");
                    }}
                    className={`text-[0.7rem] tracking-[0.4em] uppercase transition-all relative pb-2 ${activeParent === nav.id ? 'text-rose-accent font-bold' : 'text-white/20 hover:text-white'}`}
                  >
                    {nav.label}
                    {activeParent === nav.id && (
                      <motion.div layoutId="parent-line" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-rose-accent" />
                    )}
                  </button>
                ))}
              </div>

              {/* Cấp 2: Children (Chỉ hiện khi có con) */}
              <AnimatePresence mode="wait">
                {activeParent !== "all" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-wrap items-center gap-6"
                  >
                    <button 
                      onClick={() => setActiveChild("all")}
                      className={`text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1 rounded-full border transition-all ${activeChild === "all" ? 'bg-white/10 border-white/20 text-white' : 'border-transparent text-white/40'}`}
                    >
                      Xem tất cả {navigation.find(n => n.id === activeParent)?.label}
                    </button>
                    {navigation.find(n => n.id === activeParent)?.children.map((child) => (
                      <button 
                        key={child}
                        onClick={() => setActiveChild(child)}
                        className={`text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1 rounded-full border transition-all ${activeChild === child ? 'bg-rose-accent/10 border-rose-accent/30 text-rose-accent' : 'border-transparent text-white/40 hover:text-white'}`}
                      >
                        {child}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BỘ LỌC GIÁ & SẮP XẾP */}
            <div className="flex items-center gap-12 w-full lg:w-auto">
              {/* Thanh trượt giá 200tr */}
              <div className="flex flex-col gap-3 min-w-[280px]">
                <div className="flex justify-between items-center text-[0.55rem] uppercase tracking-widest text-white/30">
                  <span>Mức giá tối đa</span>
                  <span className="text-rose-accent font-bold">{maxPrice.toLocaleString()} VNĐ</span>
                </div>
                <input 
                  type="range" min="500000" max="200000000" step="1000000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-[2px] bg-white/10 appearance-none cursor-pointer accent-rose-accent"
                  style={{ background: `linear-gradient(to right, #A4717A 0%, #A4717A ${(maxPrice/200000000)*100}%, #1a1a1a ${(maxPrice/200000000)*100}%, #1a1a1a 100%)` }}
                />
              </div>

              {/* SẮP XẾP */}
              <div className="relative group">
                <button className="flex items-center gap-4 bg-white text-black px-8 py-3 text-[0.65rem] tracking-[0.4em] uppercase font-bold hover:bg-rose-accent hover:text-white transition-all">
                  <span>{sortOptions.find(o => o.value === sortBy)?.label || "Sắp xếp"}</span>
                  <ArrowUpDown size={14} />
                </button>
                <div className="absolute top-full right-0 w-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 z-50">
                  <div className="bg-white text-black shadow-2xl">
                    {sortOptions.map(opt => (
                      <div key={opt.value} onClick={() => setSortBy(opt.value)} className="px-6 py-4 text-[0.6rem] uppercase tracking-widest hover:bg-black hover:text-white cursor-pointer transition-colors border-b border-black/5 last:border-0 font-medium">
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* LƯỚI SẢN PHẨM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProducts.map((product) => (
              <motion.div
                key={product.id} layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0d0d0d] mb-8">
                  <Image 
                    src={product.images[0]} alt={product.name} fill 
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-noir/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <span className="bg-white text-noir px-8 py-3 text-[0.6rem] tracking-[0.5em] uppercase font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                        Khám phá
                     </span>
                  </div>
                </div>
                <div className="space-y-3 text-center px-4">
                  <h3 className="font-playfair text-2xl text-ivory tracking-tight italic group-hover:text-rose-accent transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="font-inter text-sm text-white/40 tracking-wider font-light">{product.price} VNĐ</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>
    </main>
  );
}