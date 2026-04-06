"use client";

import { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";

type ProductModalProps = {
  product: Product;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const titleId = useId();
  const [currentImg, setCurrentImg] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  const [sizeGuideTab, setSizeGuideTab] = useState<"clothing" | "shoes">("clothing");
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [sizeHint, setSizeHint] = useState<string | null>(null);

  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [failedImages, setFailedImages] = useState<number[]>([]);

  const { addToCart } = useCart();
  const router = useRouter();

  const parsedSizes = product.sizes?.flatMap(s => s.split(/[\s,]+/)).filter(Boolean) || [];
  const hasSizes = parsedSizes.length > 0;

  useEffect(() => {
    if (showSizeGuide) {
      const isShoes = product.category.toLowerCase().includes("giày") || product.name.toLowerCase().includes("giày");
      setSizeGuideTab(isShoes ? "shoes" : "clothing");
    }
  }, [showSizeGuide, product.category, product.name]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isZoomed) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize && parsedSizes[0] !== "Freesize") {
      setSizeHint("Vui lòng chọn kích cỡ.");
      return;
    }
    setSizeHint(null);
    setIsFlying(true);
    addToCart({ ...product, selectedSize: selectedSize || "Freesize" });
    setTimeout(() => setIsFlying(false), 800);
  };

  // --- THAY ĐỔI TÍNH NĂNG TẠI ĐÂY ---
  const handleBuyNow = () => {
    if (hasSizes && !selectedSize && parsedSizes[0] !== "Freesize") {
      setSizeHint("Vui lòng chọn kích cỡ trước khi thanh toán.");
      return;
    }
    setSizeHint(null);

    // Tạo object sản phẩm duy nhất được chọn để thanh toán nhanh
    const directItem = { 
      ...product, 
      selectedSize: selectedSize || "Freesize",
      quantity: 1 
    };

    // Lưu vào sessionStorage để trang Checkout có thể nhận diện đây là "Mua ngay" 
    // thay vì lấy toàn bộ từ CartContext
    sessionStorage.setItem("serena_direct_checkout", JSON.stringify([directItem]));

    // Điều hướng thẳng tới checkout kèm theo flag để trang đó biết cần lọc dữ liệu
    router.push("/checkout?mode=direct");
  };

  const mainAlt = `${product.name} — ${product.category} — SERENA`;

  return (
    <motion.div
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 0.1, x: "35vw", y: "-45vh", rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="fixed z-[200] pointer-events-none w-32 h-44 left-[45%] top-[40%]"
            aria-hidden
          >
            <Image
              src={product.images[0]}
              alt=""
              fill
              className="object-cover border-2 border-rose-accent shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        className="relative w-full max-w-7xl max-h-[90vh] bg-[#0F0F0F] text-ivory overflow-y-auto shadow-2xl border border-white/5 rounded-sm no-scrollbar"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 md:top-6 md:right-8 text-white/50 hover:text-white z-[110] bg-black/40 p-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-accent"
          aria-label="Đóng chi tiết sản phẩm"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-[65%] p-4 md:p-10 flex flex-col-reverse md:flex-row gap-6 items-start">
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:max-h-[80vh] md:w-20 shrink-0 pb-1 md:pb-0">
              {product.images.map((img, idx) => {
                if (failedImages.includes(idx)) return null;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentImg(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative w-20 h-24 md:w-full md:aspect-[3/4] flex-shrink-0 cursor-pointer border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-accent rounded-sm overflow-hidden ${
                      currentImg === idx ? "border-rose-accent" : "border-white/10 opacity-40 hover:opacity-80"
                    }`}
                    aria-label={`Xem ảnh ${idx + 1}`}
                    aria-current={currentImg === idx ? "true" : undefined}
                  >
                    <Image 
                      src={img} 
                      alt="" 
                      fill 
                      className="object-cover" 
                      sizes="80px" 
                      onError={() => setFailedImages(prev => [...prev, idx])}
                    />
                  </button>
                );
              })}
            </div>

            <div
              ref={containerRef}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
              className={`relative flex-1 w-full min-h-[50vh] md:min-h-[70vh] lg:h-[80vh] overflow-hidden flex items-start justify-center bg-neutral-950 ${
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
            >
              <Image
                key={currentImg}
                src={product.images[currentImg]}
                alt={mainAlt}
                fill
                className={`object-contain object-top transition-transform duration-300 ease-out ${
                  isZoomed ? "scale-[2.5]" : "scale-100"
                }`}
                style={{ transformOrigin: `${mousePos.x}% ${mousePos.y}%` }}
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
              <div className="absolute bottom-4 right-4 p-2 bg-black/30 rounded-full text-white/50 pointer-events-none" aria-hidden>
                {isZoomed ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </div>
          </div>

          <div className="lg:w-[35%] p-8 md:p-12 lg:sticky lg:top-0 h-fit border-t lg:border-t-0 lg:border-l border-white/5">
            {product.tag ? (
              <p className="text-rose-accent text-[0.6rem] tracking-[0.4em] uppercase mb-4 font-semibold">
                {product.tag}
              </p>
            ) : (
              <p className="text-white/40 text-[0.6rem] tracking-[0.35em] uppercase mb-4">{product.category}</p>
            )}
            <h2 id={titleId} className="font-playfair text-3xl md:text-4xl mb-4 italic tracking-tight leading-tight">
              {product.name}
            </h2>
            <p className="text-xl md:text-2xl font-inter text-white/95 mb-8 tabular-nums">
              {product.price} <span className="text-white/40 text-base font-light">VNĐ</span>
            </p>

            {hasSizes && parsedSizes[0] !== "Freesize" && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[0.65rem] tracking-[0.2em] text-white/40 uppercase font-inter">Kích cỡ</span>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="flex items-center gap-2 text-rose-accent text-[0.65rem] uppercase hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-accent rounded"
                  >
                    <Ruler size={14} aria-hidden /> Hướng dẫn size
                  </button>
                </div>
                <div className="flex flex-wrap gap-3" role="group" aria-label="Chọn kích cỡ">
                  {parsedSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeHint(null);
                      }}
                      className={`border px-5 py-2.5 text-[0.7rem] transition-all uppercase rounded-sm font-inter focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-accent ${
                        selectedSize === size
                          ? "bg-white text-black border-white font-bold"
                          : "border-white/15 text-white/90 hover:border-white/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeHint && (
                  <p className="text-rose-primary/90 text-sm mt-3" role="alert">
                    {sizeHint}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isFlying}
                className="w-full border border-white/90 text-white py-4 text-[0.68rem] tracking-[0.35em] uppercase hover:bg-white hover:text-noir transition-all font-medium disabled:opacity-60 rounded-sm"
              >
                {isFlying ? "Đang thêm…" : "Thêm vào giỏ hàng"}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full bg-ivory text-noir py-4 text-[0.68rem] tracking-[0.35em] uppercase font-bold hover:bg-rose-accent hover:text-white transition-all shadow-xl rounded-sm"
              >
                Thanh toán ngay
              </button>
            </div>

            <p className="text-center text-[0.55rem] text-white/30 uppercase tracking-[0.15em] mt-10 leading-relaxed">
              Mỗi thiết kế SERENA được chế tác thủ công nhằm đảm bảo độ hoàn thiện cao nhất.
            </p>
          </div>
        </div>

        <div className="w-full bg-[#0A0A0A] p-10 md:p-16 lg:p-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="font-playfair text-2xl md:text-3xl text-ivory italic border-b border-rose-accent/25 pb-3 inline-block">
              Chi tiết sản phẩm
            </h3>
            <div className="font-inter text-[0.95rem] text-white/70 leading-relaxed whitespace-pre-line font-light">
              {product.description || "Thông tin chi tiết tuyệt tác này đang được SERANA cập nhật."}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSizeGuide(false)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            role="presentation"
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="relative max-w-2xl w-full bg-[#1A1A1A] p-6 rounded-sm border border-white/10"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Bảng hướng dẫn chọn size"
            >
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="absolute -top-12 right-0 text-white/70 flex items-center gap-2 uppercase text-[0.65rem] tracking-[0.25em] hover:text-white"
              >
                Đóng <X size={18} />
              </button>

              <div className="flex justify-center gap-8 mb-6 border-b border-white/5 pb-4">
                <button
                  onClick={() => setSizeGuideTab("clothing")}
                  className={`text-[0.7rem] uppercase tracking-widest transition-all ${sizeGuideTab === "clothing" ? "text-rose-accent border-b border-rose-accent font-bold" : "text-white/40"}`}
                >
                  Quần áo
                </button>
                <button
                  onClick={() => setSizeGuideTab("shoes")}
                  className={`text-[0.7rem] uppercase tracking-widest transition-all ${sizeGuideTab === "shoes" ? "text-rose-accent border-b border-rose-accent font-bold" : "text-white/40"}`}
                >
                  Giày dép
                </button>
              </div>

              <div className="relative aspect-video w-full">
                <Image
                  src={sizeGuideTab === "clothing" ? "https://i.postimg.cc/fyQ4j6pm/Size-quan-ao.png" : "https://i.postimg.cc/5yQcwfs4/Size-giay.png"}
                  alt="Bảng quy đổi kích cỡ SERENA"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}