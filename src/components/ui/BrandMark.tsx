import Link from "next/link";
import Image from "next/image";

export function BrandMark() {
  return (
    <Link
      className="flex min-w-0 items-center"
      href="/"
      aria-label="Tiru MedDirectory home"
    >
      <span className="brand-logo-frame">
        <Image
          src="/brand/tiru-primary-logo.svg"
          alt="Tiru MedDirectory"
          width={1200}
          height={420}
          priority
          className="brand-logo brand-logo-light"
        />
        <Image
          src="/brand/tiru-primary-logo-dark.svg"
          alt="Tiru MedDirectory"
          width={1200}
          height={420}
          priority
          className="brand-logo brand-logo-dark"
        />
      </span>
    </Link>
  );
}
