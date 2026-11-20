'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, X } from 'lucide-react';

export interface PracticeData {
  id?: string;
  title: string;
  slug?: string;
  shortDescription: string;
  longDescription?: string;
  icon?: string;
}

interface PracticeModalProps {
  isOpen: boolean;
  initialData?: PracticeData | null;
  onSave: (data: PracticeData) => void;
  onClose: () => void;
}

export const PracticeModal: React.FC<PracticeModalProps> = ({
  isOpen,
  initialData,
  onSave,
  onClose,
}) => {
  const isEditing = Boolean(initialData && initialData.title);

  const [formData, setFormData] = useState<PracticeData>({
    title: '',
    slug: '',
    shortDescription: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title ?? '',
        slug: initialData.slug ?? '',
        shortDescription: initialData.shortDescription ?? '',
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        shortDescription: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const slug =
      formData.slug?.trim() ||
      formData.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

    onSave({
      ...formData,
      id: initialData?.id || `pa-${Date.now()}`,
      title: formData.title.trim(),
      slug,
      shortDescription: formData.shortDescription.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-legal-800" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {isEditing ? 'Edit Practice Discipline' : 'Add Practice Discipline'}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Practice Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Cross-Border M&A and Antitrust"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Short Description (Shown on Card) *
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Advising multinational boards on complex transactional architecture, tender offers, and regulatory clearances..."
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700 leading-relaxed"
              />
            </div>
          </div>

          <div className="bg-stone-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Save Discipline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
