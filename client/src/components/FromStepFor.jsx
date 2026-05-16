import React from 'react';

export default function BankDetailsStep({ formData, handleChange }) {
  // רשימת השלבים כדי לשמור על ה-Stepper עקבי
  const steps = ['פרטים אישיים', 'פרטי משפחה', 'פרטי לימודים', 'פרטי בנק', 'העלאת קבצים', 'אישור ושליחה'];

  return (
    <div className="min-h-screen bg-[#f4f2ec] py-12" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 pb-12">
        
        {/* כותרת הדף */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#071325] mb-2">הגשת בקשה למענק</h1>
          <p className="text-[#071325] text-sm">מלא את כל השלבים להגשת הבקשה</p>
        </div>

        {/* Stepper - מעודכן לשלב 4 */}
        <div className="flex justify-between items-center mb-12 relative px-4">
          <div className="absolute top-4 left-8 right-8 h-[2px] bg-[#d5c9b5] -z-10"></div>
          {/* קו התקדמות כחול עד שלב 4 */}
          <div className="absolute top-4 right-8 w-[60%] h-[2px] bg-[#071325] -z-10"></div>

          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isActive = stepNum === 4;
            const isCompleted = stepNum < 4;

            return (
              <div key={stepNum} className="flex flex-col items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                    isCompleted
                      ? 'bg-[#071325] border-[#071325] text-white'
                      : isActive
                      ? 'bg-white border-[#071325] text-[#071325]'
                      : 'bg-white border-[#d5c9b5] text-[#071325]'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span className={`text-xs ${isActive || isCompleted ? 'font-bold text-[#071325]' : 'text-[#071325] opacity-60'}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 relative overflow-hidden shadow-sm">
          {/* אפקט הבלור בפינה */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#071325]/5 blur-3xl rounded-full pointer-events-none"></div>

          {/* כותרת השלב עם האייקון */}
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#071325]/15 p-3 rounded-xl border border-[#d5c9b5]">
              <svg className="w-6 h-6 text-[#071325]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#071325]">פרטי בנק</h2>
              <p className="text-[#071325] text-sm">שלב 4 מתוך 6 - פרטי חשבון להעברת המענק</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-[#071325] text-sm font-medium mb-4 pb-2 border-b border-[#d5c9b5]">חשבון בנק לזיכוי</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* ת.ז בעל החשבון */}
<div className="md:col-span-2">
  <label className="block text-sm text-[#071325] mb-2 font-medium">ת.ז בעל החשבון <span className="text-red-500">*</span></label>
  <input
    type="text"
    name="accountHolderId" // שינינו ל-ID כדי שיתאים לתעודת זהות (ודאי מול ה-Backend אם הם מעדיפים שם שדה אחר)
    value={formData.accountHolderId || ''} 
    onChange={handleChange}
    placeholder="הזן מספר תעודת זהות (9 ספרות)"
    maxLength={9} // מונע הקלדה של יותר מ-9 ספרות
    className="w-full bg-white border border-[#d5c9b5] rounded-lg px-4 py-3 focus:outline-none focus:border-[#071325] transition text-sm text-[#071325] placeholder-[#071325]/40"
  />
</div>

{/* שם הבנק - רשימה נפתחת */}
<div>
  <label className="block text-sm text-[#071325] mb-2 font-medium">שם הבנק <span className="text-red-500">*</span></label>
  <select
    name="bankName"
    value={formData.bankName || ''} 
    onChange={handleChange}
    className="w-full bg-white border border-[#d5c9b5] rounded-lg px-4 py-3 focus:outline-none focus:border-[#071325] transition text-sm text-[#071325] appearance-none"
  >
    <option value="" disabled hidden>בחר בנק מהרשימה</option>
    <option value="לאומי">בנק לאומי (10)</option>
    <option value="הפועלים">בנק הפועלים (12)</option>
    <option value="דיסקונט">בנק דיסקונט (11)</option>
    <option value="מזרחי טפחות">בנק מזרחי טפחות (20)</option>
    <option value="בינלאומי">הבנק הבינלאומי (31)</option>
    <option value="יהב">בנק יהב (4) </option>
    <option value="מרכנתיל">בנק מרכנתיל דיסקונט (17)</option>
    <option value="מסד">בנק מסד (46)</option>
    <option value="פאגא">בנק פועלי אגודת ישראל (52)</option>
    <option value="ירושלים">בנק ירושלים (54)</option>
    <option value="וואן זירו">וואן זירו בנק דיגיטלי (18)</option>
  </select>
</div>
                {/* מספר סניף */}
                <div>
                  <label className="block text-sm text-[#071325] mb-2 font-medium">מספר סניף <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="branchNumber" // חשוב! השם הזה חייב להיות זהה לשם בשדה ב-DB
                    value={formData.branchNumber} // התיבה מציגה את מה שיש ב-formData
                    onChange={handleChange} // כשמקלידים, הפונקציה מעדכנת את formData
                    placeholder="הזן 3 ספרות של הסניף"
                    className="w-full bg-white border border-[#d5c9b5] rounded-lg px-4 py-3 focus:outline-none focus:border-[#071325] transition text-sm text-[#071325] placeholder-[#071325]/40"
                  />
                </div>

                {/* מספר חשבון */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-[#071325] mb-2 font-medium">מספר חשבון בנק <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="הזן את מספר החשבון"
                    className="w-full bg-white border border-[#d5c9b5] rounded-lg px-4 py-3 focus:outline-none focus:border-[#071325] transition text-sm text-[#071325] placeholder-[#071325]/40"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* כפתורי ניווט (אופציונלי - אם תרצי להוסיף בתחתית) */}
          <div className="mt-10 flex justify-between gap-4">
            <button className="px-8 py-3 bg-[#071325] text-white rounded-lg font-bold hover:bg-[#071325]/90 transition shadow-lg">המשך לשלב הבא</button>
            <button className="px-8 py-3 border border-[#d5c9b5] text-[#071325] rounded-lg font-bold hover:bg-[#f4f2ec] transition">חזור</button>
          </div>

        </div>
      </div>
    </div>
  );
}