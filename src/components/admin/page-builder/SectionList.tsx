'use client';

import React from 'react';
import { PageSection } from '@/types/cms';
import { AdminBadge } from '@/components/admin/common/AdminBadge';
import {
  Plus,
  Layers,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Share2,
} from 'lucide-react';

interface SectionListProps {
  sections: PageSection[];
  selectedSectionId: string | null;
  previewSectionId: string | null;
  onSelectSection: (id: string) => void;
  onOpenLibrary: () => void;
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
  onToggleVisibility: (id: string) => void;
  onDuplicateSection: (id: string) => void;
  onRequestDeleteSection: (id: string) => void;
  onTogglePreview: (id: string) => void;
}

export const SectionList: React.FC<SectionListProps> = ({
  sections,
  selectedSectionId,
  previewSectionId,
  onSelectSection,
  onOpenLibrary,
  onMoveSection,
  onToggleVisibility,
  onDuplicateSection,
  onRequestDeleteSection,
  onTogglePreview,
}) => {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Ordered Page Sections ({sections.length})
          </span>
          <p className="text-[11px] text-stone-400">Order of rendering on public route</p>
        </div>

        <button
          type="button"
          onClick={onOpenLibrary}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Section</span>
        </button>
      </div>

      {/* Empty State */}
      {sections.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-xl border border-dashed border-stone-300">
          <Layers className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <p className="font-serif font-medium text-stone-700">No sections added yet</p>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            Add sections from the legal section library to build your page.
          </p>
          <button
            type="button"
            onClick={onOpenLibrary}
            className="px-4 py-2 rounded-lg bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider hover:bg-legal-700 transition-colors"
          >
            Choose From Library
          </button>
        </div>
      ) : (
        /* Section Cards */
        <div className="space-y-3">
          {sortedSections.map((section, idx) => {
            const isSelected = selectedSectionId === section.id;

            return (
              <div
                key={section.id}
                onClick={() => onSelectSection(section.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-legal-50/70 border-legal-700 ring-2 ring-legal-700/20 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-stone-100 text-stone-600 font-mono text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-stone-900 text-xs">
                      {section.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {section.isReusable && (
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-medium flex items-center gap-1">
                        <Share2 className="w-3 h-3" /> Shared
                      </span>
                    )}
                    <AdminBadge variant={section.isVisible ? 'success' : 'neutral'}>
                      {section.isVisible ? 'Visible' : 'Hidden'}
                    </AdminBadge>
                  </div>
                </div>

                <div className="text-[11px] text-stone-400 font-mono mb-3">
                  Type: <strong className="text-stone-700">{section.type}</strong>
                </div>

                {/* Reorder and action controls */}
                <div
                  className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => onMoveSection(idx, 'up')}
                      className="p-1 rounded text-stone-400 hover:text-stone-800 disabled:opacity-20"
                      title="Move section up"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === sortedSections.length - 1}
                      onClick={() => onMoveSection(idx, 'down')}
                      className="p-1 rounded text-stone-400 hover:text-stone-800 disabled:opacity-20"
                      title="Move section down"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onTogglePreview(section.id)}
                      className={`p-1 rounded ${
                        previewSectionId === section.id
                          ? 'text-legal-800 bg-legal-100'
                          : 'text-stone-400 hover:text-stone-800'
                      }`}
                      title="Toggle live preview below"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleVisibility(section.id)}
                      className="p-1 rounded text-stone-400 hover:text-stone-800"
                      title="Toggle section visibility"
                    >
                      {section.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDuplicateSection(section.id)}
                      className="p-1 rounded text-stone-400 hover:text-stone-800"
                      title="Duplicate section"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRequestDeleteSection(section.id)}
                      className="p-1 rounded text-stone-400 hover:text-red-600"
                      title="Delete section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
