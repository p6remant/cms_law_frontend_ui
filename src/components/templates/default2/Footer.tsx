import Link from "next/link";
import { firmProfile, footerContent } from "@/data/firmData";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-paper">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Top Footer Navigation & Identity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-line-dark">
          {/* Firm Description & Seat */}
          <div className="lg:col-span-4">
            <Link href="#top" className="inline-block">
              <span className="font-serif text-2xl font-normal tracking-tight text-paper">
                {firmProfile.name}
              </span>
              <span className="mt-1 block font-devanagari text-xs text-paper/70">
                {firmProfile.nepaliName}
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-paper/75 max-w-sm">
              {footerContent.description}
            </p>

            <div className="mt-6 text-xs text-paper/70 space-y-1">
              <p>
                {firmProfile.address.building}, {firmProfile.address.street}
              </p>
              <p>
                {firmProfile.address.city} {firmProfile.address.postalCode},{" "}
                {firmProfile.country}
              </p>
              <p className="pt-2">
                <a
                  href={firmProfile.phoneHref}
                  className="text-paper hover:text-accent transition-colors"
                >
                  {firmProfile.phone}
                </a>{" "}
                ·{" "}
                <a
                  href={`mailto:${firmProfile.email}`}
                  className="text-paper hover:text-accent transition-colors"
                >
                  {firmProfile.email}
                </a>
              </p>
            </div>
          </div>

          {/* Selected Practice Links */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Practice Areas
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerContent.practiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/80 hover:text-paper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm Section Links */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              The Chambers
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerContent.firmLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/80 hover:text-paper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Legal Resources
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerContent.resourceLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-paper/80 hover:text-paper transition-colors"
                      >
                        <span>{link.label}</span>
                        <span aria-hidden="true" className="text-accent text-xs">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-paper/80 hover:text-paper transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Block */}
        <div className="py-10 border-b border-line-dark">
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
            {footerContent.disclaimerTitle}
          </h2>
          <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-paper/75">
            {footerContent.disclaimerParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Compliance Bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-paper/65">
          <p>
            © {currentYear} {firmProfile.name} ({firmProfile.establishedYearBS}
            ). All rights reserved.
          </p>
          <p>{footerContent.barComplianceNote}</p>
        </div>
      </div>
    </footer>
  );
}
