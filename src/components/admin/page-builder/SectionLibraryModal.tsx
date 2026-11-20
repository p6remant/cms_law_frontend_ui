'use client';

import React, { useState } from 'react';
import { SectionType } from '@/types/cms';
import { X, Sparkles, Layout } from 'lucide-react';

export interface SectionLibraryItem {
  type: SectionType;
  title: string;
  description: string;
  category: 'default1' | 'default2' | 'universal';
}

export const SECTION_LIBRARY_OPTIONS: SectionLibraryItem[] = [
  // Template 2 Specific Sections
  {
    type: 't2-hero',
    title: 'Orbital Practice Area Hero',
    description: 'Bilingual display headline, editorial wash, and auto-rotating 5-card orbital practice areas hub.',
    category: 'default2',
  },
  {
    type: 't2-highlights',
    title: 'Principal Areas & Statute Citations',
    description: 'Compact editorial list with legislation references (e.g. Labour Act, FITTA).',
    category: 'default2',
  },
  {
    type: 't2-ticker',
    title: 'Practice Marquee Ticker',
    description: 'Continuous horizontal scrolling text strip displaying codified practice disciplines.',
    category: 'default2',
  },
  {
    type: 't2-statistics',
    title: 'Firm Statistics & Key Metrics',
    description: 'Four-column metric cards showing year founded (2055 B.S.), practice years, and counsel count.',
    category: 'default2',
  },
  {
    type: 't2-overview',
    title: 'Institutional Milestones Timeline',
    description: 'Editorial firm history narrative paired with chronological vertical milestones (2055-2080 B.S.).',
    category: 'default2',
  },
  {
    type: 't2-practice-areas',
    title: '13 Codified Practice Drawers',
    description: 'Complete thirteen legal disciplines with Devanagari titles, statutory references, and expandable scope drawers.',
    category: 'default2',
  },
  {
    type: 't2-foreword',
    title: "Founder's Foreword & Address",
    description: 'Pull-quote message and founder credentials with portrait card on the left.',
    category: 'default2',
  },
  {
    type: 't2-partners',
    title: 'Partners & Senior Counsel Dossiers',
    description: 'Editorial profile dossiers with bar council credentials, working languages, and direct desk contact.',
    category: 'default2',
  },
  {
    type: 't2-faq',
    title: 'Categorized Statutory FAQs',
    description: 'Subject-filtered questions (Divorce, Land, Cheque Dishonour) with exact Civil Code statutory citations.',
    category: 'default2',
  },
  {
    type: 't2-judgments',
    title: 'Supreme Court Reported Judgments',
    description: 'Index of reported decisions from the Nepal Kanoon Patrika (NKP) with neutral case summaries.',
    category: 'default2',
  },
  {
    type: 't2-contact',
    title: 'Kathmandu Chambers Directory & Inquiries',
    description: 'Putalisadak/Ramshah Path chambers address, hours, direct email lines, and consultation buttons.',
    category: 'default2',
  },

  // Template 1 & Universal Sections
  { type: 'hero', title: 'Classic Hero Section', description: 'Institutional heading, description, imagery and CTAs', category: 'default1' },
  { type: 'slider', title: 'Slider / Carousel', description: 'Automatic sliding case carousel with next/prev arrows and dots', category: 'default1' },
  { type: 'richText', title: 'Rich Text / Legal Brief', description: 'Formatted legal prose, jurisprudence, quotes & citations', category: 'universal' },
  { type: 'introduction', title: 'Classic Introduction', description: 'Firm creed, partner address with portrait and signature', category: 'default1' },
  { type: 'practiceAreas', title: 'Classic Practice Grid', description: 'Legal practice cards with links and descriptions in a 3-column grid', category: 'default1' },
  { type: 'partners', title: 'Senior Partners Carousel', description: 'Team and senior partner profile credentials with auto-sliding cards', category: 'default1' },
  { type: 'testimonials', title: 'Client Accolades', description: 'Approved executive and general counsel commendations', category: 'default1' },
  { type: 'faq', title: 'Classic FAQ Accordion', description: 'Collapsible questions regarding conflict checks and fees', category: 'default1' },
  { type: 'cta', title: 'Call to Action Banner', description: 'Promotional confidential inquiry or phone banner', category: 'universal' },
  { type: 'contact', title: 'Classic Contact & Registry', description: 'Office address, direct lines and consultation form', category: 'default1' },
  { type: 'latestArticles', title: 'Latest Publications', description: 'Recent legal analysis feed and articles', category: 'universal' },
  { type: 'gallery', title: 'Image Collection Grid', description: 'Library, courtroom, or conference photographic grid', category: 'universal' },
  { type: 'statistics', title: 'Classic Statistics Grid', description: 'Substantiated figures, affirmance rates, transaction totals', category: 'default1' },
];

interface SectionLibraryModalProps {
  isOpen: boolean;
  onSelect: (type: SectionType) => void;
  onClose: () => void;
  currentTemplate?: string;
}

export const SectionLibraryModal: React.FC<SectionLibraryModalProps> = ({
  isOpen,
  onSelect,
  onClose,
  currentTemplate = 'default2',
}) => {
  const [activeTab, setActiveTab] = useState<'default2' | 'default1' | 'all'>(
    currentTemplate === 'default1' ? 'default1' : 'default2'
  );

  if (!isOpen) return null;

  const filteredOptions = SECTION_LIBRARY_OPTIONS.filter((opt) => {
    if (activeTab === 'all') return true;
    return opt.category === activeTab || opt.category === 'universal';
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-stone-200 flex flex-col max-h-[88vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-legal-700" />
              <span>Add Section From Library</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Choose a section block matching your page&apos;s UI template.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Category Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-100/70 px-5 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('default2')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'default2'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Template 2 Sections (Editorial)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('default1')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'default1'
                ? 'bg-white text-legal-800 border-t-2 border-legal-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layout className="w-3.5 h-3.5 text-legal-800" />
            <span>Template 1 Sections (Classic)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-stone-900 border-t-2 border-stone-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>All Available Sections</span>
          </button>
        </div>

        {/* Options Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid sm:grid-cols-2 gap-3.5">
          {filteredOptions.map((opt) => (
            <div
              key={opt.type}
              onClick={() => onSelect(opt.type)}
              className="p-4 rounded-xl border border-stone-200 hover:border-legal-700 hover:bg-stone-50/80 cursor-pointer transition-all flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-sm font-semibold text-stone-900 group-hover:text-legal-800">
                    {opt.title}
                  </h4>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                    {opt.category === 'default2' ? 'Template 2' : opt.category === 'default1' ? 'Template 1' : 'Universal'}
                  </span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {opt.description}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-legal-700 group-hover:text-emerald-700 uppercase mt-3 block">
                + Add to Page
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
