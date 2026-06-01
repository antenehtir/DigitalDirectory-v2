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
  { label: "Provider registration", href: "/register" },
  { label: "Provider dashboard preview", href: "/provider-dashboard-preview" },
  { label: "Suggest correction", href: "/corrections" },
  { label: "Contact", href: "/contact" },
  { label: "Feedback", href: "/feedback" },
];

const communityLinks = [
  { label: "Telegram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Email updates", href: "#" },
  { label: "WhatsApp", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-6xl gap-7 px-4 py-8 pb-28 text-sm text-muted-foreground sm:px-6 md:grid-cols-2 md:gap-8 md:pb-8 lg:grid-cols-[1.1fr_1fr_0.8fr_0.8fr] lg:px-8">
        <div className="max-w-sm">
          <p className="font-medium text-foreground">DigitalDirectory-v2</p>
          <p className="mt-2 leading-6">
            Trusted healthcare discovery for Ethiopia.
          </p>
          <Link
            className="mt-4 inline-flex min-h-9 items-center rounded-full border border-border bg-background px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/35 hover:text-primary"
            href="/account-preview"
          >
            Account preview
          </Link>
        </div>

        <nav aria-label="Footer quick links">
          <p className="font-semibold text-foreground">Explore</p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
            {quickLinks.map((link) => (
              <Link
                className="flex min-h-9 w-fit items-center text-muted-foreground transition-colors hover:text-primary"
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
          <div className="mt-3 grid gap-1">
            {providerLinks.map((link) => (
              <Link
                className="flex min-h-9 w-fit items-center text-muted-foreground transition-colors hover:text-primary"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Footer community links">
          <p className="font-semibold text-foreground">Community</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-0.5 text-sm leading-6">
            {communityLinks.map((link, index) => (
              <span className="inline-flex items-center gap-x-1" key={link.label}>
                {index > 0 ? (
                  <span className="text-border" aria-hidden="true">
                    &middot;
                  </span>
                ) : null}
                <a
                  className="inline-flex min-h-8 items-center text-muted-foreground transition-colors hover:text-primary"
                  href={link.href}
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
