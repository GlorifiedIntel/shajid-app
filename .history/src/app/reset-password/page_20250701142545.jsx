'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import zxcvbn from 'zxcvbn';
import '../landing.css';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(null);

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);
      setStrength(result.score); // score is 0–4
    } else {
      setStrength(null);
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success('Password reset successful! Redirecting...');
      setTimeout(() => router.push('/signin'), 3000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['#dc2626', '#f97316', '#facc15', '#4ade80', '#22c55e'];

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <p>Enter a new password for <strong>{email}</strong></p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {strength !== null && (
          <div style={{ marginTop: '8px' }}>
            <div
              style={{
                height: '6px',
                width: `${(strength + 1) * 20}%`,
                backgroundColor: strengthColor[strength],
                transition: 'width 0.3s ease',
              }}
            />
            <p style={{ fontSize: '12px', color: strengthColor[strength] }}>
              Strength: {strengthLabel[strength]}
            </p>
          </div>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="spinner" />
          ) : (
            'Reset Password'
          )}
        </button>
      </form>
    </div>
  );
}