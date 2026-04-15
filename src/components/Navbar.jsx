import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ onLoginClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[500] transition-all duration-500 px-8 md:px-12 py-6 flex justify-between items-center ${
        scrolled ? 'bg-[#020202]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      {/* Brand Logo */}
      <div className="text-white font-black text-xl uppercase tracking-[0.2em] cursor-pointer">
        Gray <span className="text-[#b09476]">Shade.</span>
      </div>

      {/* Client Login Button */}
      <button 
        onClick={onLoginClick}
        className="group relative px-6 py-2 overflow-hidden rounded-full border border-white/20 hover:border-white transition-colors duration-500"
      >
        <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
        <span className="relative z-10 text-[10px] uppercase tracking-widest font-bold text-white group-hover:text-black transition-colors duration-500">
          Client Portal
        </span>
      </button>
    </motion.nav>
  );
};

export default Navbar;