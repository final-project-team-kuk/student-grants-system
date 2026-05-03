import { useState } from "react";

const NAV_ITEMS = ["דף הבית", "הגשת בקשה", "סטטוס בקשה"];

export default function ScholarshipStatus() {
  const [activeNav, setActiveNav] = useState("סטטוס בקשה");

  return (
    <div dir="rtl" className="min-h-screen w-full bg-[#F2EDE4] text-[#0A192F] relative">
      {/* Blobs */}
      <div className="fixed w-[580px] h-[580px] rounded-full bg-gradient-to-r from-[rgba(10,25,47,0.18)] via-[rgba(10,25,47,0.1)] to-transparent top-[-120px] left-[-100px] blur-[80px] pointer-events-none z-0" />
      <div className="fixed w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[rgba(10,25,47,0.14)] via-[rgba(10,25,47,0.08)] to-transparent bottom-[-80px] right-[-60px] blur-[70px] pointer-events-none z-0" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Varela+Round&family=Assistant:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { min-height: 100%; width: 100%; background: #F2EDE4; }
        button:hover { opacity: 0.93; }

        .display-font {
          font-family: 'Assistant', sans-serif;
          letter-spacing: -0.01em;
        }
        .nav-font {
          font-family: 'Assistant', sans-serif;
        }
        .body-font {
          font-family: 'Assistant', sans-serif;
        }
        .label-font {
          font-family: 'Assistant', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #0A192F;
          opacity: 0.45;
        }
      `}</style>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-3.5 bg-[rgba(242,237,228,0.7)] backdrop-blur-[12px] relative z-10 shadow-lg">
        {/* RIGHT side: Logo + title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[10px] bg-[#0A192F] flex items-center justify-center shadow-md">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#F5F1E9">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </svg>
          </div>
          <span className="display-font font-bold text-lg text-[#0A192F]">מערכת מענקים</span>
        </div>

        {/* CENTER: Nav links */}
        <div className="flex gap-1.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`nav-font px-8 py-2.5 rounded-[10px] border-none cursor-pointer text-base transition-all ${
                activeNav === item
                  ? 'font-bold text-[#F5F1E9] bg-[#0A192F] shadow-md'
                  : 'font-normal text-[#5C6370] bg-transparent'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* LEFT side: logout + user card */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-[rgba(10,25,47,0.06)] rounded-xl px-4 py-1.5 border border-[rgba(10,25,47,0.1)]">
            <div className="w-[34px] h-[34px] rounded-full bg-[#0A192F] flex items-center justify-center font-bold text-sm flex-shrink-0 text-[#F5F1E9]">
              יכ
            </div>
            <span className="body-font text-base font-medium text-[#0A192F]">ישראל כהן</span>
          </div>
          <button className="body-font px-5.5 py-2 rounded-[10px] border border-[rgba(10,25,47,0.18)] bg-[rgba(10,25,47,0.05)] text-[#0A192F] cursor-pointer text-base font-medium hover:opacity-90 transition-opacity">
            יציאה
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-[760px] mx-auto px-5 py-14 relative z-1">

        {/* Page title */}
        <div className="text-right mb-9">
          <h1 className="display-font text-3xl font-bold m-0 text-[#0A192F] tracking-[-0.01em]">
            סטטוס הבקשה
          </h1>
          <p className="body-font text-[#5C6370] mt-1.5 text-sm font-normal">
            מצב הבקשה האחרונה שהגשת
          </p>
        </div>

        {/* Status card */}
        <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-[18px] rounded-[18px] border border-[rgba(10,25,47,0.09)] px-10 py-11 text-center mb-5 shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
          {/* Badge row */}
          <div className="inline-flex items-center gap-2.5 mb-7 flex-row">
            <div className="bg-[rgba(161,130,0,0.15)] border border-[rgba(200,165,0,0.45)] rounded-full px-5.5 py-2 text-[#9a7a00] font-bold text-sm flex items-center gap-1.5">
              ⏳ בהמתנה לטיפול
            </div>

            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a900] to-[#f0c000] flex items-center justify-center shadow-[0_0_0_6px_rgba(200,160,0,0.15)] flex-shrink-0">
              <span className="text-white text-3xl font-black leading-none">
                !
              </span>
            </div>
          </div>

          <h2 className="display-font text-2xl font-bold m-0 mb-3.5 text-[#0A192F]">
            הבקשה שלך התקבלה
          </h2>
          <p className="body-font text-[#5C6370] text-sm leading-relaxed m-0 font-normal">
            הבקשה נמצאת בתור לטיפול. נעדכן אותך בדוא"ל כאשר יהיה שינוי בסטטוס.
          </p>
        </div>

        {/* Details card */}
        <div className="bg-[rgba(255,255,255,0.7)] backdrop-blur-[18px] rounded-[18px] border border-[rgba(10,25,47,0.09)] px-9 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3 mb-6">
            <span className="label-font tracking-[0.08em] text-xs font-bold text-[#0A192F] opacity-50 whitespace-nowrap">
              פרטי הבקשה
            </span>
            <div className="flex-1 h-px bg-[rgba(10,25,47,0.12)]" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="text-right">
              <div className="body-font text-[#5C6370] text-sm mb-1.5 font-normal">
                תאריך הגשה
              </div>
              <div className="display-font font-bold text-lg text-[#0A192F]">12/05/2025</div>
            </div>
            <div className="text-right">
              <div className="body-font text-[#5C6370] text-sm mb-1.5 font-normal">
                מגמה
              </div>
              <div className="display-font font-bold text-lg text-[#0A192F]">מדעי המחשב</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}