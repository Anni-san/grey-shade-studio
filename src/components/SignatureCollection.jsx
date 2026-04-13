import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  { id: "01", title: "Noir Portraiture", category: "Studio / Portrait", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974" },
  { id: "02", title: "Golden Hour", category: "Editorial / Fashion", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073" },
  { id: "03", title: "Shadow Play", category: "Cinematic / Film", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964" },
  { id: "04", title: "The Muse", category: "Art / Conceptual", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2037" },
];

const SignatureCollection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#020202]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* SECTION TITLE */}
        <div className="absolute top-20 left-12 z-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#b09476] font-bold block mb-2">Featured</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Signature Collection</h2>
        </div>

        {/* HORIZONTAL MOVING CONTAINER */}
        <motion.div style={{ x }} className="flex gap-20 px-12">
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              className="relative w-[500px] h-[650px] group flex-shrink-0 cursor-pointer"
              whileHover={{ y: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              {/* Background ID */}
              <span className="absolute -top-10 -left-10 text-[180px] font-black project-number z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {project.id}
              </span>

              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden border border-white/5 img-grain z-10">
                <motion.img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
                
                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-[#b09476] text-[10px] uppercase tracking-widest font-bold mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-black uppercase text-white tracking-tighter">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* PROGRESS BAR */}
        <div className="absolute bottom-20 left-12 right-12 h-[1px] bg-white/10 overflow-hidden">
          <motion.div 
            style={{ scaleX: scrollYProgress }} 
            className="h-full bg-[#b09476] origin-left"
          />
        </div>
      </div>
    </section>
  );
};

export default SignatureCollection;