import React, { useEffect, useState } from 'react';
import '../styles/Home.css';


export default function Hero() {
  const images = ['/bg1.jpg', '/bg2.jpg']; // images inside public/
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1.05);

  // Handle auto-switching background images
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handle zoom-in on scroll (minimal)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1.05 + scrollY / 2000;
      setScale(newScale > 1.12 ? 1.12 : newScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${images[index]})`,
        transform: `scale(${scale})`
      }}
    >
      <div className="hero-overlay">
        <div className="hero-text">
          <h1 className="hero-title">Hotel</h1>
          <h1 className="hero-title">Royal Phoenicia</h1>
          <h3 className="hero-subtitle">Your favourite place. Our family story.</h3>
        </div>
      </div>
    </section>
  );
}
