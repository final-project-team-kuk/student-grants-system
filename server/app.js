require('dotenv').config(); // טוען את המשתנים מה-.env
const express = require('express');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const app = express();



// app.use(cors()); // לאפשר ל-React לגשת לשרת
// התחברות למסד הנתונים
connectDB();

app.use(cors({
    origin: 'http://localhost:5175', // הכתובת של ה-Vite שלך לפי התמונה
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// הגדרות בסיסיות
app.use(express.json()); // מאפשר לשרת לקרוא JSON

// חיבור הנתיבים שלך
app.use('/api/admin', adminRoutes);

// הפעלת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


