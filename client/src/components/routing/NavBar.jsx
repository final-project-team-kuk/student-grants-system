import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // טעינת המשתמש מה-localStorage בעת טעינת הרכיב
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // סגירת דרופדאון בלחיצה בחוץ
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // מוחק את פרטי המשתמש מהדפדפן
    setUser(null); // מעדכן את ה-State כדי שה-Navbar יתעדכן מיד לאורח
    navigate('/'); // מחזיר לדף הבית
  };

  return (
    <nav className="w-full bg-[#071325] border-b border-[#122843]/50">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-6 px-6 py-5 sm:px-8 lg:px-12">
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
        <NavLink to="/dashboard" className={({ isActive }) => `transition px-4 py-1.5 rounded-full font-medium ${isActive ? 'bg-[#1f4ea8]/20 text-[#E5DED0]' : 'text-[#cbd5ea] hover:text-white'}`}>
          דף הבית
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => `transition px-4 py-1.5 rounded-full font-medium ${isActive ? 'bg-[#1f4ea8]/20 text-[#E5DED0]' : 'text-[#cbd5ea] hover:text-white'}`}>
          הרשמה
        </NavLink>
      </div>

      {/* צד שמאל - אזור אישי */}
      <div className="flex items-center gap-4">
        {/* כפתור התחברות / דרופדאון - מוצג רק אם אין משתמש מחובר */}
        {!user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowLoginDropdown(!showLoginDropdown)}
              className="transition px-4 py-1.5 rounded-full font-medium text-[#cbd5ea] hover:text-white"
            >
              התחברות
            </button>
            {showLoginDropdown && (
              <div className="absolute top-full mt-2 right-0 bg-[#071325] border border-[#122843]/50 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                <NavLink to="/login" className="block px-4 py-2 text-sm text-[#cbd5ea] hover:bg-[#1f4ea8]/20 hover:text-white transition" onClick={() => setShowLoginDropdown(false)}>
                  התחברות כסטודנט
                </NavLink>
                <NavLink to="/admin-requests" className="block px-4 py-2 text-sm text-[#cbd5ea] hover:bg-[#1f4ea8]/20 hover:text-white transition" onClick={() => setShowLoginDropdown(false)}>
                  הרשמה כמנהל
                </NavLink>
              </div>
            )}
          </div>
        )}

        {/* כפתור יציאה - מוצג רק אם המשתמש מחובר */}
        {user && (
          <button
            onClick={handleLogout}
            className="text-sm bg-[#0d2544] hover:bg-[#163a71] text-white px-4 py-1.5 rounded-lg border border-[#1f4ea8] transition"
          >
            יציאה
          </button>
        )}

        {/* בועית השם */}
        <div className="flex items-center gap-3 bg-[#0d2544]/70 px-3 py-1.5 rounded-full border border-[#1f4ea8]">
          <span className="text-sm font-medium text-white">
            {user ? `${user.firstName} ${user.lastName}` : 'אורח'}
          </span>
          <div className="bg-[#1f4ea8] text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full">
            {user ? user.firstName.substring(0, 1) + user.lastName.substring(0, 1) : '??'}
          </div>
        </div>
      </div>
    </div>
    </nav>
  );
}
// import React, { useState, useEffect, useRef } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// export default function Navbar() {
//   const navigate = useNavigate();
//   const [showLoginDropdown, setShowLoginDropdown] = useState(false);
//   const dropdownRef = useRef(null);

  
// const [user, setUser] = useState(null);
//  useEffect(() => {
//   // ננסה להוציא את המידע ששמור תחת המפתח 'user'
//   const savedUser = localStorage.getItem('user'); 
//   if (savedUser) {
//     setUser(JSON.parse(savedUser)); // הופך את הטקסט בחזרה לאובייקט
//   }

//   // הקוד הקיים שלך לסגירת הדרופדאון נשאר כאן למטה...
//   const handleClickOutside = (event) => { /* ... */ };
//   document.addEventListener('mousedown', handleClickOutside);
//   return () => document.removeEventListener('mousedown', handleClickOutside);
// }, []);

//   const handleLogout = () => {
//     // Add logout logic here if needed
//     navigate('/');
//   };
//   return (
//     <nav className="flex items-center justify-between p-4 border-b border-[#122843]/50 bg-[#071325]">
//       {/* צד ימין - לוגו */}
//       <div className="flex items-center gap-3">
//         <div className="bg-[#1f4ea8] p-2 rounded-lg">
//           <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//           </svg>
//         </div>
//         <span className="font-bold text-lg text-white">מערכת מענקים</span>
//       </div>

//       {/* מרכז - תפריט ניווט */}
//       <div className="hidden md:flex gap-6 text-sm">
//         <NavLink 
//           to="/dashboard"
//           className={({ isActive }) => 
//             `transition px-4 py-1.5 rounded-full font-medium ${
//               isActive 
//                 ? 'bg-[#1f4ea8]/20 text-[#E5DED0]' 
//                 : 'text-[#cbd5ea] hover:text-white'
//             }`
//           }
//         >
      
//     דף הבית
//         </NavLink>
//         <NavLink 
//           to="/register"
//           className={({ isActive }) => 
//             `transition px-4 py-1.5 rounded-full font-medium ${
//               isActive 
//                 ? 'bg-[#1f4ea8]/20 text-[#E5DED0]' 
//                 : 'text-[#cbd5ea] hover:text-white'
//             }`
//           }
//         >
//           הרשמה
//         </NavLink>
//       </div>

//       {/* צד שמאל - אזור אישי */}
//       <div className="flex items-center gap-4">
//         <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={() => setShowLoginDropdown(!showLoginDropdown)}
//             className="transition px-4 py-1.5 rounded-full font-medium text-[#cbd5ea] hover:text-white"
//           >
//             התחברות
//           </button>
//           {showLoginDropdown && (
//             <div className="absolute top-full mt-2 right-0 bg-[#071325] border border-[#122843]/50 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
//               <NavLink
//                 to="/login"
//                 className="block px-4 py-2 text-sm text-[#cbd5ea] hover:bg-[#1f4ea8]/20 hover:text-white transition"
//                 onClick={() => setShowLoginDropdown(false)}
//               >
//                 התחברות כסטודנט
//               </NavLink>
//               <NavLink
//                 to="/admin-requests"
//                 className="block px-4 py-2 text-sm text-[#cbd5ea] hover:bg-[#1f4ea8]/20 hover:text-white transition"
//                 onClick={() => setShowLoginDropdown(false)}
//               >
//                 הרשמה כמנהל
//               </NavLink>
//             </div>
//           )}
//         </div>
//         <button
//           onClick={handleLogout}
//           className="text-sm bg-[#0d2544] hover:bg-[#163a71] text-white px-4 py-1.5 rounded-lg border border-[#1f4ea8] transition"
//         >
//           יציאה
//         </button>
//         <div className="flex items-center gap-3 bg-[#0d2544]/70 px-3 py-1.5 rounded-full border border-[#1f4ea8]">
//          <div className="flex items-center gap-3 bg-[#0d2544]/70 px-3 py-1.5 rounded-full border border-[#1f4ea8]">
//           {/* אם יש user, נציג את השם שלו. אם אין, נכתוב 'אורח' */}
//            <span className="text-sm font-medium text-white">
//            {user ? user.name : 'אורח'}
//            </span>

//         {/* הצגת האותיות הראשונות של השם בתוך העיגול */}
//         <div className="bg-[#1f4ea8] text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full">
//         {user ? user.name.substring(0, 2) : '??'}
//        </div>
//      </div>
//         </div>
//       </div>
//     </nav>
//   );
// }