'use client';

import Link from 'next/link';
import styles from '../email.module.css';

export default function EmailVerificationFailed() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title2}>Verification Failed</h1>
      <p className={styles.message}>
        The verification link is invalid, expired, or already used.
      </p>
      <Link href="/auth/sign-in" className={styles.link}>
        Return to Sign In
      </Link>
    </div>
  );
}