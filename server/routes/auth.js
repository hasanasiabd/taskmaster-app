// server/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error('Registration Error Details:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });

    res.json({
      message: 'Logged in successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login Error Details:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Google Authentication Route
router.post('/google', async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    // ইউজার না থাকলে ডাটাবেজে নতুন ইউজার হিসেবে সেভ করা
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: "", // Google Login-এর ক্ষেত্রে পাসওয়ার্ড খালি থাকবে
        },
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });

    res.json({
      message: 'Google Sign-In successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Google Auth Error Details:', error);
    res.status(500).json({ message: 'Server error during Google login' });
  }
});

// Facebook Authentication Route
router.post('/facebook', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required from Facebook login' });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    // ইউজার না থাকলে ডাটাবেজে নতুন ইউজার হিসেবে সেভ করা
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || 'Facebook User',
          email,
          password: "", // Facebook Login-এর ক্ষেত্রেও পাসওয়ার্ড খালি থাকবে
        },
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });

    res.json({
      message: 'Facebook Sign-In successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Facebook Auth Error Details:', error);
    res.status(500).json({ message: 'Server error during Facebook login' });
  }
});


// GitHub Authentication Route
router.post('/github', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required from GitHub login' });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || 'GitHub User',
          email,
          password: '', // OAuth ইউজারের জন্য পাসওয়ার্ড ব্ল্যাঙ্ক থাকবে
        },
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });

    res.json({
      message: 'GitHub Sign-In successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('GitHub Auth Error Details:', error);
    res.status(500).json({ message: 'Server error during GitHub login' });
  }
});

// Microsoft Authentication Route
router.post('/microsoft', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required from Microsoft login' });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || 'Microsoft User',
          email,
          password: '',
        },
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });

    res.json({
      message: 'Microsoft Sign-In successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Microsoft Auth Error Details:', error);
    res.status(500).json({ message: 'Server error during Microsoft login' });
  }
});

module.exports = router;