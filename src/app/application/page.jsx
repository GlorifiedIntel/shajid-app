'use client'

import { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';

import styles from './application.module.css';

const steps = [
  'Personal Info',
  'Address Info',
  'Academic Info',
  'Program Selection',
  'Health Info',
  'Payment',
  'Review & Submit',
];

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  // Load saved data from localStorage
  useEffect(() => {
    const savedStep = localStorage.getItem('nursingFormStep');
    const savedData = localStorage.getItem('nursingFormData');
    if (savedStep) setStep(parseInt(savedStep));
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  // Save data to localStorage on every change
  useEffect(() => {
    localStorage.setItem('nursingFormStep', step.toString());
    localStorage.setItem('nursingFormData', JSON.stringify(formData));
  }, [step, formData]);

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);
  const handleSaveExit = () => {
  alert("Your progress has been saved. You can return later to complete your registration.");
  
  router.push('/');
};

  const handleStepClick = (index) => {
    if (index + 1 <= step) setStep(index + 1);
  };

  const clearForm = () => {
    localStorage.removeItem('nursingFormStep');
    localStorage.removeItem('nursingFormData');
    setStep(1);
    setFormData({});
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.breadcrumbs}>
        {steps.map((label, index) => (
          <div
            key={label}
            className={`${styles.stepItem} ${
              step === index + 1
                ? styles.active
                : step > index + 1
                ? styles.completed
                : ''
            }`}
            onClick={() => handleStepClick(index)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className={styles.stepIndicator}>Step {step} of {steps.length}</div>

     {step === 1 && <Step1 onNext={handleNext} />}
     {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} onSaveExit={handleSaveExit} />}
     {step === 3 && <Step3 onNext={handleNext} onBack={handleBack} onSaveExit={handleSaveExit} />}
     {step === 4 && <Step4 onNext={handleNext} onBack={handleBack} onSaveExit={handleSaveExit} />}
     {step === 5 && <Step5 onNext={handleNext} onBack={handleBack} onSaveExit={handleSaveExit} />}
     {step === 6 && <Step6 onNext={handleNext} onBack={handleBack} onSaveExit={handleSaveExit} />}
     {step === 7 && <Step7 data={formData} onBack={handleBack} clearForm={clearForm} onSaveExit={handleSaveExit} />}
    </div>
  );
}