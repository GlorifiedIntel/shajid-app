import { withAuth } from '@/lib/withAuth';
import PersonalInfoForm from '@/components/forms/Step1PersonalInfo';

export default async function Page() {
  return withAuth(() => (
    <div>
      <h2>Step 1: Personal Information</h2>
      <PersonalInfoForm />
    </div>
  ));
}