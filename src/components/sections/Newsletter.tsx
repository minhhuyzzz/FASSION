"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85"
          alt="Newsletter background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/90 via-noir/70 to-noir/30" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full">
        <div className="max-w-xl">
          <FadeIn>
            <p className="font-inter text-[0.65rem] tracking-[0.35em] text-rose-primary uppercase mb-4">
              Join the Inner Circle
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white leading-tight mb-4">
              The First to Know.
              <br />
              <span className="italic text-rose-primary">Always.</span>
            </h2>
            <p className="font-cormorant text-xl text-white/60 italic mb-10">
              Exclusive previews, private appointments, and stories from the atelier — delivered with intention.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 text-white"
              >
                <div className="w-10 h-10 rounded-full bg-rose-primary/20 flex items-center justify-center">
                  <ArrowRight size={16} className="text-rose-primary" />
                </div>
                <div>
                  <p className="font-playfair text-lg">Welcome to the Maison.</p>
                  <p className="font-inter text-sm text-white/50 mt-1">
                    Your journey begins now.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 font-inter text-sm px-6 py-4 focus:outline-none focus:border-rose-primary transition-colors duration-300"
                />
                <motion.button
                  type="submit"
                  whileHover={{ backgroundColor: "rgba(164, 113, 122, 1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-luxury bg-rose-primary text-white font-inter text-[0.65rem] tracking-[0.25em] px-8 py-4 flex items-center justify-center gap-3 whitespace-nowrap transition-colors duration-300"
                >
                  Subscribe
                  <ArrowRight size={14} />
                </motion.button>
              </form>
            )}

            <p className="font-inter text-[0.6rem] text-white/25 tracking-wider mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
