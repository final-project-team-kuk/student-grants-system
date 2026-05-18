const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
<<<<<<< HEAD
const authRoutes = require('./routes/authRoutes.js');
=======
const requestRoutes = require('./routes/requestRoutes');
const { request } = require('node:http');
>>>>>>> 3d411bc842b81613299f048332684389050bf4e6
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', studentRoutes);
app.use('/api/requests', requestRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});