import React from "react";
import "./About.css";
import { motion } from "framer-motion";

const teamMembers = [
    {
        name: "Ben Tennyson",
        role: "Omnitrix Wielder",
        img: "/images/ben_classic_omni.png",
        desc: "An ordinary boy who discovers the Omnitrix and becomes Earth's greatest hero, transforming into powerful aliens to defend the galaxy.",
    },
    {
        name: "Gwen Tennyson",
        role: "Magic Strategist",
        img: "/images/gwen.png",
        desc: "Ben's brilliant cousin and a master of magical mana. Her strategic mind and arcane powers are essential to the team's survival.",
    },
    {
        name: "Grandpa Max",
        role: "Legendary Plumber",
        img: "/images/max.png",
        desc: "A retired Plumber agent with unmatched field experience. Max guides the team with wisdom and tactical technology.",
    },
];

const stats = [
    { label: "Aliens Available", value: "11+" },
    { label: "Episodes", value: "60+" },
    { label: "Villains Defeated", value: "100+" },
    { label: "Universes Saved", value: "5" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
};

const About = () => {
    return (
        <div className="about-page" id="about">
            {/* Hero Banner */}
            <section className="about-hero">
                <motion.div
                    className="about-hero-content"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="about-badge">About Us</span>
                    <h1>The World of <span className="about-highlight">Ben 10</span></h1>
                    <p>
                        Dive into the universe of the greatest alien hero on Earth. Ben 10
                        began as an ordinary boy who found an extraordinary device — the
                        Omnitrix — changing his life and the fate of the galaxy forever.
                    </p>
                </motion.div>
                <div className="about-hero-glow" />
            </section>

            {/* Stats Section */}
            <section className="about-stats">
                {stats.map((stat, i) => (
                    <motion.div
                        className="stat-card"
                        key={i}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2>{stat.value}</h2>
                        <p>{stat.label}</p>
                    </motion.div>
                ))}
            </section>

            {/* Story Section */}
            <section className="about-story">
                <motion.div
                    className="about-story-text"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <h2>Our <span className="about-highlight">Story</span></h2>
                    <p>
                        Ben 10 first aired in 2005 and quickly became a global phenomenon.
                        Following ten-year-old Ben Tennyson, the show explored themes of
                        responsibility, courage, and what it truly means to be a hero.
                    </p>
                    <p>
                        Armed with the Omnitrix — a powerful alien device — Ben could
                        transform into 10 different alien forms, each with unique abilities.
                        With his cousin Gwen and Grandpa Max by his side, no threat was
                        too great.
                    </p>
                    <p>
                        Over the years the franchise has grown to include multiple series,
                        films, video games, and a massive global fanbase — all united by
                        one iconic watch.
                    </p>
                </motion.div>
                <motion.div
                    className="about-story-emblem"
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <img src="/images/logo.png" alt="Ben 10 Logo" />
                    <div className="emblem-ring" />
                    <div className="emblem-ring ring-2" />
                </motion.div>
            </section>

            {/* Team / Characters Section */}
            <section className="about-team">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    The <span className="about-highlight">Team</span>
                </motion.h2>
                <div className="team-grid">
                    {teamMembers.map((member, i) => (
                        <motion.div
                            className={`team-card${member.name === "Ben Tennyson" ? " ben-card" : member.name === "Gwen Tennyson" ? " gwen-card" : ""}`}
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            whileHover={{ scale: 1.05, y: -8 }}
                        >
                            <div className="team-img-wrap">
                                <img src={member.img} alt={member.name} />
                            </div>
                            <h3>{member.name}</h3>
                            <span className="team-role">{member.role}</span>
                            <p>{member.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-mission">
                <motion.div
                    className="mission-box"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <h2>Our <span className="about-highlight">Mission</span></h2>
                    <p>
                        This fan website is dedicated to celebrating the legacy of Ben 10.
                        We aim to bring every fan — old and new — closer to the universe
                        they love. Explore aliens, revisit episodes, and relive the
                        adventures that defined a generation.
                    </p>
                    <motion.button
                        className="mission-btn"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Explore Aliens
                    </motion.button>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="about-footer">
                <p>© 2026 Ben 10 Fan Universe. Built with ❤️ for fans everywhere.</p>
                <p className="footer-credit">Developed by 
                    <a href="https://linkedin.com/in/vivekvive996" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                        Vivek
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default About;
