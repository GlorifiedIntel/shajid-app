import { connectToDB } from '@/lib/mongodb';
import { GridFSBucket } from 'mongodb';

export async function savePDFToGridFS(userId, buffer) {
  const { db } = await connectToDB();
  const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

  // Remove previous file(s) for this user
  const cursor = bucket.find({ 'metadata.userId': userId });
  const existing = await cursor.toArray();
  for (const file of existing) {
    await bucket.delete(file._id);
  }

  // Upload new file
  const uploadStream = bucket.openUploadStream(`${userId}-application.pdf`, {
    metadata: {
      userId,
      submittedAt: new Date(),
    },
  });

  uploadStream.end(buffer);
}