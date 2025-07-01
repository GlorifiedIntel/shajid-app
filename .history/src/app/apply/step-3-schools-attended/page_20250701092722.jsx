// app/apply/step-3/page.jsx
import Step3SchoolsAttended from '@/components/forms/Step3SchoolsAttended';

const Step3Page = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/form/get?step=3`, {
    cache: 'no-store',
  });

  const savedData = res.ok ? await res.json() : null;

  return (
    <div>
      <h2>Step 3: Schools Attended</h2>
      <Step3SchoolsAttended savedData={savedData} />
    </div>
  );
};

export default Step3Page;