"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, ChevronRight, CheckCircle2 } from "lucide-react"; // Đã thêm icon Mail
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase";

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string; // Lấy dữ liệu email

    // --- LOGIC KIỂM TRA SỐ ĐIỆN THOẠI (GIỮ NGUYÊN) ---
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.");
      setIsSubmitting(false);
      return;
    }

    // --- CHỖ SỬA: LOGIC KIỂM TRA EMAIL (MỚI) ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Địa chỉ email không đúng định dạng. Quý cô vui lòng kiểm tra lại.");
      setIsSubmitting(false);
      return;
    }

    const bookingData = {
      full_name: formData.get("full_name"),
      phone: phone,
      email: email, // Đưa email vào dữ liệu gửi đi
      service: formData.get("service"),
      booking_date: formData.get("booking_date"),
      booking_time: formData.get("booking_time"),
      notes: formData.get("notes"),
    };

    try {
      const { error: supabaseError } = await supabase
        .from("bookings")
        .insert([bookingData]);

      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] grain relative">
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          <motion.div 
            className="lg:col-span-5 space-y-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="relative aspect-[3/4] overflow-hidden shadow-luxury group">
              <img 
                src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=1887&auto=format&fit=crop" 
                alt="Consultation Room"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
            </div>

            <div className="space-y-6">
              <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl italic leading-tight text-noir">
                Trải nghiệm <br /> Tư vấn Cá nhân
              </h1>
              <p className="font-inter text-[0.8rem] tracking-widest leading-relaxed text-gray-600 uppercase">
                Chào mừng bạn đến với không gian riêng tư của SERENA. Mỗi cuộc hẹn là một hành trình tìm kiếm vẻ đẹp độc bản.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-7 bg-white p-8 md:p-16 shadow-luxury border border-[var(--color-rose-blush)] relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div key="form" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                  <div className="mb-12">
                    <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl mt-4 italic text-noir">Thông tin cuộc hẹn</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="relative group border-b border-gray-200 py-3 focus-within:border-[var(--color-rose-accent)] transition-all">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 block font-inter">Quý danh</label>
                      <div className="flex items-center gap-4">
                        <User size={14} className="text-gray-300" />
                        <input 
                          name="full_name"
                          type="text" 
                          required 
                          placeholder="Nhập họ và tên..."
                          className="w-full bg-transparent outline-none font-light italic text-sm placeholder:text-gray-300 text-noir"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="relative border-b border-gray-200 py-3 focus-within:border-[var(--color-rose-accent)] transition-all">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 block font-inter">Số điện thoại</label>
                        <div className="flex items-center gap-4">
                          <Phone size={14} className="text-gray-300" />
                          <input 
                            name="phone"
                            type="tel" 
                            required 
                            maxLength={10}
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                            }}
                            placeholder="0901234567"
                            className="w-full bg-transparent outline-none font-light italic text-sm text-noir"
                          />
                        </div>
                      </div>

                      {/* TRƯỜNG EMAIL ĐÃ ĐƯỢC THÊM VÀO ĐỂ ÁP DỤNG LOGIC */}
                      <div className="relative border-b border-gray-200 py-3 focus-within:border-[var(--color-rose-accent)] transition-all">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 block font-inter">Địa chỉ Email</label>
                        <div className="flex items-center gap-4">
                          <Mail size={14} className="text-gray-300" />
                          <input 
                            name="email"
                            type="email" 
                            required 
                            placeholder="vi-du@gmail.com"
                            className="w-full bg-transparent outline-none font-light italic text-sm text-noir"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="relative border-b border-gray-200 py-3 focus-within:border-[var(--color-rose-accent)] transition-all md:col-span-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 block font-inter">Dịch vụ quan tâm</label>
                        <div className="relative">
                          <select 
                            name="service" 
                            required
                            className="w-full bg-transparent outline-none font-light italic text-sm appearance-none cursor-pointer pr-8 text-noir"
                          >
                            <option value="" disabled selected>Chọn dịch vụ...</option>
                            <option value="Couture">Couture Độc Bản</option>
                            <option value="Evening Wear">Trang Phục Cao Cấp</option>
                            <option value="Personal Styling">Phong Cách Cá Nhân</option>
                            <option value="Other">Khác</option>
                          </select>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                            <ChevronRight size={12} className="rotate-90" />
                          </div>
                        </div>
                      </div>
                      <div className="relative border-b border-gray-200 py-3 focus-within:border-[var(--color-rose-accent)] transition-all">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 block font-inter">Ngày mong muốn</label>
                        <div className="flex items-center gap-4">
                          <Calendar size={14} className="text-gray-300" />
                          <input 
                            name="booking_date"
                            type="date" 
                            required
                            className="w-full bg-transparent outline-none font-light text-sm cursor-pointer text-noir"
                          />
                        </div>
                      </div>

                      <div className="relative border-b border-gray-200 py-3 focus-within:border-[var(--color-rose-accent)] transition-all">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 block font-inter">Giờ hẹn</label>
                        <div className="flex items-center gap-4">
                          <Clock size={14} className="text-gray-300" />
                          <input 
                            name="booking_time"
                            type="time" 
                            required
                            className="w-full bg-transparent outline-none font-light text-sm cursor-pointer text-noir"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative border-b border-gray-200 py-3 focus-within:border-[var(--color-rose-accent)] transition-all">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 block font-inter">Ghi chú cho SERENA</label>
                      <div className="flex items-start gap-4">
                        <MessageSquare size={14} className="text-gray-300 mt-1" />
                        <textarea 
                          name="notes"
                          rows={2}
                          placeholder="Hãy chia sẻ thêm về mong muốn của bạn..."
                          className="w-full bg-transparent outline-none font-light italic text-sm resize-none text-noir"
                        />
                      </div>
                    </div>

                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        className="text-[10px] text-red-500 italic tracking-widest font-inter"
                      >
                        * {error}
                      </motion.p>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-luxury group w-full py-6 bg-[var(--color-noir)] text-white hover:bg-[var(--color-rose-accent)] disabled:bg-gray-400 transition-all duration-700 flex items-center justify-center gap-4"
                    >
                      <span className="text-[0.7rem] tracking-[0.3em]">
                        {isSubmitting ? "ĐANG XỬ LÝ..." : "Xác nhận Đặt lịch"}
                      </span>
                      {!isSubmitting && <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-[500px] flex flex-col items-center justify-center text-center space-y-6"
                >
                  <CheckCircle2 size={60} className="text-[var(--color-rose-accent)] stroke-[1px]" />
                  <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl italic text-noir">Cảm ơn Quý cô</h2>
                  <p className="text-[0.7rem] tracking-[0.2em] uppercase text-gray-500 max-w-xs leading-relaxed">
                    Yêu cầu của bạn đã được SERENA tiếp nhận. Chúng tôi sẽ liên hệ lại trong vòng 24 giờ tới.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-[0.6rem] tracking-[0.4em] uppercase border-b border-black pb-1 hover:text-[var(--color-rose-accent)] hover:border-[var(--color-rose-accent)] transition-all"
                  >
                    Quay lại
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}