import React from 'react';
import { useForm } from 'react-hook-form';

export default function FromStepOne({ nextStep, formData, handleChange }) {
  
  // הפעלת ה-Hook עם הערכים הקיימים מ-formData (כדי שהנתונים לא יימחקו במעבר דפים)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nationalId: formData?.nationalId || '',
      firstName: formData?.firstName || '',
      lastName: formData?.lastName || '',
      birthDate: formData?.personal?.birthDate || '',
      city: formData?.personal?.city || '',
      address: formData?.personal?.address || '',
      mobile: formData?.personal?.mobile || '',
      phone: formData?.personal?.phone || '',
      email: formData?.email || ''
    }
  });

  // פונקציה שרצה רק אם כל שדות החובה והבדיקות עברו בהצלחה
  const onValidSubmit = (data) => {
    // עדכון ה-State של האב (HeaderSteps) בנתונים החדשים והנקיים
    handleChange({ target: { name: 'nationalId', value: data.nationalId } });
    handleChange({ target: { name: 'firstName', value: data.firstName } });
    handleChange({ target: { name: 'lastName', value: data.lastName } });
    handleChange({ target: { name: 'email', value: data.email } });
    
    // עדכון השדות הפנימיים של personal באב
    handleChange({ target: { name: 'personal.birthDate', value: data.birthDate } });
    handleChange({ target: { name: 'personal.city', value: data.city } });
    handleChange({ target: { name: 'personal.address', value: data.address } });
    handleChange({ target: { name: 'personal.mobile', value: data.mobile } });
    handleChange({ target: { name: 'personal.phone', value: data.phone } });

    nextStep(); // מעבר בטוח לשלב 2!
  };

  return (
    <div className="bg-white border border-[#e2dfd8] rounded-2xl relative overflow-hidden shadow-sm" dir="rtl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#071325]/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="p-8">
        {/* כותרת השלב */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[#071325]/15 p-3 rounded-xl border border-[#d5c9b5]">
            <svg className="w-6 h-6 text-[#071325]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#071325]">פרטים אישיים</h2>
            <p className="text-[#071325] text-sm">שלב 1 מתוך 6 - פרטי הסטודנט</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* 1. שדה תעודת זהות */}
            <div>
              <label className="block text-sm text-[#071325] mb-2">מספר זהות <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="הזן מספר זהות" 
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 ${errors.nationalId ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                {...register("nationalId", { 
                  required: "שדה חובה",
                  maxLength: { value: 9, message: "צריך 9 ספרות (יותר מדי)" },
                  minLength: { value: 9, message: "צריך 9 ספרות (פחות מדי)" },
                  validate: {
                    onlyNumbers: (value) => /^\d+$/.test(value) || "זה לא סיפרה - נא להזין מספרים בלבד"
                  }
                })}
              />
              {errors.nationalId && <p className="text-red-500 text-xs mt-1">{errors.nationalId.message}</p>}
            </div>

            {/* 2. שדה שם משפחה */}
            <div>
              <label className="block text-sm text-[#071325] mb-2">שם משפחה <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="הזן שם משפחה" 
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                {...register("lastName", { required: "יש להזין שם משפחה" })}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>

            {/* 3. שדה שם פרטי */}
            <div>
              <label className="block text-sm text-[#071325] mb-2">שם פרטי <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="הזן שם פרטי" 
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                {...register("firstName", { required: "יש להזין שם פרטי" })}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>

            {/* 4. שדה תאריך לידה */}
            <div>
              <label className="block text-sm text-[#071325] mb-2">תאריך לידה <span className="text-red-500">*</span></label>
              <input 
                type="date" 
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] ${errors.birthDate ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                {...register("birthDate", { 
                  required: "יש לבחור תאריך לידה",
                  validate: {
                    notFuture: (value) => {
                      const selected = new Date(value);
                      const today = new Date();
                      today.setHours(0,0,0,0);
                      return selected <= today || "תאריך הלידה אינו יכול להיות תאריך שעוד לא היה";
                    }
                  }
                })}
              />
              {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate.message}</p>}
            </div>

            {/* 5. שדה עיר מגורים */}
            <div>
              <label className="block text-sm text-[#071325] mb-2">עיר מגורים <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="הזן עיר מגורים" 
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 ${errors.city ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                {...register("city", { required: "יש להזין עיר מגורים" })}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>

            {/* 6. שדה כתובת */}
            <div>
              <label className="block text-sm text-[#071325] mb-2">כתובת <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="רחוב ומספר בית" 
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 ${errors.address ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                {...register("address", { required: "יש להזין כתובת מגורים" })}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>

            {/* 7. שדה טלפון נייד */}
            <div>
              <label className="block text-sm text-[#071325] mb-2">טלפון נייד <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                placeholder="05X-XXXXXXX" 
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 text-left ${errors.mobile ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                dir="ltr"
                {...register("mobile", { 
                  required: "שדה טלפון נייד הוא חובה",
                  pattern: { value: /^05\d-?\d{7}$/, message: "מספר טלפון נייד לא תקין (חייב להיות פורמט ישראלי 05X)" }
                })}
              />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
            </div>

            {/* 8. שדה טלפון נייח */}
            <div>
              <label className="block text-sm text-[#071325] mb-2">טלפון נייח</label>
              <input 
                type="tel" 
                placeholder="0X-XXXXXXX" 
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 text-left ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                dir="ltr"
                {...register("phone", { 
                  pattern: { value: /^0\d-?\d{7}$/, message: "מספר טלפון קווי לא תקין" }
                })}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* 9. שדה אימייל */}
            <div className="md:col-span-2">
              <label className="block text-sm text-[#071325] mb-2">כתובת אימייל <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                placeholder="example@email.com" 
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none transition text-sm text-[#071325] placeholder-[#071325]/50 text-left ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#d5c9b5] focus:border-[#071325]'}`}
                dir="ltr"
                {...register("email", { 
                  required: "כתובת אימייל היא שדה חובה",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "כתובת אימייל לא תקינה" }
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

          </div>
        </div>
      </div>

      {/* כפתור הניווט בתחתית הקופסה */}
      <div className="bg-gray-50 border-t border-[#e2dfd8] px-8 py-6 flex items-center justify-end mt-4 rounded-b-2xl">
        <button
          onClick={handleSubmit(onValidSubmit)}
          type="button"
          className="flex items-center gap-2 px-8 py-2.5 bg-[#071325] text-white font-medium rounded-xl hover:bg-[#071325]/80 shadow-lg shadow-[#071325]/20 transition-all duration-200 cursor-pointer"
        >
          <span>שמור והמשך לשלב הבא</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}