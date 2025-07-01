import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    personalInfo: {
      fullName: String,
      gender: String,
      phone: String,
      email: String,
      address: String,
      parentName: String,
      parentPhone: String,
    },
    healthInfo: Object,
    schoolsAttended: Object,
    examResults: Object,
    programDetails: Object,
    utmeInfo: Object,
    submitted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Avoid recompilation in dev
export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);