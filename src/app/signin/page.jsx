'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Step 1
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import '../landing.css';
import Image from 'next/image';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // ✅ Step 2

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      router.push('/dashboard'); // ✅ Step 3
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignIn}>
        <div className="form-logo">
          <Image src="/logo_2.png" alt="Logo" width={100} height={100} />
        </div>
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="forgot-link">
          <Link href="/forgot-password">Forgot your password?</Link>
        </div>

        <button type="submit">Sign In</button>

        <div className="switch-auth">
          Don’t have an account? <Link href="/createaccount">Create one</Link>
        </div>
      </form>
    </div>
  );
}