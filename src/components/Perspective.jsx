import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Perspective = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax shifts for the "Happening" feel
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, -400]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, 400]);
  const rotateImg = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Connective line logic - grows as you scroll
  const lineHeight = useTransform(scrollYProgress, [0.7, 1], ["0px", "300px"]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  // Hover Classes
  const solidToHollow = "cursor-default transition-all duration-700 text-white hover:text-transparent hover:[text-stroke:1px_white] hover:[-webkit-text-stroke:1px_white]";
  const hollowToSolid = "cursor-default transition-all duration-700 text-transparent [text-stroke:1px_white] [-webkit-text-stroke:1px_white] hover:text-white hover:[text-stroke:0px]";

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-[120vh] bg-[#020202] flex flex-col justify-center items-center overflow-hidden py-40 select-none"
    >
      {/* 1. DYNAMIC SPOTLIGHT - The "Shadow" Interaction */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000 opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(176, 148, 118, 0.15), transparent 80%)`
        }}
      />

      {/* 2. FLOATING ART CARDS - Adds visual weight */}
      <motion.div 
        style={{ y: xLeft, rotate: rotateImg }}
        className="absolute top-1/4 left-10 w-64 h-80 opacity-20 grayscale border border-white/10 overflow-hidden rounded-sm"
      >
        <img src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2058" className="w-full h-full object-cover" alt="Art 1" />
      </motion.div>

      <motion.div 
        style={{ y: xRight, rotate: -rotateImg }}
        className="absolute bottom-1/4 right-10 w-72 h-96 opacity-20 grayscale border border-white/10 overflow-hidden rounded-sm"
      >
        <img src="https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=2070" className="w-full h-full object-cover" alt="Art 2" />
      </motion.div>

      {/* 3. MAIN CONTENT */}
      <motion.div style={{ opacity }} className="z-10 text-center px-12">
        <motion.div style={{ x: xLeft }} className="mb-6">
          <h2 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter ${solidToHollow}`}>
            Philosophy of
          </h2>
        </motion.div>

        <div className="my-20 relative">
          <div className="absolute left-1/2 -top-10 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-[#b09476] to-transparent" />
          
          <h3 className="text-3xl md:text-5xl font-serif italic text-[#b09476] max-w-4xl mx-auto leading-tight px-4">
            "We don't just take photographs. <br /> 
            <span className="text-white not-italic font-sans font-bold text-sm tracking-[0.4em] uppercase block mt-6 opacity-40">
              We curate the silence
            </span>
            between the shadows and the light."
          </h3>
          
          <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-[#b09476] to-transparent" />
        </div>

        <motion.div style={{ x: xRight }}>
          <h2 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter ${hollowToSolid}`}>
            Visual Legacy
          </h2>
        </motion.div>
      </motion.div>

      {/* 4. BACKGROUND EST. MARK */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]"
      >
        <h2 className="text-[500px] font-black italic tracking-tighter select-none">
          GS.26
        </h2>
      </motion.div>

      {/* 5. INTERACTIVE CTA HOVER & DYNAMIC CONNECTIVE LINE */}
      <div className="relative mt-32 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col items-center gap-6 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white transition-all duration-500">
            <div className="w-1 h-1 bg-white group-hover:bg-black rounded-full" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gray-500 group-hover:text-white transition-colors">
            Discovery Process
          </span>
        </motion.div>

        {/* This line bridges the gap to the Signature Collection */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute top-full mt-10 w-[1px] bg-gradient-to-b from-[#b09476] via-[#b09476]/50 to-transparent origin-top"
        />
      </div>
    </section>
  );
};

export default Perspective;