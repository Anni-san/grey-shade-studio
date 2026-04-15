import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [time, setTime] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const lensRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const options = { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', minute: '2-digit', second: '2-digit', 
        hour12: true 
      };
      setTime(new Intl.DateTimeFormat('en-IN', options).format(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative bg-[#020202] pt-32 pb-12 px-8 overflow-hidden font-sans border-t border-white/5 selection:bg-[#b09476]">
      
      {/* THE LENS STAGE */}
      <div className="relative flex flex-col items-center justify-center min-h-[90vh] z-10">
        
        {/* Top Branding - Simplified animation to prevent layout thrashing */}
        <div className="absolute top-0 text-center z-10 pointer-events-none transition-all duration-700"
             style={{ opacity: isHovered ? 1 : 0.4, transform: `translateY(${isHovered ? '-10px' : '0px'})` }}>
          <span className="text-[#b09476] text-[10px] tracking-[1em] uppercase font-black mb-6 block">
            Final Perspective
          </span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
            Let's create legacy.
          </h2>
        </div>

        {/* --- THE HIGH-PERFORMANCE CAMERA LENS --- */}
        <div 
          ref={lensRef}
          className="relative mt-32 perspective-1000"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glass Glint - Uses transform: translate3d for GPU speed */}
          <motion.div 
            animate={{ x: isHovered ? '250%' : '-150%' }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="absolute inset-0 z-30 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full skew-x-20 pointer-events-none"
          />

          {/* External Lens Barrels */}
          <div className={`absolute -inset-6 border-2 rounded-full transition-all duration-1000 z-10 
            ${isHovered ? 'scale-105 border-[#b09476]' : 'scale-100 border-white/10'}`} />
          
          <div className="absolute -inset-12 border border-white/5 rounded-full" />

          {/* The Main Aperture Housing */}
          <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] rounded-full overflow-hidden border-[12px] border-[#0a0a0a] bg-black shadow-[0_0_100px_rgba(0,0,0,1)] will-change-transform">
            
            {/* The Iris Blades - Using scale instead of complex border-width changes for lag-free motion */}
            <motion.div 
              animate={{ 
                scale: isHovered ? 0.85 : 1.3,
                rotate: isHovered ? 30 : 0 
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-10 border-[100px] border-[#020202] rounded-full opacity-90 pointer-events-none"
            />

            {/* Optimized Image Reveal (Dual-Layer to avoid real-time Blur lag) */}
            <div className="relative w-full h-full">
               {/* Base Image (Sharp/Color) */}
               <img 
                  src="https://images.unsplash.com/photo-1549213812-706f977c0b02?q=80&w=2070" 
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                  alt="Legacy View"
               />
               {/* Overlay Image (Grayscale/Dim) - We just fade the opacity of this layer */}
               <motion.div 
                  animate={{ opacity: isHovered ? 0 : 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full bg-black/60 backdrop-grayscale"
               />
            </div>
            
            {/* Internal Lens Data Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/85 flex flex-col backdrop-blur-md z-40 items-center justify-center translate-z-0"
                >
                  <div className="p-8 border-b border-white/10 w-full text-center">
                    <motion.a 
                      initial={{ y: 10 }} animate={{ y: 0 }}
                      href="mailto:connect@grayshade.in" 
                      className="text-white font-black uppercase tracking-tighter text-4xl hover:text-[#b09476] transition-colors"
                    >
                      Connect
                    </motion.a>
                  </div>
                  
                  <div className="grid grid-cols-2 w-full text-center py-8">
                    <div className="border-r border-white/10 px-4">
                      <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1 font-bold">Time (IST)</span>
                      <span className="text-sm font-mono text-white">{time}</span>
                    </div>
                    <div className="px-4">
                      <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1 font-bold">Operations</span>
                      <span className="text-sm font-black text-[#b09476] uppercase tracking-tighter">India HQ</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM STATUS */}
        <div className="mt-20 flex items-center gap-6 group cursor-default">
            <div className="w-2 h-2 bg-[#b09476] rounded-full shadow-[0_0_10px_#b09476] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.8em] text-white/30 font-black group-hover:text-white transition-colors duration-500">
              New Delhi — Established 2026
            </span>
        </div>
      </div>

      {/* FOOTER NAV - Architectural Spacing */}
      <div className="mt-20 border-t border-white/5 pt-12 flex flex-wrap justify-center gap-x-16 md:gap-x-24 gap-y-6 relative z-10">
        {["Instagram", "Behance", "Twitter", "Vimeo"].map((link) => (
          <a key={link} href="#" className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black text-white/20 hover:text-[#b09476] transition-all duration-500">
            {link}
          </a>
        ))}
      </div>

      {/* BACKGROUND BRANDING - Optimized Opacity */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full pointer-events-none select-none opacity-[0.01] z-0">
        <h1 className="text-[28vw] font-black uppercase leading-none tracking-tighter text-center whitespace-nowrap">
          GRAY SHADE
        </h1>
      </div>

      {/* FINAL LEGAL */}
      <div className="mt-24 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.6em] text-gray-700 font-black">
        <span>© 2026 Gray Shade Studios. India.</span>
        <div className="flex gap-12 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition-all">Privacy</a>
          <a href="#" className="hover:text-white transition-all">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;