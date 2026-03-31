"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import Link from "next/link"; // Đã thêm import để sửa lỗi đỏ

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const { error } = await supabase.from("contacts").insert([data]);
      if (error) throw error;
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Đã xảy ra lỗi, quý khách vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain relative">
      <Navbar />

      {/* Tiêu đề trang - Tăng độ đậm để dễ nhìn */}
      <section className="pt-44 pb-16 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="line-decorator uppercase tracking-[0.5em] text-[10px] text-black/60 mb-6 block font-medium">Liên hệ</span>
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-6xl md:text-7xl italic leading-tight mb-8 text-black">
            Tâm tình cùng <br /> SERANA
          </h1>
          <p className="font-inter text-[0.85rem] leading-relaxed text-black/70 uppercase tracking-widest italic font-medium">
            Mọi thắc mắc của quý cô đều sẽ được chúng tôi lắng nghe và phản hồi một cách tinh tế nhất.
          </p>
        </motion.div>
      </section>

      {/* Thông tin & Form */}
      <section className="pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* CỘT TRÁI: THÔNG TIN CHI TIẾT (Tăng độ tương phản) */}
          <motion.div 
            className="lg:col-span-5 space-y-12"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-white border border-black/10 shadow-sm group-hover:border-[var(--color-rose-accent)] transition-all">
                  <MapPin size={20} strokeWidth={1.5} className="text-black" />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-black font-bold mb-2">Không gian trưng bày</h3>
                  <p className="text-sm font-medium text-black/80">Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-white border border-black/10 shadow-sm group-hover:border-[var(--color-rose-accent)] transition-all">
                  <Clock size={20} strokeWidth={1.5} className="text-black" />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-black font-bold mb-2">Thời gian mở cửa</h3>
                  <p className="text-sm font-medium text-black/80">Thứ Hai – Chủ Nhật: 09:00 – 21:00</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-white border border-black/10 shadow-sm group-hover:border-[var(--color-rose-accent)] transition-all">
                  <Phone size={20} strokeWidth={1.5} className="text-black" />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-black font-bold mb-2">Đường dây đặc quyền</h3>
                  <p className="text-sm font-medium text-black/80">+84 905 123 456</p>
                </div>
              </div>
            </div>

            {/* Mục bổ sung FAQ */}
            <div className="p-8 bg-white border border-black/5 shadow-luxury">
                <h4 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl italic mb-4 text-black">Câu hỏi thường gặp?</h4>
                <p className="text-xs text-black/60 leading-relaxed font-medium mb-6">
                  Quý khách có thể xem nhanh các chính sách về đổi trả, chọn kích cỡ hoặc quy trình thiết kế độc bản.
                </p>
                <Link href="/faq" className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-[var(--color-rose-accent)] hover:border-[var(--color-rose-accent)] transition-all font-bold text-black">
                  Xem chi tiết
                </Link>
            </div>
          </motion.div>

          {/* CỘT PHẢI: FORM GỬI LỜI NHẮN */}
          <motion.div 
            className="lg:col-span-7 bg-white p-10 md:p-16 shadow-luxury border border-black/5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <form key="contact-form" onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="relative border-b border-black/20 py-4 focus-within:border-[var(--color-rose-accent)] transition-all">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-black font-bold mb-2 block">Quý danh</label>
                        <input name="name" type="text" required className="w-full bg-transparent outline-none font-medium italic text-sm text-black placeholder:text-black/20" placeholder="Tên của bạn..." />
                    </div>
                    <div className="relative border-b border-black/20 py-4 focus-within:border-[var(--color-rose-accent)] transition-all">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-black font-bold mb-2 block">Số điện thoại</label>
                        <input name="phone" type="tel" required className="w-full bg-transparent outline-none font-medium italic text-sm text-black placeholder:text-black/20" placeholder="0905..." />
                    </div>
                  </div>

                  <div className="relative border-b border-black/20 py-4 focus-within:border-[var(--color-rose-accent)] transition-all">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-black font-bold mb-2 block">Địa chỉ Email</label>
                    <input name="email" type="email" required className="w-full bg-transparent outline-none font-medium italic text-sm text-black placeholder:text-black/20" placeholder="email@example.com" />
                  </div>

                  <div className="relative border-b border-black/20 py-4 focus-within:border-[var(--color-rose-accent)] transition-all">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-black font-bold mb-2 block">Lời nhắn của Quý cô</label>
                    <textarea name="message" rows={4} required className="w-full bg-transparent outline-none font-medium italic text-sm resize-none text-black placeholder:text-black/20" placeholder="Hãy chia sẻ mong muốn của bạn..." />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-luxury w-full py-6 bg-black text-white hover:bg-[var(--color-rose-accent)] transition-all duration-700 flex items-center justify-center gap-4 disabled:bg-gray-400"
                  >
                    <span className="text-[0.75rem] tracking-[0.4em] font-bold">
                      {isSubmitting ? "Đang gửi đi..." : "Gửi lời nhắn"}
                    </span>
                    <Send size={14} strokeWidth={1.5} />
                  </button>
                </form>
              ) : (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 space-y-6 text-black"
                >
                  <CheckCircle2 size={48} className="mx-auto text-[var(--color-rose-accent)] stroke-[1.5px]" />
                  <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl italic font-bold">Gửi lời nhắn thành công</h2>
                  <p className="text-[0.8rem] uppercase tracking-widest text-black/60 max-w-xs mx-auto">Chúng tôi đã nhận được tâm ý của bạn và sẽ sớm phản hồi.</p>
                  <button onClick={() => setIsSuccess(false)} className="text-[0.65rem] border-b border-black uppercase tracking-[0.3em] pb-1 hover:text-[var(--color-rose-accent)] mt-8 font-bold">Quay lại</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* PHẦN BẢN ĐỒ CÓ TIÊU ĐỀ */}
      <section className="pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <header className="mb-12 text-center">
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl italic text-black mb-4 underline decoration-black/10 underline-offset-8">Bản đồ</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/40">Tìm đường đến Atelier của chúng tôi</p>
        </header>
        <div className="w-full h-[550px] shadow-luxury border border-black/5 rounded-sm overflow-hidden">
            <iframe
            title="Vị trí SERANA Gò Vấp"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.858165487774!2d106.68427047583864!3d10.822210558350576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e543632905%3A0x6fb2461044439c29!2zMTIgTmd1eeG7hW4gVsSDbiBC4bqjbywgUGjGsOG7nW5nIDQsIEfDsiBW4bqlcCwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1711891234567!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            ></iframe>
        </div>
      </section>

      <Footer />
    </main>
  );
}