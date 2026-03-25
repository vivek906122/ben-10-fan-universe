import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src="/images/logo.png" alt="Ben 10 Logo" />
        </Link>
      </div>

      <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/aliens" onClick={closeMenu}>Aliens</Link></li>
          <li><Link to="/episodes" onClick={closeMenu}>Episodes</Link></li>
          <li><Link to="/games" onClick={closeMenu}>Games</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        </ul>

        <div className="nav-buttons mobile-only">
          {user ? (
            <>
              <span className="nav-username">Hi, {user.username}</span>
              <button className="btn btn-outline" onClick={() => { handleLogout(); closeMenu(); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" onClick={closeMenu}>Login</Link>
              <Link to="/signup" className="btn btn-fill" onClick={closeMenu}>Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {!isAuthPage && (
        <div className="nav-buttons desktop-only">
          {user ? (
            <>
              <span className="nav-username">Hi, {user.username}</span>
              <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/signup" className="btn btn-fill">Sign Up</Link>
            </>
          )}
        </div>
      )}

      <button className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>
    </nav>
  );
};

export default Navbar;
