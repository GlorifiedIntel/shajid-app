'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PaystackButton } from 'react-paystack';
import { useSession } from 'next-auth/react';

const PaymentPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const config = {
    reference: new Date().getTime().toString(),
    email: session?.user?.email || 'student@example.com',
    amount: 250000, // Amount in kobo (₦2500)
    publicKey: 'your-paystack-public-key',
  };

  const onSuccess = (reference) => {
    // Optionally save transaction to database
    router.push('/apply/step-1-personal');
  };

  const onClose = () => {
    alert('Payment not completed.');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Application Fee Payment</h2>
      <p>You must pay ₦2,500 to continue the application.</p>
      <PaystackButton
        {...config}
        text="Pay with Paystack"
        onSuccess={onSuccess}
        onClose={onClose}
      />
    </div>
  );
};

export default PaymentPage;