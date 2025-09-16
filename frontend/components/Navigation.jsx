'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Navigation() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="bg-poseidon-navy shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <h1 className="text-xl font-serif font-bold text-poseidon-gold">
                Poseidon Global
              </h1>
              <span className="ml-2 text-sm text-white">Maritime University</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/about" className="text-white hover:text-poseidon-gold px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link href="/mission" className="text-white hover:text-poseidon-gold px-3 py-2 rounded-md text-sm font-medium">
              Mission
            </Link>
            <Link href="/courses" className="text-white hover:text-poseidon-gold px-3 py-2 rounded-md text-sm font-medium">
              Courses
            </Link>

            {status === 'loading' ? (
              <div className="text-white">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                {session.user.role === 'STUDENT' && (
                  <Link href="/dashboard/student" className="text-white hover:text-poseidon-gold px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                )}
                {session.user.role === 'FACULTY' && (
                  <Link href="/dashboard/faculty" className="text-white hover:text-poseidon-gold px-3 py-2 rounded-md text-sm font-medium">
                    Faculty
                  </Link>
                )}
                {session.user.role === 'ADMIN' && (
                  <Link href="/dashboard/admin" className="text-white hover:text-poseidon-gold px-3 py-2 rounded-md text-sm font-medium">
                    Admin
                  </Link>
                )}
                <span className="text-poseidon-gold text-sm">
                  {session.user.profile?.firstName || session.user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-poseidon-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-white hover:text-poseidon-gold px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="bg-poseidon-gold hover:bg-yellow-500 text-poseidon-navy px-4 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-poseidon-gold focus:outline-none focus:text-poseidon-gold"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/about" className="text-white hover:text-poseidon-gold block px-3 py-2 rounded-md text-base font-medium">
                About
              </Link>
              <Link href="/mission" className="text-white hover:text-poseidon-gold block px-3 py-2 rounded-md text-base font-medium">
                Mission
              </Link>
              <Link href="/courses" className="text-white hover:text-poseidon-gold block px-3 py-2 rounded-md text-base font-medium">
                Courses
              </Link>
              
              {session ? (
                <>
                  {session.user.role === 'STUDENT' && (
                    <Link href="/dashboard/student" className="text-white hover:text-poseidon-gold block px-3 py-2 rounded-md text-base font-medium">
                      Dashboard
                    </Link>
                  )}
                  {session.user.role === 'FACULTY' && (
                    <Link href="/dashboard/faculty" className="text-white hover:text-poseidon-gold block px-3 py-2 rounded-md text-base font-medium">
                      Faculty
                    </Link>
                  )}
                  {session.user.role === 'ADMIN' && (
                    <Link href="/dashboard/admin" className="text-white hover:text-poseidon-gold block px-3 py-2 rounded-md text-base font-medium">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-white hover:text-poseidon-gold block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-white hover:text-poseidon-gold block px-3 py-2 rounded-md text-base font-medium">
                    Login
                  </Link>
                  <Link href="/register" className="text-white hover:text-poseidon-gold block px-3 py-2 rounded-md text-base font-medium">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}