'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Hero from '@/components/Hero'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
        return
      }

      // Get updated session to check mustChangePassword
      const session = await getSession()
      
      if (session?.user?.mustChangePassword) {
        router.push('/first-login')
      } else {
        // Redirect based on role
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
            router.push(callbackUrl)
        }
      }
    } catch (error) {
      setError('An error occurred during login')
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

  return (
    <div className="min-h-screen">
      <Hero 
        title="Welcome Back" 
        subtitle="Sign in to access your maritime education"
      />
      
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-serif font-bold text-center text-poseidon-navy mb-8">
            Sign In
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-poseidon-blue focus:border-poseidon-blue"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-poseidon-blue focus:border-poseidon-blue"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-poseidon-blue hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link 
              href="/forgot-password" 
              className="text-poseidon-blue hover:text-blue-600 text-sm"
            >
              Forgot your password?
            </Link>
            
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  href="/register" 
                  className="text-poseidon-gold hover:text-yellow-600 font-medium"
                >
                  Register as a student
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}