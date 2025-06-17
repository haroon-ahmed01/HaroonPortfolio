import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, GraduationCap, Code2, Heart } from 'lucide-react';
import './About.css';

const About = () => {
  const [aboutData, setAboutData] = useState('');

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => setAboutData(data.about))
      .catch(() => {
        setAboutData("I'm a passionate full stack developer with experience in React, Node.js, Django, and machine learning projects. Currently pursuing MCA and worked on real-world projects like Qirat and InventoHub.");
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="about-container">
      <motion.div
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="about-header" variants={itemVariants}>
          <div className="section-badge">
            <User size={16} />
            <span>About Me</span>
          </div>
          <h1>Get to Know Me Better</h1>
          <p className="about-subtitle">
            Passionate developer, lifelong learner, and problem solver
          </p>
        </motion.div>

        <motion.div className="about-grid" variants={itemVariants}>
          <div className="about-text">
            <motion.div
              className="text-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>My Story</h2>
              <p>{aboutData}</p>
              
              <div className="current-focus">
                <h3>What I'm Currently Doing</h3>
                <ul>
                  <li>
                    <GraduationCap size={16} />
                    <span>Pursuing Master's in Computer Applications (MCA)</span>
                  </li>
                  <li>
                    <Code2 size={16} />
                    <span>Building full-stack applications with MERN stack</span>
                  </li>
                  <li>
                    <Heart size={16} />
                    <span>Exploring machine learning and AI technologies</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="about-details">
            <motion.div
              className="details-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3>Quick Facts</h3>
              <div className="facts-list">
                <div className="fact-item">
                  <MapPin size={16} />
                  <div>
                    <span className="fact-label">Location</span>
                    <span className="fact-value">India</span>
                  </div>
                </div>
                <div className="fact-item">
                  <Calendar size={16} />
                  <div>
                    <span className="fact-label">Experience</span>
                    <span className="fact-value">2+ Years</span>
                  </div>
                </div>
                <div className="fact-item">
                  <GraduationCap size={16} />
                  <div>
                    <span className="fact-label">Education</span>
                    <span className="fact-value">MCA (Pursuing)</span>
                  </div>
                </div>
                <div className="fact-item">
                  <Code2 size={16} />
                  <div>
                    <span className="fact-label">Specialization</span>
                    <span className="fact-value">Full Stack Development</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="interests-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Interests & Hobbies</h3>
              <div className="interests-grid">
                <span className="interest-tag">Web Development</span>
                <span className="interest-tag">Machine Learning</span>
                <span className="interest-tag">Open Source</span>
                <span className="interest-tag">Problem Solving</span>
                <span className="interest-tag">Reading Tech Blogs</span>
                <span className="interest-tag">Learning New Technologies</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="journey-section"
          variants={itemVariants}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>My Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Started MCA Program</h4>
                <p>Began my Master's journey in Computer Applications, diving deep into advanced programming concepts and software development.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Built InventoHub</h4>
                <p>Developed a comprehensive inventory management system using Python, Django REST, MySQL, and React with role-based access control.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Created ReviewSense</h4>
                <p>Built an NLP-powered sentiment analysis model for Amazon reviews using Python, Scikit-Learn, and Keras.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Working on Qirat</h4>
                <p>Currently developing an interactive Quran learning app with speech recognition using the MERN stack and Tailwind CSS.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;