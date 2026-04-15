import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Perspective from './components/Perspective';
import SignatureCollection from './components/SignatureCollection';
import ServiceCanvas from './components/ServiceCanvas';
import Process from './components/Process';
import Footer from './components/Footer';
import ClientPortal from './components/ClientPortal';

function App() {
  // State to control which view we are in
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  return (
    <main className="bg-[#020202] w-full min-h-screen selection:bg-[#b09476] selection:text-white">
      
      {/* CONDITIONAL RENDERING: If portal is open, show portal. Else, show storefront. */}
      {isPortalOpen ? (
        <ClientPortal onSignOut={() => setIsPortalOpen(false)} />
      ) : (
        <>
          {/* THE INVISIBLE NAV */}
          <Navbar onLoginClick={() => setIsPortalOpen(true)} />

          {/* 01. THE HOOK */}
          <Hero />
          
          {/* 02. THE SOUL */}
          <Perspective />
          
          {/* 03. THE WORK (Horizontal Scroll) */}
          <SignatureCollection />
          
          {/* 04. THE CAPABILITIES */}
          <ServiceCanvas />
          
          {/* 05. THE JOURNEY (Atmospheric Hover Reveal) */}
          <Process />

          {/* 06. THE FINALE */}
          <Footer />
        </>
      )}
    </main>
  );
}

export default App;