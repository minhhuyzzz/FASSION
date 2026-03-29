import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Hàm cn: Giúp gộp các class Tailwind lại với nhau, 
 * tự động xử lý các class bị trùng lặp hoặc xung đột.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format tiền tệ: Chuyển số thành định dạng Euro (€) hoặc VND 
 * phù hợp với phong cách Haute Couture.
 */
export const formatPrice = (
  price: number,
  currency: string = 'EUR',
  locale: string = 'de-DE'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
};