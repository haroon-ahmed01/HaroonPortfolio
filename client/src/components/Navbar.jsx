import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Mail } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    // Show navbar after initial loading sequence
    const timer = setTimeout(() => {
      setShowNavbar(true);
    }, 4500); // Show after loading + cartoon appears

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "resume", "contact"]; // Added 'contact' here
      const scrollPosition = window.scrollY + 150; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (sectionId) => {
    closeMenu();

    // Always smooth scroll to section, no page reload
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: 'contact', label: 'Contact' },
  ];

  if (!showNavbar) {
    return null;
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="navbar-logo"
          >
            <div className="logo-icon">
              <User className="logo-text" size={20} />
            </div>
            <span className="logo-name">portfolio</span>
          </button>

          {/* Desktop Navigation */}
          <div className="navbar-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`navbar-link ${
                  activeSection === item.id ? "active" : ""
                }`}
              >
                <span>{item.label}</span>
                <div className="link-indicator"></div>
              </button>
            ))}
          </div>

          {/* Contact Button */}
          {/* <div className="navbar-actions">
            <button
              onClick={() => handleNavClick("contact")}
              className="contact-btn"
            >
              <Mail size={16} />
              <span>Contact</span>
            </button>
          </div> */}

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-content">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-link ${
                  activeSection === item.id ? "active" : ""
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
            <div className="mobile-menu-footer">
              {/* <button
                onClick={() => handleNavClick("contact")}
                className="mobile-contact-btn"
              >
                <Mail size={16} />
                <span>Get In Touch</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMenu}></div>
        )}
      </nav>
    </>
  );
};

export default Navbar;