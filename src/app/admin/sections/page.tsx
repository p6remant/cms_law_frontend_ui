'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { PageSection } from '@/types/cms';
import { AdminBadge } from '@/components/admin/common/AdminBadge';
import {
  Layers,
  Search,
  Share2,
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
} from 'lucide-react';

export default function SectionsLibraryPage() {
  const { pages } = useCMS();
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');

  // Extract all sections from all pages
  const allSections: Array<{ section: PageSection; pageTitle: string; pageSlug: string; pageId: string }> = [];

  pages.forEach((p) => {
    p.sections.forEach((s) => {
      allSections.push({
        section: s,
        pageTitle: p.title,
        pageSlug: p.slug,
        pageId: p.id,
      });
    });
  });

  const sectionTypes = ['All', ...Array.from(new Set(allSections.map((item) => item.section.type)))];

  const filtered = allSections.filter((item) => {
    const matchesSearch =
      item.section.name.toLowerCase().includes(search.toLowerCase()) ||
      item.pageTitle.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || item.section.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Section Library & Reusable Records</h1>
          <p className="text-xs text-stone-500 mt-1">
            Browse all configured page sections and reusable shared components across the website
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs">
          <Share2 className="w-4 h-4 shrink-0 text-blue-600" />
          <span>Section 7.5: Reusable vs Page-Specific distinction active</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sections by name or page..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-legal-700 bg-stone-50/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-medium">Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-lg border border-stone-200 bg-white"
          >
            {sectionTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sections Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-mono">
            <tr>
              <th className="py-3.5 px-6">Section Name</th>
              <th className="py-3.5 px-6">Component Type</th>
              <th className="py-3.5 px-6">Host Page</th>
              <th className="py-3.5 px-6">Usage Mode</th>
              <th className="py-3.5 px-6">Visibility</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map(({ section, pageTitle, pageSlug, pageId }, idx) => (
              <tr key={`${section.id}-${idx}`} className="hover:bg-stone-50/70 transition-colors">
                <td className="py-3.5 px-6 font-semibold text-stone-900">
                  {section.name}
                </td>
                <td className="py-3.5 px-6 font-mono text-legal-700 font-medium">
                  {section.type}
                </td>
                <td className="py-3.5 px-6">
                  <Link href={`/admin/pages/${pageId}?sectionId=${section.id}`} className="text-legal-800 hover:underline font-medium">
                    {pageTitle} (/{pageSlug})
                  </Link>
                </td>
                <td className="py-3.5 px-6">
                  {section.isReusable ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      <Share2 className="w-3 h-3" /> Shared
                    </span>
                  ) : (
                    <span className="text-stone-500 text-[11px]">Page-specific</span>
                  )}
                </td>
                <td className="py-3.5 px-6">
                  <AdminBadge variant={section.isVisible ? 'success' : 'neutral'}>
                    {section.isVisible ? 'Visible' : 'Hidden'}
                  </AdminBadge>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <Link
                    href={`/admin/pages/${pageId}?sectionId=${section.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-100 hover:bg-legal-800 text-stone-700 hover:text-white font-semibold transition-colors"
                  >
                    <span>Edit in Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
