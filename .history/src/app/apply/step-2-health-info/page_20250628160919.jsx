import { withAuth } from '@/lib/withAuth';
import Step2HealthInfo from '@/components/forms/Step2HealthInfo';

const Step2Page = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/form/get?step=2`, {
    cache: 'no-store',
  });

  const savedData = res.ok ? await res.json() : null;

  return (
    <div>
      <h2>Step 2: Health Information</h2>
      <Step2HealthInfo savedData={savedData} />
    </div>
  );
};

export default withAuth(Step2Page);