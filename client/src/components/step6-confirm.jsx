import React, { useState } from 'react';

/**
 * קומפוננטת סיכום ושליחת בקשה
 * מקבלת כ-Props את הפונקציות לניהול הניווט והשליחה
 */
export default function SubmitRequestStep({ prevStep, handleCancel, handleSubmit }) {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);

  // פונקציה לבדיקת השליחה
  const handleFinalClick = () => {
    if (!isChecked) {
      setError(true);
      return;
    }
    setError(false);
    handleSubmit();
  };
  
  return (
    <div className="card bg-white border border-[#0c1e36]/10 rounded-[24px] shadow-sm" style={{ padding: '40px' }}>
      {/* כותרת השלב */}
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
            <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">ישראל כהן</div>
          </div>
          <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
            <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">מספר זהות</div>
            <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">123456789</div>
          </div>
          <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
            <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">עיר מגורים</div>
            <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">ירושלים</div>
          </div>
          <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
            <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">טלפון נייד</div>
            <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">050-1234567</div>
          </div>
        </div>
      </div>

      <div className="divider h-[1px] bg-[#0c1e36]/10 my-6"></div>

      {/* Section 2: Academic Details */}
      <div className="summary-section mb-7">
        <div className="summary-title text-[14px] font-semibold text-[#0c1e36]/50 uppercase tracking-[0.5px] mb-3.5">פרטי לימודים</div>
        <div className="summary-grid grid grid-cols-2 gap-3">
          <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
            <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">מגמה</div>
            <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">מדעי המחשב</div>
          </div>
          <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
            <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">מוסד לימודים</div>
            <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">האוניברסיטה העברית</div>
          </div>
          <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
            <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">שנות לימוד</div>
            <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">3</div>
          </div>
          <div className="summary-item bg-[#e9e2d5]/40 border border-[#0c1e36]/5 rounded-[12px]" style={{ padding: '14px 16px' }}>
            <div className="summary-item-label text-[12px] text-[#0c1e36]/60 mb-1">שכר לימוד שנתי</div>
            <div className="summary-item-value text-[15px] font-medium text-[#0c1e36]">₪14,500</div>
          </div>
        </div>
      </div>

      <div className="divider h-[1px] bg-[#0c1e36]/10 my-6"></div>

      {/* Declarative Terms Checkbox */}
      <div className={`confirm-checkbox flex flex-col gap-2 p-4 rounded-[14px] mb-7 border transition-all ${error ? 'border-red-500 bg-red-50' : 'border-[#0c1e36]/20 bg-[#e9e2d5]'}`}>
        <div className="flex items-start gap-3.5 cursor-pointer" onClick={() => { setIsChecked(!isChecked); setError(false); }}>
          <input 
            type="checkbox" 
            checked={isChecked} 
            onChange={() => {}} 
            className="w-5 h-5 accent-[#0c1e36] mt-0.5 shrink-0 cursor-pointer" 
          />
          <label className="text-[14px] text-[#0c1e36] leading-[1.6] font-medium cursor-pointer">
            אני מאשר/ת כי כל הפרטים שמסרתי בטופס זה נכונים ומדויקים, וכי המסמכים שהועלו הם מקוריים ותקפים.
          </label>
        </div>
        {error && <p className="text-red-600 text-xs font-bold pr-9">חובה לסמן אישור זה כדי לשלוח את הבקשה</p>}
      </div>

      {/* Action Buttons - מחוברים לפונקציות מהאבא */}
      <div className="form-actions flex justify-between items-center pt-2">
        <div className="actions-left flex gap-3">
          <button onClick={prevStep} className="btn-secondary bg-white border border-[#0c1e36]/20 rounded-[12px] text-[#0c1e36] text-[15px] font-medium cursor-pointer transition-all duration-200 hover:bg-[#0c1e36]/5" style={{ padding: '12px 24px' }}>← הקודם</button>
          <button onClick={handleCancel} className="btn-cancel bg-transparent border border-red-200 rounded-[12px] text-red-600 text-[15px] font-medium cursor-pointer transition-all duration-200 hover:bg-red-50" style={{ padding: '12px 24px' }}>ביטול</button>
        </div>
        <button onClick={handleFinalClick} className="btn-submit bg-[#0c1e36] border border-transparent rounded-[12px] text-white text-[16px] font-bold cursor-pointer transition-all duration-300 hover:bg-[#1d3557] shadow-lg shadow-[#0c1e36]/10" style={{ padding: '13px 36px' }}>שליחת הבקשה ✓</button>
      </div>
    </div>
  );
}