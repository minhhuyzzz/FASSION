"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Scissors, MapPin } from "lucide-react";

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain overflow-hidden">
      
      {/* PHẦN 1: HERO - TUYÊN NGÔN THƯƠNG HIỆU */}
      <section className="relative pt-60 pb-32 px-6 md:px-12 text-center overflow-hidden">
        <motion.div {...fadeIn}>
          <span className="line-decorator uppercase tracking-[0.5em] text-[10px] text-black/60 mb-8 block font-medium">Di sản SERENA</span>
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-6xl md:text-8xl italic leading-tight text-black mb-12">
            Nơi nghệ thuật <br /> kể chuyện qua <br /> lụa là
          </h1>
          <div className="max-w-2xl mx-auto border-t border-black/10 pt-12">
            <p className="font-inter text-[0.9rem] leading-[2.5] text-black/70 uppercase tracking-widest font-light">
              SERENA ra đời từ khát khao định nghĩa lại vẻ đẹp của người phụ nữ hiện đại: 
              Không phô trương, nhưng đầy quyền uy. Thanh lịch, nhưng vẫn đậm nét riêng tư.
            </p>
          </div>
        </motion.div>
      </section>

      {/* PHẦN 2: TẦM NHÌN - HÌNH ẢNH ĐAN XEN */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            className="relative aspect-[3/4] bg-black/5 shadow-luxury overflow-hidden border border-black/5"
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img 
              src="/images/sp21.3.jpg" 
              alt="Art of Tailoring" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
            />
          </motion.div>
          
          <motion.div className="space-y-10" {...fadeIn}>
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl italic text-black leading-snug">
              Mỗi tạo tác là một <br /> bản thể độc nhất
            </h2>
            <p className="font-inter text-[0.85rem] text-black/70 leading-[2.2] font-medium text-justify uppercase tracking-wider">
              Tại SERENA, chúng tôi không chỉ may đo quần áo. Chúng tôi kiến tạo sự tự tin. 
              Mỗi thiết kế từ dòng Couture đến Ready-to-wear đều được chăm chút tỉ mỉ từ khâu chọn vải đến những đường chiết eo tinh tế nhất. 
              Chúng tôi tin rằng, trang phục đẹp nhất là trang phục khiến người mặc cảm thấy mình đang là phiên bản rạng rỡ nhất của chính mình.
            </p>
            <div className="pt-8 grid grid-cols-2 gap-10 border-t border-black/10">
                <div>
                    <span className="text-3xl font-light italic text-black mb-2 block tracking-tighter">100%</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-black font-bold">Thủ công cao cấp</span>
                </div>
                <div>
                    <span className="text-3xl font-light italic text-black mb-2 block tracking-tighter">Premium</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-black font-bold">Chất liệu tuyển chọn</span>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PHẦN 3: TRIẾT LÝ CỐT LÕI - NỀN ĐEN ĐỂ TẠO CHIỀU SÂU */}
      <section className="py-32 bg-black text-white px-6 md:px-12 relative overflow-hidden">
        {/* Họa tiết hạt nhiễu (grain) giả lập tạp chí cũ */}
        <div className="absolute inset-0 opacity-20 pointer-events-none grain"></div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-20 relative z-10">
          <motion.div className="text-center space-y-6" {...fadeIn}>
            <Scissors size={32} strokeWidth={1} className="mx-auto text-[var(--color-rose-accent)]" />
            <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl italic">Sự Tận Tâm</h3>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 leading-loose">
              Từng đường kim mũi chỉ là lời hứa về chất lượng vượt thời gian.
            </p>
          </motion.div>

          <motion.div className="text-center space-y-6" {...fadeIn}>
            <Sparkles size={32} strokeWidth={1} className="mx-auto text-[var(--color-rose-accent)]" />
            <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl italic">Sự Sáng Tạo</h3>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 leading-loose">
              Kết hợp hoàn hảo giữa kỹ thuật cổ điển và hơi thở đương đại.
            </p>
          </motion.div>

          <motion.div className="text-center space-y-6" {...fadeIn}>
            <Heart size={32} strokeWidth={1} className="mx-auto text-[var(--color-rose-accent)]" />
            <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl italic">Sự Thấu Hiểu</h3>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 leading-loose">
              Mỗi khách hàng là một nguồn cảm hứng bất tận cho chúng tôi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PHẦN 4: LỜI MỜI GHÉ THĂM */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto text-center">
        <motion.div {...fadeIn} className="space-y-10">
          <MapPin size={28} strokeWidth={1} className="mx-auto text-black/20" />
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl italic text-black leading-tight">Ghé thăm Serena</h2>
          <p className="font-inter text-[0.8rem] text-black/60 uppercase tracking-[0.3em] max-w-xl mx-auto leading-loose font-medium italic">
            Tọa lạc tại Gò Vấp – Không gian của chúng tôi là nơi những ý tưởng hình thành và những giấc mơ lụa là trở thành hiện thực.
          </p>
          <div className="pt-12">
            <motion.a 
              href="/booking" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-16 py-6 bg-black text-white hover:bg-[var(--color-rose-accent)] transition-all duration-700 text-[0.7rem] uppercase tracking-[0.5em] inline-block font-bold shadow-2xl"
            >
              Đặt lịch tư vấn riêng
            </motion.a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}