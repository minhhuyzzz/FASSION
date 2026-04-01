"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function Editorial() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    // THAY ĐỔI: Giảm py-40 xuống py-20 để thu gọn khoảng trống trên/dưới của cả khu vực
    <section id="editorial" className="py-16 md:py-10 bg-[#F5F2EF] overflow-hidden">
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">

        {/* PHẦN 1: BỐ CỤC GỐI ĐẦU (OVERLAP) */}
        {/* THAY ĐỔI: Giảm mb-32 xuống mb-16 để kéo phần 2 lên gần hơn */}
        <div ref={ref} className="flex flex-col lg:flex-row items-center mb-16 md:mb-20 relative">
          
          {/* Khối Ảnh Lớn */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-7/12 relative group"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-white">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=90"
                alt="Editorial Spread"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              
              <div className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-3">
                <p className="font-inter text-[0.55rem] tracking-[0.2em] text-white uppercase">
                  Chiến Dịch 2026
                </p>
                <p className="font-playfair text-lg text-white italic mt-1">
                  Lumière de Paris
                </p>
              </div>
            </div>
          </motion.div>

          {/* Khối Chữ Gối Đầu */}
          {/* THAY ĐỔI: Giảm margin âm (-ml-24 xuống -ml-12) để khối chữ đè vừa phải, gọn gàng hơn */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-6/12 relative z-10 lg:-ml-12 mt-6 lg:mt-0"
          >
            {/* THAY ĐỔI: Giảm padding bên trong khối chữ (p-20 xuống p-8/p-12) */}
            <div className="bg-white p-8 md:p-10 lg:p-12 shadow-sm border border-black/5">
              <p className="font-inter text-[0.55rem] tracking-[0.4em] text-[#A4717A] uppercase mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-[#A4717A]/40" />
                Câu Chuyện Nghệ Thuật
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6 tracking-tight">
                Khoác lên mình <br />
                <span className="italic" style={{ color: "#A4717A" }}>ánh sáng dịu dàng</span>
              </h2>
              <p className="font-cormorant text-lg text-gray-900/70 italic leading-relaxed mb-5">
                "Mỗi sợi chỉ mang theo một ý niệm sâu sắc. Bộ sưu tập 2026 khám phá vẻ đẹp nữ tính như một công trình kiến trúc — khuôn thước nhưng mềm mại."
              </p>
              <p className="font-inter text-[0.75rem] text-gray-900/50 leading-relaxed mb-8 text-justify">
                Lấy cảm hứng từ nghệ thuật hội họa ánh sáng (chiaroscuro) thời Phục Hưng, mỗi tác phẩm là một bản giao hưởng của sự đối lập — giữa lụa là và hình thể, giữa bóng tối và hào quang.
              </p>
              
              <motion.a
                href="/our-story"
                className="group inline-flex items-center gap-3 border-b border-[#A4717A]/40 pb-1.5 hover:border-[#A4717A] transition-colors duration-500"
              >
                <span className="font-inter text-[0.6rem] tracking-[0.25em] text-gray-900 uppercase group-hover:text-[#A4717A] transition-colors">
                  Đọc Trọn Câu Chuyện
                </span>
                <ArrowRight size={12} className="text-[#A4717A] group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.a>
            </div>
          </motion.div>

        </div>

        {/* PHẦN 2: LƯỚI TẠP CHÍ - ĐÃ ĐƯỢC THU GỌN KHOẢNG CÁCH */}
        <EditorialRow2 />
      </div>
    </section>
  );
}

function EditorialRow2() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    // THAY ĐỔI: Giảm gap giữa các cột từ gap-8 xuống gap-6
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      
      {/* Cột 1: Ảnh nhỏ bên trái */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        // THAY ĐỔI: Giảm độ lệch mt-32 xuống mt-12 để các khối không bị xa nhau quá
        className="md:col-span-4 md:mt-12 group"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-white">
          <Image
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85"
            alt="Chi tiết nghệ thuật"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </motion.div>

      {/* Cột 2: Trích dẫn ở giữa */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="md:col-span-4 px-4 py-8 md:py-0 flex flex-col items-center text-center"
      >
        {/* THAY ĐỔI: Thu ngắn chiều dài đường gạch dọc (h-16 xuống h-8) */}
        <div className="w-px h-8 bg-[#A4717A]/30 mb-6" />
        <p className="font-playfair text-xl md:text-2xl text-gray-900 italic leading-relaxed mb-4">
          "Thời trang là bộ giáp tuyệt mỹ nhất để đương đầu với thực tại."
        </p>
        <p className="font-inter text-[0.55rem] text-[#A4717A] tracking-[0.3em] uppercase">
          — Tuyên ngôn Serena 2026
        </p>
        <div className="w-px h-8 bg-[#A4717A]/30 mt-6" />
      </motion.div>

      {/* Cột 3: Ảnh cao bên phải */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        // THAY ĐỔI: Giảm độ lệch -mt-16 xuống -mt-8
        className="md:col-span-4 md:-mt-8 group"
      >
        <div className="relative aspect-[3/4.5] overflow-hidden bg-white">
          <Image
            src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&q=85"
            alt="Tác phẩm váy cưới"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </motion.div>
      
    </div>
  );
}