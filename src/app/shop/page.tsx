"use client";
import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductModal from "@/components/sections/ProductModal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, ArrowUpDown } from "lucide-react";

const categories = ["Tất cả", "Áo", "Váy", "Cưới", "Phụ kiện"];
const sizes = ["S", "M", "L", "XL", "Freesize"];
const priceRanges = [
  { label: "Tất cả mức giá", value: "all" },
  { label: "Dưới 1.500.000đ", value: "under1.5" },
  { label: "1.500.000đ - 2.500.000đ", value: "1.5to2.5" },
  { label: "Trên 2.500.000đ", value: "over2.5" },
];
const sortOptions = [
  { label: "Mặc định", value: "default" },
  { label: "Giá: Thấp đến Cao", value: "price-asc" },
  { label: "Giá: Cao đến Thấp", value: "price-desc" },
  { label: "Tên: A - Z", value: "name-asc" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [activeSize, setActiveSize] = useState("all");
  const [activePrice, setActivePrice] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/\./g, ""));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCategory = activeCategory === "Tất cả" || p.category === activeCategory;
      const matchSize = activeSize === "all" || p.sizes.includes(activeSize);
      const priceNum = parsePrice(p.price);
      let matchPrice = true;
      if (activePrice === "under1.5") matchPrice = priceNum < 1500000;
      else if (activePrice === "1.5to2.5") matchPrice = priceNum >= 1500000 && priceNum <= 2500000;
      else if (activePrice === "over2.5") matchPrice = priceNum > 2500000;
      return matchCategory && matchSize && matchPrice;
    });

    if (sortBy === "price-asc") result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sortBy === "price-desc") result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else if (sortBy === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [activeCategory, activeSize, activePrice, sortBy]);

  return (
    <main className="min-h-screen bg-noir pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1520px] mx-auto">
        
        {/* TIÊU ĐỀ TIẾNG VIỆT */}
        <header className="mb-10 text-center space-y-4">
          <h1 className="font-playfair text-6xl md:text-7xl text-ivory italic tracking-tighter">Bộ Sưu Tập</h1>
          <div className="h-[1px] w-20 bg-rose-accent mx-auto"></div>
        </header>

        {/* THANH BỘ LỌC */}
        <div className="sticky top-24 z-30 bg-noir/90 backdrop-blur-md border-y border-white/5 py-4 mb-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            
            {/* PHẦN DANH MỤC & KÍCH CỠ */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 w-full lg:w-auto">
              <div className="flex gap-6 border-r border-white/10 pr-8">
                {categories.map((cat) => (
                  <button 
                    key={cat} onClick={() => setActiveCategory(cat)}
                    className={`text-[0.6rem] tracking-[0.3em] uppercase transition-all ${activeCategory === cat ? 'text-rose-accent font-bold' : 'text-white/30 hover:text-white'}`}
                  > {cat} </button>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-[0.5rem] text-white/20 tracking-widest uppercase italic">Kích cỡ:</span>
                <div className="flex gap-2">
                  {["all", ...sizes].map(s => (
                    <button 
                      key={s} onClick={() => setActiveSize(s)}
                      className={`w-8 h-8 flex items-center justify-center text-[0.6rem] border transition-all ${activeSize === s ? 'bg-ivory text-noir border-ivory' : 'border-white/5 text-white/40 hover:border-white/20'}`}
                    > {s === 'all' ? 'Tất cả' : s} </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PHẦN LỌC GIÁ & SẮP XẾP */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-center lg:justify-end">
              
              {/* Lọc Giá - Đã sửa lỗi mất menu khi hover */}
              <div className="relative group min-w-[180px]">
                <button className="w-full flex items-center justify-between border border-white/10 px-4 py-2.5 text-[0.6rem] tracking-widest text-white/60 group-hover:border-rose-accent transition-all">
                  <span>{priceRanges.find(r => r.value === activePrice)?.label}</span>
                  <ChevronDown size={12} />
                </button>
                {/* Lớp đệm ẩn pt-2 giúp nối liền nút và menu */}
                <div className="absolute top-full right-0 w-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
                   <div className="bg-[#111] border border-white/10 shadow-2xl">
                    {priceRanges.map(range => (
                      <div key={range.value} onClick={() => setActivePrice(range.value)} className="px-4 py-3 text-[0.55rem] uppercase tracking-widest text-white/40 hover:text-rose-accent hover:bg-white/5 cursor-pointer">
                        {range.label}
                      </div>
                    ))}
                   </div>
                </div>
              </div>

              {/* Sắp xếp - Đã sửa lỗi mất menu khi hover */}
              <div className="relative group min-w-[180px]">
                <button className="w-full flex items-center justify-between bg-white text-black px-4 py-2.5 text-[0.6rem] tracking-widest uppercase font-bold transition-all">
                  <span>Sắp xếp</span>
                  <ArrowUpDown size={12} />
                </button>
                <div className="absolute top-full right-0 w-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
                   <div className="bg-white text-black border border-black/5 shadow-2xl font-medium">
                    {sortOptions.map(opt => (
                      <div key={opt.value} onClick={() => setSortBy(opt.value)} className={`px-4 py-3 text-[0.55rem] uppercase tracking-widest hover:bg-noir hover:text-white cursor-pointer transition-colors ${sortBy === opt.value ? 'font-bold bg-gray-100' : ''}`}>
                        {opt.label}
                      </div>
                    ))}
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* THÔNG BÁO SỐ LƯỢNG TIẾNG VIỆT */}
        <div className="mb-12 flex items-center gap-4 px-2">
          <div className="h-[1px] flex-1 bg-white/5"></div>
          <span className="text-[0.5rem] tracking-[0.4em] uppercase text-white/20 italic">
            Tìm thấy {filteredAndSortedProducts.length} sản phẩm
          </span>
          <div className="h-[1px] flex-1 bg-white/5"></div>
        </div>

        {/* LƯỚI SẢN PHẨM */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-40">
             <p className="text-white/20 font-inter text-sm uppercase tracking-widest mb-4">Không tìm thấy sản phẩm phù hợp</p>
             <button onClick={() => {setActiveSize("all"); setActivePrice("all"); setActiveCategory("Tất cả"); setSortBy("default")}} className="text-[0.6rem] uppercase tracking-widest text-rose-accent border-b border-rose-accent/30 pb-1">Đặt lại bộ lọc</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedProducts.map((product) => (
                <motion.div
                  key={product.id} layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#161616] mb-8 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-700">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-[2s] scale-[1.01] group-hover:scale-110" />
                    {/* Nút Xem Nhanh - Đã sửa lỗi mất khi di chuột */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-noir/20">
                      <span className="bg-white text-noir px-6 py-2.5 text-[0.6rem] tracking-[0.3em] uppercase font-bold shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Xem nhanh
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 text-center px-4">
                    <h3 className="font-playfair text-2xl text-ivory tracking-tight italic group-hover:text-rose-accent transition-colors leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center gap-4">
                       <span className="h-[1px] w-4 bg-white/10"></span>
                       <p className="font-inter text-sm text-white/60 tracking-wider font-light">{product.price} VNĐ</p>
                       <span className="h-[1px] w-4 bg-white/10"></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>
    </main>
  );
}