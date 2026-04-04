// src/app/blog/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { journalData } from "@/data/journal";
import { motion } from "framer-motion";
import { ChevronLeft, Clock, Calendar, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  
  // Tìm bài viết dựa trên ID từ URL
  const post = journalData.find((p) => p.id === Number(params.id));

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Bài viết không tồn tại.</div>;
  }

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] pb-24">
      {/* Thanh điều hướng nhanh */}
      <nav className="fixed top-32 left-0 w-full z-40 px-6 md:px-12 pointer-events-none">
        <button 
          onClick={() => router.back()}
          className="pointer-events-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-black/40 hover:text-rose-accent transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-black/5"
        >
          <ChevronLeft size={14} /> Trở về Journal
        </button>
      </nav>

      {/* Hero Header */}
      <header className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--color-ivory)] to-transparent" />
      </header>

      {/* Content Section */}
      <article className="relative z-10 max-w-4xl mx-auto px-6 -mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-sm border border-black/[0.03]"
        >
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-rose-accent font-bold mb-6">
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-black/10" />
            <span className="text-black/40 font-medium">{post.readMin} phút đọc</span>
          </div>

          <h1 className="font-playfair text-4xl md:text-6xl italic leading-tight text-[var(--color-noir)] mb-10">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-black/[0.06] py-6 mb-12">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-rose-blush flex items-center justify-center font-playfair italic text-rose-accent">S</div>
               <div>
                 <p className="text-[10px] uppercase tracking-widest font-bold">SERENA Editorial</p>
                 <p className="text-[9px] text-black/40 uppercase tracking-tighter">{post.date}</p>
               </div>
            </div>
            <button className="text-black/30 hover:text-rose-accent transition-colors">
              <Share2 size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Nội dung bài viết */}
          <div 
            className="prose prose-stone prose-lg max-w-none font-inter text-black/70 leading-[1.8] italic-first-letter
            dangerouslySetInnerHTML"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-20 pt-10 border-t border-black/[0.06] text-center">
            <p className="font-playfair text-xl italic mb-6">"Vẻ đẹp bắt đầu từ khoảnh khắc bạn quyết định là chính mình."</p>
            <div className="h-px w-20 bg-rose-accent/30 mx-auto" />
          </div>
        </motion.div>
      </article>
    </main>
  );
}