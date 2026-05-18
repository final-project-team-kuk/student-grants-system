import React, { useEffect, useState } from 'react';
import './App.css';
import { Router } from './components/routing/Router';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('scholarshipAppUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('scholarshipAppUser');
        localStorage.removeItem('scholarshipAppToken');
      }
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('scholarshipAppToken', token);
    localStorage.setItem('scholarshipAppUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('scholarshipAppToken');
    localStorage.removeItem('scholarshipAppUser');
    setUser(null);
  };

  return <Router auth={{ user, login, logout }} />;
}

export default App;
