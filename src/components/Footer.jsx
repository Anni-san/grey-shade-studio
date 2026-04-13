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
    <footer className="relative bg-[#020202] pt-20 pb-12 px-8 overflow-hidden font-sans">
      
      {/* 1. THE CAMERA LENS VIEW (CENTERPIECE) */}
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] z-10">
        
        {/* Contact Text wrapping the Lens */}
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0.4, y: isHovered ? -20 : 0 }}
          className="absolute top-0 text-center"
        >
          <span className="text-[#b09476] text-[10px] tracking-[0.8em] uppercase font-black mb-4 block">
            Through the Lens
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Let's create legacy.
          </h2>
        </motion.div>

        {/* THE LENS IRIS */}
        <div 
          className="relative group cursor-pointer mt-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* External Lens Rings */}
          <motion.div 
            animate={{ scale: isHovered ? 1.1 : 1, borderColor: isHovered ? '#b09476' : 'rgba(255,255,255,0.1)' }}
            className="absolute -inset-10 border rounded-full transition-colors duration-700"
          />
          <motion.div 
            animate={{ scale: isHovered ? 1.2 : 1 }}
            className="absolute -inset-20 border border-white/5 rounded-full"
          />

          {/* Actual Lens Image */}
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_100px_rgba(176,148,118,0.1)]">
            <motion.img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071" 
              className="w-full h-full object-cover"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                filter: isHovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.4)'
              }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Overlay Contact */}
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm"
                >
                  <a href="mailto:connect@grayshade.in" className="text-white font-black uppercase tracking-tighter text-xl hover:text-[#b09476]">
                    Email Us
                  </a>
                  <div className="h-[1px] w-12 bg-[#b09476] my-4" />
                  <span className="text-[10px] text-white/60 tracking-widest uppercase">New Delhi, India</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM INFO WRAPPING LENS */}
        <div className="mt-24 flex gap-12 items-center text-center">
          <div className="flex flex-col items-center">
            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-1">Local Pulse</span>
            <span className="text-xl font-black text-white italic">{time}</span>
          </div>
        </div>
      </div>

      {/* 2. ARCHITECTURAL SOCIAL RIBBON */}
      <div className="mt-20 border-t border-white/10 pt-10 flex flex-wrap justify-center gap-x-16 gap-y-6">
        {["Instagram", "Behance", "Twitter", "Vimeo"].map((link) => (
          <a key={link} href="#" className="text-xs uppercase tracking-[0.4em] font-black text-white/30 hover:text-[#b09476] transition-all">
            {link}
          </a>
        ))}
      </div>

      {/* 3. GIANT BACKGROUND GHOST */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full pointer-events-none select-none opacity-[0.02] z-0">
        <h1 className="text-[20vw] font-black uppercase leading-none tracking-tighter text-center whitespace-nowrap">
          GRAY SHADE
        </h1>
      </div>

      {/* 4. COPYRIGHT BAR */}
      <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.5em] text-gray-600 font-bold">
        <span>© 2026 Gray Shade Studios. India HQ.</span>
        <div className="flex gap-10 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-all">Privacy</a>
          <a href="#" className="hover:text-white transition-all">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;