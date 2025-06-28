'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { FormProvider } from '@/context/FormContext';
import { Toaster } from 'react-hot-toast'; // ✅ Add this

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shajid College App',
  description:
    'This is a full-featured, responsive web application built using Next.js for Shajid College of Nursing and Midwifery.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FormProvider>
          <div className="container">
            <Navbar />
            <Toaster position="top-right" /> {/* ✅ Toasts will show here */}
            {children}
            <Footer />
          </div>
        </FormProvider>
      </body>
    </html>
  );
}