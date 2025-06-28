import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics'; // ✅ include isSupported
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBefuvynwLdq24L5tq747wK7Tc2kJkMQsI",
  authDomain: "shajidportal.firebaseapp.com",
  projectId: "shajidportal",
  storageBucket: "shajidportal.appspot.com", // ✅ corrected to .appspot.com
  messagingSenderId: "121113283630",
  appId: "1:121113283630:web:16547e70a041e6944ca3bf",
  measurementId: "G-XP6NNHRPVC",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Fix: check if running on the client before calling isSupported
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.warn('Firebase Analytics is not supported in this environment.');
    }
  });
}