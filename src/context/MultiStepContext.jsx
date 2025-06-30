'use client';

import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      gender: '',
      email: '',
      phone: '',
      contactAddress: '',
      dateOfBirth: '',
      parentsName: '',
      parentsContactAddress: '',
      passportFile: null,
      passportPreview: '',
    },
    // We'll add other step data here later
  });

  const updatePersonalInfo = (info) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info,
      },
    }));
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, updatePersonalInfo }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);