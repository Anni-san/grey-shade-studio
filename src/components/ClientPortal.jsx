import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Camera, Image as ImageIcon, Download, LogOut, ChevronLeft, Check } from 'lucide-react';

// Mock Data - Simulating Spring Boot API Payload
const orderData = {
  id: "GS-8992-XD",
  clientName: "Arjun & Priya",
  shootType: "Editorial Wedding",
  date: "Oct 24, 2026",
  totalPhotos: 4, // Set to 4 for this demo
};

// Mock Raw Images from the Photographer
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
  const [currentStatus, setCurrentStatus] = useState("RAW_SELECTION");
  const [isSelectionRoom, setIsSelectionRoom] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  // Map backend enums to UI data
  const steps = [
    { id: "BOOKED", label: "Deposit Secured", icon: Clock },
    { id: "SHOOTING_COMPLETE", label: "Shoot Complete", icon: Camera },
    { id: "RAW_SELECTION", label: "Awaiting Your Selection", icon: ImageIcon },
    { id: "IN_EDITING", label: "Studio Editing", icon: CheckCircle },
    { id: "DELIVERED", label: "Gallery Ready", icon: Download },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStatus);

  // Handle Photo Selection Logic
  const togglePhoto = (index) => {
    setSelectedPhotos(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Submit Logic - Transitions the State Machine
  const submitSelection = () => {
    if (selectedPhotos.length > 0) {
      setIsSelectionRoom(false);
      setCurrentStatus("IN_EDITING"); // Advances the timeline automatically
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#b09476] selection:text-white p-6 md:p-12">
      
      {/* PORTAL HEADER */}
      <header className="flex justify-between items-center pb-8 border-b border-white/10 mb-12">
        <div>
          <span className="text-[#b09476] text-[10px] tracking-[0.5em] uppercase font-bold block mb-2">Secure Gateway</span>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Portal.</h1>
        </div>
        <button 
          onClick={onSignOut}
          className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: ORDER DETAILS */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl sticky top-8">
            <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-8">Project Metadata</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Order ID</p>
                <p className="font-mono text-lg">{orderData.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Client</p>
                <p className="text-xl font-bold uppercase tracking-tighter">{orderData.clientName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Aesthetic</p>
                <p className="text-[#b09476]">{orderData.shootType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Shoot Date</p>
                <p>{orderData.date}</p>
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
                      <span className={`text-xl font-mono font-bold ${selectedPhotos.length > orderData.totalPhotos ? 'text-red-500' : 'text-[#b09476]'}`}>
                        {selectedPhotos.length} / {orderData.totalPhotos}
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
                        const isCompleted = index < currentStepIndex;
                        const isActive = index === currentStepIndex;
                        const Icon = step.icon;

                        return (
                          <div key={step.id} className={`flex gap-8 items-start transition-opacity duration-500 ${isCompleted || isActive ? 'opacity-100' : 'opacity-30'}`}>
                            
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
                              
                              {/* ACTION: RAW SELECTION */}
                              {isActive && step.id === "RAW_SELECTION" && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                                  <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-md">
                                    The raw files are secured. Please select the {orderData.totalPhotos} images you wish to undergo our cinematic editing process.
                                  </p>
                                  <button 
                                    onClick={() => setIsSelectionRoom(true)}
                                    className="bg-white text-black px-8 py-3 text-xs uppercase tracking-widest font-black hover:bg-[#b09476] hover:text-white transition-colors duration-300"
                                  >
                                    Enter Selection Room
                                  </button>
                                </motion.div>
                              )}

                              {/* ACTION: DELIVERED */}
                              {isActive && step.id === "DELIVERED" && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                                  <button className="border border-[#b09476] text-[#b09476] px-8 py-3 text-xs uppercase tracking-widest font-black hover:bg-[#b09476] hover:text-white transition-colors duration-300">
                                    Download 4K Gallery
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
    </div>
  );
};

export default ClientPortal;