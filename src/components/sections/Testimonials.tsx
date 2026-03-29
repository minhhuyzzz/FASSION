"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const testimonials = [
  {
    id: 1,
    quote:
      "Wearing Maison Lahav on my wedding day was like stepping into a dream. Every detail was a love letter to who I am. I've never felt so completely myself.",
    author: "Amélie Fontaine",
    title: "Bride, Paris 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 2,
    quote:
      "The craftsmanship is otherworldly. I wore the Celestine gown to the Met and three publications called it the most exquisite piece of the evening.",
    author: "Isabella Voss",
    title: "Creative Director, Berlin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    id: 3,
    quote:
      "I've worn couture from every major house. Lahav is the only one where the dress felt like it was born from my own imagination. Truly bespoke luxury.",
    author: "Natasha Kim",
    title: "Philanthropist & Collector",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const next = useCallback(() => {
    setDir(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setDir(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section className="py-28 md:py-40 bg-noir overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <FadeIn>
          <p className="text-center font-inter text-[0.65rem] tracking-[0.3em] text-rose-primary/60 uppercase mb-4">
            Client Stories
          </p>
          <h2 className="text-center font-playfair text-4xl md:text-5xl text-white mb-20">
            Words of{" "}
            <span className="italic text-rose-primary">Devotion</span>
          </h2>
        </FadeIn>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-rose-primary fill-rose-primary"
                  />
                ))}
              </div>

              {/* Quote mark */}
              <p className="font-playfair text-8xl text-rose-primary/20 leading-none mb-4">
                "
              </p>

              <blockquote className="font-cormorant text-2xl md:text-3xl text-white/80 italic leading-relaxed mb-12 px-4 md:px-0">
                {t.quote}
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-rose-primary/30">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-playfair text-white text-lg">{t.author}</p>
                  <p className="font-inter text-xs text-white/30 tracking-[0.15em] mt-1">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mt-14">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:border-rose-primary hover:text-rose-primary transition-colors duration-300"
            >
              <ChevronLeft size={16} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDir(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`transition-all duration-300 ${
                    i === current
                      ? "w-8 h-0.5 bg-rose-primary"
                      : "w-2 h-0.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:border-rose-primary hover:text-rose-primary transition-colors duration-300"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
