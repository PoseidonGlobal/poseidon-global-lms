import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Hero from '@/components/Hero'

export default async function FacultyDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  if (session.user.role !== 'FACULTY') {
    redirect('/') // Redirect non-faculty
  }

  const facultyProfile = session.user.profile

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        title={`Welcome, Faculty Member`}
        subtitle="Manage your courses and track student progress"
      />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Faculty Info Card */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Faculty Information</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-poseidon-navy">{session.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-medium">{facultyProfile?.department || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Title</p>
                <p className="font-medium">{facultyProfile?.title || 'Faculty Member'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Teaching Assignments Card */}
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
                  <h3 className="text-lg font-medium text-gray-900">Teaching Assignments</h3>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-4">
                Manage your assigned courses and materials.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Courses</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Students</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-poseidon-blue text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                Manage Courses
              </button>
            </div>
          </div>

          {/* Student Progress Card */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-poseidon-gold rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-poseidon-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Student Progress</h3>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-4">
                Track student performance and engagement.
              </p>
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No student data yet</p>
              </div>
            </div>
          </div>

          {/* Course Materials Card */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Course Materials</h3>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-4">
                Upload and manage course resources.
              </p>
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No materials uploaded</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="px-6 py-4">
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">No recent activity</p>
              <p className="text-xs text-gray-400">Student interactions and course updates will appear here</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                <svg className="w-6 h-6 text-poseidon-blue mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <div className="text-left">
                  <p className="font-medium">Create Course</p>
                  <p className="text-sm text-gray-600">Start a new course</p>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                <svg className="w-6 h-6 text-poseidon-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-left">
                  <p className="font-medium">Upload Materials</p>
                  <p className="text-sm text-gray-600">Add course resources</p>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div className="text-left">
                  <p className="font-medium">View Analytics</p>
                  <p className="text-sm text-gray-600">Course performance</p>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
                <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="text-left">
                  <p className="font-medium">Manage Students</p>
                  <p className="text-sm tex gray-600">View enrollments</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}