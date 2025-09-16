'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function EnrollForm({ courseId }) {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    motivation: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Simulate API call for enrollment
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        motivation: ''
      })
    } catch (error) {
      setError('Failed to submit enrollment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // If user is not logged in, show login prompt
  if (!session) {
    return (
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-blue-900">Login Required</h3>
          <p className="mt-2 text-sm text-blue-700">
            Please log in to enroll in this course.
          </p>
          <div className="mt-6 space-x-4">
            <Link 
              href="/login"
              className="bg-poseidon-blue text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </Link>
            <Link 
              href="/register"
              className="bg-poseidon-gold text-poseidon-navy px-6 py-2 rounded-md hover:bg-yellow-500 transition duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // If user is logged in but not a student, show appropriate message
  if (session.user.role !== 'STUDENT') {
    return (
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Student Enrollment Only</h3>
          <p className="mt-2 text-sm text-gray-600">
            Only students can enroll in courses. Faculty and administrators have different access privileges.
          </p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Enrollment Request Submitted!
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Your enrollment request for <strong>{courseId}</strong> has been submitted successfully. 
                You will receive a confirmation email shortly with next steps.
              </p>
            </div>
            <div className="mt-4">
              <Link 
                href="/dashboard/student"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 text-sm"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Enroll in this Course</h3>
      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-poseidon-blue focus:border-poseidon-blue"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-poseidon-blue focus:border-poseidon-blue"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-poseidon-blue focus:border-poseidon-blue"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
            Why are you interested in this course?
          </label>
          <textarea
            id="motivation"
            name="motivation"
            rows={4}
            value={formData.motivation}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-poseidon-blue focus:border-poseidon-blue"
            placeholder="Tell us about your interest in this course and how it fits your career goals..."
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Enrollment Process
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Your enrollment request will be reviewed by our team</li>
                  <li>You'll receive confirmation within 2 business days</li>
                  <li>Course materials and schedule will be provided upon approval</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-poseidon-blue text-white font-medium py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting Enrollment...' : 'Submit Enrollment Request'}
        </button>
      </form>
    </div>
  )
}