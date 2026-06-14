import Link from "next/link";
import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/96 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:min-h-[4.75rem] lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="hidden size-9 shrink-0 rounded-xl border border-[#B7E4D6] bg-[#E6F4EF] sm:block"
            aria-hidden="true"
          />
          <BrandMark />
        </div>

        <div className="hidden min-w-64 flex-1 items-center rounded-full border border-border bg-background px-4 py-2.5 text-sm text-muted-foreground md:flex lg:max-w-sm">
          <span className="mr-2 size-2 rounded-full bg-[#0F8B6E]" />
          Search hospitals, clinics, diagnostics
        </div>

        <DesktopNavigation />

        <ThemeToggle />

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Link
            className="flex h-10 items-center justify-center rounded-full border border-border bg-card px-3 text-sm font-semibold text-foreground"
            href="/search"
            aria-label="Open search"
          >
            Search
          </Link>
          <Link
            className="flex h-10 items-center justify-center rounded-full bg-primary px-3 text-sm font-semibold text-primary-foreground"
            href="/register"
            aria-label="Open register"
          >
            Add
          </Link>
        </div>
      </div>
    </header>
  );
}
