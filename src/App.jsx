import React from 'react';
import Hero from './components/Hero';
import Perspective from './components/Perspective';
import SignatureCollection from './components/SignatureCollection';
import ServiceCanvas from './components/ServiceCanvas'; // Import it here

function App() {
  return (
    <main className="bg-[#020202] w-full min-h-screen">
      <Hero />
      <Perspective />
      
      {/* This creates the horizontal scroll area */}
      <SignatureCollection />
      
      {/* This creates the hover-reveal services area */}
      <ServiceCanvas />

      {/* Final Spacer for breathing room */}
      <div className="h-[20vh] bg-[#020202]" />
    </main>
  );
}

export default App;