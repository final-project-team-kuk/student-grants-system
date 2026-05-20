import React, { useState } from 'react';

export default function ({ formData, prevStep, onFinalSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(true);

  // שליפת שמות ופרטים אמיתיים מה-localStorage או מה-formData
  const studentFirstName = localStorage.getItem("firstName") || "";
  const studentLastName = localStorage.getItem("lastName") || "";
  const studentFullName = `${studentFirstName} ${studentLastName}`.trim() || formData.fullName || "סטודנט";
  const nationalId = localStorage.getItem("nationalId") || formData.idNumber || "לא הוכנס";

  const handleSubmit = async () => {
    if (!agreed) {
      alert("יש לאשר את נכונות הפרטים לפני השליחה.");
      return;
    }
    
    setIsSubmitting(true);
    await onFinalSubmit(); // מריץ את פונקציית השליחה הגלובלית שנגדיר באבא
    setIsSubmitting(false);
  };

  return (
    <div className="text-[#0d1b2a] font-['Heebo']" dir="rtl">
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Main Content Card */}
      <div className="card bg-white border border-[#0c1e36]/10 rounded-[24px] shadow-sm" style={{ padding: '40px' }}>
        <div className="card-header flex items-center gap-4 mb-8 pb-6 border-b border-[#0c1e36]/10">
          <div className="card-header-icon bg-gradient-to-br from-[#0c1e36] to-[#1d3557] rounded-[14px] flex items-center justify-center shadow-md shadow-[#0c1e36]/10" style={{ width: '48px', height: '48px' }}>
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-[#0c1e36]">אישור ושליחה</h3>
            <p className="text-[13px] text-[#0c1e36]/50 mt-0.5">שלב 6 מתוך 6 – בדוק את הפרטים ושלח</p>
          </div>
        </div>

        {/* Section 1: Personal Details */}
        <div className="summary-section mb-7">
          <div className="summary-title text-[14px] font-semibold text-[#0c1e36]/50 uppercase tracking-[0.5px] mb-3.5">פרטים אישיים</div>
          <div className="summary-grid grid grid-cols-2 gap-3">
            <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
              <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">שם מלא</div>
              <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">{studentFullName}</div>
            </div>
            <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
              <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">מספר זהות</div>
              <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">{nationalId}</div>
            </div>
            <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
              <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">עיר מגורים</div>
              <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">{formData.city || "לא הוכנס"}</div>
            </div>
            <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
              <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">טלפון נייד</div>
              <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">{formData.phone || "לא הוכנס"}</div>
            </div>
          </div>
        </div>

        <div className="divider h-[1px] bg-[#0c1e36]/10 my-6"></div>

        {/* Section 2: Academic Details */}
        <div className="summary-section mb-7">
          <div className="summary-title text-[14px] font-semibold text-[#0c1e36]/50 uppercase tracking-[0.5px] mb-3.5">פרטי לימודים</div>
          <div className="summary-grid grid grid-cols-2 gap-3">
            <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
              <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">מגמה / מסלול</div>
              <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">{formData.department || "לא הוכנס"}</div>
            </div>
            <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
              <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">מוסד לימודים</div>
              <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">{formData.institution || "לא הוכנס"}</div>
            </div>
            <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
              <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">שנת לימוד</div>
              <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">{formData.yearOfStudy || "לא הוכנס"}</div>
            </div>
            <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
              <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">שכר לימוד שנתי</div>
              <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">
                {formData.tuition ? `₪${Number(formData.tuition).toLocaleString()}` : "לא הוכנס"}
              </div>
            </div>
          </div>
        </div>

        <div className="divider h-[1px] bg-[#0c1e36]/10 my-6"></div>

        {/* Declarative Terms Checkbox */}
        <div className="confirm-checkbox flex items-start gap-3.5 bg-[#e9e2d5] border border-[#0c1e36]/20 rounded-[14px] mb-7 p-[18px_20px]">
          <input 
            type="checkbox" 
            id="confirm" 
            checked={agreed} 
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-5 h-5 accent-[#0c1e36] mt-0.5 shrink-0 cursor-pointer" 
          />
          <label htmlFor="confirm" className="text-[14px] text-[#0c1e36] leading-[1.6] font-medium cursor-pointer select-none">
            אני מאשר/ת כי כל הפרטים שמסרתי בטופס זה נכונים ומדויקים, וכי המסמכים שהועלו הם מקוריים ותקפים.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="form-actions flex justify-between items-center pt-2">
          <div className="actions-left flex gap-3">
            <button 
              onClick={prevStep} 
              className="btn-secondary bg-white border border-[#0c1e36]/20 rounded-[12px] text-[#0c1e36] text-[15px] font-medium cursor-pointer transition-all duration-200 hover:bg-[#0c1e36]/5" style={{ padding: '12px 24px' }}>
              ← הקודם
            </button>
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className={`btn-submit bg-[#0c1e36] border border-transparent rounded-[12px] text-white text-[16px] font-bold cursor-pointer transition-all duration-300 hover:bg-[#1d3557] shadow-lg shadow-[#0c1e36]/10 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
            style={{ padding: '13px 36px' }}
          >
            {isSubmitting ? 'שולח בקשה...' : 'שליחת הבקשה ✓'}
          </button>
        </div>
      </div>
    </div>
  );
}
// export default function SubmitRequestStep() {
//   // פונקציות עזר זמניות למקרה לחבר לוגיקה בהמשך
//   const handleLogout = () => {
//     console.log("Logout clicked");
//   };

//   const handlePrev = () => {
//     console.log("Previous step clicked");
//   };

//   const handleCancel = () => {
//     console.log("Cancel clicked");
//   };

//   const handleSubmit = () => {
//     console.log("Submit request clicked");
//   };

//   return (
//     <div className="bg-[#ece6db] min-h-screen text-[#0d1b2a] font-['Heebo']">
//       {/* הזרקת הפונט והסגנון הייחודי של ה-Stepper */}
//       <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
//       <style>{`
//         @media (min-width: 640px) {
//           .step-connector:not(:last-child):before {
//             content: '';
//             position: absolute;
//             top: 18px;
//             right: calc(50% + 18px);
//             width: calc(100% - 36px);
//             height: 2px;
//             z-index: 0;
//           }
//         }
//       `}</style>

//       {/* Navigation Bar */}
//       <nav className="flex items-center justify-between bg-[#0c1e36] border-b border-white/10 sticky top-0 z-[100] text-white" style={{ padding: '20px 40px' }}>
//         <div className="nav-logo flex items-center gap-3">
//           <div className="nav-logo-icon bg-[#1d3557] border border-white/10 rounded-[10px] flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
//             <svg className="w-[22px] h-[22px] fill-white" viewBox="0 0 24 24">
//               <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
//             </svg>
//           </div>
//           <span className="text-[17px] font-bold text-white">מערכת מענקים</span>
//         </div>
//         <div className="nav-links flex items-center gap-2">
//           <a className="nav-link text-white/70 text-[15px] font-medium cursor-pointer" style={{ padding: '8px 18px' }}>דף הבית</a>
//           <a className="nav-link bg-white/10 text-white rounded-[10px] text-[15px] font-medium cursor-pointer" style={{ padding: '8px 18px' }}>הגשת בקשה</a>
//           <a className="nav-link text-white/70 text-[15px] font-medium cursor-pointer" style={{ padding: '8px 18px' }}>סטטוס בקשה</a>
//         </div>
//         <div className="nav-user flex items-center gap-3">
//           <div className="user-badge flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-[12px]" style={{ padding: '8px 16px' }}>
//             <div className="user-avatar bg-[#e2dcd0] text-[#0c1e36] rounded-full flex items-center justify-center text-[13px] font-bold" style={{ width: '32px', height: '32px' }}>יכ</div>
//             <span className="user-name text-[14px] font-medium text-white">ישראל כהן</span>
//           </div>
//           <button onClick={handleLogout} className="btn-logout bg-white/5 border border-white/10 rounded-[10px] text-white/70 text-[14px] cursor-pointer" style={{ padding: '8px 16px' }}>יציאה</button>
//         </div>
//       </nav>

//       {/* Main Content Container */}
//       <main className="max-w-[780px] my-0 mx-auto" style={{ padding: '48px 24px' }}>
//         <div className="page-title mb-[36px]">
//           <h2 className="text-[28px] font-bold text-[#0c1e36]">הגשת בקשה למענק</h2>
//           <p className="text-[#0c1e36]/60 text-[15px] mt-1.5">מלא את כל השלבים להגשת הבקשה</p>
//         </div>

//         {/* Stepper Progress Bar */}
//         <div className="stepper flex items-start mb-10 overflow-hidden">
//           <div className="step step-connector flex flex-col items-center gap-2 flex-1 relative before:bg-[#0c1e36]">
//             <div className="step-circle w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold bg-[#0c1e36] border-2 border-[#0c1e36] text-white relative z-10" style={{ width: '36px', height: '36px' }}>✓</div>
//             <span className="step-label text-[12px] text-[#0c1e36]/70 font-medium whitespace-nowrap">פרטים אישיים</span>
//           </div>
//           <div className="step step-connector flex flex-col items-center gap-2 flex-1 relative before:bg-[#0c1e36]">
//             <div className="step-circle w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold bg-[#0c1e36] border-2 border-[#0c1e36] text-white relative z-10" style={{ width: '36px', height: '36px' }}>✓</div>
//             <span className="step-label text-[12px] text-[#0c1e36]/70 font-medium whitespace-nowrap">פרטי משפחה</span>
//           </div>
//           <div className="step step-connector flex flex-col items-center gap-2 flex-1 relative before:bg-[#0c1e36]">
//             <div className="step-circle w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold bg-[#0c1e36] border-2 border-[#0c1e36] text-white relative z-10" style={{ width: '36px', height: '36px' }}>✓</div>
//             <span className="step-label text-[12px] text-[#0c1e36]/70 font-medium whitespace-nowrap">פרטי לימודים</span>
//           </div>
//           <div className="step step-connector flex flex-col items-center gap-2 flex-1 relative before:bg-[#0c1e36]">
//             <div className="step-circle w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold bg-[#0c1e36] border-2 border-[#0c1e36] text-white relative z-10" style={{ width: '36px', height: '36px' }}>✓</div>
//             <span className="step-label text-[12px] text-[#0c1e36]/70 font-medium whitespace-nowrap">פרטי בנק</span>
//           </div>
//           <div className="step step-connector flex flex-col items-center gap-2 flex-1 relative before:bg-[#0c1e36]">
//             <div className="step-circle w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold bg-[#0c1e36] border-2 border-[#0c1e36] text-white relative z-10" style={{ width: '36px', height: '36px' }}>✓</div>
//             <span className="step-label text-[12px] text-[#0c1e36]/70 font-medium whitespace-nowrap">העלאת קבצים</span>
//           </div>
//           <div className="step flex flex-col items-center gap-2 flex-1 relative active">
//             <div className="step-circle w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold bg-gradient-to-br from-[#0c1e36] to-[#1d3557] border-2 border-[#0c1e36] text-white relative z-10 shadow-[0_0_0_4px_rgba(12,30,54,0.15)]" style={{ width: '36px', height: '36px' }}>6</div>
//             <span className="step-label text-[12px] text-[#0c1e36] font-bold whitespace-nowrap">אישור ושליחה</span>
//           </div>
//         </div>

//         {/* Main Content Card */}
//         <div className="card bg-white border border-[#0c1e36]/10 rounded-[24px] shadow-sm" style={{ padding: '40px' }}>
//           <div className="card-header flex items-center gap-4 mb-8 pb-6 border-b border-[#0c1e36]/10">
//             <div className="card-header-icon bg-gradient-to-br from-[#0c1e36] to-[#1d3557] rounded-[14px] flex items-center justify-center shadow-md shadow-[#0c1e36]/10" style={{ width: '48px', height: '48px' }}>
//               <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
//                 <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
//               </svg>
//             </div>
//             <div>
//               <h3 className="text-[20px] font-bold text-[#0c1e36]">אישור ושליחה</h3>
//               <p className="text-[13px] text-[#0c1e36]/50 mt-0.5">שלב 6 מתוך 6 – בדוק את הפרטים ושלח</p>
//             </div>
//           </div>

//           {/* Section 1: Personal Details */}
//           <div className="summary-section mb-7">
//             <div className="summary-title text-[14px] font-semibold text-[#0c1e36]/50 uppercase tracking-[0.5px] mb-3.5">פרטים אישיים</div>
//             <div className="summary-grid grid grid-cols-2 gap-3">
//               <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
//                 <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">שם מלא</div>
//                 <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">ישראל כהן</div>
//               </div>
//               <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
//                 <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">מספר זהות</div>
//                 <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">123456789</div>
//               </div>
//               <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
//                 <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">עיר מגורים</div>
//                 <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">ירושלים</div>
//               </div>
//               <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
//                 <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">טלפון נייד</div>
//                 <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">050-1234567</div>
//               </div>
//             </div>
//           </div>

//           <div className="divider h-[1px] bg-[#0c1e36]/10 my-6"></div>

//           {/* Section 2: Academic Details */}
//           <div className="summary-section mb-7">
//             <div className="summary-title text-[14px] font-semibold text-[#0c1e36]/50 uppercase tracking-[0.5px] mb-3.5">פרטי לימודים</div>
//             <div className="summary-grid grid grid-cols-2 gap-3">
//               <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
//                 <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">מגמה</div>
//                 <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">מדעי המחשב</div>
//               </div>
//               <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
//                 <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">מוסד לימודים</div>
//                 <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">האוניברסיטה העברית</div>
//               </div>
//               <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
//                 <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">שנות לימוד</div>
//                 <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">3</div>
//               </div>
//               <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
//                 <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">שכר לימוד שנתי</div>
//                 <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">₪14,500</div>
//               </div>
//             </div>
//           </div>

//           <div className="divider h-[1px] bg-[#0c1e36]/10 my-6"></div>

//           {/* Declarative Terms Checkbox */}
//           <div className="confirm-checkbox flex items-start gap-3.5 bg-[#e9e2d5] border border-[#0c1e36]/20 rounded-[14px] mb-7 cursor-pointer" style={{ padding: '18px 20px' }}>
//             <input type="checkbox" id="confirm" defaultChecked className="w-5 h-5 accent-[#0c1e36] mt-0.5 shrink-0 cursor-pointer" />
//             <label htmlFor="confirm" className="text-[14px] text-[#0c1e36] leading-[1.6] font-medium cursor-pointer">
//               אני מאשר/ת כי כל הפרטים שמסרתי בטופס זה נכונים ומדויקים, וכי המסמכים שהועלו הם מקוריים ותקפים.
//             </label>
//           </div>

//           {/* Action Buttons */}
//           <div className="form-actions flex justify-between items-center pt-2">
//             <div className="actions-left flex gap-3">
//               <button onClick={handlePrev} className="btn-secondary bg-white border border-[#0c1e36]/20 rounded-[12px] text-[#0c1e36] text-[15px] font-medium cursor-pointer transition-all duration-200 hover:bg-[#0c1e36]/5" style={{ padding: '12px 24px' }}>← הקודם</button>
//               <button onClick={handleCancel} className="btn-cancel bg-transparent border border-red-200 rounded-[12px] text-red-600 text-[15px] font-medium cursor-pointer transition-all duration-200 hover:bg-red-50" style={{ padding: '12px 24px' }}>ביטול</button>
//             </div>
//             <button onClick={handleSubmit} className="btn-submit bg-[#0c1e36] border border-transparent rounded-[12px] text-white text-[16px] font-bold cursor-pointer transition-all duration-300 hover:bg-[#1d3557] shadow-lg shadow-[#0c1e36]/10" style={{ padding: '13px 36px' }}>שליחת הבקשה ✓</button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }