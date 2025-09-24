import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

// Minimal config; replace/extend providers as needed
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  // supports either var name
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
});
