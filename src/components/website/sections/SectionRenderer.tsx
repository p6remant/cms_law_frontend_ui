'use client';

import React from 'react';
import { PageSection } from '@/types/cms';
// Template 1 & Universal Sections
import { HeroSection } from './HeroSection';
import { SliderSection } from './SliderSection';
import { RichTextSection } from './RichTextSection';
import { IntroductionSection } from './IntroductionSection';
import { PracticeAreasSection } from './PracticeAreasSection';
import { PartnersSection } from './PartnersSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';
import { CTASection } from './CTASection';
import { ContactSection } from './ContactSection';
import { LatestArticlesSection } from './LatestArticlesSection';
import { GallerySection } from './GallerySection';
import { StatisticsSection } from './StatisticsSection';

// Template 2 Specific Sections
import { HeroSection as T2HeroSection } from '@/components/templates/default2/HeroSection';
import { PracticeHighlights as T2PracticeHighlights } from '@/components/templates/default2/PracticeHighlights';
import { ScrollingPracticeStrip as T2ScrollingPracticeStrip } from '@/components/templates/default2/ScrollingPracticeStrip';
import { FirmStatisticsSection as T2FirmStatisticsSection } from '@/components/templates/default2/FirmStatisticsSection';
import { FirmOverviewSection as T2FirmOverviewSection } from '@/components/templates/default2/FirmOverviewSection';
import { PracticeAreasSection as T2PracticeAreasSection } from '@/components/templates/default2/PracticeAreasSection';
import { FounderForewordSection as T2FounderForewordSection } from '@/components/templates/default2/FounderForewordSection';
import { PartnersSection as T2PartnersSection } from '@/components/templates/default2/PartnersSection';
import { FaqSection as T2FaqSection } from '@/components/templates/default2/FaqSection';
import { SelectedJudgmentsSection as T2SelectedJudgmentsSection } from '@/components/templates/default2/SelectedJudgmentsSection';
import { ContactSection as T2ContactSection } from '@/components/templates/default2/ContactSection';

import { AlertCircle } from 'lucide-react';

export const sectionRegistry: Record<string, React.ComponentType<{ content: any; settings?: any }>> = {
  // Template 1 & Shared
  hero: HeroSection,
  slider: SliderSection,
  carousel: SliderSection,
  richText: RichTextSection,
  introduction: IntroductionSection,
  practiceAreas: PracticeAreasSection,
  partners: PartnersSection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
  cta: CTASection,
  contact: ContactSection,
  latestArticles: LatestArticlesSection,
  gallery: GallerySection,
  statistics: StatisticsSection,

  // Template 2 Sections
  't2-hero': T2HeroSection,
  't2-highlights': T2PracticeHighlights,
  't2-ticker': T2ScrollingPracticeStrip,
  't2-statistics': T2FirmStatisticsSection,
  't2-overview': T2FirmOverviewSection,
  't2-practice-areas': T2PracticeAreasSection,
  't2-foreword': T2FounderForewordSection,
  't2-partners': T2PartnersSection,
  't2-faq': T2FaqSection,
  't2-judgments': T2SelectedJudgmentsSection,
  't2-contact': T2ContactSection,
};

interface SectionRendererProps {
  section: PageSection;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  const Component = sectionRegistry[section.type];

  if (!Component) {
    return (
      <div className="py-8 bg-stone-100 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-3 text-stone-500 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <span>
            Notice: Unsupported or unrecognized section type <strong>&apos;{section.type}&apos;</strong> ({section.name}).
          </span>
        </div>
      </div>
    );
  }

  return <Component content={section.content} settings={section.settings} />;
};
