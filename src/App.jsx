import React from 'react';
import Hero from './components/Hero';
import Perspective from './components/Perspective';
import SignatureCollection from './components/SignatureCollection';

function App() {
  return (
    <div className="bg-[#020202]">
      <Hero />
      <Perspective />
      {/* This section needs room to breathe for the scroll to trigger */}
      <SignatureCollection />
      
      {/* Spacer to allow the end of the scroll to be felt */}
      <div className="h-screen bg-[#020202]" />
    </div>
  );
}

export default App;