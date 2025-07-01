import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // e.g. your Gmail address
    pass: process.env.EMAIL_PASS, // app password or env var
  },
});

/**
 * Sends a password reset email
 * @param {string} to - User's email address
 * @param {string} token - Password reset token
 */
export async function sendPasswordResetEmail(to, token) {
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Shajid Admissions" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset - Shajid College of Nursing',
    html: `
      <p>Hello,</p>
      <p>You requested to reset your password. Click the link below:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}