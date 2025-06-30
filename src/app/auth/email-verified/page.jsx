'use client';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import Link from 'next/link';
import styles from '../email.module.css';

export default function EmailVerified() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set window size for confetti dimensions
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={300}
        />
      )}

      <div className={styles.icon}>✅</div>

      <h1 className={styles.title}>Email Verified</h1>
      <p className={styles.message}>
        Thank you for verifying your email address. You can now sign in to your account.
      </p>

      <Link href="/auth/sign-in" className={styles.link}>
        Go to Sign In
      </Link>
    </div>
  );
}