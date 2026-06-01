import Link from "next/link";

export function BrandMark() {
  return (
    <Link
      className="flex min-w-0 items-center gap-3"
      href="/"
      aria-label="Tiru – Healthcare Directory home"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground shadow-sm">
        T
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-base font-semibold text-foreground">
          Tiru
        </span>
        <span className="block truncate text-sm text-muted-foreground">
          Addis Ababa, Ethiopia
        </span>
      </span>
    </Link>
  );
}
