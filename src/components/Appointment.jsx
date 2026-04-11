import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const Appointment = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] grainy-bg flex flex-col p-8 md:p-16 overflow-y-auto text-premium-dark"
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-2 hover:bg-black/5 rounded-full transition"
      >
        <X size={32} />
      </button>

      {/* Header Section from your 2nd image */}
      <div className="max-w-6xl mx-auto w-full pt-12">
        <span className="uppercase tracking-[0.3em] text-xs font-semibold text-gray-500 mb-8 block">
          Appointment — 01
        </span>
        
        <h2 className="text-6xl md:text-8xl serif-text leading-tight mb-12">
          Capturing <br /> 
          your <span className="text-premium-gold italic">Priceless</span> <br /> 
          Emotions.
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
              Grab the opportunity to capture memories that you will treasure for a lifetime. 
              Why be ordinary when you can be extraordinary?
            </p>
            
            {/* Form Fields */}
            <div className="space-y-6">
              <div className="border-b border-gray-300 pb-2">
                <input type="text" placeholder="Your Name" className="bg-transparent w-full outline-none text-xl serif-text placeholder:text-gray-300" />
              </div>
              <div className="border-b border-gray-300 pb-2">
                <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none text-xl serif-text placeholder:text-gray-300" />
              </div>
              <div className="border-b border-gray-300 pb-2">
                <select className="bg-transparent w-full outline-none text-xl serif-text text-gray-400">
                  <option>Select Shoot Type</option>
                  <option>Portrait</option>
                  <option>Wedding</option>
                  <option>Commercial</option>
                </select>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 bg-premium-dark text-white rounded-full w-40 h-40 flex flex-col items-center justify-center gap-2 group shadow-2xl"
            >
              <span className="font-semibold text-sm">Book Now</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>

          {/* Right Side Image (The one with the curve from your sample) */}
          <div className="relative h-[500px] w-full hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" 
              alt="Photographer"
              className="w-full h-full object-cover rounded-[40px] shadow-2xl"
              style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }} // Subtle organic tilt
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Appointment;