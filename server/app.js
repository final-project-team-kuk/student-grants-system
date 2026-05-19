const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const requestRoutes = require('./routes/requestRoutes');
// 1. מייבאים את הראוטים של ה-Auth (הם היו חסרים פה!)
const authRoutes = require('./routes/authRoutes'); 

require('dotenv').config();
const app = express();
app.use('/admin', adminRoutes);



// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
// 2. מחברים את הראוטים של ה-Auth לנתיב שהפרונטאנד מחפש (/api/auth)
app.use('/api/auth', authRoutes); 
app.use('/api', studentRoutes);
app.use('/api', requestRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});