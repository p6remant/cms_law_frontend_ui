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
} from 'lucide-react';

interface TemplateOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  defaultSections: Array<{ type: string; name: string; content: any; settings?: any }>;
}

const TEMPLATES: TemplateOption[] = [
  {
    id: 'Landing page',
    title: 'Landing Page',
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
            {
              id: 'pa-new-2',
              title: 'Complex Appellate Litigation',
              slug: 'appellate-litigation',
              shortDescription: 'Appellate advocacy in state supreme and federal circuit courts.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'Partner listing',
    title: 'Partner Directory',
    description: 'Header with grid of senior partner biographies, credentials, and admissions.',
    icon: Users,
    defaultSections: [
      {
        type: 'hero',
        name: 'Partners Header',
        content: {
          headline: 'Partners of Distinction',
          description: 'Distinguished advocates with decades of federal and appellate trial experience.',
        },
      },
      {
        type: 'partners',
        name: 'Executive Partnership',
        content: {
          title: 'Senior Partners',
          items: [],
        },
      },
    ],
  },
  {
    id: 'Contact',
    title: 'Contact & Consultation',
    description: 'Office registry, direct communication lines, and confidential inquiry intake form.',
    icon: Mail,
    defaultSections: [
      {
        type: 'hero',
        name: 'Contact Header',
        content: {
          headline: 'Engage With Our Partners',
          description: 'Direct inquiries to our Manhattan headquarters.',
        },
      },
      {
        type: 'contact',
        name: 'Registry Details & Intake Form',
        content: {
          title: 'Confidential Matter Submission',
          address: 'One Rockefeller Plaza, 32nd Floor, New York, NY 10020',
          phone: '+1 (212) 555-0199',
          email: 'inquiries@vanguardsterling.com',
        },
      },
    ],
  },
  {
    id: 'FAQ',
    title: 'Frequently Asked Questions',
    description: 'Header with accordion Q&A explaining retention, billing, and conflict clearances.',
    icon: HelpCircle,
    defaultSections: [
      {
        type: 'hero',
        name: 'FAQ Header',
        content: {
          headline: 'Frequently Asked Questions',
          description: 'Guidance regarding retention criteria and conflict clearance protocols.',
        },
      },
      {
        type: 'faq',
        name: 'Engagement FAQs',
        content: {
          title: 'General Inquiries',
          items: [
            {
              id: 'q-new-1',
              question: 'How do I initiate a confidential conflict assessment?',
              answer: 'Complete our confidential online inquiry form or contact our Managing Partner’s registry directly.',
            },
          ],
        },
      },
    ],
  },
];

export default function CreatePageScreen() {
  const router = useRouter();
  const { savePage, menus, saveMenu } = useCMS();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Landing page');
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);
  const [addToNavigation, setAddToNavigation] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugCustomized) {
      setSlug(slugify(val));
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalSlug = slug.trim() || slugify(title);
    const templateConfig = TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];

    const initialSections: PageSection[] = templateConfig.defaultSections.map((s, idx) => ({
      id: `sec-${Date.now()}-${idx}`,
      type: s.type as any,
      name: s.name,
      order: idx + 1,
      isVisible: true,
      isReusable: false,
      content: s.content,
      settings: s.settings || { containerWidth: 'normal' },
    }));

    const newPage: Page = {
      id: `page-${Date.now()}`,
      title: title.trim(),
      slug: finalSlug,
      description: description.trim(),
      template: selectedTemplate,
      status: 'draft',
      isVisible: true,
      sections: initialSections,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seo: {
        title: `${title.trim()} | Vanguard & Sterling LLP`,
        description: description.trim() || `${title.trim()} - Vanguard & Sterling LLP`,
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link
          href="/admin/pages"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pages List</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-stone-900">Create New CMS Page</h1>
        <p className="text-xs text-stone-500 mt-1">
          Configure page metadata and select an initial structural layout template
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-8">
        {/* Core Metadata card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Page Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Page Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Appellate Litigation Brief"
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
                  placeholder="appellate-litigation"
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
              placeholder="e.g. Specialized appellate practice representing corporate clients in federal circuit and state supreme courts."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700 text-sm"
            />
          </div>

          {/* Navigation Integration Checkbox */}
          <div className="pt-4 border-t border-stone-100">
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
                  Automatically appends a link for this page in the main website navigation bar. You can reorder or nest it under dropdowns anytime in Navigation settings.
                </p>
                {addToNavigation && title.trim() && (
                  <div className="mt-2 text-[11px] font-mono text-legal-700 bg-legal-100/50 px-2 py-1 rounded inline-block">
                    ↳ Will link to: /{slug || slugify(title)} with label &quot;{title}&quot;
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Template Selector Card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-semibold text-stone-900">
              Select Starting Template
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Templates establish an initial section layout. You can freely add, modify, reorder, or remove sections in the Section Builder.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {TEMPLATES.map((tpl) => {
              const Icon = tpl.icon;
              const isSelected = selectedTemplate === tpl.id;

              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'border-legal-700 bg-legal-50/40 ring-2 ring-legal-700/20 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-legal-700 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900">{tpl.title}</h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">{tpl.description}</p>
                    <span className="text-[11px] font-mono text-legal-700 mt-2 block font-medium">
                      {tpl.defaultSections.length} starting sections
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/admin/pages"
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            Create Page & Open Section Builder
          </button>
        </div>
      </form>
    </div>
  );
}
