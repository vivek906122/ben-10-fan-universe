import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiX } from "react-icons/hi";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful!");
        console.log("Logged in user:", data.user);
        
        // Save user to local storage and redirect
        localStorage.setItem("user", JSON.stringify(data.user));
        
        setTimeout(() => {
          navigate("/");
          window.location.reload(); // Refresh to update navbar state
        }, 1000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-glow" />
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-header">
          <Link to="/" className="auth-close-btn">
            <HiX />
          </Link>
          <h1>Welcome Back</h1>
          <p>The Omnitrix is waiting for your return.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

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
                placeholder="••••••••" 
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
            <div className="forgot-pass">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>

          <motion.button 
            type="submit" 
            className="auth-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Access Omnitrix
          </motion.button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
