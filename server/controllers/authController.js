import User from "../models/User.js"; // ייבוא המודל של המשתמש
import bcrypt from "bcryptjs"; // ספריה להצפנת סיסמאות
import jwt from "jsonwebtoken"; // ליצירת טוקן אבטחה

// הרשמה
export const register = async (req, res) => {
  try {
    const { firstName, lastName, idNumber, password, email } = req.body;

    // 1. בדיקה אם המשתמש כבר קיים במערכת לפי תעודת זהות או מייל
    const existingUser = await User.findOne({ $or: [{ idNumber }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "משתמש עם פרטים אלו כבר קיים במערכת" });
    }

    // 2. הצפנת הסיסמה
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. יצירת משתמש חדש ושמירתו
    const newUser = new User({
      firstName,
      lastName,
      idNumber,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "ההרשמה בוצעה בהצלחה!" });
  } catch (error) {
    res.status(500).json({ error: "שגיאה בשרת בעת הניסיון להירשם" });
  }
};

// התחברות
export const login = async (req, res) => {
  try {
    const { idNumber, password } = req.body;

    // 1. חיפוש המשתמש לפי תעודת זהות
    const user = await User.findOne({ idNumber });
    if (!user) {
      return res.status(400).json({ error: "מספר זהות או סיסמה שגויים" });
    }

    // 2. השוואת הסיסמה המוזנת לסיסמה המוצפנת בבסיס הנתונים
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "מספר זהות או סיסמה שגויים" });
    }

    // 3. יצירת טוקן (JWT) לכניסה מאובטחת
    const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });

    res.status(200).json({
      message: "התחברת בהצלחה",
      token,
      user: { name: user.firstName + " " + user.lastName }
    });
  } catch (error) {
    res.status(500).json({ error: "שגיאה בשרת בעת הניסיון להתחבר" });
  }
};