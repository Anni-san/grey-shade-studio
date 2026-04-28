import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { 
    id: "01", 
    title: "Editorial Portraiture", 
    desc: "High-fashion aesthetics for personal branding and magazines.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" 
  },
  
  { 
    id: "03", 
    title: "Architectural Shades", 
    desc: "Capturing the soul of structures through light and geometry.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
  }
];

const ServiceCanvas = () => {
  const [activeImg, setActiveImg] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#020202] py-32 px-12 overflow-hidden">
      {/* SECTION HEADER */}
      <div className="mb-24">
        <span className="text-[10px] uppercase tracking-[0.5em] text-[#b09476] font-bold block mb-4">Capabilities</span>
        <h2 className="text-5xl font-black uppercase tracking-tighter text-white">The Service Canvas</h2>
      </div>

      {/* SERVICE LIST */}
      <div className="relative z-10">
        {services.map((service, i) => (
          <motion.div 
            key={service.id}
            onMouseEnter={() => setActiveImg(service.img)}
            onMouseLeave={() => setActiveImg(null)}
            className="group border-b border-white/10 py-12 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer relative"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[#b09476] font-serif italic text-xl">{service.id}</span>
              <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white transition-all duration-500 group-hover:pl-8">
                {service.title}
              </h3>
            </div>

            <p className="max-w-xs text-gray-500 text-sm mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {service.desc}
            </p>

            {/* THE FLOATING IMAGE REVEAL */}
            <AnimatePresence>
              {activeImg === service.img && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  className="fixed pointer-events-none z-50 w-[350px] h-[450px] overflow-hidden rounded-xl border border-white/20 shadow-2xl"
                  style={{ 
                    left: mousePos.x + 20, 
                    top: mousePos.y - 200,
                  }}
                >
                  <img src={service.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="preview" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* DECORATIVE BACKGROUND TEXT */}
      <div className="absolute bottom-10 right-10 pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[250px] font-black uppercase leading-none">Services</h2>
      </div>
    </section>
  );
};

export default ServiceCanvas;