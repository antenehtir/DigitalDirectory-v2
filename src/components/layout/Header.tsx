import Link from "next/link";
import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <BrandMark />

        <div className="hidden min-w-64 flex-1 items-center rounded-md border border-border bg-input px-4 py-3 text-sm text-muted-foreground shadow-sm md:flex lg:max-w-sm">
          Search doctors, facilities, pharmacies
        </div>

        <DesktopNavigation />

        <ThemeToggle />

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Link
            className="flex size-11 items-center justify-center rounded-md border border-border bg-card text-sm font-semibold text-primary shadow-sm md:hidden"
            href="/search"
            aria-label="Open search"
          >
            S
          </Link>
          <Link
            className="flex size-11 items-center justify-center rounded-md border border-border bg-card text-sm font-semibold text-primary shadow-sm"
            href="/register"
            aria-label="Open register"
          >
            R
          </Link>
        </div>
      </div>
    </header>
  );
}
