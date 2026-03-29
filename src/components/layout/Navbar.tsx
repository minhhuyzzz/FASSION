"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Collections", href: "#collections" },
  { label: "Bridal", href: "#bridal" },
  { label: "Editorial", href: "#editorial" },
  { label: "Atelier", href: "#atelier" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/90 backdrop-blur-2xl border-b border-rose-primary/20 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className={`font-playfair text-xl tracking-[0.3em] font-medium transition-colors duration-500 ${
                  scrolled ? "text-noir" : "text-white"
                }`}
              >
                MAISON LAHAV
              </span>
            </motion.div>
          </Link>

          {/* Center Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                className={`btn-luxury text-[0.65rem] tracking-[0.2em] font-inter transition-colors duration-300 ${
                  scrolled
                    ? "text-noir hover:text-rose-accent"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            {[Search, Heart, ShoppingBag].map((Icon, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-colors duration-300 hidden md:block ${
                  scrolled ? "text-noir hover:text-rose-accent" : "text-white/80 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
              </motion.button>
            ))}

            {/* Mobile Menu Toggle */}
            <motion.button
              className={`lg:hidden transition-colors ${
                scrolled ? "text-noir" : "text-white"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-ivory flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMobileOpen(false)}
                className="font-playfair text-3xl text-noir hover:text-rose-accent transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
