import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { generatePDFAndSendEmail } from '@/utils/pdfHandler';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { userId, fullForm } = await req.json();

  if (!userId || !fullForm) return new NextResponse('Missing data', { status: 400 });

  try {
    await connectToDB();

    await Application.updateOne(
      { userId },
      {
        $set: {
          submitted: true,
          allData: fullForm,
        },
      },
      { upsert: true }
    );

    // Optional: trigger PDF generation + email
    await generatePDFAndSendEmail(userId, fullForm);

    return NextResponse.json({ success: true });
  } catch (err) {
    return new NextResponse('Final submission error', { status: 500 });
  }
}