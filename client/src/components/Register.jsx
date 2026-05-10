// ============================================================
//  client/src/components/Register.jsx
//  עמוד הרשמה עם בדיקות תקינות בצד הלקוח
// ============================================================
import { useState } from "react";
import validateRegisterForm from "../validations/registerValidation";

const gradCap = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#F5F1E9" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18V17l7 4 7-4v-3.82L12 17l-7-3.82z"/>
  </svg>
);

// ─────────────────────────────────────────────
//  קומפוננטה
// ─────────────────────────────────────────────
export default function Register({ onSwitchToLogin }) {
  const [activeTab, setActiveTab] = useState("register");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors]       = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // מנקה את השגיאה של השדה ברגע שהמשתמש מתחיל להקליד
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    // ── בדיקות צד לקוח ──────────────────────────────────
    const { errors: validationErrors, isValid } = validateRegisterForm(form);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName:  form.lastName.trim(),
          idNumber:  form.idNumber.trim(),
          email:     form.email.trim().toLowerCase(),
          password:  form.password,
        }),
      });

      if (response.ok) {
        alert("נרשמת בהצלחה!");
        setForm({ firstName: "", lastName: "", idNumber: "", email: "", password: "", confirmPassword: "" });
        setErrors({});
        onSwitchToLogin?.();
      } else {
        const data = await response.json();
        // אם השרת מחזיר field — מציגים על השדה הספציפי
        if (data.field) {
          setErrors({ [data.field]: data.error });
        } else {
          alert(data.error || "שגיאה ברישום");
        }
      }
    } catch (err) {
      console.error("שגיאה ברישום:", err);
      alert("שגיאה בשרת");
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { key: "firstName",       label: "שם פרטי",      placeholder: "הזן שם פרטי",    type: "text"     },
    { key: "lastName",        label: "שם משפחה",     placeholder: "הזן שם משפחה",   type: "text"     },
    { key: "idNumber",        label: "מספר זהות",    placeholder: "הזן מספר זהות",  type: "text"     },
    { key: "email",           label: "אימייל",       placeholder: "הזן אימייל",     type: "email"    },
    { key: "password",        label: "סיסמה",        placeholder: "בחר סיסמה",      type: "password" },
    { key: "confirmPassword", label: "אימות סיסמה",  placeholder: "הזן סיסמה שוב",  type: "password" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #A0AEC0; }
        input:focus { outline: none; border-color: #0A192F !important; box-shadow: 0 0 0 3px rgba(10,25,47,0.15); }
        input.input-error { border-color: #E53E3E !important; }
        input.input-error:focus { box-shadow: 0 0 0 3px rgba(229,62,62,0.15) !important; }
        button { transition: opacity 0.2s, transform 0.15s; }
        button:hover:not(:disabled) { opacity: 0.92; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>

      <div
        className="min-h-screen bg-[#F2EDE4] flex items-center justify-center relative overflow-hidden p-4 md:p-10"
        style={{ fontFamily: "'Heebo', sans-serif", direction: "rtl" }}
      >
        {/* Blob 1 */}
        <div
          className="fixed w-[580px] h-[580px] rounded-full -top-[120px] -left-[100px] blur-[80px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(10,25,47,0.18) 0%, transparent 70%)",
            animation: "blobFloat 8s ease-in-out infinite",
          }}
        />

        {/* Blob 2 */}
        <div
          className="fixed w-[450px] h-[450px] rounded-full -bottom-[80px] -right-[60px] blur-[70px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(10,25,47,0.14) 0%, transparent 70%)",
            animation: "blobFloat 10s ease-in-out infinite reverse",
          }}
        />

        {/* Container */}
        <div
          className="flex flex-col items-center gap-4 z-10 w-full max-w-[480px]"
          style={{ animation: "fadeUp 0.7s ease both" }}
        >
          {/* Logo */}
          <div style={{ marginBottom: 4 }}>
            <div
              className="w-[68px] h-[68px] rounded-[18px] bg-[#0A192F] flex items-center justify-center"
              style={{ boxShadow: "0 8px 32px rgba(10,25,47,0.25)" }}
            >
              {gradCap}
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-center"
            style={{ color: "#0A192F", fontSize: 26, fontWeight: 800, letterSpacing: "-0.3px" }}
          >
            מערכת מענקים לסטודנטים
          </h1>
          <p className="text-center" style={{ color: "#5C6370", fontSize: 14, fontWeight: 300, marginTop: -8 }}>
            ניהול בקשות מענק אקדמי
          </p>

          {/* Card */}
          <div
            className="w-full flex flex-col"
            style={{
              marginTop: 8,
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(10,25,47,0.1)",
              borderRadius: 20,
              padding: "28px 28px 24px",
              gap: 18,
              boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
            }}
          >
            {/* Tabs */}
            <div className="flex" style={{ borderRadius: 12, background: "#E5E0D5", padding: 4, gap: 4 }}>
              <button
                onClick={() => setActiveTab("register")}
                className="flex-1 border-none cursor-pointer transition-all duration-200"
                style={{
                  padding: "10px 0",
                  borderRadius: 9,
                  fontSize: 15,
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 600,
                  background: activeTab === "register" ? "#0A192F" : "transparent",
                  color:      activeTab === "register" ? "#F5F1E9" : "#5C6370",
                  boxShadow:  activeTab === "register" ? "0 4px 14px rgba(10,25,47,0.2)" : "none",
                }}
              >
                הרשמה
              </button>
              <button
                onClick={() => { setActiveTab("login"); onSwitchToLogin?.(); }}
                className="flex-1 border-none cursor-pointer transition-all duration-200"
                style={{
                  padding: "10px 0",
                  borderRadius: 9,
                  fontSize: 15,
                  fontFamily: "'Heebo', sans-serif",
                  fontWeight: 600,
                  background: activeTab === "login" ? "#0A192F" : "transparent",
                  color:      activeTab === "login" ? "#F5F1E9" : "#5C6370",
                  boxShadow:  activeTab === "login" ? "0 4px 14px rgba(10,25,47,0.2)" : "none",
                }}
              >
                כניסה למערכת
              </button>
            </div>

            {/* Fields */}
            {fields.map(({ key, label, placeholder, type }) => (
              <div key={key} className="flex flex-col" style={{ gap: 7 }}>
                <label style={{ color: "#0A192F", fontSize: 14, fontWeight: 500, textAlign: "right" }}>
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={handleChange(key)}
                  placeholder={placeholder}
                  dir="rtl"
                  className={`w-full ${errors[key] ? "input-error" : ""}`}
                  style={{
                    background:   "#ffffff",
                    border:       `1px solid ${errors[key] ? "#E53E3E" : "#D1D5DB"}`,
                    borderRadius: 12,
                    padding:      "13px 18px",
                    color:        "#0A192F",
                    fontSize:     15,
                    fontFamily:   "'Heebo', sans-serif",
                    textAlign:    "right",
                    transition:   "border-color 0.2s, box-shadow 0.2s",
                  }}
                />
                {/* הודעת שגיאה מתחת לשדה */}
                {errors[key] && (
                  <span style={{ color: "#E53E3E", fontSize: 12, textAlign: "right", marginTop: 2 }}>
                    {errors[key]}
                  </span>
                )}
              </div>
            ))}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
              style={{
                padding:      "15px",
                borderRadius: 12,
                border:       "none",
                background:   "#0A192F",
                color:        "#F5F1E9",
                fontSize:     16,
                fontWeight:   700,
                fontFamily:   "'Heebo', sans-serif",
                letterSpacing: "0.3px",
                boxShadow:    "0 6px 24px rgba(10,25,47,0.2)",
                marginTop:    4,
                opacity:      isLoading ? 0.7 : 1,
                transition:   "opacity 0.2s, transform 0.15s",
              }}
            >
              {isLoading ? "יוצר חשבון..." : "יצירת חשבון"}
            </button>

            {/* Footer */}
            <p style={{ color: "#5C6370", fontSize: 13, textAlign: "center", marginTop: -4 }}>
              כבר יש לך חשבון?{" "}
              <span
                onClick={() => onSwitchToLogin?.()}
                style={{
                  color:               "#0A192F",
                  cursor:              "pointer",
                  fontWeight:          600,
                  textDecoration:      "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                כניסה למערכת
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
