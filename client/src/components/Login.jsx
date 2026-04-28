import { useState } from "react";

const gradCap = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#F5F1E9" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18V17l7 4 7-4v-3.82L12 17l-7-3.82z"/>
  </svg>
);

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div style={styles.root}>
      {/* כתמים מטושטשים בולטים יותר (Blobs) */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>{gradCap}</div>
        </div>

        {/* Title */}
        <h1 style={styles.title}>מערכת מענקים לסטודנטים</h1>
        <p style={styles.subtitle}>ניהול בקשות מענק אקדמי</p>

        {/* Card */}
        <div style={styles.card}>
          {/* Tabs */}
          <div style={styles.tabRow}>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === "login" ? styles.tabActive : styles.tabInactive),
              }}
              onClick={() => setActiveTab("login")}
            >
              כניסה למערכת
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === "register" ? styles.tabActive : styles.tabInactive),
              }}
              onClick={() => setActiveTab("register")}
            >
              הרשמה
            </button>
          </div>

          {/* Fields */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>מספר זהות</label>
            <input
              style={styles.input}
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              dir="rtl"
              placeholder="הכנס מספר זהות"
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>סיסמה</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="rtl"
              placeholder="הכנס סיסמה"
            />
          </div>

          {/* Submit */}
          <button
            style={{
              ...styles.submitBtn,
              ...(isLoading ? styles.submitBtnLoading : {}),
            }}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "מתחבר..." : "כניסה למערכת"}
          </button>

          {/* Footer link */}
          <p style={styles.footerText}>
            אין לך חשבון?{" "}
            <span
              style={styles.footerLink}
              onClick={() => setActiveTab("register")}
            >
              צור אותו עכשיו...
            </span>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        input::placeholder { color: #A0AEC0; }
        input:focus { outline: none; border-color: #0A192F !important; box-shadow: 0 0 0 3px rgba(10,25,47,0.15); }
        button:hover { opacity: 0.93; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#F2EDE4", // שמנת חזקה יותר
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Heebo', sans-serif",
    direction: "rtl",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    width: 580,
    height: 580,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(10,25,47,0.18) 0%, transparent 70%)", // כתם כחול עמוק בולט
    top: "-120px",
    left: "-100px",
    filter: "blur(80px)",
    animation: "blobFloat 8s ease-in-out infinite",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    width: 450,
    height: 450,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(10,25,47,0.14) 0%, transparent 70%)", // כתם כחול עמוק בולט
    bottom: "-80px",
    right: "-60px",
    filter: "blur(70px)",
    animation: "blobFloat 10s ease-in-out infinite reverse",
    pointerEvents: "none",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    animation: "fadeUp 0.7s ease both",
    zIndex: 1,
    width: "100%",
    maxWidth: 480,
    padding: "0 16px",
  },
  logoWrap: {
    marginBottom: 4,
  },
  logoIcon: {
    width: 68,
    height: 68,
    borderRadius: 18,
    background: "#0A192F", // כחול עמוק ללוגו
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 32px rgba(10,25,47,0.25)",
  },
  title: {
    color: "#0A192F", // כחול עמוק לכותרת
    fontSize: 26,
    fontWeight: 800,
    letterSpacing: "-0.3px",
    textAlign: "center",
  },
  subtitle: {
    color: "#5C6370",
    fontSize: 14,
    fontWeight: 300,
    textAlign: "center",
    marginTop: -8,
  },
  card: {
    marginTop: 8,
    width: "100%",
    background: "rgba(255, 255, 255, 0.7)", // רקע לבן שקוף למחצה
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(10,25,47,0.1)",
    borderRadius: 20,
    padding: "28px 28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
  },
  tabRow: {
    display: "flex",
    borderRadius: 12,
    background: "#E5E0D5", // צבע טאבים שמנתי
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    padding: "10px 0",
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontFamily: "'Heebo', sans-serif",
    fontWeight: 600,
    transition: "all 0.22s ease",
  },
  tabActive: {
    background: "#0A192F", // כחול עמוק לטאב פעיל
    color: "#F5F1E9", // טקסט שמנת
    boxShadow: "0 4px 14px rgba(10,25,47,0.2)",
  },
  tabInactive: {
    background: "transparent",
    color: "#5C6370",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    color: "#0A192F",
    fontSize: 14,
    fontWeight: 500,
    textAlign: "right",
  },
  input: {
    background: "#ffffff",
    border: "1px solid #D1D5DB",
    borderRadius: 12,
    padding: "14px 18px",
    color: "#0A192F",
    fontSize: 16,
    fontFamily: "'Heebo', sans-serif",
    textAlign: "right",
    width: "100%",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  submitBtn: {
    width: "100%",
    padding: "15px",
    borderRadius: 12,
    border: "none",
    background: "#0A192F", // כחול עמוק לכפתור
    color: "#F5F1E9", // טקסט שמנת
    fontSize: 16,
    fontWeight: 700,
    fontFamily: "'Heebo', sans-serif",
    cursor: "pointer",
    letterSpacing: "0.3px",
    boxShadow: "0 6px 24px rgba(10,25,47,0.2)",
    transition: "opacity 0.2s, transform 0.15s",
    marginTop: 4,
  },
  submitBtnLoading: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  footerText: {
    color: "#5C6370",
    fontSize: 13,
    textAlign: "center",
    marginTop: -4,
  },
  footerLink: {
    color: "#0A192F",
    cursor: "pointer",
    fontWeight: 600,
    textDecoration: "underline",
    textUnderlineOffset: 2,
  },
};