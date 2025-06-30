'use client';

import { PaystackButton } from 'react-paystack';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Step0Payment() {
  const { data: session } = useSession();
  const router = useRouter();

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const amount = 5000 * 100; // Amount in Kobo (₦5000)
  const email = session?.user?.email;

  const onSuccess = () => {
    toast.success('Payment successful!');
    router.push('/apply/step-1-personal-info');
  };

  const onClose = () => {
    toast.warning('Payment window closed.');
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      custom_fields: [
        {
          display_name: 'Applicant',
          variable_name: 'applicant_name',
          value: session?.user?.name || 'Shajid Applicant',
        },
      ],
    },
    publicKey,
    text: 'Pay ₦5,000',
    onSuccess,
    onClose,
  };

  return (
    <div className="payment-box">
      <h3>Post-UTME Application Fee</h3>
      <p>Total Amount: ₦5,000</p>
      <PaystackButton className="paystack-button" {...componentProps} />
    </div>
  );
}