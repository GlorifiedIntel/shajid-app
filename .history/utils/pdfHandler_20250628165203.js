import { generateStyledPDF } from './generateStyledPDF';
import { sendEmailWithAttachment } from './email-utils';
import { savePDFToGridFS } from './gridfs-utils';

export async function generatePDFAndSendEmail(userId, formData) {
  const pdfBuffer = await generateStyledPDF(formData);

  // Save to GridFS (optional but useful for dashboards)
  await savePDFToGridFS(userId, pdfBuffer);

  const applicantEmail = formData?.step1?.email;
  if (!applicantEmail) throw new Error('Missing applicant email');

  await sendEmailWithAttachment(applicantEmail, pdfBuffer);
}