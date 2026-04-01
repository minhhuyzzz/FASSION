"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, User, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Thời trang", href: "/shop", key: 0 },
  { label: "Phụ kiện", href: "/shop", key: 1 },
  { label: "Túi xách", href: "/shop", key: 2 },
  { label: "Cẩm nang thời trang", href: "/blog", key: 3 },
  { label: "Thế giới SERANA", href: "/about", key: 4 },
  { label: "Liên hệ", href: "/contact", key: 5 },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/search?q=${encodeURIComponent(query.toLowerCase())}`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Khóa cuộn trang khi mở Overlay
    document.body.style.overflow = (isSearchOpen || mobileOpen) ? "hidden" : "unset";
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [isSearchOpen, mobileOpen]);

  const isSolid = scrolled || isHovered || activeMenu !== null;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500"
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveMenu(null);
        }}
      >
        {/* --- TOP BAR: THÔNG BÁO CỐ ĐỊNH --- */}
        <div className={cn(
          "w-full py-2 px-6 md:px-12 transition-all duration-500 bg-black border-b border-white/5 flex justify-center items-center",
          isSolid ? "opacity-100" : "md:bg-transparent md:border-none"
        )}>
          <p className="text-[0.5rem] md:text-[0.55rem] tracking-[0.3em] text-white uppercase font-inter text-center">
            Miễn phí vận chuyển toàn quốc cho đơn hàng cao cấp
          </p>
        </div>

        {/* --- MAIN NAVIGATION --- */}
        <nav 
          onMouseEnter={() => setIsHovered(true)}
          className={cn(
            "transition-colors duration-500 px-6 md:px-12 flex items-center justify-between relative z-50 h-20",
            isSolid ? "bg-black border-b border-white/10" : "bg-transparent"
          )}
        >
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 relative w-32 h-30 md:w-40 md:h-20">
            <Image 
              src="https://i.postimg.cc/R0zdqBYk/SERENA2.png" 
              alt="SERANA Logo" 
              fill
              priority
              className="object-contain brightness-0 invert" 
            />
          </Link>

          {/* MENU LINKS (Desktop) */}
          <div className="hidden lg:flex items-center gap-10 h-full">
            {navLinks.map((link) => (
              <div
                key={link.key}
                onMouseEnter={() => setActiveMenu(link.label)}
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

          {/* ICON ACTIONS */}
          <div className="flex items-center gap-5 text-white">
            <Link 
              href="/booking" 
              className="hidden xl:flex items-center gap-2.5 border border-white px-5 py-2.5 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-500"
            >
              <Calendar size={14} strokeWidth={1.2} />
              <span className="text-[0.6rem] tracking-[0.2em] uppercase font-inter">Đặt Lịch Tư Vấn</span>
            </Link>

            <Search 
                size={18} 
                strokeWidth={1.2} 
                className="cursor-pointer hover:text-rose-accent transition" 
                onClick={() => setIsSearchOpen(true)}
            />
            
            <Link href="/login" className="hidden md:block">
              <User size={18} strokeWidth={1.2} className="cursor-pointer hover:text-rose-accent transition" />
            </Link>

            <Link href="/cart" className="relative group p-1.5 border border-white/5 hover:border-rose-accent/30 rounded-full transition-all">
              <motion.div
                key={cartCount}
                animate={cartCount > 0 ? { scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] } : {}}
              >
                <ShoppingBag size={18} strokeWidth={1.2} className="group-hover:text-rose-accent transition" />
              </motion.div>

              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 text-[0.55rem] bg-rose-accent w-4 h-4 flex items-center justify-center rounded-full text-white font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
    
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* --- SEARCH OVERLAY --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black text-white p-6 md:p-12 flex flex-col"
          >
            <div className="flex justify-between items-center mb-20">
                <span className="text-[0.6rem] uppercase tracking-[0.5em] text-white/40 italic">Tìm kiếm sản phẩm</span>
                <button onClick={() => setIsSearchOpen(false)} className="group flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-all">
                Đóng <X size={20} strokeWidth={1} />
              </button>
            </div>

            <div className="max-w-6xl mx-auto w-full">
              <div className="relative border-b border-white/10 py-6 focus-within:border-rose-accent transition-all duration-700">
                <input 
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                  placeholder="Quý cô đang tìm kiếm điều gì?..."
                  className="w-full bg-transparent text-4xl md:text-7xl font-light italic outline-none placeholder:text-white/5"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  {searchQuery && (
                    <ArrowRight 
                      className="text-rose-accent cursor-pointer" 
                      size={40} 
                      strokeWidth={1} 
                      onClick={() => handleSearch(searchQuery)}
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}