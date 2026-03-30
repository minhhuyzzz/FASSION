"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Hàm đăng nhập bằng Google
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email hoặc mật khẩu không đúng.");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 pt-20">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[450px]">
        <h1 className="font-playfair text-5xl text-center mb-10 tracking-tight">Login</h1>
        
        {/* Nút Google sang trọng */}
        <button 
  onClick={handleGoogleLogin}
  className="w-full border border-white/20 py-4 flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-500 mb-8 group bg-transparent"
>
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
  <span className="font-inter text-[10px] uppercase tracking-[0.2em] font-medium">
    Continue with Google
  </span>
</button>

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <span className="relative bg-black px-4 text-[10px] text-white/30 uppercase tracking-widest font-inter">Or email</span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" placeholder="E-mail" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-white outline-none font-inter text-sm"
          />
          <div className="relative">
            <input 
              type="password" placeholder="Password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-white outline-none font-inter text-sm"
            />
            <Link href="/forgot-password" className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-white/50 hover:text-white underline font-inter">
              Forgot password?
            </Link>
          </div>
          {error && <p className="text-red-500 text-[10px] text-center uppercase tracking-widest">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-white text-black py-4 mt-6 font-inter text-xs uppercase tracking-[0.3em] hover:bg-white/90 transition-colors">
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-10 font-inter text-xs text-white/50 tracking-widest">
          Don't have an account? <Link href="/signup" className="text-white underline ml-1">Sign up</Link>
        </p>
      </motion.div>
    </main>
  );
}