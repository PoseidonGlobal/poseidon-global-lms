import CourseCard from '../../components/CourseCard';
import { courses } from '../../data/courses';

export const metadata = {
  title: 'Courses · Poseidon Global LMS',
};

export default function CoursesPage() {
  return (
    <main>
      <h1 className="mb-4 text-2xl font-bold">Course Catalog</h1>
      <p className="mb-6 text-gray-600">
        Explore our professional maritime safety and security training programs.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </main>
  );
}