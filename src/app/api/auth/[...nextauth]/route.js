import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mongodb from '@/lib/mongodb'; // your DB connection util
import User from '@/models/User'; // your User model

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await mongodb.connectToDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error('No user found');
        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) throw new Error('Invalid credentials');

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role, // include role in JWT
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'applicant';
        token.id = user.id || user._id?.toString();
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// This file handles the NextAuth authentication for the application.
// It uses CredentialsProvider to authenticate users with email and password.