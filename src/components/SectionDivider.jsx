// SectionDivider.jsx
import React from 'react';
import '../styles/SectionDivider.css';


export default function SectionDivider({ roman = "I" }) {
  return (
    <div className="center-wrapper">
      <div className="center-roman-symbol">
        <span>{roman}</span>
      </div>
    </div>
  );
}
