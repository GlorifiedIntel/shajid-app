'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Step0Payment() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);

    // Simulate payment API (replace with Paystack or Remita integration)
    try {
      // 👇 Replace this block with your real payment gateway logic
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Payment successful!');
      router.push('/apply/step-1-personal-info');
    } catch (err) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-box">
      <h3>Post-UTME Application Fee: ₦5,000</h3>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}