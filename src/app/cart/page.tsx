"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <main className="min-h-screen bg-noir pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* TIÊU ĐỀ & NÚT QUAY LẠI */}
        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
          <div>
            <h1 className="font-playfair text-4xl text-ivory italic">Giỏ hàng của bạn</h1>
            <p className="text-white/20 text-[0.6rem] uppercase tracking-[0.2em] mt-2">
              Bạn đang có {cartItems.length} món đồ trong túi
            </p>
          </div>
          <Link href="/shop" className="text-white/40 hover:text-rose-accent transition-all text-[0.6rem] uppercase tracking-[0.2em] flex items-center gap-2 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Tiếp tục mua sắm
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 bg-white/[0.02]">
            <ShoppingBag size={48} className="mx-auto text-white/10 mb-6" strokeWidth={1} />
            <p className="text-white/40 font-inter text-sm mb-8 uppercase tracking-widest">Túi đồ của bạn đang trống</p>
            <Link href="/shop" className="inline-block bg-ivory text-noir px-12 py-4 text-[0.7rem] tracking-[0.3em] uppercase hover:bg-rose-accent hover:text-white transition-all font-bold">
              Khám phá bộ sưu tập
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* DANH SÁCH SẢN PHẨM */}
            <div className="divide-y divide-white/5 border-b border-white/5">
              {cartItems.map((item: any, idx: number) => (
                <div key={idx} className="py-8 flex gap-6 items-center group">
                  {/* Ảnh sản phẩm */}
                  <div className="relative w-24 h-32 flex-shrink-0 bg-white/5 overflow-hidden">
                    <Image 
                      src={item.images[0]} 
                      alt={item.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>

                  {/* Thông tin chi tiết */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-playfair text-xl text-ivory tracking-wide">{item.name}</h3>
                      <p className="text-ivory font-inter text-sm font-medium">{item.price} VNĐ</p>
                    </div>
                    
                    {/* HIỂN THỊ SIZE NỔI BẬT */}
                    <div className="inline-flex items-center bg-white/5 border border-white/10 px-3 py-1 rounded-sm">
                      <span className="text-rose-accent text-[0.55rem] uppercase tracking-widest font-bold">
                        Size: <span className="text-white ml-1">{item.selectedSize || "N/A"}</span>
                      </span>
                    </div>
                    
                    <p className="text-white/20 text-[0.55rem] uppercase tracking-[0.2em] pt-2 italic">
                      Phân phối độc quyền bởi SERENA
                    </p>
                  </div>

                  {/* Nút xóa */}
                  <button 
                    onClick={() => removeFromCart(idx)}
                    className="ml-4 p-3 text-white/10 hover:text-rose-accent hover:bg-rose-accent/5 transition-all rounded-full"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 size={20} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>

            {/* TỔNG KẾT & THANH TOÁN */}
            <div className="flex flex-col items-end gap-6 pt-4">
              <div className="w-full max-w-[350px] space-y-4 bg-white/[0.02] p-6 border border-white/5">
                <div className="flex justify-between text-white/40 uppercase text-[0.6rem] tracking-widest font-inter">
                  <span>Tạm tính</span>
                  <span>{cartTotal} VNĐ</span>
                </div>
                <div className="flex justify-between text-white/40 uppercase text-[0.6rem] tracking-widest font-inter">
                  <span>Phí vận chuyển</span>
                  <span className="text-rose-accent italic text-[0.6rem]">Miễn phí (Standard)</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-4 mt-2">
                  <span className="text-ivory uppercase text-[0.7rem] tracking-[0.2em] font-bold">Tổng cộng</span>
                  <span className="text-rose-accent font-inter text-2xl font-bold tracking-tighter">
                    {cartTotal} VNĐ
                  </span>
                </div>
              </div>

              {/* NÚT THANH TOÁN DẪN SANG TRANG CHECKOUT */}
              <Link 
                href="/checkout" 
                className="w-full max-w-[350px] bg-ivory text-noir py-6 text-[0.75rem] tracking-[0.4em] uppercase font-bold hover:bg-rose-accent hover:text-white transition-all shadow-2xl text-center"
              >
                Tiến hành thanh toán
              </Link>
              
              <p className="text-[0.5rem] text-white/20 uppercase tracking-[0.2em] max-w-[350px] text-center">
                Bằng cách nhấn thanh toán, bạn đồng ý với các điều khoản mua hàng của chúng tôi.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}