import React from 'react';

export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-[#122843]/50 bg-[#071325]">
      {/* צד ימין - לוגו */}
      <div className="flex items-center gap-3">
        <div className="bg-[#1f4ea8] p-2 rounded-lg">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          </svg>
        </div>
        <span className="font-bold text-lg text-white">מערכת מענקים</span>
      </div>

      {/* מרכז - תפריט ניווט */}
      <div className="hidden md:flex gap-6 text-sm">
        <button 
          onClick={() => setCurrentPage('dashboard')}
          className={`transition px-4 py-1.5 rounded-full font-medium ${currentPage === 'dashboard' ? 'bg-[#1f4ea8]/20 text-[#E5DED0]' : 'text-[#cbd5ea] hover:text-white'}`}
        >
          דף הבית
        </button>
      </div>

      {/* צד שמאל - אזור אישי */}
      <div className="flex items-center gap-4">
        <button className="text-sm bg-[#0d2544] hover:bg-[#163a71] text-white px-4 py-1.5 rounded-lg border border-[#1f4ea8] transition">
          יציאה
        </button>
        <div className="flex items-center gap-3 bg-[#0d2544]/70 px-3 py-1.5 rounded-full border border-[#1f4ea8]">
          <span className="text-sm font-medium text-white">ישראל כהן</span>
          <div className="bg-[#1f4ea8] text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full">
            יכ
          </div>
        </div>
      </div>
    </nav>
  );
}