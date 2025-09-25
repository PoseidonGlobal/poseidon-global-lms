'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginToggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      {isLoggedIn ? (
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
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