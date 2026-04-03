"use client";
import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductModal from "@/components/sections/ProductModal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpDown, ChevronLeft, ChevronRight, Star } from "lucide-react";

const navigation = [
  { id: "all", label: "Cửa hàng", children: [] },
  { id: "fashion", label: "Thời trang", children: ["Áo", "Quần", "Set", "Váy"] },
  { id: "accessories", label: "Phụ kiện", children: ["Vòng tay", "Túi xách", "Dây chuyền"] },
];

const sortOptions = [
  { label: "Mặc định", value: "default" },
  { label: "Giá: Thấp đến Cao", value: "price-asc" },
  { label: "Giá: Cao đến Thấp", value: "price-desc" },
];

const ITEMS_PER_PAGE = 9;

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

function ShopSkeleton() {
  return (
    <div className="max-w-[1600px] mx-auto animate-pulse">
      <div className="h-4 w-32 bg-white/10 rounded-full mx-auto mb-6" />
      <div className="h-16 md:h-24 max-w-2xl bg-white/[0.06] rounded-lg mx-auto mb-12" />
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 mb-16 h-40" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <div className="aspect-[3/4] bg-white/[0.06] rounded-sm mb-6" />
            <div className="h-3 w-20 bg-white/10 rounded mx-auto mb-3" />
            <div className="h-6 bg-white/[0.08] rounded mx-auto max-w-[80%] mb-2" />
            <div className="h-4 w-28 bg-white/[0.06] rounded mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const [activeParent, setActiveParent] = useState("all");
  const [activeChild, setActiveChild] = useState("all");
  const [maxPrice, setMaxPrice] = useState(50_000_000);
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const cat = searchParams.get("cat");
    const sub = searchParams.get("sub");
    if (cat) setActiveParent(cat);
    else setActiveParent("all");
    if (sub) setActiveChild(sub);
    else setActiveChild("all");
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeParent, activeChild, maxPrice, sortBy]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/\./g, ""), 10);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      let matchCategory = false;
      if (activeParent === "all") {
        matchCategory = true;
      } else {
        const parentObj = navigation.find((n) => n.id === activeParent);
        if (activeChild === "all") {
          matchCategory = parentObj?.children.includes(p.category) ?? false;
        } else {
          matchCategory = p.category === activeChild;
        }
      }
      const priceNum = parsePrice(p.price);
      return matchCategory && priceNum <= maxPrice;
    });

    if (sortBy === "price-asc") result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sortBy === "price-desc") result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    return result;
  }, [activeParent, activeChild, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeLabel = navigation.find((n) => n.id === activeParent)?.label ?? "Bộ sưu tập";
  const resultCount = filteredAndSortedProducts.length;

  return (
    <div className="max-w-[1600px] mx-auto relative">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-rose-accent/[0.06] blur-[100px]"
        aria-hidden
      />

      <header className="mb-12 md:mb-16 text-center relative px-2">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-rose-accent/80 to-transparent"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-rose-accent text-[0.65rem] tracking-[0.55em] uppercase mb-4 font-semibold"
        >
          Serena Atelier
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory italic tracking-tight leading-[1.05] max-w-4xl mx-auto"
        >
          {activeLabel}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-[0.7rem] md:text-xs tracking-[0.25em] uppercase text-white/40 font-medium"
        >
          {resultCount} sản phẩm
          {activeParent !== "all" && activeChild !== "all" ? (
            <span className="text-white/25"> · {activeChild}</span>
          ) : null}
        </motion.p>
      </header>

      <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-md shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] px-5 sm:px-8 md:px-10 py-8 md:py-10 mb-14 md:mb-20">
        <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-end gap-10 xl:gap-14">
          <div className="flex flex-col gap-8 w-full min-w-0">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-white/[0.07] pb-5">
              {navigation.map((nav) => (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => {
                    setActiveParent(nav.id);
                    setActiveChild("all");
                  }}
                  className={`text-[0.68rem] sm:text-[0.7rem] tracking-[0.35em] uppercase transition-colors relative pb-2.5 shrink-0 ${
                    activeParent === nav.id
                      ? "text-rose-accent font-bold"
                      : "text-white/35 hover:text-white/80"
                  }`}
                >
                  {nav.label}
                  {activeParent === nav.id && (
                    <motion.div
                      layoutId="shop-parent-line"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-rose-accent rounded-full shadow-[0_0_12px_rgba(164,113,122,0.5)]"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeParent !== "all" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-wrap items-center gap-2.5 sm:gap-3"
                >
                  <button
                    type="button"
                    onClick={() => setActiveChild("all")}
                    className={`text-[0.62rem] sm:text-[0.65rem] tracking-[0.18em] uppercase px-4 py-2 rounded-full border transition-all ${
                      activeChild === "all"
                        ? "bg-white/[0.12] border-white/20 text-ivory shadow-inner"
                        : "border-white/[0.06] text-white/45 hover:text-ivory hover:border-white/15"
                    }`}
                  >
                    Tất cả {navigation.find((n) => n.id === activeParent)?.label}
                  </button>
                  {navigation
                    .find((n) => n.id === activeParent)
                    ?.children.map((child) => (
                      <button
                        key={child}
                        type="button"
                        onClick={() => setActiveChild(child)}
                        className={`text-[0.62rem] sm:text-[0.65rem] tracking-[0.18em] uppercase px-4 py-2 rounded-full border transition-all ${
                          activeChild === child
                            ? "bg-rose-accent/15 border-rose-accent/40 text-rose-primary shadow-[0_0_0_1px_rgba(164,113,122,0.2)]"
                            : "border-transparent text-white/45 hover:text-ivory"
                        }`}
                      >
                        {child}
                      </button>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-8 sm:gap-10   w-full xl:w-auto xl:min-w-[320px] shrink-0">
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <div className="flex justify-between items-baseline text-[0.58rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-white/35">
                <span>Mức giá tối đa</span>
                <span className="text-rose-accent font-semibold tabular-nums tracking-normal">
                  {maxPrice.toLocaleString("vi-VN")} <span className="text-white/50 font-normal">₫</span>
                </span>
              </div>
              <input
                type="range"
                min={500_000}
                max={50_000_000}
                step={500_000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full h-1 rounded-full bg-white/10 appearance-none cursor-pointer accent-rose-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-accent [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(164,113,122,0.25)]"
                style={{
                  background: `linear-gradient(to right, #A4717A 0%, #A4717A ${(maxPrice / 50_000_000) * 100}%, rgba(255,255,255,0.08) ${(maxPrice / 50_000_000) * 100}%, rgba(255,255,255,0.08) 100%)`,
                }}
                aria-label="Lọc theo mức giá tối đa"
              />
            </div>

            <div className="relative self-stretch sm:self-auto" ref={sortRef}>
              <button
                type="button"
                onClick={() => setSortOpen((o) => !o)}
                className="flex w-full sm:w-auto items-center justify-between sm:justify-center gap-4 bg-ivory text-noir px-7 py-3.5 text-[0.62rem] sm:text-[0.65rem] tracking-[0.35em] uppercase font-bold hover:bg-rose-blush transition-colors rounded-sm border border-white/10 shadow-lg"
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
              >
                <span className="truncate">{sortOptions.find((o) => o.value === sortBy)?.label ?? "Sắp xếp"}</span>
                <ArrowUpDown size={15} className="shrink-0 opacity-70" />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 left-0 sm:left-auto sm:min-w-[280px] mt-2 z-50 rounded-sm border border-black/10 bg-ivory text-noir shadow-2xl overflow-hidden"
                    role="listbox"
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={sortBy === opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-6 py-3.5 text-[0.6rem] uppercase tracking-[0.2em] transition-colors border-b border-black/[0.06] last:border-0 font-medium ${
                          sortBy === opt.value ? "bg-noir text-ivory" : "hover:bg-noir hover:text-ivory"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div ref={gridRef} className="scroll-mt-32">
        {currentItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 md:py-32 px-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.02]"
          >
            <p className="font-playfair text-2xl md:text-3xl text-ivory/90 italic mb-3">Chưa có sản phẩm phù hợp</p>
            <p className="text-sm text-white/45 max-w-md mx-auto leading-relaxed">
              Thử nới lỏng bộ lọc danh mục hoặc tăng mức giá để xem thêm các thiết kế khác.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-x-12 gap-y-16 md:gap-y-24">
            <AnimatePresence mode="popLayout">
              {currentItems.map((product, index) => (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: Math.min(index * 0.04, 0.24) }}
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
                      {"tag" in product && typeof (product as { tag?: string }).tag === "string" && (product as { tag: string }).tag ? (
                        <span className="absolute top-3 left-3 text-[0.55rem] tracking-[0.2em] uppercase px-2.5 py-1 bg-noir/85 text-ivory/95 backdrop-blur-sm border border-white/10">
                          {(product as { tag: string }).tag}
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
      </div>

      {totalPages > 1 && (
        <nav
          className="mt-24 md:mt-32 flex justify-center items-center gap-6 md:gap-10 border-t border-white/[0.07] pt-12 md:pt-16"
          aria-label="Phân trang"
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="text-white/35 hover:text-rose-accent disabled:opacity-20 disabled:pointer-events-none transition-colors p-2 rounded-full hover:bg-white/[0.05]"
            aria-label="Trang trước"
          >
            <ChevronLeft size={22} strokeWidth={1.25} />
          </button>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center max-w-[min(100%,28rem)]">
            {[...Array(totalPages)].map((_, idx) => {
              const n = idx + 1;
              const active = currentPage === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => handlePageChange(n)}
                  className={`min-w-[2.25rem] h-9 px-2 text-[0.68rem] tracking-[0.15em] font-semibold transition-all rounded-full ${
                    active
                      ? "bg-rose-accent text-ivory shadow-[0_8px_24px_-6px_rgba(164,113,122,0.55)]"
                      : "text-white/45 hover:text-ivory hover:bg-white/[0.06]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {n}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="text-white/35 hover:text-rose-accent disabled:opacity-20 disabled:pointer-events-none transition-colors p-2 rounded-full hover:bg-white/[0.05]"
            aria-label="Trang sau"
          >
            <ChevronRight size={22} strokeWidth={1.25} />
          </button>
        </nav>
      )}

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-noir pt-28 sm:pt-32 pb-16 md:pb-24 px-5 sm:px-8 md:px-12 relative font-inter overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(164,113,122,0.12),transparent_55%)]"
        aria-hidden
      />
      <Suspense fallback={<ShopSkeleton />}>
        <ShopContent />
      </Suspense>
    </main>
  );
}
