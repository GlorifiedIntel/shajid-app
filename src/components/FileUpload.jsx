'use client';

import { useFormContext } from '@/context/MultiStepContext';

const FileUpload = () => {
  const { updatePersonalInfo } = useFormContext();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updatePersonalInfo({
        passportFile: file,
        passportPreview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div>
      <label>Passport Photograph:</label>
      <input type="file" accept="image/*" onChange={handleFileChange} required />
    </div>
  );
};

export default FileUpload;