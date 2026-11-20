import { firmProfile } from "@/data/firmData";

export function ContactSection({ content }: { content?: any; settings?: any }) {
  const eyebrow = content?.eyebrow ?? "07 / Confidential Consultation";
  const heading = content?.heading ?? "Inquire with our chambers in Kathmandu.";
  const description =
    content?.description ??
    "To arrange an in-person or virtual legal consultation, please contact the chambers secretariat by telephone or written correspondence. Kindly indicate the general nature of the matter so that a conflict-of-interest check may be completed prior to scheduling.";
  const email = content?.email ?? firmProfile.email;
  const secondaryEmail = content?.secondaryEmail ?? firmProfile.secondaryEmail;
  const phone = content?.phone ?? firmProfile.phone;
  const phoneHref = content?.phoneHref ?? firmProfile.phoneHref;
  const address = content?.address ?? firmProfile.address;
  const workingHours = content?.workingHours ?? firmProfile.workingHours;
  const workingDays = content?.workingDays ?? firmProfile.workingDays;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-b border-line bg-paper-alt py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Invitation & Process Note */}
          <div className="lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
            <h2
              id="contact-heading"
              className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-ink"
            >
              {heading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted max-w-xl">
              {description}
            </p>

            {/* Primary Actionable Contact Links */}
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-3 bg-ink px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-paper hover:bg-dark-alt transition-colors"
              >
                <span>Write to Chambers</span>
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              </a>

              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-3 border border-ink bg-surface px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-ink hover:bg-ink hover:text-paper transition-colors"
              >
                <span>Call {phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Structured Chambers Directory */}
          <div className="lg:col-span-6">
            <div className="border border-line bg-surface p-7 sm:p-10">
              <div className="pb-6 border-b border-line">
                <h3 className="font-serif text-2xl font-normal text-ink">
                  {content?.firmName || firmProfile.name}
                </h3>
                <p className="mt-1 font-devanagari text-xs text-muted">
                  {content?.nepaliName || firmProfile.nepaliName}
                </p>
              </div>

              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                    Chambers Address
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink">
                    <p className="font-medium">{address.building}</p>
                    <p>{address.street}</p>
                    <p>{address.district}</p>
                    <p>
                      {address.city} {address.postalCode},{" "}
                      {firmProfile.country}
                    </p>
                  </dd>
                </div>

                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                    Direct Correspondence
                  </dt>
                  <dd className="mt-2 space-y-2 text-sm">
                    <div>
                      <span className="block text-xs text-muted">
                        General &amp; Litigation:
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-accent transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                    {secondaryEmail && (
                      <div>
                        <span className="block text-xs text-muted">
                          Research &amp; Corporate Desk:
                        </span>
                        <a
                          href={`mailto:${secondaryEmail}`}
                          className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-accent transition-colors"
                        >
                          {secondaryEmail}
                        </a>
                      </div>
                    )}
                    <div className="pt-1">
                      <span className="block text-xs text-muted">
                        Telephone:
                      </span>
                      <a
                        href={phoneHref}
                        className="font-medium text-ink hover:text-accent transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </dd>
                </div>

                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                    Chambers Hours
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink">
                    <p className="font-medium">{workingHours}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {workingDays}
                    </p>
                  </dd>
                </div>

                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                    Location Reference
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed">
                    <p className="text-xs text-muted">
                      500m North of the Supreme Court of Nepal, Ramshah Path
                      Corridor
                    </p>
                    <a
                      href={firmProfile.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-accent hover:text-ink transition-colors"
                    >
                      <span>View Location on Map</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
