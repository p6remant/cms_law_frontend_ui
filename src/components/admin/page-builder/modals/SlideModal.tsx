'use client';

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { ImageUploadField } from '@/components/admin/common/ImageUploadField';

export interface SlideData {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  desktopImage: string;
  mobileImage?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  order?: number;
  isVisible?: boolean;
}

interface SlideModalProps {
  isOpen: boolean;
  initialData?: SlideData | null;
  onSave: (data: SlideData) => void;
  onClose: () => void;
}

export const SlideModal: React.FC<SlideModalProps> = ({
  isOpen,
  initialData,
  onSave,
  onClose,
}) => {
  const isEditing = Boolean(initialData && initialData.title);

  const [formData, setFormData] = useState<SlideData>({
    title: '',
    subtitle: '',
    description: '',
    desktopImage: '',
    ctaLabel: '',
    ctaUrl: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title ?? '',
        subtitle: initialData.subtitle ?? '',
        description: initialData.description ?? '',
        desktopImage: initialData.desktopImage ?? '',
        ctaLabel: initialData.ctaLabel ?? '',
        ctaUrl: initialData.ctaUrl ?? '',
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        desktopImage: '',
        ctaLabel: '',
        ctaUrl: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...formData,
      id: initialData?.id || `slide-${Date.now()}`,
      title: formData.title.trim(),
      subtitle: formData.subtitle?.trim() || '',
      description: formData.description?.trim() || '',
      desktopImage: formData.desktopImage || 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=80',
      ctaLabel: formData.ctaLabel?.trim() || '',
      ctaUrl: formData.ctaUrl?.trim() || '',
      isVisible: initialData?.isVisible ?? true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-legal-800" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {isEditing ? 'Edit Carousel Slide' : 'Add Slide to Carousel'}
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

          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Slide Headline *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Decisive Advocates in High-Stakes Litigation"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 font-serif font-bold focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Subtitle / Eyebrow
              </label>
              <input
                type="text"
                placeholder="e.g. Federal & Supreme Court Practice"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Slide Narrative / Description
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Our partners have defended landmark precedents across federal circuits, protecting billions in enterprise value..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 leading-relaxed"
              />
            </div>

            <div>
              <ImageUploadField
                label="Slide Background Photography *"
                value={formData.desktopImage}
                onChange={(url) => setFormData({ ...formData, desktopImage: url })}
                aspectRatio="wide"
                recommendedSize="1920 x 1080px (16:9)"
                description="Upload high-resolution photography for hero carousel."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Explore Practice Areas"
                  value={formData.ctaLabel}
                  onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  CTA Button URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. /practice"
                  value={formData.ctaUrl}
                  onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 font-mono"
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
              {isEditing ? 'Save Changes' : 'Save Slide'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
