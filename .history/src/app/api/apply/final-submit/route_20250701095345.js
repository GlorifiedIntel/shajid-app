import { connectToDB } from '@/lib/mongodb';
import Applicant from '@/models/Applicant';
import { generatePDFAndSendEmail } from '@/utils/pdfHandler';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { userId, fullForm } = await req.json();

  if (!userId || !fullForm)
    return new NextResponse('Missing data', { status: 400 });

  try {
    await connectToDB();

    const {
      personalInfo,
      healthInfo,
      schoolsAttended,
      examResults,
      programDetails,
      utmeInfo,
    } = fullForm;

    await Applicant.updateOne(
      { userId },
      {
        $set: {
          personalInfo,
          healthInfo,
          schoolsAttended,
          examResults,
          programDetails,
          utmeInfo,
          submitted: true,
        },
      },
      { upsert: true }
    );

    await generatePDFAndSendEmail(userId, fullForm);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Submission Error:', err);
    return new NextResponse('Final submission error', { status: 500 });
  }
}