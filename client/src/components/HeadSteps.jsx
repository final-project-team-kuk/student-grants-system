import React from 'react';
import { useSearchParams } from 'react-router-dom';
import FromStepTwo from './FromStepTwo'; 
// import FromStepOne from './FromStepOne'; // כשתצרי אותו

export default function HeaderSteps() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = Number(searchParams.get('step')) || 1;

  // הגדרת השלבים במקום אחד מרכזי לכל הפרויקט
  const steps = [
    'פרטים אישיים', 
    'פרטי משפחה', 
    'פרטי לימודים', 
    'פרטי בנק', 
    'העלאת קבצים', 
    'אישור ושליחה'
  ];

  const goToNextStep = () => setSearchParams({ step: currentStep + 1 });
  const goToPrevStep = () => setSearchParams({ step: currentStep - 1 });

  // פונקציית הרינדור - מציגה את הקומפוננטה המתאימה לפי השלב
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        // בעתיד תשני לכאן את שלב 1:
        // return <FromStepOne nextStep={goToNextStep} currentStep={currentStep} steps={steps} />;
        
        // כרגע זמנית מציג את שלב 2 כדי שתוכלי לבדוק
        return (
          <FromStepTwo 
            nextStep={goToNextStep} 
            prevStep={goToPrevStep} 
            currentStep={currentStep} 
            steps={steps} 
            studentId="MOCK_ID_123" 
          />
        );
      case 2:
        return (
          <FromStepTwo 
            nextStep={goToNextStep} 
            prevStep={goToPrevStep} 
            currentStep={currentStep} 
            steps={steps} 
            studentId="MOCK_ID_123" 
          />
        );
      default:
        return <div className="text-center text-[#071325]">השלב בבנייה...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ec] py-12" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 pb-12">
        
        {/* כותרת כללית לטופס כולו שמקלה על העיצוב */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#071325] mb-2">הגשת בקשה למענק</h1>
          <p className="text-[#071325] text-sm">מלא את כל השלבים להגשת הבקשה</p>
        </div>

        {/* אזור רינדור התוכן הדינמי */}
        <div className="mt-8 transition-all duration-300">
          {renderCurrentStep()}
        </div>

      </div>
    </div>
  );
}