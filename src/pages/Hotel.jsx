import React, { useState, useRef } from "react";
import "../styles/Hotel.css";

export default function About() {
  const images = ["/Aboutimage1.jpg", "/Aboutimage2.jpg", "/Aboutimage3.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isThrottled = useRef(false); // Prevent fast scroll

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent page scroll

    if (isThrottled.current) return; // Skip if throttled
    isThrottled.current = true;

    setTimeout(() => {
      isThrottled.current = false;
    }, 700); // 700ms delay to prevent quick change

    // Scroll down
    if (e.deltaY > 0) {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? prev : prev + 1
      );
    } else {
      // Scroll up
      setCurrentImageIndex((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };

  const handleMouseEnter = () => {
    document.body.style.overflow = "hidden";
  };

  const handleMouseLeave = () => {
    document.body.style.overflow = "";
  };

  return (
    <section className="about-section">
      <h2 className="about-heading">
        Exceptional gastronomy <br /> served in elegant spaces.
      </h2>

      <div className="about-content-row">
        {/* Image Scroll Box */}
        <div
          className="about-image-box"
          onWheel={handleWheel}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={images[currentImageIndex]}
            alt="About"
            className="about-image"
          />
        </div>

        {/* Text */}
        <div className="about-text-box">
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
            Royal Phoenicia Hotel offers an array of top-tier facilities
            designed to enhance the comfort and convenience of every guest.
            The hotel features a luxurious spa and wellness center, where guests can
            indulge in soothing treatments and rejuvenating massages. For those
            seeking to maintain their fitness routine, the fully equipped gym
            provides a space for exercise, while the outdoor pool offers a
            relaxing environment to unwind. Dining at the hotel is a pleasure,
            with an on-site restaurant offering a diverse selection of cuisines
            in an elegant atmosphere. Additionally, the hotel provides business
            facilities, including meeting rooms and event spaces, ideal for
            corporate travelers. With its comprehensive range of services.
          </p>
        </div>
      </div>

      {/* Separator Line */}
      <div className="about-separator" />

      {/* Features Row */}
      <div className="about-features">
        <div className="feature-item">
          <div className="feature-icon" />
          <h4>Restaurant</h4>
          <p>
            Royal Phoenicia Hotel offers an array of top-tier facilities
            designed to enhance the comfort and convenience of every guest.
          </p>
        </div>
        <div className="feature-item">
          <div className="feature-icon" />
          <h4>Pool</h4>
          <p>
            Royal Phoenicia Hotel features multiple outdoor swimming pools,
            including a dedicated children's pool, offering relaxation for all
            guests.
          </p>
        </div>
        <div className="feature-item">
          <div className="feature-icon" />
          <h4>Room</h4>
          <p>
            Royal Phoenicia Hotel in Manama, Bahrain, offers a variety of
            spacious and well-equipped rooms to suit diverse guest preferences.
          </p>
        </div>
      </div>
    </section>
  );
}
