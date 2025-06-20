import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import "./Email.css";

const Email = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus("error");
      setMessage("Please fill in all fields.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
      return;
    }

    if (formData.name.trim().length < 2) {
      setStatus("error");
      setMessage("Name must be at least 2 characters long.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
      return;
    }

    try {
      console.log('Sending email with data:', formData);
      console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim()
        }),
      });

      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok && result.success) {
        setStatus("success");
        setMessage(result.message || "Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "" });
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

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
    <div className="email-container">
      <motion.div
        className="email-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="email-header" variants={itemVariants}>
          <h1>Let's Connect!</h1>
          <p className="email-subtitle">
            I'd love to hear from you. Send me a message and I'll get back to
            you soon!
          </p>
        </motion.div>

        <motion.div className="email-form-container" variants={itemVariants}>
          <form onSubmit={handleSubmit} className="email-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                disabled={status === "loading"}
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                disabled={status === "loading"}
                maxLength={255}
              />
            </div>

            <button
              type="submit"
              className={`submit-button ${status}`}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <div className="spinner"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {message && (
              <motion.div
                className={`status-message ${status}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {status === "success" ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span>{message}</span>
              </motion.div>
            )}
          </form>
        </motion.div>

        <motion.div className="contact-info" variants={itemVariants}>
          <h2>Other Ways to Reach Me</h2>
          <div className="contact-methods">
            <div className="contact-method">
              <h4>Email</h4>
              <p>haroonahmedthedev@gmail.com</p>
            </div>
            <div
              className="contact-method"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/haroon--ahmed/",
                  "_blank"
                )
              }
              style={{ cursor: "pointer" }}
            >
              <h4>LinkedIn</h4>
              <p>Connect with me professionally</p>
            </div>
            <div
              className="contact-method"
              onClick={() =>
                window.open("https://github.com/haroon-ahmed01", "_blank")
              }
              style={{ cursor: "pointer" }}
            >
              <h4>GitHub</h4>
              <p>Check out my code and projects</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Email;