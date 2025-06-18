import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(() => {
        setProjects([
          {
            title: "Qirat",
            tech: ["MERN", "Tailwind CSS"],
            description: "Interactive Quran learning app with speech recognition (ongoing).",
            github: "https://github.com/haroon-ahmed01/Qirat.git"
          },
          {
            title: "InventoHub",
            tech: ["Python", "Django REST", "MySQL", "React"],
            description: "Inventory management system with role-based access and alert system.",
            github: "https://github.com/haroon-ahmed01/InventoHub.git"
          },
          {
            title: "ReviewSense",
            tech: ["Python", "NLP", "Scikit-Learn", "Keras"],
            description: "Sentiment analysis model for Amazon reviews.",
            github: "https://github.com/haroon-ahmed01/ReviewSense.git"
          }
        ]);
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
    <div className="projects-container">
      <motion.div
        className="projects-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="projects-header" variants={itemVariants}>
          {/* <div className="section-badge">
            <Folder size={16} />
            <span>My Work</span>
          </div> */}
          <h1>Featured Projects</h1>
          <p className="projects-subtitle">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        <motion.div className="projects-grid" variants={containerVariants}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="project-header">
                <div className="project-icon">
                  <Folder size={24} />
                </div>
                <div className="project-links">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <Github size={20} />
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="projects-cta"
          variants={itemVariants}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Want to see more?</h2>
          <p>Check out my GitHub profile for more projects and contributions</p>
          <a 
            href="https://github.com/haroon-ahmed01" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button"
          >
            <Github size={20} />
            <span>View GitHub Profile</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;