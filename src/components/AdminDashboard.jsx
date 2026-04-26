import React, { useState, useEffect } from 'react';
import { LogOut, RefreshCw, Loader2, Calendar } from 'lucide-react';
import api from '../api'; // Bring in our waiter!

export default function AdminDashboard({ onSignOut }) {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch all bookings from the master database
    const fetchAllBookings = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await api.get('/admin/all-bookings');
            setBookings(response.data);
        } catch (err) {
            if (err.response?.status === 403) {
                setError("Access Denied: You are not authorized to view the Vault.");
            } else {
                setError("Cannot connect to server. Is Spring Boot running?");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Run this the second the dashboard opens
    useEffect(() => {
        fetchAllBookings();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userRole");
        onSignOut();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#b09476] selection:text-white p-6 md:p-12">
            
            {/* VAULT HEADER */}
            <header className="flex justify-between items-center pb-8 border-b border-white/10 mb-8">
                <div>
                    <span className="text-red-900 text-[10px] tracking-[0.5em] uppercase font-bold block mb-2">Master Override</span>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Admin Vault.</h1>
                </div>
                <div className="flex items-center gap-6">
                    <button 
                        onClick={fetchAllBookings}
                        className="flex items-center gap-2 text-gray-500 hover:text-[#b09476] transition-colors text-xs uppercase tracking-widest font-bold"
                    >
                        <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                        Refresh Data
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-900/50 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold rounded"
                    >
                        <LogOut size={14} />
                        Lock Vault
                    </button>
                </div>
            </header>

            {/* ERROR HANDLING */}
            {error && (
                <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 text-red-400 text-sm font-mono text-center rounded-lg">
                    {error}
                </div>
            )}

            {/* LOADING STATE */}
            {isLoading && !error ? (
                <div className="flex flex-col items-center justify-center py-20 text-[#b09476]">
                    <Loader2 className="animate-spin mb-4" size={32} />
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Accessing Database...</p>
                </div>
            ) : (
                /* THE MASTER DATABASE TABLE */
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                    
                    {bookings.length === 0 && !error ? (
                        <div className="text-center py-20">
                            <Calendar className="mx-auto text-white/10 mb-4" size={48} />
                            <h2 className="text-xl font-bold uppercase tracking-widest text-white/50 mb-2">Database Empty</h2>
                            <p className="text-gray-600 text-sm">No clients have booked photoshoots yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-gray-500 border-b border-white/10">
                                        <th className="p-6 font-bold">Order ID</th>
                                        <th className="p-6 font-bold">Client Name</th>
                                        <th className="p-6 font-bold">Shoot Details</th>
                                        <th className="p-6 font-bold">Date & Time</th>
                                        <th className="p-6 font-bold">Quote</th>
                                        <th className="p-6 font-bold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            
                                            <td className="p-6 font-mono text-gray-400">
                                                GS-{(booking.id * 8992).toString().padStart(4, '0')}
                                            </td>
                                            
                                            <td className="p-6">
                                                <div className="font-bold text-white group-hover:text-[#b09476] transition-colors">
                                                    {booking.user?.fullName || "Unknown Client"}
                                                </div>
                                                <div className="text-xs font-mono text-gray-500 mt-1">
                                                    {booking.user?.email || "No Email"}
                                                </div>
                                            </td>
                                            
                                            <td className="p-6">
                                                <div className="font-bold uppercase tracking-tighter text-white/80">{booking.shootType}</div>
                                                <div className="text-xs text-gray-500 mt-1">{booking.location}</div>
                                            </td>
                                            
                                            <td className="p-6 text-gray-400">
                                                <div className="text-white/80">{booking.shootDate}</div>
                                                <div className="text-xs mt-1 font-mono">{booking.shootTime}</div>
                                            </td>
                                            
                                            <td className="p-6 font-mono text-white/80">
                                                ${booking.quotedPrice}
                                            </td>
                                            
                                            <td className="p-6">
                                                <span className={`px-3 py-1 text-[9px] uppercase tracking-widest font-bold rounded-full border ${
                                                    booking.status === 'PENDING_PAYMENT' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10' :
                                                    booking.status === 'CONFIRMED' ? 'border-blue-500/30 text-blue-500 bg-blue-500/10' :
                                                    booking.status === 'SHOOT_COMPLETED' ? 'border-purple-500/30 text-purple-500 bg-purple-500/10' :
                                                    booking.status === 'IN_EDITING' ? 'border-orange-500/30 text-orange-500 bg-orange-500/10' :
                                                    'border-green-500/30 text-green-500 bg-green-500/10'
                                                }`}>
                                                    {booking.status.replace('_', ' ')}
                                                </span>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}