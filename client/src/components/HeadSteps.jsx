import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// ייבוא הקומפוננטות המוכנות בלבד
import FromStepTwo from './FromStepTwo'; 
import FromStepFour from './FromStepFour'; // שלב 4 של פרטי הבנק
import { FormStep5 } from './FormStep5';

export default function HeaderSteps() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = Number(searchParams.get('step')) || 1;

  // ה-State המרכזי שומר את כל נתוני הטופס ביחד, כדי ששום דבר לא ייאבד במעברים
  const [formData, setFormData] = useState({
    // שדות שלב 2 (פרטי משפחה) - יתווספו כאן לפי הצורך
    
    // שדות שלב 4 (פרטי בנק)
    accountHolderId: '',
    bankName: '',
    branchNumber: '',
    accountNumber: '',
  });

  // פונקציית עדכון השדות הגלובלית
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // פונקציות ניווט (מעבר בין 1 ל-6)
  const goToNextStep = () => {
    if (currentStep < 6) setSearchParams({ step: currentStep + 1 });
  };
  const goToPrevStep = () => {
    if (currentStep > 1) setSearchParams({ step: currentStep - 1 });
  };

  // רשימת ששת השלבים המלאה להצגה ב-Stepper
  const steps = ['פרטים אישיים', 'פרטי משפחה', 'פרטי לימודים', 'פרטי בנק', 'העלאת קבצים', 'אישור ושליחה'];

  // רינדור דינמי לפי מצב הפיתוח הנוכחי שלכן
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-[#071325] mb-2">שלב 1: פרטים אישיים</h2>
            <p className="text-gray-500 mb-6">הקומפוננטה הזו עדיין בבנייה...</p>
            <button onClick={goToNextStep} className="px-6 py-2 bg-[#071325] text-white rounded-lg font-bold">דילוג לשלב הבא</button>
          </div>
        );

      case 2:
        // ✅ שלב 2 מוכן ומחובר!
        return <FromStepTwo nextStep={goToNextStep} prevStep={goToPrevStep} formData={formData} handleChange={handleChange} currentStep={currentStep} />;

      case 3:
        return (
          <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-[#071325] mb-2">שלב 3: פרטי לימודים</h2>
            <p className="text-gray-500 mb-6">הקומפוננטה הזו עדיין בבנייה...</p>
            <div className="flex justify-center gap-4">
              <button onClick={goToNextStep} className="px-6 py-2 bg-[#071325] text-white rounded-lg font-bold">דילוג לשלב הבא</button>
              <button onClick={goToPrevStep} className="px-6 py-2 border border-[#d5c9b5] text-[#071325] rounded-lg">חזור</button>
            </div>
          </div>
        );

      case 4:
        // ✅ שלב 4 מוכן ומחובר!
        return <FromStepFour formData={formData} handleChange={handleChange} nextStep={goToNextStep} prevStep={goToPrevStep} />;

      case 5:
         return (
    <FormStep5
      nextStep={goToNextStep}
      prevStep={goToPrevStep}
    />
  );
        

      case 6:
        return (
          <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-[#071325] mb-2">שלב 6: אישור ושליחה</h2>
            <p className="text-gray-500 mb-6">הקומפוננטה הזו עדיין בבנייה...</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => alert('הטופס נשלח בהצלחה! (בכאילו)')} className="px-6 py-2 bg-green-700 text-white rounded-lg font-bold">שלח בקשה סופית</button>
              <button onClick={goToPrevStep} className="px-6 py-2 border border-[#d5c9b5] text-[#071325] rounded-lg">חזור</button>
            </div>
          </div>
        );

      default:
        return <div>שגיאה בטעינת השלב</div>;
    }
  };

  // חישוב דינמי של אורך קו ההתקדמות הכחול
  const progressWidth = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

  return (
    <div className="min-h-screen bg-[#f4f2ec] py-12" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 pb-12">
        
        {/* כותרת קבועה לכל השלבים */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#071325] mb-2">הגשת בקשה למענק</h1>
          <p className="text-[#071325] text-sm">מלא את כל השלבים להגשת הבקשה</p>
        </div>

        {/* ה-Stepper המרכזי והחכם */}
        <div className="flex justify-between items-center mb-12 relative px-4">
          <div className="absolute top-4 left-8 right-8 h-[2px] bg-[#d5c9b5] -z-10"></div>
          <div 
            className="absolute top-4 h-[2px] bg-[#071325] -z-10 transition-all duration-300"
            style={{ width: progressWidth, right: '32px' }}
          ></div>

          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;

            return (
              <div key={stepNum} className="flex flex-col items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                    isCompleted
                      ? 'bg-[#071325] border-[#071325] text-white'
                      : isActive
                      ? 'bg-white border-[#071325] text-[#071325] font-bold'
                      : 'bg-white border-[#d5c9b5] text-[#071325]'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span className={`text-xs ${isActive || isCompleted ? 'font-bold text-[#071325]' : 'text-[#071325] opacity-60'}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* תוכן הצעד המשתנה */}
        <div className="transition-all duration-300">
          {renderCurrentStep()}
        </div>

      </div>
    </div>
  );
}
// import React from 'react';
// import { useSearchParams } from 'react-router-dom';

// // ייבוא הקומפוננטות. ודאי שיש לך קבצים עבור השלבים האחרים שאינם בהערה
// // import FromStepOne from './FromStepOne'; 
// import FromStepTwo from './FromStepTwo'; 
// //import FromStepOne from './FromStepOne';
// export default function HeaderSteps() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentStep = Number(searchParams.get('step')) || 1;

//   // הפונקציות שאנחנו מעבירים פנימה כדי לאפשר לכפתורים לעבוד
//   const goToNextStep = () => setSearchParams({ step: currentStep + 1 });
//   const goToPrevStep = () => setSearchParams({ step: currentStep - 1 });

//   const renderCurrentStep = () => {
//     switch (currentStep) {
//       case 1:
//         // כאן יש לרנדר את קומפוננטת שלב 1 ברגע שתיצרי אותה
//         // return <FromStepOne nextStep={goToNextStep} currentStep={currentStep} />;
//       //   return <FromStepOne nextStep={goToNextStep} currentStep={currentStep} />;
//       //  case 1:
//       //   // התיקון: מעבירים את currentStep לתוך השלב כדי שהסרגל יעבוד דינמית
//         return <FromStepTwo nextStep={goToNextStep} prevStep={goToPrevStep} currentStep={currentStep} />;
//         // return <FromStepThree nextStep={goToNextStep} prevStep={goToPrevStep} currentStep={currentStep} />;
//   //    default:
//         // return <FromStepOne nextStep={goToNextStep} currentStep={currentStep} />;
//        // return <FromStepOne nextStep={goToNextStep} currentStep={currentStep} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f4f2ec] py-12">
//       <div className="max-w-3xl mx-auto px-4 pb-12">
//         <div className="mt-8 transition-all duration-300">
//           {renderCurrentStep()}
//         </div>
//       </div>
//     </div>
//   );
// }