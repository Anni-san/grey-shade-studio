import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader2 } from 'lucide-react';
import api from '../api'; // 1. IMPORT OUR WAITER

// 2. ADD onSuccess TO THE PROPS
const Appointment = ({ isOpen, onClose, onSuccess }) => {
  const [isHoveringImg, setIsHoveringImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    shootType: '',
    shootDate: '',
    shootTime: '',
    location: '',
    specialNotes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. UPDATED SUBMIT FUNCTION
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // We use our 'api' instance, so we don't need to manually fetch the token!
      const response = await api.post('/appointments/book', formData);

      if (response.status === 200) {
        // Reset the form
        setFormData({ shootType: '', shootDate: '', shootTime: '', location: '', specialNotes: '' });
        
        // Trigger the seamless transition to the Client Portal!
        if (onSuccess) onSuccess(); 
      }
    } catch (error) {
      console.error("Connection error:", error);
      if (error.response?.status === 403) {
        alert("Your session expired. Please log in again.");
      } else {
        alert("Booking failed: " + (error.response?.data?.message || "Ensure Spring Boot is running."));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        delayChildren: 0.3, 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-[#050505] text-white flex items-center justify-center overflow-hidden"
        >
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-[#050505] origin-top"
          />

          <button 
            onClick={onClose} 
            className="absolute top-8 right-8 hover:rotate-90 transition-transform duration-500 z-[1001] text-white/50 hover:text-white"
          >
            <X size={40} strokeWidth={1} />
          </button>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full px-8 md:px-16 z-10"
          >
            
            {/* LEFT: FORM */}
            <div className="flex flex-col justify-center">
              <motion.span variants={itemVariants} className="uppercase tracking-[0.4em] text-[10px] font-bold text-[#b09476] mb-4 block">
                Booking — Request
              </motion.span>
              
              <motion.h2 variants={itemVariants} className="text-6xl md:text-7xl font-black leading-[0.95] uppercase tracking-tighter mb-8">
                Capturing <br /> 
                your <span className="text-[#b09476] italic font-light">Priceless</span> <br /> 
                Emotions.
              </motion.h2>

              <form onSubmit={handleBookingSubmit} className="space-y-4 max-w-md">
                <motion.div variants={itemVariants}>
                  <input 
                    name="shootType"
                    required
                    placeholder="Shoot Type (e.g. Wedding, Portrait)" 
                    value={formData.shootType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-3 outline-none font-sans text-lg placeholder:text-white/20 focus:border-[#b09476] transition-colors" 
                  />
                </motion.div>
                
                <div className="flex gap-4">
                  <motion.div variants={itemVariants} className="flex-1">
                    <input 
                      name="shootDate"
                      type="date"
                      required
                      value={formData.shootDate}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/10 py-3 outline-none font-sans text-lg placeholder:text-white/20 focus:border-[#b09476] transition-colors [color-scheme:dark]" 
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex-1">
                    <input 
                      name="shootTime"
                      type="time"
                      required
                      value={formData.shootTime}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/10 py-3 outline-none font-sans text-lg placeholder:text-white/20 focus:border-[#b09476] transition-colors [color-scheme:dark]" 
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <input 
                    name="location"
                    required
                    placeholder="Location" 
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-3 outline-none font-sans text-lg placeholder:text-white/20 focus:border-[#b09476] transition-colors" 
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <textarea 
                    name="specialNotes"
                    placeholder="Special Notes" 
                    value={formData.specialNotes}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-3 outline-none font-sans text-lg placeholder:text-white/20 focus:border-[#b09476] transition-colors h-20 resize-none" 
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex gap-10 mt-8 items-center">
                  <motion.button 
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-32 h-32 rounded-full border border-white/20 flex flex-col items-center justify-center gap-2 transition-colors duration-500 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <span className="text-[9px] uppercase tracking-widest font-black">Book Now</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </motion.button>
                  
                  <p className="text-[10px] text-white/40 italic max-w-[150px] leading-relaxed uppercase tracking-wider">
                    "Why be ordinary when you can be extraordinary?"
                  </p>
                </motion.div>
              </form>
            </div>

            {/* RIGHT: IMAGE */}
            <motion.div 
              variants={itemVariants}
              className="relative h-[650px] w-full hidden lg:block"
              onMouseEnter={() => setIsHoveringImg(true)}
              onMouseLeave={() => setIsHoveringImg(false)}
            >
               <div className="absolute inset-0 border border-[#b09476]/20 rounded-[30px] translate-x-3 translate-y-3"></div>
               <motion.div 
                 className="w-full h-full overflow-hidden rounded-[30px] relative z-10 border border-white/10 shadow-2xl"
                 animate={{ scale: isHoveringImg ? 0.98 : 1 }}
               >
                 <motion.img 
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071" 
                  className="w-full h-full object-cover"
                  animate={{ 
                    filter: isHoveringImg ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.6)',
                  }}
                  transition={{ duration: 0.7 }}
                 />
                 <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${isHoveringImg ? 'opacity-0' : 'opacity-100'}`} />
               </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Appointment;