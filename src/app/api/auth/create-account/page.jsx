'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './create-account.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateAccountPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success('Account created! Redirecting...');
      setTimeout(() => router.push('/auth/sign-in'), 2000);
    } else {
      toast.error(data.error || 'Account creation failed');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h2>Create an Account</h2>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className={styles.link}>
          Already have an account?{' '}
          <a href="/auth/sign-in">Sign In</a>
        </p>
      </form>

      <ToastContainer position="top-center" />
    </>
  );
}