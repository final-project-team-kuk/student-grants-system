const ISRAEL_ID_LENGTH = 9;
const MAX_PASSWORD_LEN = 64;

const validateLoginForm = (form) => {
  const errors = {};

  if (!form.idNumber?.trim())
    errors.idNumber = "מספר זהות הוא שדה חובה";
  else if (!/^\d+$/.test(form.idNumber.trim()))
    errors.idNumber = "מספר זהות חייב להכיל ספרות בלבד";
  else if (form.idNumber.trim().length !== ISRAEL_ID_LENGTH)
    errors.idNumber = `מספר זהות חייב להכיל בדיוק ${ISRAEL_ID_LENGTH} ספרות`;

  if (!form.password)
    errors.password = "סיסמה היא שדה חובה";
  else if (form.password.length > MAX_PASSWORD_LEN)
    errors.password = `הסיסמה לא יכולה לעלות על ${MAX_PASSWORD_LEN} תווים`;

  return { errors, isValid: Object.keys(errors).length === 0 };
};

export default validateLoginForm;