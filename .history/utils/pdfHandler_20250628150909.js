import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';
import { GridFSBucket } from 'mongodb';
import { connectToDB, getMongoClient } from '@/lib/mongodb';

export async function generatePDFAndSendEmail(userId, formData) {
  // 1. Generate PDF in memory
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const formattedText = JSON.stringify(formData, null, 2);
  page.drawText(formattedText.slice(0, 3000), {
    x: 50,
    y: 750,
    size: 10,
    font,
    color: rgb(0, 0, 0),
    lineHeight: 12,
    maxWidth: 500,
  });

  const pdfBytes = await pdfDoc.save();

  // 2. Save to MongoDB GridFS
  const client = await getMongoClient();
  const db = client.db();
  const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

  const stream = Readable.from(pdfBytes);
  const uploadStream = bucket.openUploadStream(`${userId}-application.pdf`);
  stream.pipe(uploadStream);

  // Wait for upload to complete
  await new Promise((resolve, reject) => {
    uploadStream.on('finish', resolve);
    uploadStream.on('error', reject);
  });

  // 3. Send via Email using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: formData.step1?.email || 'admin@shajidcollege.ng',
    subject: 'Your Shajid College Application',
    text: 'Attached is your submitted application PDF.',
    attachments: [
      {
        filename: 'application.pdf',
        content: pdfBytes,
      },
    ],
  });

  return true;
}