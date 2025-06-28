import { withAuth } from '@/lib/withAuth';
import Step4ExamResults from '@/components/forms/Step4ExamResults';

const Step4Page = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/form/get?step=4`, {
    cache: 'no-store',
  });

  const savedData = res.ok ? await res.json() : null;

  return (
    <div>
      <h2>Step 4: Examination Results</h2>
      <Step4ExamResults savedData={savedData} />
    </div>
  );
};

export default withAuth(Step4Page);
