const ISRAEL_ID_LENGTH = 9;
const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 64;
const MAX_NAME_LEN     = 50;
const EMAIL_REGEX      = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX       = /^[\u0590-\u05FFa-zA-Z\s'-]+$/;

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

const validateRegisterForm = (form) => {
  const errors = {};

  if (!form.firstName.trim())
    errors.firstName = "שם פרטי הוא שדה חובה";
  else if (form.firstName.trim().length > MAX_NAME_LEN)
    errors.firstName = `שם פרטי לא יכול לעלות על ${MAX_NAME_LEN} תווים`;
  else if (!NAME_REGEX.test(form.firstName.trim()))
    errors.firstName = "שם פרטי יכול להכיל אותיות בלבד";

  if (!form.lastName.trim())
    errors.lastName = "שם משפחה הוא שדה חובה";
  else if (form.lastName.trim().length > MAX_NAME_LEN)
    errors.lastName = `שם משפחה לא יכול לעלות על ${MAX_NAME_LEN} תווים`;
  else if (!NAME_REGEX.test(form.lastName.trim()))
    errors.lastName = "שם משפחה יכול להכיל אותיות בלבד";

  if (!form.idNumber.trim())
    errors.idNumber = "מספר זהות הוא שדה חובה";
  else if (!/^\d+$/.test(form.idNumber.trim()))
    errors.idNumber = "מספר זהות חייב להכיל ספרות בלבד";
  else if (form.idNumber.trim().length !== ISRAEL_ID_LENGTH)
    errors.idNumber = `מספר זהות חייב להכיל בדיוק ${ISRAEL_ID_LENGTH} ספרות`;
  else if (!validateIsraeliId(form.idNumber.trim()))
    errors.idNumber = "מספר זהות אינו תקין";

  if (!form.email.trim())
    errors.email = "כתובת מייל היא שדה חובה";
  else if (!EMAIL_REGEX.test(form.email.trim()))
    errors.email = "כתובת המייל אינה תקינה";

  if (!form.password)
    errors.password = "סיסמה היא שדה חובה";
  else if (form.password.length < MIN_PASSWORD_LEN)
    errors.password = `הסיסמה חייבת להכיל לפחות ${MIN_PASSWORD_LEN} תווים`;
  else if (form.password.length > MAX_PASSWORD_LEN)
    errors.password = `הסיסמה לא יכולה לעלות על ${MAX_PASSWORD_LEN} תווים`;
  else if (!/[A-Z]/.test(form.password))
    errors.password = "הסיסמה חייבת להכיל לפחות אות גדולה אחת באנגלית";
  else if (!/[a-z]/.test(form.password))
    errors.password = "הסיסמה חייבת להכיל לפחות אות קטנה אחת באנגלית";
  else if (!/\d/.test(form.password))
    errors.password = "הסיסמה חייבת להכיל לפחות ספרה אחת";

  if (!form.confirmPassword)
    errors.confirmPassword = "אימות סיסמה הוא שדה חובה";
  else if (form.password !== form.confirmPassword)
    errors.confirmPassword = "הסיסמאות אינן תואמות";

  return { errors, isValid: Object.keys(errors).length === 0 };
};

export default validateRegisterForm;