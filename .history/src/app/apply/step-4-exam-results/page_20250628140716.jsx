import { withAuth } from '@/lib/withAuth';
import Step4ExamResults from '@/components/forms/Step4ExamResults';

export default async function Page() {
  return withAuth(() => (
    <div>
      <h2>Step 4: Examination Results</h2>
      <Step4ExamResults />
    </div>
  ));
}