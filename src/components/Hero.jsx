import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sliderData = [
  {
    id: "01",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: "02",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "03",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop",
  }
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Auto-loop timer for images and counter
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex items-center px-12 md:px-24">
      
      {/* --- TOP NAVIGATION --- */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-12 py-10 z-50">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-black tracking-tighter border-2 border-white w-10 h-10 flex items-center justify-center">G</div>
          <div className="flex flex-col leading-none">
            <span className="font-bold tracking-widest text-lg uppercase">Gray Shade</span>
            <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">Studios</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <a href="#" className="hover:text-white transition">About Us</a>
          <a href="#" className="hover:text-white transition">Contact Us</a>
          <a href="#" className="hover:text-white transition">Portfolio</a>
          <a href="#" className="hover:text-white transition">Videos</a>
          <button className="border border-[#b09476] px-6 py-2 text-white hover:bg-[#b09476] hover:text-black transition-all">
            Book Now
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center z-10">
        
        {/* LEFT: Typography */}
        <motion.div 
          key={`text-${index}`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-xl"
        >
          <h1 className="text-[100px] font-black leading-[0.9] mb-8 uppercase tracking-tighter">
            Photography <br /> Studio
          </h1>
          
          <h3 className="text-xl font-bold mb-4 tracking-wide text-gray-200 underline decoration-[#b09476] underline-offset-8">
            Who we are?
          </h3>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm">
            We don't just take pictures; we capture the essence of the moment. 
            Specializing in high-end portraiture and cinematic storytelling 
            for the modern masterpiece.
          </p>

          <button className="border border-gray-700 px-8 py-3 uppercase text-[10px] tracking-[0.3em] font-bold hover:border-white transition-all">
            Read more about us
          </button>

          {/* Social Icons */}
          <div className="flex gap-8 mt-16 text-gray-500">
            <svg className="w-4 h-4 hover:text-white cursor-pointer transition fill-current" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
            <svg className="w-4 h-4 hover:text-white cursor-pointer transition fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
            <svg className="w-4 h-4 hover:text-white cursor-pointer transition fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
          </div>
        </motion.div>

        {/* RIGHT: Perfect Circular Image Composition */}
        <div className="relative flex justify-center items-center h-full pt-20">
          
          {/* Animated Background Ring */}
          <div className="absolute w-[550px] h-[550px] border-[1px] border-gray-900 rounded-full"></div>
          <div className="absolute w-[650px] h-[650px] border-[40px] border-[#0a0a0a] rounded-full shadow-[0_0_100px_rgba(0,0,0,1)]"></div>
          
          {/* The Image (Properly Circular Masked) */}
          <div className="relative z-10 w-[500px] h-[500px] overflow-hidden rounded-full border-[10px] border-[#0a0a0a]">
            <AnimatePresence mode="wait">
              <motion.img 
                key={index}
                src={sliderData[index].img} 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
            </AnimatePresence>
            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]"></div>
          </div>

          {/* Dynamic Counter (Changes with Image) */}
          <div className="absolute right-0 top-1/2 translate-x-16 -translate-y-1/2 flex items-baseline z-20">
             <motion.span 
               key={`count-${index}`}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="text-7xl font-light tracking-tighter"
             >
                {sliderData[index].id}
             </motion.span>
             <span className="text-gray-700 text-2xl font-bold">/03</span>
          </div>
        </div>

      </div>

      {/* BOTTOM: Scroll Decoration */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
        <div className="w-[1px] h-16 bg-white"></div>
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold">Scroll</span>
      </div>

    </div>
  );
};

export default Hero;