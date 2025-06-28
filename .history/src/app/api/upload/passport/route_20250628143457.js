import { connectToDB, gfsUpload } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  const formData = await req.formData();
  const file = formData.get('passport');
  const userId = formData.get('userId');

  if (!file || !userId) return new NextResponse('Missing file or user ID', { status: 400 });

  try {
    await connectToDB();
    const stream = file.stream();
    const uploadResult = await gfsUpload(stream, file.name, userId, 'passport');

    return NextResponse.json({ success: true, fileId: uploadResult.id });
  } catch (error) {
    return new NextResponse('File upload failed', { status: 500 });
  }
};