import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { sendEmailWithAttachment } from './emailService';
import { connectToDB } from '@/lib/mongodb';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';
import nodemailer from 'nodemailer';

export async function generatePDFAndSendEmail(userId, fullForm) {
  const {
    personalInfo,
    healthInfo,
    schoolsAttended,
    examResults,
    programDetails,
    utmeInfo,
  } = fullForm;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  let y = 800;

  const drawText = (label, value) => {
    page.drawText(`${label}: ${value}`, {
      x: 50,
      y: y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  };

  drawText('=== Personal Information ===', '');
  Object.entries(personalInfo).forEach(([key, value]) => drawText(key, value));

  drawText('', '');
  drawText('=== Health Information ===', '');
  Object.entries(healthInfo).forEach(([key, value]) => drawText(key, value));

  drawText('', '');
  drawText('=== Schools Attended ===', '');
  Object.entries(schoolsAttended).forEach(([key, value]) => drawText(key, value));

  drawText('', '');
  drawText('=== Examination Results ===', '');
  examResults.forEach((sitting, i) => {
    drawText(`--- Sitting ${i + 1} ---`, '');
    drawText('Exam Type', sitting.examType);
    drawText('Exam Year', sitting.examYear);
    drawText('Exam Number', sitting.examNumber);
    sitting.subjects.forEach(sub => drawText(`  ${sub.subject}`, sub.grade));
  });

  drawText('', '');
  drawText('=== Program Details ===', '');
  Object.entries(programDetails).forEach(([key, value]) => drawText(key, value));

  drawText('', '');
  drawText('=== UTME Information ===', '');
  Object.entries(utmeInfo).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      drawText(key, value.join(', '));
    } else {
      drawText(key, value);
    }
  });

  const pdfBytes = await pdfDoc.save();

  // === Store PDF in MongoDB GridFS ===
  const { db } = await connectToDB();
  const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

  const readablePdf = Readable.from(pdfBytes);
  await new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(`application-${userId}.pdf`, {
      metadata: { userId },
    });
    readablePdf.pipe(uploadStream);
    uploadStream.on('finish', resolve);
    uploadStream.on('error', reject);
  });

  // === Send email with PDF attached ===
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use your SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Shajid College" <${process.env.EMAIL_USER}>`,
    to: personalInfo.email,
    subject: 'Your Application Summary (PDF)',
    text: `Dear ${personalInfo.fullName},\n\nAttached is a copy of your submitted application.`,
    attachments: [
      {
        filename: 'application.pdf',
        content: Buffer.from(pdfBytes),
        contentType: 'application/pdf',
      },
    ],
  });
}