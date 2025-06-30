import mongoose from 'mongoose';
import { MongoClient, GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'Shajid-Cluster0'; // set this in your .env

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function disconnectFromDB() {
  if (cached.conn) {
    await mongoose.connection.close();
    cached.conn = null;
  }
}

let cachedClient = null;

export async function gfsUpload(stream, filename, userId, field) {
  if (!cachedClient) {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedClient = client;
  }

  const db = cachedClient.db(DB_NAME);
  const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: { userId, field },
    });

    stream.pipe(uploadStream)
      .on('error', (error) => reject(error))
      .on('finish', () => resolve(uploadStream));
  });
}
