"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube } from "lucide-react"; 
import Link from "next/link";

const footerLinks = {
  "Bộ Sưu Tập": ["Couture 2026", "Bridal Blanc", "Resort", "Phụ Kiện"],
  "Xưởng Chế Tác": ["Câu Chuyện Thương Hiệu", "Nghệ Thuật Thủ Công", "Phát Triển Bền Vững", "Truyền Thông"],
  "Dịch Vụ": ["Liên Hệ", "Đặt Lịch Tư Vấn", "Hướng Dẫn Chọn Size", "Chính Sách Đổi Trả"],
};

const socialIcons = [
  { Icon: Instagram, href: "https://www.instagram.com/" },
  { Icon: Facebook, href: "https://www.facebook.com/" },
  { Icon: Youtube, href: "https://www.youtube.com/" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Identity: 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block group">
              <h2 
                style={{ fontFamily: 'var(--font-playfair)' }} 
                className="text-4xl tracking-[0.5em] text-white transition-colors group-hover:text-[var(--color-rose-primary)] uppercase"
              >
                SERANA
              </h2>
            </Link>
            <p className="font-inter text-[0.7rem] leading-[2.2] text-white/50 max-w-sm uppercase tracking-[0.2em] font-light">
              Nơi nghệ thuật giao thoa cùng cơ thể. Những tạo tác Couture dành riêng cho người phụ nữ tự định nghĩa di sản của chính mình.
            </p>
            
            {/* Social Icons placement */}
            <div className="flex items-center gap-6 pt-4">
              {socialIcons.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  whileHover={{ y: -3, color: "#D8A7B1" }}
                  className="text-white/40 hover:text-[var(--color-rose-primary)] transition-colors duration-300"
                >
                  <Icon size={18} strokeWidth={1.2} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links: 8 columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-10">
                {/* Header rõ ràng hơn, độ tương phản cao hơn */}
                <h3 className="font-inter text-[0.7rem] tracking-[0.4em] uppercase text-white/80 border-b border-white/5 pb-4">
                  {category}
                </h3>
                <ul className="space-y-5">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="font-inter text-[0.75rem] text-white/40 hover:text-white transition-all duration-500 block tracking-[0.15em] font-light uppercase hover:translate-x-1"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-inter text-[0.6rem] tracking-[0.3em] uppercase text-white/20">
            © 2026 SERANA ATELIER. BẢN QUYỀN THUỘC VỀ THƯƠNG HIỆU.
          </p>
          
          <div className="flex items-center gap-10">
            {["Bảo mật", "Điều khoản", "Cookies"].map((item) => (
              <Link
                key={item}
                href="#"
                className="font-inter text-[0.6rem] tracking-[0.3em] uppercase text-white/20 hover:text-white/50 transition-colors duration-500"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}