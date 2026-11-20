'use client';

import React from 'react';
import { useCMS } from '@/lib/cmsStore';
import { SectionRenderer } from '@/components/website/sections/SectionRenderer';
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { PracticeHighlights } from "./PracticeHighlights";
import { ScrollingPracticeStrip } from "./ScrollingPracticeStrip";
import { FirmStatisticsSection } from "./FirmStatisticsSection";
import { FirmOverviewSection } from "./FirmOverviewSection";
import { PracticeAreasSection } from "./PracticeAreasSection";
import { FounderForewordSection } from "./FounderForewordSection";
import { PartnersSection } from "./PartnersSection";
import { FaqSection } from "./FaqSection";
import { SelectedJudgmentsSection } from "./SelectedJudgmentsSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

export function Template2View() {
  const { pages, isEffectiveSectionVisible } = useCMS();

  // Find the configured Template 2 homepage in CMS
  const t2Page =
    pages.find((p) => p.id === 'page-home-t2') ||
    pages.find((p) => p.template === 'default2' && (p.slug === '' || p.slug === '/'));

  const visibleSections = t2Page?.sections
    ? t2Page.sections
        .filter((sec) => isEffectiveSectionVisible(sec, t2Page))
        .sort((a, b) => a.order - b.order)
    : [];

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent/15 selection:text-ink">
      <Header />
      <main id="main-content" className="flex-1">
        {visibleSections.length > 0 ? (
          visibleSections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))
        ) : (
          <>
            <HeroSection />
            <PracticeHighlights />
            <ScrollingPracticeStrip />
            <FirmStatisticsSection />
            <FirmOverviewSection />
            <PracticeAreasSection />
            <FounderForewordSection />
            <PartnersSection />
            <FaqSection />
            <SelectedJudgmentsSection />
            <ContactSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Template2View;
