// server/index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed Origins Array
const allowedOrigins = [
  'http://localhost:5173',
  'https://taskmaster-app-pink.vercel.app',
  'https://taskmaster-app-git-main-hasanasiabd.vercel.app'
];

// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS Not Allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Task Management API is running...');
});

// Export for Vercel Serverless
module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}