import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // לייבוא הניווט לדשבורד בסיום

// ייבוא הקומפוננטות המוכנות
import FromStepTwo from './FromStepTwo'; 
import Step3Studies from './Step3Studies';
import FromStepFour from './FromStepFour'; 
import { FormStep5 } from './FormStep5';
import SubmitRequestStep from './step6-confirm';

export default function HeaderSteps() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = Number(searchParams.get('step')) || 1;
  const [requestId, setRequestId] = useState(null);
  const navigate = useNavigate(); // מאתחלים את הניווט לדשבורד

  // ה-State המרכזי - מתחיל ריק ומתעדכן דינמית עם setFormData
  const [formData, setFormData] = useState({});

  // טעינת הטיוטה הגלובלית כשהאפליקציה עולה
  useEffect(() => {
    const savedGlobalDraft = localStorage.getItem('globalFormDraft');
    if (savedGlobalDraft) {
      setFormData(JSON.parse(savedGlobalDraft));
    }
  }, []);

  const handleSaveDraft = (childData = {}) => {
    const dataToSave = { ...formData, ...childData };
    setFormData(dataToSave);
    localStorage.setItem('globalFormDraft', JSON.stringify(dataToSave));
    alert('כל הנתונים נשמרו כטיוטה בהצלחה!');
  };

  // הפונקציה הגלובלית ששומרת את הנתונים במסד הנתונים באמת!
  const handleFinalSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("שגיאה: מזהה משתמש חסר. אנא התחבר מחדש.");
        return;
      }
     
     // בניית אובייקט מדויק לפי ה-Schema שהשרת מצפה לקבל
const finalPayload = {
  userId: userId,
  userSnapshot: {
    nationalId: localStorage.getItem("nationalId") || formData.idNumber || "000000000",
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || ""
  },
  personal: {
    birthDate: formData.birthDate || new Date(),
    city: formData.city || "לא הוכנסה עיר", // תיקון ל-personal.city
    address: formData.address || "לא הוכנסה כתובת",
    phone: formData.phone || "0000000000",
    mobile: formData.mobile || formData.phone || "0000000000" // תיקון ל-personal.mobile
  },
  family: {
    father: {
      id: formData.fatherIdNumber || "000000000",
      firstName: formData.fatherFirstName || "לא צויין",
      lastName: formData.fatherLastName || "לא צויין"
    },
    mother: {
      id: formData.motherIdNumber || "000000000",
      firstName: formData.motherFirstName || "לא צויינה",
      lastName: formData.motherLastName || "לא צויינה"
    },
    siblings: formData.siblings || []
  },
  education: {
    institution: formData.institution || "לא צויין",
    field: formData.department || "Other",
    years: Number(formData.yearOfStudy) || 1,
    tuition: Number(formData.tuition) || 0
  },
  bank: {
    // השרת דורש באנגלית: Hapoalim, Leumi, Discount, Mizrahi, Other
    bankName: ["Hapoalim", "Leumi", "Discount", "Mizrahi", "Other"].includes(formData.bankName) 
              ? formData.bankName 
              : "Other", 
    branch: formData.branch || "000", // תיקון ל-bank.branch
    accountNumber: formData.accountNumber || "0000000",
    ownerId: formData.ownerId || localStorage.getItem("nationalId") || "000000000"
  },
  files: {
    studentId: formData.files?.studentId || "placeholder.pdf",
    fatherId: formData.files?.fatherId || "placeholder.pdf",
    motherId: formData.files?.motherId || "placeholder.pdf",
    studyApproval: formData.files?.studyApproval || "placeholder.pdf",
    bankApproval: formData.files?.bankApproval || "placeholder.pdf"
  }
};

// רק אחרי שבנינו את המבנה הנכון, שולחים לשרת:
console.log("זה המבנה המסודר שנשלח כעת לשרת:", finalPayload);

const response = await fetch("http://localhost:5000/api/requests", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(finalPayload)
});

      if (response.ok) {
        alert("הבקשה נשלחה ונשמרה בהצלחה במסד הנתונים!");
        localStorage.removeItem('globalFormDraft'); // ניקוי הטיוטה מהדפדפן בסיום מוצלח
        navigate('/dashboard'); // ניווט חזרה לדף הבית של הסטודנט
      } else {
        const err = await response.json();
        alert(`שגיאה מהשרת: ${err.message || 'לא ניתן לשמור את הבקשה'}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("תקלת תקשורת עם השרת בהגשת הבקשה.");
    }
  };
  localStorage.removeItem('globalFormDraft'); // ניקוי הטיוטה מהדפדפן בסיום הגשת הבקשה (בין אם הצליחה או לא, כדי למנוע בלבול בעת התחלה של בקשה חדשה)

  // פונקציות ניווט
  const goToNextStep = () => {
    if (currentStep < 6) setSearchParams({ step: currentStep + 1 });
  };
  const goToPrevStep = () => {
    if (currentStep > 1) setSearchParams({ step: currentStep - 1 });
  };

  const steps = ['פרטים אישיים', 'פרטי משפחה', 'פרטי לימודים', 'פרטי בנק', 'העלאת קבצים', 'אישור ושליחה'];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-[#071325] mb-2">שלב 1: פרטים אישיים</h2>
            <p className="text-gray-500 mb-6">הקומפוננטה הזו עדיין בבנייה...</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => handleSaveDraft()} className="px-6 py-2 border border-[#d5c9b5] text-[#071325] rounded-lg">שמור טיוטה</button>
              <button onClick={goToNextStep} className="px-6 py-2 bg-[#071325] text-white rounded-lg font-bold">דילוג לשלב הבא</button>
            </div>
          </div>
        );

      case 2:
        return (
          <FromStepTwo 
            nextStep={goToNextStep} 
            prevStep={goToPrevStep} 
            formData={formData} 
            setFormData={setFormData} 
            currentStep={currentStep} 
            saveDraft={handleSaveDraft} 
          />
        );

      case 3:
        return (
          <Step3Studies
         nextStep={goToNextStep}
         prevStep={goToPrevStep}
         currentStep={currentStep}
         requestId={requestId}
         formData={formData} 
         setFormData={setFormData} // <-- להוסיף את זה
         saveDraft={handleSaveDraft} // <-- להוסיף את זה (אם תרצי כפתור שמירת טיוטה בשלב 3)
          />
        );

      case 4:
        return (
          <FromStepFour 
            formData={formData} 
            setFormData={setFormData} 
            nextStep={goToNextStep} 
            prevStep={goToPrevStep} 
            saveDraft={handleSaveDraft} 
            currentStep={currentStep}

          />
        );

      case 5:
        return (
          <FormStep5 
            formData={formData} 
            setFormData={setFormData} 
            nextStep={goToNextStep} 
            prevStep={goToPrevStep} 
            saveDraft={handleSaveDraft}
          />
        );

      case 6:
        return (
          <SubmitRequestStep 
            formData={formData} 
            prevStep={goToPrevStep} 
            onFinalSubmit={handleFinalSubmit} 
          />
        );

      default:
        return <div>שגיאה בטעינת השלב</div>;
    }
  };

  const progressWidth = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

  return (
    <div className="min-h-screen bg-[#f4f2ec] py-12" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 pb-12">
        
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#071325] mb-2">הגשת בקשה למענק</h1>
          <p className="text-[#071325] text-sm">מלא את כל השלבים להגשת הבקשה</p>
        </div>

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

        <div className="transition-all duration-300">
          {renderCurrentStep()}
        </div>

      </div>
    </div>
  );
}