require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;

// Ensure JWT secret is configured
if (!JWT_SECRET) {
  console.error('❌ NEXTAUTH_SECRET or AUTH_SECRET not configured in .env file');
  console.log('Please set NEXTAUTH_SECRET in your backend/.env file');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// JWT validation middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};

// Optional JWT middleware (doesn't fail if no token)
const optionalJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded;
      }
    });
  }
  next();
};

// Health check endpoints
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/healthz', (_req, res) => res.json({ 
  status: 'ok',
  timestamp: new Date().toISOString(),
  uptime: process.uptime(),
}));

// Token/session validation endpoint
app.get('/api/v1/validate-token', authenticateJWT, (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

// API routes
app.get('/api/v1/hello', optionalJWT, (req, res) => {
  res.json({
    message: 'Hello from LMS backend',
    user: req.user || null,
  });
});

// Protected route example
app.get('/api/v1/protected', authenticateJWT, (req, res) => {
  res.json({
    message: 'This is a protected route',
    user: req.user,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server is running on port ${PORT}`);
  console.log(`🔧 Health check: http://localhost:${PORT}/healthz`);
  console.log(`🌍 API endpoint: http://localhost:${PORT}/api/v1/hello`);
  console.log(`🔒 JWT Secret configured: ${JWT_SECRET ? '✅' : '❌'}`);
});

module.exports = app;
