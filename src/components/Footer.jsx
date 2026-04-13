import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      // Set to Indian Standard Time (IST)
      const options = { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      };
      setTime(new Intl.DateTimeFormat('en-IN', options).format(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "Behance", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" }
  ];

  return (
    <footer className="relative bg-[#020202] pt-60 pb-10 px-8 md:px-20 overflow-hidden border-t border-white/5 font-sans">
      
      {/* 1. CENTERED CALL TO ACTION */}
      <div className="relative z-10 text-center mb-40">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[10px] uppercase tracking-[0.6em] text-[#b09476] font-bold block mb-10"
        >
          Have a vision? Let's etch it.
        </motion.span>
        
        <motion.a 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          href="mailto:hello@grayshade.in" 
          className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white hover:text-transparent hover:[text-stroke:1px_#b09476] hover:[-webkit-text-stroke:1px_#b09476] transition-all duration-700 block"
        >
          Connect@GrayShade.in
        </motion.a>
      </div>

      {/* 2. INFO GRID */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 items-start z-10 relative border-t border-white/10 pt-20">
        
        {/* LOCAL TIME & REGION */}
        <div className="space-y-8">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-3 font-bold">Studio Time (IST)</span>
            <span className="text-2xl font-black text-white italic">{time}</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-3 font-bold">Base of Operations</span>
            <span className="text-xl text-white font-medium uppercase tracking-tighter">New Delhi, India</span>
          </div>
        </div>

        {/* SOCIAL LINKS (MAGNETIC STYLE) */}
        <div className="flex flex-col gap-4">
          <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-3 font-bold">Digital Footprint</span>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ y: -5, color: "#b09476" }}
                className="text-sm uppercase tracking-widest font-black text-white/40 flex items-center gap-2 group"
              >
                <div className="w-1 h-1 bg-[#b09476] rounded-full scale-0 group-hover:scale-100 transition-transform" />
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>

        {/* NEWSLETTER / SMALL DESC */}
        <div className="md:text-right">
          <p className="text-xs text-gray-500 leading-relaxed max-w-[250px] md:ml-auto uppercase tracking-tighter">
            Architecting visual legacies through the precision of light and the depth of shadows.
          </p>
        </div>
      </div>

      {/* 3. THE GIANT MONOLITH TEXT */}
      <div className="mt-32 pointer-events-none select-none">
        <h1 className="text-[20vw] font-black uppercase leading-none tracking-tighter text-white/[0.02] whitespace-nowrap -translate-x-10">
          Gray Shade
        </h1>
      </div>

      {/* 4. LEGAL BAR */}
      <div className="mt-10 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] text-gray-600 font-bold">
        <span>© 2026 Gray Shade Studios. Etched in India.</span>
        <div className="flex gap-12">
          <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-all">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;