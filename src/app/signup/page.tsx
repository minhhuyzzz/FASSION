"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      alert("Đăng ký thành công! Vui lòng kiểm tra email.");
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px]"
      >
        <h1 className="font-playfair text-5xl text-center mb-10 tracking-tight">Sign up</h1>
        
        <p className="font-inter text-sm text-center mb-10 tracking-wider text-white/90 uppercase">
          Create your account:
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="email" 
            placeholder="E-mail" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-white outline-none transition-colors font-inter text-sm"
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-white outline-none transition-colors font-inter text-sm"
          />

          {error && <p className="text-red-500 text-[10px] text-center uppercase tracking-widest">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 mt-6 font-inter text-xs uppercase tracking-[0.3em] hover:bg-white/90 transition-colors"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-10 font-inter text-xs text-white/50 tracking-widest">
          Already have an account? <Link href="/login" className="text-white underline ml-1">Login</Link>
        </p>
      </motion.div>
    </main>
  );
}