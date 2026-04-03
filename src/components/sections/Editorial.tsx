"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Editorial() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const headingId = "editorial-maison-heading";

  return (
    <section
      id="editorial"
      aria-labelledby={headingId}
      className="py-20 md:py-20 bg-[#F5F2EF] overflow-hidden border-y border-black/[0.04]"
    >
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">
        <div ref={ref} className="flex flex-col lg:flex-row items-center mb-16 md:mb-20 relative gap-8 lg:gap-0">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-7/12 relative group"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-sm ring-1 ring-black/[0.06] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.18)]">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=90"
                alt="Trang phục Haute Couture SERENA — chiến dịch Lumière de Paris 2026"
                fill
                className="object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority={false}
              />

              <div className="absolute bottom-5 left-5 bg-white/25 backdrop-blur-md border border-white/35 px-4 py-3 rounded-sm max-w-[min(100%,280px)]">
                <p className="font-inter text-[0.55rem] tracking-[0.22em] text-white uppercase">
                  Chiến dịch 2026
                </p>
                <p className="font-playfair text-lg text-white italic mt-1">Lumière de Paris</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-6/12 relative z-10 lg:-ml-10 xl:-ml-12 mt-2 lg:mt-0"
          >
            <div className="bg-white p-8 md:p-10 lg:p-12 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.12)] border border-black/[0.06] rounded-sm">
              <p className="font-inter text-[0.55rem] tracking-[0.38em] text-rose-accent uppercase mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-rose-accent/40" />
                Câu chuyện nghệ thuật
              </p>
              <h2
                id={headingId}
                className="font-playfair text-3xl md:text-4xl lg:text-[2.75rem] text-noir leading-[1.12] mb-5 tracking-tight"
              >
                Khoác lên mình <br />
                <span className="italic text-rose-accent">ánh sáng dịu dàng</span>
              </h2>
              <p className="font-cormorant text-lg md:text-xl text-noir/70 italic leading-relaxed mb-4">
                &ldquo;Mỗi sợi chỉ mang theo một ý niệm sâu sắc. Bộ sưu tập 2026 khám phá vẻ đẹp nữ tính như
                một công trình kiến trúc — khuôn thước nhưng mềm mại.&rdquo;
              </p>
              <p className="font-inter text-[0.8rem] text-noir/50 leading-relaxed mb-8 text-pretty">
                Lấy cảm hứng từ chiaroscuro thời Phục Hưng, mỗi tác phẩm là sự đối lập có chủ đích giữa lụa
                là và hình thể — nền tảng cho di sản may đo SERENA.
              </p>

              <Link
                href="/our-story"
                className="group inline-flex items-center gap-3 border-b border-rose-accent/35 pb-1.5 hover:border-rose-accent transition-colors duration-500"
              >
                <span className="font-inter text-[0.62rem] tracking-[0.22em] text-noir uppercase group-hover:text-rose-accent transition-colors">
                  Đọc trọn câu chuyện
                </span>
                <ArrowRight size={13} className="text-rose-accent group-hover:translate-x-1 transition-transform duration-300" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>

        <EditorialRow2 />
      </div>
    </section>
  );
}

function EditorialRow2() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
      <motion.figure
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-4 md:mt-10 group"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-white rounded-sm ring-1 ring-black/[0.06]">
          <Image
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85"
            alt="Chi tiết thêu và phom dáng trang phục SERENA trên sàn diễn"
            fill
            className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </motion.figure>

      <motion.blockquote
        initial={{ opacity: 0, scale: 0.98 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.65, delay: 0.08 }}
        className="md:col-span-4 px-4 py-8 md:py-0 flex flex-col items-center text-center"
      >
        <div className="w-px h-8 bg-rose-accent/35 mb-6" aria-hidden />
        <p className="font-playfair text-xl md:text-2xl text-noir italic leading-relaxed mb-4 max-w-sm">
          &ldquo;Thời trang là bộ giáp tuyệt mỹ nhất để đương đầu với thực tại.&rdquo;
        </p>
        <footer className="font-inter text-[0.55rem] text-rose-accent tracking-[0.28em] uppercase">
          — Tuyên ngôn Serena 2026
        </footer>
        <div className="w-px h-8 bg-rose-accent/35 mt-6" aria-hidden />
      </motion.blockquote>

      <motion.figure
        initial={{ opacity: 0, y: -18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-4 md:-mt-6 group"
      >
        <div className="relative aspect-[3/4.5] overflow-hidden bg-white rounded-sm ring-1 ring-black/[0.06]">
          <Image
            src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&q=85"
            alt="Váy cưới và trang phục dạ hội thiết kế riêng tại atelier SERENA"
            fill
            className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </motion.figure>
    </div>
  );
}
