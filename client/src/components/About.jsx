import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Calendar,
  GraduationCap,
  Code2,
  Heart,
  Briefcase,
} from "lucide-react";
import "./About.css";

const About = () => {
  const [aboutData, setAboutData] = useState("");

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setAboutData(data.about))
      .catch(() => {
        setAboutData(`My interest in software development began during my college days, and it gradually grew from a simple curiosity into a clear goal — to one day build my own SaaS product. To achieve that, I started learning full stack web development and applied my skills through internships, where I gained valuable hands-on experience in real-world software projects. Now, I am looking to join a team that values learning, creativity, and innovation — a place where I can grow while contributing meaningfully.`);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
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
            Passionate developer and problem solver
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
                    <Briefcase size={16} />
                    <span>Interning as a Full Stack Developer at Marqwon</span>
                  </li>
                  <li>
                   <GraduationCap size={16} />
                    <span>
                      Pursuing Master's in Computer Applications (MCA)
                    </span>
                  </li>
                  <li>
                    <Code2 size={16} />
                    <span>
                      Building full-stack applications with MERN stack
                    </span>
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
                    <span className="fact-value">Chennai, India</span>
                  </div>
                </div>
                <div className="fact-item">
                  <Calendar size={16} />
                  <div>
                    <span className="fact-label">Experience</span>
                    <span className="fact-value">Currently interning (2+ months experience)</span>
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
                <p>
                  Began my Master's in Computer Applications (Distance) to deepen my understanding of software development and programming.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Joined Maxyfi as a Developer Intern</h4>
                <p>
                 Trained as a MERN stack developer at Maxyfi, where I improved core product pages and enhanced the AI chatbot UI using React and Bootstrap.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Joined Marqwon as a Full Stack Developer Intern</h4>
                <p>
                 Currently contributing to small-scale web projects and gaining hands-on experience in real-time product development using the MERN stack.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Working on Qirat</h4>
                <p>
                  Currently developing an interactive Quran learning app with
                  speech recognition using the MERN stack and Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
