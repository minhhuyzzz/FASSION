import { createClient } from '@supabase/supabase-js';

// Lấy giá trị từ biến môi trường, nếu không có thì để chuỗi rỗng thay vì báo lỗi ngay lập tức
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Kiểm tra và in cảnh báo thay vì làm sập ứng dụng lúc Build
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn("Cảnh báo: Thiếu cấu hình Supabase. Hãy kiểm tra lại file .env.local hoặc Vercel Settings.");
  }
}

// Khởi tạo client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);