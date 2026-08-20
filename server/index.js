// server/index.js

const express = require('express');
const dotenv = require('dotenv');

// রুট বা অন্য ফাইল ইম্পোর্ট করার আগেই dotenv কনফিগার করতে হবে
dotenv.config();

const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares - CORS-এ Frontend Vercel URL অনুমতি দেওয়া হলো
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://taskmaster-app-pink.vercel.app',
    'https://taskmaster-app-git-main-hasanasiabd.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('Task Management API is running...');
});

// Vercel Serverless এর জন্য Export
module.exports = app;

// Local Development-এর জন্য Listen (Serverless এ Vercel নিজে হ্যান্ডেল করবে)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}