'use client';

import React from 'react';
import Link from 'next/link';
import { PracticeAreasSectionContent, SectionSettings } from '@/types/cms';
import { Briefcase, Scale, ShieldCheck, Landmark, FileText, ArrowUpRight } from 'lucide-react';

interface PracticeProps {
  content: PracticeAreasSectionContent;
  settings?: SectionSettings;
}

const iconMap: Record<string, any> = {
  Briefcase,
  Scale,
  ShieldCheck,
  Landmark,
  FileText,
};

export const PracticeAreasSection: React.FC<PracticeProps> = ({ content }) => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
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
          <Link
            href="/practice"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-legal-700 hover:text-legal-900 group"
          >
            <span>View All Practices</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {content.items && content.items.map((item) => {
            const IconComp = (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : Scale;
            return (
              <div
                key={item.id}
                className="group relative p-8 rounded-lg border border-stone-200 hover:border-legal-700/60 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 bg-[#fafafa] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-legal-50 border border-legal-200 text-legal-800 flex items-center justify-center mb-6 group-hover:bg-legal-700 group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-legal-950 mb-3 group-hover:text-legal-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light text-base mb-6">
                    {item.shortDescription}
                  </p>
                </div>

                <Link
                  href={`/practice/${item.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-legal-700 group-hover:text-legal-900 pt-4 border-t border-stone-200/80"
                >
                  <span>Practice Overview & Key Matters</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
