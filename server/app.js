const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const requestRoutes = require('./routes/requestRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', requestRoutes);
app.get('/api/test-direct', (req, res) => res.send('Direct API test works'));

// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});