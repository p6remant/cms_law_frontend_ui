'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cmsStore';
import { ContentRecord } from '@/types/cms';
import { formatDate } from '@/lib/utils';
import { ConfirmModal } from '@/components/admin/common/ConfirmModal';
import {
  Database,
  Plus,
  Search,
  Edit3,
  Trash2,
  FileText,
  MapPin,
  Quote,
  ShieldCheck,
  X,
  Save,
} from 'lucide-react';

export default function ContentRecordsPage() {
  const { contentRecords, saveContentRecord, deleteContentRecord } = useCMS();

  const [search, setSearch] = useState('');
  const [editingRecord, setEditingRecord] = useState<ContentRecord | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filtered = contentRecords.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateNew = () => {
    const newRec: ContentRecord = {
      id: `rec-${Date.now()}`,
      name: 'New Central Content Record',
      type: 'text',
      category: 'General',
      updatedAt: new Date().toISOString(),
      data: { text: '' },
    };
    setEditingRecord(newRec);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;
    saveContentRecord({ ...editingRecord, updatedAt: new Date().toISOString() });
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Structured Content Records</h1>
          <p className="text-xs text-stone-500 mt-1">
            Centralized data records (contact info, disclosures, firm bios) reused across multiple headers, footers, and pages
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Content Record</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search content records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-legal-700 bg-stone-50/50"
          />
        </div>
      </div>

      {/* Grid of records */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 uppercase font-mono">
                  {record.category}
                </span>
                <span className="text-[11px] text-stone-400">
                  Updated: {formatDate(record.updatedAt)}
                </span>
              </div>

              <h3 className="text-base font-serif font-bold text-stone-900 mb-2">
                {record.name}
              </h3>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 text-xs text-stone-600 font-mono mb-4 line-clamp-4">
                {JSON.stringify(record.data, null, 2)}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <span className="text-xs text-stone-400 font-mono">Type: {record.type}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingRecord(JSON.parse(JSON.stringify(record)))}
                  className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                  title="Edit Record"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(record.id)}
                  className="p-1.5 rounded hover:bg-red-50 text-stone-400 hover:text-red-600"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200">
            <form onSubmit={handleSaveModal}>
              <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {editingRecord.name ? 'Edit Content Record' : 'New Content Record'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="text-stone-400 hover:text-stone-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Record Identifier Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRecord.name}
                    onChange={(e) => setEditingRecord({ ...editingRecord, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editingRecord.category}
                      onChange={(e) => setEditingRecord({ ...editingRecord, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Type
                    </label>
                    <select
                      value={editingRecord.type}
                      onChange={(e) => setEditingRecord({ ...editingRecord, type: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm rounded border border-stone-300 bg-white"
                    >
                      <option value="text">Text / Disclaimer</option>
                      <option value="contact">Contact Details</option>
                      <option value="quote">Quote / Accolade</option>
                      <option value="partner">Partner Information</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Content Value (Text or JSON Object)
                  </label>
                  <textarea
                    rows={6}
                    value={
                      typeof editingRecord.data?.text === 'string'
                        ? editingRecord.data.text
                        : JSON.stringify(editingRecord.data, null, 2)
                    }
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setEditingRecord({ ...editingRecord, data: parsed });
                      } catch {
                        setEditingRecord({ ...editingRecord, data: { text: e.target.value } });
                      }
                    }}
                    className="w-full px-3 py-2 text-xs font-mono rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700"
                  />
                  <p className="text-[11px] text-stone-400 mt-1">
                    Accepts plain text or structured JSON fields.
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deleteContentRecord(deleteTargetId);
        }}
        title="Delete Content Record"
        description="Are you sure you want to delete this content record? Any templates or pages referencing it will no longer receive its central updates."
        confirmLabel="Delete Record"
        danger={true}
      />
    </div>
  );
}
