'use client';

import React from 'react';
import { RichTextSectionContent, SectionSettings } from '@/types/cms';

interface RichTextProps {
  content: RichTextSectionContent;
  settings?: SectionSettings;
}

export const RichTextSection: React.FC<RichTextProps> = ({ content }) => {
  return (
    <section className="py-16 md:py-24 bg-white text-gray-900 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {content.title && (
          <div className="mb-10 text-center">
            {content.subtitle && (
              <p className="text-sm font-semibold tracking-wider uppercase text-legal-700 mb-2 font-sans">
                {content.subtitle}
              </p>
            )}
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-legal-950 tracking-tight">
              {content.title}
            </h2>
          </div>
        )}

        <div
          className="prose prose-lg prose-neutral max-w-none 
            prose-headings:font-serif prose-headings:text-legal-950 prose-headings:tracking-tight
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
            prose-blockquote:border-l-4 prose-blockquote:border-legal-700 prose-blockquote:bg-legal-50/50 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-legal-900
            prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-700
            prose-a:text-legal-700 prose-a:underline hover:prose-a:text-legal-900"
          dangerouslySetInnerHTML={{ __html: content.htmlContent || '<p>No content provided.</p>' }}
        />
      </div>
    </section>
  );
};
