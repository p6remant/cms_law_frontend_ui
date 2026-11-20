import Link from "next/link";
import { firmOverviewContent as defaultOverview } from "@/data/firmData";

export function FirmOverviewSection({ content }: { content?: any; settings?: any }) {
  const eyebrow = content?.eyebrow ?? defaultOverview.eyebrow;
  const heading = content?.heading ?? defaultOverview.heading;
  const leadParagraph = content?.leadParagraph ?? defaultOverview.leadParagraph;
  const bodyParagraphs = content?.bodyParagraphs ?? defaultOverview.bodyParagraphs;
  const foundingSummary = content?.foundingSummary ?? defaultOverview.foundingSummary;
  const timelineHeading = content?.timelineHeading ?? defaultOverview.timelineHeading;
  const timelineSubheading = content?.timelineSubheading ?? defaultOverview.timelineSubheading;
  const timeline = content?.timeline ?? defaultOverview.timeline;
  const partnersCtaLabel = content?.partnersCtaLabel ?? defaultOverview.partnersCtaLabel;
  const partnersCtaHref = content?.partnersCtaHref ?? defaultOverview.partnersCtaHref;

  return (
    <section
      id="the-firm"
      aria-labelledby="the-firm-heading"
      className="scroll-mt-20 border-b border-line py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-start">
          {/* Left Column: Firm Overview & Founding Summary */}
          <div className="lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
            <h2
              id="the-firm-heading"
              className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-normal leading-[1.15] text-ink"
            >
              {heading}
            </h2>

            <p className="mt-7 text-base sm:text-lg leading-relaxed text-ink/90">
              {leadParagraph}
            </p>

            <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-muted">
              {bodyParagraphs.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Founding Metadata Grid */}
            <dl className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-line py-6">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-muted">
                  Founding Counsel
                </dt>
                <dd className="mt-1 font-serif text-lg text-ink">
                  {foundingSummary.foundedBy}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-muted">
                  Year of Establishment
                </dt>
                <dd className="mt-1 font-serif text-lg text-ink">
                  {foundingSummary.foundedYear}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-muted">
                  Principal Chambers
                </dt>
                <dd className="mt-1 text-sm text-ink">
                  {foundingSummary.chambersLocation}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-muted">
                  Representative Clientele
                </dt>
                <dd className="mt-1 text-sm text-ink">
                  {foundingSummary.clientele}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <Link
                href={partnersCtaHref}
                className="group inline-flex items-center gap-2.5 border-b border-ink pb-1 text-xs font-medium uppercase tracking-[0.16em] text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <span>{partnersCtaLabel}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Chronological History Timeline */}
          <div className="lg:col-span-6 lg:pl-8 lg:border-l lg:border-line">
            <div className="pb-6 border-b border-line">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                {timelineHeading}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted">
                {timelineSubheading}
              </p>
            </div>

            <ol className="mt-8 relative border-l border-line ml-2 sm:ml-3 space-y-10">
              {timeline.map((entry: any) => (
                <li key={entry.id} className="relative pl-6 sm:pl-8">
                  {/* Subtle square marker */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[4.5px] top-1.5 h-2 w-2 bg-accent"
                  />

                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <span className="font-serif text-lg font-semibold text-accent">
                      {entry.yearBS}
                    </span>
                    <span className="text-xs uppercase tracking-[0.14em] text-muted">
                      ({entry.yearAD} A.D.)
                    </span>
                  </div>

                  <h4 className="mt-1.5 font-serif text-xl font-medium text-ink">
                    {entry.heading}
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {entry.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
