"use client";

import { useState } from "react";
import Link from "next/link";
import { practiceAreas as defaultPracticeAreas } from "@/data/firmData";

export function PracticeAreasSection({ content }: { content?: any; settings?: any }) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "pa-01": true,
  });

  const eyebrow = content?.eyebrow ?? "02 / What We Do";
  const heading = content?.heading ?? "Practice areas.";
  const description =
    content?.description ??
    "Our chambers provide advisory, transactional, and courtroom representation across thirteen codified areas of Nepali law. Each mandate is anchored in the governing statute, procedural code, and settled Supreme Court precedent.";
  const items = content?.items ?? defaultPracticeAreas;

  const togglePracticeItem = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="practice-areas"
      aria-labelledby="practice-areas-heading"
      className="scroll-mt-20 border-b border-line py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-line">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
            <h2
              id="practice-areas-heading"
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

        {/* Structured Editorial List of 13 Practice Areas */}
        <div className="divide-y divide-line border-b border-line">
          {items.map((area: any) => {
            const isExpanded = Boolean(expandedIds[area.id]);
            const panelId = `practice-detail-${area.slug || area.id}`;

            return (
              <article
                key={area.id}
                id={`pa-${area.slug || area.id}`}
                className="scroll-mt-24 py-8 sm:py-10 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Column 1: Number, Title, Nepali Subtitle, and Statute */}
                  <div className="lg:col-span-5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-serif text-sm font-medium text-accent tabular-nums">
                        {area.number}
                      </span>
                      <div>
                        <h3 className="font-serif text-2xl sm:text-[1.7rem] font-normal text-ink leading-snug">
                          {area.name}
                        </h3>
                        {area.nepaliTitle && (
                          <p className="mt-0.5 font-devanagari text-xs text-muted">
                            {area.nepaliTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pl-8">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                        Statutory Framework
                      </p>
                      <p className="mt-1 text-xs font-medium text-ink/90 leading-relaxed">
                        {area.statute}
                      </p>
                    </div>
                  </div>

                  {/* Column 2: Main Description, Approach & Expandable Scope */}
                  <div className="lg:col-span-7 lg:pl-4">
                    <p className="text-base leading-relaxed text-ink">
                      {area.description}
                    </p>
                    {area.approach && (
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {area.approach}
                      </p>
                    )}

                    {/* Expandable Detail Panel */}
                    {isExpanded && (
                      <div
                        id={panelId}
                        className="mt-6 border-t border-line/80 bg-paper-alt/60 p-5 sm:p-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                          <div className="sm:col-span-8">
                            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-ink">
                              Representative Mandates &amp; Scope
                            </h4>
                            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-muted">
                              {(area.keyMatters || []).map((matter: string, i: number) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2.5"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="text-accent mt-0.5"
                                  >
                                    —
                                  </span>
                                  <span>{matter}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="sm:col-span-4 border-t sm:border-t-0 sm:border-l border-line pt-4 sm:pt-0 sm:pl-5 flex flex-col justify-between">
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                                Practice Lead
                              </p>
                              <p className="mt-1 font-serif text-base text-ink">
                                {area.leadCounsel}
                              </p>
                            </div>

                            <Link
                              href="#contact"
                              className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-accent hover:text-ink transition-colors"
                            >
                              <span>Inquire</span>
                              <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Accessible Read More / Collapse Control */}
                    <div className="mt-5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => togglePracticeItem(area.id)}
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-ink hover:text-accent transition-colors cursor-pointer"
                      >
                        <span>
                          {isExpanded
                            ? "Close statutory details"
                            : "Read more on scope & counsel"}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-accent font-serif text-sm"
                        >
                          {isExpanded ? "−" : "+"}
                        </span>
                      </button>

                      {area.leadCounsel && (
                        <span className="text-xs text-muted hidden sm:inline">
                          Lead: {area.leadCounsel}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Informational Accuracy Footnote */}
        <p className="mt-6 text-xs text-muted leading-relaxed">
          Note: References to Acts and statutory provisions reflect general
          codified frameworks in force in Nepal and do not constitute formal
          legal advice for individual matters.
        </p>
      </div>
    </section>
  );
}
