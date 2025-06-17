import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Email from './components/Email';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionsRef = useRef([]);
  const containerRef = useRef(null);

  const sections = [
    { id: 'home', component: Home, name: 'Home' },
    { id: 'about', component: About, name: 'About' },
    { id: 'skills', component: Skills, name: 'Skills' },
    { id: 'projects', component: Projects, name: 'Projects' },
    { id: 'resume', component: Resume, name: 'Resume' },
    { id: 'contact', component: Email, name: 'Contact' }
  ];

  // Scroll to specific section
  const scrollToSection = (sectionIndex) => {
    if (isScrolling || sectionIndex === currentSection) return;

    setIsScrolling(true);
    setCurrentSection(sectionIndex);

    const targetSection = sectionsRef.current[sectionIndex];
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Reset scrolling flag after animation
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  // Handle wheel scroll
  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) return;

      e.preventDefault();
      
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        // Scroll down
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll up
        scrollToSection(currentSection - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentSection, isScrolling, sections.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isScrolling) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(sections.length - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isScrolling, sections.length]);

  // Intersection Observer for section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      if (isScrolling) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          const sectionIndex = sections.findIndex(section => section.id === sectionId);
          if (sectionIndex !== -1 && sectionIndex !== currentSection) {
            setCurrentSection(sectionIndex);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [sections, currentSection, isScrolling]);

  return (
    <div className="app" ref={containerRef}>
      <Navbar 
        currentSection={currentSection} 
        onSectionClick={scrollToSection}
        sections={sections}
      />
      
      <main className="main-content">
        {sections.map((section, index) => {
          const SectionComponent = section.component;
          return (
            <motion.section
              key={section.id}
              ref={(el) => (sectionsRef.current[index] = el)}
              className={`section ${section.id}-section ${currentSection === index ? 'active' : ''}`}
              data-section={section.id}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSection === index ? 1 : 0.3,
                scale: currentSection === index ? 1 : 0.95
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <SectionComponent />
            </motion.section>
          );
        })}
      </main>

      {/* Section Indicator */}
      <div className="section-indicator">
        {sections.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${currentSection === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="scroll-progress">
        <motion.div
          className="progress-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (currentSection + 1) / sections.length }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

export default App;