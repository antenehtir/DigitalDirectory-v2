type CommunityChannelCardProps = {
  name: string;
  purpose: string;
  audience: string;
  href: string;
};

export function CommunityChannelCard({
  name,
  purpose,
  audience,
  href,
}: CommunityChannelCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-background p-4 shadow-sm">
      <div>
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {purpose}
        </p>
      </div>
      <div className="mt-4 rounded-md bg-muted px-4 py-3 text-sm font-medium text-foreground">
        {audience}
      </div>
      <a
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-card px-4 text-center text-sm font-semibold text-primary"
        href={href}
      >
        Preview channel
      </a>
    </article>
  );
}
