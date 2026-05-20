<<<<<<< HEAD
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ auth }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';
  const isAuthenticated = Boolean(auth?.user);

  const handleLogout = () => {
    auth?.logout?.();
    navigate('/');
  };

  // ─── FIX: backend returns { firstName, lastName } — build display name ──────
  const displayName = auth?.user
    ? `${auth.user.firstName ?? ''} ${auth.user.lastName ?? ''}`.trim()
    : '';

  // Initials for the avatar bubble
  const initials = auth?.user
    ? `${auth.user.firstName?.[0] ?? ''}${auth.user.lastName?.[0] ?? ''}`.toUpperCase() || 'סט'
    : 'סט';

=======
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  const [firstName, setFirstName] = useState('');
  
  useEffect(() => {
    // 1. טעינת שם המשתמש מהזיכרון
    const storedName = localStorage.getItem('userFirstName');
    if (storedName) {
      setFirstName(storedName);
    }

    // 2. טיפול בלחיצה מחוץ לתפריט הנפתח
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // ניקוי האירוע כשהקומפוננטה יורדת מהמסך
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userFirstName');
    setFirstName(''); 
    navigate('/');
  };

>>>>>>> end
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 px-8 py-5 border-b border-[#122843]/50 bg-[#071325]">
      <div className="flex items-center gap-3">
        <div className="bg-[#1f4ea8] p-2.5 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          </svg>
        </div>
        <span className="font-bold text-xl text-white">מערכת מענקים</span>
      </div>

<<<<<<< HEAD
      {!isLanding && (
        <div className="hidden md:flex gap-6 text-base">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition px-5 py-2 rounded-full font-medium ${
                isActive ? 'bg-[#1f4ea8]/20 text-[#E5DED0]' : 'text-[#cbd5ea] hover:text-white'
              }`
            }
          >
            דף הבית
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `transition px-5 py-2 rounded-full font-medium ${
                isActive ? 'bg-[#1f4ea8]/20 text-[#E5DED0]' : 'text-[#cbd5ea] hover:text-white'
              }`
            }
          >
            הרשמה
          </NavLink>
        </div>
      )}
=======
      {/* מרכז - תפריט ניווט */}
      <div className="hidden md:flex gap-6 text-sm">
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => 
            `transition px-4 py-1.5 rounded-full font-medium ${
              isActive 
                ? 'bg-[#1f4ea8]/20 text-[#E5DED0]' 
                : 'text-[#cbd5ea] hover:text-white'
            }`
          }
        >
          דף הבית
        </NavLink>
        <NavLink 
          to="/register"
          className={({ isActive }) => 
            `transition px-4 py-1.5 rounded-full font-medium ${
              isActive 
                ? 'bg-[#1f4ea8]/20 text-[#E5DED0]' 
                : 'text-[#cbd5ea] hover:text-white'
            }`
          }
        >
          הרשמה
        </NavLink>
      </div>
>>>>>>> end

      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <button
            onClick={() => navigate('/login')}
            className="transition rounded-full bg-[#0d2544] px-5 py-2 text-base font-medium text-white hover:bg-[#163a71]"
          >
            התחברות
          </button>
<<<<<<< HEAD
        ) : (
          <>
            {/* ─── FIX: logout button calls handleLogout which calls auth.logout() ── */}
            <button
              onClick={handleLogout}
              className="text-base bg-[#0d2544] hover:bg-[#163a71] text-white px-5 py-2 rounded-lg border border-[#1f4ea8] transition"
            >
              יציאה
            </button>

            {/* ─── FIX: display firstName + lastName instead of auth.user.name ──── */}
            <div className="flex items-center gap-3 rounded-full bg-[#0d2544]/70 px-4 py-2 border border-[#1f4ea8]">
              <span className="text-base font-medium text-white">{displayName}</span>
              <div className="bg-[#1f4ea8] text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full">
                {initials}
              </div>
            </div>
          </>
        )}
=======
          
          {showLoginDropdown && (
            <div className="absolute top-full mt-2 right-0 bg-[#071325] border border-[#122843]/50 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
              <NavLink
                to="/login"
                className="block px-4 py-2 text-sm text-[#cbd5ea] hover:bg-[#1f4ea8]/20 hover:text-white transition"
                onClick={() => setShowLoginDropdown(false)}
              >
                התחברות כסטודנט
              </NavLink>
              <NavLink
                to="/admin-requests"
                className="block px-4 py-2 text-sm text-[#cbd5ea] hover:bg-[#1f4ea8]/20 hover:text-white transition"
                onClick={() => setShowLoginDropdown(false)}
              >
                הרשמה כמנהל
              </NavLink>
            </div>
          )}
        </div>
        
        {/* כפתור היציאה */}
        <button
          onClick={handleLogout}
          className="text-sm bg-[#0d2544] hover:bg-[#163a71] text-white px-4 py-1.5 rounded-lg border border-[#1f4ea8] transition"
        >
          יציאה
        </button>
        
        {/* אזור תצוגת השם */}
        <div className="flex items-center gap-3 bg-[#0d2544]/70 px-3 py-1.5 rounded-full border border-[#1f4ea8]">
          <span className="text-sm font-medium text-white">
            {firstName ? firstName : 'אורח'}
          </span>
          <div className="bg-[#1f4ea8] text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full">
            {firstName ? firstName.charAt(0) : 'א'}
          </div>
        </div>
>>>>>>> end
      </div>
    </nav>
  );
}