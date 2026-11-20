'use client';

import React, { useState, useEffect } from 'react';
import { User, X } from 'lucide-react';
import { ImageUploadField } from '@/components/admin/common/ImageUploadField';

export interface PartnerData {
  id?: string;
  name: string;
  role: string;
  slug?: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  bio?: string;
  admissions?: string[];
  education?: string[];
}

interface PartnerModalProps {
  isOpen: boolean;
  initialData?: PartnerData | null;
  onSave: (data: PartnerData) => void;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
  isOpen,
  initialData,
  onSave,
  onClose,
}) => {
  const isEditing = Boolean(initialData && initialData.name);

  const [formData, setFormData] = useState<PartnerData>({
    name: '',
    role: '',
    slug: '',
    imageUrl: '',
    email: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name ?? '',
        role: initialData.role ?? '',
        slug: initialData.slug ?? '',
        imageUrl: initialData.imageUrl ?? '',
        email: initialData.email ?? '',
        phone: initialData.phone ?? '',
        bio: initialData.bio ?? '',
      });
    } else {
      setFormData({
        name: '',
        role: '',
        slug: '',
        imageUrl: '',
        email: '',
        phone: '',
        bio: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const slug =
      formData.slug?.trim() ||
      formData.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

    onSave({
      ...formData,
      id: initialData?.id || `p-${Date.now()}`,
      slug,
      name: formData.name.trim(),
      role: formData.role.trim() || 'Partner',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-legal-800" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {isEditing ? 'Edit Partner Card' : 'Add Partner to Carousel'}
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
                Partner Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Sterling"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Professional Role / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Managing Partner"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Direct Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. e.sterling@vanguardsterling.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Direct Telephone
                </label>
                <input
                  type="text"
                  placeholder="e.g. +1 (212) 555-0101"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 font-mono"
                />
              </div>
            </div>

            <div>
              <ImageUploadField
                label="Partner Photo (Headshot) *"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                aspectRatio="portrait"
                recommendedSize="800 x 1000px"
                description="Upload partner headshot photo or select from media library."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Brief Biography (Shown on Card)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Former clerk for the U.S. Second Circuit Court of Appeals and veteran corporate strategist..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 leading-relaxed"
              />
            </div>
          </div>

          <div className="bg-stone-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Add to Carousel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
