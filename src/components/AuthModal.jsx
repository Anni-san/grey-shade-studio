import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader2 } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  // State for the form inputs
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  // State for UX
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Clear old errors

    // Decide which URL to hit based on the mode
    const endpoint = isLoginMode 
      ? "http://localhost:8080/api/auth/login" 
      : "http://localhost:8080/api/auth/register";

    // Build the payload
    const payload = isLoginMode 
      ? { email, password } 
      : { fullName, email, password, phone };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        
        // THE MAGIC: Save the VIP Pass to the browser!
        localStorage.setItem("jwtToken", data.token); 
        
        // Trigger the parent component to close modal/open booking
        onSuccess(); 
        
        // Reset form
        setEmail('');
        setPassword('');
        setFullName('');
        setPhone('');
      } else {
        // If Spring Boot throws a 403 Forbidden or 400 Bad Request
        setErrorMessage(isLoginMode ? "Invalid email or password." : "Registration failed. Email might already exist.");
      }
    } catch (error) {
      console.error("Server connection failed:", error);
      setErrorMessage("Cannot connect to server. Is Spring Boot running?");
    } finally {
      setIsLoading(false);
    }
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
            className="bg-[#0a0a0a] border border-white/10 p-10 md:p-12 rounded-2xl w-full max-w-md relative shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X size={24} strokeWidth={1} />
            </button>

            <span className="text-[#b09476] text-[10px] tracking-[0.4em] uppercase font-bold block mb-4">
              {isLoginMode ? "Authentication" : "New Client"}
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">
              {isLoginMode ? "Identify Yourself." : "Join the Vault."}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {isLoginMode 
                ? "Log in to secure your booking and access the Client Portal."
                : "Create your profile to book shoots and receive your final galleries."}
            </p>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Extra fields only show if registering */}
              {!isLoginMode && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <input 
                    type="text" 
                    required
                    placeholder="Full Name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-white placeholder:text-white/20 focus:border-[#b09476] transition-colors mb-5"
                  />
                  <input 
                    type="tel" 
                    required
                    placeholder="Phone Number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-white placeholder:text-white/20 focus:border-[#b09476] transition-colors"
                  />
                </motion.div>
              )}

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-white placeholder:text-white/20 focus:border-[#b09476] transition-colors"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black py-4 uppercase tracking-widest text-xs font-black hover:bg-[#b09476] hover:text-white transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : (isLoginMode ? "Log In" : "Register")} 
                {!isLoading && <ArrowRight size={16} />}
              </button>
            </form>

            {/* Toggle Mode Button */}
            <div className="mt-6 text-center">
              <button 
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setErrorMessage(''); // Clear errors on switch
                }}
                className="text-white/40 hover:text-white text-xs tracking-wider uppercase transition-colors"
              >
                {isLoginMode ? "Don't have an account? Register" : "Already have an account? Log In"}
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;