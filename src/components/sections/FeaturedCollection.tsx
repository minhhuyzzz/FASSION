"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Celestine Gown",
    category: "Couture",
    price: "€8,400",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85",
    tag: "New",
  },
  {
    id: 2,
    name: "Evelyne Silk Drape",
    category: "Bridal",
    price: "€12,200",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4a6bf2?w=800&q=85",
    tag: "Bestseller",
  },
  {
    id: 3,
    name: "Valentina Lace",
    category: "Couture",
    price: "€9,700",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=85",
    tag: null,
  },
  {
    id: 4,
    name: "Iris Atelier",
    category: "Resort",
    price: "€6,100",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85",
    tag: "Limited",
  },
];

export default function FeaturedCollection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true });

  return (
    <section id="collections" className="py-28 md:py-36 bg-ivory">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-inter text-[0.65rem] tracking-[0.3em] text-rose-accent uppercase mb-4 line-decorator"
            >
              Featured Selection
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-playfair text-4xl md:text-5xl lg:text-6xl text-noir leading-tight"
              >
                The Couture Edit
              </motion.h2>
            </div>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            href="#"
            className="btn-luxury text-rose-accent text-[0.65rem] self-start md:self-auto"
          >
            View All Collections →
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.12} direction="up">
      <motion.div
        whileHover="hover"
        className="group relative cursor-pointer"
      >
        {/* Image Container */}
        <div className="img-zoom relative aspect-[3/4] overflow-hidden bg-rose-blush mb-5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4 z-10">
              <span className="font-inter text-[0.55rem] tracking-[0.2em] uppercase bg-white/90 text-rose-accent px-3 py-1">
                {product.tag}
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <motion.div
            variants={{
              hover: { opacity: 1 },
            }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent flex items-end p-6"
          >
            <motion.button
              variants={{ hover: { y: 0, opacity: 1 } }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="w-full py-3 bg-white text-noir font-inter text-[0.6rem] tracking-[0.25em] uppercase hover:bg-rose-primary hover:text-white transition-colors duration-300"
            >
              Add to Wishlist
            </motion.button>
          </motion.div>

          {/* Wishlist icon */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-rose-primary transition-colors"
          >
            <Heart size={16} strokeWidth={1.5} />
          </motion.button>
        </div>

        {/* Text */}
        <div className="px-1">
          <p className="font-inter text-[0.6rem] tracking-[0.2em] text-rose-accent/70 uppercase mb-1">
            {product.category}
          </p>
          <div className="flex items-center justify-between">
            <h3 className="font-playfair text-lg text-noir group-hover:text-rose-accent transition-colors duration-300">
              {product.name}
            </h3>
            <span className="font-cormorant text-base text-noir/60 italic">
              {product.price}
            </span>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}
