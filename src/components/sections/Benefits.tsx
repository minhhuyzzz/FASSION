"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gem, Leaf, Ruler, Award } from "lucide-react";

// DỮ LIỆU ĐÃ ĐƯỢC CHUẨN HÓA UNICODE
const benefitsRaw = [
  {
    Icon: Gem,
    title: "Thủ Công Tuyệt Mỹ",
    description:
      "Mỗi tuyệt tác trải qua hơn 40 giờ hoàn thiện đính kết thủ công bởi các nghệ nhân tại xưởng may Paris.",
  },
  {
    Icon: Ruler,
    title: "Thiết Kế Độc Bản",
    description:
      "Các số đo được tinh chỉnh cá nhân hóa, tôn vinh và ôm trọn đường nét cơ thể của riêng bạn.",
  },
  {
    Icon: Leaf,
    title: "Xa Xỉ Bền Vững",
    description:
      "Nguồn lụa đạo đức và chất liệu ren upcycle tạo nên nền tảng cho sự phát triển thời trang bền vững.",
  },
  {
    Icon: Award,
    title: "Di Sản Xuất Chúng",
    description:
      "Hơn 40 năm gìn giữ truyền thống Haute Couture, được vinh danh bởi giới tinh hoa và biểu tượng.",
  },
];

// Hàm này giúp dính các dấu tiếng Việt lại với nhau (NFC)
const benefits = benefitsRaw.map(item => ({
  ...item,
  title: item.title.normalize("NFC"),
  description: item.description.normalize("NFC")
}));

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-20 md:py-24 bg-[#F5F2EF]">
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-inter text-[0.6rem] tracking-[0.4em] text-[#A4717A] uppercase mb-4 flex items-center justify-center gap-4"
          >
            <span className="w-6 h-px bg-[#A4717A]/40" />
            {/* Ép dấu cho cả tiêu đề phụ */}
            {"Lời Hứa Của Maison".normalize("NFC")}
            <span className="w-6 h-px bg-[#A4717A]/40" />
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl text-gray-900 tracking-tight"
          >
            {"Dấu Ấn ".normalize("NFC")}<span className="italic text-[#A4717A]">SERANA</span>
          </motion.h2>
        </div>

        {/* GRID */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-black/5 hover:border-[#A4717A]/30 p-10 lg:p-12 transition-all duration-500 relative flex flex-col items-center text-center"
            >
              <div className="relative mb-8 text-[#A4717A] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                <item.Icon size={28} strokeWidth={1} />
              </div>

              <h3 className="font-playfair text-xl text-gray-900 mb-4 group-hover:text-[#A4717A] transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="font-cormorant text-lg text-gray-900/60 leading-relaxed italic">
                {item.description}
              </p>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#A4717A] w-0 group-hover:w-1/2 transition-all duration-700 ease-out opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}