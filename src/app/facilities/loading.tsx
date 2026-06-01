import { PageShell } from "@/components/layout/PageShell";

export default function FacilitiesLoading() {
  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-72 bg-gray-100 rounded animate-pulse mb-8" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse mb-2" />
              <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse mb-4" />
              <div className="flex gap-2 mt-4">
                <div className="h-8 flex-1 bg-gray-100 rounded animate-pulse" />
                <div className="h-8 flex-1 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
