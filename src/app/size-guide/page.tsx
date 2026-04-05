"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<"clothing" | "shoes">("clothing");

  return (
    <main className="min-h-screen bg-noir pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(164,113,122,0.08),transparent_60%)]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/40 hover:text-rose-accent transition-colors mb-8"
          >
            <ArrowLeft size={12} /> Quay lại 
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-5xl text-ivory italic tracking-tight mb-4"
          >
            Hướng dẫn chọn Kích cỡ
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.4em] text-rose-accent font-medium"
          >
            Tìm kiếm sự vừa vặn hoàn hảo cho riêng Quý cô
          </motion.p>
        </header>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-12 mb-12 border-b border-white/5 pb-6">
          <button
            onClick={() => setActiveTab("clothing")}
            className={`group relative flex flex-col items-center gap-2 transition-all`}
          >
            <span className={`text-[0.75rem] uppercase tracking-[0.3em] ${activeTab === "clothing" ? "text-ivory font-bold" : "text-white/30 hover:text-white/60"}`}>
              Quần áo & Váy
            </span>
            {activeTab === "clothing" && (
              <motion.div layoutId="tab-underline" className="absolute -bottom-6 w-full h-px bg-rose-accent" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("shoes")}
            className={`group relative flex flex-col items-center gap-2 transition-all`}
          >
            <span className={`text-[0.75rem] uppercase tracking-[0.3em] ${activeTab === "shoes" ? "text-ivory font-bold" : "text-white/30 hover:text-white/60"}`}>
              Giày cao gót
            </span>
            {activeTab === "shoes" && (
              <motion.div layoutId="tab-underline" className="absolute -bottom-6 w-full h-px bg-rose-accent" />
            )}
          </button>
        </div>

        {/* Display Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Hướng dẫn lấy số đo */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-6 text-rose-accent">
                <Ruler size={18} />
                <h3 className="text-[0.65rem] uppercase tracking-[0.2em] font-bold">Cách lấy số đo</h3>
              </div>
              
              <ul className="space-y-6 text-[0.8rem] text-white/50 leading-relaxed font-light">
                {activeTab === "clothing" ? (
                  <>
                    <li>
                      <strong className="text-ivory block mb-1 uppercase tracking-wider">01. Vòng ngực</strong>
                      Đo quanh phần đầy nhất của ngực, giữ thước dây ngang bằng.
                    </li>
                    <li>
                      <strong className="text-ivory block mb-1 uppercase tracking-wider">02. Vòng eo</strong>
                      Đo quanh phần hẹp nhất của eo (thường là trên rốn).
                    </li>
                    <li>
                      <strong className="text-ivory block mb-1 uppercase tracking-wider">03. Vòng hông</strong>
                      Đo quanh phần nở nhất của hông khi đứng thẳng.
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <strong className="text-ivory block mb-1 uppercase tracking-wider">01. Chiều dài bàn chân</strong>
                      Đo từ gót chân đến đầu ngón chân dài nhất.
                    </li>
                    <li>
                      <strong className="text-ivory block mb-1 uppercase tracking-wider">02. Lưu ý</strong>
                      Quý cô nên đo vào cuối ngày khi bàn chân ở trạng thái thoải mái nhất.
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="p-6 border border-rose-accent/20 rounded-sm italic text-[0.75rem] text-white/40 text-center leading-relaxed">
              &ldquo;Nếu số đo của Quý cô nằm giữa hai size, Atelier khuyên Quý cô nên chọn size lớn hơn để có cảm giác thoải mái nhất.&rdquo;
            </div>
          </div>

          {/* Hình ảnh bảng Size */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative aspect-[3/4] md:aspect-[5/5] w-full bg-white/[0.03] border border-white/10 rounded-sm overflow-hidden p-4"
              >
                <Image
                  src={activeTab === "clothing" ? "https://i.postimg.cc/fyQ4j6pm/Size_quần_áo.png" : "https://i.postimg.cc/5yQcwfs4/Size-giay.png"}
                  alt={`Bảng size ${activeTab === "clothing" ? "quần áo" : "giày dép"} SERENA`}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Call to Action */}
        <footer className="mt-20 text-center border-t border-white/5 pt-12">
          <p className="text-white/40 text-[0.8rem] mb-6 italic">Quý cô vẫn còn băn khoăn về kích cỡ?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact"
              className="bg-ivory text-noir px-8 py-3.5 text-[0.6rem] tracking-[0.3em] uppercase font-bold hover:bg-rose-accent hover:text-white transition-all rounded-sm"
            >
              Liên hệ nhân viên tư vấn
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}