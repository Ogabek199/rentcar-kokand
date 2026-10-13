import React from "react";
import "../../styles/floating-orbits.css";

const FloatingOrbits = () => {
  return (
    <div className="floating-orbits" aria-hidden="true">
      <div className="floating-orbits__orb floating-orbits__orb--1" />
      <div className="floating-orbits__orb floating-orbits__orb--2" />
      <div className="floating-orbits__orb floating-orbits__orb--3" />
      <div className="floating-orbits__orb floating-orbits__orb--4" />
      <div className="floating-orbits__orb floating-orbits__orb--5" />
      <div className="floating-orbits__ring" />
    </div>
  );
};

export default FloatingOrbits;
