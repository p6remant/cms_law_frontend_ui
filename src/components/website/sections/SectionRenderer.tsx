'use client';

import React from 'react';
import { PageSection } from '@/types/cms';
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
import { AlertCircle } from 'lucide-react';

export const sectionRegistry: Record<string, React.ComponentType<{ content: any; settings?: any }>> = {
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
};

interface SectionRendererProps {
  section: PageSection;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  const Component = sectionRegistry[section.type];

  if (!Component) {
    // Graceful fallback for unknown section types as specified in 7.4
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
