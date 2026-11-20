import { selectedJudgments as defaultJudgments } from "@/data/firmData";

export function SelectedJudgmentsSection({ content }: { content?: any; settings?: any }) {
  const eyebrow = content?.eyebrow ?? "06 / From the Record";
  const heading = content?.heading ?? "Selected Supreme Court judgments.";
  const description =
    content?.description ??
    "A curated index of reported decisions published in the Nepal Kanoon Patrika (NKP) of relevance to civil transactions, property partition, and commercial arbitration jurisprudence.";
  const items = content?.items ?? defaultJudgments;

  return (
    <section
      id="judgments"
      aria-labelledby="judgments-heading"
      className="scroll-mt-20 border-b border-line py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-line">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
            <h2
              id="judgments-heading"
              className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink"
            >
              {heading}
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="max-w-2xl text-base leading-relaxed text-muted">
              {description}
            </p>
          </div>
        </div>

        {/* Document Rows */}
        <div className="divide-y divide-line border-b border-line">
          {items.map((judgment: any) => (
            <article
              key={judgment.id}
              className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
            >
              {/* Left Column: Citation & Court */}
              <div className="lg:col-span-4">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
                  {judgment.referenceNumber}
                </p>
                <p className="mt-1.5 text-sm font-medium text-ink">
                  {judgment.court}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  Published: {judgment.publicationYear} · {judgment.subjectArea}
                </p>
              </div>

              {/* Middle Column: Judgment Title & Neutral Description */}
              <div className="lg:col-span-6">
                <h3 className="font-serif text-2xl font-normal text-ink leading-snug">
                  {judgment.title}
                </h3>
                {judgment.nepaliReference && (
                  <p className="mt-1 font-devanagari text-xs text-muted">
                    {judgment.nepaliReference}
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {judgment.summary}
                </p>
              </div>

              {/* Right Column: Official Archive Link */}
              <div className="lg:col-span-2 flex lg:justify-end">
                {judgment.documentUrl && (
                  <a
                    href={judgment.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${judgment.documentLabel || 'Official Record'} for ${judgment.referenceNumber} (opens in a new tab)`}
                    className="inline-flex items-center gap-2 border border-line bg-surface px-4 py-2.5 text-xs font-medium uppercase tracking-[0.13em] text-ink hover:border-ink transition-colors"
                  >
                    <span>Official Record</span>
                    <span aria-hidden="true" className="text-accent">
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted">
          Further reported judgments and statutory research notes are maintained
          in the chambers library. External links direct to official Supreme
          Court of Nepal public repositories.
        </p>
      </div>
    </section>
  );
}
