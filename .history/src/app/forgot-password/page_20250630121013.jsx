'use client';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import '../landing.css';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleReset}>
	<div className="form-logo">
                  <Image src="/logo_2.png" alt="Logo" width={100} height={100} />
                </div>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Send Reset Link</button>
        <div className="switch-auth">
          Remember your password? <Link href="/signin">Sign in</Link>
        </div>
      </form>
    </div>
  );
}