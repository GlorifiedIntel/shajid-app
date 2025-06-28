import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: role || 'applicant',
    });

    await newUser.save();

    return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
  } catch (error) {
    console.error('[REGISTER_ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
// This route handles user registration by accepting a POST request with user details,
// validating the input, checking for existing users, and saving the new user to the database.
// It returns appropriate responses based on the success or failure of the operation.