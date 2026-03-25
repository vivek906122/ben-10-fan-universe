import React from "react";
import "./Aliens.css";
import { motion } from "framer-motion";

const alienList = [
    { name: "Swampfire", img: "/images/slider4.png", power: "Pyrokinesis & Chlorokinesis" },
    { name: "Humungousaur", img: "/images/slider6.png", power: "Strength & Size Manipulation" },
    { name: "Big Chill", img: "/images/slider1.png", power: "Ice Breath & Intangibility" },
    { name: "Echo Echo", img: "/images/slider2.png", power: "Sonic Screams & Cloning" },
    { name: "Chromastone", img: "/images/slider5.png", power: "Energy Absorption & Redirection" },
    { name: "Rath", img: "/images/slider3.png", power: "Super Strength & Claw Combat" },
    { name: "Diamondhead", img: "/images/diamondhead.png", power: "Crystal Manipulation & Durability" },
    { name: "Four Arms", img: "/images/Fourarms.png", power: "Superhuman Strength & Endurance" },
    { name: "XLR8", img: "/images/xlr8.png", power: "Supersonic Speed & Reflexes" },
    { name: "Brainstorm", img: "/images/Brainstorm.png", power: "Genius Intelligence & Electricity" },
];

const Aliens = () => {
    return (
        <div className="aliens-page">
            <motion.div 
                className="aliens-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="hero-content">
                    <span className="badge">Codename: Omnitrix</span>
                    <h1>Alien <span className="highlight">Roster</span></h1>
                    <p>Accessing high-security Plumber files. Viewing active DNA samples currently unlocked in the device.</p>
                </div>
                <div className="hero-scan-line"></div>
            </motion.div>

            <div className="aliens-grid">
                {alienList.map((alien, i) => (
                    <motion.div 
                        className="alien-profile-card"
                        key={alien.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10, scale: 1.02 }}
                    >
                        <div className="card-bg-glow"></div>
                        <div className="alien-img-container">
                            <img src={alien.img} alt={alien.name} />
                            <div className="img-overlay"></div>
                        </div>
                        <div className="alien-info">
                            <h3>{alien.name}</h3>
                            <div className="power-label">Primary Ability:</div>
                            <p>{alien.power}</p>
                            <div className="dna-sequence">DNA Verified: 100%</div>
                        </div>
                        <div className="card-border-top"></div>
                        <div className="card-border-bottom"></div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Aliens;
