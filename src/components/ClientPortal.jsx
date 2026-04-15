import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Camera, Image as ImageIcon, Download, LogOut } from 'lucide-react';

// Mock Data - In reality, this comes from your Spring Boot API
const orderData = {
  id: "GS-8992-XD",
  clientName: "Arjun & Priya",
  shootType: "Editorial Wedding",
  date: "Oct 24, 2026",
  status: "RAW_SELECTION", // Change this to test different UI states!
  totalPhotos: 45,
};

const ClientPortal = () => {
  // Map backend enums to UI data
  const steps = [
    { id: "BOOKED", label: "Deposit Secured", icon: Clock },
    { id: "SHOOTING_COMPLETE", label: "Shoot Complete", icon: Camera },
    { id: "RAW_SELECTION", label: "Awaiting Your Selection", icon: ImageIcon },
    { id: "IN_EDITING", label: "Studio Editing", icon: CheckCircle },
    { id: "DELIVERED", label: "Gallery Ready", icon: Download },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === orderData.status);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#b09476] selection:text-white p-6 md:p-12">
      
      {/* PORTAL HEADER */}
      <header className="flex justify-between items-center pb-8 border-b border-white/10 mb-12">
        <div>
          <span className="text-[#b09476] text-[10px] tracking-[0.5em] uppercase font-bold block mb-2">Secure Gateway</span>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Portal.</h1>
        </div>
        <button className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">
          <LogOut size={14} />
          Sign Out
        </button>
      </header>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: ORDER DETAILS */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl">
            <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-6">Project Metadata</h2>
            
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

        {/* RIGHT COLUMN: THE STATE TRACKER */}
        <div className="lg:col-span-2">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-2xl h-full flex flex-col">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#b09476] font-bold mb-12">Project Telemetry</h2>
            
            {/* THE TIMELINE */}
            <div className="relative flex-1">
              {/* The Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/5 z-0" />
              
              <div className="space-y-12 relative z-10">
                {steps.map((step, index) => {
                  const isCompleted = index < currentStepIndex;
                  const isActive = index === currentStepIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.id} className={`flex gap-8 items-start transition-opacity duration-500 ${isCompleted || isActive ? 'opacity-100' : 'opacity-30'}`}>
                      {/* Node Circle */}
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

                      {/* Content */}
                      <div className="pt-2">
                        <h3 className={`text-xl md:text-3xl font-black uppercase tracking-tighter ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {step.label}
                        </h3>
                        
                        {/* DYNAMIC ACTIONS BASED ON STATE */}
                        {isActive && step.id === "RAW_SELECTION" && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed max-w-md">
                              The raw files are secured. Please select the {orderData.totalPhotos} images you wish to undergo our cinematic editing process.
                            </p>
                            <button className="bg-white text-black px-8 py-3 text-xs uppercase tracking-widest font-black hover:bg-[#b09476] hover:text-white transition-colors duration-300">
                              Enter Selection Room
                            </button>
                          </motion.div>
                        )}

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
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ClientPortal;