import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; 

// Cấu hình font với bộ tiếng Việt đầy đủ
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
  title: "MAISON LAHAV — Haute Couture",
  description: "Nơi nghệ thuật tôn vinh vóc dáng.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      {/* QUAN TRỌNG: Đưa tất cả font vào class của body */}
      <body className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased bg-[#F5F2EF] text-gray-900`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}