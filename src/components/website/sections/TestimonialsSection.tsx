'use client';

import React from 'react';
import { TestimonialsSectionContent, SectionSettings } from '@/types/cms';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  content: TestimonialsSectionContent;
  settings?: SectionSettings;
}

export const TestimonialsSection: React.FC<TestimonialsProps> = ({ content }) => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {content.eyebrow && (
            <span className="text-xs font-semibold tracking-widest text-legal-700 uppercase font-sans mb-3 block">
              {content.eyebrow}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-legal-950 tracking-tight">
            {content.title}
          </h2>
          {content.description && (
            <p className="mt-4 text-gray-600 text-lg font-light leading-relaxed">
              {content.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {content.items && content.items.map((item) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 rounded-lg bg-[#fbfbfa] border border-stone-200 relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-gold-500/40 mb-6" />
              <blockquote className="text-gray-800 text-lg font-serif italic leading-relaxed mb-8">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="pt-6 border-t border-stone-200/80">
                <p className="font-serif font-bold text-base text-legal-950">
                  {item.clientName}
                </p>
                {(item.clientTitle || item.companyOrCase) && (
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                    {item.clientTitle}{item.clientTitle && item.companyOrCase ? ' • ' : ''}{item.companyOrCase}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
