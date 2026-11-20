'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { SliderSectionContent, SectionSettings } from '@/types/cms';
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play, Shield } from 'lucide-react';

interface SliderSectionProps {
  content: SliderSectionContent;
  settings?: SectionSettings;
}

const DEFAULT_SLIDES = [
  {
    id: 'slide-1',
    title: 'Counsel of Distinction. Unyielding Defense.',
    subtitle: 'Strategic Corporate & Appellate Advocacy',
    description: 'Vanguard & Sterling LLP delivers resolute strategic counsel to multinational corporations and executive boards confronting defining legal battles.',
    desktopImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=80',
    ctaLabel: 'Explore Practice Areas',
    ctaUrl: '/practice',
    overlayOpacity: 0.7,
  },
  {
    id: 'slide-2',
    title: 'Decisive Advocates in Federal Jurisprudence',
    subtitle: 'Supreme Court & Federal Circuit Practice',
    description: 'Our trial and appellate partners have secured landmark precedents across federal circuits, protecting tens of billions in enterprise value.',
    desktopImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    ctaLabel: 'Meet Our Partners',
    ctaUrl: '/partners',
    overlayOpacity: 0.7,
  },
  {
    id: 'slide-3',
    title: 'Navigating Cross-Border Regulatory Clearance',
    subtitle: 'Multinational M&A & Antitrust Advisory',
    description: 'Guiding corporate boards and sovereign institutions through multi-jurisdictional clearances before the FTC, DOJ, European Commission, and CMA.',
    desktopImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    ctaLabel: 'Read Recent Insights',
    ctaUrl: '/blog',
    overlayOpacity: 0.7,
  },
  {
    id: 'slide-4',
    title: 'Preserving Family Legacies Across Generations',
    subtitle: 'Private Wealth & Dynasty Trust Advisory',
    description: 'Structuring multi-generational trust architecture, family offices, and cross-border asset protection for sovereign families and high-net-worth estates.',
    desktopImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1920&q=80',
    ctaLabel: 'Confidential Consultation',
    ctaUrl: '/contact',
    overlayOpacity: 0.7,
  },
];

export const SliderSection: React.FC<SliderSectionProps> = ({ content, settings }) => {
  const slides = content.slides && content.slides.length > 0 ? content.slides : DEFAULT_SLIDES;
  const autoplayEnabled = content.autoplay !== undefined ? content.autoplay : true;
  const intervalTime = content.interval || 5000; // 5 seconds default
  const showArrows = content.showArrows !== undefined ? content.showArrows : true;
  const showDots = content.showDots !== undefined ? content.showDots : true;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Autoplay effect
  useEffect(() => {
    if (!autoplayEnabled || isPaused || slides.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplayEnabled, isPaused, intervalTime, nextSlide, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!slides || slides.length === 0) return null;

  return (
    <section
      aria-label="Institutional Carousel Showcase"
      className="relative w-full overflow-hidden bg-legal-950 text-white select-none border-b border-legal-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header Eyebrow / Title if configured */}
      {(content.title || content.eyebrow) && (
        <div className="pt-12 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          {content.eyebrow && (
            <span className="text-xs font-semibold tracking-widest text-gold-500 uppercase font-sans mb-2 block">
              {content.eyebrow}
            </span>
          )}
          {content.title && (
            <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
              {content.title}
            </h2>
          )}
          {content.description && (
            <p className="mt-2 text-sm text-legal-300 max-w-2xl mx-auto font-light">
              {content.description}
            </p>
          )}
        </div>
      )}

      {/* Main Slides Viewport */}
      <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[640px] flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const overlayOpacity = slide.overlayOpacity !== undefined ? slide.overlayOpacity : 0.7;

          return (
            <div
              key={slide.id || index}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Background Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.desktopImage}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
              />

              {/* Sophisticated Dark Legal Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-legal-950/95 via-legal-950/80 to-legal-900/40"
                style={{ opacity: overlayOpacity }}
              />

              {/* Slide Content Box */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl py-16">
                  {slide.subtitle && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-legal-800/90 border border-gold-500/40 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <Shield className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{slide.subtitle}</span>
                    </div>
                  )}

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-5 drop-shadow-md">
                    {slide.title}
                  </h3>

                  {slide.description && (
                    <p className="text-legal-100 text-base sm:text-lg leading-relaxed mb-8 font-light max-w-xl drop-shadow-sm">
                      {slide.description}
                    </p>
                  )}

                  {slide.ctaLabel && (
                    <div className="flex items-center gap-4">
                      <Link
                        href={slide.ctaUrl || '/contact'}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded bg-gold-500 hover:bg-gold-600 text-legal-950 font-semibold text-xs uppercase tracking-wider transition-all shadow-xl shadow-black/40 group"
                      >
                        <span>{slide.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Previous Button Control */}
        {showArrows && (
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-legal-900/80 hover:bg-gold-500 hover:text-legal-950 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-500 hover:scale-105 group"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>
        )}

        {/* Next Button Control */}
        {showArrows && (
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-legal-900/80 hover:bg-gold-500 hover:text-legal-950 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-500 hover:scale-105 group"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Bottom Bar: Dots Section & Autoplay Status */}
      <div className="relative z-30 bg-legal-950/90 border-t border-legal-800/80 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Autoplay status / slide counter */}
          <div className="flex items-center gap-3 text-xs text-legal-300 font-mono">
            <span className="font-semibold text-gold-400">
              0{currentIndex + 1}
            </span>
            <span className="text-legal-600">/</span>
            <span>0{slides.length}</span>
            <span className="hidden md:inline text-legal-500">|</span>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-legal-400 hover:text-white transition-colors"
              title={isPaused ? 'Resume auto-sliding' : 'Pause auto-sliding'}
            >
              {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-gold-400" />}
              <span>{isPaused ? 'Paused' : 'Auto-sliding active'}</span>
            </button>
          </div>

          {/* Dots Indicator Section */}
          {showDots && (
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Slide indicators">
              {slides.map((_, dotIdx) => {
                const isActive = dotIdx === currentIndex;
                return (
                  <button
                    key={dotIdx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    onClick={() => goToSlide(dotIdx)}
                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                      isActive
                        ? 'w-8 bg-gold-500 shadow-sm shadow-gold-500/50'
                        : 'w-2.5 bg-legal-700 hover:bg-legal-500'
                    }`}
                  />
                );
              })}
            </div>
          )}

          {/* Quick jump description */}
          <div className="hidden sm:block text-[11px] text-legal-400 font-light truncate max-w-xs text-right">
            Slide: <span className="text-white font-serif">{slides[currentIndex]?.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
