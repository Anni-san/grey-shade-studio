import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { 
    id: "01", 
    title: "Concept Refinement", 
    desc: "Defining the mood, lighting, and narrative arc of the shoot.",
    bg: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2058"
  },
  { 
    id: "02", 
    title: "The Execution", 
    desc: "Precision handling of light and shadow in a high-stakes environment.",
    bg: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1974"
  },
  { 
    id: "03", 
    title: "Digital Mastery", 
    desc: "Non-destructive color grading to achieve the signature Gray Shade look.",
    bg: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070"
  }
];

const Process = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <section className="relative min-h-screen bg-[#020202] flex items-center px-12 md:px-24 overflow-hidden py-40 border-t border-white/5">
      {/* Background Image Reveal - Boosted Visibility & Focus Effect */}
      <AnimatePresence>
        {hoveredStep !== null && (
          <motion.div
            key={hoveredStep}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            animate={{ opacity: 0.45, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={steps[hoveredStep].bg} 
              className="w-full h-full object-cover grayscale" 
              alt="bg"
            />
            {/* Darker Vignette for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full">
        <motion.span 
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-[0.5em] text-[#b09476] font-bold block mb-16"
        >
          How we work
        </motion.span>
        
        <div className="space-y-20">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              className="group cursor-pointer max-w-5xl"
            >
              <div className="flex items-start gap-10">
                <span className="text-2xl font-mono text-[#b09476] mt-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  {step.id}
                </span>
                <div className="relative">
                  <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white transition-all duration-700 group-hover:text-[#b09476] group-hover:translate-x-4">
                    {step.title}
                  </h3>
                  
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredStep === index ? "auto" : 0,
                      opacity: hoveredStep === index ? 1 : 0 
                    }}
                    className="overflow-hidden"
                  >
                    <p className="mt-6 text-white/70 text-xl max-w-xl leading-relaxed font-light pl-4 border-l-2 border-[#b09476]/30">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side "Process" Vertical Text to fill empty right space */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <h2 className="text-[140px] font-black uppercase vertical-text opacity-[0.03] text-white rotate-90 origin-center tracking-widest">
          Methodology
        </h2>
      </div>
    </section>
  );
};

export default Process;