import React, { useEffect, useState } from "react";
import '../styles/Gastro.css';


const images = ["/pool1.jpg", "/pool2.jpg", "/pool3.jpg"];

export default function FacilitySlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="facility-slider">
      <img src={images[index]} alt="Slider" className="slider-img" />

      <div className="facility-box">
        <div className="layer layer-1"></div>
        <div className="layer layer-2"></div>

        <div className="layer layer-3">
          <div className="facility-content">
            <div className="facility-item">Favorite hotel</div>
            <div className="facility-item">Business and Event Spaces</div>
            <div className="facility-item">Diverse Dining Options</div>
            <div className="facility-item">Multiple Swimming Pools</div>
            <div className="facility-item">Family-Friendly Amenities</div>
          </div>
        </div>
      </div>
    </div>
  );
}
