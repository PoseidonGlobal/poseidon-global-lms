import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      if (pathname.startsWith('/admin')) {
        return token?.role === 'admin';
      }
      if (pathname.startsWith('/student')) {
        return !!token;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*', '/student/:path*'],
};
