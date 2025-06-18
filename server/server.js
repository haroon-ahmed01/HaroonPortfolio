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
  process.env.FRONTEND_URL?.replace('https://', 'https://www.'),
  "http://localhost:5173",
  "http://localhost:3000" // Add common dev ports
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all origins for static files in production
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
  })
);

// Parse JSON request bodies
app.use(express.json());

// Add global CORS headers for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// -------------------- STATIC FILE SERVING --------------------

// Serve images from the 'utils' folder with proper headers
app.use('/utils', express.static(path.join(__dirname, 'utils'), {
  setHeaders: (res, path, stat) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      'Content-Type': path.endsWith('.jpeg') || path.endsWith('.jpg') ? 'image/jpeg' : 
                     path.endsWith('.png') ? 'image/png' : 'application/octet-stream'
    });
  }
}));

// Serve resume PDF from the 'public/files' folder with proper headers
app.use('/files', express.static(path.join(__dirname, 'public/files'), {
  setHeaders: (res, path, stat) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Haroon_Ahmed_Resume.pdf"'
    });
  }
}));

// -------------------- EMAIL CONFIGURATION --------------------

// Create nodemailer transporter - FIXED: createTransport (not createTransporter)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your email password or app password
  }
});

// -------------------- API ROUTES --------------------

// Add this debug route to check your environment
app.get('/api/debug', (req, res) => {
  res.json({
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    NODE_ENV: process.env.NODE_ENV,
    imagePath: `${backendUrl}/utils/portfolioBanner.jpeg`,
    resumePath: `${backendUrl}/files/Haroon_Ahmed_Resume.pdf`
  });
});

// Home API - basic profile info with fallback image
app.get('/api/home', (req, res) => {
  // Use a professional stock photo from Pexels as fallback
  const fallbackImage = "https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg?auto=compress&cs=tinysrgb&w=400";
  const profileImage = `${backendUrl}/utils/portfolioBanner.jpeg`;
  
  res.json({
    name: "Haroon Ahmed",
    role: "Full Stack Developer (MERN / Python)",
    bannerImage: profileImage,
    fallbackImage: fallbackImage
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

// Resume API - return resume URL with fallback
app.get('/api/resume', (req, res) => {
  const resumeURL = `${backendUrl}/files/Haroon_Ahmed_Resume.pdf`;
  const fallbackURL = "https://drive.google.com/file/d/1SNkwxNiTFcaRwcYprkhUh59NcLKdOHZO/view?usp=sharing";
  
  res.json({
    resumeURL: resumeURL,
    fallbackURL: fallbackURL,
    directDownload: `${backendUrl}/files/Haroon_Ahmed_Resume.pdf?download=true`
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

// Test image route
app.get('/test-image', (req, res) => {
  const imagePath = path.join(__dirname, 'utils', 'portfolioBanner.jpeg');
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Image not found' });
    }
  });
});

// Test resume route  
app.get('/test-resume', (req, res) => {
  const resumePath = path.join(__dirname, 'public', 'files', 'Haroon_Ahmed_Resume.pdf');
  res.sendFile(resumePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Resume not found' });
    }
  });
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
  console.log(`📧 Email service configured`);
  console.log(`📁 Static files served from utils and public/files`);
  console.log(`🔗 Backend URL: ${backendUrl}`);
});