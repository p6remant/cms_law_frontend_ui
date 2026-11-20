'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCMS } from '@/lib/cmsStore';
import { formatDate } from '@/lib/utils';
import { AdminBadge } from '@/components/admin/common/AdminBadge';
import { ConfirmModal } from '@/components/admin/common/ConfirmModal';
import {
  Plus,
  Search,
  Filter,
  Copy,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  CheckCircle,
  ExternalLink,
  Layers,
  Sparkles,
  FileText,
} from 'lucide-react';

export default function PagesListPage() {
  const router = useRouter();
  const {
    pages,
    duplicatePage,
    deletePage,
    togglePageVisibility,
    togglePagePublish,
  } = useCMS();

  const [search, setSearch] = useState('');
  const [templateFilter, setTemplateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const templates = ['All', ...Array.from(new Set(pages.map((p) => p.template)))];

  const filtered = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(search.toLowerCase()) ||
      page.slug.toLowerCase().includes(search.toLowerCase());
    const matchesTemplate = templateFilter === 'All' || page.template === templateFilter;
    const matchesStatus = statusFilter === 'All' || page.status === statusFilter;
    return matchesSearch && matchesTemplate && matchesStatus;
  });

  const handleDuplicate = (id: string) => {
    const newPage = duplicatePage(id);
    if (newPage) {
      router.push(`/admin/pages/${newPage.id}`);
    }
  };

  const targetPage = pages.find((p) => p.id === deleteTargetId);

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Website Pages</h1>
          <p className="text-xs text-stone-500 mt-1">
            Section-composed pages, hierarchy, and visibility controls
          </p>
        </div>

        <Link
          href="/admin/pages/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </Link>
      </div>

      {/* Filter and search toolbar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pages by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-legal-700 bg-stone-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Template:</span>
            <select
              value={templateFilter}
              onChange={(e) => setTemplateFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-legal-700"
            >
              {templates.map((tpl) => (
                <option key={tpl} value={tpl}>
                  {tpl}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-legal-700"
            >
              <option value="All">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-mono">
              <tr>
                <th className="py-3.5 px-6">Title & Slug</th>
                <th className="py-3.5 px-6">Template</th>
                <th className="py-3.5 px-6">Sections</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Visibility</th>
                <th className="py-3.5 px-6">SEO</th>
                <th className="py-3.5 px-6">Updated</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((page) => (
                <tr key={page.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-4 px-6">
                    <Link
                      href={`/admin/pages/${page.id}`}
                      className="font-semibold text-stone-900 hover:text-legal-800 text-sm block"
                    >
                      {page.title}
                    </Link>
                    <span className="text-stone-400 font-mono text-[11px] block mt-0.5">
                      /{page.slug}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium">
                      {page.template}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <Link
                      href={`/admin/pages/${page.id}?tab=sections`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors group"
                      title="Open Section Builder"
                    >
                      <Layers className="w-3.5 h-3.5 text-legal-700 group-hover:scale-110 transition-transform" />
                      <span>{page.sections.length} Sections</span>
                    </Link>
                  </td>

                  <td className="py-4 px-6">
                    <button
                      type="button"
                      onClick={() => togglePagePublish(page.id)}
                      title="Click to toggle Draft / Published"
                      className="group"
                    >
                      <AdminBadge
                        variant={page.status === 'published' ? 'success' : 'neutral'}
                      >
                        {page.status}
                      </AdminBadge>
                    </button>
                  </td>

                  <td className="py-4 px-6">
                    <button
                      type="button"
                      onClick={() => togglePageVisibility(page.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                        page.isVisible
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-stone-100 text-stone-500 border-stone-200'
                      }`}
                    >
                      {page.isVisible ? <CheckCircle className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{page.isVisible ? 'Visible' : 'Hidden'}</span>
                    </button>
                  </td>

                  <td className="py-4 px-6">
                    {page.seo?.title ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                        <Sparkles className="w-3 h-3" /> Configured
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[11px]">Default</span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-stone-500 text-[11px]">
                    {formatDate(page.updatedAt)}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/pages/${page.id}`}
                        className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
                        title="Edit Section Builder"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(page.id)}
                        className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
                        title="Duplicate Page"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
                        title="Live Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(page.id)}
                        className="p-1.5 rounded hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                        title="Delete Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal (Rule 21 & 22: Confirm destructive actions) */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deletePage(deleteTargetId);
        }}
        title="Confirm Page Deletion"
        description={`Are you sure you want to permanently delete "${targetPage?.title}" (/${targetPage?.slug})? This action cannot be undone.`}
        confirmLabel="Delete Page"
        danger={true}
      />
    </div>
  );
}
