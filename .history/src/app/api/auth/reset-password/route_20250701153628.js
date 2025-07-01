import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';;
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  try {
    const { email, token, password } = await req.json();

    if (!email || !token || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const user = await User.findOne({ email, resetPasswordToken: token });

    if (!user) {
      return NextResponse.json({ message: 'Invalid token or email' }, { status: 400 });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return NextResponse.json({ message: 'Reset token has expired' }, { status: 400 });
    }

    // Set new password
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;

    // Clear the reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return NextResponse.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}