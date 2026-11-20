'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { PartnersSectionContent, SectionSettings } from '@/types/cms';
import { Mail, Phone, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, Users } from 'lucide-react';

interface PartnersProps {
  content: PartnersSectionContent & {
    autoplay?: boolean;
    interval?: number;
    showArrows?: boolean;
    showDots?: boolean;
  };
  settings?: SectionSettings;
}

export const PartnersSection: React.FC<PartnersProps> = ({ content }) => {
  const items = content.items || [];
  const autoplayEnabled = content.autoplay !== undefined ? content.autoplay : true;
  const intervalTime = content.interval || 4500; // 4.5s
  const showArrows = content.showArrows !== undefined ? content.showArrows : true;
  const showDots = content.showDots !== undefined ? content.showDots : true;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive cards per view calculation
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet
      } else {
        setCardsPerView(3); // Desktop
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, items.length - cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(Math.min(idx, maxIndex));
  };

  // Autoplay
  useEffect(() => {
    if (!autoplayEnabled || isPaused || items.length <= cardsPerView) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplayEnabled, isPaused, intervalTime, nextSlide, items.length, cardsPerView]);

  if (items.length === 0) return null;

  // Total pages/dots calculation
  const totalDots = maxIndex + 1;

  return (
    <section
      aria-label="Senior Partners Directory Carousel"
      className="py-20 lg:py-28 bg-[#fbfbfa] border-b border-stone-200 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            {content.eyebrow && (
              <span className="text-xs font-semibold tracking-widest text-legal-700 uppercase font-sans mb-3 block">
                {content.eyebrow}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-legal-950 tracking-tight">
              {content.title || 'Senior Partners'}
            </h2>
            {content.description && (
              <p className="mt-3 text-gray-600 text-base sm:text-lg font-light leading-relaxed">
                {content.description}
              </p>
            )}
          </div>

          {/* Navigation Controls: Prev / Next Buttons & Autoplay status */}
          {showArrows && items.length > cardsPerView && (
            <div className="flex items-center gap-3 self-start md:self-end">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-stone-500 hover:text-stone-900 border border-stone-200 bg-white"
                title={isPaused ? 'Resume auto-sliding' : 'Pause auto-sliding'}
              >
                {isPaused ? <Play className="w-3 h-3 text-emerald-600" /> : <Pause className="w-3 h-3 text-amber-600" />}
                <span className="text-[11px] font-mono">{isPaused ? 'Paused' : 'Auto-sliding'}</span>
              </button>

              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous partner slide"
                className="w-11 h-11 rounded-full bg-white hover:bg-legal-800 hover:text-white text-stone-700 border border-stone-300 flex items-center justify-center transition-all shadow-xs hover:shadow-md focus:outline-none focus:ring-2 focus:ring-legal-700 active:scale-95 group"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next partner slide"
                className="w-11 h-11 rounded-full bg-white hover:bg-legal-800 hover:text-white text-stone-700 border border-stone-300 flex items-center justify-center transition-all shadow-xs hover:shadow-md focus:outline-none focus:ring-2 focus:ring-legal-700 active:scale-95 group"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Viewport & Sliding Track */}
        <div className="relative overflow-hidden py-2 -mx-4 px-4">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {items.map((partner) => (
              <div
                key={partner.id}
                className="shrink-0 px-3 sm:px-4"
                style={{
                  width: `${100 / cardsPerView}%`,
                }}
              >
                {/* Partner Card (exact card design preserved) */}
                <div className="bg-white rounded border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-legal-950/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <Link
                        href={`/partners/${partner.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-white font-medium bg-white/20 backdrop-blur-md px-3.5 py-2 rounded shadow-sm hover:bg-white/30 transition-colors"
                      >
                        <span>Full Biography</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-legal-950 group-hover:text-legal-800 transition-colors">
                        <Link href={`/partners/${partner.slug}`}>{partner.name}</Link>
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-legal-700 mt-1 mb-3">
                        {partner.role}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-6 font-light">
                        {partner.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-gray-600">
                      {partner.email && (
                        <a
                          href={`mailto:${partner.email}`}
                          className="flex items-center gap-2 hover:text-legal-800 transition-colors truncate"
                        >
                          <Mail className="w-3.5 h-3.5 text-legal-700 shrink-0" />
                          <span className="truncate">{partner.email}</span>
                        </a>
                      )}
                      {partner.phone && (
                        <a
                          href={`tel:${partner.phone}`}
                          className="flex items-center gap-2 hover:text-legal-800 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-legal-700 shrink-0" />
                          <span>{partner.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Section (Pagination indicator) */}
        {showDots && totalDots > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-200/80">
            <div className="text-xs font-mono text-stone-500">
              Showing partner <strong className="text-legal-950">{currentIndex + 1}</strong> to{' '}
              <strong className="text-legal-950">{Math.min(currentIndex + cardsPerView, items.length)}</strong> of{' '}
              <strong className="text-legal-950">{items.length}</strong> partners
            </div>

            {/* Clickable Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Partner carousel slide indicators">
              {Array.from({ length: totalDots }).map((_, dotIdx) => {
                const isActive = dotIdx === currentIndex;
                return (
                  <button
                    key={dotIdx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to partner slide ${dotIdx + 1}`}
                    onClick={() => goToSlide(dotIdx)}
                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-legal-700 ${
                      isActive
                        ? 'w-8 bg-legal-800'
                        : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                    }`}
                  />
                );
              })}
            </div>

            <Link
              href="/partners"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-legal-700 hover:text-legal-950"
            >
              <span>View All Leadership</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
