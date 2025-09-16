import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { authOptions } from '../../../lib/auth';

export default async function StudentProfilePage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const { username } = params;

  if (session.user.username !== username) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-xl font-semibold text-red-700">Access denied</h1>
        <p className="mt-2 text-gray-700">You are not authorized to view this page.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">Student: {username}</h1>
      <p className="mt-2 text-gray-700">This page will show your enrollments and course progress.</p>
    </main>
  );
}