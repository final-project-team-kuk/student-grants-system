import { useNavigate } from 'react-router-dom';

export const MainComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#E8E3D7] flex flex-col items-center justify-center px-4" dir="rtl">

      {/* Logo */}
      <div className="flex flex-col items-center mb-10">
        <div className="bg-[#071325] p-4 rounded-2xl mb-4 shadow-lg shadow-[#071325]/20">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12 12 0 0112 21.5a12 12 0 01-6.16-10.922L12 14z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#071325] tracking-wide">מערכת מענקים</h1>
        <p className="text-[#071325] mt-2 text-sm">ברוכים הבאים — בחר כיצד להמשיך</p>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">

        {/* Dashboard card */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex-1 bg-white border border-[#e2dfd8] rounded-2xl p-8 text-right
                     hover:border-[#071325]/30 transition cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#071325]/5 blur-3xl rounded-full" />
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="bg-[#071325] p-4 rounded-2xl mb-6 shadow-lg shadow-[#071325]/20 group-hover:scale-105 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#071325] mb-3">דף הבית</h2>
            <p className="text-[#071325] text-sm mb-6 leading-relaxed">כניסה לפאנל הראשי לצפייה בבקשות ומעקב אחר הטיפול בהן</p>
            <span className="text-[#071325] text-sm flex items-center gap-1">
              כניסה
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </div>
        </button>

        {/* Admin register card */}
        <button
          onClick={() => navigate('/admin-requests')}
          className="flex-1 bg-white border border-[#e2dfd8] rounded-2xl p-8 text-right
                     hover:border-[#071325]/30 transition cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#071325]/5 blur-3xl rounded-full" />
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="bg-[#071325] p-4 rounded-2xl mb-6 shadow-lg shadow-[#071325]/20 group-hover:scale-105 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#071325] mb-3">הרשמה כמנהל</h2>
            <p className="text-[#071325] text-sm mb-6 leading-relaxed">ניהול בקשות מענקים וטיפול בפניות סטודנטים במערכת</p>
            <span className="text-[#071325] text-sm flex items-center gap-1">
              הרשמה
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </div>
        </button>

      </div>

      <p className="mt-12 text-[#071325]/30 text-xs">© 2025 מערכת מענקים</p>
    </div>
  );
};