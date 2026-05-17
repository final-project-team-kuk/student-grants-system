const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
// התיקון: שינינו ל-require והתאמנו את שם הקובץ המדויק!
const requestRoutes = require('./routes/requestRouters.js');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', studentRoutes);
app.use('/api/requests', requestRoutes); // הצינור המרכזי של הבקשות שלך מחובר!

// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});