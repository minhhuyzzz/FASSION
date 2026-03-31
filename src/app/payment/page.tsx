"use client";

import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Landmark, Truck, ShieldCheck, QrCode, ArrowRight } from "lucide-react";

export default function PaymentPage() {
  const containerFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, staggerChildren: 0.2 }
  };

  const itemFade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain pb-40">
      
      {/* 1. HERO - TIÊU ĐỀ THANH KHOẢN */}
      <section className="pt-52 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <motion.div {...itemFade} className="border-l-2 border-black pl-10">
          <span className="text-[10px] uppercase tracking-[0.6em] text-black/40 font-bold mb-4 block">Giao dịch an toàn</span>
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-6xl md:text-8xl italic text-black leading-none uppercase">
            Thanh toán <br /> & Hóa đơn
          </h1>
        </motion.div>
      </section>

      {/* 2. PHƯƠNG THỨC THANH TOÁN - GRID 3 CỘT ĐỐI XỨNG */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mt-12">
        <motion.div 
          className="grid lg:grid-cols-3 gap-px bg-black/10 border border-black/10 shadow-luxury"
          variants={containerFade}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* CỘT 1: CHUYỂN KHOẢN NGÂN HÀNG */}
          <motion.div variants={itemFade} className="bg-white p-12 space-y-10">
            <div className="flex justify-between items-start">
              <Landmark size={28} strokeWidth={1} className="text-black" />
              <span className="text-[9px] border border-black/20 px-3 py-1 uppercase tracking-widest font-bold">Phổ biến</span>
            </div>
            <div className="space-y-6">
              <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl italic text-black">Chuyển khoản <br /> Ngân hàng</h3>
              <p className="text-[0.75rem] text-black/50 leading-relaxed font-medium uppercase tracking-widest italic">
                Lựa chọn tối ưu cho các đơn hàng thiết kế độc bản (Couture).
              </p>
            </div>
            
            {/* THẺ THÔNG TIN NGÂN HÀNG */}
            <div className="bg-[var(--color-ivory)] p-8 border border-black/5 space-y-4">
               <div className="space-y-1">
                 <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">Ngân hàng</p>
                 <p className="text-xs font-bold text-black uppercase">BIDV SmartBanking (BIDV)</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">Số tài khoản</p>
                 <p className="text-sm font-bold text-black tracking-widest">7302168136</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">Chủ tài khoản</p>
                 <p className="text-xs font-bold text-black uppercase">TRAN MINH HUY</p>
               </div>
            </div>
          </motion.div>

          {/* CỘT 2: THẺ TÍN DỤNG/GHI NỢ */}
          <motion.div variants={itemFade} className="bg-white p-12 space-y-10">
            <CreditCard size={28} strokeWidth={1} className="text-black" />
            <div className="space-y-6">
              <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl italic text-black">Thẻ Tín dụng <br /> & Ghi nợ</h3>
              <p className="text-[0.75rem] text-black/50 leading-relaxed font-medium uppercase tracking-widest italic">
                Thanh toán nhanh chóng qua cổng liên kết quốc tế an toàn.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 pt-10 grayscale opacity-40">
              <span className="text-[10px] font-bold tracking-tighter">VISA</span>
              <span className="text-[10px] font-bold tracking-tighter">MASTERCARD</span>
              <span className="text-[10px] font-bold tracking-tighter">JCB</span>
              <span className="text-[10px] font-bold tracking-tighter">APPLE PAY</span>
            </div>
            <div className="pt-10 border-t border-black/5">
                <p className="text-[10px] text-black/40 uppercase tracking-[0.3em] leading-loose">
                  * SERANA không lưu giữ thông tin thẻ của quý cô. Mọi giao dịch được mã hóa bởi Stripe.
                </p>
            </div>
          </motion.div>

          {/* CỘT 3: THANH TOÁN KHI NHẬN HÀNG (COD) */}
          <motion.div variants={itemFade} className="bg-white p-12 space-y-10">
            <Truck size={28} strokeWidth={1} className="text-black" />
            <div className="space-y-6">
              <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl italic text-black">Thanh toán <br /> Khi nhận hàng</h3>
              <p className="text-[0.75rem] text-black/50 leading-relaxed font-medium uppercase tracking-widest italic">
                Kiểm tra sản phẩm và thanh toán trực tiếp cho nhân viên vận chuyển.
              </p>
            </div>
            <div className="p-8 border border-black/5 flex items-center gap-6">
                <QrCode size={40} strokeWidth={1} className="text-black/20" />
                <p className="text-[9px] uppercase tracking-widest leading-loose text-black/60 italic">
                  Chỉ áp dụng cho các đơn hàng dưới 20.000.000 VNĐ.
                </p>
            </div>
            <div className="pt-10 border-t border-black/5">
                <p className="text-[10px] text-black/40 uppercase tracking-[0.3em] leading-loose">
                  * Không áp dụng cho dòng sản phẩm Couture hoặc đặt thiết kế riêng.
                </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. LƯU Ý GIAO DỊCH - PHONG CÁCH CHIA CỘT MỚI */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mt-40">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div {...itemFade} className="space-y-12">
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl italic text-black">Hướng dẫn <br /> Chuyển khoản</h2>
            <div className="space-y-10">
              {[
                { step: "01", text: "Quý khách chọn phương thức Chuyển khoản khi Đặt hàng." },
                { step: "02", text: "Nội dung chuyển khoản: [Số điện thoại] - [Mã đơn hàng]." },
                { step: "03", text: "Chụp ảnh màn hình giao dịch thành công để xác nhận nhanh hơn." }
              ].map((step, i) => (
                <div key={i} className="flex gap-8 items-center group">
                  <span className="text-xs font-bold text-[var(--color-rose-accent)]">{step.step}</span>
                  <p className="text-[0.75rem] uppercase tracking-widest text-black font-medium border-b border-black/5 pb-2 w-full group-hover:border-black transition-all">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* BẢO MẬT & NIỀM TIN */}
          <motion.div 
            className="bg-black text-white p-12 md:p-16 space-y-10 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="absolute inset-0 grain opacity-20 pointer-events-none"></div>
            <ShieldCheck size={40} strokeWidth={1} className="text-[var(--color-rose-accent)] relative z-10" />
            <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl italic relative z-10">Giao dịch Bảo mật</h3>
            <p className="text-[0.8rem] leading-[2.5] text-white/40 uppercase tracking-[0.3em] font-light italic relative z-10">
              Mọi thông tin tài chính của quý cô được xử lý qua hệ thống bảo mật SSL đạt tiêu chuẩn quốc tế. SERANA cam kết không bao giờ can thiệp vào quyền truy cập cá nhân của quý cô.
            </p>
            <div className="pt-6 relative z-10">
                <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold border-b border-white/20 pb-2 hover:text-[var(--color-rose-accent)] hover:border-[var(--color-rose-accent)] transition-all">
                   Tìm hiểu thêm về Bảo mật <ArrowRight size={14} />
                </button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}