import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sliderData = [
  { id: "01", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" },
  { id: "02", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974" },
  { id: "03", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964" }
];

// Added props to connect to the Auth flow in App.jsx
const Hero = ({ onBookClick, onPortalClick, isLoggedIn }) => {
  const [index, setIndex] = useState(0);
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
    const timer = setInterval(() => setIndex((p) => (p === 2 ? 0 : p + 1)), 5000);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  const brandWordClass = "cursor-default transition-all duration-500 text-white hover:text-transparent hover:[text-stroke:1px_white] hover:[-webkit-text-stroke:1px_white]";

  return (
    <div className="relative w-full h-screen bg-[#020202] flex items-center px-8 md:px-24 overflow-hidden select-none font-sans">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="custom-cursor hidden md:block" 
        style={{ width: '40px', height: '40px', marginTop: '-20px', marginLeft: '-20px' }}
      ></div>

      {/* Radial Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(176, 148, 118, 0.05) 0%, transparent 40%)` }}
      />

      {/* NAV - Updated with Portal Button and wired to App.jsx logic */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-12 py-10 z-50">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-2xl font-black border-2 border-white w-10 h-10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">G</div>
          <div className="flex flex-col leading-none tracking-[0.2em] uppercase">
            <span className="font-bold text-sm text-white">Gray Shade</span>
            <span className="text-[9px] text-gray-500">Studios</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
          {['About Us', 'Contact Us', 'Portfolio', 'Videos'].map(item => (
            <a key={item} href="#" className="hover:text-white transition-all">{item}</a>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={onBookClick}
              className="bg-white text-black px-8 py-2 font-black border border-white hover:bg-transparent hover:text-white transition-all"
            >
              Book Now
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={onPortalClick}
              className="bg-transparent text-white px-6 py-2 font-black border border-white/30 hover:border-white transition-all"
            >
              {isLoggedIn ? "Dashboard" : "Client Portal"}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT - Completely untouched */}
      <div className="flex justify-between w-full items-center z-10">
        
        <div className="relative max-w-4xl shrink-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-[120px] font-black leading-[0.85] uppercase tracking-tighter mb-10">
              <span className={brandWordClass}>Gray Shade</span> <br />
              <span className={brandWordClass}>Studios</span>
            </h1>
          </motion.div>
          
          <div className="max-w-sm ml-2">
            <div className="h-[2px] w-12 bg-[#b09476] mb-6" />
            <h3 className="text-white font-bold mb-4 tracking-widest uppercase text-xs">Aesthetica</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 font-light">
              We translate human emotion into a visual legacy. 
              Every frame is a curated masterpiece, etched in light and shadow.
            </p>
          </div>
        </div>

        <div className="relative flex justify-center items-center shrink-0 pr-12">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, x: 30 }}
                animate={{ opacity: 0.25, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.1, x: -30 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="flex items-baseline text-transparent [text-stroke:1px_rgba(255,255,255,0.5)] [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]"
              >
                <span className="text-[320px] font-black italic leading-none tracking-tighter">
                  {sliderData[index].id}
                </span>
                <span className="text-3xl font-bold ml-4 text-white opacity-40">/03</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute w-[620px] h-[620px] border border-white/[0.03] rounded-full" />
          
          
            <AnimatePresence mode="wait">
              <motion.img 
                key={index} 
                src={sliderData[index].img} 
                initial={{ opacity: 0, scale: 1.1 }} 
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  filter: isHoveringImage ? 'grayscale(0%)' : 'grayscale(100%) brightness(0.7)' 
                }} 
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className={`absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 transition-opacity duration-500 ${isHoveringImage ? 'opacity-0' : 'opacity-100'}`} />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="relative w-[1px] h-24 bg-white/20 overflow-hidden">
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