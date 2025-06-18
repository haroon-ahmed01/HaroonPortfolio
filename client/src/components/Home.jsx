import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Coffee, Heart } from 'lucide-react';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Resume from './Resume';
import Email from './Email';
import './Home.css';
import portfolioBanner from '../assets/portfolioBanner.jpeg'; // Local image import

const Home = () => {
  const [showLoading, setShowLoading] = useState(() => !window.location.hash);
  const [showCartoon, setShowCartoon] = useState(false);
  const [showReal, setShowReal] = useState(() => !!window.location.hash);
  const [homeData, setHomeData] = useState({
    name: "Haroon Ahmed",
    role: "Full Stack Developer (MERN / Python)",
    bannerImage: portfolioBanner,
    fallbackImage: "https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg?auto=compress&cs=tinysrgb&w=400"
  });
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const hasHash = window.location.hash;

    if (!hasHash) {
      setTimeout(() => {
        setShowLoading(false);
        setShowCartoon(true);
      }, 2000);
    }

    const fetchHomeData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/home`);
        if (res.ok) {
          const data = await res.json();
          setHomeData(prev => ({
            ...prev,
            name: data.name || prev.name,
            role: data.role || prev.role
          }));
        }
      } catch (error) {
        console.log('Fallback: using local homeData');
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      if (!showReal) {
        setShowLoading(false);
        setShowCartoon(false);
        setShowReal(true);
      }
      const scrollToSection = () => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            window.history.replaceState(null, null, '/');
          }, 1000);
        }
      };

      if (showReal) {
        setTimeout(scrollToSection, 100);
      } else {
        setTimeout(scrollToSection, 500);
      }
    }
  }, [showReal]);

  const handleCartoonClick = () => {
    setShowCartoon(false);
    setTimeout(() => setShowReal(true), 500);
  };

  const handleImageError = () => setImageError(true);
  const getImageSrc = () => imageError ? homeData.fallbackImage : homeData.bannerImage;

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
                animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
            <section id="home" className="hero-section">
              <div className="hero-content">
                <motion.div
                  className="profile-section"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="profile-image">
                    <img
                      src={getImageSrc()}
                      alt="Haroon Ahmed"
                      onError={handleImageError}
                      loading="lazy"
                    />
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
                    <div className="stat"><Code size={20} /><span>3+ Projects</span></div>
                    <div className="stat"><Heart size={20} /><span>MCA Student</span></div>
                    <div className="stat"><Coffee size={20} /><span>Coffee Lover</span></div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            <section id="about"><About /></section>
            <section id="skills"><Skills /></section>
            <section id="projects"><Projects /></section>
            <section id="resume"><Resume /></section>
            <section id="contact"><Email /></section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
