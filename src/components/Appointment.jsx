import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const Appointment = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 150 }}
      className="fixed inset-0 z-[1000] bg-[#f2f0ef] grainy-paper text-[#1a1817] p-8 md:p-20 overflow-y-auto"
    >
      <button 
        onClick={onClose} 
        className="absolute top-10 right-10 hover:rotate-90 transition-transform duration-300 z-[1001]"
      >
        <X size={40} strokeWidth={1} />
      </button>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center min-h-full">
        <div className="relative z-10">
          <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-gray-400 mb-10 block font-sans">Booking — Request</span>
          
          <h2 className="text-7xl md:text-9xl font-serif-premium leading-[0.9] mb-12">
            Capturing <br /> your <span className="text-[#b09476] italic">Priceless</span> <br /> Emotions.
          </h2>

          <div className="space-y-8 max-w-md">
            <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-gray-300 py-4 outline-none font-serif-premium text-2xl placeholder:text-gray-300" />
            <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-gray-300 py-4 outline-none font-serif-premium text-2xl placeholder:text-gray-300" />
            
            <div className="flex gap-10 mt-16 items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="w-44 h-44 rounded-full bg-[#1a1817] text-white flex flex-col items-center justify-center gap-3 shadow-2xl"
              >
                <span className="text-xs uppercase tracking-widest font-bold">Book Now</span>
                <ArrowRight size={20} />
              </motion.button>
              <p className="text-sm text-gray-500 italic max-w-[200px] font-serif-premium">
                "Why be ordinary when you can be extraordinary?"
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-[600px] w-full hidden lg:block">
           <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071" 
            className="w-full h-full object-cover rounded-[60px] grayscale"
            style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}
           />
        </div>
      </div>
    </motion.div>
  );
};

export default Appointment;