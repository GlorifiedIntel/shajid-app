import { withAuth } from '@/lib/withAuth';
import Step3SchoolsAttended from '@/components/forms/Step3SchoolsAttended';

export default async function Page() {
  return withAuth(() => (
    <div>
      <h2>Step 3: Schools Attended</h2>
      <Step3SchoolsAttended />
    </div>
  ));
}