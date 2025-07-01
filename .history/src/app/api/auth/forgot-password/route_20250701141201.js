import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email'; // You should define this

export async function POST(req) {
  await dbConnect();

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'No account found with that email' }, { status: 404 });
    }

    // Generate secure reset token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour from now

    // Save token and expiry to user (or a separate collection if you prefer)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    // Send reset email
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}&email=${email}`;
    await sendPasswordResetEmail(user.email, resetLink);

    return NextResponse.json({ message: 'Password reset link sent successfully' });
  } catch (err) {
    console.error('Forgot password error:', err);
    return NextResponse.json({ message: 'Server error, please try again later' }, { status: 500 });
  }
}