"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube } from "lucide-react"; 
import Link from "next/link";

// Cấu trúc dữ liệu có gắn link cụ thể cho từng trang
const footerLinks = {
  "Thông tin": [
    { label: "Thời trang", href: "/shop?cat=fashion" },
    { label: "Phụ Kiện", href: "/shop?cat=accessories" },
    { label: "Chính sách bảo mật", href: "/privacy" },
    { label: "Thông tin thanh toán", href: "/payment" },
    
  ],
  "Khám Phá": [
    { label: "Cẩm Nang Thời Trang", href: "/our-story" },
    { label: "Nghệ Thuật Thủ Công", href: "/atelier" },
    { label: "Phát Triển Bền Vững", href: "/sustainability" },
    { label: "Truyền Thông", href: "/press" },
  ],
  "Dịch Vụ": [
    { label: "Liên Hệ", href: "/contact" },
    { label: "Đặt Lịch Tư Vấn", href: "/booking" }, 
    { label: "Hướng Dẫn Chọn Size", href: "/size-guide" },
    { label: "Chính Sách Đổi Trả", href: "/returns" },
  ],
};

const socialIcons = [
  { Icon: Instagram, href: "https://www.instagram.com/serena" },
  { Icon: Facebook, href: "https://www.facebook.com/serena" },
  { Icon: Youtube, href: "https://www.youtube.com/serena" },
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
                SERENA
              </h2>
            </Link>
            <p className="font-inter text-[0.7rem] leading-[2.2] text-white/50 max-w-sm uppercase tracking-[0.2em] font-light">
              Serena là thương hiệu thời trang thiết kế dành riêng cho những người phụ nữ hiện đại, yêu thích nét đẹp thanh lịch và sang trọng.
            </p>
            
            {/* Social Icons placement */}
            <div className="flex items-center gap-6 pt-4">
              {socialIcons.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
                <h3 className="font-inter text-[0.7rem] tracking-[0.4em] uppercase text-white/80 border-b border-white/5 pb-4">
                  {category}
                </h3>
                <ul className="space-y-5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-inter text-[0.75rem] text-white/40 hover:text-white transition-all duration-500 block tracking-[0.15em] font-light uppercase hover:translate-x-1"
                      >
                        {link.label}
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
            © 2026 SERENA ATELIER. BẢN QUYỀN THUỘC VỀ THƯƠNG HIỆU.
          </p>
          
          <div className="flex items-center gap-10">
            {[
                { label: "Sitemap", href: "https://serena-pink.vercel.app/sitemap.xml" },
                { label: "Bảo mật", href: "/privacy" },
                { label: "Điều khoản", href: "/terms" },
                { label: "Cookies", href: "/cookies" }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-inter text-[0.6rem] tracking-[0.3em] uppercase text-white/20 hover:text-white/50 transition-colors duration-500"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}