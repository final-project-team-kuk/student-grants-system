import React from 'react';

export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-[#15202b]">
      {/* צד ימין - לוגו */}
      <div className="flex items-center gap-3">
        <div className="bg-[#8b5cf6] p-2 rounded-lg">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          </svg>
        </div>
        <span className="font-bold text-lg text-white">מערכת מענקים</span>
      </div>

      {/* מרכז - תפריט ניווט */}
      <div className="hidden md:flex gap-6 text-sm">
        <button className="text-gray-400 hover:text-white transition">סטטוס בקשה</button>
        <button 
          onClick={() => setCurrentPage('form')}
          className={`transition px-4 py-1.5 rounded-full font-medium ${currentPage === 'form' ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]' : 'text-gray-400 hover:text-white'}`}
        >
          הגשת בקשה
        </button>
        <button 
          onClick={() => setCurrentPage('dashboard')}
          className={`transition px-4 py-1.5 rounded-full font-medium ${currentPage === 'dashboard' ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]' : 'text-gray-400 hover:text-white'}`}
        >
          דף הבית
        </button>
      </div>

      {/* צד שמאל - אזור אישי */}
      <div className="flex items-center gap-4">
        <button className="text-sm bg-gray-800 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg border border-gray-700 transition">
          יציאה
        </button>
        <div className="flex items-center gap-3 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
          <span className="text-sm font-medium text-white">ישראל כהן</span>
          <div className="bg-[#8b5cf6] text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full">
            יכ
          </div>
        </div>
      </div>
    </nav>
  );
}