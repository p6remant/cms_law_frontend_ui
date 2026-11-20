'use client';

import React from 'react';
import { StatisticsSectionContent, SectionSettings } from '@/types/cms';

interface StatsProps {
  content: StatisticsSectionContent;
  settings?: SectionSettings;
}

export const StatisticsSection: React.FC<StatsProps> = ({ content, settings }) => {
  const isDark = settings?.backgroundColor?.includes('#1b3a2f') || settings?.backgroundColor?.includes('black');

  return (
    <section className={`py-16 lg:py-24 border-b ${isDark ? 'bg-legal-900 text-white border-legal-800' : 'bg-stone-100 text-gray-900 border-stone-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(content.title || content.eyebrow) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {content.eyebrow && (
              <p className="text-xs font-semibold tracking-widest uppercase text-gold-500 mb-2 font-sans">
                {content.eyebrow}
              </p>
            )}
            {content.title && (
              <h2 className={`text-3xl font-serif font-bold ${isDark ? 'text-white' : 'text-legal-950'}`}>
                {content.title}
              </h2>
            )}
            {content.description && (
              <p className={`mt-3 text-base ${isDark ? 'text-legal-200' : 'text-gray-600'}`}>
                {content.description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.items && content.items.map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-lg bg-black/10 backdrop-blur-sm border border-white/5">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gold-500 tracking-tight">
                {stat.value}
              </p>
              <p className={`mt-2 font-medium text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.label}
              </p>
              {stat.sublabel && (
                <p className={`text-xs mt-1 ${isDark ? 'text-legal-300' : 'text-gray-500'}`}>
                  {stat.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
