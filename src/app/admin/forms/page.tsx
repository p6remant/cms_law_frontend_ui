'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { FormDefinition } from '@/types/cms';
import { AdminBadge } from '@/components/admin/common/AdminBadge';
import { ConfirmModal } from '@/components/admin/common/ConfirmModal';
import {
  ClipboardList,
  Plus,
  Search,
  Edit3,
  Trash2,
  ShieldCheck,
  CheckCircle,
  EyeOff,
  Layers,
} from 'lucide-react';

export default function FormsListPage() {
  const { forms, deleteForm, saveForm } = useCMS();
  const [search, setSearch] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filtered = forms.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    (f.description && f.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleToggleVisibility = (form: FormDefinition) => {
    saveForm({ ...form, isVisible: !form.isVisible });
  };

  const targetForm = forms.find((f) => f.id === deleteTargetId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Intake Forms Management</h1>
          <p className="text-xs text-stone-500 mt-1">
            Build and manage confidential consultation requests, career applications, and legal intake workflows
          </p>
        </div>

        <Link
          href="/admin/forms/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Form</span>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search forms by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-legal-700 bg-stone-50/50"
          />
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((form) => (
          <div
            key={form.id}
            className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-legal-50 text-legal-800 uppercase font-mono">
                  {form.fields.length} Fields Configured
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleVisibility(form)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                    form.isVisible
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-stone-100 text-stone-500 border-stone-200'
                  }`}
                >
                  {form.isVisible ? <CheckCircle className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{form.isVisible ? 'Visible' : 'Hidden'}</span>
                </button>
              </div>

              <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                {form.name}
              </h3>

              {form.description && (
                <p className="text-xs text-stone-600 mb-4 line-clamp-2 leading-relaxed">
                  {form.description}
                </p>
              )}

              {/* Legal Notice Preview Box (Section 12) */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-stone-500 mb-6 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-legal-700 shrink-0 mt-0.5" />
                <span className="line-clamp-2">
                  <strong>Notice:</strong> {form.privacyNotice}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <span className="text-xs text-stone-400 font-mono">
                Submit: &ldquo;{form.submitLabel}&rdquo;
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/forms/${form.id}`}
                  className="px-3 py-1.5 rounded bg-legal-50 text-legal-800 hover:bg-legal-100 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Builder</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(form.id)}
                  className="p-1.5 rounded hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                  title="Delete Form"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deleteForm(deleteTargetId);
        }}
        title="Delete Form Definition"
        description={`Are you sure you want to delete "${targetForm?.name}"? Pages referencing this form will no longer display it.`}
        confirmLabel="Delete Form"
        danger={true}
      />
    </div>
  );
}
