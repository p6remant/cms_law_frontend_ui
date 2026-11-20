'use client';

import React from 'react';
import { IntroductionSectionContent, SectionSettings } from '@/types/cms';
import { CheckCircle2 } from 'lucide-react';

interface IntroProps {
  content: IntroductionSectionContent;
  settings?: SectionSettings;
}

export const IntroductionSection: React.FC<IntroProps> = ({ content }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#fbfbfa] text-gray-900 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            {content.eyebrow && (
              <span className="text-xs font-semibold tracking-widest text-legal-700 uppercase font-sans mb-3 block">
                {content.eyebrow}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-legal-950 leading-tight mb-8">
              {content.title}
            </h2>

            <div className="space-y-5 text-gray-700 text-lg leading-relaxed font-light">
              {content.paragraphs && content.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {content.highlights && content.highlights.length > 0 && (
              <div className="mt-8 space-y-3 pt-6 border-t border-stone-200">
                {content.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-legal-700 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {(content.signatureName || content.signatureRole) && (
              <div className="mt-10 pt-6 border-t border-stone-200 flex items-center gap-4">
                <div className="w-12 h-0.5 bg-gold-500" />
                <div>
                  {content.signatureName && (
                    <p className="font-serif font-bold text-lg text-legal-950">{content.signatureName}</p>
                  )}
                  {content.signatureRole && (
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">{content.signatureRole}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {content.imageUrl && (
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="relative rounded border border-stone-300 shadow-xl overflow-hidden aspect-[4/5] bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.imageUrl}
                    alt={content.imageCaption || content.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {content.imageCaption && (
                  <p className="mt-3 text-xs text-gray-500 text-center font-sans tracking-wide">
                    {content.imageCaption}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
