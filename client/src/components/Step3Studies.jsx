import { useForm } from 'react-hook-form';

export default function Step3Studies({ nextStep, prevStep, currentStep, requestId }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onValidSubmit = async (data) => {
    const education = {
      field: data.field,
      institution: data.institution,
      years: Number(data.years),
      tuition: Number(data.tuition),
    };

    await fetch(`http://localhost:5000/api/requests/${requestId}/education`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ education }),
    });

    nextStep();
  };

  return (
    <div className="bg-[#ece6db] min-h-screen text-[#0d1b2a] font-['Heebo']">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between bg-[#0c1e36] border-b border-white/10 sticky top-0 z-[100] text-white px-10 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1d3557] border border-white/10 rounded-[10px] flex items-center justify-center">
            <svg className="w-[22px] h-[22px] fill-white" viewBox="0 0 24 24">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
          </div>
          <span className="text-[17px] font-bold text-white">מערכת מענקים</span>
        </div>

        <div className="flex items-center gap-2">
          <a className="px-[18px] py-2 rounded-[10px] text-white/70 text-[15px] font-medium cursor-pointer">דף הבית</a>
          <a className="px-[18px] py-2 rounded-[10px] bg-white/10 text-white text-[15px] font-medium cursor-pointer">הגשת בקשה</a>
          <a className="px-[18px] py-2 rounded-[10px] text-white/70 text-[15px] font-medium cursor-pointer">סטטוס בקשה</a>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-[12px] px-4 py-2">
            <div className="w-8 h-8 bg-[#e2dcd0] text-[#0c1e36] rounded-full flex items-center justify-center text-[13px] font-bold">יכ</div>
            <span className="text-[14px] font-medium text-white">ישראל כהן</span>
          </div>
          <button className="bg-white/5 border border-white/10 rounded-[10px] text-white/70 text-[14px] px-4 py-2 cursor-pointer">יציאה</button>
        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-[780px] mx-auto px-6 py-12">
        <div className="mb-9">
          <h2 className="text-[28px] font-bold text-[#0c1e36]">הגשת בקשה למענק</h2>
          <p className="text-[#0c1e36]/60 text-[15px] mt-1.5">מלא את כל השלבים להגשת הבקשה</p>
        </div>

        {/* STEPPER */}
        <div className="flex items-start mb-10">
          {[
            { num: 1, label: 'פרטים אישיים' },
            { num: 2, label: 'פרטי משפחה' },
            { num: 3, label: 'פרטי לימודים' },
            { num: 4, label: 'פרטי בנק' },
            { num: 5, label: 'העלאת קבצים' },
            { num: 6, label: 'אישור ושליחה' },
          ].map((step, i, arr) => (
            <div key={step.num} className="flex items-start flex-1">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-[13px] font-bold z-10 ${
                  step.num < currentStep ? 'bg-[#0c1e36] border-[#0c1e36] text-white' :
                  step.num === currentStep ? 'bg-[#0c1e36] border-[#0c1e36] text-white shadow-lg shadow-[#0c1e36]/20' :
                  'bg-white border-[#0c1e36]/20 text-[#0c1e36]/40'
                }`}>
                  {step.num < currentStep ? '✓' : step.num}
                </div>
                <span className={`text-[12px] font-medium whitespace-nowrap ${step.num <= currentStep ? 'text-[#0c1e36]' : 'text-[#0c1e36]/40'}`}>
                  {step.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className={`flex-1 h-[2px] mt-[18px] ${step.num < currentStep ? 'bg-[#0c1e36]' : 'bg-[#0c1e36]/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* CARD */}
        <div className="bg-white border border-[#0c1e36]/10 rounded-[24px] shadow-sm p-10">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#0c1e36]/10">
            <div className="w-12 h-12 bg-[#0c1e36] rounded-[14px] flex items-center justify-center shadow-lg shadow-[#0c1e36]/10">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-[#0c1e36]">פרטי לימודים</h3>
              <p className="text-[13px] text-[#0c1e36]/50 mt-1">שלב 3 מתוך 6 – פרטי המוסד האקדמי</p>
            </div>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-[14px] font-medium text-[#0c1e36]/75">
                מגמה <span className="text-red-400">*</span>
              </label>
              <select
                className={`px-4 py-3 bg-[#f5f1ea] border rounded-[12px] text-[#0c1e36] text-[15px] outline-none focus:ring-4 focus:ring-[#0c1e36]/10 transition-all ${errors.field ? 'border-red-400' : 'border-[#0c1e36]/10 focus:border-[#0c1e36]'}`}
                {...register('field', { required: 'יש לבחור מגמה' })}
                defaultValue=""
              >
                <option value="" disabled>בחר מגמה</option>
                <option value="Computer Science">מדעי המחשב</option>
                <option value="Engineering">הנדסת תוכנה</option>
                <option value="Math">מתמטיקה</option>
                <option value="Other">אחר</option>
              </select>
              {errors.field && <p className="text-red-400 text-[12px]">{errors.field.message}</p>}
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-[14px] font-medium text-[#0c1e36]/75">
                שם מוסד לימודים <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="הזן שם המוסד האקדמי"
                className={`px-4 py-3 bg-[#f5f1ea] border rounded-[12px] text-[#0c1e36] text-[15px] outline-none focus:ring-4 focus:ring-[#0c1e36]/10 transition-all ${errors.institution ? 'border-red-400' : 'border-[#0c1e36]/10 focus:border-[#0c1e36]'}`}
                {...register('institution', { required: 'יש להזין שם מוסד' })}
              />
              {errors.institution && <p className="text-red-400 text-[12px]">{errors.institution.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#0c1e36]/75">
                מספר שנות לימוד <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                placeholder="לדוגמה: 3"
                min="1"
                max="10"
                className={`px-4 py-3 bg-[#f5f1ea] border rounded-[12px] text-[#0c1e36] text-[15px] outline-none focus:ring-4 focus:ring-[#0c1e36]/10 transition-all ${errors.years ? 'border-red-400' : 'border-[#0c1e36]/10 focus:border-[#0c1e36]'}`}
                {...register('years', { required: 'יש להזין מספר שנים', min: { value: 1, message: 'מינימום שנה אחת' } })}
              />
              {errors.years && <p className="text-red-400 text-[12px]">{errors.years.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#0c1e36]/75">
                שכר לימוד שנתי (₪) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                placeholder="לדוגמה: 12000"
                min="0"
                className={`px-4 py-3 bg-[#f5f1ea] border rounded-[12px] text-[#0c1e36] text-[15px] outline-none focus:ring-4 focus:ring-[#0c1e36]/10 transition-all ${errors.tuition ? 'border-red-400' : 'border-[#0c1e36]/10 focus:border-[#0c1e36]'}`}
                {...register('tuition', { required: 'יש להזין שכר לימוד', min: { value: 0, message: 'ערך לא תקין' } })}
              />
              {errors.tuition && <p className="text-red-400 text-[12px]">{errors.tuition.message}</p>}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-between mt-9 pt-6 border-t border-[#0c1e36]/10">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-white border border-[#0c1e36]/20 rounded-[12px] text-[#0c1e36] text-[15px] font-medium cursor-pointer hover:bg-[#0c1e36]/5 transition-all"
              >
                ← הקודם
              </button>
            </div>

            <button
              type="button"
              onClick={handleSubmit(onValidSubmit)}
              className="px-7 py-3 bg-[#0c1e36] rounded-[12px] text-white text-[15px] font-semibold cursor-pointer hover:bg-[#1d3557] transition-all shadow-lg shadow-[#0c1e36]/10"
            >
              הבא →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
