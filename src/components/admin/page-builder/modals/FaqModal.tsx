'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';

export interface FaqData {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

interface FaqModalProps {
  isOpen: boolean;
  initialData?: FaqData | null;
  onSave: (data: FaqData) => void;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({
  isOpen,
  initialData,
  onSave,
  onClose,
}) => {
  const isEditing = Boolean(initialData && initialData.question);

  const [formData, setFormData] = useState<FaqData>({
    question: '',
    answer: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        question: initialData.question ?? '',
        answer: initialData.answer ?? '',
      });
    } else {
      setFormData({
        question: '',
        answer: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    onSave({
      ...formData,
      id: initialData?.id || `faq-${Date.now()}`,
      question: formData.question.trim(),
      answer: formData.answer.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200">
        <form onSubmit={handleSubmit}>
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-legal-800" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {isEditing ? 'Edit FAQ Item' : 'Add FAQ Question'}
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
                Question *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. How does your firm handle conflict clearance?"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Answer *
              </label>
              <textarea
                rows={4}
                required
                placeholder="e.g. Our ethics committee executes comprehensive electronic registry checks before engagement..."
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 leading-relaxed focus:outline-none focus:ring-1 focus:ring-legal-700"
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
              {isEditing ? 'Save Changes' : 'Save Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
