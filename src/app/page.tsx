import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import Editorial from "@/components/sections/Editorial";
import Benefits from "@/components/sections/Benefits";
import Testimonials from "@/components/sections/Testimonials";
import Marquee from "@/components/sections/Marquee";
import Newsletter from "@/components/sections/Newsletter";
import MarqueeCollection from "@/components/sections/MarqueeCollection";
import SocialContact from "@/components/ui/SocialContact";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const metadata: Metadata = {
  title: "SERENA — Haute Couture & May đo cao cấp | Trang chủ",
  description:
    "SERENA Atelier: Haute Couture, may đo đo ni, phụ kiện và trang phục dạ hội. Khám phá bộ sưu tập, câu chuyện nghệ thuật và đặc quyền Inner Circle.",
  openGraph: {
    title: "SERENA — Haute Couture Atelier",
    description:
      "Thời trang cao cấp, thủ công và trải nghiệm may đo cá nhân hóa tại SERENA.",
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SERENA — Haute Couture",
    description: "May đo cao cấp, thiết kế độc bản và phụ kiện tại SERENA Atelier.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "SERENA",
      alternateName: "SERENA Atelier",
      description:
        "Thương hiệu Haute Couture và may đo cao cấp — trang phục dạ hội, váy cưới và phụ kiện thủ công.",
      url: siteUrl,
      slogan: "Haute Couture Atelier",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "SERENA",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "vi-VN",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative overflow-x-hidden">
        <Hero />
        <Marquee />
        <MarqueeCollection />
        <FeaturedCollection />
        <Editorial />
        <Benefits />
        <Testimonials />
        <Newsletter />
        <SocialContact />
      </div>
    </>
  );
}
