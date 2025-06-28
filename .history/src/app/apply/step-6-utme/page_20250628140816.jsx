import { withAuth } from '@/lib/withAuth';
import Step6UTME from '@/components/forms/Step6UTME';

export default async function Page() {
  return withAuth(() => (
    <div>
      <h2>Step 6: UTME Information</h2>
      <Step6UTME />
    </div>
  ));
}