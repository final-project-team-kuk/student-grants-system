import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ idNumber: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // שומרים את פרטי המשתמש בזיכרון המקומי
        localStorage.setItem('user', JSON.stringify({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          idNumber: data.user.idNumber
        }));

        alert(`ברוך הבא, ${data.user.firstName}!`);
        navigate('/dashboard'); // מעבר לדף הבית של הסטודנט
      } else {
        alert(data.message || "פרטי התחברות שגויים");
      }
    } catch (error) {
      console.error("שגיאה בכניסה:", error);
      alert("חיבור לשרת נכשל");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <h1 style={styles.title}>כניסה למערכת</h1>
        <div style={styles.card}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>מספר זהות</label>
            <input
              style={styles.input}
              type="text"
              value={form.idNumber}
              onChange={handleChange("idNumber")}
              placeholder="הזן תז"
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
            style={styles.submitBtn}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "מתחבר..." : "כניסה"}
          </button>
        </div>
      </div>
    </div>
  );
}

// תוכלי להעתיק את ה-styles מה-Register כדי לשמור על עיצוב אחיד
const styles = {
  root: { minHeight: "100vh", background: "#F2EDE4", display: "flex", alignItems: "center", justifyContent: "center", direction: "rtl", fontFamily: "Heebo" },
  container: { width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: "20px" },
  title: { textAlign: "center", color: "#0A192F" },
  card: { background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "15px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "14px", fontWeight: "600" },
  input: { padding: "12px", borderRadius: "10px", border: "1px solid #ddd" },
  submitBtn: { padding: "12px", background: "#0A192F", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }
};