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
    healthInfo: {},
    schoolsAttended: {},
    examResults: {},
    programDetails: {},
    utmeInfo: {},
  });

  const updatePersonalInfo = (data) =>
    setFormData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));

  const updateHealthInfo = (data) =>
    setFormData((prev) => ({ ...prev, healthInfo: { ...prev.healthInfo, ...data } }));

  const updateSchoolsAttended = (data) =>
    setFormData((prev) => ({ ...prev, schoolsAttended: { ...prev.schoolsAttended, ...data } }));

  const updateExamResults = (data) =>
    setFormData((prev) => ({ ...prev, examResults: { ...prev.examResults, ...data } }));

  const updateProgramDetails = (data) =>
    setFormData((prev) => ({ ...prev, programDetails: { ...prev.programDetails, ...data } }));

  const updateUTMEInfo = (data) =>
    setFormData((prev) => ({ ...prev, utmeInfo: { ...prev.utmeInfo, ...data } }));

  return (
    <FormContext.Provider
      value={{
        formData,
        updatePersonalInfo,
        updateHealthInfo,
        updateSchoolsAttended,
        updateExamResults,
        updateProgramDetails,
        updateUTMEInfo,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);