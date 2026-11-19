// app/loading.tsx
export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="flex min-h-[60vh] items-center justify-center">
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
