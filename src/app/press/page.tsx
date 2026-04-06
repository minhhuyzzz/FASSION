"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bookmark, PenTool, Wind } from "lucide-react";

const newsArchive = [
  {
    date: "06.04.2026",
    category: "Kiến trúc Atelier",
    title: "Khai mở không gian sáng tạo mới tại Gò Vấp",
    description: "Một không gian tĩnh tại được thiết kế để những ý tưởng về lụa và đường cắt được thăng hoa. Nơi ánh sáng và bóng đổ hòa quyện trên từng sớ vải.",
  },
  {
    date: "25.03.2026",
    category: "Chế tác thủ công",
    title: "Kỹ thuật khâu dấu mũi kim trên dòng lụa tơ tằm thượng hạng",
    description: "Chúng tôi dành 48 giờ tỉ mỉ cho mỗi thiết kế độc bản, đảm bảo sự hoàn mỹ từ những chi tiết nhỏ nhất bên trong lớp lót.",
  },
  {
    date: "10.03.2026",
    category: "Bộ sưu tập",
    title: "Hành trình tìm về sự xa xỉ thầm lặng (Quiet Luxury)",
    description: "Sự ra đời của bộ sưu tập Xuân-Hè 2026, nơi những gam màu trung tính định nghĩa lại vẻ đẹp kiêu sa của người phụ nữ hiện đại.",
  },
  {
    date: "01.02.2026",
    category: "Triết lý thương hiệu",
    title: "Bền vững trong từng sợi vải",
    description: "Cam kết sử dụng nguồn nguyên liệu tự nhiên, thân thiện với làn da và tôn trọng môi trường trong mọi công đoạn tạo tác.",
  }
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] pb-40 cursor-default font-inter text-noir">
      
      {/* 1. TICKER TAPE (CHỈ CẬP NHẬT TRẠNG THÁI) */}
      <div className="pt-32 bg-noir overflow-hidden py-3 border-y border-white/5 select-none">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-white/80 text-[9px] uppercase tracking-[0.6em] mx-12 font-light">
              SERENA ATELIER — JOURNAL UPDATES — SPRING SUMMER 2026 — CRAFTED IN SAIGON — 
            </span>
          ))}
        </motion.div>
      </div>

      {/* 2. HEADER TẬP SAN */}
      <header className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400">Archives & Records</p>
          <h1 className="font-playfair text-8xl md:text-9xl italic font-light leading-tight">Truyền thông</h1>
          <div className="w-12 h-px bg-rose-accent mx-auto mt-8"></div>
        </motion.div>
      </header>

      {/* 3. DANH SÁCH TIN TỨC (MỚI HOÀN TOÀN) */}
      <section className="max-w-5xl mx-auto px-6 mt-32">
        <div className="space-y-32">
          {newsArchive.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="group"
            >
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Cột ngày tháng */}
                <div className="md:col-span-3 pt-2">
                  <div className="flex items-center gap-4 text-gray-300">
                    <span className="text-[11px] font-mono tracking-tighter uppercase">{item.date}</span>
                    <div className="h-[1px] flex-1 bg-gray-100"></div>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-rose-accent mt-3 font-bold italic">
                    {item.category}
                  </p>
                </div>

                {/* Cột nội dung chính */}
                <div className="md:col-span-9 space-y-6">
                  <h2 className="font-playfair text-4xl md:text-5xl italic leading-tight text-noir/90">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 font-light leading-relaxed text-lg max-w-2xl">
                    {item.description}
                  </p>
                  
                  {/* Ký hiệu đánh dấu - Chỉ trang trí */}
                  <div className="flex items-center gap-2 pt-4 opacity-20">
                    <PenTool size={12} />
                    <span className="text-[8px] uppercase tracking-widest">Edited by Serena Team</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 4. CHÂN TRANG TRUYỀN THÔNG (TĨNH) */}
      <section className="mt-60 border-t border-gray-100 pt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-left space-y-2">
            <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400">Liên hệ Lưu trữ</p>
            <p className="font-playfair italic text-lg text-noir/60">press@serena.vn</p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col items-center opacity-10">
               <Wind size={32} strokeWidth={1} />
               <span className="text-[8px] uppercase tracking-widest mt-2">Silence</span>
            </div>
            <div className="flex flex-col items-center opacity-10">
               <Bookmark size={32} strokeWidth={1} />
               <span className="text-[8px] uppercase tracking-widest mt-2">Craft</span>
            </div>
          </div>

          <div className="text-right space-y-2">
            <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400">Bản quyền nội bộ</p>
            <p className="font-inter text-[10px] text-gray-300">© 2026 SERENA ATELIER. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </section>

    </main>
  );
}