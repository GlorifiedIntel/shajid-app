import { generateStyledPDF } from '@/utils/generateStyledPDF'; 

export async function downloadApplicationPDF(formData) {
  const pdfBytes = await generateStyledPDF(formData);

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'application.pdf';
  link.click();

  URL.revokeObjectURL(url);
}