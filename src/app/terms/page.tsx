"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Scale, FileText, Lock, HelpCircle } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: <FileText size={20} />,
      title: "1. Chấp thuận điều khoản",
      content: "Bằng việc truy cập và sử dụng website SERENA, quý khách mặc nhiên đồng ý với các điều khoản và điều kiện này. Chúng tôi có quyền thay đổi, chỉnh sửa hoặc cập nhật các điều khoản bất kỳ lúc nào mà không cần thông báo trước."
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "2. Sở hữu trí tuệ",
      content: "Tất cả nội dung, hình ảnh, thiết kế độc quyền và logo trên hệ thống đều thuộc sở hữu của SERENA Atelier. Mọi hành vi sao chép, phân phối hoặc sử dụng cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản đều bị nghiêm cấm."
    },
    {
      icon: <Scale size={20} />,
      title: "3. Chính sách đặt lịch & Thanh toán",
      content: "Dịch vụ tư vấn Couture yêu cầu đặt lịch trước. Các khoản đặt cọc cho dịch vụ thiết kế riêng sẽ không được hoàn lại trong trường hợp quý khách hủy lịch sau 24 giờ kể từ thời điểm xác nhận."
    },
    {
      icon: <Lock size={20} />,
      title: "4. Bảo mật thông tin",
      content: "SERENA cam kết bảo vệ dữ liệu cá nhân của quý khách theo tiêu chuẩn bảo mật cao nhất. Thông tin của quý khách chỉ được sử dụng để cá nhân hóa trải nghiệm mua sắm và hỗ trợ dịch vụ chăm sóc khách hàng."
    },
    {
      icon: <HelpCircle size={20} />,
      title: "5. Giới hạn trách nhiệm",
      content: "Chúng tôi nỗ lực đảm bảo hình ảnh sản phẩm phản ánh chính xác nhất thực tế. Tuy nhiên, do đặc thù của màn hình hiển thị và thủ công trong may mặc, màu sắc và chi tiết có thể có sự sai lệch nhỏ không đáng kể."
    }
  ];

  return (
    <main className="min-h-screen bg-[#1F1F1F] pt-40 pb-24 px-6 md:px-12 font-inter text-[#FDFAF8]">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-24 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#A4717A] text-[0.6rem] tracking-[0.6em] uppercase mb-4 font-bold"
          >
            Legal & Privacy
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-7xl italic tracking-tight"
          >
            Điều Khoản Dịch Vụ
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            className="h-[1px] bg-white/20 mx-auto mt-12"
          />
        </header>

        {/* CONTENT SECTIONS */}
        <div className="space-y-20">
          {sections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              <div className="md:col-span-4 flex items-center gap-4 group">
                <div className="text-[#A4717A] group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h2 className="text-[0.7rem] tracking-[0.3em] uppercase font-bold text-white/90">
                  {section.title}
                </h2>
              </div>
              <div className="md:col-span-8 text-white/50 text-sm leading-relaxed font-light text-justify">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 pt-16 border-t border-white/5 text-center"
        >
          <p className="text-[0.55rem] tracking-[0.4em] uppercase text-white/30 mb-8">
            Cập nhật lần cuối: Tháng 4, 2026
          </p>
          <button className="border border-white/20 px-10 py-4 text-[0.6rem] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">
            Tải về bản PDF
          </button>
        </motion.footer>

      </div>
    </main>
  );
}