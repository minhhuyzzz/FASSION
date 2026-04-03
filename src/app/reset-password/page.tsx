"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Cập nhật mật khẩu mới cho user đã xác thực qua link email
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      alert("Mật khẩu đã được cập nhật thành công!");
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen bg-noir text-ivory flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[400px]">
        <h1 className="font-playfair text-4xl text-center mb-4">Mật khẩu mới</h1>
        <p className="font-cormorant italic text-center text-ivory/50 mb-10">
          Vui lòng thiết lập mật khẩu mới cho tài khoản SERENA của bạn.
        </p>

        <form onSubmit={handleUpdate} className="space-y-6">
          <input 
            type="password" placeholder="Mật khẩu mới" required minLength={6}
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-rose-accent transition-colors font-inter text-sm"
          />
          {error && <p className="text-rose-accent text-[10px] uppercase text-center">{error}</p>}
          <button 
            type="submit" disabled={loading}
            className="w-full bg-ivory text-noir py-4 font-inter text-[10px] uppercase tracking-[0.3em] hover:bg-rose-accent hover:text-white transition-all"
          >
            {loading ? "Đang cập nhật..." : "Xác nhận thay đổi"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}