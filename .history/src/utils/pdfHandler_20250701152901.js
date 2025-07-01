import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { connectToDB } from '@/lib/mongodb';
import Applicant from '@/models/Applicant';
import { createTransport } from 'nodemailer';
import { Readable } from 'stream';
import { GridFSBucket } from 'mongodb';
import QRCode from 'qrcode';

import fs from 'fs/promises';
import path from 'path';

// Load logo image as Uint8Array
async function loadLogoBase64(filePath) {
  const imgPath = path.join(process.cwd(), filePath);
  return await fs.readFile(imgPath);
}

// Convert base64/Buffer to readable stream
function bufferToStream(buffer) {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
}

export async function generatePDFAndSendEmail(userId, fullForm) {
  const { personalInfo } = fullForm;
  const { fullName, email } = personalInfo;
  const submissionDate = new Date().toLocaleString();

  // 1. Create a new PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  // 2. Embed fonts and images
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const logoBytes = await loadLogoBase64('public/shajid-logo.png'); // ✅ logo as header + watermark
  const logoImage = await pdfDoc.embedPng(logoBytes);

  const qrCodeDataUrl = await QRCode.toDataURL(`https://shajidnursingcollege.edu.ng/application/verify/${userId}`);
  const qrImage = await pdfDoc.embedPng(Buffer.from(qrCodeDataUrl.split(',')[1], 'base64'));

  // 3. Header
  page.drawImage(logoImage, {
    x: 40,
    y: height - 80,
    width: 60,
    height: 60,
    opacity: 1,
  });

  page.drawText(`SHÁJID COLLEGE OF NURSING & MIDWIFERY`, {
    x: 110,
    y: height - 40,
    size: 16,
    font,
    color: rgb(0, 0.4, 0.7),
  });

  page.drawText(`Application Summary - ${fullName}`, {
    x: 110,
    y: height - 60,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });

  // 4. Watermark (background)
  page.drawImage(logoImage, {
    x: width / 2 - 150,
    y: height / 2 - 150,
    width: 300,
    height: 300,
    opacity: 0.05,
  });

  // 5. Draw form content
  let y = height - 100;

  const drawSection = (title, data) => {
    page.drawText(title, { x: 40, y: (y -= 20), size: 12, font, color: rgb(0.1, 0.1, 0.1) });

    for (const [key, value] of Object.entries(data)) {
      const line = `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`;
      page.drawText(line, { x: 60, y: (y -= 15), size: 10, font });
    }

    y -= 10;
  };

  drawSection('Personal Information', personalInfo);
  drawSection('Health Info', fullForm.healthInfo);
  drawSection('Schools Attended', fullForm.schoolsAttended);
  drawSection('Exam Results', { count: fullForm.examResults.length });
  drawSection('Program Details', fullForm.programDetails);
  drawSection('UTME Info', fullForm.utmeInfo);
  drawSection('Submission Date', { submissionDate });

  // 6. Add last page for QR code
  const qrPage = pdfDoc.addPage();
  qrPage.drawImage(qrImage, {
    x: qrPage.getWidth() / 2 - 75,
    y: qrPage.getHeight() / 2 - 75,
    width: 150,
    height: 150,
  });

  qrPage.drawText('Scan to verify this application', {
    x: qrPage.getWidth() / 2 - 100,
    y: qrPage.getHeight() / 2 - 100,
    size: 12,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });

  // 7. Save PDF to buffer
  const pdfBytes = await pdfDoc.save();

  // 8. Store in MongoDB GridFS
  const { db } = await connectToDB();
  const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

  // Remove previous PDFs for user
  await bucket.deleteMany?.({ 'metadata.userId': userId }).catch(() => {});
  await new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream('application.pdf', {
      metadata: { userId },
    });
    bufferToStream(pdfBytes).pipe(uploadStream).on('finish', resolve).on('error', reject);
  });

  // 9. Send email with link or attachment
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Shajid Admissions" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Application Summary - Shajid College of Nursing',
    html: `
      <p>Hello ${fullName},</p>
      <p>Thank you for submitting your application to Shajid College of Nursing and Midwifery.</p>
      <p>Your PDF summary is attached. You may also download it at any time from your dashboard.</p>
      <p><strong>Submission Date:</strong> ${submissionDate}</p>
      <p>Regards,<br/>Admissions Office</p>
    `,
    attachments: [
      {
        filename: 'application-summary.pdf',
        content: pdfBytes,
      },
    ],
  });
}