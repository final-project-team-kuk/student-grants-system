import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Dashboard from './Dashboard.jsx';
import FormStepTwo from './FromStepTwo.jsx';

function App() {
  // ניהול המצב - איזה דף אנחנו מראים כרגע
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#15202b] font-sans" dir="rtl">
      {/* הניווט העליון תמיד מוצג, ונעביר לו את הפונקציה שמשנה עמודים */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* כאן אנחנו מחליטים מה להראות למטה בהתאם לכפתור שנלחץ */}
      <main>
        {currentPage === 'dashboard' ? (
          <Dashboard setCurrentPage={setCurrentPage} />
        ) : (
          <FormStepTwo />
        )}
      </main>
    </div>
  );
}

export default App;