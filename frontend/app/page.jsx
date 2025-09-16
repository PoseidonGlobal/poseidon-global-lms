import Link from 'next/link'
import Hero from '@/components/Hero'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero 
        title="Poseidon Global Maritime University"
        subtitle="Bringing maritime security courses alive and to persons who have never worked at sea"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/courses"
            className="bg-poseidon-gold text-poseidon-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
          >
            Browse Courses
          </Link>
          <Link 
            href="/register"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-poseidon-navy transition duration-200"
          >
            Register Now
          </Link>
        </div>
      </Hero>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-poseidon-navy mb-4">
              Why Choose Poseidon Global?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive maritime security education designed for excellence and real-world application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-poseidon-blue rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-poseidon-navy mb-4">Industry-Leading Expertise</h3>
              <p className="text-gray-600">
                Founded by experienced maritime security professionals with extensive industry knowledge and military backgrounds.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-poseidon-gold rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-poseidon-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-poseidon-navy mb-4">Comprehensive Curriculum</h3>
              <p className="text-gray-600">
                From basic safety training to advanced security protocols, our courses cover all aspects of maritime security education.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-poseidon-navy mb-4">Rapid Career Growth</h3>
              <p className="text-gray-600">
                Our training programs are designed to accelerate your maritime security career with internationally recognized certifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-poseidon-navy mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600">
              Start your maritime security journey with our most sought-after programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-poseidon-navy mb-2">STCW Basic Safety Training</h3>
                <p className="text-gray-600 mb-4">Foundational safety training for all seafarers</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Beginner</span>
                  <span>5 days</span>
                </div>
                <Link 
                  href="/courses/stcw-basic"
                  className="block w-full text-center bg-poseidon-blue text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-poseidon-navy mb-2">GMDSS Radio Operator</h3>
                <p className="text-gray-600 mb-4">Operate GMDSS equipment and procedures</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Intermediate</span>
                  <span>10 days</span>
                </div>
                <Link 
                  href="/courses/gmdss"
                  className="block w-full text-center bg-poseidon-blue text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-poseidon-navy mb-2">DP Induction</h3>
                <p className="text-gray-600 mb-4">Introduction to DP systems and operations</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Intermediate</span>
                  <span>4 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                    Coming Soon
                  </span>
                  <Link 
                    href="/courses/dp-induction"
                    className="text-poseidon-blue hover:text-blue-600 text-sm font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/courses"
              className="bg-poseidon-gold text-poseidon-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-poseidon-navy">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Ready to Start Your Maritime Security Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who have advanced their careers with Poseidon Global training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="bg-poseidon-gold text-poseidon-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
            >
              Register Now
            </Link>
            <Link 
              href="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-poseidon-navy transition duration-200"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}