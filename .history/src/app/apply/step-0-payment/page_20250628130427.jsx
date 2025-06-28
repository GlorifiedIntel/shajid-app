'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PaystackButton } from 'react-paystack';

const PaymentPage = () => {
  const router = useRouter();

  const config = {
    reference: new Date().getTime().toString(),
    email: 'student@example.com', // get from session or auth
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
        text="Pay with Paystack"
        {...config}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    </div>
  );
};

export default PaymentPage;