import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verification-failed`);
    }

    const user = await User.findOne({ emailToken: token });

    if (!user) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verification-failed`);
    }

    user.emailVerified = true;
    user.emailToken = null;
    await user.save();

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verified`);
  } catch (err) {
    console.error('Email verification failed:', err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verification-failed`);
  }
}