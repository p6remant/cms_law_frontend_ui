'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { slugify } from '@/lib/utils';
import { Page, PageSection, NavigationItem } from '@/types/cms';
import {
  ArrowLeft,
  Layout,
  FileText,
  Briefcase,
  Users,
  HelpCircle,
  Mail,
  BookOpen,
  Sparkles,
  Compass,
  CheckCircle2,
  Scale,
  ScrollText,
} from 'lucide-react';

interface TemplateOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  defaultSections: Array<{ type: string; name: string; content: any; settings?: any }>;
}

const TEMPLATES_DEFAULT1: TemplateOption[] = [
  {
    id: 'Landing page',
    title: 'Classic Landing Page',
    description: 'High-conversion institutional hero, statistics, practice areas, partner highlights, and CTA.',
    icon: Layout,
    defaultSections: [
      {
        type: 'hero',
        name: 'Landing Hero',
        content: {
          headline: 'Counsel of Distinction & Advocacy',
          subheadline: 'Premier Practice',
          description: 'Delivering strategic clarity in corporate governance and appellate litigation.',
          primaryButtonLabel: 'Schedule Consultation',
          primaryButtonUrl: '/contact',
        },
      },
      {
        type: 'statistics',
        name: 'Key Metrics',
        content: {
          items: [
            { value: '48+', label: 'Years in Practice' },
            { value: '98%', label: 'Federal Affirmation' },
            { value: '$40B+', label: 'Transaction Value' },
          ],
        },
      },
      {
        type: 'cta',
        name: 'Action Callout',
        content: {
          title: 'Engage Our Managing Partners',
          description: 'Initial inquiries are held under strict confidential review.',
          primaryButtonLabel: 'Initiate Inquiry',
          primaryButtonUrl: '/contact',
        },
      },
    ],
  },
  {
    id: 'Standard content',
    title: 'Standard Editorial Content',
    description: 'Hero header followed by rich formatted text and firm information.',
    icon: FileText,
    defaultSections: [
      {
        type: 'hero',
        name: 'Editorial Header',
        content: {
          headline: 'Institutional Perspective',
          description: 'A detailed overview of firm standards and guiding philosophy.',
        },
      },
      {
        type: 'richText',
        name: 'Main Content Body',
        content: {
          title: 'Overview & Principles',
          htmlContent: '<p>Enter your editorial content, jurisprudence briefs, or statutory analysis here.</p>',
        },
      },
    ],
  },
  {
    id: 'Practice area listing',
    title: 'Practice Area Listing',
    description: 'Hero header with a grid of practice disciplines and links.',
    icon: Briefcase,
    defaultSections: [
      {
        type: 'hero',
        name: 'Practice Header',
        content: {
          headline: 'Mastery in Strategic Disciplines',
          description: 'Explore our corporate, appellate, and private wealth focus areas.',
        },
      },
      {
        type: 'practiceAreas',
        name: 'Practice Directory',
        content: {
          title: 'Specialized Practice Groups',
          items: [
            {
              id: 'pa-new-1',
              title: 'Corporate Governance & M&A',
              slug: 'corporate-governance',
              shortDescription: 'Boardroom counseling, tender offers, and cross-border transactions.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'Blank Page T1',
    title: 'Blank Classic Page',
    description: 'Start with a completely blank canvas and add sections freely.',
    icon: Layout,
    defaultSections: [],
  },
];

const TEMPLATES_DEFAULT2: TemplateOption[] = [
  {
    id: 't2-full-chambers',
    title: 'Complete Editorial Chambers Page',
    description: 'Full layout: Orbital practice wheel, mandates, ticker, statistics, milestones, 13 practice drawers, foreword, partners, and FAQs.',
    icon: Scale,
    defaultSections: [
      { type: 't2-hero', name: 'Orbital Practice Area Hero', content: {} },
      { type: 't2-highlights', name: 'Statutory Practice Highlights', content: {} },
      { type: 't2-ticker', name: 'Practice Marquee Ticker', content: {} },
      { type: 't2-statistics', name: 'Chambers Key Statistics', content: {} },
      { type: 't2-overview', name: 'The Firm & Milestones Timeline', content: {} },
      { type: 't2-practice-areas', name: '13 Codified Practice Drawers', content: {} },
      { type: 't2-foreword', name: "Founder's Foreword", content: {} },
      { type: 't2-partners', name: 'Partners & Senior Counsel', content: {} },
      { type: 't2-faq', name: 'Categorized Statutory FAQs', content: {} },
      { type: 't2-judgments', name: 'Supreme Court Reported Judgments', content: {} },
      { type: 't2-contact', name: 'Kathmandu Chambers Consultation', content: {} },
    ],
  },
  {
    id: 't2-practice-page',
    title: 'Practices & Supreme Court Case Law',
    description: 'Editorial hero, thirteen codified practice drawers, and reported Supreme Court judgments (NKP).',
    icon: ScrollText,
    defaultSections: [
      { type: 't2-hero', name: 'Orbital Practice Area Hero', content: {} },
      { type: 't2-practice-areas', name: '13 Codified Practice Drawers', content: {} },
      { type: 't2-judgments', name: 'Supreme Court Reported Judgments', content: {} },
      { type: 't2-contact', name: 'Kathmandu Chambers Consultation', content: {} },
    ],
  },
  {
    id: 't2-chambers-dossier',
    title: 'Chambers Dossier & Milestones',
    description: 'Firm history narrative, vertical chronology timeline (2055-2080 B.S.), founder address, and partner dossiers.',
    icon: Users,
    defaultSections: [
      { type: 't2-overview', name: 'The Firm & Milestones Timeline', content: {} },
      { type: 't2-foreword', name: "Founder's Foreword", content: {} },
      { type: 't2-partners', name: 'Partners & Senior Counsel', content: {} },
      { type: 't2-contact', name: 'Kathmandu Chambers Consultation', content: {} },
    ],
  },
  {
    id: 't2-blank',
    title: 'Blank Editorial Canvas',
    description: 'Empty page with Template 2 parchment aesthetic; add sections on demand.',
    icon: FileText,
    defaultSections: [],
  },
];

export default function CreatePageScreen() {
  const router = useRouter();
  const { savePage, menus, saveMenu, settings } = useCMS();

  const [templateFamily, setTemplateFamily] = useState<'default2' | 'default1'>(
    settings.activeTemplate === 'default1' ? 'default1' : 'default2'
  );
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    templateFamily === 'default2' ? 't2-full-chambers' : 'Landing page'
  );
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);
  const [addToNavigation, setAddToNavigation] = useState(false);

  const activePresets = templateFamily === 'default2' ? TEMPLATES_DEFAULT2 : TEMPLATES_DEFAULT1;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugCustomized) {
      setSlug(slugify(val));
    }
  };

  const handleTemplateFamilyChange = (family: 'default1' | 'default2') => {
    setTemplateFamily(family);
    setSelectedPresetId(family === 'default2' ? 't2-full-chambers' : 'Landing page');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalSlug = slug.trim() || slugify(title);
    const templateConfig = activePresets.find((t) => t.id === selectedPresetId) || activePresets[0];

    const initialSections: PageSection[] = templateConfig.defaultSections.map((s, idx) => ({
      id: `sec-${Date.now()}-${idx}`,
      type: s.type as any,
      name: s.name,
      order: idx + 1,
      isVisible: true,
      isReusable: false,
      content: s.content || {},
      settings: s.settings || { containerWidth: 'normal' },
    }));

    const newPage: Page = {
      id: `page-${Date.now()}`,
      title: title.trim(),
      slug: finalSlug,
      description: description.trim(),
      template: templateFamily,
      status: 'draft',
      isVisible: true,
      sections: initialSections,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seo: {
        title: `${title.trim()} | ${templateFamily === 'default2' ? 'Law Chambers & Legal Research' : 'Vanguard & Sterling LLP'}`,
        description: description.trim() || `${title.trim()}`,
        robotsIndex: true,
        robotsFollow: true,
      },
    };

    savePage(newPage);

    // If selected, automatically add to header navigation menu
    if (addToNavigation) {
      const mainMenu = menus.find((m) => m.id === 'nav-main') || menus[0];
      if (mainMenu) {
        const newNavItem: NavigationItem = {
          id: `nav-${Date.now()}`,
          label: title.trim(),
          type: 'page',
          url: `/${finalSlug}`,
          order: (mainMenu.items?.length || 0) + 1,
          isVisible: true,
          isButton: false,
          target: '_self',
        };
        saveMenu({
          ...mainMenu,
          items: [...(mainMenu.items || []), newNavItem],
        });
      }
    }

    router.push(`/admin/pages/${newPage.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <Link
          href="/admin/pages"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Pages</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Create New Website Page
        </h1>
        <p className="text-stone-600 text-sm mt-1">
          Select a template design family, configure the page slug, and assemble sections.
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-8">
        {/* Step 1: Select Template Family */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-legal-700 block">
              Step 1 of 3
            </span>
            <h2 className="text-base font-semibold text-stone-900 mt-0.5">
              Select Template Family
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Choose which design system this page will belong to. Multiple admins can build pages for either template independently.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div
              onClick={() => handleTemplateFamilyChange('default2')}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                templateFamily === 'default2'
                  ? 'border-emerald-600 bg-emerald-50/40 shadow-xs'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-800">
                    Template 2 (Editorial)
                  </span>
                  {templateFamily === 'default2' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Law Chambers Editorial UI
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Parchment tones, 13 codified practice drawers, rotating orbital wheel, and chronology timeline.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-semibold mt-3 block">
                Cormorant &amp; Devanagari Typography
              </span>
            </div>

            <div
              onClick={() => handleTemplateFamilyChange('default1')}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                templateFamily === 'default1'
                  ? 'border-legal-800 bg-legal-50/40 shadow-xs'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-legal-800">
                    Template 1 (Classic)
                  </span>
                  {templateFamily === 'default1' && (
                    <CheckCircle2 className="w-4 h-4 text-legal-800" />
                  )}
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Classic Corporate Law Firm UI
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Full-bleed hero slider, 6 practice cards grid, senior partner carousel, and gold accents.
                </p>
              </div>
              <span className="text-[11px] font-mono text-legal-700 font-semibold mt-3 block">
                Playfair Display &amp; Inter Typography
              </span>
            </div>
          </div>
        </div>

        {/* Step 2: Core Metadata card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-legal-700 block">
              Step 2 of 3
            </span>
            <h2 className="text-base font-semibold text-stone-900 mt-0.5">
              Page Details &amp; URL Slug
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Page Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={templateFamily === 'default2' ? "e.g. Statutory Practice Areas" : "e.g. Appellate Litigation Brief"}
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-stone-100 border border-r-0 border-stone-300 text-stone-500 text-xs rounded-l-lg font-mono">
                  /
                </span>
                <input
                  type="text"
                  required
                  placeholder="statutory-practice"
                  value={slug}
                  onChange={(e) => {
                    setIsSlugCustomized(true);
                    setSlug(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-r-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700 text-sm font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Internal Editorial Description
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Detailed practice areas and courtroom advocacy dossiers."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700 text-sm"
            />
          </div>

          {/* Navigation Integration Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 p-3.5 rounded-lg border border-stone-200 bg-stone-50/70 hover:bg-stone-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={addToNavigation}
                onChange={(e) => setAddToNavigation(e.target.checked)}
                className="mt-0.5 rounded text-legal-700 focus:ring-legal-700"
              />
              <div className="text-xs">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-legal-700" />
                  <span>Also add this page to Header Navigation Menu</span>
                </div>
                <p className="text-stone-500 mt-0.5 leading-relaxed">
                  Automatically appends a link for this page in the main website navigation bar.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Step 3: Starting Section Preset */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-legal-700 block">
              Step 3 of 3
            </span>
            <h2 className="text-base font-semibold text-stone-900 mt-0.5">
              Select Starting Section Preset ({templateFamily === 'default2' ? 'Template 2' : 'Template 1'})
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Choose initial sections to bootstrap this page. You can freely add, reorder, or edit sections in the Section Builder.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {activePresets.map((tpl) => {
              const Icon = tpl.icon;
              const isSelected = selectedPresetId === tpl.id;

              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedPresetId(tpl.id)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'border-legal-700 bg-legal-50/40 ring-2 ring-legal-700/20 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-legal-800 text-white'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-sm text-stone-900">
                        {tpl.title}
                      </h3>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-legal-700" />
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {tpl.description}
                    </p>
                    <span className="text-[10px] font-mono text-legal-600 font-semibold block mt-2">
                      {tpl.defaultSections.length} Initial Section{tpl.defaultSections.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <Link
            href="/admin/pages"
            className="text-stone-600 hover:text-stone-900 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={!title.trim()}
            className="px-6 py-3 rounded-lg bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider hover:bg-legal-700 transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Create Page &amp; Open Section Builder →
          </button>
        </div>
      </form>
    </div>
  );
}
