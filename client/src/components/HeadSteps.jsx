import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FromStepTwo from './FromStepTwo';
import Step3Studies from './Step3Studies';

export default function HeaderSteps() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = Number(searchParams.get('step')) || 1;
  const [requestId, setRequestId] = useState(null);

  const goToNextStep = () => setSearchParams({ step: currentStep + 1 });
  const goToPrevStep = () => setSearchParams({ step: currentStep - 1 });

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <FromStepTwo nextStep={goToNextStep} prevStep={goToPrevStep} currentStep={currentStep} setRequestId={setRequestId} />;
      case 3:
        return <Step3Studies nextStep={goToNextStep} prevStep={goToPrevStep} currentStep={currentStep} requestId={requestId} />;
      default:
        return <FromStepTwo nextStep={goToNextStep} prevStep={goToPrevStep} currentStep={currentStep} setRequestId={setRequestId} />;
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