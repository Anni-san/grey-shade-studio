import React from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Menu } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center px-12 md:px-24">
      
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-12 py-8 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-gray-500"></div>
          </div>
          <span className="font-bold tracking-tight text-xl font-sans">Sourabh's Studio</span>
        </div>
        
        <div className="flex items-center gap-10 text-sm font-medium text-gray-300 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition">About Us</a>
          <a href="#" className="hover:text-white transition">Contact Us</a>
          <a href="#" className="hover:text-white transition">Portfolio</a>
          <a href="#" className="hover:text-white transition">Videos</a>
          <a href="#" className="btn-outline-gold text-white">Book Now</a>
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center z-10">
        
        {/* Left Side: Typography */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md"
        >
          <h1 className="text-7xl md:text-8xl font-black leading-none mb-6 font-sans">
            Photography <br /> Studio
          </h1>
          
          <h3 className="text-2xl font-bold mb-4">Who we are?</h3>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam urna amet 
            faucibus tortor amet proin. Eget bibendum elit nisi ridiculus massa ridiculus. 
            Posuere semper posuere nam.
          </p>

          <button className="btn-outline-gold">
            Read more about us
          </button>

          {/* Social Icons */}
          {/* Social Icons - Clean SVGs to fix Lucide Error */}
<div className="flex gap-6 mt-12 text-gray-400">
  {/* Facebook */}
  <svg className="w-5 h-5 hover:text-white cursor-pointer transition fill-current" viewBox="0 0 24 24">
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
  </svg>
  {/* Instagram/Pinterest Circle */}
  <svg className="w-5 h-5 hover:text-white cursor-pointer transition fill-current" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
  {/* Twitter/X */}
  <svg className="w-5 h-5 hover:text-white cursor-pointer transition fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
</div>
        </motion.div>

        {/* Right Side: Circular Image Composition */}
        <div className="relative flex justify-center items-center h-full">
          {/* Large Ring in Background */}
          <div className="circle-bg opacity-50 scale-110"></div>
          
          {/* Main Subject Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 w-[450px] h-[550px] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" 
              alt="Subject" 
              className="w-full h-full object-cover filter grayscale"
            />
            {/* Dark Gradient over image bottom to blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </motion.div>

          {/* Image Counter (02/03) */}
          <div className="absolute right-0 top-1/2 translate-x-12 -translate-y-1/2 flex items-center gap-2">
             <span className="text-5xl font-light">02</span>
             <span className="text-gray-600 text-xl font-bold">/03</span>
          </div>
        </div>

      </div>

      {/* Floating Scroll Indicator (Optional, but adds to the look) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-[1px] h-12 bg-white"></div>
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </div>

    </div>
  );
};

export default Hero;