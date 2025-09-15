import Link from 'next/link';
import { notFound } from 'next/navigation';
import { courses } from '../../../data/courses';
import EnrollForm from '../../../components/EnrollForm';

export default function CoursePage({ params }) {
  const course = courses.find((c) => c.id === params.id);
  if (!course) return notFound();

  const comingSoon = course.status === 'coming_soon';

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-4 text-sm text-gray-600">
        <Link href="/courses" className="hover:text-blue-700">← Back to courses</Link>
      </nav>

      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="mt-2 text-gray-700">{course.summary}</p>

      <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2">
        <div><span className="font-medium text-gray-800">Level:</span> {course.level}</div>
        <div><span className="font-medium text-gray-800">Duration:</span> {course.duration}</div>
      </div>

      {comingSoon ? (
        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-900">
          This course is coming soon. Enrollment is not yet available.
        </div>
      ) : (
        <div className="mt-6">
          <EnrollForm courseId={course.id} />
        </div>
      )}
    </main>
  );
}

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}
