import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; 
// 1. IMPORT CartProvider vào đây
import { CartProvider } from "@/context/CartContext"; 

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SERANA — Haute Couture", // Đã đổi tên cho đúng thương hiệu của bạn
  description: "Nơi nghệ thuật tôn vinh vóc dáng.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased bg-[#F5F2EF] text-gray-900`}>
        {/* 2. BAO BỌC toàn bộ Navbar và children bằng CartProvider */}
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}