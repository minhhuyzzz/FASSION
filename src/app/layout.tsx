import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; 
import { CartProvider } from "@/context/CartContext"; 

// Cấu hình font chữ chuyên nghiệp cho thương hiệu Haute Couture
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
  title: "SERENA — Haute Couture",
  description: "Nơi nghệ thuật tôn vinh vóc dáng và bản sắc riêng biệt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body 
        className={`
          ${playfair.variable} 
          ${cormorant.variable} 
          ${inter.variable} 
          antialiased 
          bg-[#FDFAF8] 
          text-[#1F1F1F] 
          grain
        `}
      >
        {/* Chỉ giữ lại CartProvider để quản lý giỏ hàng toàn trang */}
        <CartProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
              {children}
            </main>

            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}