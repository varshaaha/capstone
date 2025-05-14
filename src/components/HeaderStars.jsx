import React, { useEffect, useRef } from 'react';

const HeaderStars = () => {
  const starsRef = useRef(null);

  useEffect(() => {
    const createStars = () => {
      const starsContainer = starsRef.current;
      const numberOfStars = 50; // Fewer stars for the header
      
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'header-star';
        
        // Random position within header
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Smaller size for header stars
        const size = Math.random() * 2 + 0.5;
        
        // Random animation delay
        const delay = Math.random() * 2;
        
        // Random brightness
        const brightness = Math.random() * 0.3 + 0.7;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        star.style.opacity = brightness;
        
        starsContainer.appendChild(star);
      }
    };

    createStars();
  }, []);

  return <div ref={starsRef} className="header-stars" />;
};

export default HeaderStars; 