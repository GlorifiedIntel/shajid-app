// src/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
// This schema defines a User model with email and password fields.
// The email field is unique, ensuring no two users can have the same email address.