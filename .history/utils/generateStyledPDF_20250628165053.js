import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function generateStyledPDF(formData) {
  const pdfDoc = await PDFDocument.create();
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const logoPath = path.join(process.cwd(), 'public', 'shajid-logo.png');
  const logoBytes = fs.readFileSync(logoPath);
  const logoImg = await pdfDoc.embedPng(logoBytes);

  let currentPage = pdfDoc.addPage([595, 842]); // A4 size
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

    y -= 60;
    currentPage.drawLine({
      start: { x: 50, y },
      end: { x: width - 50, y },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    y -= 30;
  };

  const drawFooter = (pageNum) => {
    currentPage.drawText(`Page ${pageNum}`, {
      x: width - 100,
      y: 30,
      size: 10,
      font: bodyFont,
      color: rgb(0.4, 0.4, 0.4),
    });

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

  drawHeader();
  drawWatermark();

  for (const [section, fields] of Object.entries(formData || {})) {
    if (y < 100) {
      drawFooter(pageCount++);
      currentPage = pdfDoc.addPage([595, 842]);
      width = currentPage.getWidth();
      height = currentPage.getHeight();
      y = height - 60;

      drawHeader();
      drawWatermark();
    }

    currentPage.drawText(section.toUpperCase(), {
      x: 50,
      y,
      size: 13,
      font: titleFont,
      color: rgb(0.1, 0.4, 0.7),
    });
    y -= 20;

    for (const [label, value] of Object.entries(fields || {})) {
      const val = Array.isArray(value) ? value.join(', ') : String(value);

      currentPage.drawText(`${label}:`, {
        x: 60,
        y,
        size: 10,
        font: bodyFont,
        color: rgb(0.1, 0.1, 0.1),
      });

      currentPage.drawText(val, {
        x: 200,
        y,
        size: 10,
        font: bodyFont,
        color: rgb(0, 0, 0),
        maxWidth: 300,
      });

      y -= 15;

      if (y < 80) {
        drawFooter(pageCount++);
        currentPage = pdfDoc.addPage([595, 842]);
        width = currentPage.getWidth();
        height = currentPage.getHeight();
        y = height - 60;
        drawHeader();
        drawWatermark();
      }
    }

    y -= 15;
  }

  drawFooter(pageCount);

  return await pdfDoc.save();
}