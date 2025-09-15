import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-blue-700">
          Poseidon Global LMS
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          <Link href="/courses" className="hover:text-blue-700">Courses</Link>
          <Link href="/about" className="hover:text-blue-700">About</Link>
        </div>
      </div>
    </nav>
  );
}