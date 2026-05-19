import React from 'react';
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

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-[#122843]/50 bg-[#071325]">
      <div className="flex items-center gap-3">
        <div className="bg-[#1f4ea8] p-2 rounded-lg">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          </svg>
        </div>
        <span className="font-bold text-lg text-white">מערכת מענקים</span>
      </div>

      {!isLanding && (
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
      )}

      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <button
            onClick={() => navigate('/login')}
            className="transition rounded-full bg-[#0d2544] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#163a71]"
          >
            התחברות
          </button>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="text-sm bg-[#0d2544] hover:bg-[#163a71] text-white px-4 py-1.5 rounded-lg border border-[#1f4ea8] transition"
            >
              יציאה
            </button>
            <div className="flex items-center gap-3 rounded-full bg-[#0d2544]/70 px-3 py-1.5 border border-[#1f4ea8]">
              <span className="text-sm font-medium text-white">{auth.user.name}</span>
              <div className="bg-[#1f4ea8] text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full">
                {auth.user.name ? auth.user.name.slice(0, 2).toUpperCase() : 'סט'}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}