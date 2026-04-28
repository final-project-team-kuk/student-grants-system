import React, { useState } from 'react';

// ייבוא תמונות ועיצוב (מהקוד הראשון)
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

// ייבוא קומפוננטות (משני הקבצים)
import { MainComponent } from './components/MainComponent';
import Navbar from './components/NavBar.jsx';
import Dashboard from './components/Dashboard.jsx';
import FormStepTwo from './components/FromStepTwo.jsx';

function App() {
  // משתנה מצב מהקוד הראשון (אפשר להשתמש בו אם תצטרכי בהמשך)
  const [count, setCount] = useState(0);

  // ניהול המצב - איזה דף אנחנו מראים כרגע
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#f4f2ec] font-sans" dir="rtl">
      {/* הניווט העליון מוצג בכל דף */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* כאן אנחנו מחליטים מה להראות למטה בהתאם למצב של currentPage */}
      <main>
        {currentPage === 'dashboard' && (
          <Dashboard setCurrentPage={setCurrentPage} />
        )}
        
        {currentPage === 'form' && (
          <FormStepTwo />
        )}

        {/* הנה הקומפוננטה מהקוד הראשון, שילבתי אותה כדף נוסף */}
        {currentPage === 'main' && (
          <MainComponent />
        )}
      </main>
    </div>
  );
}

export default App;