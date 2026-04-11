import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Appointment from './Appointment';

const sliderData = [
  { id: "01", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" },
  { id: "02", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974" },
  { id: "03", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964" }
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const timer = setInterval(() => {
      setIndex((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#020202] flex items-center px-8 md:px-24 overflow-hidden select-none">
      {/* Custom Cursor - Size Increased to 40px */}
      <div 
        ref={cursorRef} 
        className="custom-cursor hidden md:block" 
        style={{ width: '40px', height: '40px', marginTop: '-20px', marginLeft: '-20px' }}
      ></div>

      <Appointment isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Dynamic Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(176, 148, 118, 0.07) 0%, transparent 40%)`
        }}
      />

      {/* NAV */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-12 py-10 z-50">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="text-2xl font-black border-2 border-white w-10 h-10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">G</div>
          <div className="flex flex-col leading-none tracking-[0.2em] uppercase">
            <span className="font-bold text-sm text-white">Gray Shade</span>
            <span className="text-[9px] text-gray-500">Studios</span>
          </div>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
          {['About Us', 'Contact Us', 'Portfolio', 'Videos'].map(item => (
            <a key={item} href="#" className="hover:text-white transition-all hover:tracking-[0.5em]">{item}</a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsBookingOpen(true)}
            className="bg-white text-black px-8 py-2 font-black border border-white hover:bg-transparent hover:text-white transition-all duration-300"
          >
            Book Now
          </motion.button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex justify-between w-full items-center z-10">
        <div className="relative max-w-3xl shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[110px] font-black leading-[0.85] uppercase tracking-tighter mb-10 text-white hover:italic transition-all duration-700 cursor-default animate-shimmer">
              Gray Shade <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-500 to-white/30">Studios</span>
            </h1>
          </motion.div>
          
          <div className="max-w-sm ml-2">
            <motion.div initial={{ width: 0 }} animate={{ width: "3rem" }} className="h-[2px] bg-[#b09476] mb-6" />
            <h3 className="text-white font-bold mb-4 tracking-widest uppercase text-xs">Aesthetica</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 font-light">
              We translate human emotion into a visual legacy. 
              Every frame is a curated masterpiece, etched in light and shadow.
            </p>
            <button className="group text-[10px] font-bold tracking-[0.4em] uppercase flex items-center gap-4">
              <span className="group-hover:text-[#b09476] transition-colors">Read more about us</span>
              <div className="w-10 h-[1px] bg-gray-700 group-hover:w-20 group-hover:bg-[#b09476] transition-all duration-500"></div>
            </button>
          </div>
        </div>

        {/* IMAGE COMPOSITION - Shifted Right */}
        <div className="relative flex justify-center items-center shrink-0 pr-12">
          {/* Static Glass Rings */}
          <div className="absolute w-[620px] h-[620px] border border-white/[0.03] rounded-full" />
          <div className="absolute w-[530px] h-[530px] border-[2px] border-white/[0.05] rounded-full backdrop-blur-sm" />
          
          {/* Floating Counter - Positioned to be "overlooked" by image */}
          <div className="absolute right-[-40px] flex items-baseline z-0 opacity-40">
            <motion.span 
              key={index} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
              className="text-[160px] font-thin tracking-tighter italic text-white"
            >
              {sliderData[index].id}
            </motion.span>
            <span className="text-gray-700 text-2xl font-bold ml-2">/03</span>
          </div>

          {/* Main Image - Interaction Trigger (Z-10 to overlook counter) */}
          <motion.div 
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
            className="relative z-10 w-[500px] h-[500px] overflow-hidden rounded-full border-[1px] border-white/10 shadow-[0_0_80px_rgba(0,0,0,1)] cursor-pointer"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={index} src={sliderData[index].img} 
                initial={{ opacity: 0, scale: 1.1 }} 
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  filter: isHoveringImage ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.8)' 
                }} 
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className={`absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 transition-opacity duration-500 ${isHoveringImage ? 'opacity-0' : 'opacity-100'}`} />
          </motion.div>
        </div>
      </div>

      {/* --- REFINED SCROLL --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="relative w-[1px] h-24 bg-white/10 overflow-hidden">
          <motion.div 
            animate={{ y: [0, 96] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/3 bg-white"
          />
        </div>
        <span className="text-[8px] uppercase tracking-[0.8em] font-black text-gray-500">Explore</span>
      </div>
    </div>
  );
};

export default Hero;