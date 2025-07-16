import React from 'react';
import '../styles/FooterSection.css';

export default function FooterSection() {
  return (
    <section className="footer-wrapper">
      {/* Left */}
      <div className="footer-left">
        <div className="numerals">
          <div className="numeral">I</div>
          <div className="numeral">II</div>
          <div className="numeral">III</div>
          <div className="numeral">IV</div>
          <div className="numeral">V</div>
        </div>
        <div className="labels">
          <div className="label">Rooms</div>
          <div className="label">Wellness</div>
          <div className="label">Gastro</div>
          <div className="label">Hotel</div>
          <div className="label">Events</div>
        </div>
      </div>

      {/* Middle */}
      <div className="footer-middle">
        <h2>More about rooms</h2>
        <ul>
          <li>120 comfortable rooms</li>
          <li>Dining</li>
          <li>Packages</li>
          <li>Pools</li>
        </ul>
      </div>

      {/* Right Box */}
      <div className="footer-right-box">
        <div className="logo-circle">ROYAL</div>
        <h3>Wellness & Pools</h3>
        <h2>Hotel Royal Phoenicia</h2>
        <address>
          Building 1288<br />
          Road 3931, Block 339<br />
          Umm Al Hasam – Manama<br />
          Bahrain
        </address>
        <p>+973 1730 7307</p>
        <p>info@royalphoeniciahotel.com</p>
        <p>Contacts →</p>
        <div className="socials">
          <span>🌐</span>
          <span>📘</span>
          <span>📷</span>
        </div>
      </div>
    </section>
  );
}
