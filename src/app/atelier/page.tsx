"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scissors, Ruler, Sparkles, Wind, Layers } from "lucide-react";
import Link from "next/link";

export default function CraftsmanshipPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain pb-32">
      
      {/* SECTION 1: HERO - TRIẾT LÝ THỦ CÔNG */}
      <section className="pt-60 pb-32 px-6 md:px-12 text-center max-w-[1400px] mx-auto">
        <motion.div {...fadeIn}>
          <span className="line-decorator uppercase tracking-[0.6em] text-[10px] text-black/50 mb-8 block font-bold italic">Savoir-Faire</span>
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-6xl md:text-8xl italic leading-tight text-black mb-12">
            Nghệ thuật của <br /> Những đôi tay
          </h1>
          <div className="max-w-3xl mx-auto border-t border-black/10 pt-12">
            <p className="font-inter text-[0.85rem] leading-[2.5] text-black/80 uppercase tracking-[0.3em] font-medium italic">
              Tại SERANA, mỗi bản vẽ không dừng lại ở mặt giấy. Nó là khởi đầu của một hành trình chinh phục những giới hạn của vải vóc và kỹ nghệ may đo tinh xảo nhất.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: CHẤT LIỆU THƯỢNG HẠNG */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="space-y-6">
              <Layers size={30} strokeWidth={1} className="text-[var(--color-rose-accent)]" />
              <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl italic text-black uppercase tracking-tight">Kén chọn lụa là</h2>
              <p className="text-sm font-medium text-black/70 leading-[2.2] text-justify uppercase tracking-widest italic">
                Chúng tôi du hành qua những làng nghề lụa tơ tằm danh tiếng, chọn ra những thước vải có độ rủ hoàn hảo và cảm giác êm ái tuyệt đối trên làn da quý cô. Chỉ 10% số vải được tuyển chọn đáp ứng được tiêu chuẩn khắt khe của SERANA.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-t border-black/5 pt-10">
              <div>
                <span className="text-3xl font-light italic text-black block mb-1">Mulberry Silk</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-black/40">100% Tự nhiên</span>
              </div>
              <div>
                <span className="text-3xl font-light italic text-black block mb-1">French Lace</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-black/40">Nhập khẩu cao cấp</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative aspect-[4/5] shadow-luxury overflow-hidden border border-black/5"
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1520004434532-668416a08753?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110" 
              alt="Silk Texture" 
            />
            <div className="absolute inset-0 bg-black/5"></div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: QUY TRÌNH 4 BƯỚC CHỈNH CHU */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grain pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl italic mb-6">Quy trình Chế tác</h2>
            <div className="h-[1px] w-24 bg-[var(--color-rose-accent)] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: <Ruler />, title: "Đo đạc nhân trắc", desc: "Hơn 20 thông số cơ thể được ghi nhận để đảm bảo sự vừa vặn tuyệt đối." },
              { icon: <Scissors />, title: "Cắt rập thủ công", desc: "Từng mảnh vải được cắt tay để giữ trọn vẹn cấu trúc sợi dệt tự nhiên." },
              { icon: <Wind />, title: "Draping nghệ thuật", desc: "Tạo hình trực tiếp trên ma-nơ-canh để nắm bắt độ rủ và chuyển động của vải." },
              { icon: <Sparkles />, title: "Hoàn thiện tỉ mỉ", desc: "Những chi tiết đính kết và đường khâu giấu mũi được thực hiện hàng trăm giờ." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                className="space-y-6 text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:border-[var(--color-rose-accent)] group-hover:text-[var(--color-rose-accent)] transition-all duration-500">
                  {React.cloneElement(step.icon as React.ReactElement, { strokeWidth: 1 })}
                </div>
                <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold">{step.title}</h4>
                <p className="text-[0.75rem] text-white/40 leading-relaxed font-light italic px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CHI TIẾT CẬN CẢNH (EDITORIAL GRID) */}
      <section className="py-40 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-1 aspect-[2/3] shadow-luxury overflow-hidden" {...fadeIn}>
            <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1887&auto=format&fit=crop" className="w-full h-full object-cover" alt="Needlework" />
          </motion.div>
          <div className="lg:col-span-1 space-y-8 flex flex-col justify-center text-center px-10">
            <span className="text-[10px] uppercase tracking-[0.5em] text-black/30">Cận cảnh</span>
            <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl italic text-black leading-tight">Đỉnh cao của <br /> sự kiên nhẫn</h3>
            <p className="text-xs text-black/60 leading-[2.2] uppercase tracking-widest font-medium italic">
              Một bộ váy cưới tại SERANA có thể cần tới 300 giờ làm việc liên tục của 5 nghệ nhân lành nghề nhất. Chúng tôi không đếm thời gian bằng giờ, chúng tôi đếm bằng sự hoàn hảo.
            </p>
          </div>
          <motion.div className="lg:col-span-1 aspect-[2/3] shadow-luxury overflow-hidden" {...fadeIn} transition={{ delay: 0.2 }}>
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Detailing" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: CTA TRẢI NGHIỆM */}
      <section className="py-20 text-center">
        <motion.div {...fadeIn}>
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl italic text-black mb-10">Chạm để cảm nhận</h2>
          <Link 
            href="/booking" 
            className="px-16 py-6 bg-black text-white hover:bg-[var(--color-rose-accent)] transition-all duration-700 text-[0.7rem] uppercase tracking-[0.5em] font-bold shadow-2xl inline-block"
          >
            Đặt lịch ghé thăm ngay
          </Link>
        </motion.div>
      </section>

    </main>
  );
}