
import React from 'react';
export default function AdminRequestDetails() {
  return (
    <div className="bg-[#ece6db] min-h-screen text-[#0d1b2a] font-['Heebo']">
      <nav className="flex items-center justify-between bg-[#0c1e36] border-b border-white/10 sticky top-0 z-[100] text-white px-10 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1d3557] border border-white/10 rounded-[10px] flex items-center justify-center">
            <svg className="w-[22px] h-[22px] fill-white" viewBox="0 0 24 24">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
          </div>
  <span className="text-[17px] font-bold text-white">
            מערכת מענקים
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a className="px-[18px] py-2 rounded-[10px] bg-white/10 text-white text-[15px] font-medium cursor-pointer">
            ניהול בקשות
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-[12px] px-4 py-2">
            <div className="w-8 h-8 bg-[#e2dcd0] text-[#0c1e36] rounded-full flex items-center justify-center text-[13px] font-bold">
              מנ
            </div>

            <span className="text-[14px] font-medium text-white">
              מנהל המערכת
            </span>
                  <span className="text-[11px] bg-white/10 text-white border border-white/20 rounded-[6px] px-2 py-[2px] font-semibold">
              מנהל
            </span>
          </div>

          <button className="bg-white/5 border border-white/10 rounded-[10px] text-white/70 text-[14px] px-4 py-2 cursor-pointer">
            יציאה
          </button>
        </div>
      </nav>

      <main className="max-w-[900px] mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[28px] font-bold text-[#0c1e36]">
              פרטי בקשה מלאים
            </h2>

            <p className="text-[#0c1e36]/60 text-[15px] mt-1">
              בקשה מספר #12345 - ישראל כהן
            </p>
          </div>

          <button className="bg-white border border-[#0c1e36]/20 rounded-[10px] text-[#0c1e36] text-[14px] font-medium px-5 py-2.5 cursor-pointer hover:bg-[#0c1e36]/5 transition-all">
            ← חזרה לרשימה
          </button>
        </div>

        <div className="bg-white border border-[#0c1e36]/10 rounded-[20px] shadow-sm p-8 mb-5">
          <div className="text-[14px] font-semibold text-[#0c1e36]/50 uppercase tracking-[0.5px] mb-5 pb-3 border-b border-[#0c1e36]/10">
            פרטים אישיים
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5"><div className="text-[12px] text-[#0c1e36]/60">מספר זהות</div><div className="text-[15px] font-medium">123456789</div></div>
            <div className="flex flex-col gap-1.5"><div className="text-[12px] text-[#0c1e36]/60">שם מלא</div><div className="text-[15px] font-medium">ישראל כהן</div></div>
            <div className="flex flex-col gap-1.5"><div className="text-[12px] text-[#0c1e36]/60">תאריך לידה</div><div className="text-[15px] font-medium">15/03/2002</div></div>
            <div className="flex flex-col gap-1.5"><div className="text-[12px] text-[#0c1e36]/60">עיר מגורים</div><div className="text-[15px] font-medium">ירושלים</div></div>
            <div className="flex flex-col gap-1.5"><div className="text-[12px] text-[#0c1e36]/60">כתובת</div><div className="text-[15px] font-medium">רחוב הרצל 25</div></div>
            <div className="flex flex-col gap-1.5"><div className="text-[12px] text-[#0c1e36]/60">טלפון נייד</div><div className="text-[15px] font-medium">050-1234567</div></div>
          </div>
        </div>

  <div className="bg-white border border-[#0c1e36]/10 rounded-[20px] shadow-sm p-8">
          <div className="text-[18px] font-bold text-[#0c1e36] mb-4">
            החלטה על הבקשה
          </div>

          <div className="text-[14px] text-[#0c1e36]/60 mb-6">
            בחר אם לאשר או לדחות את הבקשה
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-[#0c1e36] rounded-[14px] text-white text-[16px] font-bold px-4 py-4 hover:bg-[#1d3557] transition-all shadow-lg shadow-[#0c1e36]/10">
              אישור בקשה
            </button>

            <button className="flex-1 border border-[#0c1e36]/30 rounded-[14px] text-[#0c1e36] text-[16px] font-bold px-4 py-4 hover:bg-[#0c1e36]/5 transition-all">
              דחיית בקשה
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}