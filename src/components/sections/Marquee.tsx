"use client";

const items = [
  "Couture 2025",
  "✦",
  "Bridal Collection",
  "✦",
  "Handcrafted in Paris",
  "✦",
  "As Seen In Vogue",
  "✦",
  "Bespoke Atelier",
  "✦",
  "Artisanal Excellence",
  "✦",
  "Couture 2025",
  "✦",
  "Bridal Collection",
  "✦",
  "Handcrafted in Paris",
  "✦",
  "As Seen In Vogue",
  "✦",
  "Bespoke Atelier",
  "✦",
  "Artisanal Excellence",
  "✦",
];

export default function Marquee() {
  return (
    <div className="bg-rose-primary py-4 overflow-hidden">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-inter text-[0.6rem] tracking-[0.3em] text-white uppercase whitespace-nowrap mx-6"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
