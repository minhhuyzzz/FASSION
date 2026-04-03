"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { subscribeNewsletter } from "@/lib/subscribe-newsletter";

type JournalPost = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  featured: boolean;
  readMin?: number;
};

const journalData: JournalPost[] = [
  {
    id: 1,
    category: "Nghệ thuật",
    title: "Kỹ thuật xếp nếp (Draping): Linh hồn của Haute Couture",
    excerpt:
      "Khám phá hành trình từ những thước vải lụa thô sơ đến những đường cong hoàn mỹ trên cơ thể người phụ nữ...",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop",
    date: "25.03.2026",
    featured: true,
    readMin: 8,
  },
  {
    id: 2,
    category: "Xu hướng",
    title: "Sắc trắng Blanc: Sự lên ngôi của tối giản thượng lưu",
    excerpt: "Tại sao sắc trắng luôn là lựa chọn vĩnh cửu của những quý cô định hình phong cách riêng?",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    date: "20.03.2026",
    featured: false,
    readMin: 5,
  },
  {
    id: 3,
    category: "Phong cách",
    title: "Phụ kiện Di sản: Điểm nhấn từ những điều nhỏ bé",
    excerpt: "Cách lựa chọn trang sức và túi xách để tôn vinh bộ trang phục thiết kế của bạn.",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop",
    date: "15.03.2026",
    featured: false,
    readMin: 6,
  },
  {
    id: 4,
    category: "Sự kiện",
    title: "SERENA tại Tuần lễ Thời trang Xuân Hè 2026",
    excerpt:
      "Nhìn lại những khoảnh khắc rực rỡ nhất của bộ sưu tập 'Lửa & Lụa' trên sàn diễn quốc tế.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop",
    date: "10.03.2026",
    featured: false,
    readMin: 7,
  },
];

export default function JournalPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [nlEmail, setNlEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [nlError, setNlError] = useState<string | null>(null);

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNlStatus("loading");
    setNlError(null);
    const result = await subscribeNewsletter(nlEmail);
    if (result.ok) {
      setNlStatus("success");
      setNlEmail("");
    } else {
      setNlStatus("error");
      setNlError(result.message);
    }
  }

  const categories = useMemo(() => {
    const set = new Set(journalData.map((p) => p.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return journalData.filter((post) => {
      const matchCat = category === "all" || post.category === category;
      if (!q) return matchCat;
      const blob = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      return matchCat && blob.includes(q);
    });
  }, [query, category]);

  const featuredPost = filtered.find((post) => post.featured);
  const regularPosts = filtered.filter((post) => !post.featured);
  const noResults = filtered.length === 0;

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain pb-24 md:pb-32 overflow-x-hidden">
      {/* ambient */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-5%,rgba(164,113,122,0.08),transparent_50%)]"
        aria-hidden
      />

      <section className="relative pt-36 md:pt-44 pb-16 md:pb-20 px-5 sm:px-8 md:px-12 max-w-[1440px] mx-auto border-b border-black/[0.06]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-rose-accent/60" />
              <span className="text-[10px] uppercase tracking-[0.45em] text-black/55 font-medium">
                Ấn bản số
              </span>
            </div>
            <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic leading-[0.95] text-[var(--color-noir)] tracking-tight">
              SERENA Journal
            </h1>
            <p className="mt-6 font-inter text-sm md:text-[0.95rem] text-black/50 leading-relaxed max-w-lg">
              Câu chuyện nghệ thuật may đo, xu hướng và phong cách — được biên tập như một tạp chí in.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="w-full lg:max-w-md shrink-0 space-y-5"
          >
            <label className="flex items-center gap-3 border-b border-black/15 pb-3 focus-within:border-rose-accent/50 transition-colors">
              <Search size={17} strokeWidth={1.25} className="text-black/35 shrink-0" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm theo chủ đề, từ khóa..."
                className="bg-transparent outline-none text-[0.72rem] uppercase tracking-[0.12em] w-full placeholder:text-black/25 text-black/80"
                aria-label="Tìm kiếm bài viết"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border transition-all ${
                  category === "all"
                    ? "bg-[var(--color-noir)] text-[var(--color-ivory)] border-[var(--color-noir)]"
                    : "bg-white/60 border-black/10 text-black/45 hover:border-black/25"
                }`}
              >
                Tất cả
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`text-[9px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border transition-all ${
                    category === c
                      ? "bg-rose-accent/15 border-rose-accent/40 text-rose-deep font-medium"
                      : "bg-transparent border-black/8 text-black/45 hover:border-black/20"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {noResults ? (
        <section className="py-24 px-6 text-center max-w-lg mx-auto">
          <p className="font-playfair text-2xl md:text-3xl italic text-black/75 mb-3">Không tìm thấy bài phù hợp</p>
          <p className="text-sm text-black/45 mb-8">Thử bỏ bộ lọc hoặc từ khóa khác.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="text-[10px] uppercase tracking-[0.3em] border-b border-rose-accent/50 pb-1 text-rose-accent hover:border-rose-accent transition-colors"
          >
            Xóa bộ lọc
          </button>
        </section>
      ) : (
        <>
      {featuredPost && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative py-16 md:py-24 px-5 sm:px-8 md:px-12 max-w-[1440px] mx-auto"
          >
            <Link
              href={`/blog/${featuredPost.id}`}
              className="group block rounded-sm overflow-hidden ring-1 ring-black/[0.06] shadow-[0_32px_80px_-32px_rgba(0,0,0,0.35)] bg-white"
            >
              <div className="grid lg:grid-cols-12 gap-0 lg:gap-0 items-stretch">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-80 lg:opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2 text-white/90">
                    <Sparkles size={14} className="opacity-80 shrink-0" aria-hidden />
                    <span className="text-[10px] uppercase tracking-[0.35em] font-medium">Bài nổi bật</span>
                  </div>
                </div>
                <div className="lg:col-span-5 p-8 md:p-12 lg:p-14 flex flex-col justify-center space-y-6 bg-gradient-to-br from-white to-rose-blush/30">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-rose-accent font-semibold">
                    Editor&apos;s Pick — {featuredPost.category}
                  </span>
                  <h2 className="font-playfair text-3xl sm:text-4xl md:text-[2.6rem] italic leading-tight text-[var(--color-noir)] group-hover:text-rose-accent transition-colors duration-500">
                    {featuredPost.title}
                  </h2>
                  <p className="font-inter text-[0.88rem] leading-relaxed text-black/55 font-light">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-[10px] uppercase tracking-[0.2em] text-black/40">
                    <span>{featuredPost.date}</span>
                    {featuredPost.readMin != null && (
                      <>
                        <span className="text-black/20">·</span>
                        <span>{featuredPost.readMin} phút đọc</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-[var(--color-noir)] group-hover:text-rose-accent transition-colors">
                      Đọc câu chuyện
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-rose-accent group-hover:translate-x-1.5 transition-transform duration-400"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.section>
      )}

      <section className="py-6 md:py-10 px-5 sm:px-8 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between gap-4 border-b border-black/[0.06] pb-6 mb-12 md:mb-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-2">Mục lục</p>
            <h2 className="font-playfair text-2xl md:text-3xl italic text-[var(--color-noir)]">Các bài viết khác</h2>
          </div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/35 hidden sm:block tabular-nums">
            {regularPosts.length} bài
          </p>
        </div>

        {regularPosts.length === 0 ? (
          featuredPost ? (
            <p className="text-center text-black/40 py-12 font-inter text-sm italic">
              Các bài khác sẽ sớm được cập nhật.
            </p>
          ) : null
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-16 md:gap-y-20">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.08, 0.24), duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <Link href={`/blog/${post.id}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-white ring-1 ring-black/[0.06] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.28)] mb-8 transition-all duration-500 group-hover:ring-rose-accent/25 group-hover:shadow-[0_32px_70px_-24px_rgba(164,113,122,0.2)]">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover transition-all duration-[1.4s] ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 font-playfair text-4xl text-white/25 italic select-none pointer-events-none">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  </div>
                  <div className="space-y-3 px-0.5">
                    <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.28em] text-black/45">
                      <span className="text-rose-accent/90 font-medium">{post.category}</span>
                      <span className="tabular-nums">{post.date}</span>
                    </div>
                    <h3 className="font-playfair text-xl md:text-2xl italic leading-snug text-[var(--color-noir)] group-hover:text-rose-accent transition-colors duration-400 line-clamp-3">
                      {post.title}
                    </h3>
                    <p className="text-[0.8rem] leading-relaxed text-black/50 font-light line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/[0.05] mt-4">
                      <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-black/55 group-hover:text-rose-accent transition-colors flex items-center gap-2">
                        Khám phá
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      {post.readMin != null && (
                        <span className="text-[9px] uppercase tracking-[0.15em] text-black/35">{post.readMin} phút</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>
        </>
      )}

      <section className="mt-12 md:mt-20 px-5 sm:px-8 md:px-12 max-w-[1440px] mx-auto">
        <div className="relative bg-[var(--color-noir)] py-20 md:py-28 px-6 md:px-16 text-center overflow-hidden rounded-sm ring-1 ring-white/10">
          <div className="absolute inset-0 opacity-[0.15] grain pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-rose-accent/50 to-transparent" />
          <motion.div
            className="relative z-10 max-w-xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl italic text-[var(--color-ivory)] leading-tight">
              Theo dấu những câu chuyện mới nhất
            </h2>
            <p className="text-[0.68rem] uppercase tracking-[0.38em] text-white/45">
              Đăng ký nhận đặc quyền từ SERENA Atelier
            </p>
            {nlStatus === "success" ? (
              <div className="max-w-md mx-auto flex items-start gap-4 text-left bg-white/5 border border-rose-accent/25 rounded-sm px-5 py-4">
                <CheckCircle2 className="text-rose-primary shrink-0 mt-0.5" size={22} strokeWidth={1.25} />
                <div>
                  <p className="font-playfair text-lg text-[var(--color-ivory)]">Đã gửi thư chào mừng.</p>
                  <p className="font-inter text-[0.7rem] text-white/45 mt-1">Vui lòng kiểm tra hộp thư (cả mục spam).</p>
                </div>
              </div>
            ) : (
              <form
                className="max-w-md mx-auto flex gap-3 border-b border-white/20 pb-2 focus-within:border-rose-accent/60 transition-colors"
                onSubmit={handleNewsletterSubmit}
              >
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  disabled={nlStatus === "loading"}
                  placeholder="Địa chỉ email..."
                  className="bg-transparent w-full outline-none text-xs font-light tracking-[0.12em] text-[var(--color-ivory)] placeholder:text-white/25 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={nlStatus === "loading"}
                  className="text-[var(--color-ivory)] hover:text-rose-primary transition-colors p-1 disabled:opacity-50"
                  aria-label="Gửi đăng ký"
                >
                  {nlStatus === "loading" ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
                </button>
              </form>
            )}
            {nlStatus === "error" && nlError && (
              <p className="text-sm text-red-300/90 max-w-md mx-auto">{nlError}</p>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
