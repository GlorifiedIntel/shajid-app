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
    contactAddress: String,
    dateOfBirth: Date,
    parentsName: String,
    parentsContactAddress: String,
  },

  healthInfo: Object,
  schoolsAttended: Object,
  examResults: Array,
  programDetails: Object,
  utmeInfo: Object,
}, { timestamps: true });

export default mongoose.models.Applicant || mongoose.model('Applicant', applicantSchema);
// This schema defines an Applicant model with various fields to store personal, health, educational, and program-related information.
// The userId field references the User model, linking each applicant to a specific user.