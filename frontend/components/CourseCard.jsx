export default function CourseCard({ course }) {
  return (
    <div className="flex flex-col rounded-lg border bg-white p-4 shadow-sm transition hover:shadow">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{course.summary}</p>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>Level: {course.level}</span>
        <span>Duration: {course.duration}</span>
      </div>
      <button
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        type="button"
      >
        View details
      </button>
    </div>
  );
}