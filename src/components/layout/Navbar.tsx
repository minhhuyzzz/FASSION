"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Hàm cn giúp gộp class gọn gàng

const navLinks = [
  { label: "Ready-to-wear", href: "#" },
  { label: "Bridal", href: "#bridal" },
  { label: "Boutiques", href: "#" },
  { label: "Events", href: "#" },
  { label: "Our World", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Thêm state hover
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Header sẽ có màu khi cuộn xuống HOẶC khi di chuột vào
  const isSolid = scrolled || isHovered;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Announcement Bar (Thanh thông báo trên cùng) */}
      <div className={cn(
        "w-full py-2 text-center transition-all duration-500 bg-black border-b border-white/5",
        isSolid ? "translate-y-0 opacity-100" : "md:bg-transparent md:border-none"
      )}>
        <p className="text-[0.55rem] tracking-[0.3em] text-white uppercase font-inter">
          Complimentary U.S Shipping
        </p>
      </div>

      {/* 2. Main Navigation Area */}
      <nav className={cn(
        "transition-all duration-500 px-6 md:px-12 flex items-center justify-between",
        isSolid 
          ? "bg-black py-4 border-b border-white/10 shadow-2xl" 
          : "bg-transparent py-8"
      )}>
        
        {/* Logo - Giữ kiểu Initials sang trọng */}
        <Link href="/" className="flex-shrink-0">
          <span className="font-playfair text-2xl tracking-[0.15em] text-white font-medium">
            GL
          </span>
        </Link>

        {/* Links chính (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[0.6rem] tracking-[0.25em] text-white/80 hover:text-white uppercase font-inter transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section: Button + Icons */}
        <div className="flex items-center gap-6">
          {/* Nút Book an Appointment - Đặc trưng của brand luxury */}
          <Link 
            href="#" 
            className="hidden xl:block border border-white/40 px-6 py-2.5 text-[0.6rem] tracking-[0.2em] text-white uppercase hover:bg-white hover:text-black transition-all duration-500 font-inter"
          >
            Book an Appointment
          </Link>

          <div className="flex items-center gap-4 text-white">
            <Search size={18} strokeWidth={1.2} className="cursor-pointer hover:opacity-50 transition" />
            <Heart size={18} strokeWidth={1.2} className="hidden md:block cursor-pointer hover:opacity-50 transition" />
            <User size={18} strokeWidth={1.2} className="hidden md:block cursor-pointer hover:opacity-50 transition" />
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={1.2} className="cursor-pointer hover:opacity-50 transition" />
              <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-white text-black w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
            </div>
            
            {/* Mobile Toggle */}
            <button className="lg:hidden ml-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center gap-8"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-8 right-8 text-white">
               <X size={30} strokeWidth={1}/>
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-playfair text-3xl text-white italic hover:text-rose-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}