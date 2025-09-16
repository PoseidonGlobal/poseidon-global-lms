import Link from 'next/link'
import { courses } from '@/data/courses'
import Hero from '@/components/Hero'

export const metadata = {
  title: 'Maritime Security Courses - Poseidon Global',
  description: 'Browse our comprehensive maritime security training courses designed for cruise vessels, cargo ships, and luxury yachts.',
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        title="Maritime Security Courses"
        subtitle="Comprehensive training programs for modern maritime professionals"
      />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-lg text-gray-600 max-w-3xl">
            Our expertly crafted courses explore strategic analysis, risk assessment, and advanced security frameworks 
            tailored to the unique challenges of life at sea. Whether you're safeguarding passengers, protecting assets, 
            or navigating international waters, we prepare you for the future of maritime security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const isComingSoon = course.status === 'coming_soon'
            
            return (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-poseidon-navy">{course.title}</h3>
                    {isComingSoon && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{course.summary}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.level}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    {isComingSoon ? (
                      <button
                        type="button"
                        disabled
                        title="This course is coming soon"
                        className="flex-1 cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-500 text-center"
                      >
                        Details Unavailable
                      </button>
                    ) : (
                      <Link
                        href={`/courses/${course.id}`}
                        className="flex-1 bg-poseidon-blue text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                      >
                        View Course Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-poseidon-navy mb-4">
            Ready to Begin Your Maritime Security Journey?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our comprehensive training programs and advance your maritime security career with 
            internationally recognized certifications and expert instruction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="bg-poseidon-gold text-poseidon-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
            >
              Register as Student
            </Link>
            <Link 
              href="/about"
              className="bg-poseidon-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}