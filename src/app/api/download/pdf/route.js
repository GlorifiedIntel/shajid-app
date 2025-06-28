import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongodb';
import { GridFSBucket } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const userId = session.user.id;
  const { db } = await connectToDB();
  const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

  const files = await bucket.find({ 'metadata.userId': userId }).toArray();
  if (!files.length) return new NextResponse('No PDF found', { status: 404 });

  const file = files[0];
  const downloadStream = bucket.openDownloadStream(file._id);

  const chunks = [];
  return new Promise((resolve, reject) => {
    downloadStream.on('data', chunk => chunks.push(chunk));
    downloadStream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve(
        new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="application.pdf"`,
          },
        })
      );
    });
    downloadStream.on('error', () => reject(new NextResponse('Download error', { status: 500 })));
  });
}