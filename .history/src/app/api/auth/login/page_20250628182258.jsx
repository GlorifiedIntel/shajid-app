'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn('credentials', {
      ...form,
      redirect: false,
    });

    setLoading(false);

    if (res.ok) {
      // Get session user role by reloading session
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      const userRole = session?.user?.role;

      if (userRole === 'applicant') {
        toast.success('Login successful');
        setTimeout(() => {
          router.push('/apply/step-0-payment');
        }, 1000);
      } else {
        toast.error('Only applicants can log in here');
        // Optionally sign out non-applicants
      }
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h2>Login to Apply</h2>
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
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className={styles.registerLink}>
          Don't have an account?{' '}
          <a href="/auth/register">Register</a>
        </p>
      </form>

      <ToastContainer position="top-center" />
    </>
  );
}