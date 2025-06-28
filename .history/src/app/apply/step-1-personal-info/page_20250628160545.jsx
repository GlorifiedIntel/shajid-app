import { withAuth } from '@/lib/withAuth';
import PersonalInfoForm from '@/components/forms/Step1PersonalInfo';

const Step1Page = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/form/get?step=1`, {
    cache: 'no-store',
  });

  const savedData = res.ok ? await res.json() : null;

  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      <PersonalInfoForm savedData={savedData} />
    </div>
  );
};

export default withAuth(Step1Page);