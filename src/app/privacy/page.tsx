"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, UserCheck, FileText } from "lucide-react";

const sections = [
  { id: "intro", title: "Lời mở đầu" },
  { id: "data-collection", title: "Thu thập thông tin" },
  { id: "data-usage", title: "Mục đích sử dụng" },
  { id: "data-security", title: "Bảo mật dữ liệu" },
  { id: "user-rights", title: "Quyền lợi của quý cô" },
  { id: "cookies", title: "Chính sách Cookies" },
];

export default function PrivacyPolicyPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain pb-40">
      
      {/* 1. HERO - PHONG CÁCH VĂN BẢN HÀN LÂM */}
      <section className="pt-52 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-black/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <Lock size={16} strokeWidth={1} className="text-black/40" />
            <span className="text-[10px] uppercase tracking-[0.6em] text-black/40 font-bold">Document v.2026.01</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-6xl md:text-8xl italic text-black leading-none mb-12">
            Quyền riêng tư <br /> & Bảo mật
          </h1>
          <p className="font-inter text-[0.8rem] leading-[2.2] text-black/60 uppercase tracking-[0.3em] font-medium italic">
            Tại SERENA, sự riêng tư của quý cô được trân trọng như cách chúng tôi nâng niu từng thớ vải. Đây là cam kết bảo mật tuyệt đối về dữ liệu cá nhân của quý cô.
          </p>
        </motion.div>
      </section>

      {/* 2. BỐ CỤC CHÍNH - STICKY NAVIGATION */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mt-20">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* MỤC LỤC BÊN TRÁI (FIXED ON SCROLL) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-40 space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/20 mb-10">Mục lục văn bản</h3>
              <nav className="space-y-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="block text-[11px] uppercase tracking-[0.3em] text-black/40 hover:text-black hover:translate-x-2 transition-all duration-500 text-left w-full group"
                  >
                    <span className="inline-block w-0 group-hover:w-8 h-[1px] bg-black mr-0 group-hover:mr-4 transition-all duration-500 align-middle"></span>
                    {section.title}
                  </button>
                ))}
              </nav>

              <div className="pt-20">
                <div className="p-8 border border-black/5 bg-white/50 space-y-4">
                  <ShieldCheck size={20} strokeWidth={1} />
                  <p className="text-[10px] uppercase tracking-widest leading-relaxed text-black/50 font-medium">
                    Hệ thống bảo mật đạt chuẩn SSL 256-bit cao cấp nhất hiện nay.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* NỘI DUNG CHI TIẾT BÊN PHẢI */}
          <div className="lg:col-span-8 space-y-32">
            
            <article id="intro" className="space-y-8">
              <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl italic text-black">01. Lời mở đầu</h2>
              <div className="font-inter text-[0.9rem] leading-[2.5] text-black/70 font-light text-justify">
                <p>
                  Chính sách bảo mật này mô tả cách SERENA Atelier thu thập, sử dụng và chia sẻ thông tin cá nhân của Quý khách khi Quý khách truy cập hoặc mua hàng từ serena.vn. Chúng tôi hiểu rằng thông tin cá nhân là tài sản quý giá và cam kết bảo vệ thông tin đó bằng những công nghệ tiên tiến nhất.
                </p>
              </div>
            </article>

            <article id="data-collection" className="space-y-8">
              <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl italic text-black">02. Thu thập thông tin</h2>
              <div className="space-y-6 font-inter text-[0.9rem] leading-[2.5] text-black/70 font-light">
                <p className="italic border-l-2 border-black/5 pl-8 uppercase tracking-widest text-[0.7rem] font-bold">Các dữ liệu chúng tôi thu thập bao gồm:</p>
                <ul className="list-none space-y-4 pl-8">
                  <li>— Thông tin định danh: Họ tên, ngày sinh, giới tính.</li>
                  <li>— Thông tin liên lạc: Email, số điện thoại, địa chỉ giao hàng.</li>
                  <li>— Thông tin đo đạc: Các thông số cơ thể (dành riêng cho dòng Couture).</li>
                  <li>— Thông tin thanh toán: Lịch sử giao dịch (không lưu trữ số thẻ tín dụng).</li>
                </ul>
              </div>
            </article>

            <article id="data-security" className="space-y-8">
              <div className="bg-black text-white p-12 md:p-16 relative overflow-hidden">
                <div className="absolute inset-0 grain opacity-20"></div>
                <div className="relative z-10 space-y-6">
                  <EyeOff size={32} strokeWidth={1} className="text-[var(--color-rose-accent)]" />
                  <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl italic text-white">04. Bảo mật dữ liệu</h2>
                  <p className="text-[0.8rem] leading-[2.2] text-white/60 font-light uppercase tracking-widest italic">
                    Chúng tôi áp dụng các biện pháp an ninh kỹ thuật và tổ chức để bảo vệ dữ liệu cá nhân của Quý khách khỏi sự truy cập trái phép, mất mát hoặc phá hủy. Toàn bộ dữ liệu nhạy cảm đều được mã hóa hoàn toàn.
                  </p>
                </div>
              </div>
            </article>

            <article id="user-rights" className="space-y-8">
              <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl italic text-black">05. Quyền lợi của quý cô</h2>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="p-8 border border-black/5 hover:bg-white transition-colors duration-500">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Quyền truy cập</h4>
                  <p className="text-xs text-black/50 leading-relaxed italic">Quý khách có quyền yêu cầu bản sao dữ liệu cá nhân mà chúng tôi đang lưu giữ.</p>
                </div>
                <div className="p-8 border border-black/5 hover:bg-white transition-colors duration-500">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Quyền xóa bỏ</h4>
                  <p className="text-xs text-black/50 leading-relaxed italic">Quý khách có quyền yêu cầu xóa bỏ hoàn toàn dữ liệu cá nhân khỏi hệ thống của chúng tôi.</p>
                </div>
              </div>
            </article>

            {/* PHẦN LIÊN HỆ PHÁP LÝ */}
            <div className="pt-20 border-t border-black/10 text-center space-y-6">
                <FileText size={24} strokeWidth={1} className="mx-auto text-black/20" />
                <p className="text-[10px] uppercase tracking-[0.5em] text-black/40">Mọi thắc mắc về quyền riêng tư, vui lòng gửi về:</p>
                <p className="text-sm italic font-medium text-black">legal@serena.vn</p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}