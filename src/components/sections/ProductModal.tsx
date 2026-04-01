"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductModal({ product, onClose }: any) {
  const [currentImg, setCurrentImg] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  
  // Logic Zoom
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();
  const router = useRouter();

  // Khóa cuộn trang khi mở modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isZoomed) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ!");
      return;
    }
    setIsFlying(true);
    addToCart({ ...product, selectedSize });
    setTimeout(() => setIsFlying(false), 800);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ trước khi thanh toán!");
      return;
    }
    addToCart({ ...product, selectedSize });
    router.push("/cart");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose} />

      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 0.1, x: "35vw", y: "-45vh", rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="fixed z-[200] pointer-events-none w-32 h-44 left-[45%] top-[40%]"
          >
            <Image src={product.images[0]} alt="fly" fill className="object-cover border-2 border-rose-accent shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-7xl h-[90vh] bg-[#0F0F0F] text-ivory overflow-y-auto no-scrollbar shadow-2xl border border-white/5"
      >
        <button onClick={onClose} className="absolute top-6 right-8 text-white/50 hover:text-white z-[110] bg-black/40 p-2 rounded-full transition-colors">
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* 1. GALLERY BÊN TRÁI - HÌNH CON DỌC & KHÔNG DƯ PHẦN ĐEN */}
          <div className="lg:w-[65%] p-4 md:p-10 flex flex-col-reverse md:flex-row gap-6 items-start">
            
            {/* Cột hình con */}
            <div className="flex flex-row md:flex-col gap-3 overflow-auto no-scrollbar md:w-20 shrink-0">
              {product.images.map((img: string, idx: number) => (
                <div 
                  key={idx} 
                  onClick={() => { setCurrentImg(idx); setIsZoomed(false); }}
                  className={`relative w-20 h-24 md:w-full md:aspect-[3/4] flex-shrink-0 cursor-pointer border transition-all duration-300 ${
                    currentImg === idx ? 'border-rose-accent' : 'border-white/10 opacity-30'
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Hình chính trung tâm - Click để Zoom */}
            <div 
              ref={containerRef}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
              className={`relative flex-1 w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-start justify-center bg-transparent cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
            >
              <Image 
                key={currentImg}
                src={product.images[currentImg]} 
                alt="main" 
                fill 
                className={`object-contain object-top transition-transform duration-300 ease-out ${isZoomed ? 'scale-[2.5]' : 'scale-100'}`}
                style={{ transformOrigin: `${mousePos.x}% ${mousePos.y}%` }}
                priority
              />
              <div className="absolute bottom-4 right-4 p-2 bg-black/20 rounded-full text-white/30 pointer-events-none">
                {isZoomed ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </div>
          </div>

          {/* 2. THÔNG TIN BÊN PHẢI - ĐÃ TĂNG PADDING ĐỂ TRÁNH SÁT THANH KÉO */}
          <div className="lg:w-[35%] p-8 md:p-12 lg:sticky lg:top-0 h-fit border-l border-white/5 mr-2">
            <p className="text-rose-accent text-[0.6rem] tracking-[0.4em] uppercase mb-4 font-bold">{product.tag}</p>
            <h2 className="font-playfair text-4xl mb-6 italic tracking-tight leading-tight">{product.name}</h2>
            <p className="text-2xl font-inter text-white mb-10">{product.price} VNĐ</p>

            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[0.65rem] tracking-[0.2em] text-white/40 uppercase font-inter">Kích cỡ</span>
                <button onClick={() => setShowSizeGuide(true)} className="flex items-center gap-2 text-rose-accent text-[0.65rem] uppercase hover:underline">
                  <Ruler size={14} /> Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size: string) => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`border px-6 py-2 text-[0.7rem] transition-all uppercase ${
                      selectedSize === size 
                      ? "bg-white text-black border-white font-bold" 
                      : "border-white/10 text-white hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                disabled={isFlying}
                className="w-full border border-white text-white py-5 text-[0.7rem] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all font-medium"
              >
                {isFlying ? "ĐANG THÊM..." : "Thêm vào túi đồ"}
              </button>

              <button 
                onClick={handleBuyNow}
                className="w-full bg-[#F5F2EF] text-black py-5 text-[0.7rem] tracking-[0.4em] uppercase font-bold hover:bg-rose-accent hover:text-white transition-all shadow-xl"
              >
                Thanh toán ngay
              </button>
            </div>

            <p className="text-center text-[0.5rem] text-white/20 uppercase tracking-[0.2em] mt-10 italic leading-relaxed">
              * Mỗi thiết kế của SERANA đều được chế tác thủ công <br/> nhằm đảm bảo sự hoàn mỹ tuyệt đối.
            </p>
          </div>
        </div>
        
        {/* 3. MÔ TẢ CHIẾM HẾT PHẦN DƯỚI */}
        <div className="w-full bg-[#0A0A0A] p-8 md:p-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-8">
              <h3 className="font-playfair text-3xl text-ivory italic underline decoration-rose-accent/30 underline-offset-8">Chi tiết tuyệt tác</h3>
              <div className="font-inter text-[0.9rem] text-white/60 leading-relaxed whitespace-pre-line italic">
                {product.description}
              </div>
            </div>
            <div className="md:border-l md:border-white/10 md:pl-20 space-y-8">
              <h3 className="font-inter text-[0.7rem] tracking-[0.5em] text-rose-accent uppercase font-bold">Nghệ thuật bảo quản</h3>
              <div className="font-inter text-[0.8rem] text-white/50 leading-loose italic">{product.care}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SIZE GUIDE */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowSizeGuide(false)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative max-w-2xl w-full bg-[#1A1A1A] p-2" onClick={(e)=>e.stopPropagation()}>
              <button onClick={() => setShowSizeGuide(false)} className="absolute -top-10 right-0 text-white/70 flex items-center gap-2 uppercase text-[0.6rem] tracking-[0.3em]">
                Đóng <X size={18} />
              </button>
              <div className="relative aspect-video w-full">
                <Image src="https://i.postimg.cc/5jczwXY6/huongdanchonsize.png" alt="Size Guide" fill className="object-contain p-4" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}