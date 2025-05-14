import React, { useEffect, useRef } from 'react';

const Stars = () => {
  const starsRef = useRef(null);

  useEffect(() => {
    const createStars = () => {
      const starsContainer = starsRef.current;
      const numberOfStars = 300;
      
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size between 1 and 4 pixels
        const size = Math.random() * 3 + 1;
        
        // Random animation delay
        const delay = Math.random() * 3;
        
        // Random brightness
        const brightness = Math.random() * 0.5 + 0.5;
        
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

  return <div ref={starsRef} className="stars" />;
};

export default Stars; 