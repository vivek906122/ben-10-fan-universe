import React, { useState, useEffect, useRef } from "react";
import "./Games.css";
import { motion, AnimatePresence } from "framer-motion";

const Games = () => {
    const [gameMode, setGameMode] = useState("menu"); // menu, clicker, simulator, memory
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [villainPos, setVillainPos] = useState({ top: "50%", left: "50%" });
    const [activeAlien, setActiveAlien] = useState(0);
    const [isTransformed, setIsTransformed] = useState(false);
    
    // Memory Game State
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isLocked, setIsLocked] = useState(false);

    const aliens = [
        { name: "Heatblast", color: "#ff4d00" },
        { name: "Four Arms", color: "#d20000" },
        { name: "XLR8", color: "#00d2ff" },
        { name: "Diamondhead", color: "#00ffcc" },
        { name: "Wildmutt", color: "#ff9500" },
    ];

    // Clicker Game Logic
    useEffect(() => {
        let timer;
        if (gameMode === "clicker" && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0) {
            setGameMode("gameOver");
        }
        return () => clearInterval(timer);
    }, [gameMode, timeLeft]);

    const moveVillain = () => {
        const top = Math.random() * 80 + 10 + "%";
        const left = Math.random() * 80 + 10 + "%";
        setVillainPos({ top, left });
        setScore(s => s + 1);
    };

    const startClicker = () => {
        setScore(0);
        setTimeLeft(30);
        setGameMode("clicker");
    };

    // Simulator Logic
    const nextAlien = () => setActiveAlien((activeAlien + 1) % aliens.length);
    const transform = () => {
        setIsTransformed(true);
        setTimeout(() => setIsTransformed(false), 3000);
    };

    // Memory Game Logic
    const startMemoryGame = () => {
        const memoryIcons = ["🔥", "💪", "⚡", "💎", "🐺", "👻", "☣️", "🧠"];
        const gameCards = [...memoryIcons, ...memoryIcons]
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({ id: index, icon }));
        
        setCards(gameCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setScore(0);
        setTimeLeft(60);
        setGameMode("memory");
    };

    const handleCardClick = (card) => {
        if (isLocked || flippedCards.includes(card.id) || matchedCards.includes(card.id)) return;

        const newFlipped = [...flippedCards, card.id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setIsLocked(true);
            const [firstId, secondId] = newFlipped;
            if (cards[firstId].icon === cards[secondId].icon) {
                setMatchedCards([...matchedCards, firstId, secondId]);
                setScore(s => s + 10);
                setFlippedCards([]);
                setIsLocked(false);
                if (matchedCards.length + 2 === cards.length) {
                    setTimeout(() => setGameMode("gameOver"), 1000);
                }
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                    setIsLocked(false);
                }, 1000);
            }
        }
    };


    return (
        <div className="simple-games-container">
            {gameMode === "menu" && (
                <div className="game-menu">
                    <span className="badge">Plumber training</span>
                    <h1>Simple <span className="highlight">Ben 10 Games</span></h1>
                    <div className="menu-grid">
                        <motion.div className="menu-card" whileHover={{scale: 1.05}} onClick={startClicker}>
                            <div className="card-icon">🎯</div>
                            <h3>Vilgax Attack</h3>
                            <p>Test your reflexes! Click the villains as they appear.</p>
                        </motion.div>
                        <motion.div className="menu-card" whileHover={{scale: 1.05}} onClick={() => setGameMode("simulator")}>
                            <div className="card-icon">⌚</div>
                            <h3>Omnitrix Sim</h3>
                            <p>Experience the device! Choose your alien and transform.</p>
                        </motion.div>
                        <motion.div className="menu-card" whileHover={{scale: 1.05}} onClick={startMemoryGame}>
                            <div className="card-icon">🎴</div>
                            <h3>Memory Hunt</h3>
                            <p>Test your brain! Find the matching alien icons.</p>
                        </motion.div>
                    </div>
                </div>
            )}


            {gameMode === "clicker" && (
                <div className="clicker-game">
                    <div className="game-hud">
                        <div>Score: <span>{score}</span></div>
                        <div>Time: <span>{timeLeft}s</span></div>
                        <button className="quit-btn" onClick={() => setGameMode("menu")}>Quit</button>
                    </div>
                    <div className="play-area">
                        <motion.div 
                            className="villain"
                            style={{ top: villainPos.top, left: villainPos.left }}
                            onClick={moveVillain}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            key={score}
                        >
                            <div className="villain-head">👾</div>
                            <div className="villain-label">VILGAX</div>
                        </motion.div>
                    </div>
                </div>
            )}

            {gameMode === "simulator" && (
                <div className="simulator-game">
                    <div className="omnitrix-base">
                        <div className={`omnitrix-core ${isTransformed ? 'transformed' : ''}`}>
                            <div className="core-display">
                                <AnimatePresence mode="wait">
                                    <motion.div 
                                        key={activeAlien}
                                        className="alien-silhouette"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.5 }}
                                        style={{ color: aliens[activeAlien].color }}
                                    >
                                        👤
                                    </motion.div>
                                </AnimatePresence>
                                <div className="alien-name">{aliens[activeAlien].name}</div>
                            </div>
                            <div className="core-controls">
                                <button className="spin-btn" onClick={nextAlien}>↺</button>
                                <button className="press-btn" onClick={transform}>SLAM</button>
                            </div>
                        </div>
                    </div>
                    {isTransformed && (
                        <motion.div 
                            className="transform-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ backgroundColor: aliens[activeAlien].color }}
                        >
                            <motion.h1 animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity }}>
                                HERO TIME!
                            </motion.h1>
                        </motion.div>
                    )}
                </div>
            )}

            {gameMode === "memory" && (
                <div className="memory-game">
                    <div className="game-hud">
                        <div>Matches: <span>{matchedCards.length / 2}</span></div>
                        <div>Time: <span>{timeLeft}s</span></div>
                        <button className="quit-btn" onClick={() => setGameMode("menu")}>Quit</button>
                    </div>
                    <div className="memory-grid">
                        {cards.map((card) => (
                            <motion.div 
                                key={card.id}
                                className={`memory-card-item ${flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 'flipped' : ''}`}
                                onClick={() => handleCardClick(card)}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="card-inner">
                                    <div className="card-front">?</div>
                                    <div className="card-back">{card.icon}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}


            {gameMode === "gameOver" && (
                <div className="game-over">
                    <h2>Training Results</h2>
                    <div className="final-score">{score}</div>
                    <p>Villains Defeated</p>
                    <div className="button-group">
                        <button className="btn-main" onClick={startClicker}>Try Again</button>
                        <button className="btn-sub" onClick={() => setGameMode("menu")}>Menu</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Games;
