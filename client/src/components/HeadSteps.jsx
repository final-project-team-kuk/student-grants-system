import React from 'react';
import { useSearchParams } from 'react-router-dom';

// ייבוא הקומפוננטות. ודאי שיש לך קבצים עבור השלבים האחרים שאינם בהערה
// import FromStepOne from './FromStepOne'; 
import FromStepTwo from './FromStepTwo'; 
//import FromStepOne from './FromStepOne';
export default function HeaderSteps() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = Number(searchParams.get('step')) || 1;

  // הפונקציות שאנחנו מעבירים פנימה כדי לאפשר לכפתורים לעבוד
  const goToNextStep = () => setSearchParams({ step: currentStep + 1 });
  const goToPrevStep = () => setSearchParams({ step: currentStep - 1 });

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        // כאן יש לרנדר את קומפוננטת שלב 1 ברגע שתיצרי אותה
        // return <FromStepOne nextStep={goToNextStep} currentStep={currentStep} />;
      //   return <FromStepOne nextStep={goToNextStep} currentStep={currentStep} />;
      //  case 1:
      //   // התיקון: מעבירים את currentStep לתוך השלב כדי שהסרגל יעבוד דינמית
        return <FromStepTwo nextStep={goToNextStep} prevStep={goToPrevStep} currentStep={currentStep} />;
        // return <FromStepThree nextStep={goToNextStep} prevStep={goToPrevStep} currentStep={currentStep} />;
  //    default:
        // return <FromStepOne nextStep={goToNextStep} currentStep={currentStep} />;
       // return <FromStepOne nextStep={goToNextStep} currentStep={currentStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ec] py-12">
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="mt-8 transition-all duration-300">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}