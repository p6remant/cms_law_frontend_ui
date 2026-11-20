import Link from "next/link";
import { featuredPracticeAreas as defaultFeaturedAreas, firmProfile } from "@/data/firmData";

export function PracticeHighlights({ content }: { content?: any; settings?: any }) {
  const eyebrow = content?.eyebrow ?? `${firmProfile.shortName} · Core Mandates`;
  const heading = content?.heading ?? "Principal areas of statutory & courtroom practice.";
  const description =
    content?.description ??
    "Select a principal practice group below to examine the governing Nepali statute and scope of representation.";
  const items = content?.items ?? defaultFeaturedAreas;

  return (
    <section
      aria-labelledby="practice-highlights-heading"
      className="border-b border-line py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Header Column */}
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
            <h2
              id="practice-highlights-heading"
              className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-ink leading-snug"
            >
              {heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {description}
            </p>
          </div>

          {/* Right Compact Editorial List */}
          <div className="lg:col-span-8">
            <ol className="divide-y divide-line border-t border-b border-line">
              {items.map((item: any) => (
                <li key={item.id}>
                  <Link
                    href={`#pa-${item.targetSlug || item.slug || ''}`}
                    className="group py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 transition-colors hover:bg-paper-alt/60 px-2 -mx-2"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-serif text-sm font-medium text-accent tabular-nums">
                        {item.number}
                      </span>
                      <div>
                        <span className="font-serif text-xl sm:text-2xl text-ink group-hover:text-accent transition-colors">
                          {item.name}
                        </span>
                        <p className="mt-0.5 text-xs text-muted">
                          {item.summary || item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 pl-8 sm:pl-0 shrink-0">
                      <span className="text-xs font-medium text-muted">
                        {item.statuteShort || item.statute}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-xs text-ink group-hover:translate-x-1 group-hover:text-accent transition-transform"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
