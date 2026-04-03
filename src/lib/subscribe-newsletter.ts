"use client";

import { createClient } from "@supabase/supabase-js";

export type SubscribeResult = { ok: true } | { ok: false; message: string };

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Lưu subscriber (nếu có Supabase) rồi gửi email chào mừng qua /api/send-welcome.
 */
export async function subscribeNewsletter(rawEmail: string): Promise<SubscribeResult> {
  const email = rawEmail.trim().toLowerCase();
  if (!isValidEmail(email)) {
    return { ok: false, message: "Email không hợp lệ." };
  }

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("subscribers").insert([{ email }]);
    if (error) {
      if (error.code === "23505" || /duplicate|unique/i.test(error.message)) {
        return { ok: false, message: "Email này đã được đăng ký." };
      }
      console.error(error);
      return { ok: false, message: "Không thể lưu đăng ký. Vui lòng thử lại." };
    }
  }

  const response = await fetch("/api/send-welcome", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const msg =
      typeof payload.error === "string"
        ? payload.error
        : "Gửi email chào mừng thất bại. Kiểm tra RESEND_API_KEY và domain gửi.";
    return { ok: false, message: msg };
  }

  return { ok: true };
}
