import { getMongoClient } from '@/lib/mongodb';
import { GridFSBucket } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { userId } = params;

  try {
    const client = await getMongoClient();
    const db = client.db();
    const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

    const file = await db.collection('pdfs.files').findOne({ filename: `${userId}-application.pdf` });

    if (!file) {
      return new NextResponse('PDF not found', { status: 404 });
    }

    const downloadStream = bucket.openDownloadStreamByName(`${userId}-application.pdf`);

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `inline; filename="application.pdf"`);

    return new NextResponse(downloadStream, {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error('PDF Download Error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}