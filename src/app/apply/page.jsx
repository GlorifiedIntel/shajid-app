'use client';

import React from 'react';
import Link from 'next/link';  
import './apply.css';

const ApplyPage = () => {
  const handleStart = () => {
    // Redirect to the payment page in the apply folder
    window.location.href = './apply/payment';
  };

  return (
    <div className="apply-container">
      <h1 className="apply-title">Apply Now</h1>

      <p className="apply-description">
        Welcome to the Shajid College of Nursing and Midwifery Application Portal.
        Begin your journey toward a fulfilling healthcare career by starting your application today.
      </p>

      <p className="apply-description">
        You will need a Shajid Nursing College account to log in and apply.
      </p>

      <p className="apply-description">
        If you do not have a Shajid Nursing College account, please select&nbsp;
        <Link href="/auth/create-account" className="link">Create a new Account</Link>
        &nbsp;and follow the instructions.
      </p>

      <p className="apply-description">
        If you already have a Shajid Nursing College account but do not remember your login information,
        click&nbsp;
        <Link href="/api/auth/forgot-password" className="link">I forgot my username or password</Link>
        &nbsp;and follow the instructions. Please do not create a new account.
      </p>

      {/* Start Application button now redirects to the payment page */}
      <button onClick={handleStart} className="submit-button">Start Application</button>
    </div>
  );
};

export default ApplyPage;