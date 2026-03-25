import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Episodes.css";
import { motion } from "framer-motion";

const episodes = [
    {
        id: "S01E01",
        title: "Fame",
        desc: "Ben Tennyson discovers the Omnitrix during a summer camping trip and learns to use its power.",
        type: "Classic",
        fileUrl: "/images/Season 1.mkv",
        thumb: "/images/ben.png",
        isPremium: false
    },
    {
        id: "S01E02",
        title: "Duped",
        desc: "Ben faces Dr. Animo, a mad scientist who uses a device to mutate animals into prehistoric monsters.",
        type: "Action",
        fileUrl: "/images/Season 2.mkv",
        thumb: "/images/ben.png",
        isPremium: false
    },
    {
        id: "S01E03",
        title: "Paradox",
        desc: "The team investigates a lake monster, discovering it's an alien being hunted by poachers.",
        type: "Mystery",
        fileUrl: "/images/Season 3.mkv",
        thumb: "/images/ben.png",
        isPremium: false
    },
    {
        id: "S02E01",
        title: "Truth",
        desc: "Max reveals secrets from his past as a Plumber while the team faces an old nemesis.",
        type: "Classic",
        fileUrl: "",
        thumb: "/images/ben.png",
        isPremium: true
    },
    {
        id: "S02E02",
        title: "The Big Tick",
        desc: "An enormous tick-like alien arrives on Earth, threatening to devour the planet's energy.",
        type: "Action",
        fileUrl: "",
        thumb: "/images/ben.png",
        isPremium: true
    },
    {
        id: "S02E03",
        title: "Framed",
        desc: "Ben is framed for crimes committed by a mysterious new shapeshifter using his forms.",
        type: "Mystery",
        fileUrl: "",
        thumb: "/images/ben.png",
        isPremium: true
    }
];

const Episodes = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedEp, setSelectedEp] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleWatchClick = (e, ep) => {
        e.preventDefault();
        
        if (!user) {
            navigate("/login");
            return;
        }

        if (ep.isPremium) {
            setSelectedEp(ep);
            setShowPaymentModal(true);
        } else {
            window.open(ep.fileUrl, "_blank");
        }
    };

    const handlePayment = () => {
        // Simulate payment process seamlessly without annoying alerts
        setTimeout(() => {
            setShowPaymentModal(false);
            
            if (selectedEp.fileUrl) {
                window.open(selectedEp.fileUrl, "_blank");
            } else {
                console.log("Episode unlocked! (No file attached)");
            }
        }, 800);
    };

    return (
        <section className="episodes-section" id="episodes">
            <motion.div
                className="episodes-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <span className="episodes-badge">Mission Log</span>
                <h2>Iconic <span className="episodes-highlight">Episodes</span></h2>
                <div className="header-line"></div>
            </motion.div>

            <div className="episodes-grid">
                {episodes.map((ep, i) => (
                    <motion.div
                        className="episode-card"
                        key={ep.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                    >
                        <div className="episode-thumbnail">
                            {ep.thumb ? (
                                <img src={ep.thumb} alt={ep.title} className="ep-frame-image" />
                            ) : (
                                <div className="thumb-placeholder">
                                    <span className="glitch-text">{ep.id}</span>
                                    <div className="scan-line"></div>
                                </div>
                            )}
                            <div className="ep-tag">{ep.type}</div>
                        </div>
                        <div className="episode-content">
                            <h3>{ep.title}</h3>
                            <p>{ep.desc}</p>
                            <div className="card-footer">
                                <button 
                                    className={`watch-btn ${ep.isPremium ? 'premium-btn' : ''}`} 
                                    onClick={(e) => handleWatchClick(e, ep)}
                                >
                                    <span>{ep.isPremium ? "Unlock Episode" : "Access File"}</span>
                                    <div className="btn-glow"></div>
                                </button>
                            </div>
                        </div>
                        <div className="card-corner tr"></div>
                        <div className="card-corner bl"></div>
                    </motion.div>
                ))}
            </div>

            {showPaymentModal && (
                <div className="payment-overlay">
                    <motion.div 
                        className="payment-modal"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h3>Unlock Mission</h3>
                        <p>You are about to unlock: <strong>{selectedEp?.title}</strong></p>
                        <div className="payment-details">
                            <span className="price">₹399</span>
                            <span className="access-type">Permanent Access</span>
                        </div>
                        <div className="payment-methods">
                            <button className="pay-opt">Stripe</button>
                            <button className="pay-opt">PayPal</button>
                            <button className="pay-opt">Omni-Pay</button>
                        </div>
                        <div className="modal-actions">
                            <button className="confirm-pay-btn" onClick={handlePayment}>Pay & Unlock Now</button>
                            <button className="cancel-pay-btn" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default Episodes;
