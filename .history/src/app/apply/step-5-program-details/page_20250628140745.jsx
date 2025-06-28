import { withAuth } from '@/lib/withAuth';
import Step5ProgramDetails from '@/components/forms/Step5ProgramDetails';

export default async function Page() {
  return withAuth(() => (
    <div>
      <h2>Step 5: Program Details</h2>
      <Step5ProgramDetails />
    </div>
  ));
}