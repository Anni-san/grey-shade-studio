import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

// Cinematic placeholder images (Wedding, Portrait, Studio, product)
const sliderImages = [
  { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop", caption: "Capturing a once-in-a-lifetime moment." }, 
  { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop", caption: "Timeless portraiture for the modern muse." }, 
  { url: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?q=80&w=1976&auto=format&fit=crop", caption: "Integrated studio design for your unique vision." },
  { url: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1974&auto=format&fit=crop", caption: "Integrated cinematic grades for your unique vision." },
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // 3-second Image Loop Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden font-sans">
      
      {/* Textured Black Background Shape on the left (Takes up 45% of width) */}
      <div className="absolute top-0 left-0 w-[45%] h-full z-0 bg-[#0c0c0c] border-r border-gray-900 flex flex-col justify-end p-20 pb-32">
        {/* Subtle, textured blend area near the edge */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-0 opacity-50"></div>
        {/* Dynamic texture and blending overlays */}
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/dark-linen.png')] opacity-30"></div>
        
        {/* Large, transparent integrated logo shape */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-48 text-[20rem] font-black text-gray-950/40 select-none z-0 tracking-tighter">G</div>

        {/* Dynamic Subtitle that changes with each image */}
        <motion.div
            key={currentImage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="z-10"
        >
            <p className="text-gray-600 text-sm tracking-[0.2em] font-medium leading-loose max-w-sm mb-6 uppercase">
              Beyond Monochrome
            </p>
            <div className="w-12 h-[2px] bg-white mb-6"></div>
            <p className="text-xl font-bold tracking-widest text-white leading-snug">
              {sliderImages[currentImage].caption}
            </p>
        </motion.div>

      </div>

      {/* Right Panel Image Slider (Takes up 60% of width) */}
      <div className="absolute top-0 right-0 w-[60%] h-full z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={sliderImages[currentImage].url}
            alt="Studio Showcase"
            initial={{ opacity: 0, scale: 1.1 }} // Stronger Ken Burns start
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover origin-center"
          />
        </AnimatePresence>
        {/* Subtle cinematic vignette and grader over image panel */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] opacity-70"></div>
        
        {/* A semi-transparent black overlay blending shape to merge with dark left panel */}
        <div className="absolute top-0 -left-16 w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 opacity-60"></div>
      </div>

      {/* Floating Glass Navbar (Z-50) */}
      {/* Repositioned to float centrally and use glassmorphism */}
      <div className="absolute top-10 w-full z-50 flex justify-center items-center">
        <nav className="glass-nav flex justify-between items-center px-12 py-6 text-white w-[90%] max-w-7xl">
            
            {/* Premium Integrated Logo Layout */}
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold tracking-tighter text-white font-heading">G</div>
              <div className="w-[1px] h-10 bg-gray-500"></div>
              <div className="flex flex-col justify-center">
                <span className="text-lg font-bold leading-none tracking-wide mb-1 font-heading text-white">Gray Shade Studios</span>
                <span className="text-[0.6rem] tracking-[0.25em] text-gray-400 uppercase">Beyond Monochrome</span>
              </div>
            </div>
            
            {/* Custom Interactive Navigation Links */}
            <div className="flex items-center gap-12">
              <ul className="flex gap-8 text-sm font-medium tracking-wide font-sans text-white">
                <li className="cursor-pointer hover:text-white transition"><a href="#">Home</a></li>
                <li className="cursor-pointer hover:text-white transition"><a href="#">About</a></li>
                <li className="cursor-pointer hover:text-white transition"><a href="#">Blogs</a></li>
                <li className="cursor-pointer hover:text-white transition"><a href="#">Contact Us</a></li>
                <li className="cursor-pointer hover:text-white transition flex items-center gap-1">
                  Portfolio <ChevronDown size={16} />
                </li>
              </ul>
              <Search className="cursor-pointer hover:text-gray-300 transition" size={20} />
            </div>
        </nav>
      </div>

      {/* Main Overlapping Typography (Z-10) */}
      {/* Massive scaling and strong indent to recreate the premium aesthetic */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[8%] z-10 w-full pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Enhanced heading text with glowing outlines and new fill blend on Gray */}
          <h1 className="text-[9rem] font-bold leading-[0.95] tracking-tight text-white whitespace-nowrap font-heading">
            {/* Subtly transparent fill blending on Gray, integrated with image panel colors */}
            <span className="text-white/80 fill-current opacity-80 backdrop-blur-[1px] -mb-4 inline-block">Gray</span>
            <span className="text-outline font-normal ml-6 inline-block">Shade</span><br />
            <span className="text-outline font-normal inline-block">Studios</span>
          </h1>
        </motion.div>
      </div>

      {/* Floating WhatsApp Button (Z-50) */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noreferrer"
        className="absolute bottom-10 right-10 bg-[#25D366] hover:bg-[#1ebd5a] text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 z-50"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.098.824z" />
        </svg>
      </a>

    </div>
  );
};

export default Hero;