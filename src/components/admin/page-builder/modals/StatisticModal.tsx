'use client';

import React, { useState, useEffect } from 'react';
import { BarChart2, X } from 'lucide-react';

export interface StatisticData {
  value: string;
  label: string;
  sublabel?: string;
}

interface StatisticModalProps {
  isOpen: boolean;
  initialData?: StatisticData | null;
  onSave: (data: StatisticData) => void;
  onClose: () => void;
}

export const StatisticModal: React.FC<StatisticModalProps> = ({
  isOpen,
  initialData,
  onSave,
  onClose,
}) => {
  const isEditing = Boolean(initialData && initialData.value);

  const [formData, setFormData] = useState<StatisticData>({
    value: '',
    label: '',
    sublabel: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        value: initialData.value ?? '',
        label: initialData.label ?? '',
        sublabel: initialData.sublabel ?? '',
      });
    } else {
      setFormData({
        value: '',
        label: '',
        sublabel: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.value.trim() || !formData.label.trim()) return;

    onSave({
      value: formData.value.trim(),
      label: formData.label.trim(),
      sublabel: formData.sublabel?.trim() || '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-legal-800" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {isEditing ? 'Edit Benchmark Figure' : 'Add Benchmark Figure'}
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
                Metric Value / Figure *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 98% or $42B+ or 48+"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 font-serif font-bold text-legal-900 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Metric Label *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Federal Circuit Affirmance Rate"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Supporting Subtext / Context
              </label>
              <input
                type="text"
                placeholder="e.g. Across landmark corporate governance disputes"
                value={formData.sublabel}
                onChange={(e) => setFormData({ ...formData, sublabel: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
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
              {isEditing ? 'Save Changes' : 'Save Benchmark'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
