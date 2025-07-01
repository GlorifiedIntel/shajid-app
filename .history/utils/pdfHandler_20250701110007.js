import { connectToDB } from '@/lib/mongodb';
import { GridFSBucket } from 'mongodb';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import nodemailer from 'nodemailer';

// Utility: Convert buffer to readable stream
const bufferToStream = (buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

export async function generatePDFAndSendEmail(userId, fullForm) {
  const {
    personalInfo,
    healthInfo,
    schoolsAttended,
    examResults,
    programDetails,
    utmeInfo,
  } = fullForm;

  // Step 1: Generate PDF
  const doc = new PDFDocument({ margin: 50 });
  const buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', async () => {
    const pdfBuffer = Buffer.concat(buffers);
    const stream = bufferToStream(pdfBuffer);

    // Step 2: Store PDF in GridFS
    const { db } = await connectToDB();
    const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

    await bucket.deleteMany({ 'metadata.userId': userId }).catch(() => {});
    const uploadStream = bucket.openUploadStream('application.pdf', {
      metadata: { userId },
    });
    stream.pipe(uploadStream);

    // Step 3: Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Shajid College" <${process.env.EMAIL_USER}>`,
      to: personalInfo.email,
      subject: 'Your Application PDF',
      text: `Dear ${personalInfo.fullName},\n\nThank you for your application. Attached is a copy of your submitted details.`,
      attachments: [
        {
          filename: 'application.pdf',
          content: pdfBuffer,
        },
      ],
    });
  });

  // ✅ HEADER: Insert logo
  try {
    doc.image('public/logo.png', 50, 30, { width: 80 }); // adjust path/size as needed
  } catch (err) {
    console.warn('Logo not found or invalid format.');
  }

  doc.fontSize(20).text('Shajid College Application Summary', 150, 40, { align: 'left' });
  doc.moveDown(2);

  const section = (title) => {
    doc.moveDown().fontSize(14).text(title, { underline: true });
  };

  const keyVals = (obj) => {
    Object.entries(obj).forEach(([k, v]) => {
      const val = typeof v === 'object' ? JSON.stringify(v) : v;
      doc.fontSize(11).text(`${k}: ${val}`);
    });
  };

  section('1. Personal Information');
  keyVals(personalInfo);

  section('2. Health Information');
  keyVals(healthInfo);

  section('3. Schools Attended');
  keyVals(schoolsAttended);

  section('4. Exam Results');
  examResults.forEach((sitting, i) => {
    doc.moveDown().fontSize(12).text(`Sitting ${i + 1}:`);
    keyVals({ examType: sitting.examType, examYear: sitting.examYear, examNumber: sitting.examNumber });
    sitting.subjects.forEach((subj) =>
      doc.fontSize(11).text(`- ${subj.subject}: ${subj.grade}`)
    );
  });

  section('5. Program Details');
  keyVals(programDetails);

  section('6. UTME Information');
  keyVals(utmeInfo);

  doc.end();
}