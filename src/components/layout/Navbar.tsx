"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { 
    label: "CỬA HÀNG", 
    href: "/shop", 
    columns: [
      {
        title: "THỜI TRANG",
        href: "/shop?cat=fashion",
        items: [
          { label: "ÁO", href: "/shop?cat=fashion&sub=Áo" },
          { label: "QUẦN", href: "/shop?cat=fashion&sub=Quần" },
          { label: "VÁY", href: "/shop?cat=fashion&sub=Váy" },
          { label: "SET", href: "/shop?cat=fashion&sub=Set" },
        ]
      },
      {
        title: "PHỤ KIỆN",
        href: "/shop?cat=accessories",
        items: [
          { label: "DÂY CHUYỀN", href: "/shop?cat=accessories&sub=Dây chuyền" },
          { label: "TÚI XÁCH", href: "/shop?cat=accessories&sub=Túi xách" },
          { label: "VÒNG TAY", href: "/shop?cat=accessories&sub=Vòng tay" }
        ]
      }
    ],
    featured: {
      image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=1887&auto=format&fit=crop",
      title: "Bộ Sưu Tập Mới 2026",
      href: "/shop"
    } 
  },
  { label: "Chăm sóc sản phẩm", href: "/product-care", columns: [] },
  
  { 
    label: "CẨM NANG THỜI TRANG", 
    href: "/blog",
    columns: [
      
    ]
  },
  { label: "THẾ GIỚI SERENA", href: "/about", columns: [

  ] },
  { 
    label: "LIÊN HỆ", 
    href: "/contact",
    columns: [
      
    ]
  },
  
];

export default function Navbar() {
  const { cartCount } = useCart();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/search?q=${encodeURIComponent(query.toLowerCase())}`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    
    if (isSearchOpen || mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, [isSearchOpen, mobileOpen]);

  const isSolid = scrolled || activeMenu !== null || isHovered;

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 font-inter"
        onMouseLeave={() => {
          setActiveMenu(null);
          setIsHovered(false);
        }}
      >
        {/* TOP BAR */}
        <div className={cn(
          "w-full py-2 bg-black flex justify-center items-center transition-all duration-500 border-b border-white/5",
          isSolid ? "opacity-100" : "md:bg-transparent md:border-none"
        )}>
          <p className="text-[9px] tracking-[0.2em] text-white uppercase font-bold text-center">
            MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC CHO ĐƠN HÀNG CAO CẤP
          </p>
        </div>

        {/* MAIN NAV */}
        <nav 
          onMouseEnter={() => setIsHovered(true)}
          className={cn(
            "transition-all duration-500 px-6 md:px-12 flex items-center justify-between h-20",
            isSolid ? "bg-black border-b border-white/10 shadow-luxury" : "bg-transparent"
          )}
        >
          <Link href="/" className="flex-shrink-0 relative w-32 h-20 md:w-40 md:h-22">
            <Image src="https://i.postimg.cc/R0zdqBYk/SERENA2.png" alt="SERENA" fill priority className="object-contain brightness-0 invert" />
          </Link>

          <div className="hidden lg:flex items-center gap-10 h-full">
            {navLinks.map((link) => (
              <div
                key={link.label}
                onMouseEnter={() => setActiveMenu(link.columns.length > 0 ? link : null)}
                className="h-full flex items-center"
              >
                <Link
                  href={link.href}
                  className="text-[11px] tracking-[0.25em] text-white/80 hover:text-white uppercase transition-all relative group"
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-[1px] bg-rose-accent transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                    activeMenu?.label === link.label && "scale-x-100"
                  )} />
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5 text-white">
            <Link href="/booking" className="hidden xl:flex items-center gap-2 border border-white/20 px-5 py-2 hover:bg-white hover:text-black transition-all">
              <Calendar size={14} />
              <span className="text-[10px] tracking-[0.2em] font-bold">ĐẶT LỊCH TƯ VẤN</span>
            </Link>
            <Search 
              size={18} 
              className="cursor-pointer hover:text-rose-accent transition" 
              onClick={() => setIsSearchOpen(true)}
            />
            <Link href="/login">
              <User size={18} className="cursor-pointer hover:text-rose-accent transition" />
            </Link>
            <Link href="/cart" className="relative p-1">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] bg-rose-accent w-4 h-4 flex items-center justify-center rounded-full text-white font-bold">{cartCount}</span>
              )}
            </Link>
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* MEGA MENU */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="absolute top-full left-0 w-full bg-black border-b border-white/10 pt-16 pb-24 px-12 z-40 shadow-luxury"
            >
              <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-16 font-inter text-white">
                
                {/* PHẦN DANH MỤC */}
                <div className={cn("grid gap-12", activeMenu.featured ? "col-span-6 grid-cols-2" : "col-span-12 grid-cols-4")}>
                  {activeMenu.columns.map((col: any, idx: number) => (
                    <div key={idx} className="space-y-10">
                      <Link href={col.href} className="group block">
                        <h3 className="font-playfair text-4xl italic leading-none group-hover:text-rose-accent transition-colors uppercase">
                          {col.title}
                        </h3>
                      </Link>
                      <ul className="space-y-6">
                        {col.items.map((item: any) => (
                          <li key={item.label}>
                            <Link 
                              href={item.href}
                              className="text-[12px] tracking-[0.15em] text-white/60 hover:text-white transition-all uppercase font-normal hover:translate-x-1 inline-block"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* PHẦN ẢNH FEATURED - ĐÃ LÀM NGẮN LẠI (380px) */}
                {activeMenu.featured && (
                  <div className="col-span-6 relative group overflow-hidden h-[380px] self-start">
                    <Link href={activeMenu.featured.href} className="block w-full h-full relative">
                      <Image 
                        src={activeMenu.featured.image} 
                        alt={activeMenu.featured.title}
                        fill
                        className="object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-60 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-all">
                        <h4 className="font-playfair text-4xl italic text-white drop-shadow-2xl text-center px-10">
                          {activeMenu.featured.title}
                        </h4>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black text-white p-6 md:p-12 flex flex-col">
            <div className="flex justify-between items-center mb-20">
              <span className="text-[0.6rem] uppercase tracking-[0.5em] text-white/40 italic">Tìm kiếm sản phẩm</span>
              <button onClick={() => setIsSearchOpen(false)} className="group flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-all">
                Đóng <X size={20} strokeWidth={1} />
              </button>
            </div>
            <div className="max-w-6xl mx-auto w-full">
              <div className="relative border-b border-white/10 py-6 focus-within:border-rose-accent transition-all duration-700">
                <input autoFocus type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)} placeholder="Quý cô đang tìm kiếm điều gì?..." className="w-full bg-transparent text-4xl md:text-7xl font-light italic outline-none placeholder:text-white/5" style={{ fontFamily: 'var(--font-playfair)' }} />
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  {searchQuery && <ArrowRight className="text-rose-accent cursor-pointer" size={40} strokeWidth={1} onClick={() => handleSearch(searchQuery)} />}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}