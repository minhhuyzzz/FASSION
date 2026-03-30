"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Đầm Thiên Nga Aria",
    category: "Haute Couture",
    price: "215.000.000đ",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=90",
    material: "Lụa organza thêu tay",
    tag: "Tuyệt Tác",
  },
  {
    id: 2,
    name: "Áo Cưới Evelyne",
    category: "Bridal Capsule",
    price: "310.000.000đ",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4a6bf2?w=900&q=90",
    material: "Satin duchess & ren Pháp",
    tag: "Bán Chạy",
  },
  {
    id: 3,
    name: "Valentina Grace",
    category: "Haute Couture",
    price: "245.000.000đ",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=900&q=90",
    material: "Ren Chantilly đính đá",
    tag: null,
  },
  {
    id: 4,
    name: "Iris Atelier Gown",
    category: "Limited Edition",
    price: "155.000.000đ",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=90",
    material: "Crepe lụa đính pha lê",
    tag: "Giới Hạn",
  },
];

const ROSE_ACCENT = "#A4717A";

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative bg-[#F5F2EF] overflow-hidden py-24 md:py-36">
      <div className="relative z-10 max-w-[1520px] mx-auto px-6 md:px-12">
        
        {/* HEADER */}
        <div ref={titleRef} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="flex items-center gap-6 mb-6"
            >
              <span className="font-inter text-[0.6rem] tracking-[0.4em] uppercase text-[#A4717A]">
                Bộ Sưu Tập
              </span>
              <div className="w-12 h-px bg-[#A4717A]/40" />
            </motion.div>

            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair font-normal leading-tight tracking-tight text-5xl md:text-7xl text-gray-900"
            >
              Tinh Hoa <span className="italic" style={{ color: ROSE_ACCENT }}>Nghệ Nhân</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/collections"
              className="group inline-flex items-center gap-4 border-b border-gray-900/20 pb-2 hover:border-[#A4717A] transition-colors duration-500"
            >
              <span className="font-inter text-[0.65rem] uppercase tracking-[0.2em] text-gray-900/60 group-hover:text-[#A4717A] transition-colors">
                Xem Toàn Bộ Tuyệt Tác
              </span>
              <ArrowRight size={14} className="text-gray-900/40 group-hover:text-[#A4717A] group-hover:translate-x-1.5 transition-all" />
            </Link>
          </motion.div>
        </div>

        {/* LƯỚI TẠP CHÍ: Cân bằng, gọn gàng, không bị lỗi vỡ khung */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Cột 1: Ảnh dọc lớn bên trái */}
          <div className="md:col-span-5">
            <ProductCard product={products[0]} index={0} aspect="aspect-[3/4.4]" inView={inView} />
          </div>

          {/* Cột 2: Cụm ảnh bên phải */}
          <div className="md:col-span-7 flex flex-col gap-4 md:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 md:gap-6">
              <div className="sm:col-span-7">
                <ProductCard product={products[1]} index={1} aspect="aspect-[4/3.2]" inView={inView} />
              </div>
              <div className="sm:col-span-5">
                <ProductCard product={products[2]} index={2} aspect="aspect-[4/3.2]" inView={inView} />
              </div>
            </div>
            {/* Ảnh ngang rộng bên dưới */}
            <ProductCard product={products[3]} index={3} aspect="aspect-[16/6.5]" wide inView={inView} />
          </div>
        </div>

      </div>
    </section>
  );
}

// COMPONENT CARD SẢN PHẨM
function ProductCard({ product, index, aspect, wide = false, inView }: any) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full w-full"
    >
      <div className={`relative ${aspect} overflow-hidden bg-gray-200 h-full w-full`}>
        {/* Ảnh */}
        <div className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-[0.25,0.46,0.45,0.94]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Lớp phủ Gradient đen dưới chân ảnh để chữ luôn đọc được */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Tag trạng thái */}
        {product.tag && (
          <div className="absolute top-5 left-5 z-10">
            <span className="font-inter text-[0.55rem] tracking-[0.2em] uppercase text-gray-900 bg-white/90 px-3 py-1.5 shadow-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Nút Yêu thích */}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white transition-colors duration-300 rounded-full"
        >
          <Heart size={14} className={`transition-colors ${wished ? "fill-[#A4717A] stroke-[#A4717A]" : "stroke-white"}`} />
        </button>

        {/* Thông tin sản phẩm nằm đè lên ảnh */}
        <div className={`absolute bottom-0 left-0 right-0 z-10 p-6 ${wide ? "flex flex-col sm:flex-row sm:items-end justify-between gap-4" : ""}`}>
          <div>
            <p className="font-inter text-[0.55rem] tracking-[0.3em] uppercase text-white/70 mb-2">
              {product.category}
            </p>
            <h3 className="font-playfair text-xl md:text-2xl text-white group-hover:text-[#A4717A] transition-colors duration-400">
              {product.name}
            </h3>
            <p className="font-cormorant italic text-white/60 text-sm mt-1">
              {product.material}
            </p>
          </div>

          <div className={`${wide ? "text-left sm:text-right" : "mt-3"}`}>
            <p className="font-cormorant text-lg text-white">
              {product.price}
            </p>
          </div>
        </div>

        {/* Vạch kẻ màu Hồng mượt mà chạy dưới cùng khi hover */}
        <div className="absolute bottom-0 left-0 h-1 bg-[#A4717A] w-0 group-hover:w-full transition-all duration-700 ease-out opacity-80" />
      </div>
    </motion.div>
  );
}