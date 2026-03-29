"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Giữ nguyên logic Parallax tuyệt vời của bạn
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-end bg-black"
    >
      {/* Parallax Background Video */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center opacity-60"
        >
          {/* Link video campaign sang trọng */}
          <source 
            src="videos/banner.mp4" 
            type="video/mp4" 
          />
        </video>
      </motion.div>

      {/* Multi-layer gradient overlay - Nâng cấp để video sâu hơn */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Content Area */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-20 md:pb-28"
      >
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-rose-primary" />
            <span className="font-inter text-[0.65rem] tracking-[0.35em] text-rose-primary uppercase">
              Couture Collection 2026
            </span>
          </motion.div>

          {/* Headline - Animated Mask */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-playfair text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-none font-medium"
            >
              Where Art
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-playfair text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-none font-medium italic"
            >
              Meets the Body
            </motion.h1>
          </div>

          {/* Subtext + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-start sm:items-end gap-10"
          >
            <p className="font-cormorant text-lg md:text-xl text-white/60 italic leading-relaxed max-w-sm">
              Handcrafted for women who define their own legacy — one stitch at a time.
            </p>
            <div className="flex items-center gap-6">
              <motion.a
                href="#collections"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-luxury bg-white text-black px-10 py-4 text-[0.65rem] tracking-[0.25em] inline-block shadow-2xl"
              >
                Explore Collection
              </motion.a>
              <motion.a
                href="#bridal"
                whileHover={{ x: 4 }}
                className="btn-luxury text-white/80 hover:text-white text-[0.65rem] tracking-[0.2em] border-b border-white/20 pb-1"
              >
                Bridal Lookbook →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 right-12 z-10 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} strokeWidth={1} className="text-white/40" />
        </motion.div>
        <div className="h-16 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>

      {/* Stats bar - Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-0 right-0 glass-dark border-t border-l border-white/10 px-10 py-6 hidden lg:flex gap-12"
      >
        {[
          { value: "1985", label: "Est." },
          { value: "40+", label: "Designers" },
          { value: "200+", label: "Brides / Year" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-playfair text-2xl text-white font-medium">{value}</p>
            <p className="font-inter text-[0.6rem] text-white/40 tracking-[0.2em] uppercase mt-1">
              {label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}