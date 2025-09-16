'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Hero from '@/components/Hero'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token')
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    // Validate passwords
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to reset password')
        return
      }

      setSuccess(data.message)
      setFormData({ password: '', confirmPassword: '' })
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (error) {
      setError('An error occurred while resetting password')
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

  if (!token) {
    return (
      <div className="min-h-screen">
        <Hero 
          title="Invalid Reset Link" 
          subtitle="The password reset link is invalid or missing"
        />
        
        <div className="max-w-md mx-auto py-12 px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">
                This password reset link is invalid or has expired.
              </p>
            </div>
            
            <Link 
              href="/forgot-password" 
              className="bg-poseidon-blue text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Hero 
        title="Reset Your Password" 
        subtitle="Enter your new secure password"
      />
      
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-serif font-bold text-center text-poseidon-navy mb-8">
            Set New Password
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">{success}</p>
              <p className="text-green-600 text-sm mt-2">
                Redirecting to login page...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
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
              disabled={isLoading || success}
              className="w-full bg-poseidon-blue hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="text-poseidon-blue hover:text-blue-600 text-sm"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}