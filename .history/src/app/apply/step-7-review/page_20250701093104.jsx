// app/apply/step-7/page.jsx
import Step7Review from '@/components/forms/Step7Review';

const Step7Page = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/form/get-all`, {
    cache: 'no-store',
  });

  const allFormData = res.ok ? await res.json() : null;

  return (
    <div>
      <h2>Step 7: Review & Submit</h2>
      <Step7Review formData={allFormData} />
    </div>
  );
};

export default Step7Page;