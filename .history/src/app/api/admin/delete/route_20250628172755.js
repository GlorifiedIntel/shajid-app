import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { GridFSBucket } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  if (!userId) {
    return new NextResponse('Missing user ID', { status: 400 });
  }

  try {
    const { db } = await connectToDB();

    // Delete PDF from GridFS
    const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });
    const pdfs = await bucket.find({ 'metadata.userId': userId }).toArray();

    for (const file of pdfs) {
      await bucket.delete(file._id);
    }

    // Delete application document
    await Application.deleteOne({ userId });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete Error:', err);
    return new NextResponse('Failed to delete application', { status: 500 });
  }
}
