const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const backendUrl = process.env.BACKEND_URL || `http://localhost:${PORT}`;
console.log("BACKEND URL:", backendUrl);


// -------------------- MIDDLEWARE --------------------

// Enable Cross-Origin Resource Sharing
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "http://localhost:5173"   
];


app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
// Parse JSON request bodies
app.use(express.json());

// -------------------- STATIC FILE SERVING --------------------

// Serve images like portfolioBanner.jpeg from the 'utils' folder
app.use('/utils', express.static(path.join(__dirname, 'utils')));

// Serve resume PDF from the 'public/files' folder
app.use('/files', express.static(path.join(__dirname, 'public/files')));

// -------------------- EMAIL CONFIGURATION --------------------

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your email password or app password
  }
});

// -------------------- API ROUTES --------------------

// Home API - basic profile info
app.get('/api/home', (req, res) => {
  res.json({
    name: "Haroon Ahmed",
    role: "Full Stack Developer (MERN / Python)",
    bannerImage: `${backendUrl}/utils/portfolioBanner.jpeg`
  });
});

// About API - personal introduction
app.get('/api/about', (req, res) => {
  res.json({
    about: `My interest in software development began during my college days, and it gradually grew from a simple curiosity into a clear goal — to one day build my own SaaS product. To achieve that, I started learning full stack web development and applied my skills through internships, where I gained valuable hands-on experience in real-world software projects. Now, I am looking to join a team that values learning, creativity, and innovation — a place where I can grow while contributing meaningfully.`
  });
});

// Skills API - tech stack
app.get('/api/skills', (req, res) => {
  res.json({
    languages: ["Python", "JavaScript"],
    frontend: ["HTML", "Tailwind CSS", "React JS"],
    backend: ["Express", "Django", "Django REST"],
    database: ["MongoDB", "MySQL"],
    versionControl: ["Git", "GitHub"]
  });
});

// Projects API - project list
app.get('/api/projects', (req, res) => {
  res.json([
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

// Resume API - return resume URL
app.get('/api/resume', (req, res) => {
  res.json({
    resumeURL: `${backendUrl}/files/Haroon_Ahmed_Resume.pdf`
  });
});

// Email API - send email to user
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for reaching out! - Haroon Ahmed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Hello ${name}!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Thank you for visiting my portfolio!</h2>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              Hi ${name},
            </p>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              Thank you so much for taking the time to explore my portfolio and reach out to me. 
              I really appreciate your interest in my work and would love to connect with you!
            </p>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              Let's connect and stay in touch. I'm always excited to discuss new opportunities, 
              collaborate on interesting projects, or simply chat about technology and development.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
              <ul style="color: #666; line-height: 1.6;">
                <li>I'll get back to you within 24 hours</li>
                <li>Feel free to check out my projects on GitHub</li>
                <li>Connect with me on LinkedIn for professional updates</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              Thank you again for spending your time getting to know me and my work. 
              I look forward to hearing from you soon!
            </p>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              Best regards,<br>
              <strong style="color: #667eea;">Haroon Ahmed</strong><br>
              <em>Full Stack Developer (MERN / Python)</em>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px;">
            <p style="color: #999; font-size: 14px;">
              This email was sent from Haroon Ahmed's Portfolio Contact Form
            </p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully!'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});

// Health Check API - default home route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running!' });
});


app.get('/test-image', (req, res) => {
  res.sendFile(path.join(__dirname, 'utils', 'portfolioBanner.jpeg'));
});


// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
  console.log(`📧 Email service configured`);
  console.log(`📁 Static files served from utils and public/files`);
});