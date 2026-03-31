"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function BrandStoryPage() {
  const scrollReveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain overflow-hidden pb-32">
      
      {/* CHƯƠNG 1: KHỞI NGUỒN (HERO SECTION) */}
      <section className="relative h-screen flex items-center justify-center px-6">
        <motion.div 
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <span className="line-decorator uppercase tracking-[0.6em] text-[10px] text-black/40 mb-10 block">Khai sinh từ một giấc mơ</span>
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-7xl md:text-9xl italic leading-none text-black mb-12">
            Hơi thở của <br /> Di sản
          </h1>
          <p className="font-inter text-[0.75rem] uppercase tracking-[0.4em] text-black/60 max-w-lg mx-auto leading-relaxed">
            Nơi những thước lụa không chỉ là trang phục, mà là bản tuyên ngôn của tâm hồn.
          </p>
        </motion.div>
        
        {/* Background Image mờ ảo phía sau */}
        <div className="absolute inset-0 z-0 opacity-10">
            <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop" 
                alt="Fabric Detail"
                className="w-full h-full object-cover grayscale"
            />
        </div>
      </section>

      {/* CHƯƠNG 2: TRIẾT LÝ THIẾT KẾ (NARRATIVE) */}
      <section className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div className="lg:col-span-5" {...scrollReveal}>
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl md:text-5xl italic text-black mb-10 leading-tight">
              Sự im lặng <br /> đầy quyền uy
            </h2>
            <div className="space-y-8 font-inter text-[0.9rem] leading-[2.4] text-black/70 font-light text-justify uppercase tracking-widest">
              <p>
                SERANA ra đời giữa lòng Sài Gòn sôi động, nhưng lại chọn cho mình một nhịp thở khác biệt. Chúng tôi tin rằng sự sang trọng thật sự không đến từ những gì ồn ào nhất, mà từ những chi tiết tĩnh lặng và hoàn hảo nhất.
              </p>
              <p>
                Mỗi nhát kéo tại Atelier của chúng tôi là một sự cam kết. Cam kết với kỹ thuật Couture truyền thống và cam kết với cá tính độc bản của mỗi người phụ nữ.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-7 relative pl-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="aspect-[4/5] shadow-luxury overflow-hidden border border-black/5">
                <img 
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1887&auto=format&fit=crop" 
                    alt="Atelier Workshop" 
                    className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110"
                />
            </div>
            <div className="absolute -bottom-10 -left-10 w-2/3 aspect-square bg-[var(--color-rose-blush)]/20 -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* CHƯƠNG 3: NGHỆ THUẬT THỦ CÔNG (FULL WIDTH) */}
      <section className="py-40 bg-black text-white relative">
        <div className="absolute inset-0 opacity-20 grain pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
          <motion.div {...scrollReveal}>
            <Quote size={40} strokeWidth={1} className="mx-auto text-[var(--color-rose-accent)] mb-8 opacity-50" />
            <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl md:text-5xl italic leading-relaxed">
              "Chúng tôi không chạy theo xu hướng. Chúng tôi tạo ra những mảnh ghép của thời gian, nơi quá khứ và tương lai giao thoa trên từng thớ vải lụa."
            </p>
            <div className="h-[1px] w-24 bg-white/20 mx-auto mt-12 mb-6"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">Người sáng lập SERANA</span>
          </motion.div>
        </div>
      </section>

      {/* CHƯƠNG 4: SERANA WOMAN (IMAGE GRID) */}
      <section className="py-40 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center mb-24">
            <span className="line-decorator uppercase tracking-[0.5em] text-[10px] text-black/40 mb-6 block">Nàng là ai?</span>
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl italic text-black text-center">Người phụ nữ SERANA</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div className="space-y-6" {...scrollReveal}>
            <div className="aspect-[2/3] overflow-hidden shadow-luxury">
                <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop" className="w-full h-full object-cover" alt="Elegance" />
            </div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold">Thanh lịch tự thân</h4>
            <p className="text-xs text-black/50 leading-relaxed font-light uppercase tracking-wider">Vẻ đẹp không cần cố gắng, toát ra từ cốt cách và sự tự tin ngầm định.</p>
          </motion.div>

          <motion.div className="space-y-6 md:pt-24" {...scrollReveal} transition={{ delay: 0.2 }}>
            <div className="aspect-[2/3] overflow-hidden shadow-luxury">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop" className="w-full h-full object-cover" alt="Sophistication" />
            </div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold">Tư duy hiện đại</h4>
            <p className="text-xs text-black/50 leading-relaxed font-light uppercase tracking-wider">Người làm chủ vận mệnh và định nghĩa lại những chuẩn mực cũ kỹ.</p>
          </motion.div>

          <motion.div className="space-y-6" {...scrollReveal} transition={{ delay: 0.4 }}>
            <div className="aspect-[2/3] overflow-hidden shadow-luxury">
                <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1888&auto=format&fit=crop" className="w-full h-full object-cover" alt="Strength" />
            </div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold">Di sản cá nhân</h4>
            <p className="text-xs text-black/50 leading-relaxed font-light uppercase tracking-wider">Mỗi bộ trang phục là một phần trong câu chuyện cuộc đời nàng.</p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 text-center">
        <motion.div {...scrollReveal}>
            <p className="font-inter text-[0.7rem] uppercase tracking-[0.5em] text-black/40 mb-10 italic">Cùng SERANA viết tiếp chương mới</p>
            <div className="flex justify-center gap-12">
                <Link href="/shop" className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-[var(--color-rose-accent)] transition-all">Khám phá BST</Link>
                <Link href="/booking" className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-[var(--color-rose-accent)] transition-all">Kết nối riêng tư</Link>
            </div>
        </motion.div>
      </section>

    </main>
  );
}

// Cần thêm import Link từ Next.js ở đầu file
import Link from "next/link";