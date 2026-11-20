'use client';

import React from 'react';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { SectionRenderer } from '@/components/website/sections/SectionRenderer';
import { EyeOff, AlertTriangle, ArrowLeft } from 'lucide-react';

interface DynamicPageProps {
  slug?: string;
  pageId?: string;
}

export const DynamicPageRenderer: React.FC<DynamicPageProps> = ({ slug, pageId }) => {
  const { pages, settings, isEffectivePageVisible, isEffectiveSectionVisible, isLoaded } = useCMS();

  // Find page by ID or slug
  const page = pageId
    ? pages.find((p) => p.id === pageId)
    : pages.find((p) => (slug === '' ? p.slug === '' || p.slug === '/' : p.slug === slug));

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-legal-800 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-legal-950 mb-3">Page Not Found</h1>
        <p className="text-gray-600 max-w-md mb-8">
          The requested page configuration does not exist in the CMS registry or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded bg-legal-800 text-white text-sm font-medium hover:bg-legal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    );
  }

  // Publication & Visibility rules check (Section 16 & 18)
  const isPubliclyVisible = isEffectivePageVisible(page);

  // If page is draft or hidden, show notice if admin or warning
  if (!isPubliclyVisible) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-stone-50">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-6">
          <EyeOff className="w-8 h-8" />
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-200 text-amber-900 mb-4">
          Status: {page.status} • Visibility: {page.isVisible ? 'Visible' : 'Hidden'}
        </span>
        <h1 className="text-3xl font-serif font-bold text-legal-950 mb-3">
          {page.title} (Unpublished / Hidden)
        </h1>
        <p className="text-gray-600 max-w-lg mb-8 leading-relaxed">
          This page is currently not visible to the public because either its publication status is &ldquo;{page.status}&rdquo;, its visibility switch is turned off, or the master website switch is disabled.
        </p>
        <div className="flex gap-4">
          <Link
            href={`/admin/pages/${page.id}`}
            className="px-6 py-2.5 rounded bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider hover:bg-legal-700 transition-colors"
          >
            Edit in CMS Admin
          </Link>
          <Link
            href="/"
            className="px-6 py-2.5 rounded border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider hover:bg-stone-100 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Filter and sort sections
  const visibleSections = page.sections
    .filter((sec) => isEffectiveSectionVisible(sec, page))
    .sort((a, b) => a.order - b.order);

  return (
    <div className="w-full">
      {visibleSections.length === 0 ? (
        <div className="py-24 text-center text-gray-500">
          <p className="font-serif text-xl">This page has no visible sections configured.</p>
          <p className="text-sm mt-2">Add sections in the CMS Section Builder to display content.</p>
        </div>
      ) : (
        visibleSections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))
      )}
    </div>
  );
};
