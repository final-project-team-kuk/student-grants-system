import { useState } from "react";
import { Link } from "react-router-dom";

const gradCap = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#F5F1E9" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18V17l7 4 7-4v-3.82L12 17l-7-3.82z"/>
  </svg>
);

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Password confirmation check
      if (form.password !== form.confirmPassword) {
        setError("הסיסמות לא חופפות! אנא בדוק את הסיסמה שלך.");
        return;
      }

      // Password length check
      if (form.password.length < 6) {
        setError("הסיסמה חייבת להיות על פחות 6 תווים.");
        return;
      }

      setError("");
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          idNumber: form.idNumber,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "חדטה בתהליך. אנא נסה שוב.");
        return;
      }

      setSuccess(true);
      setForm({ firstName: "", lastName: "", idNumber: "", password: "", confirmPassword: "" });
    } catch (error) {
      setError("שגיאה ברשת. אנא נסה שוב.");
      console.error("שגיאה ברישום:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { key: "firstName",       label: "שם פרטי",       placeholder: "הזן שם פרטי",      type: "text"     },
    { key: "lastName",        label: "שם משפחה",      placeholder: "הזן שם משפחה",     type: "text"     },
    { key: "idNumber",        label: "מספר זהות",     placeholder: "הזן מספר זהות",    type: "text"     },
    { key: "password",        label: "סיסמה",         placeholder: "בחר סיסמה",        type: "password" },
    { key: "confirmPassword", label: "אימות סיסמה",   placeholder: "הזן סיסמה שוב",   type: "password" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8E3D7] via-[#F9F7EF] to-[#E0E7F7] relative overflow-hidden" dir="rtl">
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#1f4ea8]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-96 w-96 rounded-full bg-[#071325]/10 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-[32px] border border-[#071325]/10 bg-white/85 shadow-[0_40px_120px_-65px_rgba(7,19,37,0.65)] backdrop-blur-xl">
            <div className="p-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#071325] flex items-center justify-center shadow-lg shadow-[#071325]/20">
                  {gradCap}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-center text-[#071325] mb-2">
                הרשמה למערכת
              </h1>
              <p className="text-sm text-center text-[#64748b] mb-6">
                צור חשבון חדש כדי להתחיל להגיש בקשות מענק
              </p>

              {/* Success Message */}
              {success && (
                <div className="mb-4 p-4 rounded-2xl bg-[#DBEAFE] text-[#1E40AF] text-sm text-right">
                  ההרשמה בוצעה בהצלחה! כעת תוכל <Link to="/login" className="font-semibold underline">להתחבר למערכת</Link>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 rounded-2xl bg-[#FEE2E2] text-[#B91C1C] text-sm text-right">
                  {error}
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                {fields.map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-[#071325] text-right mb-2">
                      {label}
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl bg-white text-[#071325] text-right placeholder-[#A0AEC0] focus:outline-none focus:ring-2 focus:ring-[#071325]/20 focus:border-[#071325] transition-colors"
                      type={type}
                      value={form[key]}
                      onChange={handleChange(key)}
                      placeholder={placeholder}
                    />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <button
                className="w-full mt-6 px-6 py-3 bg-[#071325] text-white font-semibold rounded-xl shadow-lg shadow-[#071325]/20 hover:bg-[#0b294c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "יוצר חשבון..." : "יצירת חשבון"}
              </button>

              {/* Footer */}
              <p className="text-center text-sm text-[#64748b] mt-4">
                כבר יש לך חשבון?{" "}
                <Link to="/login" className="font-semibold text-[#071325] hover:underline">
                  התחבר עכשיו
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}