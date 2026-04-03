"use client";

import { motion } from "framer-motion";
import { Cookie, Eye, ShieldCheck, Settings, RefreshCw } from "lucide-react";

export default function CookiesPage() {
  const cookieSections = [
    {
      icon: <Cookie size={22} strokeWidth={1.5} />,
      title: "1. Cookies là gì?",
      content: "Cookies là những tệp dữ liệu nhỏ được lưu trữ trên thiết bị của quý khách khi truy cập website. Chúng giúp SERENA nhận diện tùy chọn cá nhân, ghi nhớ giỏ hàng và mang lại hành trình mua sắm mượt mà nhất."
    },
    {
      icon: <ShieldCheck size={22} strokeWidth={1.5} />,
      title: "2. Cookies thiết yếu",
      content: "Đây là những cookies bắt buộc để website vận hành ổn định. Chúng cho phép quý khách đăng nhập tài khoản, bảo mật thanh toán và duy trì các sản phẩm đã chọn trong giỏ hàng mà không bị mất dữ liệu khi chuyển trang."
    },
    {
      icon: <Eye size={22} strokeWidth={1.5} />,
      title: "3. Cookies phân tích",
      content: "Chúng tôi sử dụng các công cụ phân tích để hiểu cách quý cô tương tác với các bộ sưu tập. Dữ liệu này hoàn toàn ẩn danh, giúp SERENA cải thiện giao diện và đề xuất những phong cách phù hợp nhất với thị hiếu của quý khách."
    },
    {
      icon: <Settings size={22} strokeWidth={1.5} />,
      title: "4. Quản lý quyền riêng tư",
      content: "Quý khách hoàn toàn có quyền từ chối hoặc xóa cookies thông qua cài đặt trình duyệt. Tuy nhiên, lưu ý rằng việc vô hiệu hóa cookies có thể ảnh hưởng đến một số tính năng cao cấp và trải nghiệm cá nhân hóa trên hệ thống."
    },
    {
      icon: <RefreshCw size={22} strokeWidth={1.5} />,
      title: "5. Cập nhật chính sách",
      content: "Chính sách Cookies có thể được cập nhật định kỳ để phản ánh những thay đổi trong công nghệ hoặc quy định pháp luật. Mọi thay đổi sẽ có hiệu lực ngay khi được đăng tải trên trang web này."
    }
  ];

  return (
    <main className="min-h-screen bg-[#1F1F1F] pt-40 pb-24 px-6 md:px-12 font-inter text-[#FDFAF8]">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#A4717A]/30 mb-8 text-[#A4717A]"
          >
            <Cookie size={24} />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#A4717A] text-[0.6rem] tracking-[0.6em] uppercase mb-4 font-bold"
          >
            Experience Optimization
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-7xl italic tracking-tight mb-8"
          >
            Chính Sách Cookies
          </motion.h1>
          
          <p className="max-w-2xl mx-auto text-white/40 text-xs md:text-sm leading-relaxed font-light italic">
            "Tại SERENA, chúng tôi trân trọng sự riêng tư của quý khách như cách chúng tôi nâng niu từng đường kim mũi chỉ trên những tác phẩm Couture."
          </p>
        </header>

        {/* CONTENT GRID */}
        <div className="space-y-24">
          {cookieSections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/5 pb-16 last:border-0"
            >
              {/* Bên trái: Icon và Tiêu đề */}
              <div className="md:col-span-5 flex items-start gap-5 group">
                <div className="mt-1 text-[#A4717A]/60 group-hover:text-[#A4717A] transition-colors duration-500">
                  {section.icon}
                </div>
                <h2 className="text-[0.75rem] md:text-[0.8rem] tracking-[0.3em] uppercase font-bold text-white/90 leading-relaxed">
                  {section.title}
                </h2>
              </div>
              
              {/* Bên phải: Nội dung chi tiết */}
              <div className="md:col-span-7 text-white/50 text-[0.85rem] md:text-sm leading-[1.8] font-light text-justify">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>

        {/* BOTTOM ACTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-12 bg-white/[0.02] border border-white/5 text-center rounded-sm"
        >
          <h3 className="font-playfair text-2xl italic text-white mb-6">Quý cô muốn thay đổi cài đặt?</h3>
          <p className="text-white/40 text-xs mb-10 tracking-wide">
            Mọi sự lựa chọn của quý khách đều được tôn trọng tại SERENA Atelier.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="bg-[#FDFAF8] text-[#1F1F1F] px-8 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase font-bold hover:bg-[#A4717A] hover:text-white transition-all w-full md:w-auto">
              Chấp nhận tất cả
            </button>
            <button className="border border-white/20 text-white px-8 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-all w-full md:w-auto">
              Cài đặt thủ công
            </button>
          </div>
        </motion.div>

        {/* LAST UPDATE */}
        <p className="mt-20 text-center text-[0.55rem] tracking-[0.4em] uppercase text-white/20">
          Last Revision: April 02, 2026
        </p>

      </div>
    </main>
  );
}