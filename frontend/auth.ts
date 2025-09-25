import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

// Minimal config; replace/extend providers as needed
const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
});

// Export GET and POST for App Router API route
export const GET = handler;
export const POST = handler;

// Fix: Export handlers for route.ts
export const handlers = { GET, POST };

// Also export auth client helpers if needed
export { handler as auth };