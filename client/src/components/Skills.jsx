import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Palette, Brain, GitBranch } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const [skillsData, setSkillsData] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/skills`)
      .then(res => res.json())
      .then(data => setSkillsData(data))
      .catch(() => {
        setSkillsData({
          languages: ["Python", "JavaScript"],
          frontend: ["HTML", "Tailwind CSS", "React JS"],
          backend: ["Express", "Django", "Django REST"],
          database: ["MongoDB", "MySQL"],
          versionControl: ["Git", "GitHub"]
        });
      });
  }, []);

  const skillCategories = [
    {
      icon: Code,
      title: "Languages",
      skills: skillsData.languages || [],
      color: "#667eea"
    },
    {
      icon: Palette,
      title: "Frontend",
      skills: skillsData.frontend || [],
      color: "#f093fb"
    },
    {
      icon: Server,
      title: "Backend",
      skills: skillsData.backend || [],
      color: "#4facfe"
    },
    {
      icon: Database,
      title: "Database",
      skills: skillsData.database || [],
      color: "#43e97b"
    },
    {
      icon: GitBranch,
      title: "Version Control",
      skills: skillsData.versionControl || [],
      color: "#fa709a"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div className="skills-container">
      <motion.div
        className="skills-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="skills-header" variants={itemVariants}>
          {/* <div className="section-badge">
            <Brain size={16} />
            <span>My Skills</span>
          </div> */}
          <h1>Technical Expertise</h1>
          <p className="skills-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div className="skills-grid" variants={containerVariants}>
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="category-header">
                <div 
                  className="category-icon"
                  style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color}aa)` }}
                >
                  <category.icon size={24} />
                </div>
                <h3>{category.title}</h3>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: skillIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="skill-name">{skill}</span>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        style={{ background: category.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${85 + Math.random() * 15}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="skills-summary"
          variants={itemVariants}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>What I Bring to the Table</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <h4>Full-Stack Development</h4>
              <p>End-to-end application development using modern technologies like MERN stack and Python frameworks.</p>
            </div>
            <div className="summary-item">
              <h4>Problem Solving</h4>
              <p>Strong analytical skills with experience in building solutions for real-world challenges.</p>
            </div>
            <div className="summary-item">
              <h4>Continuous Learning</h4>
              <p>Always exploring new technologies and best practices to stay current with industry trends.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;