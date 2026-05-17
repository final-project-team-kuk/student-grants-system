
import Request from "../db/Request.js"; // ייבוא הסכימה המעולה שמצאנו קודם

// פונקציה לעדכון פרטי המשפחה (שלב 2)
export const updateFamilyStep = async (req, res) => {
  try {
    // 1. נשלוף את ה-ID של הבקשה מה-URL (למשל: /api/requests/77b1111...)
    const { requestId } = req.params; 
    
    // 2. המידע שמגיע מה-React (ה-Payload שעיצבנו)
    const { family } = req.body; 

    // בדיקה בסיסית: ודאות שהנתונים הגיעו
    if (!family || !family.father || !family.father.id) {
      return res.status(400).json({ error: "נתוני פרטי אב חסרים או לא מלאים" });
    }

    // 3. עדכון הנתונים בתוך מונגו!
    // אנחנו משתמשים ב-$set כדי לעדכן רק את האובייקט family בלי למחוק את שאר השלבים
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { $set: { family: family } },
      { new: true, runValidators: true } // new: true מחזיר את האובייקט המעודכן
    );

    // אם הבקשה לא קיימת בבסיס הנתונים
    if (!updatedRequest) {
      return res.status(404).json({ error: "הבקשה למענק לא נמצאה במערכת" });
    }

    // 4. החזרת תשובת הצלחה ל-React
    res.status(200).json({
      message: "פרטי המשפחה עודכנו בהצלחה בשרת!",
      request: updatedRequest
    });

  } catch (error) {
    console.error("Error in updateFamilyStep:", error);
    res.status(500).json({ error: "שגיאה פנימית בשרת בעת שמירת פרטי המשפחה" });
  }
};