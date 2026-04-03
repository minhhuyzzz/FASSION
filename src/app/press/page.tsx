"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Share2, ExternalLink, Newspaper } from "lucide-react";
import Link from "next/link";

const pressReleases = [
  {
    id: 1,
    source: "VOGUE VIETNAM",
    date: "01.2026",
    title: "SEREsNA: Định nghĩa lại sự xa xỉ thầm lặng tại Sài Gòn",
    size: "large"
  },
  {
    id: 2,
    source: "HARPER'S BAZAAR",
    date: "12.2025",
    title: "BST 'Lửa & Lụa' và hành trình chinh phục giới mộ điệu",
    size: "small"
  },
  {
    id: 3,
    source: "ELLE DECOR",
    date: "11.2025",
    title: "Bên trong Atelier Gò Vấp - Nơi những giấc mơ bắt đầu",
    size: "medium"
  },
  {
    id: 4,
    source: "LOOFFICIEL",
    date: "10.2025",
    title: "Nữ quyền và thời trang thiết kế độc bản",
    size: "small"
  }
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[var(--color-ivory)] pb-32">
      
      {/* 1. TICKER TAPE (DÒNG CHỮ CHẠY - ĐIỂM NHẤT KHÁC BIỆT) */}
      <div className="pt-32 bg-black overflow-hidden py-4 border-y border-white/10">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white text-[10px] uppercase tracking-[0.5em] mx-10 font-bold">
              SERENA MEDIA CENTER — LATEST UPDATES — 2026 COLLECTION OUT NOW — 
            </span>
          ))}
        </motion.div>
      </div>

      {/* 2. BỐ CỤC CHIA DỌC (VERTICAL SPLIT) */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 mt-20">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* CỘT TRÁI CỐ ĐỊNH (STUCK ON SCROLL) */}
          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-12 mb-16 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-7xl italic text-black leading-none mb-8">
                Tin tức & <br /> Truyền thông
              </h1>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-black/50 leading-relaxed max-w-xs">
                Kho lưu trữ các ấn bản báo chí, thông cáo và tư liệu hình ảnh chính thức từ thương hiệu SERENA.
              </p>
            </motion.div>

            <div className="space-y-6 pt-12 border-t border-black/10">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black">Liên hệ báo chí</h3>
              <p className="text-sm italic font-light">press@serena.vn</p>
              <p className="text-sm italic font-light">+84 905 111 222</p>
            </div>

            {/* DOWNLOAD PRESS KIT (CARD KHÁC BIỆT) */}
            <motion.div 
              className="p-8 bg-black text-white rounded-none space-y-6 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Newspaper size={60} />
              </div>
              <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold relative z-10">Press Kit 2026</h4>
              <p className="text-[0.65rem] text-white/40 uppercase tracking-widest relative z-10">Tải trọn bộ tư liệu hình ảnh và thông tin thương hiệu (PDF/JPG)</p>
              <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/20 pb-2 hover:border-white transition-all relative z-10">
                Download <Download size={14} />
              </button>
            </motion.div>
          </div>

          {/* CỘT PHẢI: MASONRY FEED (LƯỚI KHÔNG ĐỀU) */}
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-8">
              {pressReleases.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`border border-black/10 p-10 flex flex-col justify-between hover:bg-white transition-all duration-500 group ${
                    item.size === 'large' ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono tracking-widest text-black/40">{item.date}</span>
                    <Share2 size={16} strokeWidth={1} className="text-black/20 group-hover:text-black cursor-pointer" />
                  </div>
                  
                  <div className="space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--color-rose-accent)] font-bold italic">{item.source}</span>
                    <h2 style={{ fontFamily: 'var(--font-playfair)' }} className={`italic text-black leading-tight ${
                      item.size === 'large' ? 'text-5xl' : 'text-3xl'
                    }`}>
                      {item.title}
                    </h2>
                  </div>

                  <div className="flex justify-end pt-6">
                    <Link href="#" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Chi tiết <ExternalLink size={12} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* PHẦN LOAD MORE TRANG TRÍ */}
            <div className="mt-16 text-center">
              <button className="text-[10px] uppercase tracking-[0.5em] border-b border-black/10 pb-2 hover:text-[var(--color-rose-accent)] transition-all">
                Xem kho lưu trữ cũ hơn
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOGO WALL (ĐIỂM NHẤT KHÁC BIỆT CUỐI TRANG) */}
      <section className="mt-40 py-24 bg-white/50 border-y border-black/5 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center items-center gap-16 md:gap-32 grayscale opacity-30">
          <span className="text-2xl font-serif italic tracking-tighter">VOGUE</span>
          <span className="text-2xl font-serif italic tracking-tighter">BAZAAR</span>
          <span className="text-2xl font-serif italic tracking-tighter">ELLE</span>
          <span className="text-2xl font-serif italic tracking-tighter">L'OFFICIEL</span>
        </div>
      </section>

    </main>
  );
}