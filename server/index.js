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

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('Task Management API is running...');
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});