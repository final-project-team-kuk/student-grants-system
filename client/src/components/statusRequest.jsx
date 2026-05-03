import { useState } from "react";

const NAV_ITEMS = ["דף הבית", "הגשת בקשה", "סטטוס בקשה"];

export default function ScholarshipStatus() {
  const [activeNav, setActiveNav] = useState("סטטוס בקשה");

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#F2EDE4",
        fontFamily: "'Varela Round', 'Assistant', sans-serif",
        color: "#0A192F",
        position: "relative",
      }}
    >
      {/* Blobs */}
      <div
        style={{
          position: "fixed",
          width: 580,
          height: 580,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(10,25,47,0.18) 0%, transparent 70%)",
          top: "-120px",
          left: "-100px",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(10,25,47,0.14) 0%, transparent 70%)",
          bottom: "-80px",
          right: "-60px",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

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
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 40px",
          border: "none",
          background: "rgba(242,237,228,0.7)",
          backdropFilter: "blur(12px)",
          position: "relative",
          zIndex: 10,
          boxShadow: "0 4px 24px rgba(10,25,47,0.22), 0 1px 0 rgba(10,25,47,0.08)",
        }}
      >
        {/* RIGHT side: Logo + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#0A192F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(10,25,47,0.2)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#F5F1E9">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </svg>
          </div>
          <span className="display-font" style={{ fontWeight: 700, fontSize: 18, color: "#0A192F" }}>מערכת מענקים</span>
        </div>

        {/* CENTER: Nav links */}
        <div style={{ display: "flex", gap: 6 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className="nav-font"
              style={{
                padding: "10px 32px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: activeNav === item ? 700 : 400,
                color: activeNav === item ? "#F5F1E9" : "#5C6370",
                background: activeNav === item ? "#0A192F" : "transparent",
                transition: "all 0.2s",
                boxShadow: activeNav === item ? "0 4px 14px rgba(10,25,47,0.2)" : "none",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* LEFT side: logout + user card */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(10,25,47,0.06)",
              borderRadius: 12,
              padding: "6px 16px 6px 8px",
              border: "1px solid rgba(10,25,47,0.1)",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "#0A192F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
                flexShrink: 0,
                color: "#F5F1E9",
                fontFamily: "'Assistant', sans-serif",
              }}
            >
              יכ
            </div>
            <span className="body-font" style={{ fontSize: 16, fontWeight: 500, color: "#0A192F" }}>ישראל כהן</span>
          </div>
          <button
            className="body-font"
            style={{
              padding: "9px 22px",
              borderRadius: 10,
              border: "1px solid rgba(10,25,47,0.18)",
              background: "rgba(10,25,47,0.05)",
              color: "#0A192F",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            יציאה
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "56px 20px", position: "relative", zIndex: 1 }}>

        {/* Page title */}
        <div style={{ textAlign: "right", marginBottom: 36 }}>
          <h1 className="display-font" style={{ fontSize: 30, fontWeight: 700, margin: 0, color: "#0A192F", letterSpacing: "-0.01em" }}>
            סטטוס הבקשה
          </h1>
          <p className="body-font" style={{ color: "#5C6370", marginTop: 6, fontSize: 15, fontWeight: 400 }}>
            מצב הבקשה האחרונה שהגשת
          </p>
        </div>

        {/* Status card */}
        <div
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderRadius: 18,
            border: "1px solid rgba(10,25,47,0.09)",
            padding: "50px 40px 44px",
            textAlign: "center",
            marginBottom: 20,
            boxShadow: "0 24px 60px rgba(0,0,0,0.06)",
          }}
        >
          {/* Badge row */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
              flexDirection: "row",
            }}
          >
            <div
              style={{
                background: "rgba(161,130,0,0.15)",
                border: "1px solid rgba(200,165,0,0.45)",
                borderRadius: 999,
                padding: "8px 22px",
                color: "#9a7a00",
                fontWeight: 700,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'Assistant', sans-serif",
              }}
            >
              ⏳ בהמתנה לטיפול
            </div>

            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d4a900, #f0c000)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 0 6px rgba(200,160,0,0.15)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontSize: 28,
                  fontWeight: 900,
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                }}
              >
                !
              </span>
            </div>
          </div>

          <h2 className="display-font" style={{ fontSize: 22, fontWeight: 700, margin: "0 0 14px", color: "#0A192F" }}>
            הבקשה שלך התקבלה
          </h2>
          <p className="body-font" style={{ color: "#5C6370", fontSize: 15, lineHeight: 1.9, margin: 0, fontWeight: 400 }}>
            הבקשה נמצאת בתור לטיפול. נעדכן אותך בדוא"ל כאשר יהיה שינוי בסטטוס.
          </p>
        </div>

        {/* Details card */}
        <div
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderRadius: 18,
            border: "1px solid rgba(10,25,47,0.09)",
            padding: "28px 36px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              direction: "rtl",
            }}
          >
            <span
              className="label-font"
              style={{
                fontFamily: "'Assistant', sans-serif",
                letterSpacing: "0.08em",
                fontSize: 11,
                fontWeight: 700,
                color: "#0A192F",
                opacity: 0.5,
                whiteSpace: "nowrap",
              }}
            >
              פרטי הבקשה
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(10,25,47,0.12)",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            <div style={{ textAlign: "right" }}>
              <div className="body-font" style={{ color: "#5C6370", fontSize: 13, marginBottom: 6, fontWeight: 400 }}>
                תאריך הגשה
              </div>
              <div className="display-font" style={{ fontWeight: 700, fontSize: 18, color: "#0A192F" }}>12/05/2025</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="body-font" style={{ color: "#5C6370", fontSize: 13, marginBottom: 6, fontWeight: 400 }}>
                מגמה
              </div>
              <div className="display-font" style={{ fontWeight: 700, fontSize: 18, color: "#0A192F" }}>מדעי המחשב</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}