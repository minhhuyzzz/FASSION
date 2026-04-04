"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2 } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Kính chào Quý cô. Tôi là trợ lý ảo của SERENA Atelier. Tôi có thể giúp gì cho hành trình định hình phong cách của Quý cô hôm nay?", sender: "ai" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cuộn xuống cuối mỗi khi tin nhắn thay đổi
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  // Tự động focus vào ô input khi mở chatbot
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
  
    const currentInput = inputValue.trim();
    const userMsg: Message = { id: Date.now(), text: currentInput, sender: "user" };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
  
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });
      
      const data = await res.json();
      const aiMsg: Message = { id: Date.now() + 1, text: data.text, sender: "ai" };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: Message = { 
        id: Date.now() + 1, 
        text: "Thành thật cáo lỗi cùng Quý cô, hệ thống đang bận tâm trong giây lát. Quý cô vui lòng thử lại sau hoặc liên hệ trực tiếp qua Zalo.", 
        sender: "ai" 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-24 z-[999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, originY: "bottom", originX: "right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[calc(100vw-2rem)] max-w-[380px] h-[520px] bg-white border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col rounded-xl overflow-hidden"
          >
            {/* Header sang trọng */}
            <div className="bg-noir p-5 text-white flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <Sparkles size={16} className="text-rose-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white leading-none">SERENA</p>
                  <p className="text-[8px] uppercase tracking-[0.1em] text-rose-accent/80 mt-1">AI Personal Stylist</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Khung chat */}
            <div 
              ref={scrollRef} 
              className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#FCFAFA] no-scrollbar"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3.5 text-[12px] leading-relaxed shadow-sm ${
                    msg.sender === "user" 
                    ? "bg-noir text-white rounded-2xl rounded-tr-none shadow-noir/10" 
                    : "bg-white text-noir border border-black/5 rounded-2xl rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-black/5 p-3 rounded-2xl rounded-tl-none animate-pulse flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input phía dưới */}
            <div className="p-4 bg-white border-t border-black/5">
              <div className="relative flex items-center bg-gray-50 rounded-full px-4 py-2 border border-black/5 focus-within:border-rose-accent/30 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Quý cô đang tìm kiếm điều gì?..."
                  className="flex-1 bg-transparent outline-none text-[12px] font-light text-noir placeholder:text-gray-400 py-1"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend} 
                  disabled={isLoading || !inputValue.trim()}
                  className="ml-2 text-noir hover:text-rose-accent transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
              <p className="text-center text-[8px] text-gray-300 uppercase tracking-widest mt-3">
                Power by SERENA Atelier
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút bấm tròn (Trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative group ${
          isOpen ? "bg-noir rotate-90" : "bg-white border border-black/5 text-noir hover:bg-noir hover:text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="sparkle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Sparkles size={24} className={!isOpen ? "text-rose-accent group-hover:text-white" : ""} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Badge thông báo nhỏ nếu muốn */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-accent rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </div>
  );
}