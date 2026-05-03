
import { NavLink } from "react-router-dom";

export const MainComponent = () => {
    return (
        <div className="min-h-screen bg-[#E8E3D7]" dir="rtl">
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* כותרת ראשית */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#071325] rounded-2xl mb-6 shadow-lg shadow-[#071325]/20">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-[#071325] mb-4">ברוכים הבאים למערכת הגשת המלגות</h1>
                    <p className="text-xl text-[#071325]/70 max-w-2xl mx-auto">פלטפורמה מתקדמת לניהול וטיפול בבקשות מענקים אקדמיים</p>
                </div>

                {/* כרטיסי פעולות */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* הרשמה כמנהל */}
                    <NavLink
                        to="/admin-requests"
                        className="bg-white border border-[#e2dfd8] rounded-2xl p-8 hover:border-[#071325]/30 transition-all duration-300 cursor-pointer relative overflow-hidden group hover:shadow-lg hover:shadow-[#071325]/10"
                    >
                        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[#071325]/5 blur-2xl rounded-full"></div>

                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="bg-[#071325] p-4 rounded-2xl mb-6 shadow-lg shadow-[#071325]/20 group-hover:scale-105 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#071325] mb-3">הרשמה כמנהל</h3>
                            <p className="text-[#071325]/70 text-sm mb-4 leading-relaxed">הרשם כמנהל מערכת לקבלת גישה לפאנל ניהול וניהול בקשות</p>
                            <span className="text-[#071325] text-sm flex items-center gap-1 group-hover:text-[#1d4f8f] transition">
                                הרשמה כמנהל
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </span>
                        </div>
                    </NavLink>

                    {/* דף הבית */}
                    <NavLink
                        to="/dashboard"
                        className="bg-white border border-[#e2dfd8] rounded-2xl p-8 hover:border-[#071325]/30 transition-all duration-300 cursor-pointer relative overflow-hidden group hover:shadow-lg hover:shadow-[#071325]/10"
                    >
                        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[#071325]/5 blur-2xl rounded-full"></div>

                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="bg-[#071325] p-4 rounded-2xl mb-6 shadow-lg shadow-[#071325]/20 group-hover:scale-105 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#071325] mb-3">דף הבית</h3>
                            <p className="text-[#071325]/70 text-sm mb-4 leading-relaxed">כניסה לחשבון האישי, הגשת בקשות חדשות ומעקב אחר סטטוס</p>
                            <span className="text-[#071325] text-sm flex items-center gap-1 group-hover:text-[#1d4f8f] transition">
                                כניסה לדף הבית
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </span>
                        </div>
                    </NavLink>
                </div>

                {/* מידע נוסף */}
                <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#071325] mb-4">מערכת הגשת מלגות אקדמיות</h2>
                        <p className="text-[#071325]/70 mb-6 max-w-3xl mx-auto">
                            המערכת מאפשרת לסטודנטים להגיש בקשות למענקים אקדמיים בצורה דיגיטלית ונוחה.
                            המערכת כוללת טפסים מתקדמים, מעקב אחר סטטוס הבקשה, ואפשרות ליצירת קשר עם הצוות.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-[#071325]/60">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                הגשה דיגיטלית
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                מעקב בזמן אמת
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                אבטחה מתקדמת
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

