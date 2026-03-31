"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation"; // Thêm để chuyển trang

export default function ProductModal({ product, onClose }: any) {
  const [currentImg, setCurrentImg] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  
  const { addToCart } = useCart();
  const router = useRouter(); // Khởi tạo router

  // Hàm xử lý Thêm vào giỏ
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ!");
      return;
    }
    setIsFlying(true);
    addToCart({ ...product, selectedSize });
    setTimeout(() => setIsFlying(false), 800);
  };

  // Hàm xử lý THANH TOÁN NGAY
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ trước khi thanh toán!");
      return;
    }
    // 1. Thêm vào giỏ hàng
    addToCart({ ...product, selectedSize });
    // 2. Chuyển hướng thẳng đến trang giỏ hàng/thanh toán
    router.push("/cart");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      {/* HIỆU ỨNG ẢNH BAY */}
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
        className="relative w-full max-w-6xl h-[90vh] bg-[#1A1A1A] text-ivory overflow-y-auto no-scrollbar shadow-2xl border border-white/5"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white z-[110] bg-black/20 p-2 rounded-full">
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* GALLERY BÊN TRÁI */}
          <div className="lg:w-[60%] p-4 md:p-8 space-y-4">
            <div className="relative aspect-[3/4] w-full bg-white/5">
              <Image src={product.images[currentImg]} alt="main" fill className="object-cover" />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {product.images.map((img: string, idx: number) => (
                <div key={idx} onClick={() => setCurrentImg(idx)} className={`relative w-24 h-32 flex-shrink-0 cursor-pointer border-2 transition-all ${currentImg === idx ? 'border-rose-accent' : 'border-transparent opacity-40'}`}>
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* THÔNG TIN BÊN PHẢI */}
          <div className="lg:w-[40%] p-8 lg:sticky lg:top-0 h-fit">
            <p className="text-rose-accent text-[0.6rem] tracking-[0.4em] uppercase mb-4">{product.tag}</p>
            <h2 className="font-playfair text-4xl mb-4 italic tracking-tight">{product.name}</h2>
            <p className="text-2xl font-inter text-white mb-10">{product.price} VNĐ</p>

            {/* CHỌN SIZE */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[0.65rem] tracking-[0.2em] text-white/40 uppercase font-inter">Kích cỡ</span>
                <button onClick={() => setShowSizeGuide(true)} className="flex items-center gap-2 text-rose-accent text-[0.65rem] uppercase hover:underline">
                  <Ruler size={14} /> Hướng dẫn chọn size
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

            {/* CỤM NÚT BẤM CHÍNH */}
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                disabled={isFlying}
                className="w-full border border-white text-white py-5 text-[0.7rem] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all font-medium"
              >
                {isFlying ? "ĐANG THÊM..." : "Thêm vào giỏ hàng"}
              </button>

              {/* NÚT THANH TOÁN NGAY NẰM DƯỚI */}
              <button 
                onClick={handleBuyNow}
                className="w-full bg-ivory text-noir py-5 text-[0.7rem] tracking-[0.4em] uppercase font-bold hover:bg-rose-accent hover:text-white transition-all shadow-xl"
              >
                Thanh toán ngay
              </button>
            </div>

            <p className="text-center text-[0.5rem] text-white/20 uppercase tracking-[0.2em] mt-8 italic">
              * Vui lòng kiểm tra kỹ kích cỡ trước khi thanh toán.
            </p>
          </div>
        </div>
        
        {/* Phần mô tả & bảo quản bên dưới (giữ nguyên) */}
        <div className="w-full bg-[#1F1F1F] p-8 md:p-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="font-playfair text-2xl text-ivory italic mb-8">Thông tin sản phẩm</h3>
              <div className="font-cormorant text-xl text-white/60 leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>
            <div className="border-l border-white/10 pl-0 md:pl-16">
              <h3 className="font-inter text-[0.7rem] tracking-[0.4em] text-rose-accent uppercase mb-8">Hướng dẫn bảo quản</h3>
              <div className="font-inter text-[0.8rem] text-white/50 leading-loose italic">{product.care}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SIZE GUIDE (Giữ nguyên) */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowSizeGuide(false)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative max-w-lg w-full bg-[#1A1A1A] p-2" onClick={(e)=>e.stopPropagation()}>
              <button onClick={() => setShowSizeGuide(false)} className="absolute -top-10 right-0 text-white/70 flex items-center gap-2 uppercase text-[0.6rem] tracking-[0.3em]">
                Đóng <X size={18} />
              </button>
              <div className="relative aspect-[3/4] w-full">
                <Image src="https://i.postimg.cc/5jczwXY6/huongdanchonsize.png" alt="Size Guide" fill className="object-contain p-4" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}