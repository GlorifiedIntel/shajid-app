import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    await connectToDB();

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'No account found with that email' }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: 'Email already verified' }, { status: 200 });
    }

    // Generate a new token
    const emailToken = crypto.randomBytes(32).toString('hex');
    user.emailToken = emailToken;
    await user.save();

    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${emailToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Shajid College" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Verify Your Email Address (Resent)',
      html: `
        <p>Hello ${user.name},</p>
        <p>Here is your new email verification link:</p>
        <p><a href="${verifyUrl}">Verify Email</a></p>
      `,
    });

    return NextResponse.json({ message: 'Verification link resent' }, { status: 200 });
  } catch (err) {
    console.error('Resend verification error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}