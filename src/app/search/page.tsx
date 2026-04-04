"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, Star } from "lucide-react";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { searchProducts } from "@/lib/productSearch";
import ProductModal from "@/components/sections/ProductModal";

const catalog = products as Product[];

function RatingStars() {
  return (
    <div className="flex items-center justify-center gap-0.5 mt-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={11} className="fill-rose-accent/90 text-rose-accent shrink-0" aria-hidden />
      ))}
      <span className="text-[9px] text-white/35 ml-2 font-inter tracking-tight tabular-nums">(5.0)</span>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="max-w-[1600px] mx-auto animate-pulse px-2">
      <div className="h-6 w-48 bg-white/10 rounded mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <div className="aspect-[3/4] bg-white/[0.06] rounded-sm mb-6" />
            <div className="h-6 bg-white/[0.08] rounded mx-auto max-w-[80%]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const rawQ = searchParams.get("q") ?? "";
  const query = rawQ.trim();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const results = useMemo(() => searchProducts(catalog, query), [query]);

  return (
    <div className="max-w-[1600px] mx-auto relative">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-rose-accent/[0.06] blur-[100px]"
        aria-hidden
      />

      <header className="mb-12 md:mb-16 text-center relative px-2">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.28em] text-white/45 hover:text-rose-accent transition-colors mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
          Cửa hàng
        </Link>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-rose-accent/80 to-transparent"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-rose-accent text-[0.65rem] tracking-[0.45em] uppercase mb-4 font-semibold flex items-center justify-center gap-2"
        >
          <Search size={14} strokeWidth={1.5} className="opacity-80" aria-hidden />
          Kết quả tìm kiếm
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl text-ivory italic tracking-tight leading-tight max-w-3xl mx-auto break-words"
        >
          {query ? (
            <>
              &ldquo;{query}&rdquo;
            </>
          ) : (
            <>Nhập từ khóa để tìm</>
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-5 text-[0.7rem] md:text-xs tracking-[0.25em] uppercase text-white/40 font-medium"
        >
          {query ? `${results.length} sản phẩm` : "Gợi ý: tên mẫu, loại (váy, túi), hoặc mã sản phẩm"}
        </motion.p>
      </header>

      {!query ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6"
        >
          <p className="font-playfair text-xl md:text-2xl text-ivory/85 italic mb-2">Chưa có từ khóa</p>
          <p className="text-sm text-white/45 max-w-md mx-auto">
            Dùng biểu tượng kính lúp trên thanh điều hướng để tìm theo tên hoặc danh mục.
          </p>
        </motion.div>
      ) : results.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 md:py-32 px-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.02]"
        >
          <p className="font-playfair text-2xl md:text-3xl text-ivory/90 italic mb-3">Không tìm thấy sản phẩm</p>
          <p className="text-sm text-white/45 max-w-md mx-auto leading-relaxed mb-8">
            Thử từ khóa khác hoặc xem toàn bộ bộ sưu tập tại cửa hàng.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-ivory text-noir px-8 py-3.5 text-[0.62rem] tracking-[0.35em] uppercase font-bold rounded-sm hover:bg-rose-blush transition-colors"
          >
            Đến cửa hàng
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-x-12 gap-y-16 md:gap-y-24">
          <AnimatePresence mode="popLayout">
            {results.map((product, index) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: Math.min(index * 0.03, 0.2) }}
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative rounded-sm overflow-hidden bg-white mb-6 ring-1 ring-white/[0.06] shadow-[0_20px_50px_-28px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:ring-rose-accent/35 group-hover:shadow-[0_28px_64px_-24px_rgba(164,113,122,0.25)]">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.06]"
                    />
                    {product.tag ? (
                      <span className="absolute top-3 left-3 text-[0.55rem] tracking-[0.2em] uppercase px-2.5 py-1 bg-noir/85 text-ivory/95 backdrop-blur-sm border border-white/10">
                        {product.tag}
                      </span>
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/50 via-transparent to-transparent opacity-60 md:opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <span className="bg-ivory text-noir px-8 py-3 text-[0.58rem] tracking-[0.45em] uppercase font-bold translate-y-3 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                        Xem chi tiết
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-center px-2 flex-1 flex flex-col">
                  <p className="text-[10px] tracking-[0.35em] text-rose-accent/95 uppercase font-medium">{product.category}</p>
                  <h2 className="font-playfair text-xl sm:text-2xl text-ivory tracking-tight italic group-hover:text-rose-primary transition-colors leading-snug line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="font-inter text-sm text-white/55 tracking-wide pt-1 tabular-nums">
                    {product.price} <span className="text-white/35 font-light">VNĐ</span>
                  </p>
                  <RatingStars />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-noir pt-28 sm:pt-32 pb-16 md:pb-24 px-5 sm:px-8 md:px-12 relative font-inter overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(164,113,122,0.12),transparent_55%)]"
        aria-hidden
      />
      <Suspense fallback={<SearchSkeleton />}>
        <SearchContent />
      </Suspense>
    </main>
  );
}
