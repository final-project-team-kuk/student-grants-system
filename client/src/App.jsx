import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { MainComponent } from './components/MainComponent'
import AdminRequests from './components/AdminRequests';
function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
<AdminRequests />    
</>
  )
}

export default App
