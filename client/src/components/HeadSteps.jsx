import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FromStepTwo from './FromStepTwo'; 
// import FromStepOne from './FromStepOne'; // כשתצרי אותו

export default function HeaderSteps() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = Number(searchParams.get('step')) || 1;

  // 1. הגדרת השלבים במקום אחד מרכזי לכל הפרויקט!
  const steps = ['פרטים אישיים', 'פרטי משפחה', 'פרטי לימודים', 'פרטי בנק', 'העלאת קבצים', 'אישור ושליחה'];

  const goToNextStep = () => setSearchParams({ step: currentStep + 1 });
  const goToPrevStep = () => setSearchParams({ step: currentStep - 1 });

  // פונקציית הרינדור - מעבירים את steps פנימה למי שצריך
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        // return <FromStepOne nextStep={goToNextStep} currentStep={currentStep} steps={steps} />;
        // כרגע זמנית שמנו את שלב 2 במקומות הבאים כדי שתוכלי לבדוק
        return <FromStepTwo nextStep={goToNextStep} prevStep={goToPrevStep} currentStep={currentStep} steps={steps} studentId="MOCK_ID_123" />;
      case 2:
        return <FromStepTwo nextStep={goToNextStep} prevStep={goToPrevStep} currentStep={currentStep} steps={steps} studentId="MOCK_ID_123" />;
      default:
        return <div className="text-center text-[#071325]">השלב בבנייה...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ec] py-12" dir="rtl">
    <div className="min-h-screen bg-[#f4f2ec] py-12" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 pb-12">
        
        {/* כותרת כללית לטופס כולו שמקלה על העיצוב */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#071325] mb-2">הגשת בקשה למענק</h1>
          <p className="text-[#071325] text-sm">מלא את כל השלבים להגשת הבקשה</p>
        </div>

        {/* 2. הסטפר יכול לעבור לכאן בעתיד אם תרצי, או להישאר בתוך הדפים כשהוא מקבל את מערך ה-steps */}
        
        <div className="mt-8 transition-all duration-300">
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