import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Eye } from 'lucide-react';
import './Resume.css';

const Resume = () => {
  const [resumeURL, setResumeURL] = useState('');

  useEffect(() => {
    fetch('/api/resume')
      .then(res => res.json())
      .then(data => setResumeURL(data.resumeURL))
      .catch(() => {
        setResumeURL('/files/Haroon_Ahmed_Resume.pdf');
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
    <div className="resume-container">
      <motion.div
        className="resume-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="resume-header" variants={itemVariants}>
          {/* <div className="section-badge">
            <FileText size={16} />
            <span>Resume</span>
          </div> */}
          <h1>My Professional Resume</h1>
          <p className="resume-subtitle">
            Download or view my complete professional background and experience
          </p>
        </motion.div>

        <motion.div className="resume-card" variants={itemVariants}>
          <div className="resume-preview">
            <div className="resume-icon">
              <FileText size={48} />
            </div>
            <div className="resume-info">
              <h3>Haroon Ahmed - Resume</h3>
              <p>Full Stack Developer (MERN / Python)</p>
              <div className="resume-details">
                <span>PDF Document</span>
                <span>•</span>
                <span>Updated Recently</span>
              </div>
            </div>
          </div>

          <div className="resume-actions">
            <a 
              href={resumeURL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="resume-button view-button"
            >
              <Eye size={20} />
              <span>View Resume</span>
            </a>
            <a 
              href={resumeURL} 
              download="Haroon_Ahmed_Resume.pdf"
              className="resume-button download-button"
            >
              <Download size={20} />
              <span>Download PDF</span>
            </a>
          </div>
        </motion.div>

        <motion.div className="resume-highlights" variants={itemVariants}>
          <h2>Resume Highlights</h2>
          <div className="highlights-grid">
            <div className="highlight-item">
              <h4>Education</h4>
              <p>Master's in Computer Applications (MCA) - Currently Pursuing</p>
            </div>
            <div className="highlight-item">
              <h4>Experience</h4>
              <p>Gained hands-on development experience at Maxyfi and Marqwon using MERN stack</p>
            </div>
            <div className="highlight-item">
              <h4>Projects</h4>
              <p>Built 3+ full-stack applications including Qirat, InventoHub, and ReviewSense</p>
            </div>
            <div className="highlight-item">
              <h4>Skills</h4>
              <p>MERN Stack, Python, Django, Machine Learning, and Database Management</p>
            </div>
          </div>
        </motion.div>
{/* 
        <motion.div className="contact-cta" variants={itemVariants}>
          <h3>Interested in working together?</h3>
          <p>Let's discuss how I can contribute to your team and projects</p>
          <a href="/contact" className="contact-button">
            Get In Touch
          </a>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default Resume;