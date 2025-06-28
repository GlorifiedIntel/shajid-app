import { generateStyledPDF } from './generateStyledPDF';
import { sendEmailWithAttachment } from './email-utils';
import { savePDFToGridFS } from './gridfs-utils';

export async function generatePDFAndSendEmail(userId, formData) {
  const pdfBuffer = await generateStyledPDF(formData);

  // ✅ Save to MongoDB GridFS
  await savePDFToGridFS(userId, pdfBuffer);

  // ✅ Send to applicant email
  const email = formData?.step1?.email;
  if (!email) throw new Error('Missing applicant email');

  await sendEmailWithAttachment(email, pdfBuffer);
}