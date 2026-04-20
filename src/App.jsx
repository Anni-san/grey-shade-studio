import React, { useState } from 'react';
import Hero from './components/Hero';
import Perspective from './components/Perspective';
import SignatureCollection from './components/SignatureCollection';
import ServiceCanvas from './components/ServiceCanvas';
import Process from './components/Process';
import Footer from './components/Footer';
import ClientPortal from './components/ClientPortal';
import Appointment from './components/Appointment';
import AuthModal from './components/AuthModal';

function App() {
  // Global State Control
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Smart Routing Logic
  const handleBookNowClick = () => {
    if (isLoggedIn) {
      setIsBookingOpen(true); 
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

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    setIsBookingOpen(true); 
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
        <ClientPortal onSignOut={() => {
          setIsPortalOpen(false);
          setIsLoggedIn(false); 
        }} />
      ) : (
        <>
          {/* Notice there is NO <Navbar /> here! 
            The Hero component now handles its own internal navigation.
          */}
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