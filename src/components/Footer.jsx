import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [time, setTime] = useState("");
  const [isHovered, setIsHovered] = useState(false);

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
    <footer className="relative bg-[#020202] pt-32 pb-12 px-8 overflow-hidden font-sans border-t border-white/5">
      
      {/* 1. THE CAMERA LENS VIEW (CENTERPIECE) */}
      <div className="relative flex flex-col items-center justify-center min-h-[90vh] z-10">
        
        {/* Contact Text wrapping the Lens */}
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0.4, y: isHovered ? -15 : 0 }}
          className="absolute top-0 text-center z-10"
        >
          <span className="text-[#b09476] text-[10px] tracking-[1em] uppercase font-black mb-6 block">
            Through the Lens
          </span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white hover:text-transparent hover:[text-stroke:1px_#b09476] hover:[-webkit-text-stroke:1px_#b09476] transition-all duration-700">
            Let's create legacy.
          </h2>
        </motion.div>

        {/* THE LENS IRIS - Positioned for Perfect Connection */}
        <div 
          className="relative group cursor-pointer mt-40"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* External Lens Rings - Dynamic Expansion */}
          <motion.div 
            animate={{ scale: isHovered ? 1.05 : 1, borderColor: isHovered ? '#b09476' : 'rgba(255,255,255,0.08)' }}
            className="absolute -inset-10 border rounded-full transition-colors duration-1000"
          />
          <motion.div 
            animate={{ scale: isHovered ? 1.15 : 1 }}
            className="absolute -inset-20 border border-white/5 rounded-full"
          />

          {/* Actual Lens Image - Replaced with Authoritative Portrait */}
          <div className="relative w-72 h-72 md:w-[480px] md:h-[480px] rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_120px_rgba(176,148,118,0.1)]">
            <motion.img 
              src="https://images.unsplash.com/photo-1549213812-706f977c0b02?q=80&w=2070" 
              className="w-full h-full object-cover"
              animate={{ 
                scale: isHovered ? 1.05 : 1.1, // Slight pull-back on hover
                filter: isHovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.3) blur(2px)'
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            
            {/* Overlay Contact - Advanced Grid Layout */}
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 flex flex-col backdrop-blur-sm z-20"
                >
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-10 border-b border-white/10">
                    <a href="mailto:connect@grayshade.in" className="text-white font-black uppercase tracking-tighter text-3xl hover:text-[#b09476] transition-colors">
                      Connect
                    </a>
                    <p className="text-[#b09476] text-sm font-light mt-2 tracking-wide">connect@grayshade.in</p>
                  </div>
                  
                  <div className="flex justify-between items-center text-center px-10 py-6 text-gray-500 font-bold border-t border-white/10">
                    <div className="w-[1px] h-10 bg-white/10 absolute left-1/2 -translate-x-1/2" />
                    <div className="text-xs uppercase tracking-widest flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#b09476] rounded-full animate-pulse" />
                      India HQ
                    </div>
                    <span className="text-xs uppercase tracking-widest">{time}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM INFO - Clean and Central */}
        <div className="mt-20 flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold mb-4">Operational Base</span>
            <span className="text-2xl font-black text-white font-mono tracking-tighter">New Delhi — IST</span>
        </div>
      </div>

      {/* 2. ARCHITECTURAL SOCIAL RIBBON */}
      <div className="mt-20 border-t border-white/5 pt-10 flex flex-wrap justify-center gap-x-16 gap-y-6">
        {["Instagram", "Behance", "Twitter", "Vimeo"].map((link) => (
          <a key={link} href="#" className="text-xs uppercase tracking-[0.4em] font-black text-white/30 hover:text-[#b09476] hover:tracking-[0.6em] transition-all duration-500">
            {link}
          </a>
        ))}
      </div>

      {/* 3. GIANT BACKGROUND GHOST */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full pointer-events-none select-none opacity-[0.02] z-0">
        <h1 className="text-[25vw] font-black uppercase leading-none tracking-tighter text-center whitespace-nowrap">
          GRAY SHADE
        </h1>
      </div>

      {/* 4. COPYRIGHT BAR */}
      <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.5em] text-gray-600 font-bold">
        <span>© 2026 Gray Shade Studios. Legacy Etched in India.</span>
        <div className="flex gap-10 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-all">Privacy</a>
          <a href="#" className="hover:text-white transition-all">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;