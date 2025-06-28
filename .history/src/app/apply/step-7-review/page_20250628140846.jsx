import { withAuth } from '@/lib/withAuth';
import Step7Review from '@/components/forms/Step7Review';

export default async function Page() {
  return withAuth(() => (
    <div>
      <h2>Step 7: Review & Submit</h2>
      <Step7Review />
    </div>
  ));
}