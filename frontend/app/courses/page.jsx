import Link from 'next/link';
import { courses } from '../../data/courses';

export default function CoursesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold">Available Courses</h1>
      <p className="mt-2 text-gray-600">Browse our maritime training courses</p>
      
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const comingSoon = course.status === 'coming_soon';
          
          return (
            <div key={course.id} className="rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                {comingSoon && (
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                    Coming soon
                  </span>
                )}
              </div>
              
              <p className="mt-2 text-sm text-gray-600">{course.summary}</p>
              
              <div className="mt-4 space-y-1 text-sm text-gray-500">
                <div><span className="font-medium text-gray-700">Level:</span> {course.level}</div>
                <div><span className="font-medium text-gray-700">Duration:</span> {course.duration}</div>
              </div>
              
              <div className="mt-4">
                {comingSoon ? (
                  <button 
                    disabled 
                    className="w-full rounded-md bg-gray-300 px-4 py-2 text-gray-500 cursor-not-allowed"
                  >
                    Coming soon
                  </button>
                ) : (
                  <Link
                    href={`/courses/${course.id}`}
                    className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
                  >
                    View course
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}