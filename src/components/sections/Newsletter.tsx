"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Khởi tạo Supabase (Bạn nên đưa cái này ra file riêng nếu dùng nhiều nơi)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 1. Lưu vào Supabase
      const { error: supabaseError } = await supabase
        .from("subscribers")
        .insert([{ email }]);

      if (supabaseError) throw supabaseError;

      // 2. Gọi API để gửi Email (Chúng ta sẽ tạo API này ở Bước 5)
      const response = await fetch("/api/send-welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        throw new Error("Lỗi gửi email");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-noir">
      {/* Ảnh nền mờ ảo sang trọng */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85"
          alt="Maison Newsletter"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1520px] mx-auto px-6 md:px-12 w-full">
        <div className="max-w-2xl">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-inter text-[0.65rem] tracking-[0.4em] text-rose-accent uppercase mb-6"
          >
            Trở thành một phần của Maison
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl text-ivory leading-tight mb-6"
          >
            Đặc quyền dành riêng cho <br />
            <span className="italic text-rose-accent font-light">Những người dẫn đầu.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-cormorant text-xl text-ivory/60 italic mb-12 max-w-lg"
          >
            Nhận thông tin về các bộ sưu tập giới hạn, lịch hẹn ưu tiên và những câu chuyện độc quyền từ xưởng may của chúng tôi.
          </motion.p>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-4 text-ivory bg-white/5 backdrop-blur-md p-6 border border-rose-accent/30 rounded-sm max-w-md"
            >
              <CheckCircle2 className="text-rose-accent" size={32} strokeWidth={1} />
              <div>
                <p className="font-playfair text-lg">Chào mừng bạn đến với SERANA.</p>
                <p className="font-inter text-[0.7rem] text-ivory/40 uppercase tracking-widest mt-1">
                  Thư xác nhận đã được gửi đến email của bạn.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-xl group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Địa chỉ Email của quý khách"
                required
                disabled={status === "loading"}
                className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 text-ivory placeholder-ivory/20 font-inter text-sm px-8 py-5 focus:outline-none focus:border-rose-accent transition-all duration-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-rose-accent text-ivory font-inter text-[0.7rem] uppercase tracking-[0.3em] px-10 py-5 flex items-center justify-center gap-3 hover:bg-ivory hover:text-noir transition-all duration-500 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <>
                    Đăng Ký
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-red-400 font-inter text-[0.6rem] mt-4 uppercase tracking-widest">
              Email này đã được đăng ký hoặc có lỗi xảy ra. Vui lòng thử lại.
            </p>
          )}

          <p className="font-inter text-[0.55rem] text-ivory/20 tracking-[0.2em] uppercase mt-8">
            Bằng cách đăng ký, bạn đồng ý với Chính sách Bảo mật của chúng tôi.
          </p>
        </div>
      </div>
    </section>
  );
}