"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { NearbySection } from "@/components/home/NearbySection";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 1000], [0, 500]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const yText = useTransform(scrollY, [0, 400], [0, 100]);

  const images = [
    '/images/697345.jpg',
    '/images/8Q6kbQz3-shutterstock_1996630238-1-1.webp'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Background Slider */}
        <motion.div 
          style={{ y: yBackground }}
          className="absolute inset-0 z-0"
        >
           <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
              />
           </AnimatePresence>
           <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
            style={{ opacity: opacityHero, y: yText }}
            className="z-10 w-full max-w-3xl text-center space-y-8 mt-[-10vh]"
        >
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
              Discover <span className="text-emerald-400">Malaysia</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md font-medium">
              Find the best places to eat, visit, and stay. Your journey begins here.
            </p>
          </motion.div>

          {/* Search Input */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="relative max-w-xl mx-auto"
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5 z-10 transition-colors group-hover:text-emerald-600" />
              <Input
                className="w-full pl-12 pr-4 h-14 rounded-full bg-white/90 border-transparent shadow-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-lg placeholder:text-gray-500 text-gray-900 transition-all font-medium"
                placeholder="Where do you want to go?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
          </motion.div>

        </motion.div>
      </section>
      
      <NearbySection />

    </main>
  );
}
