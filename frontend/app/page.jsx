import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Poseidon Global Maritime University</h1>
        <p className="mt-4 text-lg text-gray-600">
          Bringing maritime security courses alive and to persons who have never worked at sea
        </p>
        
        <div className="mt-8 space-x-4">
          <Link
            href="/courses"
            className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            View Courses
          </Link>
          <Link
            href="/login"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}