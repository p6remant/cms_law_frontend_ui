import { founderForewordContent as defaultForeword } from "@/data/firmData";

export function FounderForewordSection({ content }: { content?: any; settings?: any }) {
  const eyebrow = content?.eyebrow ?? defaultForeword.eyebrow;
  const heading = content?.heading ?? defaultForeword.heading;
  const pullQuote = content?.pullQuote ?? defaultForeword.pullQuote;
  const paragraphs = content?.paragraphs ?? defaultForeword.paragraphs;
  const founderName = content?.founderName ?? defaultForeword.founderName;
  const nepaliName = content?.nepaliName ?? defaultForeword.nepaliName;
  const designation = content?.designation ?? defaultForeword.designation;
  const credentials = content?.credentials ?? defaultForeword.credentials;

  return (
    <section
      id="foreword"
      aria-labelledby="foreword-heading"
      className="scroll-mt-20 border-b border-line bg-paper-alt/50 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Founder Portrait Card */}
          <div className="lg:col-span-5">
            <div className="bg-surface border border-line p-4 sm:p-5 max-w-sm">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-paper-alt flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col items-center justify-center p-6 text-center">
                  <span className="w-16 h-16 rounded-full border border-accent/40 bg-white flex items-center justify-center text-accent mb-3 shadow-xs">
                    ⚖️
                  </span>
                  <span className="font-serif text-lg font-semibold text-ink">
                    {founderName}
                  </span>
                  <span className="text-xs text-accent uppercase tracking-wider mt-1">
                    Chambers Founder
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-line">
                <h3 className="font-serif text-xl font-normal text-ink">
                  {founderName}
                </h3>
                {nepaliName && (
                  <p className="mt-0.5 font-devanagari text-xs text-muted">
                    {nepaliName}
                  </p>
                )}
                <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-accent">
                  {designation}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {credentials}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Foreword Message */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>

            <h2
              id="foreword-heading"
              className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-normal leading-[1.15] text-ink"
            >
              {heading}
            </h2>

            {/* Pull Quote */}
            <blockquote className="mt-7 border-l-2 border-accent pl-5 sm:pl-6 py-1">
              <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-ink">
                {pullQuote}
              </p>
            </blockquote>

            {/* Foreword Paragraphs */}
            <div className="mt-7 space-y-4 text-base leading-relaxed text-muted max-w-2xl">
              {paragraphs.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
