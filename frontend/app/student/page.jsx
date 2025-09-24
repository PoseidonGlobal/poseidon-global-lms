import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../lib/auth';
import { auth } from '@/auth';

export default async function StudentPage() {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
      <p className="mt-2 text-gray-700">
        This dashboard displays content specific to your account (enrollments,
        progress, certificates).
      </p>
      <div className="mt-6">
        <a
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
          href={`/student/${session.user.username}`}
        >
          View your profile page
        </a>
      </div>
    </main>
  );
}
