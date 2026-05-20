// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';

// // ייבוא הקומפוננטות המוכנות בלבד
// import FromStepTwo from './FromStepTwo'; 
// import FromStepFour from './FromStepFour'; // שלב 4 של פרטי הבנק
// import Step3Studies from './Step3Studies';
// import { FormStep5 } from './FormStep5';

// export default function HeaderSteps() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentStep = Number(searchParams.get('step')) || 1;
//   const [requestId, setRequestId] = useState(null);

//   // ה-State המרכזי שומר את כל נתוני הטופס ביחד
//   const [formData, setFormData] = useState({});

//   // טעינת הטיוטה הגלובלית כשהאפליקציה עולה
//   useEffect(() => {
//     const savedGlobalDraft = localStorage.getItem('globalFormDraft');
//     if (savedGlobalDraft) { // תוקן: כאן הייתה שגיאת ההקלדה
//       setFormData(JSON.parse(savedGlobalDraft));
//     }
//   }, []); // רץ פעם אחת בטעינה הראשונית

//   // פונקציה גלובלית לשמירת הטיוטה (מעודכנת כדי לתמוך בשלב 2)
//   const handleSaveDraft = (childData = {}) => {
//     const dataToSave = { ...formData, ...childData }; // ממזג את המידע מהאבא עם המידע מהילד
//     setFormData(dataToSave);
//     localStorage.setItem('globalFormDraft', JSON.stringify(dataToSave));
//     alert('כל הנתונים נשמרו כטיוטה בהצלחה!');
//   };

//   // פונקציית עדכון השדות הגלובלית
//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [name]: value,
//   //   }));
//   // };
//   // 2. תוספת: פונקציה חדשה שמקבלת נתונים משלב ספציפי וממזגת אותם לתוך ה-State הגלובלי
//   const handleStepSubmit = (stepData) => {
//     setFormData((prev) => ({
//       ...prev,
//       ...stepData, // לוקח את מה שהיה ומוסיף/מעדכן את השדות החדשים שהגיעו מהשלב
//     }));
//   };

//   // פונקציות ניווט
//   const goToNextStep = () => {
//     if (currentStep < 6) setSearchParams({ step: currentStep + 1 });
//   };
//   const goToPrevStep = () => {
//     if (currentStep > 1) setSearchParams({ step: currentStep - 1 });
//   };

//   const steps = ['פרטים אישיים', 'פרטי משפחה', 'פרטי לימודים', 'פרטי בנק', 'העלאת קבצים', 'אישור ושליחה'];

//   const renderCurrentStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 text-center shadow-sm">
//             <h2 className="text-xl font-bold text-[#071325] mb-2">שלב 1: פרטים אישיים</h2>
//             <p className="text-gray-500 mb-6">הקומפוננטה הזו עדיין בבנייה...</p>
//             <div className="flex justify-center gap-4">
//               <button onClick={() => handleSaveDraft()} className="px-6 py-2 border border-[#d5c9b5] text-[#071325] rounded-lg">שמור טיוטה</button>
//               <button onClick={goToNextStep} className="px-6 py-2 bg-[#071325] text-white rounded-lg font-bold">דילוג לשלב הבא</button>
//             </div>
//           </div>
//         );

//       case 2:
//         // תוקן: הוספנו את setFormData כדי ששלב 2 יוכל לעדכן את האבא
//         return <FromStepTwo nextStep={goToNextStep} prevStep={goToPrevStep} formData={formData} setFormData={setFormData} currentStep={currentStep} saveDraft={handleSaveDraft} />;

//       case 3:
//         return (
// <<<<<<< HEAD
//           <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 text-center shadow-sm">
//             <h2 className="text-xl font-bold text-[#071325] mb-2">שלב 3: פרטי לימודים</h2>
//             <p className="text-gray-500 mb-6">הקומפוננטה הזו עדיין בבנייה...</p>
//             <div className="flex justify-center gap-4">
//               <button onClick={goToPrevStep} className="px-6 py-2 border border-[#d5c9b5] text-[#071325] rounded-lg">חזור</button>
//               <button onClick={() => handleSaveDraft()} className="px-6 py-2 border border-[#d5c9b5] text-[#071325] rounded-lg">שמור טיוטה</button>
//               <button onClick={goToNextStep} className="px-6 py-2 bg-[#071325] text-white rounded-lg font-bold">דילוג לשלב הבא</button>
//             </div>
//           </div>
//         );

//       case 4:
// <<<<<<< HEAD
//         // ✅ שלב 4 מוכן ומחובר!
//         return <FromStepFour defaultValues={formData} onStepSubmit={handleStepSubmit} nextStep={goToNextStep} prevStep={goToPrevStep} />;
// =======
//         return <FromStepFour formData={formData} handleChange={handleChange} nextStep={goToNextStep} prevStep={goToPrevStep} saveDraft={handleSaveDraft} />;
// >>>>>>> ced7a05f4cf1ac89d4053fbd591215b92410877b

//       case 5:
//         return (
//           <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 text-center shadow-sm">
//             <h2 className="text-xl font-bold text-[#071325] mb-2">שלב 5: העלאת קבצים</h2>
//             <p className="text-gray-500 mb-6">הקומפוננטה הזו עדיין בבנייה...</p>
//             <div className="flex justify-center gap-4">
//               <button onClick={goToNextStep} className="px-6 py-2 bg-[#071325] text-white rounded-lg font-bold">דילוג לשלב הבא</button>
//               <button onClick={goToPrevStep} className="px-6 py-2 border border-[#d5c9b5] text-[#071325] rounded-lg">חזור</button>
//             </div>
//           </div>
// =======
//          <Step3Studies
//           nextStep={goToNextStep}
//           prevStep={goToPrevStep}
//           currentStep={currentStep}
//           requestId={requestId}
//         />
// >>>>>>> 6abeb4dd3e9ba4dffed7ebab04e6921e8457cea4
//         );

//       case 6:
//         return (
//           <div className="bg-white border border-[#e2dfd8] rounded-2xl p-8 text-center shadow-sm">
//             <h2 className="text-xl font-bold text-[#071325] mb-2">שלב 6: אישור ושליחה</h2>
//             <p className="text-gray-500 mb-6">הקומפוננטה הזו עדיין בבנייה...</p>
//             <div className="flex justify-center gap-4">
// <<<<<<< HEAD
//               <button onClick={() =>{
//                 console.log("הנתונים הסופיים של כל הטופס",formData); alert('הטופס נשלח בהצלחה! (בכאילו)')}}
//                className="px-6 py-2 bg-green-700 text-white rounded-lg font-bold">שלח בקשה סופית</button>
// =======
// >>>>>>> ced7a05f4cf1ac89d4053fbd591215b92410877b
//               <button onClick={goToPrevStep} className="px-6 py-2 border border-[#d5c9b5] text-[#071325] rounded-lg">חזור</button>
//               <button 
//                 onClick={() => {
//                   alert('הטופס נשלח בהצלחה! (בכאילו)');
//                   localStorage.removeItem('globalFormDraft'); // מוחק את הטיוטה בסיום התהליך
//                 }} 
//                 className="px-6 py-2 bg-green-700 text-white rounded-lg font-bold"
//               >
//                 שלח בקשה סופית
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return <div>שגיאה בטעינת השלב</div>;
//     }
//   };

//   const progressWidth = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

//   return (
//     <div className="min-h-screen bg-[#f4f2ec] py-12" dir="rtl">
//       <div className="max-w-3xl mx-auto px-4 pb-12">
        
//         <div className="text-center mb-10">
//           <h1 className="text-2xl font-bold text-[#071325] mb-2">הגשת בקשה למענק</h1>
//           <p className="text-[#071325] text-sm">מלא את כל השלבים להגשת הבקשה</p>
//         </div>

//         <div className="flex justify-between items-center mb-12 relative px-4">
//           <div className="absolute top-4 left-8 right-8 h-[2px] bg-[#d5c9b5] -z-10"></div>
//           <div 
//             className="absolute top-4 h-[2px] bg-[#071325] -z-10 transition-all duration-300"
//             style={{ width: progressWidth, right: '32px' }}
//           ></div>

//           {steps.map((step, index) => {
//             const stepNum = index + 1;
//             const isActive = stepNum === currentStep;
//             const isCompleted = stepNum < currentStep;

//             return (
//               <div key={stepNum} className="flex flex-col items-center gap-2">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
//                     isCompleted
//                       ? 'bg-[#071325] border-[#071325] text-white'
//                       : isActive
//                       ? 'bg-white border-[#071325] text-[#071325] font-bold'
//                       : 'bg-white border-[#d5c9b5] text-[#071325]'
//                   }`}
//                 >
//                   {isCompleted ? '✓' : stepNum}
//                 </div>
//                 <span className={`text-xs ${isActive || isCompleted ? 'font-bold text-[#071325]' : 'text-[#071325] opacity-60'}`}>
//                   {step}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         <div className="transition-all duration-300">
//           {renderCurrentStep()}
//         </div>

//       </div>
//     </div>
//   );
// }{}
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
  const navigate = useNavigate(); // 🌟 מאתחלים את הניווט לדשבורד

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
  // 🌟 הפונקציה הגלובלית ששלחת - שומרת את הנתונים במסד הנתונים באמת!
  const handleFinalSubmit = async () => {
    
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("שגיאה: מזהה משתמש חסר. אנא התחבר מחדש.");
        return;
      }
     
      // שילוב כל הנתונים מהטופס ביחד עם ה-userId
      const finalPayload = {
        ...formData,
        userId: userId
      };

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
        // שלב 2 - עובד נקי רק עם סטייט ועדכון ישיר
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
        // שלב 3 - פרטי לימודים (שולב בהצלחה מתוך ה-main)
        return (
          <Step3Studies
            nextStep={goToNextStep}
            prevStep={goToPrevStep}
            currentStep={currentStep}
            requestId={requestId}
          />
        );

      case 4:
        // שלב 4 - מותאם לעבודה רק עם הסטייט המרכזי
        return (
          <FromStepFour 
            formData={formData} 
            setFormData={setFormData} 
            nextStep={goToNextStep} 
            prevStep={goToPrevStep} 
            saveDraft={handleSaveDraft} 
          />
        );

      case 5:
        // שלב 5 - העלאת קבצים
        return (
          <FormStep5 
            nextStep={goToNextStep} 
            prevStep={goToPrevStep} 
          />
        );

      case 6:
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