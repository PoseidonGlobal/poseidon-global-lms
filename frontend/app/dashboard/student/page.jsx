import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Hero from '@/components/Hero'

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  if (session.user.role !== 'STUDENT') {
    redirect('/') // Redirect non-students
  }

  const studentProfile = session.user.profile

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        title={`Welcome, ${studentProfile?.firstName || session.user.email}`}
        subtitle="Your Maritime Security Education Dashboard"
      />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Student Info Card */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Student Number</p>
                <p className="font-medium text-poseidon-navy">{studentProfile?.studentNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  studentProfile?.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {studentProfile?.status || 'ACTIVE'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{studentProfile?.firstName} {studentProfile?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{session.user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Enrollments Card */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-poseidon-blue rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">My Courses</h3>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-4">
                View your enrolled courses and track your progress.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Enrollments</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completed Courses</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-poseidon-blue text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                Browse Courses
              </button>
            </div>
          </div>

          {/* Certificates Card */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-poseidon-gold rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-poseidon-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Certificates</h3>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-4">
                Download and manage your course certificates.
              </p>
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No certificates yet</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-4">
                Your latest learning activities and notifications.
              </p>
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zm-5-10v5h5l-5-5z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No recent activity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                <svg className="w-6 h-6 text-poseidon-blue mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="text-left">
                  <p className="font-medium">Browse Courses</p>
                  <p className="text-sm text-gray-600">Find new courses to enroll in</p>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                <svg className="w-6 h-6 text-poseidon-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="text-left">
                  <p className="font-medium">Update Profile</p>
                  <p className="text-sm text-gray-600">Manage your account settings</p>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className="text-left">
                  <p className="font-medium">Get Support</p>
                  <p className="text-sm text-gray-600">Contact our support team</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}