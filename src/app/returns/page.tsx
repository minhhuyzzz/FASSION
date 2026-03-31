"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  RefreshCcw, 
  ShieldCheck, // Đã sửa tên từ CheckShield thành ShieldCheck
  Clock, 
  AlertCircle, 
  Truck, 
  MessageSquare 
} from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const policies = [
    {
      icon: <Clock size={24} strokeWidth={1} />,
      title: "Thời hạn đổi trả",
      detail: "Quý khách có 07 ngày kể từ ngày nhận hàng để yêu cầu đổi sản phẩm hoặc hoàn trả trong trường hợp lỗi từ nhà sản xuất."
    },
    {
      icon: <ShieldCheck size={24} strokeWidth={1} />, // Đã sửa ở đây
      title: "Điều kiện sản phẩm",
      detail: "Sản phẩm phải còn nguyên tem mác, chưa qua sử dụng, chưa qua giặt ủi và không có dấu hiệu chỉnh sửa hay hư hỏng từ phía tác động ngoại lực."
    },
    {
      icon: <AlertCircle size={24} strokeWidth={1} />,
      title: "Hàng may đo riêng",
      detail: "Đối với dòng sản phẩm Couture hoặc thiết kế theo yêu cầu cá nhân (Custom-made), SERANA không áp dụng chính sách hoàn trả. Chúng tôi hỗ trợ chỉnh sửa miễn phí."
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain pb-32">
      
      {/* TIÊU ĐỀ TRANG */}
      <section className="pt-48 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto text-center">
        <motion.div {...fadeIn}>
          <span className="line-decorator uppercase tracking-[0.5em] text-[10px] text-black/40 mb-6 block font-medium italic">Đặc quyền hậu mãi</span>
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl md:text-7xl italic leading-tight text-black mb-10">
            Chính sách <br /> Đổi trả & Bảo hành
          </h1>
          <p className="font-inter text-[0.85rem] leading-relaxed text-black/70 uppercase tracking-[0.3em] max-w-2xl mx-auto font-medium italic">
            Sự hài lòng của Quý cô là thước đo cao nhất cho giá trị của SERANA. Chúng tôi cam kết đồng hành cùng Quý cô trong mọi trải nghiệm mua sắm.
          </p>
        </motion.div>
      </section>

      {/* TÓM TẮT CHÍNH SÁCH */}
      <section className="py-12 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {policies.map((item, index) => (
            <motion.div 
              key={index}
              className="p-10 bg-white border border-black/5 shadow-luxury space-y-6 group hover:border-[var(--color-rose-accent)] transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-black group-hover:text-[var(--color-rose-accent)] transition-colors">{item.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl italic text-black">{item.title}</h3>
              <p className="text-[0.8rem] leading-[2] text-black/60 font-medium text-justify uppercase tracking-wider italic">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUY TRÌNH THỰC HIỆN */}
      <section className="py-24 px-6 md:px-12 max-w-[1000px] mx-auto">
        <div className="mb-20 text-center">
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl italic text-black mb-4">Quy trình Đổi trả</h2>
            <div className="h-[1px] w-24 bg-black/10 mx-auto"></div>
        </div>

        <div className="space-y-12">
          {[
            { step: "01", title: "Liên hệ Concierge", desc: "Quý khách vui lòng nhắn tin qua Fanpage hoặc gọi Hotline đặc quyền để thông báo tình trạng sản phẩm." },
            { step: "02", title: "Kiểm định trực tuyến", desc: "SERANA sẽ tiếp nhận hình ảnh và phản hồi xác nhận trong vòng 24 giờ làm việc." },
            { step: "03", title: "Đóng gói & Gửi hàng", desc: "Quý khách đóng gói sản phẩm cẩn thận (bao gồm đầy đủ quà tặng đi kèm) và gửi về Atelier Gò Vấp." },
            { step: "04", title: "Nhận sản phẩm mới", desc: "Sau khi kiểm tra trực tiếp, SERANA sẽ gửi sản phẩm thay thế hoặc hoàn tất bảo hành cho Quý khách." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="flex gap-10 items-start group"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="text-5xl font-light italic text-black/10 group-hover:text-[var(--color-rose-accent)] transition-colors duration-700 leading-none pt-1">
                {item.step}
              </span>
              <div className="space-y-3 border-l border-black/5 pl-10 pb-12">
                <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-black">{item.title}</h4>
                <p className="text-sm text-black/60 font-medium italic leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HỖ TRỢ TRỰC TIẾP */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="bg-black text-white p-16 md:p-28 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 grain pointer-events-none"></div>
          <div className="relative z-10 space-y-12">
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl md:text-6xl italic leading-tight">
              Quý cô cần sự hỗ trợ <br /> ngay lập tức?
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-10 pt-6">
                <Link href="/contact" className="px-14 py-6 bg-white text-black hover:bg-[var(--color-rose-accent)] hover:text-white transition-all duration-700 text-[0.7rem] uppercase tracking-[0.4em] font-bold shadow-2xl">
                    Trò chuyện trực tiếp
                </Link>
                <Link href="tel:+84905123456" className="px-14 py-6 border border-white/20 text-white hover:border-white transition-all duration-700 text-[0.7rem] uppercase tracking-[0.4em] font-bold">
                    Hotline đặc quyền
                </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}