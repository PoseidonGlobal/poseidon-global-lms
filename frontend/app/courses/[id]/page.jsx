import Link from 'next/link'
import { notFound } from 'next/navigation'
import { courses } from '@/data/courses'
import EnrollForm from '@/components/EnrollForm'

export async function generateMetadata({ params }) {
  const course = courses.find((c) => c.id === params.id)
  
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: `${course.title} - Poseidon Global`,
    description: course.summary,
  }
}

export default function CoursePage({ params }) {
  const course = courses.find((c) => c.id === params.id)
  if (!course) return notFound()

  const comingSoon = course.status === 'coming_soon'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-poseidon-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="mb-8">
            <Link href="/courses" className="text-poseidon-gold hover:text-yellow-400 text-sm font-medium">
              ← Back to All Courses
            </Link>
          </nav>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-serif font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.summary}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-poseidon-gold">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Level: {course.level}
                </div>
                <div className="flex items-center text-poseidon-gold">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Duration: {course.duration}
                </div>
                {comingSoon && (
                  <div className="flex items-center">
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-poseidon-navy mb-6">Course Overview</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {course.description}
              </p>

              {course.objectives && (
                <>
                  <h3 className="text-xl font-semibold text-poseidon-navy mb-4">Learning Objectives</h3>
                  <ul className="space-y-3 mb-6">
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-poseidon-navy mb-2">Prerequisites</h4>
                  <p className="text-sm text-gray-600">
                    {course.level === 'Beginner' 
                      ? 'No prior experience required'
                      : 'Basic maritime knowledge recommended'
                    }
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-poseidon-navy mb-2">Certification</h4>
                  <p className="text-sm text-gray-600">
                    Internationally recognized certificate upon completion
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-poseidon-navy mb-4">Course Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">In-person & Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">English</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate:</span>
                  <span className="font-medium">Included</span>
                </div>
              </div>
            </div>

            {comingSoon ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-semibold text-amber-800">Coming Soon</h3>
                </div>
                <p className="text-amber-700 text-sm mb-4">
                  This course is currently being developed. Enrollment will be available soon.
                </p>
                <button 
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
                >
                  Enrollment Not Available
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-poseidon-navy mb-4">Ready to Enroll?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Join this course and advance your maritime security career.
                </p>
                <Link 
                  href="#enrollment"
                  className="block w-full bg-poseidon-blue text-white text-center py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200 font-medium"
                >
                  Enroll Now
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Enrollment Section */}
        {!comingSoon && (
          <div id="enrollment">
            <EnrollForm courseId={course.id} />
          </div>
        )}
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }))
}