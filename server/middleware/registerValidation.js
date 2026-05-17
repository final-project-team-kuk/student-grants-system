const NAME_REGEX  = /^[\u0590-\u05FFa-zA-Z\s'-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── אלגוריתם Luhn ישראלי ─────────────────────────────────────
const validateIsraeliId = (id) => {
  const padded = String(id).padStart(9, "0");
  if (!/^\d{9}$/.test(padded)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = Number(padded[i]) * ((i % 2) + 1);
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  return sum % 10 === 0;
};

// ── פונקציית בדיקה ראשית ─────────────────────────────────────
// מקבלת את אובייקט הטופס, מחזירה { errors, isValid }
const validateRegisterForm = (form) => {
  const errors = {};

  // שם פרטי
  if (!form.firstName.trim())
    errors.firstName = "שם פרטי הוא שדה חובה";
  else if (form.firstName.trim().length > 50)
    errors.firstName = "שם פרטי לא יכול לעלות על 50 תווים";
  else if (!NAME_REGEX.test(form.firstName.trim()))
    errors.firstName = "שם פרטי יכול להכיל אותיות בלבד";

  // שם משפחה
  if (!form.lastName.trim())
    errors.lastName = "שם משפחה הוא שדה חובה";
  else if (form.lastName.trim().length > 50)
    errors.lastName = "שם משפחה לא יכול לעלות על 50 תווים";
  else if (!NAME_REGEX.test(form.lastName.trim()))
    errors.lastName = "שם משפחה יכול להכיל אותיות בלבד";

  // מספר זהות
  if (!form.idNumber.trim())
    errors.idNumber = "מספר זהות הוא שדה חובה";
  else if (!/^\d+$/.test(form.idNumber.trim()))
    errors.idNumber = "מספר זהות חייב להכיל ספרות בלבד";
  else if (form.idNumber.trim().length !== 9)
    errors.idNumber = "מספר זהות חייב להכיל בדיוק 9 ספרות";
  else if (!validateIsraeliId(form.idNumber.trim()))
    errors.idNumber = "מספר זהות אינו תקין";

  // מייל
  if (!form.email.trim())
    errors.email = "כתובת מייל היא שדה חובה";
  else if (!EMAIL_REGEX.test(form.email.trim()))
    errors.email = "כתובת המייל אינה תקינה";

  // סיסמה
  if (!form.password)
    errors.password = "סיסמה היא שדה חובה";
  else if (form.password.length < 8)
    errors.password = "הסיסמה חייבת להכיל לפחות 8 תווים";
  else if (form.password.length > 64)
    errors.password = "הסיסמה לא יכולה לעלות על 64 תווים";
  else if (!/[A-Z]/.test(form.password))
    errors.password = "הסיסמה חייבת להכיל לפחות אות גדולה אחת באנגלית";
  else if (!/[a-z]/.test(form.password))
    errors.password = "הסיסמה חייבת להכיל לפחות אות קטנה אחת באנגלית";
  else if (!/\d/.test(form.password))
    errors.password = "הסיסמה חייבת להכיל לפחות ספרה אחת";

  // אימות סיסמה
  if (!form.confirmPassword)
    errors.confirmPassword = "אימות סיסמה הוא שדה חובה";
  else if (form.password !== form.confirmPassword)
    errors.confirmPassword = "הסיסמאות אינן תואמות";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export default validateRegisterForm;
