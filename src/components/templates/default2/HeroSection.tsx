"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { firmProfile, heroContent as defaultHeroContent, practiceAreas } from "@/data/firmData";

interface OrbitalPracticeCard {
  id: string;
  number: string;
  shortLabel: string;
  slug: string;
}

const orbitalPracticePool: OrbitalPracticeCard[] = practiceAreas.map(
  (area) => {
    const shortNames: Record<string, string> = {
      "01": "Business & Corporate",
      "02": "Civil Law",
      "03": "Criminal Defence",
      "04": "Family Law",
      "05": "Divorce Law",
      "06": "Tort Litigation",
      "07": "Employment & Labour",
      "08": "Cybercrime & IT",
      "09": "Consumer Protection",
      "10": "Immigration",
      "11": "Foreign Investment",
      "12": "Intellectual Property",
      "13": "Secretarial & Compliance",
    };

    return {
      id: area.id,
      number: area.number,
      shortLabel: shortNames[area.number] ?? area.name,
      slug: area.slug,
    };
  }
);

const orbitalSlots = [
  {
    positionClass: "top-[2%] left-1/2 -translate-x-1/2",
    floatDelay: "0s",
    floatDuration: "4.4s",
  },
  {
    positionClass: "top-[29%] right-[-2%]",
    floatDelay: "0.7s",
    floatDuration: "4.8s",
  },
  {
    positionClass: "bottom-[5%] right-[5%]",
    floatDelay: "1.4s",
    floatDuration: "4.2s",
  },
  {
    positionClass: "bottom-[1%] left-[9%]",
    floatDelay: "2.1s",
    floatDuration: "4.6s",
  },
  {
    positionClass: "top-[27%] left-[-2%]",
    floatDelay: "2.8s",
    floatDuration: "5.0s",
  },
];

export function HeroSection({ content }: { content?: any; settings?: any }) {
  const [startIndex, setStartIndex] = useState(6);
  const [isPaused, setIsPaused] = useState(false);

  const eyebrow = content?.eyebrow ?? defaultHeroContent.eyebrow;
  const nepaliEyebrow = content?.nepaliEyebrow ?? defaultHeroContent.nepaliEyebrow;
  const headlineLine1 =
    content?.headlineLine1 ??
    (content?.headlineLines ? content.headlineLines[0] : defaultHeroContent.headlineLines[0]);
  const headlineLine2 =
    content?.headlineLine2 ??
    (content?.headlineLines ? content.headlineLines[1] : defaultHeroContent.headlineLines[1]);
  const lead = content?.lead ?? (content?.description || defaultHeroContent.lead);
  const primaryCtaLabel =
    content?.primaryCtaLabel ??
    (content?.primaryCta ? content.primaryCta.label : defaultHeroContent.primaryCta.label);
  const primaryCtaHref =
    content?.primaryCtaHref ??
    (content?.primaryCta ? content.primaryCta.href : defaultHeroContent.primaryCta.href);
  const secondaryCtaLabel =
    content?.secondaryCtaLabel ??
    (content?.secondaryCta ? content.secondaryCta.label : defaultHeroContent.secondaryCta.label);
  const secondaryCtaHref =
    content?.secondaryCtaHref ??
    (content?.secondaryCta ? content.secondaryCta.href : defaultHeroContent.secondaryCta.href);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % orbitalPracticePool.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const total = orbitalPracticePool.length;
  const visibleCards: OrbitalPracticeCard[] = [
    orbitalPracticePool[startIndex % total],
    orbitalPracticePool[(startIndex + 1) % total],
    orbitalPracticePool[(startIndex + 2) % total],
    orbitalPracticePool[(startIndex + 3) % total],
    orbitalPracticePool[(startIndex + 4) % total],
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-line bg-[#F3F5F2] py-16 sm:py-20 lg:py-24"
    >
      {/* Background Graphic / Subtle Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(#1B633E 0.6px, transparent 0.6px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Large Subtle Devanagari "न्याय" Watermark at Top Right */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-4 right-6 sm:right-12 lg:right-20 z-0 font-devanagari text-7xl sm:text-8xl lg:text-[7.5rem] font-semibold tracking-tight text-accent/10 leading-none"
      >
        {nepaliEyebrow}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Eyebrow, Two-Line Display Headline, Rule, Lead, and Dual Buttons */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-accent/40" />
            </div>

            <h1
              id="hero-heading"
              className="mt-6 font-serif text-5xl sm:text-6xl xl:text-[4.35rem] leading-[1.06] tracking-tight"
            >
              <span className="block font-semibold text-ink">
                {headlineLine1}
              </span>
              <span className="mt-1 block italic font-normal text-accent">
                {headlineLine2}
              </span>
            </h1>

            <div aria-hidden="true" className="mt-7 h-[2px] w-14 bg-accent" />

            <p className="mt-6 max-w-lg text-[15px] sm:text-base leading-[1.75] text-muted">
              {lead}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={primaryCtaHref}
                className="group inline-flex items-center gap-3 rounded-[3px] bg-accent px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-surface shadow-xs transition-colors hover:bg-accent-dark"
              >
                <span>{primaryCtaLabel}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>

              <Link
                href={secondaryCtaHref}
                className="group inline-flex items-center gap-3 rounded-[3px] border border-accent/35 bg-surface/60 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-accent backdrop-blur-xs transition-colors hover:border-accent hover:bg-surface"
              >
                <span>{secondaryCtaLabel}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: True Circular Practice Areas Hub with Auto-Rotating & Floating Cards */}
          <div
            className="lg:col-span-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Desktop Circular Orbital Layout */}
            <div className="relative mx-auto hidden sm:block aspect-square w-full max-w-[490px] xl:max-w-[520px]">
              {/* Outer True Circle Ring (Solid) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[78%] w-[78%] rounded-full border border-accent/18"
              />

              {/* Inner True Circle Ring (Dashed) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[64%] w-[64%] rounded-full border border-dashed border-accent/30"
              />

              {/* Subtle Halo Ring Around Center Hub */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[39%] w-[39%] rounded-full bg-accent/10"
              />

              {/* Center Dark-Green Circle Hub */}
              <Link
                href="#practice-areas"
                className="group absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex h-[36%] w-[36%] flex-col items-center justify-center rounded-full bg-accent text-center text-surface shadow-[0_14px_34px_rgba(27,99,62,0.28)] transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="text-[9.5px] font-medium uppercase tracking-[0.26em] text-surface/85">
                  {firmProfile.shortName}
                </span>
                <span className="mt-1.5 font-serif text-2xl xl:text-[1.7rem] italic leading-[1.15]">
                  Practice
                  <br />
                  Areas
                </span>
              </Link>

              {/* 5 Floating & Auto-Cycling Practice Cards */}
              {orbitalSlots.map((slot, idx) => {
                const card = visibleCards[idx];
                return (
                  <div
                    key={`slot-${idx}`}
                    className={`absolute z-20 ${slot.positionClass}`}
                  >
                    <div
                      className="animate-hero-float"
                      style={{
                        animationDelay: slot.floatDelay,
                        animationDuration: slot.floatDuration,
                      }}
                    >
                      <Link
                        href={`#pa-${card.slug}`}
                        className="group flex min-h-[96px] w-[184px] xl:w-[196px] flex-col justify-center rounded-[10px] border border-line/50 bg-surface px-5 py-4 shadow-[0_10px_28px_rgba(25,25,25,0.08)] transition-colors duration-200 hover:border-accent/45 hover:shadow-[0_14px_34px_rgba(27,99,62,0.14)]"
                      >
                        <span className="block font-sans text-[11px] font-semibold tracking-[0.16em] text-accent">
                          {card.number}
                        </span>
                        <span className="mt-1.5 block font-serif text-[18px] xl:text-[19px] font-semibold italic leading-[1.22] text-ink group-hover:text-accent transition-colors">
                          {card.shortLabel}
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small Mobile View (below sm) */}
            <div className="sm:hidden">
              <div className="mb-4 flex items-center justify-between rounded-lg bg-accent px-5 py-4 text-surface">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-surface/80">
                    {firmProfile.shortName}
                  </span>
                  <span className="font-serif text-2xl italic">
                    Practice Areas
                  </span>
                </div>
                <Link
                  href="#practice-areas"
                  className="text-xs uppercase tracking-[0.15em] underline underline-offset-4"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {visibleCards.map((item, idx) => (
                  <Link
                    key={`mobile-slot-${idx}`}
                    href={`#pa-${item.slug}`}
                    className="animate-hero-float group rounded-[10px] border border-line/70 bg-surface px-4 py-3.5 shadow-sm transition-colors duration-200 hover:border-accent"
                    style={{ animationDelay: `${idx * 0.4}s` }}
                  >
                    <span className="block text-[10px] font-semibold tracking-[0.15em] text-accent">
                      {item.number}
                    </span>
                    <span className="mt-1 block font-serif text-lg font-semibold italic text-ink group-hover:text-accent">
                      {item.shortLabel}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
