import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateStyledPDF(formData) {
  const pdfDoc = await PDFDocument.create();
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Load logo from public
  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/shajid-logo.png`;
  const logoRes = await fetch(logoUrl);
  const logoBytes = await logoRes.arrayBuffer();
  const logoImg = await pdfDoc.embedPng(logoBytes);

  // Load applicant photo if available
  let applicantPhotoImg = null;
  try {
    const photoUrl = formData?.step1?.photoUrl;
    if (photoUrl) {
      const photoRes = await fetch(photoUrl);
      const photoBytes = await photoRes.arrayBuffer();
      applicantPhotoImg = await pdfDoc.embedJpg(photoBytes);
    }
  } catch (err) {
    console.warn('Failed to load applicant photo:', err.message);
  }

  let currentPage = pdfDoc.addPage([595, 842]); // A4
  let { width, height } = currentPage.getSize();
  let y = height - 60;
  let pageCount = 1;

  const drawHeader = () => {
    currentPage.drawImage(logoImg, {
      x: 50,
      y: y - 10,
      width: 50,
      height: 50,
    });

    currentPage.drawText('Shajid College of Nursing & Midwifery', {
      x: 110,
      y: y + 10,
      size: 16,
      font: titleFont,
      color: rgb(0, 0.3, 0.6),
    });

    if (applicantPhotoImg) {
      currentPage.drawImage(applicantPhotoImg, {
        x: width - 100,
        y: y - 5,
        width: 50,
        height: 50,
      });
    }

    // Top-right page number
    currentPage.drawText(`Page ${pageCount}`, {
      x: width - 60,
      y: height - 30,
      size: 10,
      font: bodyFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    y -= 60;
    currentPage.drawLine({
      start: { x: 50, y },
      end: { x: width - 50, y },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    y -= 30;
  };

  const drawFooter = () => {
    currentPage.drawText(
      'This document was generated electronically by Shajid College.',
      {
        x: 50,
        y: 30,
        size: 9,
        font: bodyFont,
        color: rgb(0.4, 0.4, 0.4),
      }
    );
  };

  const drawWatermark = () => {
    currentPage.drawText('CONFIDENTIAL', {
      x: 150,
      y: 400,
      size: 60,
      font: titleFont,
      color: rgb(0.9, 0.9, 0.9),
      rotate: { degrees: 45 },
      opacity: 0.2,
    });
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value
        .map((v) => (typeof v === 'object' ? JSON.stringify(v) : v))
        .join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return Object.entries(value)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
    }
    return String(value);
  };

  const drawPageBreak = () => {
    drawFooter();
    pageCount++;
    currentPage = pdfDoc.addPage([595, 842]);
    ({ width, height } = currentPage.getSize());
    y = height - 60;
    drawHeader();
    drawWatermark();
  };

  drawHeader();
  drawWatermark();

  for (const [section, fields] of Object.entries(formData || {})) {
    if (y < 100) drawPageBreak();

    currentPage.drawText(section.toUpperCase(), {
      x: 50,
      y,
      size: 13,
      font: titleFont,
      color: rgb(0.1, 0.4, 0.7),
    });
    y -= 20;

    for (const [label, value] of Object.entries(fields || {})) {
      const val = formatValue(value);
      const truncated = val.length > 100 ? val.slice(0, 100) + '...' : val;

      currentPage.drawText(`${label}:`, {
        x: 60,
        y,
        size: 10,
        font: bodyFont,
        color: rgb(0.1, 0.1, 0.1),
      });

      currentPage.drawText(truncated, {
        x: 200,
        y,
        size: 10,
        font: bodyFont,
        color: rgb(0, 0, 0),
      });

      y -= 15;
      if (y < 80) drawPageBreak();
    }

    y -= 15;
  }

  // Draw Thank You & Signature Block
  if (y < 100) drawPageBreak();

  currentPage.drawText('Thank you for applying to Shajid College of Nursing & Midwifery.', {
    x: 50,
    y,
    size: 12,
    font: bodyFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  y -= 40;

  currentPage.drawText('Signature:', {
    x: 50,
    y,
    size: 10,
    font: bodyFont,
    color: rgb(0, 0, 0),
  });

  currentPage.drawLine({
    start: { x: 120, y: y + 3 },
    end: { x: 250, y: y + 3 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  y -= 20;

  drawFooter();

  return await pdfDoc.save();
}