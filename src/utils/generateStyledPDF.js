import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Takes formData from context, including applicant photo as base64 or File
export async function generateStyledPDF(formData) {
  const pdfDoc = await PDFDocument.create();
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.addPage([595, 842]); // A4
  let { width, height } = page.getSize();
  let y = height - 60;
  let pageNumber = 1;

  // Load logo from public folder
  const logoUrl = '/shajid-logo.png';
  const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
  const logoImg = await pdfDoc.embedPng(logoBytes);

  // Load passport image from formData
  const applicantPhoto = formData?.personalInfo?.passportFile;
  let passportImg;
  if (applicantPhoto && typeof applicantPhoto !== 'string') {
    const photoBytes = await applicantPhoto.arrayBuffer();
    passportImg = await pdfDoc.embedJpg(photoBytes);
  }

  // Helper functions
  const drawHeader = () => {
    page.drawImage(logoImg, {
      x: 50,
      y: y - 10,
      width: 50,
      height: 50,
    });

    page.drawText('Shajid College of Nursing & Midwifery', {
      x: 110,
      y: y + 10,
      size: 16,
      font: titleFont,
      color: rgb(0, 0.3, 0.6),
    });

    page.drawText(`Page ${pageNumber}`, {
      x: width - 100,
      y: y + 10,
      size: 10,
      font: bodyFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    y -= 60;
    page.drawLine({
      start: { x: 50, y },
      end: { x: width - 50, y },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    y -= 30;
  };

  const drawWatermark = () => {
    page.drawText('CONFIDENTIAL', {
      x: 150,
      y: 400,
      size: 60,
      font: titleFont,
      color: rgb(0.9, 0.9, 0.9),
      rotate: { degrees: 45 },
      opacity: 0.2,
    });
  };

  const drawFooter = () => {
    page.drawText('This document was generated electronically by Shajid College.', {
      x: 50,
      y: 30,
      size: 9,
      font: bodyFont,
      color: rgb(0.4, 0.4, 0.4),
    });
  };

  drawHeader();
  drawWatermark();

  if (passportImg) {
    page.drawImage(passportImg, {
      x: width - 150,
      y: y + 30,
      width: 70,
      height: 70,
    });
  }

  // Draw all sections from formData
  for (const [section, values] of Object.entries(formData || {})) {
    page.drawText(section.toUpperCase(), {
      x: 50,
      y,
      size: 13,
      font: titleFont,
      color: rgb(0.1, 0.4, 0.7),
    });
    y -= 20;

    for (const [label, val] of Object.entries(values || {})) {
      if (typeof val === 'object' && !Array.isArray(val)) continue;

      const textValue = Array.isArray(val) ? val.join(', ') : String(val);

      page.drawText(`${label}:`, {
        x: 60,
        y,
        size: 10,
        font: bodyFont,
        color: rgb(0.2, 0.2, 0.2),
      });

      page.drawText(textValue, {
        x: 200,
        y,
        size: 10,
        font: bodyFont,
        color: rgb(0, 0, 0),
        maxWidth: 300,
      });

      y -= 15;
      if (y < 80) {
        drawFooter();
        pageNumber++;
        y = height - 60;
        drawHeader();
        drawWatermark();
      }
    }

    y -= 10;
  }

  // Draw thank you block
  y -= 20;
  page.drawText('Thank you for applying to Shajid College!', {
    x: 60,
    y,
    size: 12,
    font: titleFont,
    color: rgb(0, 0.5, 0),
  });

  y -= 25;
  page.drawText('Signed:', {
    x: 60,
    y,
    size: 10,
    font: bodyFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('Admissions Officer', {
    x: 120,
    y,
    size: 10,
    font: bodyFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  drawFooter();
  return await pdfDoc.save();
}