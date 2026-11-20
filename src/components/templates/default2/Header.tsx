"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { firmProfile, navigationItems } from "@/data/firmData";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sectionIds = [
      "the-firm",
      "practice-areas",
      "foreword",
      "partners",
      "questions",
    ];

    const handleScroll = () => {
      // Do not mark any nav item active when at the top / hero area
      if (window.scrollY < 400) {
        setActiveSection("");
        return;
      }

      const probeY = window.scrollY + 180;
      let currentActive = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (probeY >= top && probeY < bottom) {
          currentActive = `#${id}`;
          break;
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-xs border-b border-line/80 transition-colors">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Firm Emblem + Wordmark */}
          <Link
            href="#top"
            className="group flex items-center gap-3.5 focus-visible:outline-accent"
            aria-label={`${firmProfile.name} — Back to top`}
          >
            {/* Circular Scales of Justice Emblem */}
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-paper text-accent transition-colors group-hover:border-accent"
            >
              <svg
                viewBox="0 0 28 28"
                fill="none"
                className="h-6 w-6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="14"
                  cy="14"
                  r="12"
                  strokeOpacity="0.25"
                  strokeWidth="0.9"
                />
                <line x1="14" y1="6" x2="14" y2="21" />
                <line x1="10" y1="21" x2="18" y2="21" />
                <line x1="7.5" y1="10" x2="20.5" y2="10" />
                <path d="M7.5 10L5.5 15.5H9.5L7.5 10Z" />
                <path d="M20.5 10L18.5 15.5H22.5L20.5 10Z" />
              </svg>
            </span>

            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-[1.4rem] font-semibold leading-none tracking-tight text-ink">
                {firmProfile.shortName}
              </span>
              <span className="mt-1 text-[9.5px] font-medium uppercase tracking-[0.18em] text-muted">
                Law Firm &amp; Research Center
              </span>
              <span className="mt-0.5 font-devanagari text-[10px] tracking-wide text-muted/85">
                {firmProfile.nepaliName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary section navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8"
          >
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative py-1 text-[13.5px] font-normal transition-colors ${
                    isActive
                      ? "text-accent font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-accent"
                      : "text-ink/80 hover:text-accent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Contact Action */}
          <div className="hidden md:flex items-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-[3px] bg-accent px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-surface transition-colors hover:bg-accent-dark"
            >
              Contact the Firm
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="inline-flex md:hidden items-center justify-center border border-line px-3.5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-ink hover:border-accent transition-colors"
          >
            <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label="Mobile section navigation"
          className="md:hidden border-t border-line bg-surface px-6 py-6 sm:px-8"
        >
          <ul className="flex flex-col divide-y divide-line/70">
            {navigationItems.map((item, idx) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 text-base font-medium text-ink hover:text-accent transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-serif text-xs text-muted">
                    0{idx + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-muted">
              <p>
                {firmProfile.address.street}, {firmProfile.city}
              </p>
              <p className="mt-0.5">{firmProfile.phone}</p>
            </div>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-[3px] bg-accent px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-surface hover:bg-accent-dark transition-colors"
            >
              Contact the Firm →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
