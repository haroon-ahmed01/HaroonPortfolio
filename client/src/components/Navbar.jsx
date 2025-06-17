import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, Mail } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ currentSection, onSectionClick, sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (index) => {
    onSectionClick(index);
    closeMenu();
  };

  // Ensure 'sections' prop is used to derive navItems
  // The original code had a hardcoded navItems array, which is less dynamic
  const navItems = sections.filter(section => section.id !== 'contact').map((section, index) => ({
    index: index, // Assuming contact is always the last index
    label: section.name
  }));


  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="navbar-container">
          {/* Logo */}
          {/* <motion.button
            className="navbar-logo"
            onClick={() => handleNavClick(0)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="logo-icon">
              <User className="logo-text" size={20} />
            </div>
            <span className="logo-name">Haroon</span>
          </motion.button> */}

          {/* Desktop Navigation */}
          <div className="navbar-menu">
            {navItems.map((item) => (
              <motion.button
                key={item.index}
                onClick={() => handleNavClick(item.index)}
                className={`navbar-link ${currentSection === item.index ? 'active' : ''}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{item.label}</span>
                <motion.div
                  className="link-indicator"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: currentSection === item.index ? 1 : 0,
                    opacity: currentSection === item.index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </motion.button>
            ))}
          </div>

          {/* Contact Button */}
          <div className="navbar-actions">
            <motion.button
              onClick={() => handleNavClick(sections.length - 1)} // Contact is the last index
              className={`contact-btn ${currentSection === sections.length - 1 ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} />
              <span>Contact</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="hamburger-line"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="hamburger-line"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="hamburger-line"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            y: isMenuOpen ? 0 : -20,
            pointerEvents: isMenuOpen ? 'auto' : 'none'
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="mobile-menu-content">
            {navItems.map((item, index) => (
              <motion.button
                key={item.index}
                onClick={() => handleNavClick(item.index)}
                className={`mobile-nav-link ${currentSection === item.index ? 'active' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20
                }}
                transition={{
                  duration: 0.3,
                  delay: isMenuOpen ? index * 0.1 : 0,
                  ease: 'easeOut'
                }}
              >
                <span>{item.label}</span>
              </motion.button>
            ))}

            <motion.div
              className="mobile-menu-footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20
              }}
              transition={{
                duration: 0.3,
                delay: isMenuOpen ? navItems.length * 0.1 : 0,
                ease: 'easeOut'
              }}
            >
              <button
                onClick={() => handleNavClick(sections.length - 1)}
                className={`mobile-contact-btn ${currentSection === sections.length - 1 ? 'active' : ''}`}
              >
                <Mail size={16} />
                <span>Get In Touch</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.nav>

      {/* Section Name Display */}
      <motion.div
        className="current-section-display"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.span
          key={currentSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {sections[currentSection]?.name}
        </motion.span>
      </motion.div>
    </>
  );
};

export default Navbar;