import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');

  const handleSimulatedLogin = (e) => {
    e.preventDefault();
    // Simulate API call to Spring Boot
    setTimeout(() => {
      onSuccess(); // Triggers the login state and automatically opens booking
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#0a0a0a] border border-white/10 p-10 md:p-16 rounded-2xl w-full max-w-md relative shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X size={24} strokeWidth={1} />
            </button>

            <span className="text-[#b09476] text-[10px] tracking-[0.4em] uppercase font-bold block mb-4">
              Authentication
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">
              Identify Yourself.
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Create an account or log in to secure your booking and access the Client Portal.
            </p>

            <form onSubmit={handleSimulatedLogin} className="space-y-6">
              <div>
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-white placeholder:text-white/20 focus:border-[#b09476] transition-colors"
                />
              </div>
              <div>
                <input 
                  type="password" 
                  required
                  placeholder="Password" 
                  className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-white placeholder:text-white/20 focus:border-[#b09476] transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-black py-4 uppercase tracking-widest text-xs font-black hover:bg-[#b09476] hover:text-white transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Continue <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;