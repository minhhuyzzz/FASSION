"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Ruler, ShieldCheck, Heart } from "lucide-react";

const benefits = [
  {
    Icon: Sparkles,
    title: "Tinh Hoa Nghệ Nhân",
    description:
      "Mỗi đường kim mũi chỉ là một lời cam kết về sự hoàn hảo, được đính kết thủ công hàng chục giờ bởi những bàn tay nghệ nhân tận tâm nhất.",
  },
  {
    Icon: Ruler,
    title: "Số Đo Độc Bản",
    description:
      "Chúng tôi không chỉ cung cấp những bộ váy, chúng tôi tạc nên những tuyệt tác ôm trọn đường nét cơ thể, tôn vinh vẻ đẹp độc nhất của riêng Quý cô.",
  },
  {
    Icon: ShieldCheck,
    title: "Chất Liệu Thượng Hạng",
    description:
      "Từ lụa tơ tằm mềm mại đến ren Pháp tinh xảo, mọi chất liệu đều được tuyển chọn khắt khe để đảm bảo sự xa xỉ và bền vững theo thời gian.",
  },
  {
    Icon: Heart,
    title: "Trải Nghiệm Đặc Quyền",
    description:
      "Tại SERENA, mỗi Thượng khách là một nàng thơ. Chúng tôi lắng nghe và thấu hiểu để biến mọi giấc mơ thời trang của Quý cô thành hiện thực.",
  },
];

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-24 md:py-32 bg-[#FCFAFA] overflow-hidden">
      {/* Họa tiết trang trí chìm */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a4717a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div ref={headerRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={headerInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
            className="inline-block font-inter text-[0.65rem] text-rose-accent uppercase mb-6 tracking-[0.4em]"
          >
            THE PROMISE OF SERENA
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl text-noir leading-tight"
          >
            Triết lý của sự <span className="italic">Hoàn mỹ</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={headerInView ? { width: "80px" } : {}}
            className="h-px bg-rose-accent/40 mx-auto mt-8"
          />
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.45, 0.32, 0.9] }}
              className="group relative p-8 md:p-10 bg-white border border-black/[0.03] hover:border-rose-accent/20 transition-all duration-700 rounded-sm"
            >
              {/* Icon với hiệu ứng mờ ảo */}
              <div className="relative mb-8 flex justify-center">
                <div className="absolute inset-0 bg-rose-accent/5 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                <item.Icon 
                  size={28} 
                  strokeWidth={1.2} 
                  className="text-rose-accent relative z-10 group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              <div className="text-center">
                <h3 className="font-playfair text-xl text-noir mb-4 tracking-wide group-hover:text-rose-accent transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="font-inter text-[13px] text-noir/50 leading-[1.8] font-light tracking-wide">
                  {item.description}
                </p>
              </div>

              {/* Đường kẻ mảnh tinh tế ở đáy card */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-in-out" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}