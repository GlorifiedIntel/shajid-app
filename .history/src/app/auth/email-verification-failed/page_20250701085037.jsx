'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './email.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmailVerificationFailed() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailFromQuery = searchParams.get('email');
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [searchParams]);

  const handleResend = async () => {
    if (!email) return toast.error('Enter your email first');
    setLoading(true);
    toast.dismiss();

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch (err) {
      toast.error('Error sending email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Email Verification Failed</h2>
      <p className={styles.message}>Your email is not verified. Please check your inbox.</p>
      <p className={styles.message}>If you didn’t get the verification email, you can request a new one:</p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputField}
      />

      <button onClick={handleResend} disabled={loading} className={styles.submitButton}>
        {loading ? 'Resending...' : 'Resend Verification Link'}
      </button>

      <ToastContainer position="top-center" />
    </div>
  );
}
