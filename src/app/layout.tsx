import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar"; // Kiểm tra lại đường dẫn này
import Footer from "@/components/layout/Footer"; // Kiểm tra lại đường dẫn này

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAISON LAHAV — Haute Couture",
  description:
    "Where art meets the body. Discover our exclusive couture collections, crafted for women who define their own legacy.",
  keywords: ["haute couture", "luxury fashion", "bridal", "editorial"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="grain bg-black text-white">
        {/* Navbar sẽ xuất hiện ở đầu tất cả các trang */}
        <Navbar />

        {/* Nội dung trang (ví dụ trang Login) sẽ nằm ở đây */}
        {children}

        {/* Footer sẽ xuất hiện ở cuối tất cả các trang */}
        <Footer />
      </body>
    </html>
  );
}