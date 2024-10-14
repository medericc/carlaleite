"use client";
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const statsData = [
  { label: 'Wins', value: 12 },
  { label: 'Losses', value: 4 },
  { label: 'Draws', value: 0 },
  { label: 'KO', value: 8 },
  { label: 'Points', value: 1500 },
  { label: 'Trophies', value: 5 },
  { label: 'Matches', value: 300 },
  { label: 'Streak', value: 10 },
];

const Stats = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * index;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const width = containerRef.current.clientWidth;
        const newIndex = Math.round(scrollLeft / width);
        setCurrentIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative h-screen w-full  text-white overflow-hidden ">
      {/* Texte animé en fond */}
    
      <div className="absolute top-[-15%] left-0 whitespace-nowrap z-1 text-[25rem] opacity-10 uppercase font-bold text-white animate-scrollText ">
        STATISTICS STATISTICS STATISTICS
      </div>

      {/* Scroll horizontal manuel */}
      <div
        className="absolute top-[25%] left-0 right-0 z-10 flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
        ref={containerRef}
        style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
      >
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="min-w-full p-8 flex justify-center items-center snap-center"
            style={{ minWidth: '100%' }}
          >
           <motion.div
  className="bg-black-2 p-8 rounded-lg shadow-lg"
  style={{
    width: '100%',
    height: '25.75rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem',
    padding: '3rem 2.375rem',
    boxSizing: 'inherit',
  }}
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h2 className="text-center text-2xl font-bold uppercase">
    Glory Record
  </h2>
  <div className="grid grid-cols-2 gap-6 text-center">
    <span className="block text-4xl font-bold">{stat.value}</span>
    <span className="block text-xl">{stat.label}</span>
  </div>
</motion.div>

          </div>
        ))}
      </div>

      {/* Dots pour indiquer la position */}
      <div className="absolute bottom-40 w-full flex justify-center z-20">
  <div className="flex space-x-2">
    {statsData.map((_, index) => (
      <div
        key={index}
        className={`h-2 w-2 rounded-full ${
          currentIndex === index ? 'bg-white' : 'bg-gray-500'
        } cursor-pointer`}
        onClick={() => handleDotClick(index)}
      />
    ))}
  </div>
</div>

    </div>
  );
};

// Ajouter les keyframes pour l'animation du texte défilant
const keyframesStyle = `
  @keyframes scrollText {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  .animate-scrollText {
    animation: scrollText 60s linear infinite;
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = keyframesStyle;
  document.head.appendChild(style);
}

export default Stats;
