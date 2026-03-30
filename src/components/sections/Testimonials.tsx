"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// DỮ LIỆU TIẾNG VIỆT - Ngôn từ trau chuốt, đậm chất Haute Couture
const testimonials = [
  {
    id: 1,
    quote:
      "Khoác lên mình chiếc váy của Maison Lahav trong ngày trọng đại giống như bước vào một giấc mơ. Từng chi tiết nhỏ đều là một lời tự sự về bản sắc cá nhân tôi. Chưa bao giờ tôi thấy mình rạng rỡ và là chính mình đến thế.",
    author: "Khánh Linh",
    title: "Cô dâu, Hà Nội 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 2,
    quote:
      "Kỹ nghệ thủ công ở đây thực sự thuộc về một thế giới khác. Tôi đã mặc thiết kế Celestine đến sự kiện Met Gala và ba tạp chí lớn đã bình chọn đây là trang phục tinh tế nhất buổi tối hôm đó.",
    author: "Minh Tú",
    title: "Giám đốc Sáng tạo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    id: 3,
    quote:
      "Tôi đã từng mặc qua rất nhiều nhà mốt Haute Couture danh tiếng, nhưng chỉ tại Lahav, tôi mới cảm nhận được chiếc váy thực sự sinh ra từ trí tưởng tượng của mình. Một sự xa xỉ độc bản đúng nghĩa.",
    author: "Thảo Tiên",
    title: "Nhà Sưu tầm Thời trang",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  },
];

// Định nghĩa màu Bege (Ivory) từ file tailwind.config.ts của bạn
const IVORY = "#FDFAF8"; 

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
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    // THAY ĐỔI: Sử dụng nền ĐEN (bg-noir) để tạo độ "nổi bật" kịch tính
    <section className="py-24 md:py-32 bg-noir overflow-hidden">
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">
        
        {/* HEADER */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-inter text-[0.65rem] tracking-[0.4em] text-rose-accent uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-rose-accent/40" />
            Cảm Hứng Maison
            <span className="w-8 h-px bg-rose-accent/40" />
          </p>
          {/* THAY ĐỔI: Tiêu đề dùng màu BEGE (text-ivory) để nổi bật trên nền đen */}
          <h2 className="font-playfair text-4xl md:text-5xl text-ivory tracking-tight">
            Lời Tri Ân Từ <span className="italic text-rose-accent">Tinh Hoa</span>
          </h2>
        </div>

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
              {/* Biểu tượng dấu ngoặc kép màu Hồng Nâu mảnh mai */}
              <div className="flex justify-center mb-10">
                <Quote size={48} strokeWidth={0.5} className="text-rose-accent opacity-40" />
              </div>

              {/* THAY ĐỔI: Nội dung đánh giá dùng màu BEGE nhạt (text-ivory/80) */}
              <blockquote className="font-cormorant text-2xl md:text-3xl text-ivory/80 italic leading-relaxed mb-12 px-4 md:px-10">
                "{t.quote}"
              </blockquote>

              {/* Thông tin khách hàng */}
              <div className="flex flex-col items-center gap-5">
                {/* Viền ảnh dùng màu Hồng Nâu */}
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-rose-accent/30 p-1 bg-noir">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  {/* THAY ĐỔI: Tên tác giả dùng màu BEGE (text-ivory) */}
                  <p className="font-playfair text-ivory text-xl tracking-tight">{t.author}</p>
                  {/* THAY ĐỔI: Chức danh dùng màu BEGE mờ (text-ivory/40) */}
                  <p className="font-inter text-[0.6rem] text-ivory/40 tracking-[0.2em] uppercase mt-1">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-10 mt-14">
            <button
              onClick={prev}
              className="group text-ivory/30 hover:text-rose-accent transition-colors duration-300"
            >
              <ChevronLeft size={24} strokeWidth={1} className="group-hover:-translate-x-1.5 transition-transform" />
            </button>

            {/* Dots */}
            <div className="flex gap-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDir(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-0.5 transition-all duration-500 ${
                    i === current
                      ? "w-10 bg-rose-accent"
                      : "w-4 bg-ivory/10 hover:bg-ivory/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="group text-ivory/30 hover:text-rose-accent transition-colors duration-300"
            >
              <ChevronRight size={24} strokeWidth={1} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}