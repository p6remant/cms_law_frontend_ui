'use client';

import React from 'react';
import { SectionType } from '@/types/cms';
import { X } from 'lucide-react';

export interface SectionLibraryItem {
  type: SectionType;
  title: string;
  description: string;
}

export const SECTION_LIBRARY_OPTIONS: SectionLibraryItem[] = [
  { type: 'hero', title: 'Hero Section', description: 'Institutional heading, description, imagery and CTAs' },
  { type: 'slider', title: 'Slider / Carousel', description: 'Automatic sliding case carousel with next/prev arrows and dots' },
  { type: 'richText', title: 'Rich Text', description: 'Formatted legal prose, jurisprudence, quotes & citations' },
  { type: 'introduction', title: 'Introduction', description: 'Firm creed, partner address with portrait and signature' },
  { type: 'practiceAreas', title: 'Practice Areas', description: 'Legal practice cards with links and descriptions' },
  { type: 'partners', title: 'Senior Partners Carousel', description: 'Team and senior partner profile credentials with auto-sliding cards' },
  { type: 'testimonials', title: 'Client Accolades', description: 'Approved executive and general counsel commendations' },
  { type: 'faq', title: 'FAQ Accordion', description: 'Collapsible questions regarding conflict checks and fees' },
  { type: 'cta', title: 'Call to Action', description: 'Promotional confidential inquiry or phone banner' },
  { type: 'contact', title: 'Contact & Registry', description: 'Office address, direct lines and consultation form' },
  { type: 'latestArticles', title: 'Latest Publications', description: 'Recent legal analysis feed and articles' },
  { type: 'gallery', title: 'Image Collection', description: 'Library, courtroom, or conference photographic grid' },
  { type: 'statistics', title: 'Firm Statistics', description: 'Substantiated figures, affirmance rates, transaction totals' },
];

interface SectionLibraryModalProps {
  isOpen: boolean;
  onSelect: (type: SectionType) => void;
  onClose: () => void;
}

export const SectionLibraryModal: React.FC<SectionLibraryModalProps> = ({
  isOpen,
  onSelect,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200 flex flex-col max-h-[85vh]">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Select Section Type From Library
            </h3>
            <p className="text-xs text-stone-500">
              Choose a predefined legal component to append to this page.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 grid sm:grid-cols-2 gap-3">
          {SECTION_LIBRARY_OPTIONS.map((opt) => (
            <div
              key={opt.type}
              onClick={() => onSelect(opt.type)}
              className="p-4 rounded-xl border border-stone-200 hover:border-legal-700/60 hover:bg-legal-50/30 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <h4 className="text-sm font-semibold text-stone-900 group-hover:text-legal-800">
                  {opt.title}
                </h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {opt.description}
                </p>
              </div>
              <span className="text-[10px] font-mono text-legal-700 uppercase mt-3 block font-bold">
                + Add to Page
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
