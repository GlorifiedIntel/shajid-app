import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './sign-in.module.css';
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
      toast.error('Invalid credentials');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h2>Sign In</h2>

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
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className={styles.link}>
          Don't have an account?{' '}
          <a href="/auth/create-account">Create Account</a>
        </p>
      </form>

      <ToastContainer position="top-center" />
    </>
  );
}