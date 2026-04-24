import React from 'react';
import { LogOut } from 'lucide-react';

export default function AdminDashboard({ onSignOut }) {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center font-sans">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-[#b09476] mb-4">
                Admin Vault
            </h1>
            <p className="text-gray-500 mb-8 uppercase tracking-widest text-xs">
                Welcome, Studio Master. Full dashboard coming soon.
            </p>
            
            <button 
                onClick={onSignOut}
                className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-colors text-xs uppercase tracking-widest font-bold"
            >
                <LogOut size={16} />
                Sign Out
            </button>
        </div>
    );
}