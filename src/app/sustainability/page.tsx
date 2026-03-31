"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Recycle, Heart, Globe, ArrowDown } from "lucide-react";
import Link from "next/link";

export default function SustainabilityPage() {
  const scrollReveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain pb-32">
      
      {/* SECTION 1: HERO - PHONG CÁCH TĨNH LẶNG (ZEN) */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <motion.div 
          className="text-center z-10 space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-black/40 block">Vẻ đẹp trường tồn</span>
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-6xl md:text-8xl italic text-black leading-none">
            Thời gian <br /> Xanh
          </h1>
          <p className="font-inter text-[0.8rem] uppercase tracking-[0.4em] text-black/60 max-w-xl mx-auto leading-loose italic font-medium">
            Tại SERANA, chúng tôi không đo lường sự thành công bằng doanh số, mà bằng những dấu chân nhẹ nhàng chúng tôi để lại trên hành tinh này.
          </p>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="pt-12 flex justify-center"
          >
            <ArrowDown size={20} strokeWidth={1} className="text-black/20" />
          </motion.div>
        </motion.div>

        {/* Cấu trúc sợi chỉ chạy dọc nền */}
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-black/5 -z-10"></div>
      </section>

      {/* SECTION 2: TRIẾT LÝ SLOW FASHION - THIẾT KẾ ĐAN XEN LỚP (OVERLAP) */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-0 items-center">
          <motion.div 
            className="lg:col-span-7 relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="aspect-video overflow-hidden shadow-luxury">
                <img 
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop" 
                    alt="Natural Fabric" 
                    className="w-full h-full object-cover"
                />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-6 lg:-ml-24 bg-white p-12 md:p-20 shadow-luxury border border-black/5 z-20 space-y-8"
            {...scrollReveal}
          >
            <Leaf size={28} strokeWidth={1} className="text-[var(--color-rose-accent)]" />
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl italic text-black">Thời trang "Chậm"</h2>
            <p className="font-inter text-sm text-black/70 leading-[2.2] font-medium text-justify uppercase tracking-widest italic">
              Chúng tôi từ chối sản xuất đại trà. Mỗi thiết kế của SERANA được ra đời để tồn tại qua nhiều thập kỷ, không bị cuốn trôi bởi những vòng lặp xu hướng ngắn hạn. Mua ít hơn, chọn lọc kỹ hơn và giữ gìn lâu hơn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: 3 TRỤ CỘT BỀN VỮNG - PHONG CÁCH GRID HIỆN ĐẠI (CONTEMPORARY) */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-3 gap-px bg-black/5 border border-black/5 shadow-2xl">
          {[
            {
              icon: <Recycle />,
              title: "Tận dụng tối đa",
              desc: "Hệ thống 'Zero Waste' tại Atelier giúp chúng tôi tận dụng những mảnh vải thừa để chế tác thành phụ kiện cao cấp."
            },
            {
              icon: <Globe />,
              title: "Nguồn gốc đạo đức",
              desc: "100% lụa và phụ liệu được cung ứng từ những nhà cung cấp cam kết bảo vệ môi trường và phúc lợi người lao động."
            },
            {
              icon: <Heart />,
              title: "Giá trị cộng đồng",
              desc: "Hỗ trợ các làng nghề dệt truyền thống Việt Nam, giữ gìn những kỹ thuật cổ xưa trước nguy cơ mai một."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="bg-[var(--color-ivory)] p-12 md:p-16 space-y-8 hover:bg-white transition-colors duration-700 group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="text-black/20 group-hover:text-[var(--color-rose-accent)] transition-colors duration-500">
                {React.cloneElement(item.icon as React.ReactElement, { strokeWidth: 1, size: 32 })}
              </div>
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-black">{item.title}</h3>
              <p className="text-[0.75rem] text-black/50 leading-relaxed font-medium italic">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: QUY TRÌNH BAO BÌ (PACKAGING) - PHONG CÁCH MINIMALIST TEXT */}
      <section className="py-40 bg-black text-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12 relative overflow-hidden">
          <div className="absolute inset-0 grain opacity-20 pointer-events-none"></div>
          <motion.div {...scrollReveal}>
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-6 block">Bao bì phân hủy sinh học</span>
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl md:text-5xl italic leading-relaxed">
              "Sự sang trọng thật sự <br /> không để lại rác thải"
            </h2>
            <div className="pt-10 max-w-lg mx-auto">
                <p className="text-[0.75rem] leading-[2.5] text-white/40 uppercase tracking-widest font-light italic">
                    Hộp đựng và túi bọc của SERANA được làm từ giấy tái chế và vải vụn, được thiết kế để Quý cô có thể tái sử dụng trong cuộc sống hàng ngày.
                </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: LỜI CAM KẾT (PROMISE) */}
      <section className="py-40 px-6 text-center">
        <motion.div {...scrollReveal} className="space-y-10">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl italic text-black">Hành trình này là mãi mãi</h2>
          <p className="font-inter text-sm text-black/60 uppercase tracking-[0.3em] max-w-xl mx-auto leading-loose font-medium">
            Chúng tôi vẫn đang học hỏi và cải thiện mỗi ngày để SERANA trở nên xanh hơn, tử tế hơn.
          </p>
          <div className="pt-10 flex justify-center gap-12">
             <Link href="/about" className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-[var(--color-rose-accent)] transition-all font-bold">Về chúng tôi</Link>
             <Link href="/contact" className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-[var(--color-rose-accent)] transition-all font-bold">Liên hệ Atelier</Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}