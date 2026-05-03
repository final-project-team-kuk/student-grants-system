import { useState } from "react";

const gradCap = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#F5F1E9" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18V17l7 4 7-4v-3.82L12 17l-7-3.82z"/>
  </svg>
);

export default function Register({ onSwitchToLogin }) {
  const [activeTab, setActiveTab] = useState("register");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("נרשמת בהצלחה!");
      onSwitchToLogin();
    }
  } catch (error) {
    console.error("שגיאה ברישום:", error);
  } finally {
    setIsLoading(false);
  }
};

  const fields = [
    { key: "idNumber",        label: "מספר זהות",     placeholder: "הזן מספר זהות",    type: "text"     },
    { key: "firstName",       label: "שם פרטי",       placeholder: "הזן שם פרטי",      type: "text"     },
    { key: "lastName",        label: "שם משפחה",      placeholder: "הזן שם משפחה",     type: "text"     },
    { key: "password",        label: "סיסמה",         placeholder: "בחר סיסמה",        type: "password" },
    { key: "confirmPassword", label: "אימות סיסמה",   placeholder: "הזן סיסמה שוב",   type: "password" },
  ];

  return (
    <div className="min-h-screen bg-[#F2EDE4] flex items-center justify-center font-heebo rtl relative overflow-hidden p-10 px-4">
      {/* כתמים בולטים יותר ברקע */}
      <div className="fixed w-[580px] h-[580px] rounded-full bg-[radial-gradient(circle,rgba(10,25,47,0.18)_0%,transparent_70%)] -top-[120px] -left-[100px] blur-[80px] animate-[blobFloat_8s_ease-in-out_infinite] pointer-events-none" />
      <div className="fixed w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(10,25,47,0.14)_0%,transparent_70%)] -bottom-[80px] -right-[60px] blur-[70px] animate-[blobFloat_10s_ease-in-out_infinite_reverse] pointer-events-none" />

      <div className="flex flex-col items-center gap-4 animate-[fadeUp_0.7s_ease_both] z-10 w-full max-w-[480px]">
        {/* Title */}
        <h1 className="text-[#0A192F] text-[26px] font-extrabold tracking-[-0.3px] text-center">מערכת מענקים לסטודנטים</h1>
        <p className="text-[#5C6370] text-sm font-light text-center -mt-2">ניהול בקשות מענק אקדמי</p>

        {/* Logo */}
        <div className="mb-1">
          <div className="w-17 h-17 rounded-[18px] bg-[#0A192F] flex items-center justify-center shadow-[0_8px_32px_rgba(10,25,47,0.25)]">{gradCap}</div>
        </div>

        {/* Card */}
        <div className="mt-2 w-full bg-white/70 backdrop-blur-[18px] border border-[#0A192F]/10 rounded-[20px] p-7 pb-6 flex flex-col gap-[18px] shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
          {/* Tabs */}
          <div className="flex rounded-[12px] bg-[#E5E0D5] p-1 gap-1">
            <button
              className={`flex-1 py-[10px] rounded-[9px] border-none cursor-pointer text-[15px] font-heebo font-semibold transition-all duration-300 ease-in-out ${activeTab === "register" ? "bg-[#0A192F] text-[#F5F1E9] shadow-[0_4px_14px_rgba(10,25,47,0.2)]" : "bg-transparent text-[#5C6370]"}`}
              onClick={() => setActiveTab("register")}
            >
              הרשמה
            </button>
            <button
              className={`flex-1 py-[10px] rounded-[9px] border-none cursor-pointer text-[15px] font-heebo font-semibold transition-all duration-300 ease-in-out ${activeTab === "login" ? "bg-[#0A192F] text-[#F5F1E9] shadow-[0_4px_14px_rgba(10,25,47,0.2)]" : "bg-transparent text-[#5C6370]"}`}
              onClick={() => { setActiveTab("login"); onSwitchToLogin?.(); }}
            >
              כניסה למערכת
            </button>
          </div>

          {/* Fields */}
          {fields.map(({ key, label, placeholder, type }) => (
            <div key={key} className="flex flex-col gap-[7px]">
              <label className="text-[#0A192F] text-sm font-medium text-right">{label}</label>
              <input
                className="bg-white border border-[#D1D5DB] rounded-[12px] p-[13px_18px] text-[#0A192F] text-[15px] font-heebo text-right w-full transition-[border-color_0.2s,box-shadow_0.2s]"
                type={type}
                value={form[key]}
                onChange={handleChange(key)}
                placeholder={placeholder}
                dir="rtl"
              />
            </div>
          ))}

          {/* Submit */}
          <button
            className={`w-full p-[15px] rounded-[12px] border-none bg-[#0A192F] text-[#F5F1E9] text-[16px] font-bold font-heebo cursor-pointer tracking-[0.3px] shadow-[0_6px_24px_rgba(10,25,47,0.2)] mt-1 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "יוצר חשבון..." : "יצירת חשבון"}
          </button>

          {/* Footer */}
          <p className="text-[#5C6370] text-[13px] text-center -mt-1">
            כבר יש לך חשבון?{" "}
            <span className="text-[#0A192F] cursor-pointer font-semibold underline underline-offset-2" onClick={() => onSwitchToLogin?.()}>
              כניסה למערכת
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}