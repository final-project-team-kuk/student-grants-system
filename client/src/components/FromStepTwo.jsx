import React from 'react';
import { useForm } from 'react-hook-form'; // הייבוא של הספרייה החדשה

export default function FromStepTwo({ nextStep, prevStep, currentStep }) {
  
  // בדיקה שהתעודת זהות תקינה (לחבר לא חובר עדיין) 
  const isValidTZ = (id) => {
    if (!/^\d{9}$/.test(id)) return false;
    return Array.from(id, Number).reduce((acc, val, i) => {
      const step = val * ((i % 2) + 1);
      return acc + (step > 9 ? step - 9 : step);
    }, 0) % 10 === 0;
  };

  // הפעלת Hook Form
  const {
    register, // פונקציה ש"רושמת" את השדות למערכת המעקב
    handleSubmit, // פונקציה שעוטפת את פעולת השליחה ובודקת שהכל תקין
    formState: { errors } // אובייקט שמכיל את כל השגיאות, אם יש
  } = useForm();

  // הפונקציה שתרוץ *רק* אם כל הבדיקות עברו בהצלחה
  const onValidSubmit = (data) => {
    console.log("הנתונים תקינים:", data); // כאן תוכלי בהמשך לשמור את הנתונים
    nextStep(); // עוברים לשלב הבא!
  };

  return (
    /* 🌟 כאן מתחיל העיצוב החדש והנקי: רק הקופסה הלבנה של הטופס! */
    <div className="bg-white border border-[#e2dfd8] rounded-2xl relative overflow-hidden shadow-sm" dir="rtl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#071325]/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="p-8">
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

        <div className="space-y-6">
          <div>
            <h3 className="text-[#071325] text-sm font-medium mb-4 pb-2 border-b border-[#d5c9b5]">פרטי האב</h3>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* שדה תעודת זהות */}
              <div>
                <label className="block text-sm text-[#071325] mb-2">מספר זהות <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="הזן מספר זהות" 
                  className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 ${errors.fatherId ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                  {...register("fatherId", { 
                    required: "שדה חובה",
                    pattern: { value: /^[0-9]{9}$/, message: "מספר זהות חייב להכיל בדיוק 9 ספרות" }
                  })}
                />
                {errors.fatherId && <p className="text-red-500 text-xs mt-1">{errors.fatherId.message}</p>}
              </div>

              {/* שדה שם משפחה */}
              <div>
                <label className="block text-sm text-[#071325] mb-2">שם משפחה <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="הזן שם משפחה" 
                  className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 ${errors.fatherLastName ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                  {...register("fatherLastName", { required: "יש להזין שם משפחה" })}
                />
                {errors.fatherLastName && <p className="text-red-500 text-xs mt-1">{errors.fatherLastName.message}</p>}
              </div>

              {/* שדה שם פרטי */}
              <div className="md:col-span-2">
                <label className="block text-sm text-[#071325] mb-2">שם פרטי <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="הזן שם פרטי" 
                  className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 ${errors.fatherFirstName ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                  {...register("fatherFirstName", { required: "יש להזין שם פרטי" })}
                />
                {errors.fatherFirstName && <p className="text-red-500 text-xs mt-1">{errors.fatherFirstName.message}</p>}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* כפתורי הניווט בתחתית הקופסה */}
      <div className="bg-gray-50 border-t border-[#e2dfd8] px-8 py-6 flex items-center justify-between mt-4 rounded-b-2xl">
        <button
          onClick={prevStep}
          type="button"
          className="flex items-center gap-2 px-6 py-2.5 text-[#071325] font-medium border-2 border-[#071325] rounded-xl hover:bg-[#071325] hover:text-white transition-all duration-200 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>חזור לשלב הקודם</span>
        </button>

        <button
          onClick={handleSubmit(onValidSubmit)}
          type="button"
          className="flex items-center gap-2 px-8 py-2.5 bg-[#071325] text-white font-medium rounded-xl hover:bg-[#071325]/80 shadow-lg shadow-[#071325]/20 transition-all duration-200 cursor-pointer"
        >
          <span>המשך לשלב הבא</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}