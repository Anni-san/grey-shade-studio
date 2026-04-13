import React from 'react';
import Hero from './components/Hero';
import Perspective from './components/Perspective';
import SignatureCollection from './components/SignatureCollection';
import ServiceCanvas from './components/ServiceCanvas';
import Process from './components/Process';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-[#020202] w-full selection:bg-[#b09476] selection:text-white">
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
    </main>
  );
}

export default App;