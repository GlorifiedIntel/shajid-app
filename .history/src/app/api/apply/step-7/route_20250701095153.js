// /app/api/apply/final-submit/route.js
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { generatePDFAndSendEmail } from '@/utils/pdfHandler';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// ========================
// Full Zod Schema Matching Applicant Model
// ========================
const fullApplicationSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1),
    gender: z.string(),
    email: z.string().email(),
    phone: z.string().min(8),
    passportUrl: z.string().url(),
    contactAddress: z.string().min(5),
    dateOfBirth: z.string(), // convert to Date when needed
    parentsName: z.string(),
    parentsContactAddress: z.string(),
  }),

  healthInfo: z.record(z.any()),

  schoolsAttended: z.object({
    primarySchool: z.string().min(1),
    secondarySchool: z.string().min(1),
    otherInstitutions: z.string().optional(),
  }),

  examResults: z.array(
    z.object({
      examType: z.string(),
      examYear: z.string().min(4),
      examNumber: z.string(),
      subjects: z.array(
        z.object({
          subject: z.string().min(1),
          grade: z.string().min(1),
        })
      ).min(5),
    })
  ).min(1),

  programDetails: z.object({
    program: z.string(),
    mode: z.enum(['Full-time', 'Part-time']),
    campus: z.string(),
  }),

  utmeInfo: z.object({
    jambRegNo: z.string().min(6),
    jambScore: z.number().min(0).max(400),
    jambSubjects: z.array(z.string().min(1)).min(4).max(4),
  }),
});

export async function POST(req) {
  const { userId, fullForm } = await req.json();

  if (!userId || !fullForm) {
    return new NextResponse('Missing data', { status: 400 });
  }

  // Validate with Zod
  const parsed = fullApplicationSchema.safeParse(fullForm);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 422 });
  }

  try {
    await connectToDB();

    await Application.updateOne(
      { userId },
      {
        $set: {
          submitted: true,
          allData: parsed.data,
        },
      },
      { upsert: true }
    );

    // ✅ Trigger PDF generation and email
    await generatePDFAndSendEmail(userId, parsed.data);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Final Submission Error:', err);
    return new NextResponse('Final submission error', { status: 500 });
  }
}