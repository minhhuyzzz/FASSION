"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "@/lib/subscribe-newsletter";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const headingId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const result = await subscribeNewsletter(email);
    if (result.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  };

  return (
    <section
      className="relative min-h-[520px] md:min-h-[560px] flex items-center overflow-hidden bg-noir"
      aria-labelledby={headingId}
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85"
          alt="banner"
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/88 to-noir/40" />
      </div>

      <div className="relative z-10 max-w-[1520px] mx-auto px-6 md:px-12 w-full py-20 md:py-24">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-inter text-[0.62rem] tracking-[0.42em] text-rose-accent uppercase mb-5"
          >
            Inner Circle
          </motion.p>

          <motion.h2
            id={headingId}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory leading-[1.1] mb-5"
          >
            Đặc quyền dành cho <br />
            <span className="italic text-rose-accent font-light">những người dẫn đầu</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-inter text-sm md:text-[0.95rem] text-ivory/55 leading-relaxed mb-3 max-w-lg"
          >
            Đăng ký nhận bản tin SERENA: bộ sưu tập giới hạn, lịch hẹn ưu tiên và câu chuyện độc quyền từ
            atelier — tối ưu cho tìm kiếm &quot;Haute Couture Việt Nam&quot; và dịch vụ may đo cao cấp.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-cormorant text-lg md:text-xl text-ivory/50 italic mb-10 max-w-lg"
          >
            Một email, không spam — chỉ những điều xứng đáng với quý khách.
          </motion.p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-start gap-4 text-ivory bg-white/5 backdrop-blur-md p-6 border border-rose-accent/30 rounded-sm max-w-md"
              role="status"
            >
              <CheckCircle2 className="text-rose-accent shrink-0 mt-0.5" size={30} strokeWidth={1} aria-hidden />
              <div>
                <p className="font-playfair text-lg">Chào mừng đến với SERENA.</p>
                <p className="font-inter text-[0.72rem] text-ivory/45 leading-relaxed mt-1">
                  Thư xác nhận đã được gửi — vui lòng kiểm tra hộp thư (kể cả mục spam).
                </p>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 max-w-xl rounded-sm overflow-hidden border border-white/10 focus-within:border-rose-accent/50 transition-colors"
              aria-label="Đăng ký nhận bản tin SERENA"
            >
              <input
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Địa chỉ email của quý khách"
                required
                disabled={status === "loading"}
                className="flex-1 bg-white/5 backdrop-blur-lg border-0 border-b sm:border-b-0 sm:border-r border-white/10 text-ivory placeholder:text-ivory/25 font-inter text-sm px-5 md:px-8 py-5 focus:outline-none focus:ring-0 transition-all duration-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-rose-accent text-ivory font-inter text-[0.68rem] uppercase tracking-[0.28em] px-8 md:px-10 py-5 flex items-center justify-center gap-3 hover:bg-ivory hover:text-noir transition-all duration-500 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin" size={18} aria-hidden />
                ) : (
                  <>
                    Đăng ký
                    <ArrowRight size={14} aria-hidden />
                  </>
                )}
              </button>
            </form>
          )}

          {status === "error" && errorMessage && (
            <p className="text-red-300/95 font-inter text-sm mt-4 tracking-wide max-w-md" role="alert">
              {errorMessage}
            </p>
          )}

          <p className="font-inter text-[0.58rem] text-ivory/40 tracking-[0.12em] mt-8 leading-relaxed max-w-lg">
            Bằng cách đăng ký, bạn đồng ý với{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-rose-primary transition-colors">
              Chính sách bảo mật
            </Link>{" "}
            và xử lý dữ liệu theo mục đích gửi thư chào mừng & bản tin.
          </p>
        </div>
      </div>
    </section>
  );
}
