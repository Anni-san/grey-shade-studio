import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Perspective from './components/Perspective';
import SignatureCollection from './components/SignatureCollection';
import ServiceCanvas from './components/ServiceCanvas';
import Process from './components/Process';
import Footer from './components/Footer';
import ClientPortal from './components/ClientPortal';
import AdminDashboard from './components/AdminDashboard'; // IMPORT OUR NEW ADMIN VAULT
import Appointment from './components/Appointment';
import AuthModal from './components/AuthModal';

function App() {
  // Global State Control
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'ADMIN' or 'CLIENT'
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Check browser memory on startup so you stay logged in after refreshing
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('userRole');
    
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  // Smart Routing Logic
  const handleBookNowClick = () => {
    if (isLoggedIn) {
      if (userRole === 'ADMIN') {
        setIsPortalOpen(true); // Admins don't book shoots, send them to the vault!
      } else {
        setIsBookingOpen(true); 
      }
    } else {
      setIsAuthModalOpen(true); 
    }
  };

  const handlePortalClick = () => {
    if (isLoggedIn) {
      setIsPortalOpen(true); 
    } else {
      setIsAuthModalOpen(true); 
    }
  };

  // THE TRAFFIC COP: Figures out who you are when you log in
  const handleSuccessfulLogin = (userEmail) => {
    const assignedRole = userEmail === 'admin@grayshade.com' ? 'ADMIN' : 'CLIENT';
    
    localStorage.setItem('userRole', assignedRole); // Remember the role in the browser
    setUserRole(assignedRole);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    
    if (assignedRole === 'ADMIN') {
      setIsPortalOpen(true); // Admin goes straight to the Vault
    } else {
      setIsBookingOpen(true); // Client goes to the booking modal
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole'); // Wipe the memory clean
    setIsLoggedIn(false);
    setUserRole(null);
    setIsPortalOpen(false);
    setIsBookingOpen(false);
  };

  return (
    <main className="bg-[#020202] w-full min-h-screen selection:bg-[#b09476] selection:text-white">
      
      {/* OVERLAYS (Modals) */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleSuccessfulLogin} 
      />
      
      <Appointment 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

      {/* CONDITIONAL RENDERING FOR MAIN VIEW */}
      {isPortalOpen ? (
        
        // THE SPLIT: Are we showing the Admin Vault or the Client Portal?
        userRole === 'ADMIN' ? (
          <AdminDashboard onSignOut={handleSignOut} />
        ) : (
          <ClientPortal onSignOut={handleSignOut} />
        )

      ) : (
        <>
          {/* Landing Page Components */}
          <Hero 
            onBookClick={handleBookNowClick} 
            onPortalClick={handlePortalClick} 
            isLoggedIn={isLoggedIn} 
          />
          
          <Perspective />
          <SignatureCollection />
          <ServiceCanvas />
          <Process />
          <Footer />
        </>
      )}
    </main>
  );
}

export default App;