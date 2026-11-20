'use client';

import React from 'react';
import Link from 'next/link';
import { CTASectionContent, SectionSettings } from '@/types/cms';
import { ShieldAlert, ArrowRight } from 'lucide-react';

interface CTAProps {
  content: CTASectionContent;
  settings?: SectionSettings;
}

export const CTASection: React.FC<CTAProps> = ({ content, settings }) => {
  const isDark = !settings?.backgroundColor || settings?.backgroundColor?.includes('#1b3a2f') || settings?.backgroundColor?.includes('black');

  return (
    <section className={`py-20 lg:py-28 relative overflow-hidden ${isDark ? 'bg-legal-900 text-white' : 'bg-legal-50 text-legal-950 border-t border-b border-legal-200'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-6">
          {content.title}
        </h2>
        <p className={`text-lg sm:text-xl font-light max-w-3xl mx-auto mb-10 leading-relaxed ${isDark ? 'text-legal-200' : 'text-gray-700'}`}>
          {content.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {content.primaryButtonLabel && (
            <Link
              href={content.primaryButtonUrl || '/contact'}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded bg-gold-500 hover:bg-gold-600 text-legal-950 font-semibold transition-all shadow-xl shadow-black/30 group"
            >
              <span>{content.primaryButtonLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}

          {content.secondaryButtonLabel && (
            <Link
              href={content.secondaryButtonUrl || 'tel:+12125550199'}
              className={`inline-flex items-center justify-center px-8 py-4 rounded font-medium border transition-all ${
                isDark
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-legal-800 text-legal-800 hover:bg-legal-100'
              }`}
            >
              {content.secondaryButtonLabel}
            </Link>
          )}
        </div>

        {content.confidentialityNote && (
          <div className={`flex items-center justify-center gap-2 text-xs max-w-2xl mx-auto ${isDark ? 'text-legal-400' : 'text-gray-500'}`}>
            <ShieldAlert className="w-4 h-4 shrink-0 text-gold-500" />
            <span>{content.confidentialityNote}</span>
          </div>
        )}
      </div>
    </section>
  );
};
