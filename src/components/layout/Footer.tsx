import Link from "next/link";

const quickLinks = [
  { label: "Search", href: "/search" },
  { label: "Nearby", href: "/nearby" },
  { label: "Doctors", href: "/doctors" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacies", href: "/pharmacies" },
  { label: "Diagnostics", href: "/diagnostics" },
];

const providerLinks = [
  { label: "Register", href: "/register" },
  { label: "Suggest correction", href: "/corrections" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 pb-28 text-sm text-muted-foreground sm:px-6 md:grid-cols-[1.1fr_1fr_0.8fr] md:pb-8 lg:px-8">
        <div>
          <p className="font-medium text-foreground">DigitalDirectory-v2</p>
          <p className="mt-2 leading-6">
            Trusted healthcare discovery for Ethiopia.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <p className="font-semibold text-foreground">Explore</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <Link
                className="w-fit text-muted-foreground transition-colors hover:text-primary"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Footer provider links">
          <p className="font-semibold text-foreground">Providers</p>
          <div className="mt-3 grid gap-2">
            {providerLinks.map((link) => (
              <Link
                className="w-fit text-muted-foreground transition-colors hover:text-primary"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
