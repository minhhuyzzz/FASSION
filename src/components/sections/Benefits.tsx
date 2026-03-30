"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gem, Leaf, Ruler, Award } from "lucide-react";

const benefits = [
  {
    Icon: Gem,
    title: "Uncompromising Craft",
    description:
      "Each garment passes through 40+ hours of hand-finishing by our Paris atelier artisans.",
  },
  {
    Icon: Ruler,
    title: "Bespoke Fit",
    description:
      "Personalized measurements and custom alterations ensure your silhouette is perfected.",
  },
  {
    Icon: Leaf,
    title: "Conscious Luxury",
    description:
      "Ethically sourced silks, upcycled lace, and zero-waste ateliers form our foundation.",
  },
  {
    Icon: Award,
    title: "Heritage Excellence",
    description:
      "40 years of Haute Couture tradition, worn by royalty, icons, and visionaries.",
  },
];

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    /* Đã sửa từ bg-rose-blush/50 thành bg-rose-blush để lấy lại màu hồng gốc */
    <section className="py-28 md:py-36 bg-rose-blush">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-inter text-[0.65rem] tracking-[0.3em] text-rose-accent uppercase mb-4"
          >
            The Maison Promise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl text-noir"
          >
            Why Choose <span className="italic text-rose-accent">Lahav</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group bg-white p-10 shadow-luxury hover:shadow-xl transition-all duration-500 relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="relative w-12 h-12 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-rose-primary/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
                <item.Icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-rose-accent relative z-10"
                />
              </div>

              <h3 className="font-playfair text-xl text-noir mb-4 group-hover:text-rose-accent transition-colors duration-300">
                {item.title}
              </h3>
              <p className="font-inter text-sm text-noir/50 leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-rose-primary w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}