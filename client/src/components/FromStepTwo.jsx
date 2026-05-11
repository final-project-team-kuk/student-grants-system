
import React from 'react';

export default function FromStepTwo() {
  const steps = ['פרטים אישיים', 'פרטי משפחה', 'פרטי לימודים', 'פרטי בנק', 'העלאת קבצים', 'אישור ושליחה'];

  return (
    <div className="min-h-screen bg-[#f4f2ec] py-12">
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#071325] mb-2">הגשת בקשה למענק</h1>
          <p className="text-[#071325] text-sm">מלא את כל השלבים להגשת הבקשה</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-12 relative px-4" dir="rtl">
          <div className="absolute top-4 left-8 right-8 h-[2px] bg-[#d5c9b5] -z-10"></div>
          <div className="absolute top-4 right-8 w-[20%] h-[2px] bg-[#071325] -z-10"></div>

          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isActive = stepNum === 2;
            const isCompleted = stepNum < 2;

            return (
              <div key={stepNum} className="flex flex-col items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                    isCompleted
                      ? 'bg-[#071325] border-[#071325] text-white'
                      : isActive
                      ? 'bg-white border-[#071325] text-[#071325]'
                      : 'bg-white border-[#d5c9b5] text-[#071325]'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span className={`text-xs ${isActive || isCompleted ? 'text-[#071325]' : 'text-[#071325]'}`}>{step}</span>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#071325]/5 blur-3xl rounded-full pointer-events-none"></div>

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#071325]/15 p-3 rounded-xl border border-[#d5c9b5]">
              <svg className="w-6 h-6 text-[#071325]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#071325]">פרטי משפחה</h2>
              <p className="text-[#071325] text-sm">שלב 2 מתוך 6 - פרטי הורים ואחים</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-[#071325] text-sm font-medium mb-4 pb-2 border-b border-[#d5c9b5]">פרטי האב</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#071325] mb-2">מספר זהות <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="הזן מספר זהות"
                    className="w-full bg-white border border-[#d5c9b5] rounded-lg px-4 py-3 focus:outline-none focus:border-[#071325] transition text-sm text-[#071325] placeholder-[#071325]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#071325] mb-2">שם משפחה <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="הזן שם משפחה"
                    className="w-full bg-white border border-[#d5c9b5] rounded-lg px-4 py-3 focus:outline-none focus:border-[#071325] transition text-sm text-[#071325] placeholder-[#071325]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-[#071325] mb-2">שם פרטי <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="הזן שם פרטי"
                    className="w-full bg-white border border-[#d5c9b5] rounded-lg px-4 py-3 focus:outline-none focus:border-[#071325] transition text-sm text-[#071325] placeholder-[#071325]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
