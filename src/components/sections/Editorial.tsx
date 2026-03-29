"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Editorial() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="editorial" className="py-28 md:py-40 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">

        {/* Section 1: Large image left, text right */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center mb-32">
          {/* Image block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="img-zoom relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=90"
                alt="Editorial Spread"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              {/* Floating label */}
              <div className="absolute bottom-8 left-8 glass px-6 py-4">
                <p className="font-inter text-[0.6rem] tracking-[0.2em] text-white/60 uppercase">
                  Campaign 2025
                </p>
                <p className="font-playfair text-xl text-white italic mt-1">
                  Lumière de Paris
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:pl-20 pt-10 lg:pt-0"
          >
            <p className="font-inter text-[0.65rem] tracking-[0.3em] text-rose-accent uppercase mb-6">
              The Story
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-noir leading-tight mb-8">
              Dressed in<br />
              <span className="italic text-rose-accent">whispered</span> light
            </h2>
            <p className="font-cormorant text-xl text-noir/60 italic leading-relaxed mb-8">
              Every thread carries the weight of intention. Our 2025 collection explores femininity as architecture — structured yet fluid, bold yet intimate.
            </p>
            <p className="font-inter text-sm text-noir/50 leading-relaxed mb-10">
              Inspired by the chiaroscuro paintings of the Renaissance, each piece is a study in contrast — between fabric and form, shadow and radiance, tradition and the avant-garde.
            </p>
            <motion.a
              href="#"
              whileHover={{ x: 6 }}
              className="btn-luxury text-rose-accent text-[0.65rem] tracking-[0.25em] inline-flex items-center gap-3"
            >
              Read the Full Story
              <span className="h-px w-8 bg-rose-accent inline-block" />
            </motion.a>
          </motion.div>
        </div>

        {/* Section 2: Two images with overlapping text */}
        <EditorialRow2 />
      </div>
    </section>
  );
}

function EditorialRow2() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
      {/* Small image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-4 lg:mb-20"
      >
        <div className="img-zoom relative aspect-[3/4] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85"
            alt="Editorial detail"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      </motion.div>

      {/* Floating quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="lg:col-span-3 lg:px-8 py-8 lg:py-0"
      >
        <div className="border-l-2 border-rose-primary pl-8">
          <p className="font-playfair text-2xl md:text-3xl text-noir italic leading-relaxed">
            "Fashion is the armor to survive everyday life."
          </p>
          <p className="font-inter text-xs text-rose-accent/70 tracking-[0.2em] uppercase mt-4">
            — Maison Lahav, Manifesto 2025
          </p>
        </div>
      </motion.div>

      {/* Tall image */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-5"
      >
        <div className="img-zoom relative aspect-[3/4] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&q=85"
            alt="Editorial gown"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 41vw"
          />
        </div>
      </motion.div>
    </div>
  );
}
