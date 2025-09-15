export default function Loading() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      <span className="ml-3 text-gray-600">Loading...</span>
    </div>
  );
}
