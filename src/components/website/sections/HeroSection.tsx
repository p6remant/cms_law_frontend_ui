'use client';

import React from 'react';
import Link from 'next/link';
import { HeroSectionContent, SectionSettings } from '@/types/cms';
import { ShieldCheck, ArrowRight, Award } from 'lucide-react';

interface HeroProps {
  content: HeroSectionContent;
  settings?: SectionSettings;
}

export const HeroSection: React.FC<HeroProps> = ({ content, settings }) => {
  const isSplit = settings?.layout === 'split' || !settings?.layout || settings?.layout === 'default';

  return (
    <section className="relative overflow-hidden bg-legal-900 text-white py-20 lg:py-28 border-b border-legal-800">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-legal-800/40 via-legal-950 to-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-12 items-center ${isSplit && content.imageUrl ? 'lg:grid-cols-12' : 'max-w-4xl mx-auto text-center'}`}>
          <div className={isSplit && content.imageUrl ? 'lg:col-span-7' : ''}>
            {content.badgeText && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-legal-800/80 border border-gold-500/30 text-gold-500 text-xs font-medium tracking-wider uppercase mb-6 backdrop-blur-sm">
                <Award className="w-3.5 h-3.5" />
                <span>{content.badgeText}</span>
              </div>
            )}

            {content.subheadline && (
              <p className="text-gold-500 font-serif text-lg md:text-xl tracking-wide uppercase mb-3 font-medium">
                {content.subheadline}
              </p>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-6">
              {content.headline}
            </h1>

            {content.description && (
              <p className="text-legal-200 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-light">
                {content.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {content.primaryButtonLabel && (
                <Link
                  href={content.primaryButtonUrl || '/contact'}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-legal-600 hover:bg-legal-500 text-white font-medium transition-all shadow-lg shadow-legal-950/40 border border-legal-500/40 group"
                >
                  <span>{content.primaryButtonLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {content.secondaryButtonLabel && (
                <Link
                  href={content.secondaryButtonUrl || '/practice'}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded bg-white/5 hover:bg-white/10 text-white font-medium border border-white/20 transition-all backdrop-blur-sm"
                >
                  {content.secondaryButtonLabel}
                </Link>
              )}
            </div>

            {content.stats && content.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-legal-800/80">
                {content.stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-2xl sm:text-3xl font-serif font-bold text-gold-500 tracking-tight">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-legal-300 font-light mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {content.imageUrl && (
            <div className={`relative ${isSplit ? 'lg:col-span-5' : 'mt-8'}`}>
              <div className="relative rounded-lg overflow-hidden border border-gold-500/20 shadow-2xl shadow-black/80 aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.imageUrl}
                  alt={content.headline}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-legal-950/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-legal-950/80 backdrop-blur-md border border-white/10 text-xs text-legal-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Uncompromising partner oversight on every corporate & appellate matter</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
