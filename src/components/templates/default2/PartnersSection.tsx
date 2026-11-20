import { partnerProfiles as defaultPartners } from "@/data/firmData";

export function PartnersSection({ content }: { content?: any; settings?: any }) {
  const eyebrow = content?.eyebrow ?? "04 / The Partners";
  const heading = content?.heading ?? "Partners & senior counsel.";
  const description =
    content?.description ??
    "Each brief accepted by our chambers is supervised directly by a partner admitted to practice before the Courts of Nepal, ensuring continuity of strategy from consultation through final decree.";
  const items = content?.items ?? defaultPartners;

  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="scroll-mt-20 border-b border-line py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-line">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
            <h2
              id="partners-heading"
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

        {/* Partner Profiles Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {items.map((partner: any, index: number) => (
            <article
              key={partner.id || index}
              className="flex flex-col justify-between border border-line bg-surface p-6 sm:p-8"
            >
              <div>
                {/* Top Row: Identity */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  <div className="sm:col-span-5">
                    <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-paper-alt flex flex-col items-center justify-center p-4 text-center">
                      <span className="w-12 h-12 rounded-full border border-accent/40 bg-white flex items-center justify-center text-accent text-lg mb-2 shadow-xs">
                        ⚖️
                      </span>
                      <span className="font-serif text-sm font-semibold text-ink line-clamp-1">
                        {partner.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-muted mt-0.5">
                        Senior Counsel
                      </span>
                    </div>
                  </div>

                  <div className="sm:col-span-7">
                    <span className="font-serif text-xs text-accent">
                      0{index + 1} · {partner.barCouncilNote || "Senior Counsel"}
                    </span>
                    <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl font-normal text-ink">
                      {partner.name}
                    </h3>
                    {partner.nepaliName && (
                      <p className="font-devanagari text-xs text-muted">
                        {partner.nepaliName}
                      </p>
                    )}
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink">
                      {partner.designation}
                    </p>

                    {/* Qualifications */}
                    <div className="mt-4 pt-3 border-t border-line">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                        Academic Credentials
                      </p>
                      <ul className="mt-1.5 space-y-1 text-xs text-ink/90">
                        {(partner.qualifications || []).map((qual: string, idx: number) => (
                          <li key={idx}>{qual}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Languages */}
                    {partner.languages && (
                      <div className="mt-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                          Working Languages
                        </p>
                        <p className="mt-0.5 text-xs text-ink/90">
                          {Array.isArray(partner.languages) ? partner.languages.join(" · ") : partner.languages}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Biography */}
                <div className="mt-6 pt-5 border-t border-line space-y-3 text-sm leading-relaxed text-muted">
                  {partner.shortBio && <p className="text-ink/90">{partner.shortBio}</p>}
                  {partner.extendedBio && <p>{partner.extendedBio}</p>}
                </div>
              </div>

              {/* Specialisations & Direct Chambers Email */}
              <div className="mt-6 pt-5 border-t border-line">
                {partner.specialisations && (
                  <>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                      Principal Areas of Focus
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {partner.specialisations.map((spec: string) => (
                        <span
                          key={spec}
                          className="border border-line bg-paper px-2.5 py-1 text-xs text-ink"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {partner.email && (
                  <div className="mt-5 flex items-center justify-between text-xs pt-3 border-t border-line/60">
                    <span className="uppercase tracking-[0.13em] text-muted">
                      Chambers Desk
                    </span>
                    <a
                      href={`mailto:${partner.email}`}
                      className="font-medium text-ink hover:text-accent transition-colors"
                    >
                      {partner.email}
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
