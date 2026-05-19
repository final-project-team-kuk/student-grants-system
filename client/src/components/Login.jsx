import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const gradCap = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#F5F1E9" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18V17l7 4 7-4v-3.82L12 17l-7-3.82z"/>
  </svg>
);

export default function Login({ auth }) {
  const [form, setForm] = useState({ idNumber: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "שגיאה בהתחברות, נסה שוב.");
        return;
      }

      auth?.login?.(data.user, data.token);
      navigate("/dashboard");
    } catch (fetchError) {
      setError("שגיאה ברשת. אנא נסה שוב מאוחר יותר.");
      console.error(fetchError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.container}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>{gradCap}</div>
        </div>
        <h1 style={styles.title}>התחברות למערכת</h1>
        <p style={styles.subtitle}>הזן מספר זהות וסיסמה כדי להיכנס ולעקוב אחרי בקשות המענק שלך.</p>

        <div style={styles.card}>
          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.fieldGroup}>
            <label style={styles.label}>מספר זהות</label>
            <input
              style={styles.input}
              type="text"
              value={form.idNumber}
              onChange={handleChange("idNumber")}
              placeholder="הזן מספר זהות"
              dir="rtl"
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>סיסמה</label>
            <input
              style={styles.input}
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              placeholder="הזן סיסמה"
              dir="rtl"
            />
          </div>

          <button
            style={{ ...styles.submitBtn, ...(isLoading ? styles.submitBtnLoading : {}) }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "מתחבר..." : "התחבר"}
          </button>

          <p style={styles.footerText}>
            עדיין לא רשום? <Link style={styles.footerLink} to="/register">יצירת חשבון</Link>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #A0AEC0; }
        input:focus { outline: none; border-color: #0A192F !important; box-shadow: 0 0 0 3px rgba(10,25,47,0.15); }
        button { transition: opacity 0.2s, transform 0.15s; }
        button:hover:not(:disabled) { opacity: 0.92; }
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
    background: "#F2EDE4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Heebo', sans-serif",
    direction: "rtl",
    position: "relative",
    overflow: "hidden",
    padding: "40px 16px",
  },
  blob1: {
    position: "fixed",
    width: 580,
    height: 580,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(10,25,47,0.18) 0%, transparent 70%)",
    top: "-120px",
    left: "-100px",
    filter: "blur(80px)",
    animation: "blobFloat 8s ease-in-out infinite",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed",
    width: 450,
    height: 450,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(10,25,47,0.14) 0%, transparent 70%)",
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
  },
  logoWrap: { marginBottom: 4 },
  logoIcon: {
    width: 68,
    height: 68,
    borderRadius: 18,
    background: "#0A192F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 32px rgba(10,25,47,0.25)",
  },
  title: {
    color: "#0A192F",
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
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(10,25,47,0.1)",
    borderRadius: 20,
    padding: "28px 28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
  },
  error: {
    padding: "14px 18px",
    borderRadius: 14,
    background: "#FEE2E2",
    color: "#B91C1C",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "right",
    width: "100%",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
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
    padding: "13px 18px",
    color: "#0A192F",
    fontSize: 15,
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
    background: "#0A192F",
    color: "#F5F1E9",
    fontSize: 16,
    fontWeight: 700,
    fontFamily: "'Heebo', sans-serif",
    cursor: "pointer",
    letterSpacing: "0.3px",
    boxShadow: "0 6px 24px rgba(10,25,47,0.2)",
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
    textDecoration: "underline",
    textUnderlineOffset: 2,
    fontWeight: 600,
  },
};