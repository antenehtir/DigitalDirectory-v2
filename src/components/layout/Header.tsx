import Link from "next/link";
import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { BrandMark } from "@/components/ui/BrandMark";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <div className="hidden min-w-64 flex-1 items-center rounded-md border border-border bg-input px-4 py-3 text-sm text-muted-foreground shadow-sm md:flex lg:max-w-sm">
          Search doctors, facilities, pharmacies
        </div>

        <DesktopNavigation />

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Link
            className="flex size-11 items-center justify-center rounded-md border border-border bg-card text-primary shadow-sm md:hidden"
            href="/search"
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </Link>
          <Link
            className="flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm"
            href="/register"
            aria-label="List your practice"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
