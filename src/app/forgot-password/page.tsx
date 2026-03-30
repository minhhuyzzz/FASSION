"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Gửi yêu cầu reset đến Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage("Có lỗi xảy ra: " + error.message);
    } else {
      setMessage("Một liên kết khôi phục đã được gửi đến email của bạn.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-noir text-ivory flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[400px] text-center">
        <Link href="/login" className="inline-flex items-center gap-2 text-rose-accent text-[10px] uppercase tracking-[0.2em] mb-8 hover:opacity-70">
          <ArrowLeft size={14} /> Trở về đăng nhập
        </Link>
        
        <h1 className="font-playfair text-4xl mb-4">Khôi phục mật khẩu</h1>
        <p className="font-cormorant italic text-ivory/50 mb-10">
          Nhập email thành viên của bạn để nhận liên kết thiết lập lại mật khẩu.
        </p>

        {message ? (
          <div className="p-6 border border-rose-accent/30 bg-rose-accent/5">
            <p className="font-inter text-xs tracking-widest text-rose-accent leading-relaxed">
              {message}
            </p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <input 
              type="email" placeholder="Địa chỉ Email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-rose-accent transition-colors font-inter text-sm"
            />
            <button 
              type="submit" disabled={loading}
              className="w-full bg-ivory text-noir py-4 font-inter text-[10px] uppercase tracking-[0.3em] hover:bg-rose-accent hover:text-white transition-all flex items-center justify-center gap-3"
            >
              {loading ? "Đang gửi..." : "Gửi liên kết khôi phục"} <Send size={14} />
            </button>
          </form>
        )}
      </motion.div>
    </main>
  );
}