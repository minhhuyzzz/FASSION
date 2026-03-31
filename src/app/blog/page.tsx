"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";

const journalData = [
  {
    id: 1,
    category: "Nghệ thuật",
    title: "Kỹ thuật xếp nếp (Draping): Linh hồn của Haute Couture",
    excerpt: "Khám phá hành trình từ những thước vải lụa thô sơ đến những đường cong hoàn mỹ trên cơ thể người phụ nữ...",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop",
    date: "25.03.2026",
    featured: true
  },
  {
    id: 2,
    category: "Xu hướng",
    title: "Sắc trắng Blanc: Sự lên ngôi của tối giản thượng lưu",
    excerpt: "Tại sao sắc trắng luôn là lựa chọn vĩnh cửu của những quý cô định hình phong cách riêng?",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    date: "20.03.2026",
    featured: false
  },
  {
    id: 3,
    category: "Phong cách",
    title: "Phụ kiện Di sản: Điểm nhấn từ những điều nhỏ bé",
    excerpt: "Cách lựa chọn trang sức và túi xách để tôn vinh bộ trang phục thiết kế của bạn.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop",
    date: "15.03.2026",
    featured: false
  },
  {
    id: 4,
    category: "Sự kiện",
    title: "SERANA tại Tuần lễ Thời trang Xuân Hè 2026",
    excerpt: "Nhìn lại những khoảnh khắc rực rỡ nhất của bộ sưu tập 'Lửa & Lụa' trên sàn diễn quốc tế.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop",
    date: "10.03.2026",
    featured: false
  }
];

export default function JournalPage() {
  const featuredPost = journalData.find(post => post.featured);
  const regularPosts = journalData.filter(post => !post.featured);

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain pb-32">
      
      {/* HEADER TRANG */}
      <section className="pt-48 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="line-decorator uppercase tracking-[0.5em] text-[10px] text-black/60 mb-6 block font-medium">Ấn bản số</span>
            <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-6xl md:text-8xl italic leading-none text-black">
              SERANA Journal
            </h1>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4 border-b border-black/20 pb-2 w-full md:w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Search size={16} strokeWidth={1} className="text-black/40" />
            <input 
              type="text" 
              placeholder="Tìm kiếm cảm hứng..." 
              className="bg-transparent outline-none text-[0.7rem] uppercase tracking-widest w-full placeholder:text-black/20"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURED STORY (BÀI VIẾT NỔI BẬT) */}
      {featuredPost && (
        <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Link href={`/blog/${featuredPost.id}`} className="group block relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 overflow-hidden aspect-[16/9] shadow-luxury">
                <motion.img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  whileInView={{ scale: 1.1 }}
                  initial={{ scale: 1.2 }}
                  transition={{ duration: 1.5 }}
                />
              </div>
              <div className="lg:col-span-5 space-y-8">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-rose-accent)] font-bold italic">Editor's Pick — {featuredPost.category}</span>
                <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl md:text-5xl italic leading-tight text-black group-hover:text-[var(--color-rose-accent)] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="font-inter text-[0.85rem] leading-relaxed text-black/60 font-light italic">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <span className="text-[10px] uppercase tracking-widest text-black/30">{featuredPost.date}</span>
                  <div className="h-[1px] w-12 bg-black/10"></div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold group-hover:translate-x-2 transition-transform duration-500">Đọc câu chuyện</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* BÀI VIẾT LƯỚI (STORY GRID) */}
      <section className="py-12 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 gap-y-24">
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${post.id}`} className="group space-y-8 block">
                <div className="aspect-[4/5] overflow-hidden shadow-luxury border border-black/5 bg-white">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110 group-hover:grayscale-[0.5]"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.3em] text-black/40">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl italic leading-snug text-black group-hover:text-[var(--color-rose-accent)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[0.75rem] leading-relaxed text-black/50 font-light line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 pt-2 text-[9px] uppercase tracking-[0.3em] font-bold">
                    <span>Khám phá</span>
                    <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA CUỐI TRANG - ĐĂNG KÝ BẢN TIN */}
      <section className="mt-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="bg-black py-24 px-8 text-center space-y-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 grain pointer-events-none"></div>
          <motion.div 
            className="relative z-10"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
          >
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl italic text-white mb-6">Theo dấu những câu chuyện mới nhất</h2>
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-white/40 mb-10">Đăng ký nhận đặc quyền thông tin từ SERANA Atelier</p>
            <form className="max-w-md mx-auto flex border-b border-white/20 pb-2 focus-within:border-[var(--color-rose-accent)] transition-all">
                <input 
                  type="email" 
                  placeholder="ĐỊA CHỈ EMAIL QUÝ CÔ..." 
                  className="bg-transparent w-full outline-none text-xs font-light tracking-widest text-white italic placeholder:text-white/10 uppercase"
                />
                <button type="submit" className="text-white hover:text-[var(--color-rose-accent)] transition-colors">
                  <ArrowRight size={18} />
                </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}