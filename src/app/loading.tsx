export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-none border-4 border-gray-200 border-t-brand-green" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
