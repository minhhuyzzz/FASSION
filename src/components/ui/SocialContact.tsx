"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Facebook, Instagram, X, Phone } from "lucide-react";

const socialLinks = [
  {
    name: "Zalo",
    icon: <Phone size={20} />,
    color: "#0068FF",
    link: "https://zalo.me/0777868762", // Thay bằng số Zalo của quý cô
    label: "Chat qua Zalo"
  },
  {
    name: "Messenger",
    icon: <Facebook size={20} />,
    color: "#0084FF",
    link: "https://www.facebook.com/", // Thay bằng link Messenger Page
    label: "Facebook Messenger"
  },
  {
    name: "Instagram",
    icon: <Instagram size={20} />,
    color: "#E1306C",
    link: "https://instagram.com/yourprofilehttps://www.instagram.com/mhuy_o", // Thay bằng link Instagram
    label: "Instagram Direct"
  }
];

export default function SocialContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-4">
      {/* DANH SÁCH CÁC NÚT KHI MỞ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col items-end gap-3 mb-2"
          >
            {socialLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-3"
              >
                <span className="bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] px-3 py-2 rounded-sm shadow-sm border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-noir font-bold">
                  {item.label}
                </span>
                <div 
                  style={{ backgroundColor: item.color }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  {item.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NÚT TỔNG CHÍNH */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? "bg-noir rotate-90" : "bg-rose-accent hover:bg-noir"
        } text-white`}
        aria-label="Liên hệ với SERENA"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        
        {/* Hiệu ứng sóng rung rinh khi đóng */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-rose-accent animate-ping opacity-20" />
        )}
      </button>
    </div>
  );
}