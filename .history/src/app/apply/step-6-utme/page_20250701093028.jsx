// app/apply/step-6/page.jsx
import Step6UTMEInfo from '@/components/forms/Step6UTMEInfo';

const Step6Page = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/form/get?step=6`, {
    cache: 'no-store',
  });

  const savedData = res.ok ? await res.json() : null;

  return (
    <div>
      <h2>Step 6: UTME Information</h2>
      <Step6UTMEInfo savedData={savedData} />
    </div>
  );
};

export default Step6Page;