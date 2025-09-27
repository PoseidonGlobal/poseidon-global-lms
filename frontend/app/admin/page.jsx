import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.role !== 'admin') {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-xl font-semibold text-red-700">
          Admin access required
        </h1>
        <p className="mt-2 text-gray-700">
          You do not have permission to view this page.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Admin</h1>
      <ul className="mt-4 list-disc pl-6 text-gray-700">
        <li>Manage courses (create/update/publish)</li>
        <li>View enrollments and student progress</li>
        <li>Review registrations and approvals</li>
      </ul>
    </main>
  );
}