'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function LoginToggle() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {session ? (
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 text-sm">
            Welcome, {session.user?.name || session.user?.email}
          </span>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-2">
          <Link 
            href="/login"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link 
            href="/register"
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}