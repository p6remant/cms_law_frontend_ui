'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cmsStore';
import { ImageUploadField } from '@/components/admin/common/ImageUploadField';
import { Search, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SEOManagementPage() {
  const { pages, blogArticles, settings, saveSettings } = useCMS();

  const [defaultTitle, setDefaultTitle] = useState(settings.name + ' | Premier Corporate & Appellate Counsel');
  const [defaultDesc, setDefaultDesc] = useState(settings.description);
  const [defaultOgImage, setDefaultOgImage] = useState('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80');
  const [canonicalBase, setCanonicalBase] = useState('https://vanguardsterling.com');
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveDefaults = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings({
      ...settings,
      description: defaultDesc,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // SEO Health checks
  const pagesWithSeo = pages.filter((p) => p.seo?.title && p.seo?.description);
  const articlesWithSeo = blogArticles.filter((a) => a.seo?.title && a.seo?.description);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">SEO & Metadata Management</h1>
          <p className="text-xs text-stone-500 mt-1">
            Global search engine defaults, Open Graph social cards, and publication crawl rules
          </p>
        </div>

        {savedSuccess && (
          <span className="px-3 py-1.5 rounded bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>SEO Defaults Saved</span>
          </span>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Global SEO Defaults (Section 11) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Global Default SEO Metadata
          </h2>

          <form onSubmit={handleSaveDefaults} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Default Site Title Tag
              </label>
              <input
                type="text"
                value={defaultTitle}
                onChange={(e) => setDefaultTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-legal-700"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                Length: {defaultTitle.length} / 60 characters
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={defaultDesc}
                onChange={(e) => setDefaultDesc(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-legal-700"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                Length: {defaultDesc.length} / 160 characters
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Canonical Base URL
              </label>
              <input
                type="text"
                value={canonicalBase}
                onChange={(e) => setCanonicalBase(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-stone-300 text-xs font-mono"
              />
            </div>

            <div className="pt-2">
              <ImageUploadField
                label="Global Default Social Share Card (og:image)"
                value={defaultOgImage}
                onChange={(url) => setDefaultOgImage(url)}
                aspectRatio="wide"
                recommendedSize="1200 x 630px (1.91:1 ratio)"
                description="Default visual social share card used when pages or links without a page-specific image are shared on LinkedIn, Twitter/X, Facebook, or messaging clients."
              />
            </div>

            {/* Robots controls */}
            <div className="pt-4 border-t border-stone-100 flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs font-medium text-stone-700">
                <input
                  type="checkbox"
                  checked={robotsIndex}
                  onChange={(e) => setRobotsIndex(e.target.checked)}
                  className="rounded text-legal-700"
                />
                <span>Allow Robots Indexing</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-stone-700">
                <input
                  type="checkbox"
                  checked={robotsFollow}
                  onChange={(e) => setRobotsFollow(e.target.checked)}
                  className="rounded text-legal-700"
                />
                <span>Follow Internal Hyperlinks</span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider shadow-xs"
              >
                Save SEO Defaults
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Search Preview & Health (Section 11) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
              Search Result Snippet Preview
            </h3>

            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
              <div className="text-blue-800 font-medium text-base hover:underline cursor-pointer truncate">
                {defaultTitle}
              </div>
              <div className="text-emerald-800 text-xs truncate mt-0.5 font-sans">
                {canonicalBase}
              </div>
              <p className="text-stone-600 text-xs mt-1 leading-relaxed line-clamp-3">
                {defaultDesc}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
              Editorial SEO Health Overview
            </h3>

            <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-100">
              <span className="text-stone-600">Pages with Complete SEO</span>
              <span className="font-bold text-stone-900">{pagesWithSeo.length} / {pages.length}</span>
            </div>

            <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-100">
              <span className="text-stone-600">Articles with Complete SEO</span>
              <span className="font-bold text-stone-900">{articlesWithSeo.length} / {blogArticles.length}</span>
            </div>

            <div className="pt-2 text-[11px] text-stone-500 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-legal-700 shrink-0 mt-0.5" />
              <span>
                Draft and unpublished pages are automatically excluded from public robot crawls via Next.js metadata resolvers.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
