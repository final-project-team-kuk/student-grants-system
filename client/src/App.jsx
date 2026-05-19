import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { MainComponent } from './components/MainComponent'
import AdminRequests from './components/AdminRequests';
import React from 'react';
import './App.css';
import { Router } from './components/routing/Router';

function App() {
    const [count, setCount] = useState(0)

  return <Router />;
}

export default App;
