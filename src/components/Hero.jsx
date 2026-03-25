import React from "react";
import "./Hero.css";

const Hero = () => {
  const aliens = [
    { src: "/images/alien1.png", name: "Alien 1" },
    { src: "/images/DIAMANTE.png", name: "DIAMANTE" },
    { src: "/images/alien3.png", name: "Alien 3" },
    { src: "/images/alien4.png", name: "Alien 4" },
    { src: "/images/alien5.png", name: "Alien 5" },
    { src: "/images/alien6.png", name: "Alien 6" },
  ];

  // Doubled array multiple times to create a seamless infinite CSS marquee Effect
  const repeatedAliens = [...aliens, ...aliens, ...aliens, ...aliens, ...aliens, ...aliens, ...aliens, ...aliens];

  return (
    <div className="hero">
      <div className="alien-slider-track">
        {repeatedAliens.map((alien, i) => (
          <div className="alien-card" key={i}>
            <img src={alien.src} alt={alien.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
