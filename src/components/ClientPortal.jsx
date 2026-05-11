import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Camera, Image as ImageIcon, Download, LogOut, ChevronLeft, Check, Loader2 } from 'lucide-react';
import api from '../api'; // IMPORT OUR NEW WAITER HERE

// Mock Raw Images (We will keep these until we build the AWS S3 Image Storage backend!)
const rawImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070",
  "https://images.unsplash.com/photo-1511285605581-2287c10b2405?q=80&w=2069",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070"
];

const ClientPortal = ({ onSignOut }) => {
  // Application State
  const [appointments, setAppointments] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // UI State
  const [isSelectionRoom, setIsSelectionRoom] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  // Fetch Data from Spring Boot when component loads
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // THE MAGIC: We use our 'api' waiter. It automatically attaches the JWT token!
        // Changed to fetch ONLY the logged-in user's bookings
        const response = await api.get('/appointments/my-bookings');
        
        setAppointments(response.data);
        
        // If they have bookings, default to showing the first one
        if (response.data.length > 0) {
          setActiveOrder(response.data[0]); 
        }
      } catch (err) {
        if (err.response?.status === 403) {
           setError("Access Denied. You do not have privileges.");
        } else {
           setError("Cannot connect to server. Is Spring Boot running?");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Map Backend Enums to UI Steps
  const steps = [
    { id: "PENDING_PAYMENT", label: "Awaiting Deposit", icon: Clock },
    { id: "CONFIRMED", label: "Shoot Confirmed", icon: Camera },
    { id: "SHOOT_COMPLETED", label: "Raw Selection", icon: ImageIcon },
    { id: "IN_EDITING", label: "Studio Editing", icon: CheckCircle },
    { id: "DELIVERED", label: "Gallery Ready", icon: Download },
  ];

  // Find where the active order is on the timeline
  const currentStepIndex = activeOrder ? steps.findIndex(s => s.id === activeOrder.status) : 0;

  // Handle Photo Selection Logic
  const togglePhoto = (index) => {
    setSelectedPhotos(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Submit Logic
  const submitSelection = () => {
    if (selectedPhotos.length > 0) {
      setIsSelectionRoom(false);
      setActiveOrder(prev => ({ ...prev, status: "IN_EDITING" })); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    onSignOut();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-[#b09476]">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Decrypting Vault...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#b09476] selection:text-white p-6 md:p-12">
      
      {/* PORTAL HEADER */}
      <header className="flex justify-between items-center pb-8 border-b border-white/10 mb-12">
        <div>
          <span className="text-[#b09476] text-[10px] tracking-[0.5em] uppercase font-bold block mb-2">Secure Gateway</span>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Portal.</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </header>

      {error && <div className="text-red-500 text-center mb-8">{error}</div>}

      {/* If no bookings exist */}
      {!activeOrder && !error && (
        <div className="text-center py-20 border border-white/5 rounded-2xl bg-[#0a0a0a]">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-white/50 mb-2">No Active Projects</h2>
          <p className="text-gray-500">Return to the main site to book a new photoshoot.</p>
        </div>
      )}

      {/* Main Dashboard - Only shows if they have a booking */}
      {activeOrder && (
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: DYNAMIC DATABASE DETAILS */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl sticky top-8">
              <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-8">Project Metadata</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Order ID</p>
                  <p className="font-mono text-lg text-white/80">GS-{(activeOrder.id * 8992).toString().padStart(4, '0')}-XD</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Client Contact</p>
                  <p className="text-sm font-mono text-[#b09476]">{activeOrder.user?.email || "Authenticated User"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Aesthetic</p>
                  <p className="text-xl font-bold uppercase tracking-tighter">{activeOrder.shootType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-white/80">{activeOrder.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Shoot Date & Time</p>
                  <p className="text-white/80">{activeOrder.shootDate} @ {activeOrder.shootTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Quoted Price</p>
                  <p className="text-2xl font-light text-white">${activeOrder.quotedPrice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DYNAMIC VIEW (Timeline OR Selection Room) */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-2xl h-full flex flex-col relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {/* VIEW 1: THE SELECTION ROOM */}
                {isSelectionRoom ? (
                  <motion.div 
                    key="selection"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="w-full"
                  >
                    <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                      <div>
                        <button 
                          onClick={() => setIsSelectionRoom(false)}
                          className="flex items-center gap-2 text-gray-500 hover:text-white text-[10px] uppercase tracking-widest font-bold mb-6 transition-colors"
                        >
                          <ChevronLeft size={14} /> Back to Telemetry
                        </button>
                        <h2 className="text-2xl font-black uppercase tracking-tighter">Raw Selection</h2>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 block">Selected</span>
                        <span className={`text-xl font-mono font-bold ${selectedPhotos.length > 4 ? 'text-red-500' : 'text-[#b09476]'}`}>
                          {selectedPhotos.length} / 4
                        </span>
                      </div>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-24">
                      {rawImages.map((img, idx) => {
                        const isSelected = selectedPhotos.includes(idx);
                        return (
                          <div 
                            key={idx}
                            onClick={() => togglePhoto(idx)}
                            className={`relative aspect-[4/5] cursor-pointer group rounded-lg overflow-hidden border-2 transition-all duration-300 ${isSelected ? 'border-[#b09476] p-1' : 'border-transparent'}`}
                          >
                            <img 
                              src={img} 
                              alt={`Raw ${idx}`} 
                              className={`w-full h-full object-cover rounded-md transition-all duration-500 ${isSelected ? 'opacity-100' : 'opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}
                            />
                            {/* Checkbox UI */}
                            <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-[#b09476] border-[#b09476]' : 'border-white/50 bg-black/20 backdrop-blur-sm'}`}>
                              {isSelected && <Check size={14} className="text-black" strokeWidth={3} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Sticky Action Bar */}
                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent flex justify-end">
                      <button 
                        onClick={submitSelection}
                        disabled={selectedPhotos.length === 0}
                        className={`px-8 py-4 text-xs uppercase tracking-widest font-black transition-all duration-500 ${
                          selectedPhotos.length > 0 
                            ? 'bg-[#b09476] text-black hover:bg-white' 
                            : 'bg-white/5 text-white/20 cursor-not-allowed'
                        }`}
                      >
                        Confirm Selection & Send to Studio
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  
                  /* VIEW 2: THE TELEMETRY TIMELINE */
                  <motion.div 
                    key="timeline"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="w-full"
                  >
                    <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#b09476] font-bold mb-12">Project Telemetry</h2>
                    
                    <div className="relative flex-1">
                      <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/5 z-0" />
                      
                      <div className="space-y-12 relative z-10">
                        {steps.map((step, index) => {
                          const isCompleted = index <= currentStepIndex;
                          const isActive = index === currentStepIndex;
                          const Icon = step.icon;

                          return (
                            <div key={step.id} className={`flex gap-8 items-start transition-opacity duration-500 ${isCompleted ? 'opacity-100' : 'opacity-30'}`}>
                              
                              <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 bg-[#0a0a0a] transition-colors duration-500
                                ${isActive ? 'border-[#b09476] text-[#b09476] shadow-[0_0_30px_rgba(176,148,118,0.2)]' : 
                                  isCompleted ? 'border-white text-white' : 'border-white/20 text-gray-600'}`}
                              >
                                <Icon size={20} />
                                {isActive && (
                                  <motion.div 
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 rounded-full border border-[#b09476]"
                                  />
                                )}
                              </div>

                              <div className="pt-2">
                                <h3 className={`text-xl md:text-3xl font-black uppercase tracking-tighter ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                  {step.label}
                                </h3>
                                
                                {/* ACTION: PENDING PAYMENT */}
                                {isActive && step.id === "PENDING_PAYMENT" && (
                                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                                    <p className="text-gray-400 text-sm mb-4 leading-relaxed max-w-md">
                                      Your booking is logged. To confirm your date on the calendar, a deposit is required.
                                    </p>
                                    <button className="bg-white text-black px-6 py-2 text-[10px] uppercase tracking-widest font-black hover:bg-[#b09476] hover:text-white transition-colors duration-300">
                                      Pay Deposit (Coming Soon)
                                    </button>
                                  </motion.div>
                                )}

                                {/* ACTION: RAW SELECTION */}
                                {isActive && step.id === "SHOOT_COMPLETED" && (
                                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-md">
                                      The raw files are secured. Please select the images you wish to undergo our cinematic editing process.
                                    </p>
                                    <button 
                                      onClick={() => setIsSelectionRoom(true)}
                                      className="bg-white text-black px-8 py-3 text-xs uppercase tracking-widest font-black hover:bg-[#b09476] hover:text-white transition-colors duration-300"
                                    >
                                      Enter Selection Room
                                    </button>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default ClientPortal;