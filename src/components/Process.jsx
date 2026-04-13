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
    <section className="relative min-h-screen bg-[#020202] flex items-center px-12 md:px-24 overflow-hidden">
      {/* Background Image Reveal */}
      <AnimatePresence>
        {hoveredStep !== null && (
          <motion.div
            key={hoveredStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={steps[hoveredStep].bg} 
              className="w-full h-full object-cover grayscale scale-110" 
              alt="bg"
            />
            <div className="absolute inset-0 bg-[#020202]/60" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full">
        <span className="text-[10px] uppercase tracking-[0.5em] text-[#b09476] font-bold block mb-12">How we work</span>
        
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              className="group cursor-pointer max-w-4xl"
            >
              <div className="flex items-start gap-8">
                <span className="text-xl font-mono text-[#b09476] mt-2 opacity-50">{step.id}</span>
                <div>
                  <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white transition-all duration-500 group-hover:text-[#b09476]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-gray-500 text-lg max-w-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;