"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Ready-to-wear",
    href: "#",
    megaMenu: [
      {
        title: "Shop All",
        links: [
          { label: "New Arrivals", href: "#" },
          { label: "Gowns", href: "#" },
          { label: "Evening", href: "#" },
          { label: "Lingerie", href: "#" },
          { label: "Accessories", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Bridal",
    href: "#bridal",
    megaMenu: [
      {
        title: "Collections",
        links: [
          { label: "Couture", href: "#" },
          { label: "GALA", href: "#" },
          { label: "Heritage", href: "#" },
        ],
      },
      {
        title: "Shop Bridal",
        links: [
          { label: "Second Look", href: "#" },
          { label: "Reception", href: "#" },
          { label: "Getting Ready", href: "#" },
        ],
      },
    ],
  },
  { label: "Boutiques", href: "#" },
  { label: "Events", href: "#" },
  { label: "Our World", href: "#" },
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

  // Chỉ đổi màu nền, không đổi kích thước
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
          Complimentary U.S Shipping
        </p>
      </div>

      {/* 2. Main Navigation Area */}
      <nav 
        onMouseEnter={() => setIsHovered(true)}
        className={cn(
          "transition-colors duration-500 px-6 md:px-12 flex items-center justify-between relative z-50 h-20", // Cố định chiều cao h-20
          isSolid ? "bg-black border-b border-white/10" : "bg-transparent"
        )}
      >
        <Link href="/" className="flex-shrink-0">
          <span className="font-playfair text-2xl tracking-[0.15em] text-white font-medium">GL</span>
        </Link>

        {/* Links chính */}
        <div className="hidden lg:flex items-center gap-10 h-full">
          {navLinks.map((link) => (
            <div
              key={link.label}
              onMouseEnter={() => setActiveMenu(link.megaMenu ? link.label : null)}
              className="h-full flex items-center" // Căn giữa link theo chiều cao h-20
            >
              <Link
                href={link.href}
                className="text-[0.65rem] tracking-[0.25em] text-white/80 hover:text-white uppercase font-inter transition-all relative group"
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-[1px] bg-white transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                  activeMenu === link.label && "scale-x-100"
                )} />
              </Link>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-white">
         <Search size={18} strokeWidth={1.2} className="cursor-pointer hover:opacity-50 transition" />
  
          {/* Gắn link vào icon User để dẫn tới trang Login */}
          <Link href="/login">
           <User 
             size={18} 
             strokeWidth={1.2} 
            className="hidden md:block cursor-pointer hover:opacity-50 transition" 
    />
            </Link>

            <ShoppingBag size={18} strokeWidth={1.2} className="cursor-pointer hover:opacity-50 transition" />
  
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
         {mobileOpen ? <X size={20} /> : <Menu size={20} />}
         </button>
        </div>
      </nav>

      {/* 3. Mega Menu Content */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 pt-12 pb-20 px-6 md:px-12 z-40"
          >
            <div className="max-w-[1600px] mx-auto grid grid-cols-4 gap-10">
              {navLinks.find(l => l.label === activeMenu)?.megaMenu?.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-8">
                  <h3 className="font-playfair text-4xl text-white font-light uppercase tracking-tight">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {section.links.map((sLink) => (
                      <li key={sLink.label}>
                        <Link 
                          href={sLink.href}
                          className="font-inter text-[0.75rem] tracking-widest text-white/50 hover:text-white transition-colors uppercase"
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
    </header>
  );
}