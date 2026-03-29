"use client";

import { motion } from "framer-motion";
// Đã loại bỏ Pinterest và thêm Share2 để thay thế
import { Instagram, Facebook, Youtube, Share2 } from "lucide-react"; 
import Link from "next/link";

const footerLinks = {
  Collections: ["Couture 2025", "Bridal Blanc", "Resort", "Accessories"],
  Atelier: ["Our Story", "Craftsmanship", "Sustainability", "Press"],
  "Client Services": ["Contact", "Appointments", "Size Guide", "Returns"],
};

const socialIcons = [
  { Icon: Instagram, href: "#" },
  { Icon: Share2, href: "#" }, // Đã thay đổi từ Pinterest sang Share2
  { Icon: Facebook, href: "#" },
  { Icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-noir text-white/70 pt-20 pb-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-playfair text-2xl text-white tracking-[0.3em] mb-6">
              MAISON LAHAV
            </p>
            <p className="font-inter text-sm leading-relaxed text-white/50 max-w-xs mb-8">
              Where art meets the body. Couture for women who define their own legacy, one stitch at a time.
            </p>
            <div className="flex items-center gap-5">
              {socialIcons.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.2, color: "#D8A7B1" }}
                  transition={{ duration: 0.2 }}
                  className="text-white/40 hover:text-rose-primary transition-colors"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="font-inter text-[0.65rem] tracking-[0.25em] uppercase text-white/30 mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4, color: "#D8A7B1" }}
                      className="font-inter text-sm text-white/50 hover:text-rose-primary transition-colors block"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="font-inter text-xs text-white/25 tracking-wider">
            © 2025 MAISON LAHAV. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-inter text-xs text-white/25 hover:text-white/50 transition-colors tracking-wider"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}