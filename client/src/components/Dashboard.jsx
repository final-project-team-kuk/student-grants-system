
import React from 'react';

export default function Dashboard({ setCurrentPage }) {
  return (
    <div className="min-h-screen bg-[#f4f2ec] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#071325] mb-2">שלום, ישראל 👋</h1>
          <p className="text-[#071325]">ברוך הבא למערכת ניהול בקשות המענקים האקדמיים</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* כרטיסיית הגשת בקשה */}
          <div
            onClick={() => setCurrentPage('form')}
            className="bg-white border border-[#e2dfd8] rounded-2xl p-8 hover:border-[#071325]/30 transition cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#071325]/5 blur-3xl rounded-full"></div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-[#071325] p-4 rounded-2xl mb-6 shadow-lg shadow-[#071325]/20 group-hover:scale-105 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#071325] mb-3">הגשת בקשה חדשה</h2>
              <p className="text-[#071325] text-sm mb-6 leading-relaxed">הגש בקשה למענק אקדמי. מלא את הפרטים האישיים, פרטי המשפחה, הלימודים והבנק.</p>
              <span className="text-[#071325] text-sm flex items-center gap-1">
                להגשת בקשה
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </span>
            </div>
          </div>

          {/* כרטיסיית סטטוס */}
          <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 hover:border-[#071325]/30 transition cursor-pointer relative overflow-hidden group">
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#071325]/5 blur-3xl rounded-full"></div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-[#071325] p-4 rounded-2xl mb-6 shadow-lg shadow-[#071325]/20 group-hover:scale-105 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#071325] mb-3">צפייה בסטטוס בקשה</h2>
              <p className="text-[#071325] text-sm mb-6 leading-relaxed">בדוק את מצב הבקשה האחרונה שהגשת ועקוב אחר התקדמות הטיפול בה.</p>
              <span className="text-[#071325] text-sm flex items-center gap-1 group-hover:text-[#1d4f8f] transition">
                לצפייה בסטטוס
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}