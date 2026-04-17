import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const Navbar = ({ onBookClick, onPortalClick, isLoggedIn }) => {
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
        scrolled ? 'bg-[#020202]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      {/* Brand Logo */}
      <div className="text-white font-black text-xl uppercase tracking-[0.2em] cursor-pointer shrink-0">
        Gray <span className="text-[#b09476]">Shade.</span>
      </div>

      {/* Center Links (Hidden on Mobile for now) */}
      <div className="hidden lg:flex items-center gap-10 text-[10px] uppercase tracking-widest font-bold text-white/50">
        <a href="#about" className="hover:text-white transition-colors">About Us</a>
        <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
        <a href="#videos" className="hover:text-white transition-colors">Videos</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
      </div>

      {/* Right Side Actions (No Overlap) */}
      <div className="flex items-center gap-6 shrink-0">
        
        {/* Book Now Button - Solid White */}
        <button 
          onClick={onBookClick}
          className="bg-white text-black px-6 py-2.5 text-[10px] uppercase tracking-widest font-black hover:bg-[#b09476] hover:text-white transition-colors duration-500"
        >
          Book Now
        </button>

        {/* Dynamic Portal/Profile Button */}
        <button 
          onClick={onPortalClick}
          className="group relative px-6 py-2.5 overflow-hidden rounded-full border border-white/20 hover:border-white transition-colors duration-500 flex items-center gap-2"
        >
          <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
          
          <span className="relative z-10 text-[10px] uppercase tracking-widest font-bold text-white group-hover:text-black transition-colors duration-500 flex items-center gap-2">
            {isLoggedIn ? (
              <> <User size={12} /> Dashboard </>
            ) : (
              "Client Portal"
            )}
          </span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;