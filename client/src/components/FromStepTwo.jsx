import React, { useState } from 'react';

import { useForm } from 'react-hook-form';


export default function FromStepTwo({ nextStep, prevStep, currentStep, studentId }) {
  
  const steps = ['פרטים אישיים', 'פרטי משפחה', 'פרטי לימודים', 'פרטי בנק', 'העלאת קבצים', 'אישור ושליחה'];
  
 
  const [serverGeneralError, setServerGeneralError] = useState("");
  
  // נועל את כפתור השמירה ומונע לחיצות כפולות שישלחו פעמיים לשרת
  const [isSaving, setIsSaving] = useState(false);

  const isValidTZ = (id) => {
    // שלב 1: בדיקה שהקלט הוא בדיוק 9 ספרות ותו לא
    if (!/^\d{9}$/.test(id)) return false;
    // שלב 2: חישוב אלגוריתם לוהן (Luhn) מותאם לישראל
    return Array.from(id, Number).reduce((acc, val, i) => {
      const step = val * ((i % 2) + 1); // כפל ב-1 לזוגי, ב-2 לאי-זוגי
      return acc + (step > 9 ? step - 9 : step); // אם > 9 מחסירים 9
    }, 0) % 10 === 0; // הסכום חייב להתחלק ב-10
  };

 
  const {
    register,     // פונקציה: מחברת כל input לניהול הטופס + מגדירה חוקי validation
    handleSubmit, // פונקציה: רצה את הvalidation, ואם הכל תקין קוראת ל-onValidSubmit
    setError,     // פונקציה: מאפשרת להזריק שגיאה לשדה ספציפי מהשרת
    formState: { errors } // אובייקט: { fatherId: {message: "..."}, fatherLastName: {...} }
  } = useForm();

  // =====================================
  // הפונקציה הראשית - רצה רק אחרי שהvalidation בצד הלקוח עבר!
  // handleSubmit של react-hook-form קורא לה רק אם אין שגיאות
  // =====================================
  const onValidSubmit = async (data) => {
    // data הוא אובייקט עם כל ערכי הטופס: { fatherId, fatherFirstName, fatherLastName }
    
    // שלב 1: ניקוי שגיאות ישנות ונעילת הכפתור
    setServerGeneralError(""); // מנקה שגיאת שרת קודמת אם הייתה
    setIsSaving(true);         // נועל את הכפתור - מונע שליחה כפולה

 
    const serverPayload = {
      family: {
        father: {
          id: data.fatherId,           // תואם ל: family.father.id בסכמה
          firstName: data.fatherFirstName, // תואם ל: family.father.firstName בסכמה
          lastName: data.fatherLastName    // תואם ל: family.father.lastName בסכמה
        }
      }
    };

    try {
    
      const response = await fetch(`http://localhost:5000/api/requests/${studentId}/family`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // אומר לשרת לפרסר את הbody כ-JSON
        },
        body: JSON.stringify(serverPayload), // הופך את האובייקט למחרוזת JSON
      });

      // שלב 4: קריאת תשובת השרת
      // response.json() מחזיר Promise שמכיל את הJSON שהשרת שלח חזרה
      const result = await response.json();

      // שלב 5: בדיקה אם השרת החזיר שגיאה
      // response.ok הוא true רק אם status code בין 200-299
      if (!response.ok) {
        // שגיאה ספציפית: תעודת זהות כבר קיימת במערכת (409 = Conflict)
        // השרת החזיר status 409, אנחנו מזריקים את השגיאה ישירות לתוך שדה fatherId
        // כך הודעת השגיאה תופיע מתחת לשדה ולא בבנר הכללי
        if (response.status === 409) {
          setError("fatherId", {
            type: "server",
            message: "מספר תעודת זהות זה כבר רשום במערכת (בדיקת שרת)"
          });
          return; // עוצרים כאן - לא עוברים לשלב הבא
        }
        
        // שגיאה כללית אחרת מהשרת - זורקים throw שיתפס ב-catch
        throw new Error(result.error || "שגיאה בשמירת הנתונים בשרת");
      }

      // שלב 6: הצלחה! הנתונים נשמרו במונגו
      console.log("✅ נשמר בהצלחה במונגו:", result);
      // רק עכשיו עוברים לשלב הבא - רק אחרי אישור מהשרת!
      nextStep();
      
    } catch (err) {
      // כל שגיאה שנזרקה (רשת, שרת קרס, וכו') מופיעה בבנר הכללי
      setServerGeneralError(err.message);
    } finally {
      // finally רץ תמיד - גם אם הצלחנו וגם אם נכשלנו
      // משחרר את נעילת הכפתור בכל מקרה
      setIsSaving(false);
    }
  };

  // =====================================
  // ה-JSX - מה שמוצג על המסך
  // =====================================
  return (
    <div className="min-h-screen bg-[#f4f2ec] py-12" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 pb-12">
        
        {/* ====== STEPPER ====== */}
        {/* הסטפר הויזואלי - מציג את השלבים עם עיגולים ממוספרים */}
        {/* הקו האפור הוא הרקע (כל השלבים), הקו הכהה הוא ההתקדמות */}
        <div className="flex justify-between items-center mb-12 relative px-4">
          {/* קו רקע אפור - מתפרש על כל השלבים */}
          <div className="absolute top-4 left-8 right-8 h-[2px] bg-[#d5c9b5] -z-10"></div>
          {/* קו התקדמות כהה - 20% = שלב 2 מתוך 6 הושלם (1/6 ≈ 16%, עיגול לEשלב הבא)  */}
          <div className="absolute top-4 right-8 w-[20%] h-[2px] bg-[#071325] -z-10"></div>

          {/* לולאה על מערך השלבים - יוצרת עיגול ותווית לכל שלב */}
          {steps.map((step, index) => {
            const stepNum = index + 1; // 1-6
            const isActive = stepNum === currentStep;      // השלב הנוכחי שאנחנו בו
            const isCompleted = stepNum < currentStep;     // שלבים שכבר סיימנו

            return (
              <div key={stepNum} className="flex flex-col items-center gap-2">
                {/* העיגול: 3 מצבים - הושלם (כהה + ✓), פעיל (לבן עם גבול כהה), עתידי (אפור) */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                  isCompleted 
                    ? 'bg-[#071325] border-[#071325] text-white'      // הושלם - כהה עם ✓
                    : isActive 
                      ? 'bg-white border-[#071325] text-[#071325]'    // פעיל - לבן עם גבול כהה
                      : 'bg-white border-[#d5c9b5] text-[#071325]'   // עתידי - לבן עם גבול אפור
                }`}>
                  {isCompleted ? '✓' : stepNum}
                </div>
                {/* תווית השלב מתחת לעיגול */}
                <span className="text-xs text-[#071325]">{step}</span>
              </div>
            );
          })}
        </div>

        {/* ====== FORM CONTAINER ====== */}
        <div className="bg-white border border-[#e2dfd8] rounded-2xl relative overflow-hidden shadow-sm">
          <div className="p-8">
            
            {/* כותרת הטופס עם אייקון */}
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#071325]/15 p-3 rounded-xl border border-[#d5c9b5]">
                <svg className="w-6 h-6 text-[#071325]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#071325]">פרטי משפחה</h2>
                <p className="text-[#071325] text-sm">שלב 2 מתוך 6 - פרטי הורים ואחים</p>
              </div>
            </div>

            {/* ====== בנר שגיאת שרת כללית ====== */}
            {/* מוצג רק כש-serverGeneralError אינו מחרוזת ריקה */}
            {/* לדוגמה: "שגיאה פנימית בשרת" או "בעיית חיבור לרשת" */}
            {serverGeneralError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                {serverGeneralError}
              </div>
            )}

            {/* ====== שדות הטופס ====== */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[#071325] text-sm font-medium mb-4 pb-2 border-b border-[#d5c9b5]">פרטי האב</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* ====== שדה תעודת זהות ====== */}
                  <div>
                    <label className="block text-sm text-[#071325] mb-2">
                      מספר זהות <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="הזן מספר זהות" 
                      // שינוי צבע גבול לאדום אם יש שגיאה בשדה זה
                      className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] ${
                        errors.fatherId 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#d5c9b5] focus:border-[#071325]'
                      }`}
                      // register מחבר את השדה ומגדיר 3 שכבות בדיקה:
                      // 1. required: חייב להיות מלא
                      // 2. pattern: regex - בדיוק 9 ספרות
                      // 3. validate: פונקציית isValidTZ - אלגוריתם ת"ז ישראלי
                      // הבדיקות רצות לפי הסדר - הראשונה שנכשלת מציגה את ה-message שלה
                      {...register("fatherId", { 
                        required: "שדה חובה",
                        pattern: { 
                          value: /^[0-9]{9}$/, 
                          message: "מספר זהות חייב להכיל בדיוק 9 ספרות" 
                        },
                        validate: {
                          isValidAlgorithm: (value) => 
                            isValidTZ(value) || "מספר תעודת הזהות אינו תקין לפי אלגוריתם המדינה"
                        }
                      })}
                    />
                    {/* הצגת הודעת שגיאה מתחת לשדה - מופיעה גם לשגיאות לקוח וגם לשגיאות שרת */}
                    {/* errors.fatherId מכיל גם שגיאות שהוזרקו ידנית עם setError */}
                    {errors.fatherId && (
                      <p className="text-red-500 text-xs mt-1">{errors.fatherId.message}</p>
                    )}
                  </div>

                  {/* ====== שדה שם משפחה ====== */}
                  <div>
                    <label className="block text-sm text-[#071325] mb-2">
                      שם משפחה <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="הזן שם משפחה" 
                      className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] ${
                        errors.fatherLastName 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#d5c9b5] focus:border-[#071325]'
                      }`}
                      // רק required - שם לא צריך בדיקת אלגוריתם
                      {...register("fatherLastName", { required: "יש להזין שם משפחה" })}
                    />
                    {errors.fatherLastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fatherLastName.message}</p>
                    )}
                  </div>

                  {/* ====== שדה שם פרטי ====== */}
                  {/* md:col-span-2 = תופס את שתי העמודות במסכים רחבים */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#071325] mb-2">
                      שם פרטי <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="הזן שם פרטי" 
                      className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] ${
                        errors.fatherFirstName 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#d5c9b5] focus:border-[#071325]'
                      }`}
                      {...register("fatherFirstName", { required: "יש להזין שם פרטי" })}
                    />
                    {errors.fatherFirstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fatherFirstName.message}</p>
                    )}
                  </div>

            </div>
          </div>
        </div>
      </div>

          {/* ====== כפתורים ====== */}
          <div className="bg-gray-50 border-t border-[#e2dfd8] px-8 py-6 flex items-center justify-between mt-4 rounded-b-2xl">
            
            {/* כפתור חזרה - לא עובר בvalidation, פשוט קורא ל-prevStep */}
            <button 
              onClick={prevStep} 
              type="button" 
              className="flex items-center gap-2 px-6 py-2.5 text-[#071325] font-medium border-2 border-[#071325] rounded-xl hover:bg-[#071325] hover:text-white transition-all duration-200 cursor-pointer"
            >
              <span>חזור לשלב הקודם</span>
            </button>

            {/* כפתור שמירה:
                - onClick: handleSubmit(onValidSubmit) = react-hook-form רץ תחילה validation,
                  ורק אם הכל תקין קורא ל-onValidSubmit עם הנתונים
                - disabled={isSaving}: נועל את הכפתור בזמן שהבקשה בטיסה לשרת
                - הטקסט משתנה בין "שומר בשרת..." ל"שמור והמשך לשלב הבא" */}
            <button
              onClick={handleSubmit(onValidSubmit)}
              type="button"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-2.5 bg-[#071325] text-white font-medium rounded-xl hover:bg-[#071325]/80 shadow-lg shadow-[#071325]/20 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              <span>{isSaving ? "שומר בשרת..." : "שמור והמשך לשלב הבא"}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}