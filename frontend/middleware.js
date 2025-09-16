import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here if needed
    // This runs after authentication check
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Check if user must change password
        if (token?.mustChangePassword && pathname !== '/first-login' && pathname !== '/api/change-password') {
          return false // Will redirect to login, but we handle the redirect in the first-login page
        }

        // Admin routes - only admins can access
        if (pathname.startsWith('/dashboard/admin')) {
          return token?.role === 'ADMIN'
        }

        // Faculty routes - only faculty can access
        if (pathname.startsWith('/dashboard/faculty')) {
          return token?.role === 'FACULTY'
        }

        // Student routes - only students can access
        if (pathname.startsWith('/dashboard/student')) {
          return token?.role === 'STUDENT'
        }

        // First login page - only authenticated users who must change password
        if (pathname === '/first-login') {
          return !!token && token.mustChangePassword === true
        }

        // Any other dashboard route requires authentication
        if (pathname.startsWith('/dashboard')) {
          return !!token
        }

        // Public routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/first-login'
  ]
}