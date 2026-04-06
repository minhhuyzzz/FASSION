"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import ProductModal from "@/components/sections/ProductModal";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

const catalog = products as Product[];
const DISPLAY_COUNT = 4;
/** Mỗi lần luân phiên dịch một bước trong catalog (vòng lặp). */
const ROTATE_MS = 3500;

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-80px" });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (catalog.length < DISPLAY_COUNT || selectedProduct) return;
    const id = window.setInterval(() => {
      setOffset((o) => (o + 1) % catalog.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [catalog.length, selectedProduct]);

  const featuredProducts =
    catalog.length >= DISPLAY_COUNT
      ? Array.from({ length: DISPLAY_COUNT }, (_, i) => catalog[(offset + i) % catalog.length])
      : [];

  const headingId = "featured-collection-heading";

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className="relative bg-ivory overflow-hidden py-20 md:py-16 border-y border-black/[0.04]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(164,113,122,0.06),transparent_55%)]" aria-hidden />

      <div className="relative z-10 max-w-[1520px] mx-auto px-6 md:px-12">
        <div ref={titleRef} className="mb-14 md:mb-22 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="font-inter text-[0.62rem] tracking-[0.42em] uppercase text-rose-accent font-medium">
                Bộ sưu tập nổi bật
              </span>
              <span className="h-px flex-1 max-w-[72px] bg-rose-accent/35" />
            </motion.div>

            <motion.h2
              id={headingId}
              initial={{ y: 24, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="font-playfair font-normal leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-noir"
            >
              Dấu ấn{" "}
              <span className="italic text-rose-accent">SERENA</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mt-5 font-inter text-sm md:text-[0.95rem] text-black/50 leading-relaxed max-w-xl"
            >
              Những thiết kế thời trang và phụ kiện đang dẫn đầu xu hướng tại SERENA — điểm đến của sự thanh lịch và phong cách thượng lưu dành riêng cho những Thượng khách tinh tế.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 border-b border-noir/15 pb-2 hover:border-rose-accent transition-colors duration-500"
            >
              <span className="font-inter text-[0.65rem] uppercase tracking-[0.22em] text-noir/65 group-hover:text-rose-accent transition-colors">
                Xem toàn bộ sản phẩm
              </span>
              <ArrowRight
                size={15}
                className="text-noir/35 group-hover:text-rose-accent group-hover:translate-x-1 transition-all"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>

        {featuredProducts.length >= DISPLAY_COUNT ? (
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
            aria-live="polite"
            aria-atomic="false"
          >
            <div className="md:col-span-5">
              <ProductCard
                key={featuredProducts[0].id}
                product={featuredProducts[0]}
                index={0}
                aspect="aspect-[3/4.4]"
                inView={inView}
                onOpen={() => setSelectedProduct(featuredProducts[0])}
              />
            </div>
            <div className="md:col-span-7 flex flex-col gap-4 md:gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 md:gap-6">
                <div className="sm:col-span-7">
                  <ProductCard
                    key={featuredProducts[1].id}
                    product={featuredProducts[1]}
                    index={1}
                    aspect="aspect-[4/3.2]"
                    inView={inView}
                    onOpen={() => setSelectedProduct(featuredProducts[1])}
                  />
                </div>
                <div className="sm:col-span-5">
                  <ProductCard
                    key={featuredProducts[2].id}
                    product={featuredProducts[2]}
                    index={2}
                    aspect="aspect-[4/3.2]"
                    inView={inView}
                    onOpen={() => setSelectedProduct(featuredProducts[2])}
                  />
                </div>
              </div>
              <ProductCard
                key={featuredProducts[3].id}
                product={featuredProducts[3]}
                index={3}
                aspect="aspect-[16/6.5]"
                wide
                inView={inView}
                onOpen={() => setSelectedProduct(featuredProducts[3])}
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-black/45 py-12 font-inter text-sm">
            Đang cập nhật sản phẩm nổi bật.
          </p>
        )}

        <AnimatePresence>
          {selectedProduct && (
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

type ProductCardProps = {
  product: Product;
  index: number;
  aspect: string;
  wide?: boolean;
  inView: boolean;
  onOpen: () => void;
};

function ProductCard({ product, index, aspect, wide = false, inView, onOpen }: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const subtitle = product.material ?? product.category;
  const imgAlt = `${product.name} — ${product.category} — SERENA Haute Couture`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full w-full"
    >
      <div className={`relative ${aspect} overflow-hidden bg-neutral-200 h-full w-full rounded-sm`}>
        <button
          type="button"
          onClick={onOpen}
          className="absolute inset-0 z-10 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          aria-label={`Xem nhanh ${product.name}, giá ${product.price} VNĐ`}
        />

        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={product.images[0]}
            alt={imgAlt}
            fill
            className="object-cover object-top transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

        {product.tag && (
          <div className="absolute top-4 left-4 z-[5] pointer-events-none">
            <span className="font-inter text-[0.55rem] tracking-[0.2em] uppercase text-noir bg-white/95 px-3 py-1.5 shadow-sm border border-black/5">
              {product.tag}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setWished(!wished);
          }}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white/15 backdrop-blur-md border border-white/25 hover:bg-white/90 transition-colors duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-pressed={wished}
          aria-label={wished ? "Bỏ yêu thích" : "Thêm yêu thích"}
        >
          <Heart
            size={15}
            className={`transition-colors ${wished ? "fill-rose-accent stroke-rose-accent" : "stroke-white"}`}
          />
        </button>

        <div
          className={`absolute bottom-0 left-0 right-0 z-[5] p-5 md:p-6 pointer-events-none ${
            wide ? "flex flex-col sm:flex-row sm:items-end justify-between gap-4" : ""
          }`}
        >
          <div>
            <p className="font-inter text-[0.55rem] tracking-[0.28em] uppercase text-white/75 mb-1.5">
              {product.category}
            </p>
            <h3 className="font-playfair text-xl md:text-2xl text-white group-hover:text-rose-primary transition-colors duration-400 leading-tight">
              {product.name}
            </h3>
            <p className="font-cormorant italic text-white/65 text-sm mt-1">{subtitle}</p>
          </div>

          <div className={`${wide ? "text-left sm:text-right" : "mt-3"}`}>
            <p className="font-cormorant text-lg text-white tabular-nums">
              {product.price} <span className="text-white/50 text-sm not-italic">VNĐ</span>
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[3px] bg-rose-accent w-0 group-hover:w-full transition-all duration-700 ease-out opacity-90 pointer-events-none z-[6]" />
      </div>
    </motion.article>
  );
}
