import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Perspective from './components/Perspective';
import SignatureCollection from './components/SignatureCollection';
import ServiceCanvas from './components/ServiceCanvas';
import Process from './components/Process';
import Footer from './components/Footer';
import ClientPortal from './components/ClientPortal';
import Appointment from './components/Appointment'; // Your Liquid Fill Booking Form
import AuthModal from './components/AuthModal';     // The new gatekeeper

function App() {
  // Global State Control
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // The Smart Routing Logic
  const handleBookNowClick = () => {
    if (isLoggedIn) {
      setIsBookingOpen(true); // Proceed straight to booking
    } else {
      setIsAuthModalOpen(true); // Stop them and ask to login
    }
  };

  const handlePortalClick = () => {
    if (isLoggedIn) {
      setIsPortalOpen(true); // Open Dashboard
    } else {
      setIsAuthModalOpen(true); // Force login to see dashboard
    }
  };

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    
    // Auto-direct them based on what they clicked to trigger the login
    // If they clicked "Book Now", open the booking form automatically!
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
          setIsLoggedIn(false); // Sign out wipes the state
        }} />
      ) : (
        <>
          {/* THE NAV - Now aware of login state */}
          <Navbar 
            onBookClick={handleBookNowClick} 
            onPortalClick={handlePortalClick}
            isLoggedIn={isLoggedIn} 
          />

          {/* THE PAGE CONTENT */}
          <Hero />
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