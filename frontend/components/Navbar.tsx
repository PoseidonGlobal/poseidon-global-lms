import ActiveLink from './ActiveLink';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <ActiveLink href="/" className="text-xl">
          <span className="font-bold text-blue-700">Poseidon Global LMS</span>
        </ActiveLink>
        <div className="flex items-center gap-6">
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/courses">Courses</ActiveLink>
          <ActiveLink href="/about">About</ActiveLink>
        </div>
      </div>
    </nav>
  );
}