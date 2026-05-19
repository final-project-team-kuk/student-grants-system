const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');

require('dotenv').config();
const app = express();
app.use('/admin', adminRoutes);



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', studentRoutes);
app.use('/api', adminRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});