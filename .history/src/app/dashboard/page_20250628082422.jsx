'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../landing.css';
import {
  FaHome,
  FaBookOpen,
  FaWpforms,
  FaUserCircle,
  FaCog
} from 'react-icons/fa';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/signin');
      } else {
        setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/signin');
  };

  if (!user) return null;

  const name = user.displayName || 'Student';
  const email = user.email;
  const photo = user.photoURL || '/default-avatar.png';

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Image src="/logo_2.png" alt="Logo" width={100} height={100} />
        </div>

        <div className="sidebar-profile">
          <Image src={photo} alt="Profile" width={60} height={60} className="user-avatar" />
          <div className="sidebar-user-info">
            <h4>{name}</h4>
            <small>{email}</small>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li><a href="#"><FaHome className="sidebar-icon" /> Overview</a></li>
          <li><a href="#"><FaBookOpen className="sidebar-icon" /> Courses</a></li>
          <li><a href="#"><FaWpforms className="sidebar-icon" /> Applications</a></li>
          <li><a href="#"><FaUserCircle className="sidebar-icon" /> Profile</a></li>
          <li><a href="#"><FaCog className="sidebar-icon" /> Settings</a></li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>

        <div className="user-profile">
          <Image src={photo} alt="User avatar" width={80} height={80} className="user-avatar" />
          <div>
            <h2>Welcome, {name}</h2>
            <p>{email}</p>
          </div>
        </div>

        <p>Welcome to your student dashboard.</p>
      </main>
    </div>
  );
}