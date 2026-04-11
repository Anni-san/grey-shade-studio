import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Facebook, Instagram, Youtube } from 'lucide-react';

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
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
      
      {/* Right Panel Image Slider (Takes up 60% of width) */}
      <div className="absolute top-0 right-0 w-[60%] h-full z-0">
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
        {/* Very subtle dark overlay so white outline text always stays readable */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Floating Navbar (Z-50) */}
      <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-12 py-8 text-white">
        
        {/* Premium Logo Layout */}
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold tracking-tighter">G</div>
          <div className="w-[1px] h-10 bg-gray-500"></div>
          <div className="flex flex-col justify-center">
            <span className="text-lg font-bold leading-none tracking-wide mb-1">Gray Shade Studios</span>
            <span className="text-[0.6rem] tracking-[0.25em] text-gray-400 uppercase">Beyond Monochrome</span>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-12">
          <ul className="flex gap-8 text-sm font-medium tracking-wide">
            <li className="cursor-pointer hover:text-gray-300 transition">Home</li>
            <li className="cursor-pointer hover:text-gray-300 transition">About</li>
            <li className="cursor-pointer hover:text-gray-300 transition">Blogs</li>
            <li className="cursor-pointer hover:text-gray-300 transition">Contact Us</li>
            <li className="cursor-pointer hover:text-gray-300 transition flex items-center gap-1">
              Portfolio <ChevronDown size={16} />
            </li>
          </ul>
          <Search className="cursor-pointer hover:text-gray-300 transition" size={20} />
        </div>
      </nav>

      {/* Main Overlapping Typography (Z-10) */}
      {/* pointer-events-none ensures the text doesn't block you from interacting with the image underneath */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[8%] z-10 w-full pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Using massive text sizes to recreate the overlap effect */}
          <h1 className="text-[8rem] font-bold leading-[1.05] tracking-tight text-white whitespace-nowrap">
            Gray <span className="text-outline font-normal ml-4">Shade</span><br />
            <span className="text-outline font-normal">Studios</span>
          </h1>
        </motion.div>
      </div>

      {/* Bottom Left Content: Tagline & Socials (Z-20) */}
      <div className="absolute bottom-12 left-[8%] z-20">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-10 h-[2px] bg-white"></div>
          <p className="uppercase tracking-widest text-sm font-bold text-white">
            Capturing Masterpiece
          </p>
        </div>
        
        <div className="flex gap-6 text-gray-400">
          <Facebook size={20} className="hover:text-white cursor-pointer transition" />
          <Instagram size={20} className="hover:text-white cursor-pointer transition" />
          <Youtube size={20} className="hover:text-white cursor-pointer transition" />
        </div>
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