import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [time, setTime] = useState("");

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
    <footer className="relative bg-[#020202] pt-40 pb-12 px-8 md:px-20 overflow-hidden font-sans border-t border-white/5">
      
      {/* 1. THE BIG STATEMENT */}
      <div className="relative z-10 flex flex-col items-center text-center mb-60">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[#b09476] text-[10px] tracking-[0.8em] uppercase font-black mb-12 block">
            Initiate the Legacy
          </span>
          <a 
            href="mailto:connect@grayshade.in" 
            className="group relative inline-block text-[8vw] md:text-[10vw] font-black uppercase leading-[0.8] tracking-[ -0.05em] text-white"
          >
            <span className="relative z-10 transition-all duration-700 group-hover:text-[#b09476]">
              Let's Talk.
            </span>
            {/* Hover Underline focus */}
            <motion.div 
              className="absolute bottom-4 left-0 w-0 h-2 bg-[#b09476] transition-all duration-700 group-hover:w-full"
            />
          </a>
        </motion.div>
      </div>

      {/* 2. THE ARCHITECTURAL INFO BAR */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-end border-b border-white/10 pb-20">
        
        {/* TIME & LOCATION */}
        <div className="md:col-span-4 space-y-10">
          <div className="flex items-center gap-6">
            <div className="w-2 h-2 bg-[#b09476] rounded-full animate-pulse" />
            <div>
              <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold block mb-1">Live in India</span>
              <span className="text-2xl font-black text-white italic">{time}</span>
            </div>
          </div>
          <div className="pl-8">
            <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold block mb-1">Our Base</span>
            <span className="text-lg text-white font-bold uppercase">New Delhi — HQ</span>
          </div>
        </div>

        {/* CENTER LOGO / BRANDING */}
        <div className="md:col-span-4 flex justify-center py-10 md:py-0">
           <div className="text-4xl font-black border-4 border-white p-4 tracking-tighter hover:bg-white hover:text-black transition-all cursor-default">
             GS
           </div>
        </div>

        {/* SOCIAL LINKS - RIGHT ALIGNED */}
        <div className="md:col-span-4 flex flex-col md:items-end gap-3">
          <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-4">Social Matrix</span>
          {["Instagram", "Behance", "Twitter", "Vimeo"].map((link) => (
            <motion.a
              key={link}
              href="#"
              whileHover={{ x: -10, color: "#b09476" }}
              className="text-sm uppercase tracking-[0.3em] font-black text-white/40 hover:text-white transition-all"
            >
              {link}
            </motion.a>
          ))}
        </div>
      </div>

      {/* 3. GIANT BACKGROUND GHOST TEXT */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full pointer-events-none select-none opacity-[0.02]">
        <h1 className="text-[25vw] font-black uppercase leading-none tracking-tighter text-center whitespace-nowrap">
          GRAY SHADE
        </h1>
      </div>

      {/* 4. FINAL UTILITY BAR */}
      <div className="relative z-10 mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-gray-600 font-bold">
        <div className="flex gap-10">
          <span className="text-[#b09476]">Studio Established 2026</span>
          <span>© All Rights Reserved</span>
        </div>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white transition-all">Privacy</a>
          <a href="#" className="hover:text-white transition-all">Terms</a>
          <a href="#" className="hover:text-white transition-all italic text-[#b09476]">India</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;