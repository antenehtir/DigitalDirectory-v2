import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "./SectionHeading";

const trustItems = [
  {
    title: "Verification you can see",
    text: "Every verified provider carries a green badge. Community-submitted listings are labelled separately so you always know what has been reviewed.",
  },
  {
    title: "Fast on every screen",
    text: "Names, locations, hours, and contact actions are readable on a small Android screen in under five seconds — no app download needed.",
  },
  {
    title: "You can report wrong information",
    text: "Every listing has a correction link. If an address or phone number is out of date, one tap lets you flag it for review.",
  },
];

export function TrustExplanationSection() {
  return (
    <section className="bg-background">
      <PageContainer className="py-8 sm:py-10 lg:py-14">
        <SectionHeading
          eyebrow="Why trust matters"
          title="Verified healthcare, clearly labelled."
          description="Tiru puts verification, hours, and location front and centre so you can choose with confidence."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {trustItems.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-border bg-card p-5 shadow-sm"
            >
              <div className="mb-4 size-2 rounded-full bg-success" />
              <h3 className="font-semibold text-card-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
