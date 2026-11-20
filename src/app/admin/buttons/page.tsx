'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cmsStore';
import { ButtonConfig, DestinationType } from '@/types/cms';
import { AdminBadge } from '@/components/admin/common/AdminBadge';
import { ConfirmModal } from '@/components/admin/common/ConfirmModal';
import {
  MousePointerClick,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle,
  X,
} from 'lucide-react';

export default function ButtonsManagementPage() {
  const { buttons, saveButton, deleteButton } = useCMS();

  const [search, setSearch] = useState('');
  const [editingBtn, setEditingBtn] = useState<ButtonConfig | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filtered = buttons.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateNew = () => {
    const newBtn: ButtonConfig = {
      id: `btn-${Date.now()}`,
      name: 'New Reusable CTA Button',
      label: 'Consult With Counsel',
      destinationType: 'page',
      destinationValue: '/contact',
      variant: 'primary',
      size: 'md',
      target: '_self',
      isVisible: true,
    };
    setEditingBtn(newBtn);
  };

  const handleToggleVisibility = (btn: ButtonConfig) => {
    saveButton({ ...btn, isVisible: !btn.isVisible });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBtn) return;
    saveButton(editingBtn);
    setEditingBtn(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Buttons & CTAs Management</h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage reusable call-to-action buttons, variants, telephone hotlines, and destination targets
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Button Config</span>
        </button>
      </div>

      {/* Grid of buttons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((btn) => (
          <div
            key={btn.id}
            className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 uppercase font-mono">
                  {btn.destinationType}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleVisibility(btn)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border ${
                    btn.isVisible
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-stone-100 text-stone-500 border-stone-200'
                  }`}
                >
                  {btn.isVisible ? <CheckCircle className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{btn.isVisible ? 'Visible' : 'Hidden'}</span>
                </button>
              </div>

              <h3 className="font-serif font-bold text-base text-stone-900 mb-1">{btn.name}</h3>
              <p className="text-xs font-mono text-stone-400 mb-4">{btn.destinationValue}</p>

              {/* Visual Button Preview */}
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center mb-6">
                <span
                  className={`inline-flex items-center justify-center font-medium transition-all ${
                    btn.variant === 'primary'
                      ? 'bg-legal-800 text-white shadow-xs'
                      : btn.variant === 'secondary'
                      ? 'bg-gold-500 text-legal-950 font-bold'
                      : 'border border-legal-800 text-legal-800'
                  } ${
                    btn.size === 'sm'
                      ? 'px-3 py-1.5 text-xs'
                      : btn.size === 'lg'
                      ? 'px-6 py-3 text-sm'
                      : 'px-4 py-2 text-xs'
                  }`}
                >
                  {btn.label}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs">
              <span className="text-stone-400 uppercase font-mono text-[10px]">
                {btn.variant} • {btn.size}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBtn(JSON.parse(JSON.stringify(btn)))}
                  className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                  title="Edit button"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(btn.id)}
                  className="p-1.5 rounded hover:bg-red-50 text-stone-400 hover:text-red-600"
                  title="Delete button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingBtn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200">
            <form onSubmit={handleSaveModal}>
              <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-stone-900">Configure CTA Button</h3>
                <button type="button" onClick={() => setEditingBtn(null)} className="text-stone-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Internal Identifier Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBtn.name}
                    onChange={(e) => setEditingBtn({ ...editingBtn, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Visible Button Label
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBtn.label}
                    onChange={(e) => setEditingBtn({ ...editingBtn, label: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded border border-stone-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Destination Type
                    </label>
                    <select
                      value={editingBtn.destinationType}
                      onChange={(e) =>
                        setEditingBtn({ ...editingBtn, destinationType: e.target.value as DestinationType })
                      }
                      className="w-full px-3 py-2 text-sm rounded border border-stone-300 bg-white"
                    >
                      <option value="page">Internal Page</option>
                      <option value="external">External URL</option>
                      <option value="tel">Telephone (tel:)</option>
                      <option value="email">Email (mailto:)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Visual Variant
                    </label>
                    <select
                      value={editingBtn.variant}
                      onChange={(e) =>
                        setEditingBtn({ ...editingBtn, variant: e.target.value as any })
                      }
                      className="w-full px-3 py-2 text-sm rounded border border-stone-300 bg-white"
                    >
                      <option value="primary">Primary (Legal Green)</option>
                      <option value="secondary">Secondary (Gold Accent)</option>
                      <option value="outline">Outline Border</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Destination Value / URL
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/contact or +12125550199"
                    value={editingBtn.destinationValue}
                    onChange={(e) => setEditingBtn({ ...editingBtn, destinationValue: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono rounded border border-stone-300"
                  />
                </div>
              </div>

              <div className="bg-stone-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingBtn(null)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Save Button
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deleteButton(deleteTargetId);
        }}
        title="Delete Button Config"
        description="Are you sure you want to delete this reusable button?"
        confirmLabel="Delete Button"
        danger={true}
      />
    </div>
  );
}
