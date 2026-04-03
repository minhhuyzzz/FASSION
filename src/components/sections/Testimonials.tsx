"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Khoác lên mình chiếc váy của SERENA trong ngày trọng đại giống như bước vào một giấc mơ. Từng chi tiết nhỏ đều là một lời tự sự về bản sắc cá nhân tôi. Chưa bao giờ tôi thấy mình rạng rỡ và là chính mình đến thế.",
    author: "Khánh Linh",
    title: "Cô dâu, Hà Nội 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 2,
    quote:
      "Kỹ nghệ thủ công ở đây thực sự thuộc về một thế giới khác. Tôi đã mặc thiết kế Celestine đến sự kiện Met Gala và ba tạp chí lớn đã bình chọn đây là trang phục tinh tế nhất buổi tối hôm đó.",
    author: "Minh Tú",
    title: "Giám đốc sáng tạo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    id: 3,
    quote:
      "Tôi đã từng mặc qua rất nhiều nhà mốt Haute Couture danh tiếng, nhưng chỉ tại SERENA, tôi mới cảm nhận được chiếc váy thực sự sinh ra từ trí tưởng tượng của mình. Một sự xa xỉ độc bản đúng nghĩa.",
    author: "Thảo Tiên",
    title: "Nhà sưu tầm thời trang",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const headingId = useId();
  const regionId = useId();

  const next = useCallback(() => {
    setDir(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section
      className="py-24 md:py-32 bg-noir overflow-hidden border-t border-white/[0.06]"
      aria-labelledby={headingId}
    >
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">
        <header className="text-center mb-14 md:mb-16 max-w-2xl mx-auto">
          <p className="font-inter text-[0.62rem] tracking-[0.42em] text-rose-accent uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-rose-accent/40" />
            Cảm hứng maison
            <span className="w-8 h-px bg-rose-accent/40" />
          </p>
          <h2 id={headingId} className="font-playfair text-3xl sm:text-4xl md:text-5xl text-ivory tracking-tight leading-tight">
            Lời tri ân từ <span className="italic text-rose-accent">tinh hoa</span>
          </h2>
          <p className="mt-4 font-inter text-sm text-ivory/45 leading-relaxed">
            Phản hồi từ khách hàng và đối tác — minh chứng cho hành trình may đo và dịch vụ tại SERENA.
          </p>
        </header>

        <div
          className="relative max-w-4xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={headingId}
          aria-live="polite"
          id={regionId}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="flex justify-center mb-8" aria-hidden>
                <Quote size={44} strokeWidth={0.5} className="text-rose-accent/45" />
              </div>

              <blockquote className="font-cormorant text-xl sm:text-2xl md:text-3xl text-ivory/85 italic leading-relaxed mb-10 px-3 md:px-8">
                <span className="sr-only">Đánh giá {current + 1} trên {testimonials.length}. </span>
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-rose-accent/35 p-1 bg-noir relative">
                  <Image
                    src={t.avatar}
                    alt=""
                    fill
                    className="object-cover rounded-full"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="font-playfair text-ivory text-lg md:text-xl tracking-tight">{t.author}</p>
                  <p className="font-inter text-[0.6rem] text-ivory/40 tracking-[0.2em] uppercase mt-1">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <nav
            className="flex items-center justify-center gap-8 md:gap-10 mt-14"
            aria-label="Chuyển đánh giá"
          >
            <button
              type="button"
              onClick={prev}
              className="group text-ivory/35 hover:text-rose-accent transition-colors duration-300 p-2 rounded-full hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-accent"
              aria-label="Đánh giá trước"
            >
              <ChevronLeft size={26} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <div className="flex gap-3" role="tablist" aria-label="Chọn đánh giá">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-controls={regionId}
                  onClick={() => {
                    setDir(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-0.5 transition-all duration-500 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-accent ${
                    i === current ? "w-10 bg-rose-accent" : "w-4 bg-ivory/12 hover:bg-ivory/30"
                  }`}
                  aria-label={`Đánh giá ${i + 1}, ${item.author}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="group text-ivory/35 hover:text-rose-accent transition-colors duration-300 p-2 rounded-full hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-accent"
              aria-label="Đánh giá sau"
            >
              <ChevronRight size={26} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}
