'use client';

import React from 'react';
import Link from 'next/link';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa'; 
import { RiBankLine } from 'react-icons/ri';
import Image from 'next/image';
import './payment.css';

const PaymentPage = () => {
  const handlePayment = (method) => {
    // Redirect or process payment based on selected method
    if (method === 'visa') {
      window.location.href = '/payment/visa';  // Example redirection
    } else if (method === 'mastercard') {
      window.location.href = '/payment/mastercard';  // Example redirection
    } else if (method === 'bankdeposit') {
      window.location.href = '/payment/bankdeposit';  // Example redirection
    }
  };

  return (
    <div className="payment-container">
       {/* Logo at the top */}
        <div className="logoContainer">
          <Image
            src="/shajid-logo.png" 
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
      <h1 className="payment-title">Post UTME Application Payment</h1>

      <p className="payment-description">
        Please pay the sum of <strong>2,500 Naira</strong> as your Post UTME application fee. Once the payment is successful, you will be redirected to the application form page.
      </p>

      <h3 className="payment-instruction">How to Pay:</h3>
      <p className="payment-description">
        Select your preferred payment method below to proceed.
      </p>

      <div className="payment-methods">
        <button onClick={() => handlePayment('visa')} className="payment-button">
          <FaCcVisa className="payment-icon" />
          Visa Card
        </button>
        <button onClick={() => handlePayment('mastercard')} className="payment-button">
          <FaCcMastercard className="payment-icon" />
          Master Card
        </button>
        <button onClick={() => handlePayment('bankdeposit')} className="payment-button">
          <RiBankLine className="payment-icon" />
          Bank Deposit
        </button>
      </div>

      <p className="payment-note">
        Once your payment is processed successfully, you will be automatically redirected to the Post UTME application form page.
      </p>

      <p className="payment-note">
        If you have any issues with the payment, please contact our support team for assistance.
      </p>

      <p className="back-link">
        Already paid? <Link href="/auth/sign-in" className="link">Go back to Sign In Page</Link>
      </p>
    </div>
  );
};

export default PaymentPage;