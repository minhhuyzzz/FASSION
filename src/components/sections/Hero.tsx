"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Square, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Xử lý Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Xử lý Mute/Unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Xử lý Dừng (Stop) - Quay về đầu và dừng
  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="videos/banner.mp4" type="video/mp4" />
        </video>
        {/* Overlay mờ dần ở phía dưới để chữ và nút rõ hơn */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* 1. Thông tin bộ sưu tập (Góc trái dưới) */}
      <div className="absolute bottom-12 left-6 md:left-12 z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-inter text-[0.7rem] tracking-[0.3em] text-white/90 uppercase mb-2">
            FW 2026 | COUTURE ATELIER
          </p>
          <Link 
            href="/shop" 
            className="group relative inline-block"
          >
            <span className="font-playfair text-xl md:text-2xl text-white tracking-widest uppercase italic">
              Khám Phá 
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-px bg-white origin-left scale-x-100 group-hover:scale-x-50 transition-transform duration-500" />
          </Link>
        </motion.div>
      </div>

      {/* 2. Bộ điều khiển Video (Góc phải dưới - Giống ảnh mẫu) */}
      <div className="absolute bottom-12 right-6 md:right-12 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/10">
          {/* Nút Play */}
          <button 
            onClick={() => { videoRef.current?.play(); setIsPlaying(true); }}
            className={`p-2 hover:text-rose-accent transition-colors ${isPlaying ? 'text-rose-accent' : 'text-white'}`}
          >
            <Play size={16} fill={isPlaying ? "currentColor" : "none"} />
          </button>

          {/* Nút Stop */}
          <button 
            onClick={handleStop}
            className="p-2 text-white hover:text-rose-accent transition-colors"
          >
            <Square size={16} fill="currentColor" />
          </button>

          {/* Nút Pause */}
          <button 
            onClick={togglePlay}
            className="p-2 text-white hover:text-rose-accent transition-colors"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Nút Mute */}
          <button 
            onClick={toggleMute}
            className="p-2 text-white hover:text-rose-accent transition-colors"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Nút cuộn xuống nhỏ gọn */}
        <div className="hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-t from-white/40 to-transparent" />
          <span className="text-[0.5rem] tracking-[0.3em] text-white/40 uppercase vertical-text">Scroll</span>
        </div>
      </div>
    </section>
  );
}