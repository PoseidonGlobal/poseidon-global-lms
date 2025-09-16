'use client'

import { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Hero from '@/components/Hero'

export default function FirstLoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session && !session.user.mustChangePassword) {
      // Redirect to appropriate dashboard if password doesn't need changing
      switch (session.user.role) {
        case 'STUDENT':
          router.push('/dashboard/student')
          break
        case 'FACULTY':
          router.push('/dashboard/faculty')
          break
        case 'ADMIN':
          router.push('/dashboard/admin')
          break
        default:
          router.push('/')
      }
    }
  }, [session, status, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate passwords
    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to change password')
        return
      }

      // Refresh session to get updated mustChangePassword flag
      await getSession()
      
      // Redirect to appropriate dashboard
      switch (session?.user?.role) {
        case 'STUDENT':
          router.push('/dashboard/student')
          break
        case 'FACULTY':
          router.push('/dashboard/faculty')
          break
        case 'ADMIN':
          router.push('/dashboard/admin')
          break
        default:
          router.push('/')
      }
    } catch (error) {
      setError('An error occurred while changing password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!session || !session.user.mustChangePassword) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen">
      <Hero 
        title="Password Change Required" 
        subtitle="Please create a new secure password"
      />
      
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">
                    Security Notice
                  </h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>For your security, you must change your temporary password before accessing your account.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-serif font-bold text-center text-poseidon-navy mb-8">
            Change Password
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Current Password *
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-poseidon-blue focus:border-poseidon-blue"
                placeholder="Enter your temporary password"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password *
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-poseidon-blue focus:border-poseidon-blue"
                placeholder="Enter your new password"
                minLength={8}
              />
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-poseidon-blue focus:border-poseidon-blue"
                placeholder="Confirm your new password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-poseidon-blue hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}