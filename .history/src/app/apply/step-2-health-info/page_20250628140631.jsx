import { withAuth } from '@/lib/withAuth';
import Step2HealthInfo from '@/components/forms/Step2HealthInfo';

export default async function Page() {
  return withAuth(() => (
    <div>
      <h2>Step 2: Health Information</h2>
      <Step2HealthInfo />
    </div>
  ));
}