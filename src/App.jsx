import React from 'react';
import Hero from './components/Hero';
import Perspective from './components/Perspective';
// import SignatureCollection from './components/SignatureCollection'; (Next step)

function App() {
  return (
    <main className="bg-[#020202]">
      <Hero />
      <Perspective />
      {/* <SignatureCollection /> */}
    </main>
  );
}

export default App;