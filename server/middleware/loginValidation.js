const ISRAEL_ID_LENGTH = 9;
const MAX_PASSWORD_LEN = 64;

// ── ה-Middleware של השרת עבור התחברות ─────────────────────────────
module.exports = (req, res, next) => {
  const { idNumber, password } = req.body;

  // 1. בדיקת מספר זהות
  if (!idNumber || !idNumber.trim()) {
    return res.status(400).json({ field: "idNumber", error: "מספר זהות הוא שדה חובה" });
  }
  if (!/^\d+$/.test(idNumber.trim())) {
    return res.status(400).json({ field: "idNumber", error: "מספר זהות חייב להכיל ספרות בלבד" });
  }
  if (idNumber.trim().length !== ISRAEL_ID_LENGTH) {
    return res.status(400).json({ field: "idNumber", error: `מספר זהות חייב להכיל בדיוק ${ISRAEL_ID_LENGTH} ספרות` });
  }

  // 2. בדיקת סיסמה
  if (!password) {
    return res.status(400).json({ field: "password", error: "סיסמה היא שדה חובה" });
  }
  if (password.length > MAX_PASSWORD_LEN) {
    return res.status(400).json({ field: "password", error: `הסיסמה לא יכולה לעלות על ${MAX_PASSWORD_LEN} תווים` });
  }

  // אם הכל עבר בהצלחה, ממשיכים לקונטרולר של הלוגין
  next();
};