'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Step0Payment() {
  const { data: session } = useSession();
  const router = useRouter();

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handlePayment = () => {
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: session?.user?.email,
      amount: 500000,
      currency: 'NGN',
      callback: () => {
        toast.success('Payment successful!');
        router.push('/apply/step-1-personal-info');
      },
      onClose: () => {
        toast.warning('Payment cancelled.');
      },
    });

    handler.openIframe();
  };

  return (
    <div className="payment-box">
      <h3>Post-UTME Application Fee: ₦5,000</h3>
      <button onClick={handlePayment} className="paystack-button">
        Pay Now
      </button>
    </div>
  );
}