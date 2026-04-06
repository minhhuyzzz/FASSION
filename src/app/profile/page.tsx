"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import Image from "next/image";
import { Package, Truck, CheckCircle, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // CHỖ SỬA QUAN TRỌNG: Kết nối bảng orders và order_items
        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            order_items (
              *
            )
          `)
          .eq("user_id", user.id) // Chỉ lấy đơn hàng của đúng Quý cô
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Lỗi truy xuất đơn hàng:", error.message);
        } else {
          setOrders(data || []);
        }
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  // Hàm hiển thị trạng thái bằng tiếng Việt theo Database của Quý cô
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "Chờ xác nhận": 
        return { text: "Đang chờ duyệt", color: "text-amber-500", icon: <Clock size={16} /> };
      case "shipping": 
        return { text: "Đang giao tận tay", color: "text-blue-500", icon: <Truck size={16} /> };
      case "delivered": 
        return { text: "Đã hoàn tất", color: "text-green-500", icon: <CheckCircle size={16} /> };
      default: 
        return { text: status || "Đang xử lý", color: "text-rose-accent", icon: <Package size={16} /> };
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white italic">
      <div className="w-12 h-px bg-rose-accent animate-pulse mb-4" />
      <p className="text-[10px] uppercase tracking-[0.3em]">Đang tải hành trình sở hữu...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12 text-white font-inter">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <h1 className="font-playfair text-5xl italic mb-4">Tuyệt tác của Quý cô</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Lịch sử đơn hàng & Theo dõi vận chuyển</p>
          </div>
          <Link href="/shop" className="text-[9px] uppercase tracking-widest text-white/40 hover:text-rose-accent transition-colors flex items-center gap-2 mb-1">
            <ChevronLeft size={12} /> Tiếp tục mua sắm
          </Link>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 bg-white/[0.02]">
            <Package size={40} className="mx-auto text-white/10 mb-6" strokeWidth={1} />
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Quý cô chưa có đơn hàng nào</p>
            <Link href="/shop" className="inline-block mt-8 border border-white/20 px-10 py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Khám phá bộ sưu tập
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => {
              const statusInfo = getStatusDisplay(order.status);
              return (
                <motion.div 
                  key={order.id} 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-sm hover:border-white/15 transition-all duration-500"
                >
                  {/* Header đơn hàng */}
                  <div className="flex flex-wrap justify-between items-start mb-10 gap-6">
                    <div className="space-y-2">
                      <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Mã đơn hàng</p>
                      <p className="font-playfair text-xl italic text-white/90">#{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    
                    <div className={`flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 ${statusInfo.color}`}>
                      {statusInfo.icon}
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>

                  {/* Danh sách sản phẩm - FIX LỖI .map ở đây */}
                  <div className="divide-y divide-white/5 border-t border-b border-white/5">
                    {order.order_items?.map((item: any, idx: number) => (
                      <div key={idx} className="py-6 flex gap-8 items-center">
                        <div className="relative w-20 h-24 bg-white/5 flex-shrink-0">
                          <Image 
                            src={item.image_url || "/images/placeholder.jpg"} 
                            alt={item.product_name} 
                            fill 
                            className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" 
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-playfair text-lg text-white/90">{item.product_name}</h4>
                          <div className="flex items-center gap-4 text-[9px] text-white/40 uppercase tracking-widest">
                            <span>Kích cỡ: {item.size || "N/A"}</span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span>Số lượng: 01</span>
                          </div>
                        </div>
                        <p className="text-sm font-inter text-white/80 tabular-nums font-light">{item.price} VNĐ</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer đơn hàng */}
                  <div className="mt-10 flex flex-wrap justify-between items-end gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1">Địa chỉ giao hàng</p>
                        <p className="text-[11px] text-white/60 leading-relaxed max-w-xs">{order.address}, {order.city}</p>
                      </div>
                      <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Ngày đặt: {new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-[9px] text-white/30 uppercase tracking-widest mb-2">Tổng giá trị đơn hàng</p>
                      <p className="text-3xl font-playfair italic text-rose-accent">{order.total_amount} VNĐ</p>
                      <p className="text-[8px] text-white/20 uppercase tracking-widest mt-2">Đã bao gồm phí vận chuyển Standard</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}