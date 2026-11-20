'use client';

import React, { useState, useEffect } from 'react';
import { Quote, X } from 'lucide-react';

export interface TestimonialData {
  id?: string;
  quote: string;
  author: string;
  title?: string;
  organization?: string;
}

interface TestimonialModalProps {
  isOpen: boolean;
  initialData?: TestimonialData | null;
  onSave: (data: TestimonialData) => void;
  onClose: () => void;
}

export const TestimonialModal: React.FC<TestimonialModalProps> = ({
  isOpen,
  initialData,
  onSave,
  onClose,
}) => {
  const isEditing = Boolean(initialData && initialData.author);

  const [formData, setFormData] = useState<TestimonialData>({
    quote: '',
    author: '',
    title: '',
    organization: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        quote: initialData.quote ?? '',
        author: initialData.author ?? '',
        title: initialData.title ?? '',
        organization: initialData.organization ?? '',
      });
    } else {
      setFormData({
        quote: '',
        author: '',
        title: '',
        organization: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.quote.trim() || !formData.author.trim()) return;

    onSave({
      ...formData,
      id: initialData?.id || `t-${Date.now()}`,
      quote: formData.quote.trim(),
      author: formData.author.trim(),
      title: formData.title?.trim() || 'General Counsel',
      organization: formData.organization?.trim() || '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Quote className="w-5 h-5 text-legal-800" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {isEditing ? 'Edit Client Accolade' : 'Add Client Accolade'}
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
                Client Quotation *
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Their strategic clarity during our cross-border reorganization was invaluable..."
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 leading-relaxed focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Client / Executive Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. David Vance"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Title / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. General Counsel"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fortune 100 Enterprise"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                />
              </div>
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
              {isEditing ? 'Save Changes' : 'Save Accolade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
