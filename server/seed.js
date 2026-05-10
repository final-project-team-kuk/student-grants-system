const mongoose = require("mongoose");
require("dotenv").config();

// 1. ייבוא המודלים (התבניות של הנתונים)
// (שימי לב: אם המודלים שלך נמצאים בתיקיית models ולא ב-db, תשני פה את הנתיב)
const User = require("./db/user"); 
const Request = require("./db/Request");

// 2. ייבוא קבצי הנתונים (קובצי ה-JSON שהכנו)
const usersData = require("./db/Users_Collection.json"); 
const requestsData = require("./db/Requests_Collection.json"); 

const importData = async () => {
  try {
    // 3. התחברות למונגו
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/student-grants";
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected for Seeding...");

    // 4. מחיקת נתונים ישנים משתי הקולקציות (כדי להתחיל מלוח חלק)
    await Request.deleteMany({});
    await User.deleteMany({});
    console.log("Old data cleared...");

    // 5. הכנסת הנתונים החדשים מהקבצים שלנו
    await Request.insertMany(requestsData);
    await User.insertMany(usersData);

    console.log("Data Imported Successfully! 🌱 Both Users and Requests are ready.");
    
    // סיום התהליך וסגירת החיבור
    process.exit(); 
  } catch (error) {
    console.error("Error with data import:", error);
    process.exit(1); 
  }
};

// הפעלת הפונקציה
importData();