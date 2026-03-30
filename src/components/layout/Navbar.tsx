"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, User, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Trang Phục",
    href: "#",
    megaMenu: [
      {
        title: "Mua Sắm Tất Cả",
        links: [
          { label: "Hàng Mới Về", href: "#" },
          { label: "Đầm Dạ Hội", href: "#" },
          { label: "Tiệc Tối", href: "#" },
          { label: "Nội Y Cao Cấp", href: "#" },
          { label: "Phụ Kiện", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Váy Cưới",
    href: "#bridal",
    megaMenu: [
      {
        title: "Bộ Sưu Tập",
        links: [
          { label: "Couture Độc Bản", href: "#" },
          { label: "GALA Wedding", href: "#" },
          { label: "Di Sản SERANA", href: "#" },
        ],
      },
      {
        title: "Dịch Vụ Cưới",
        links: [
          { label: "Trang Phục Tiệc", href: "#" },
          { label: "Lễ Đón Khách", href: "#" },
          { label: "Chuẩn Bị Lễ", href: "#" },
        ],
      },
    ],
  },
  { label: "Cửa Hàng", href: "#" },
  { label: "Sự Kiện", href: "#" },
  { label: "Thế Giới SERANA", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = scrolled || isHovered || activeMenu !== null;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500"
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveMenu(null);
      }}
    >
      {/* 1. Announcement Bar */}
      <div className={cn(
        "w-full py-2 text-center transition-all duration-500 bg-black border-b border-white/5",
        isSolid ? "opacity-100" : "md:bg-transparent md:border-none"
      )}>
        <p className="text-[0.55rem] tracking-[0.3em] text-white uppercase font-inter">
          Miễn phí vận chuyển toàn quốc cho đơn hàng cao cấp
        </p>
      </div>

      {/* 2. Main Navigation Area */}
      <nav 
        onMouseEnter={() => setIsHovered(true)}
        className={cn(
          "transition-colors duration-500 px-6 md:px-12 flex items-center justify-between relative z-50 h-20",
          isSolid ? "bg-black border-b border-white/10" : "bg-transparent"
        )}
      >
        {/* LOGO CHUẨN TỪ POSTIMG.CC */}
        {/* Tự động đảo ngược màu để logo đen hiện lên trắng trên nền đen */}
        <Link href="/" className="flex-shrink-0 relative w-32 h-20 md:w-40 md:h-30">
          <Image 
            src="https://i.postimg.cc/R0zdqBYk/SERENA2.png" 
            alt="SERANA Logo" 
            fill
            priority
            className="object-contain brightness-0 invert" 
          />
        </Link>

        {/* Links chính */}
        <div className="hidden lg:flex items-center gap-10 h-full">
          {navLinks.map((link) => (
            <div
              key={link.label}
              onMouseEnter={() => setActiveMenu(link.megaMenu ? link.label : null)}
              className="h-full flex items-center"
            >
              <Link
                href={link.href}
                className="text-[0.65rem] tracking-[0.25em] text-white/80 hover:text-white uppercase font-inter transition-all relative group"
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-[1px] bg-rose-accent transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                  activeMenu === link.label && "scale-x-100"
                )} />
              </Link>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 text-white">
          {/* Ô ĐẶT LỊCH TƯ VẤN (BẢN DESKTOP) */}
          <Link 
            href="/booking" 
            className="hidden xl:flex items-center gap-2.5 border border-white/10 px-5 py-2.5 bg-rose-accent/10 hover:bg-rose-accent transition-all duration-500"
          >
            <Calendar size={14} strokeWidth={1.2} />
            <span className="text-[0.6rem] tracking-[0.2em] uppercase font-inter">Đặt Lịch Tư Vấn</span>
          </Link>

          <Search size={18} strokeWidth={1.2} className="cursor-pointer hover:text-rose-accent transition" />
          
          <Link href="/login">
            <User size={18} strokeWidth={1.2} className="hidden md:block cursor-pointer hover:text-rose-accent transition" />
          </Link>

          <div className="relative">
            <ShoppingBag size={18} strokeWidth={1.2} className="cursor-pointer hover:text-rose-accent transition" />
            <span className="absolute -top-1.5 -right-1.5 text-[0.55rem] bg-rose-accent w-3.5 h-3.5 flex items-center justify-center rounded-full text-white">0</span>
          </div>
  
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* 3. Mega Menu Content */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 pt-12 pb-20 px-6 md:px-12 z-40"
          >
            <div className="max-w-[1600px] mx-auto grid grid-cols-4 gap-10">
              {navLinks.find(l => l.label === activeMenu)?.megaMenu?.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-8 border-l border-white/5 pl-8">
                  <h3 className="font-playfair text-3xl text-white font-light uppercase tracking-tight">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {section.links.map((sLink) => (
                      <li key={sLink.label}>
                        <Link 
                          href={sLink.href}
                          className="font-inter text-[0.7rem] tracking-widest text-white/50 hover:text-rose-accent transition-colors uppercase"
                        >
                          {sLink.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {/* Featured Image in Mega Menu */}
              <div className="col-span-2 relative aspect-video overflow-hidden border border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800" 
                  alt="Bộ sưu tập mới" 
                  fill 
                  className="object-cover opacity-60 hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-playfair italic text-2xl text-white tracking-widest">Bộ Sưu Tập Mới 2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu (Dành cho điện thoại) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 bg-black z-[60] flex flex-col p-8 pt-24 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setMobileOpen(false)}
                  className="font-playfair text-3xl text-white border-b border-white/10 pb-4"
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/booking" 
                className="bg-rose-accent text-white text-center py-4 font-inter uppercase tracking-widest text-sm"
              >
                Đặt Lịch Tư Vấn
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}