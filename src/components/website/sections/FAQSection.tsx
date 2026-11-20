'use client';

import React, { useState } from 'react';
import { FAQSectionContent, SectionSettings } from '@/types/cms';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  content: FAQSectionContent;
  settings?: SectionSettings;
}

export const FAQSection: React.FC<FAQProps> = ({ content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#fbfbfa] border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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

        <div className="space-y-4">
          {content.items && content.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id || idx}
                className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-serif font-semibold text-lg text-legal-950 hover:text-legal-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-legal-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed font-light border-t border-stone-100">
                    <p className="mt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
