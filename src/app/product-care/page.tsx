"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const careData = [
  { title: "POLYESTER / TAFFETA", content: ["Ưu tiên giặt tay bằng nước lạnh.", "Để khô tự nhiên, ủi mặt trái nhiệt độ thấp.", "Nên treo để duy trì độ phồng."] },
  { title: "BÔNG / DENIM", content: ["Rửa nhẹ nhàng nước lạnh, riêng.", "Tránh ngâm lâu, phơi trong bóng râm.", "Màu sắc sẽ mềm đi tự nhiên theo thời gian."] },
  { title: "DỆT KIM SƯỜN / DỆT KIM CO GIÃN", content: ["Giặt riêng nước lạnh, định hình khi ẩm.", "Phơi trên mặt phẳng, tránh treo làm giãn dáng."] },
  { title: "LỤA / VOAN", content: ["Giặt khô là lý tưởng nhất.", "Nếu giặt tay, dùng nước lạnh và cực nhẹ nhàng.", "Phơi tránh ánh nắng trực tiếp."] },
  { title: "REN / LƯỚI", content: ["Xử lý tinh tế nước lạnh hoặc giặt chuyên nghiệp.", "Phơi phẳng, giữ khoảng cách với vật sắc nhọn."] },
  { title: "LEN / CASHMERE (100% LEN)", content: ["Khuyến khích giặt khô.", "Giặt tay nước lạnh, phơi phẳng định hình lại.", "Gấp gọn khi lưu trữ."] },
  { title: "LÔNG TƠ / LÔNG VŨ", content: ["Giặt tại cơ sở chuyên nghiệp.", "Đảm bảo sấy khô hoàn toàn ở nhiệt độ thấp."] },
  { title: "VẢI SEQUINED / TRANG TRÍ", content: ["Chỉ giặt khô chuyên nghiệp.", "Tránh ma sát và nhiệt độ cao trực tiếp."] },
  { title: "DA", content: ["Làm sạch tại cơ sở chuyên về đồ da.", "Tránh ẩm và nhiệt, treo móc bản rộng."] },
  { title: "DA THẬT (GIÀY DÉP)", content: ["Lau nhẹ sau khi dùng, dưỡng da định kỳ.", "Lưu trữ nơi khô ráo với cây giữ form."] }
];

export default function ProductCarePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#FDFAF8] pt-20 pb-10 px-6 md:px-12 font-inter text-[#1F1F1F]">
      {/* Khung nhỏ gọn max-w-2xl để thấy hết trong 1 màn hình */}
      <div className="max-w-2xl mx-auto">
        
        {/* TIÊU ĐỀ CĂN TRÁI, ĐẬM, GỌN */}
        <header className="mb-6">
          <h1 className="text-[1.1rem] tracking-wider uppercase font-bold text-black mt-12">
            CHĂM SÓC SẢN PHẨM
          </h1>
        </header>

        {/* DANH SÁCH ACCORDION TỐI GIẢN */}
        <div className="border-t border-black/10">
          {careData.map((item, index) => (
            <div key={index} className="border-b border-black/10">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-4 md:py-5 flex justify-between items-center group text-left outline-none"
              >
                <span className={cn(
                  "text-[0.75rem] md:text-[0.8rem] tracking-wide uppercase transition-all duration-300 font-semibold",
                  openIndex === index ? "text-[#A4717A]" : "text-black/80 group-hover:text-black"
                )}>
                  {item.title}
                </span>
                
                {/* MŨI TÊN ĐẬM NÉT */}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-black"
                >
                  <ChevronDown size={18} strokeWidth={2.5} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 space-y-2 pr-4">
                      {item.content.map((line, lIdx) => (
                        <p key={lIdx} className="text-[0.8rem] leading-relaxed text-black font-medium">
                          • {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* FOOTER NHỎ GỌN */}
        <p className="mt-10 text-[0.55rem] tracking-widest text-black/40 uppercase italic">
          SERANA ATELIER - PRODUCT CARE GUIDE
        </p>
      </div>
    </main>
  );
}