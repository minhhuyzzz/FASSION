"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, User, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // 1. Thêm Router để điều hướng
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navLinks = [
  {
    label: "Thời trang",
    href: "/shop",
    megaMenu: [
      {
        title: "Áo",
        links: [
          { label: "Áo Sơ Mi Couture", href: "/shop" },
          { label: "Áo Kiểu Silk", href: "/shop" },
          { label: "Áo Khoác Dạ", href: "/shop" },
        ],
      },
      {
        title: "Quần",
        links: [
          { label: "Quần Tây Ống Rộng", href: "/shop" },
          { label: "Quần Short Cao Cấp", href: "/shop" },
        ],
      },
      {
        title: "Set",
        links: [
          { label: "Set Dạo Phố", href: "/shop" },
          { label: "Set Công Sở Luxe", href: "/shop" },
        ],
      },
      {
        title: "Váy",
        links: [
          { label: "Đầm Dạ Hội", href: "/shop" },
          { label: "Chân Váy Midi", href: "/shop" },
          { label: "Váy Lụa Mini", href: "/shop" },
        ],
      },
    ],
  },
  {
    label: "Phụ kiện",
    href: "/shop",
    megaMenu: [
      {
        title: "Dây chuyền",
        links: [
          { label: "Vòng Cổ Ngọc Trai", href: "/shop" },
          { label: "Dây Chuyền Bạc trắng", href: "/shop" },
        ],
      },
      {
        title: "Đồng hồ",
        links: [
          { label: "Classic Edition", href: "/shop" },
          { label: "Jewelry Watch", href: "/shop" },
        ],
      },
    ],
  },
  { 
    label: "Túi xách", 
    href: "/shop",
    megaMenu: [
        {
          title: "Bộ Sưu Tập Túi",
          links: [
            { label: "Túi Cầm Tay (Clutch)", href: "/shop" },
            { label: "Túi Đeo Vai", href: "/shop" },
            { label: "Balo Da Cao Cấp", href: "/shop" },
          ],
        }
    ]
  },
  { label: "Cẩm nang thời trang", href: "/blog" },
  { label: "Thế giới SERANA", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const router = useRouter(); // Khởi tạo router
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // --- HÀM XỬ LÝ TÌM KIẾM THỰC TẾ ---
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    setIsSearchOpen(false);
    setSearchQuery("");
    
    // Chuyển hướng đến trang tìm kiếm tổng hợp
    router.push(`/search?q=${encodeURIComponent(query.toLowerCase())}`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    if (isSearchOpen || mobileOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "unset";
    }

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
        <div className={cn(
          "w-full py-2 text-center transition-all duration-500 bg-black border-b border-white/5",
          isSolid ? "opacity-100" : "md:bg-transparent md:border-none"
        )}>
          <p className="text-[0.55rem] tracking-[0.3em] text-white uppercase font-inter">
            Miễn phí vận chuyển toàn quốc cho đơn hàng cao cấp
          </p>
        </div>

        <nav 
          onMouseEnter={() => setIsHovered(true)}
          className={cn(
            "transition-colors duration-500 px-6 md:px-12 flex items-center justify-between relative z-50 h-20",
            isSolid ? "bg-black border-b border-white/10" : "bg-transparent"
          )}
        >
          <Link href="/" className="flex-shrink-0 relative w-32 h-20 md:w-40 md:h-30">
            <Image 
              src="https://i.postimg.cc/R0zdqBYk/SERENA2.png" 
              alt="SERANA Logo" 
              fill
              priority
              className="object-contain brightness-0 invert" 
            />
          </Link>

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

          <div className="flex items-center gap-5 text-white">
            <Link 
              href="/booking" 
              className="hidden xl:flex items-center gap-2.5 border border-white/10 px-5 py-2.5 bg-rose-accent/10 hover:bg-rose-accent transition-all duration-500"
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
            
            <Link href="/login">
              <User size={18} strokeWidth={1.2} className="hidden md:block cursor-pointer hover:text-rose-accent transition" />
            </Link>

            <Link href="/cart" className="relative group p-1.5 border border-white/5 hover:border-rose-accent/30 rounded-full transition-all">
              <motion.div
                key={cartCount}
                animate={cartCount > 0 ? { scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.4 }}
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

        {/* Mega Menu Content */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
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

      {/* --- SEARCH OVERLAY (MỚI) --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-black text-white p-6 md:p-12 flex flex-col"
          >
            <div className="flex justify-between items-center mb-20">
                <span className="text-[0.6rem] uppercase tracking-[0.5em] text-white/40 italic">Search Archive</span>
                <button 
                onClick={() => setIsSearchOpen(false)}
                className="group flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-all"
              >
                Đóng <X size={20} strokeWidth={1} />
              </button>
            </div>

            <div className="max-w-6xl mx-auto w-full space-y-12">
              <div className="relative border-b border-white/10 py-6 focus-within:border-rose-accent transition-all duration-700">
                  <input 
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // NHẤN ENTER ĐỂ TÌM KIẾM
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                    placeholder="Quý cô đang tìm kiếm điều gì?..."
                    className="w-full bg-transparent text-4xl md:text-7xl font-light italic outline-none placeholder:text-white/5"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
                    {searchQuery && (
                         <ArrowRight 
                            className="text-rose-accent cursor-pointer" 
                            size={40} 
                            strokeWidth={1} 
                            onClick={() => handleSearch(searchQuery)} // CLICK MŨI TÊN ĐỂ TÌM
                         />
                    )}
                  </div>
              </div>

              <div className="grid md:grid-cols-3 gap-16 pt-12">
                <div className="space-y-8">
                    <h3 className="text-[0.6rem] uppercase tracking-[0.4em] text-white/20 font-bold">Xu hướng tìm kiếm</h3>
                    <ul className="space-y-5">
                        {/* GẮN LOGIC CHO CÁC CHỮ GỢI Ý */}
                        {["Áo", "Quần", "Váy", "Túi xách"].map((item) => (
                            <li key={item}>
                                <button 
                                    onClick={() => handleSearch(item)}
                                    className="text-[0.7rem] uppercase tracking-[0.2em] text-white/50 hover:text-rose-accent transition-all flex items-center gap-4 italic"
                                >
                                    <span className="w-6 h-[1px] bg-white/10"></span> {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:col-span-2 space-y-8">
                    <h3 className="text-[0.6rem] uppercase tracking-[0.4em] text-white/20 font-bold">Khám phá bộ sưu tập</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {[
                            { name: "Thời trang", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400" },
                            { name: "Phụ kiện", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400" },
                            { name: "Túi xách", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400" }
                        ].map((cat) => (
                            <div 
                                key={cat.name} 
                                onClick={() => handleSearch(cat.name)} // CLICK VÀO ẢNH CŨNG TÌM KIẾM
                                className="relative aspect-[3/4] group overflow-hidden cursor-pointer border border-white/5"
                            >
                                <Image src={cat.img} alt={cat.name} fill className="object-cover opacity-40 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-all">
                                    <span className="text-[0.6rem] uppercase tracking-[0.4em] font-bold italic">{cat.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}