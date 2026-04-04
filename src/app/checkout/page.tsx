"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Landmark, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "TP. Hồ Chí Minh",
    paymentMethod: "COD", 
  });

  const bankInfo = {
    bankName: "BIDV (Ngân hàng TMCP Đầu tư & Phát triển Việt Nam)",
    accountNumber: "7302168136",
    accountName: "TRAN MINH HUY",
    qrUrl: `https://i.postimg.cc/wMcnDmMn/QR.jpg?amount=${cartTotal.replace(/\./g, "")}&addInfo=SERANA%20ORDER`
  };

  // LOGIC XỬ LÝ NHẬP LIỆU
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      // Chỉ cho phép nhập số và tối đa 10 ký tự
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitOrder = async (e: any) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Giỏ hàng trống!");

    // VALIDATION: Kiểm tra email chuẩn
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return alert("Địa chỉ email không hợp lệ. Quý khách vui lòng kiểm tra lại.");
    }

    // VALIDATION: Kiểm tra số điện thoại đúng 10 số
    if (formData.phone.length !== 10) {
      return alert("Số điện thoại phải bao gồm chính xác 10 chữ số.");
    }

    if (!formData.name || !formData.address) {
      return alert("Quý khách vui lòng điền đầy đủ họ tên và địa chỉ.");
    }
    
    setLoading(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{
          customer_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          total_amount: cartTotal,
          payment_method: formData.paymentMethod,
        }])
        .select().single();

      if (orderError) throw orderError;

      const itemsToInsert = cartItems.map((item: any) => ({
        order_id: order.id,
        product_name: item.name,
        size: item.selectedSize,
        price: item.price,
        image_url: item.images[0]
      }));

      await supabase.from("order_items").insert(itemsToInsert);

      alert("Đặt hàng thành công! SERANA sẽ liên hệ xác nhận đơn hàng của quý khách.");
      clearCart();
      router.push("/"); 
    } catch (error: any) {
      alert("Lỗi hệ thống: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-24 pb-20 px-6 md:px-12 text-noir font-inter">
      <div className="max-w-[1200px] mx-auto">
        
        <Link href="/cart" className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-gray-500 hover:text-rose-accent mt-6 mb-8 transition-colors">
          <ChevronLeft size={14} /> Quay lại giỏ hàng
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* CỘT TRÁI: FORM */}
          <div className="lg:col-span-7 space-y-12">
            <section>
              <h2 className="font-playfair text-3xl mb-8 italic">Thông tin giao hàng</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-500">Họ và tên người nhận</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border-b border-gray-200 py-3 bg-transparent outline-none focus:border-rose-accent transition-all text-sm" placeholder="Nguyễn Thị Lan" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-500">Số điện thoại (10 số)</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full border-b border-gray-200 py-3 bg-transparent outline-none focus:border-rose-accent transition-all text-sm" placeholder="09xxxxxxxx" />
                </div>

                <div className="space-y-2">
                  <label className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-500">Email xác nhận</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full border-b border-gray-200 py-3 bg-transparent outline-none focus:border-rose-accent transition-all text-sm" placeholder="customer@serena.vn" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-500">Địa chỉ chi tiết</label>
                  <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full border-b border-gray-200 py-3 bg-transparent outline-none focus:border-rose-accent transition-all text-sm" placeholder="Số nhà, tên đường, phường/xã..." />
                </div>
              </form>
            </section>

            {/* PHƯƠNG THỨC THANH TOÁN */}
            <section className="space-y-6">
              <h2 className="font-playfair text-3xl mb-8 italic">Hình thức thanh toán</h2>
              <div className="grid gap-4">
                <label className={`relative flex items-center gap-4 p-6 border cursor-pointer transition-all ${formData.paymentMethod === "COD" ? 'border-rose-accent bg-rose-accent/[0.02]' : 'border-gray-100 hover:border-gray-300'}`}>
                  <input type="radio" name="paymentMethod" value="COD" checked={formData.paymentMethod === "COD"} onChange={handleInputChange} className="accent-rose-accent h-4 w-4" />
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-50 rounded-full"><Truck size={20} className="text-gray-400" /></div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-tight">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-[0.65rem] text-gray-400 mt-0.5">Kiểm tra sản phẩm trước khi thanh toán.</p>
                    </div>
                  </div>
                </label>

                <label className={`relative flex items-center gap-4 p-6 border cursor-pointer transition-all ${formData.paymentMethod === "Bank" ? 'border-rose-accent bg-rose-accent/[0.02]' : 'border-gray-100 hover:border-gray-300'}`}>
                  <input type="radio" name="paymentMethod" value="Bank" checked={formData.paymentMethod === "Bank"} onChange={handleInputChange} className="accent-rose-accent h-4 w-4" />
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-50 rounded-full"><Landmark size={20} className="text-gray-400" /></div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-tight">Chuyển khoản qua mã QR</p>
                      <p className="text-[0.65rem] text-gray-400 mt-0.5">Xác nhận đơn hàng nhanh chóng qua VietQR.</p>
                    </div>
                  </div>
                </label>

                {/* THÔNG TIN NGÂN HÀNG */}
                <AnimatePresence>
                  {formData.paymentMethod === "Bank" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="mt-4 p-8 border border-rose-accent/20 bg-white shadow-xl rounded-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <p className="text-[0.6rem] uppercase tracking-widest text-rose-accent font-bold">Tài khoản thụ hưởng</p>
                          <div className="space-y-3">
                            <div>
                              <p className="text-[0.55rem] text-gray-400 uppercase">Ngân hàng</p>
                              <p className="text-sm font-medium">{bankInfo.bankName}</p>
                            </div>
                            <div>
                              <p className="text-[0.55rem] text-gray-400 uppercase">Số tài khoản</p>
                              <p className="text-lg font-bold text-rose-accent">{bankInfo.accountNumber}</p>
                            </div>
                            <div>
                              <p className="text-[0.55rem] text-gray-400 uppercase">Chủ tài khoản</p>
                              <p className="text-sm font-bold uppercase">{bankInfo.accountName}</p>
                            </div>
                            <div className="bg-gray-50 p-3 text-[0.6rem] text-gray-500">
                              Nội dung: <span className="text-noir font-bold">SERANA {formData.phone || "[SDT]"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center border-l border-gray-100 md:pl-8">
                          <div className="relative w-44 h-44 border-4 border-noir p-1 bg-white">
                            <img src={bankInfo.qrUrl} alt="Bank QR" className="w-full h-full object-contain" />
                          </div>
                          <p className="mt-4 text-[0.5rem] text-gray-500 italic">Quét mã để hoàn tất thanh toán.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </div>

          {/* CỘT PHẢI: TỔNG KẾT */}
          <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
            <div className="bg-white border border-gray-100 p-8 shadow-sm space-y-8">
              <h2 className="font-playfair text-2xl italic border-b pb-4">Tóm tắt đơn hàng</h2>
              <div className="space-y-6 max-h-[350px] overflow-y-auto no-scrollbar">
                {cartItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-gray-50">
                      <Image src={item.images[0]} alt="product" fill className="object-cover" />
                    </div>
                    <div className="flex-1 text-[0.7rem] space-y-1">
                      <p className="font-bold uppercase">{item.name}</p>
                      <p className="text-gray-400 uppercase">Kích cỡ: {item.selectedSize}</p>
                      <p className="font-medium pt-1">{item.price} VNĐ</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t">
                <div className="flex justify-between text-[0.6rem] uppercase text-gray-400 tracking-widest">
                  <span>Tạm tính</span>
                  <span>{cartTotal} VNĐ</span>
                </div>
                <div className="flex justify-between text-[0.7rem] font-bold uppercase tracking-[0.2em] pt-4">
                  <span>Tổng cộng</span>
                  <span className="text-2xl text-rose-accent">{cartTotal} VNĐ</span>
                </div>
              </div>

              <button 
                onClick={handleSubmitOrder}
                disabled={loading}
                className="w-full bg-noir text-ivory py-6 text-[0.7rem] tracking-[0.4em] uppercase font-bold hover:bg-rose-accent transition-all duration-500 shadow-xl disabled:bg-gray-300"
              >
                {loading ? "ĐANG GỬI ĐƠN HÀNG..." : "XÁC NHẬN ĐẶT HÀNG"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}