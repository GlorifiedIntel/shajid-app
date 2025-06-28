'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import Image from 'next/image';
import '../landing.css';

const db = getFirestore();
const storage = getStorage();

export default function CreateAccountPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      alert('Image must be under 2MB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullName)) {
      alert('Full name must only contain letters and spaces.');
      return;
    }

    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      let photoURL = '/default-avatar.png';

      if (photo) {
        const photoRef = ref(storage, `users/${user.uid}/profile.jpg`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      await updateProfile(user, {
        displayName: fullName,
        photoURL,
      });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: fullName,
        email,
        photoURL,
        createdAt: new Date(),
      });

      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-logo">
          <Image src="/logo_2.png" alt="Logo" width={100} height={100} />
        </div>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <input type="file" accept="image/*" onChange={handlePhotoChange} />
        {photoPreview && (
          <div className="photo-preview">
            <Image src={photoPreview} alt="Preview" width={80} height={80} />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Register'}
        </button>

        {success && <div className="success-message">🎉 Registration Successful!</div>}

        <div className="switch-auth">
          Already have an account? <Link href="/signin">Sign in</Link>
        </div>
      </form>
    </div>
  );
}