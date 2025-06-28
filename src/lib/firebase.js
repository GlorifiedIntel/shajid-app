// src/lib/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBefuvynwLdq24L5tq747wK7Tc2kJkMQsI",
  authDomain: "shajidportal.firebaseapp.com",
  projectId: "shajidportal",
  storageBucket: "shajidportal.appspot.com", // ✅ Fix: this should be .appspot.com, not .firebasestorage.app
  messagingSenderId: "121113283630",
  appId: "1:121113283630:web:16547e70a041e6944ca3bf",
  measurementId: "G-XP6NNHRPVC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth
export const auth = getAuth(app);

// ✅ Conditionally initialize analytics (client only)
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.warn('Firebase Analytics is not supported in this environment.');
    }
  });
}