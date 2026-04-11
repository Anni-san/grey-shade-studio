import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

const sliderImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?q=80&w=1976&auto=format&fit=crop"  
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen flex bg-dark overflow-hidden">
      
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-12 py-6 text-white">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 border-2 border-white flex items-center justify-center font-bold text-xl">G</div>
          <div className="leading-tight">
            <span className="block font-bold">Gray Shade</span>
            <span className="block text-xs text-gray-400">Studios</span>
          </div>
        </div>
        
        <ul className="flex gap-8 text-sm uppercase tracking-wider font-medium">
          <li className="cursor-pointer hover:text-dark-accent transition">Home</li>
          <li className="cursor-pointer hover:text-dark-accent transition">About</li>
          <li className="cursor-pointer hover:text-dark-accent transition">Blogs</li>
          <li className="cursor-pointer hover:text-dark-accent transition">Contact Us</li>
          <li className="cursor-pointer hover:text-dark-accent transition flex items-center gap-1">
            Portfolio <ChevronDown size={16} />
          </li>
        </ul>
        
        <Search className="cursor-pointer hover:text-dark-accent transition" size={20} />
      </nav>

      {/* Left Panel Typography */}
      <div className="w-[45%] h-full flex flex-col justify-center px-16 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-7xl font-bold leading-[1.1] tracking-wide text-white">
            Gray <br />
            <span className="text-outline">Shade</span> <br />
            <span className="text-outline">Studios</span>
          </h1>
          
          <div className="mt-12 flex items-center gap-4">
            <div className="w-8 h-[1px] bg-dark-accent"></div>
            <p className="uppercase tracking-widest text-sm font-semibold text-white">
              Capturing Masterpiece
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel Image Slider */}
      <div className="w-[55%] h-full relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={sliderImages[currentImage]}
            alt="Studio Showcase"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark to-transparent"></div>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noreferrer"
        className="absolute bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 z-50"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.098.824z" />
        </svg>
      </a>

    </div>
  );
};

export default Hero;