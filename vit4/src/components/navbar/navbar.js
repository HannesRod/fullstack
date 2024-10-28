import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo/Brand */}
          <div className="navbar-brand">
            <Home className="navbar-icon" size={24} />
            <span className="brand-name">MyBrand</span>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-links-desktop">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/not-home" 
              className={`nav-link ${isActive('/not-home') ? 'active' : ''}`}
            >
              Not Home
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-button">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="navbar-links-mobile">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/not-home" 
              className={`nav-link ${isActive('/not-home') ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              Not Home
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;