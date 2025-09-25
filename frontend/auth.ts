import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

// NextAuth handler for API routes
const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
});

export const GET = handler;
export const POST = handler;
export const handlers = { GET, POST };

// Import and re-export the actual 'auth' function for session/server usage
export { auth } from 'next-auth';
