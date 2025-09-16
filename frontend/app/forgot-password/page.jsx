'use client'

import { useState } from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to send reset email')
        return
      }

      setSuccess(data.message)
      setEmail('')
    } catch (error) {
      setError('An error occurred while processing your request')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Hero 
        title="Reset Your Password" 
        subtitle="Enter your email to receive reset instructions"
      />
      
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-serif font-bold text-center text-poseidon-navy mb-8">
            Forgot Password
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">{success}</p>
              <div className="mt-4">
                <Link 
                  href="/login" 
                  className="text-poseidon-blue hover:text-blue-600 font-medium"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Password Reset Process
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Enter your email address and we'll send you a secure link to reset your password.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-poseidon-blue focus:border-poseidon-blue"
                placeholder="your.email@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-poseidon-blue hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link 
              href="/login" 
              className="text-poseidon-blue hover:text-blue-600 text-sm"
            >
              ← Back to Login
            </Link>
            
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  href="/register" 
                  className="text-poseidon-gold hover:text-yellow-600 font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}