'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await signIn('credentials', {
      ...form,
      redirect: false,
    });

    if (res.ok) router.push('/apply/step-0-payment');
    else alert('Invalid credentials');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Login to Apply</h2>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}
// This is a simple login page that allows users to log in using their email and password.
// It uses the NextAuth signIn function to authenticate the user with the credentials provider.