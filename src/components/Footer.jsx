import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = ["Instagram", "Behance", "Twitter", "LinkedIn"];

  return (
    <footer className="relative bg-[#020202] pt-40 pb-10 px-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-end">
        
        {/* LEFT: CONTACT & TIME */}
        <div className="z-10">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#b09476] font-bold block mb-8">Get in Touch</span>
          <a 
            href="mailto:hello@grayshade.com" 
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white hover:text-[#b09476] transition-colors duration-500"
          >
            hello@grayshade.com
          </a>
          
          <div className="mt-20 flex gap-20 items-center">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-2">Studio Time</span>
              <span className="text-xl font-mono text-white/80">{time}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-2">Location</span>
              <span className="text-xl font-mono text-white/80">London, UK</span>
            </div>
          </div>
        </div>

        {/* RIGHT: SOCIALS */}
        <div className="flex flex-col items-end gap-6 z-10">
          {socialLinks.map((link) => (
            <motion.a
              key={link}
              href="#"
              whileHover={{ x: -20, color: "#b09476" }}
              className="text-xl uppercase tracking-[0.3em] font-bold text-gray-500 transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>
      </div>

      {/* GIANT BACKGROUND TEXT */}
      <div className="mt-40 pointer-events-none select-none">
        <h1 className="text-[15vw] font-black uppercase leading-none tracking-tighter text-white/[0.03] whitespace-nowrap translate-y-10">
          Gray Shade Studios
        </h1>
      </div>

      {/* BOTTOM BAR */}
      <div className="mt-10 pt-10 border-t border-white/5 flex justify-between items-center text-[9px] uppercase tracking-widest text-gray-600 font-bold">
        <span>© 2026 Gray Shade. All rights reserved.</span>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;