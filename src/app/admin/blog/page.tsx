'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { formatDate } from '@/lib/utils';
import { AdminBadge } from '@/components/admin/common/AdminBadge';
import { ConfirmModal } from '@/components/admin/common/ConfirmModal';
import {
  Plus,
  Search,
  BookOpen,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle,
  EyeOff,
  Sparkles,
} from 'lucide-react';

export default function BlogManagementPage() {
  const {
    blogArticles,
    deleteArticle,
    toggleArticleVisibility,
    toggleArticlePublish,
  } = useCMS();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(blogArticles.map((a) => a.category)))];

  const filtered = blogArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.author.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || article.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const targetArticle = blogArticles.find((a) => a.id === deleteTargetId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Legal Insights & Blog</h1>
          <p className="text-xs text-stone-500 mt-1">
            Publish jurisprudential briefs, statutory analysis, and regulatory commentary
          </p>
        </div>

        <Link
          href="/admin/blog/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Legal Brief</span>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-legal-700 bg-stone-50/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-lg border border-stone-200 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Table (Section 9 fields) */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-mono">
              <tr>
                <th className="py-3.5 px-6">Title & Excerpt</th>
                <th className="py-3.5 px-6">Author</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Visibility</th>
                <th className="py-3.5 px-6">SEO</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((art) => (
                <tr key={art.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-4 px-6 max-w-xs">
                    <Link
                      href={`/admin/blog/${art.id}`}
                      className="font-semibold text-stone-900 hover:text-legal-800 text-sm block truncate"
                    >
                      {art.title}
                    </Link>
                    <span className="text-stone-400 font-mono text-[11px] block mt-0.5 truncate">
                      /{art.slug}
                    </span>
                  </td>

                  <td className="py-4 px-6 font-medium text-stone-700">
                    {art.author}
                  </td>

                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded bg-stone-100 text-stone-700 text-[11px] font-medium">
                      {art.category}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-stone-500">
                    {formatDate(art.publishedAt)}
                  </td>

                  <td className="py-4 px-6">
                    <button
                      type="button"
                      onClick={() => toggleArticlePublish(art.id)}
                      title="Click to toggle Draft / Published"
                    >
                      <AdminBadge variant={art.status === 'published' ? 'success' : 'neutral'}>
                        {art.status}
                      </AdminBadge>
                    </button>
                  </td>

                  <td className="py-4 px-6">
                    <button
                      type="button"
                      onClick={() => toggleArticleVisibility(art.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border ${
                        art.isVisible
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-stone-100 text-stone-500 border-stone-200'
                      }`}
                    >
                      {art.isVisible ? <CheckCircle className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{art.isVisible ? 'Visible' : 'Hidden'}</span>
                    </button>
                  </td>

                  <td className="py-4 px-6">
                    {art.seo?.title ? (
                      <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                        <Sparkles className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[11px]">Auto</span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/${art.id}`}
                        className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/blog/${art.slug}`}
                        target="_blank"
                        className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                        title="Preview Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(art.id)}
                        className="p-1.5 rounded hover:bg-red-50 text-stone-400 hover:text-red-600"
                        title="Delete Article"
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

      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deleteArticle(deleteTargetId);
        }}
        title="Delete Legal Article"
        description={`Are you sure you want to delete "${targetArticle?.title}"?`}
        confirmLabel="Delete Article"
        danger={true}
      />
    </div>
  );
}
