const NAME_REGEX = /^[\u0590-\u05FFa-zA-Z\s'-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── ה-Middleware של השרת ─────────────────────────────────────
module.exports = (req, res, next) => {
  const { firstName, lastName, idNumber, email, password } = req.body;

  // 1. בדיקת שם פרטי
  if (!firstName || !firstName.trim()) {
    return res.status(400).json({ error: "שם פרטי הוא שדה חובה" });
  }
  if (firstName.trim().length > 50) {
    return res.status(400).json({ error: "שם פרטי לא יכול לעלות על 50 תווים" });
  }
  if (!NAME_REGEX.test(firstName.trim())) {
    return res.status(400).json({ error: "שם פרטי יכול להכיל אותיות בלבד" });
  }

  // 2. בדיקת שם משפחה
  if (!lastName || !lastName.trim()) {
    return res.status(400).json({ error: "שם משפחה הוא שדה חובה" });
  }
  if (lastName.trim().length > 50) {
    return res.status(400).json({ error: "שם משפחה לא יכול לעלות על 50 תווים" });
  }
  if (!NAME_REGEX.test(lastName.trim())) {
    return res.status(400).json({ error: "שם משפחה יכול להכיל אותיות בלבד" });
  }

  // 3. בדיקת מספר זהות - בדיקה של 9 ספרות בלבד!
  if (!idNumber || !idNumber.trim()) {
    return res.status(400).json({ error: "מספר זהות הוא שדה חובה" });
  }
  if (!/^\d{9}$/.test(idNumber.trim())) {
    return res.status(400).json({ error: "מספר זהות חייב להכיל בדיוק 9 ספרות" });
  }

  // 4. בדיקת מייל
  if (!email || !email.trim()) {
    return res.status(400).json({ error: "כתובת מייל היא שדה חובה" });
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ error: "כתובת המייל אינה תקינה" });
  }

  // 5. בדיקת סיסמה
  if (!password) {
    return res.status(400).json({ error: "סיסמה היא שדה חובה" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "הסיסמה חייבת להכיל לפחות 8 תווים" });
  }
  if (password.length > 64) {
    return res.status(400).json({ error: "הסיסמה לא יכולה לעלות על 64 תווים" });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({ error: "הסיסמה חייבת להכיל לפחות אות גדולה אחת באנגלית" });
  }
  if (!/[a-z]/.test(password)) {
    return res.status(400).json({ error: "הסיסמה חייבת להכיל לפחות אות קטנה אחת באנגלית" });
  }
  if (!/\d/.test(password)) {
    return res.status(400).json({ error: "הסיסמה חייבת להכיל לפחות ספרה אחת" });
  }

  // אם הכל תקין, עוברים הלאה לקונטרולר שישמור במסד הנתונים
  next();
};