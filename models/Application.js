// src/models/Applicant.js
import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: {
    fullName: String,
    gender: String,
    email: String,
    phone: String,
    passportUrl: String,
  },
  healthInfo: Object,
  schoolsAttended: Object,
  examResults: Array,
  programDetails: Object,
  utmeInfo: Object,
}, { timestamps: true });

export default mongoose.models.Applicant || mongoose.model('Applicant', applicantSchema);