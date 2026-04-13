import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Perspective = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Moves the text horizontally as you scroll
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-[#020202] flex flex-col justify-center items-center overflow-hidden py-40"
    >
      {/* Background Parallax Number */}
      <motion.div 
        style={{ opacity: 0.03, scale: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <h2 className="text-[600px] font-black italic">EST. 2026</h2>
      </motion.div>

      <motion.div style={{ opacity }} className="z-10 text-center px-12">
        <motion.div style={{ x: xLeft }} className="mb-4">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
            Philosophy of
          </h2>
        </motion.div>

        <div className="my-12">
          <h3 className="text-2xl md:text-3xl font-serif italic text-[#b09476] max-w-2xl mx-auto leading-relaxed">
            "We don't just take photographs. We curate the silence between the shadows and the light."
          </h3>
        </div>

        <motion.div style={{ x: xRight }}>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-transparent [text-stroke:1px_white] [-webkit-text-stroke:1px_white]">
            Visual Legacy
          </h2>
        </motion.div>
      </motion.div>

      {/* Decorative Line */}
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: "150px" }}
        className="absolute left-1/2 bottom-0 w-[1px] bg-gradient-to-b from-[#b09476] to-transparent"
      />
    </section>
  );
};

export default Perspective;