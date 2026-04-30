import React, { useState } from 'react';
import './App.css';

import { MainComponent } from './components/MainComponent';
import Navbar from './components/NavBar.jsx';
import Dashboard from './components/Dashboard.jsx';
import FormStepTwo from './components/FromStepTwo.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#f4f2ec] font-sans" dir="rtl">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main>
        {currentPage === 'dashboard' && (
          <Dashboard setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'form' && <FormStepTwo />}

        {currentPage === 'main' && <MainComponent />}
      </main>
    </div>
  );
}

export default App;
