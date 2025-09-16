import Link from 'next/link';
import { courses } from '../../data/courses';

export default function CoursesIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => {
          const isComingSoon = c.status === 'coming_soon';
          return (
            <li key={c.id} className="rounded border p-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                {isComingSoon && (
                  <span className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-600">{c.summary}</p>
              <div className="mt-3 text-sm text-gray-600">
                <span className="mr-3">Level: {c.level}</span>
                <span>Duration: {c.duration}</span>
              </div>
              <div className="mt-4">
                {isComingSoon ? (
                  <button
                    type="button"
                    disabled
                    title="This course is coming soon"
                    className="inline-flex cursor-not-allowed rounded border border-gray-300 bg-gray-100 px-3 py-1.5 text-sm text-gray-500"
                  >
                    Details unavailable
                  </button>
                ) : (
                  <Link
                    href={`/courses/${c.id}`}
                    className="inline-flex rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                  >
                    View course
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}