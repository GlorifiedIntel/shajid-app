'use client';
import { useState } from 'react';
import '../landing.css'; // adjust path if needed
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle login logic
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
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
          <Link href="#">Forgot your password?</Link>
        </div>

        <button type="submit">Sign In</button>

        <div className="switch-auth">
          Don’t have an account? <Link href="/createaccount">Create one</Link>
        </div>
      </form>
    </div>
  );
}