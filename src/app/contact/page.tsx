"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Phone, MapPin, Send, 
  CheckCircle2, Clock, ArrowRight, 
  Instagram, Facebook, Globe 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const phone = formData.get("phone")?.toString() || "";

    // RÀNG BUỘC LOGIC: Kiểm tra độ dài chuỗi phải đúng 10 ký tự
    if (phone.length !== 10) {
      alert("Số điện thoại phải bao gồm đúng 10 chữ số.");
      return;
    }

    setIsSubmitting(true);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: phone,
      message: formData.get("message"),
    };

    try {
      const { error } = await supabase.from("contacts").insert([data]);
      if (error) throw error;
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Đã xảy ra lỗi, quý khách vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F2EF] relative pb-32 overflow-hidden font-inter">
      {/* LỚP PHỦ TEXTURE GIẤY TỰ NHIÊN */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* SECTION 1: TIÊU ĐỀ EDITORIAL */}
        <header className="pt-48 pb-24 border-b border-black/5">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-[#A4717A] text-[0.6rem] tracking-[0.6em] uppercase mb-8 block font-bold">
                Private Consultation
              </span>
              <h1 className="font-playfair text-6xl md:text-8xl italic leading-[0.9] tracking-tighter text-black">
                Tâm tình cùng <br /> 
                <span className="text-[#A4717A] not-italic drop-shadow-sm">SERENA</span>
              </h1>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="lg:max-w-md pb-4"
            >
              <p className="text-[0.8rem] leading-relaxed text-black/50 uppercase tracking-[0.2em] italic font-medium">
                "Mọi thắc mắc của quý cô đều sẽ được chúng tôi lắng nghe và phản hồi một cách tinh tế nhất."
              </p>
            </motion.div>
          </div>
        </header>

        {/* SECTION 2: THÔNG TIN & FORM */}
        <section className="py-24">
          <div className="grid lg:grid-cols-12 gap-20">
            
            {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ */}
            <motion.div 
              className="lg:col-span-5 space-y-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-12">
                <div className="group flex gap-8">
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:border-[#A4717A] transition-colors duration-500 bg-white shadow-sm">
                    <MapPin size={18} className="text-[#A4717A]" />
                  </div>
                  <div>
                    <h3 className="text-[0.6rem] uppercase tracking-[0.4em] text-black/40 mb-3 font-bold">Không gian Atelier</h3>
                    <p className="text-sm font-medium text-black/80 leading-relaxed italic">
                      Số 12 Nguyễn Văn Bảo, Phường 4, <br />
                      Quận Gò Vấp, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="group flex gap-8">
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:border-[#A4717A] transition-colors duration-500 bg-white shadow-sm">
                    <Clock size={18} className="text-[#A4717A]" />
                  </div>
                  <div>
                    <h3 className="text-[0.6rem] uppercase tracking-[0.4em] text-black/40 mb-3 font-bold">Thời gian mở cửa</h3>
                    <p className="text-sm font-medium text-black/80 leading-relaxed">Thứ Hai – Chủ Nhật <br /> 09:00 – 21:00</p>
                  </div>
                </div>

                <div className="group flex gap-8">
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:border-[#A4717A] transition-colors duration-500 bg-white shadow-sm">
                    <Phone size={18} className="text-[#A4717A]" />
                  </div>
                  <div>
                    <h3 className="text-[0.6rem] uppercase tracking-[0.4em] text-black/40 mb-3 font-bold">Đường dây đặc quyền</h3>
                    <p className="text-xl font-playfair italic text-black">+ 0777868762</p>
                  </div>
                </div>
              </div>

              {/* Mạng xã hội */}
              <div className="pt-12 border-t border-black/5 space-y-6">
                <h4 className="text-[0.6rem] uppercase tracking-[0.4em] text-black/20 font-bold">Theo dõi câu chuyện</h4>
                <div className="flex gap-8">
                  {[Globe].map((Icon, i) => (
                    <a key={i} href="#" className="text-black/30 hover:text-[#A4717A] transition-colors">
                      <Icon size={20} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CỘT PHẢI: LUXURY FORM */}
            <motion.div 
              className="lg:col-span-7 bg-white p-10 md:p-20 shadow-[20px_20px_60px_#d9d6d3,-20px_-20px_60px_#ffffff] rounded-sm relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <form key="contact-form" onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="relative group">
                        <label className="text-[0.55rem] uppercase tracking-[0.4em] text-black/40 mb-2 block font-bold group-focus-within:text-[#A4717A] transition-colors">Quý danh</label>
                        <input name="name" type="text" required className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-[#A4717A] transition-all text-sm italic font-medium text-black" placeholder="Tên của quý cô..." />
                      </div>
                      <div className="relative group">
                        <label className="text-[0.55rem] uppercase tracking-[0.4em] text-black/40 mb-2 block font-bold group-focus-within:text-[#A4717A] transition-colors">Số điện thoại</label>
                        {/* THÊM RÀNG BUỘC: 
                            - type="tel": Mở bàn phím số trên mobile.
                            - maxLength={10}: Chặn nhập quá 10 ký tự.
                            - pattern: Yêu cầu trình duyệt kiểm tra đúng 10 chữ số.
                            - onInput: Ngăn chặn nhập các ký tự không phải là số ngay lập tức.
                        */}
                        <input 
                          name="phone" 
                          type="tel" 
                          required 
                          maxLength={10}
                          pattern="[0-9]{10}"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                          }}
                          className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-[#A4717A] transition-all text-sm font-medium text-black" 
                          placeholder="09xx..." 
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="text-[0.55rem] uppercase tracking-[0.4em] text-black/40 mb-2 block font-bold group-focus-within:text-[#A4717A] transition-colors">Địa chỉ Email</label>
                      <input name="email" type="email" required className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-[#A4717A] transition-all text-sm font-medium text-black" placeholder="email@serena.vn" />
                    </div>

                    <div className="relative group">
                      <label className="text-[0.55rem] uppercase tracking-[0.4em] text-black/40 mb-2 block font-bold group-focus-within:text-[#A4717A] transition-colors">Lời nhắn tâm tình</label>
                      <textarea name="message" rows={4} required className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-[#A4717A] transition-all text-sm italic font-medium resize-none text-black" placeholder="Hãy chia sẻ mong muốn của bạn..." />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white py-6 text-[0.7rem] tracking-[0.5em] uppercase font-bold hover:bg-[#A4717A] transition-all duration-700 flex items-center justify-center gap-4 disabled:bg-gray-200 shadow-xl overflow-hidden group/btn"
                    >
                      <span className="relative z-10">{isSubmitting ? "Đang gửi đi..." : "Gửi lời nhắn"}</span>
                      <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 space-y-8"
                  >
                    <CheckCircle2 size={60} className="mx-auto text-[#A4717A] stroke-[1px]" />
                    <div className="space-y-4">
                      <h2 className="font-playfair text-4xl italic text-black">Gửi thành công</h2>
                      <p className="text-[0.6rem] uppercase tracking-[0.3em] text-black/40 max-w-xs mx-auto leading-loose">
                        Chúng tôi đã nhận được tâm ý của bạn và sẽ sớm phản hồi.
                      </p>
                    </div>
                    <button onClick={() => setIsSuccess(false)} className="text-[0.6rem] border-b border-black uppercase tracking-[0.4em] pb-1 text-black hover:text-[#A4717A] hover:border-[#A4717A] transition-all font-bold">Quay lại</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: BẢN ĐỒ */}
        <section className="py-24 border-t border-black/5">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
              <h2 className="font-playfair text-4xl italic text-black">Tìm đường đến <br/> Atelier</h2>
              <p className="text-[0.7rem] leading-relaxed text-black/40 font-medium italic">
                Tọa lạc tại trung tâm, chúng tôi luôn sẵn sàng đón tiếp quý cô đến trải nghiệm trực tiếp.
              </p>
              <div className="h-px w-20 bg-[#A4717A]/40 mx-auto lg:mx-0" />
            </div>
            
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/7] md:aspect-[21/9] rounded-[3rem] overflow-hidden border border-black/5 shadow-luxury transition-all duration-500 hover:shadow-2xl">
                <iframe
                  title="Vị trí SERENA"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.925114705307!2d106.678000!3d10.816000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ4JzU3LjYiTiAxMDbCsDQwJzQwLjgiRQ!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}