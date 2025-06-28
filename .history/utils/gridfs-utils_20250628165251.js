import { connectToDB } from '@/lib/mongodb';
import { GridFSBucket } from 'mongodb';

export async function savePDFToGridFS(userId, buffer) {
  const { db } = await connectToDB();
  const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

  // Remove previous submission
  await bucket.deleteMany({ 'metadata.userId': userId }).catch(() => {});

  const uploadStream = bucket.openUploadStream(`${userId}-application.pdf`, {
    metadata: { userId, submittedAt: new Date() },
  });

  uploadStream.end(buffer);
}