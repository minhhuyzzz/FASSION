"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gem, Leaf, Ruler, Award } from "lucide-react";

const benefitsRaw = [
  {
    Icon: Gem,
    title: "Thủ công tuyệt mỹ",
    description:
      "Mỗi tuyệt tác trải qua hơn 40 giờ hoàn thiện đính kết thủ công bởi các nghệ nhân tại xưởng may Paris.",
  },
  {
    Icon: Ruler,
    title: "Thiết kế độc bản",
    description:
      "Số đo được tinh chỉnh cá nhân hóa, tôn vinh và ôm trọn đường nét cơ thể của riêng bạn.",
  },
  {
    Icon: Leaf,
    title: "Xa xỉ bền vững",
    description:
      "Nguồn lụa đạo đức và chất liệu ren tái sử dụng làm nền tảng cho thời trang bền vững.",
  },
  {
    Icon: Award,
    title: "Di sản xuất chúng",
    description:
      "Hơn 40 năm gìn giữ truyền thống Haute Couture, được vinh danh bởi giới tinh hoa.",
  },
];

const benefits = benefitsRaw.map((item) => ({
  ...item,
  title: item.title.normalize("NFC"),
  description: item.description.normalize("NFC"),
}));

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const headerInView = useInView(headerRef, { once: true, margin: "-30px" });
  const headingId = "benefits-serena-heading";

  return (
    <section aria-labelledby={headingId} className="py-20 md:py-28 bg-[#F5F2EF] border-t border-black/[0.04]">
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">
        <div ref={headerRef} className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="font-inter text-[0.62rem] tracking-[0.42em] text-rose-accent uppercase mb-4 flex items-center justify-center gap-4"
          >
            <span className="w-8 h-px bg-rose-accent/40" />
            {"Lời hứa của Serena".normalize("NFC")}
            <span className="w-8 h-px bg-rose-accent/40" />
          </motion.p>
          <motion.h2
            id={headingId}
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.06 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl text-noir tracking-tight leading-tight"
          >
            {"Dấu ấn ".normalize("NFC")}
            <span className="italic text-rose-accent">SERENA</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12 }}
            className="mt-4 font-inter text-sm md:text-[0.95rem] text-black/50 leading-relaxed"
          >
            Bốn trụ cột định hình trải nghiệm may đo cao cấp — minh bạch, bền vững và trọn vẹn cảm xúc.
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {benefits.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-black/[0.06] hover:border-rose-accent/25 p-9 lg:p-10 transition-all duration-500 relative flex flex-col items-center text-center rounded-sm shadow-[0_12px_40px_-28px_rgba(0,0,0,0.12)]"
            >
              <div className="relative mb-7 text-rose-accent opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                <item.Icon size={30} strokeWidth={1} aria-hidden />
              </div>

              <h3 className="font-playfair text-xl text-noir mb-3 group-hover:text-rose-accent transition-colors duration-300">
                {item.title}
              </h3>

              <p className="font-cormorant text-[1.05rem] text-noir/60 leading-relaxed italic">
                {item.description}
              </p>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-rose-accent w-0 group-hover:w-1/2 transition-all duration-700 ease-out opacity-60 rounded-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
