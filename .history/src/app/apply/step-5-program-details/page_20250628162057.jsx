import { withAuth } from '@/lib/withAuth';
import Step5ProgramDetails from '@/components/forms/Step5ProgramDetails';

const Step5Page = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/form/get?step=5`, {
    cache: 'no-store',
  });

  const savedData = res.ok ? await res.json() : null;

  return (
    <div>
      <h2>Step 5: Program Details</h2>
      <Step5ProgramDetails savedData={savedData} />
    </div>
  );
};

export default withAuth(Step5Page);