import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Coffee, Heart } from 'lucide-react';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Resume from './Resume';
import Email from './Email';
import './Home.css';

const Home = () => {
  const [showLoading, setShowLoading] = useState(() => {
    // Check if there's a hash on initial load
    return !window.location.hash;
  });
  const [showCartoon, setShowCartoon] = useState(false);
  const [showReal, setShowReal] = useState(() => {
    // If there's a hash, start with real content
    return !!window.location.hash;
  });
  const [homeData, setHomeData] = useState({});

  useEffect(() => {
    // Check if there's a hash in URL (coming from another page)
    const hasHash = window.location.hash;
    
    if (!hasHash) {
      // Only show animations if no hash (normal first visit)
      setTimeout(() => {
        setShowLoading(false);
        setShowCartoon(true);
      }, 2000);
    }

    // Fetch data
    fetch('/api/home')
      .then(res => res.json())
      .then(data => setHomeData(data))
      .catch(() => {
        setHomeData({
          name: "Haroon Ahmed",
          role: "Full Stack Developer (MERN / Python)",
          bannerImage: "/api/placeholder/400/400"
        });
      });
  }, []);

  // Handle hash navigation when component loads
  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remove the '#'
    if (hash) {
      // Ensure we're showing real content
      if (!showReal) {
        setShowLoading(false);
        setShowCartoon(false);
        setShowReal(true);
      }
      
      // Scroll to section after a brief delay
      const scrollToSection = () => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          // Clear the hash from URL after navigation
          setTimeout(() => {
            window.history.replaceState(null, null, '/');
          }, 1000);
        }
      };
      
      // If content is already showing, scroll immediately
      if (showReal) {
        setTimeout(scrollToSection, 100);
      } else {
        // Wait for content to show
        setTimeout(scrollToSection, 500);
      }
    }
  }, [showReal]);

  const handleCartoonClick = () => {
    setShowCartoon(false);
    setTimeout(() => setShowReal(true), 500);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="home-container">
      <AnimatePresence mode="wait">
        {showLoading && (
          <motion.div
            key="loading"
            className="loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loading-content">
              <motion.div
                className="loading-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Code size={40} />
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Welcome to my portfolio
              </motion.h2>
              <motion.div
                className="loading-dots"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span>.</span><span>.</span><span>.</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {showCartoon && (
          <motion.div
            key="cartoon"
            className="cartoon-screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <div className="cartoon-content">
              <motion.div
                className="cartoon-character"
                onClick={handleCartoonClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="cartoon-face">
                  <div className="cartoon-eyes">
                    <div className="eye"></div>
                    <div className="eye"></div>
                  </div>
                  <div className="cartoon-smile"></div>
                </div>
                <div className="cartoon-body">
                  <Coffee className="cartoon-icon" size={24} />
                </div>
              </motion.div>
              
              <motion.div
                className="speech-bubble"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p><strong>Glad to have you here — tap to begin.</strong></p>
                <div className="bubble-arrow"></div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {showReal && (
          <motion.div
            key="real"
            className="real-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <section id="home" className="hero-section">
              <div className="hero-content">
                <motion.div
                  className="profile-section"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="profile-image">
                    <img src={homeData.bannerImage} alt="Haroon Ahmed" />
                    <div className="image-overlay"></div>
                  </div>
                </motion.div>

                <motion.div
                  className="intro-section"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Hi, I'm <span className="name-highlight">{homeData.name}</span>
                  </motion.h1>
                  
                  <motion.h2
                    className="role"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    {homeData.role}
                  </motion.h2>

                  <motion.p
                    className="intro-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    I'm a full stack developer who uses web technologies to build practical and engaging applications that solve real problems. With strong hands-on experience in the MERN stack, Python, and modern web technologies, I focus on writing clean, responsive, and efficient code to bring ideas to life.
                  </motion.p>

                  <motion.div
                    className="intro-stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <div className="stat">
                      <Code size={20} />
                      <span>3+ Projects</span>
                    </div>
                    <div className="stat">
                      <Heart size={20} />
                      <span>MCA Student</span>
                    </div>
                    <div className="stat">
                      <Coffee size={20} />
                      <span>Coffee Lover</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={scrollToAbout}
              >
                <span>Scroll to explore</span>
                <ChevronDown size={20} />
              </motion.div> */}
            </section>

            {/* About Section */}
            <section id="about">
              <About />
            </section>

            {/* Skills Section */}
            <section id="skills">
              <Skills />
            </section>

            {/* Projects Section */}
            <section id="projects">
              <Projects />
            </section>

            {/* Resume Section */}
            <section id="resume">
              <Resume />
            </section>

            <section id="contact">
              <Email />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;