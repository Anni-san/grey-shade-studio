import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram } from 'lucide-react';

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
          <div className="flex gap-6 mt-12 text-gray-400">
            <Facebook size={20} className="hover:text-white cursor-pointer transition" />
            <Instagram size={20} className="hover:text-white cursor-pointer transition" />
            <Twitter size={20} className="hover:text-white cursor-pointer transition" />
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