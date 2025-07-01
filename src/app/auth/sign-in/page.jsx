'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './sign-in.module.css';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);

    const res = await signIn('credentials', {
      ...form,
      redirect: false,
    });

    setLoading(false);

    if (res.ok) {
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      const userRole = session?.user?.role;

      if (userRole === 'applicant') {
        toast.success('Signed in successfully');
        setTimeout(() => router.push('/apply/step-0-payment'), 1000);
      } else {
        toast.error('Only applicants can sign in here');
      }
    } else {
      if (res.error === 'Please verify your email before signing in.') {
        toast.error('Email not verified');
        // ✅ Redirect with email as query param
        setTimeout(() => {
          router.push(`/auth/email-verification-failed?email=${encodeURIComponent(form.email)}`);
        }, 1000);
      } else {
        toast.error('Invalid email or password');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.container}>
        {/* Logo at the top */}
        <div className={styles.logoContainer}>
          <Image
            src="/shajid-logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        <h2 className={styles.title}>Sign In</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className={styles.inputField}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className={styles.inputField}
        />

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className={styles.link}>
          Don&apos;t have an account?{' '}
          <a href="/auth/create-account">Create Account</a>
        </p>
      </form>

      <ToastContainer position="top-center" />
    </>
  );
}