import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff, HiX } from "react-icons/hi";
import "./Login.css"; // Reuse common styles
import "./Signup.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Hero Profile created! You can now log in.");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred during signup.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-glow" />
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-header">
          <Link to="/" className="auth-close-btn">
            <HiX />
          </Link>
          <h1>Join the Plumbers</h1>
          <p>Create your hero profile and save the universe.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <HiUser className="input-icon" />
              <input 
                type="text" 
                name="username"
                placeholder="Ben Tennyson" 
                value={formData.username}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <HiMail className="input-icon" />
              <input 
                type="email" 
                name="email"
                placeholder="ben.tennyson@plumbers.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <HiLockClosed className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Create password" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <HiLockClosed className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                name="confirmPassword"
                placeholder="Confirm password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <motion.button 
            type="submit" 
            className="auth-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Hero Profile
          </motion.button>
        </form>

        <div className="auth-footer">
          <p>Already a hero? <Link to="/login">Login</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
