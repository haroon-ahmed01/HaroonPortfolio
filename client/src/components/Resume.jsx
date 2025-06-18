import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Eye, AlertCircle } from 'lucide-react';
import './Resume.css';

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    resumeURL: "/Haroon_Ahmed_Resume.pdf", // Direct path to public folder
    fallbackURL: "https://drive.google.com/file/d/1SNkwxNiTFcaRwcYprkhUh59NcLKdOHZO/view?usp=sharing",
    directDownload: "/Haroon_Ahmed_Resume.pdf" // Direct download from public folder
  });
  const [loading, setLoading] = useState(false); // No need to load since we're using local files
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if the local PDF exists
    const checkPDFExists = async () => {
      try {
        const response = await fetch('/Haroon_Ahmed_Resume.pdf', { method: 'HEAD' });
        if (!response.ok) {
          throw new Error('PDF not found locally');
        }
      } catch (err) {
        console.log('Local PDF not found, using fallback');
        setError(true);
      }
    };

    checkPDFExists();
  }, []);

  const handleViewResume = () => {
    const url = error ? resumeData.fallbackURL : resumeData.resumeURL;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadResume = () => {
    if (error) {
      // Use Google Drive fallback
      window.open(resumeData.fallbackURL, '_blank', 'noopener,noreferrer');
    } else {
      // Direct download from public folder
      const link = document.createElement('a');
      link.href = resumeData.directDownload;
      link.download = 'Haroon_Ahmed_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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

  if (loading) {
    return (
      <div className="resume-container">
        <div className="resume-loading">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FileText size={40} />
          </motion.div>
          <p>Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-container">
      <motion.div
        className="resume-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="resume-header" variants={itemVariants}>
          <h1>My Professional Resume</h1>
          <p className="resume-subtitle">
            Download or view my complete professional background and experience
          </p>
          {error && (
            <div className="error-notice">
              <AlertCircle size={16} />
              <span>Using Google Drive backup link</span>
            </div>
          )}
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
                {error && <span>• Google Drive Version</span>}
              </div>
            </div>
          </div>

          <div className="resume-actions">
            <button 
              onClick={handleViewResume}
              className="resume-button view-button"
              type="button"
            >
              <Eye size={20} />
              <span>View Resume</span>
            </button>
            <button 
              onClick={handleDownloadResume}
              className="resume-button download-button"
              type="button"
            >
              <Download size={20} />
              <span>Download PDF</span>
            </button>
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
      </motion.div>
    </div>
  );
};

export default Resume;