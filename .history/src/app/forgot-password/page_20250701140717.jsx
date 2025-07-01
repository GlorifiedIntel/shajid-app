'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../landing.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage('Password reset link has been sent to your email.');
    } catch (err) {
      setError(err.message);
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

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send Reset Link</button>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}

        <div className="switch-auth">
          Remember your password? <Link href="/sign-in">Sign in</Link>
        </div>
      </form>
    </div>
  );
}