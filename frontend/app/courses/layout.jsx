export default function CoursesLayout({ children }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <p className="mt-1 text-gray-600">
          Explore our catalog of maritime training programs.
        </p>
      </header>
      {children}
    </section>
  );
}