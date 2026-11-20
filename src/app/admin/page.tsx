'use client';

import React from 'react';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { formatDate } from '@/lib/utils';
import { AdminBadge } from '@/components/admin/common/AdminBadge';
import {
  FileText,
  BookOpen,
  ClipboardList,
  Layers,
  ArrowRight,
  Eye,
  Plus,
  ShieldCheck,
  CheckCircle,
  EyeOff,
  Navigation,
  Image,
  Sliders,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    pages,
    blogArticles,
    forms,
    settings,
    mediaAssets,
    menus,
    togglePageVisibility,
    togglePagePublish,
  } = useCMS();

  const publishedPages = pages.filter((p) => p.status === 'published' && p.isVisible).length;
  const draftPages = pages.filter((p) => p.status === 'draft').length;
  const hiddenPages = pages.filter((p) => !p.isVisible).length;

  const publishedArticles = blogArticles.filter((a) => a.status === 'published' && a.isVisible).length;

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="bg-legal-950 text-white rounded-xl p-6 sm:p-8 shadow-sm border border-legal-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Institutional CMS Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            {settings.name}
          </h1>
          <p className="text-legal-300 text-sm mt-1 max-w-xl font-light">
            Section-based content management system for corporate governance, appellate practice, partner biographies, and client intake.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/pages/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-gold-500 hover:bg-gold-600 text-legal-950 text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Page</span>
          </Link>
          <Link
            href="/admin/blog/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider border border-legal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Insight</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">CMS Pages</span>
            <FileText className="w-5 h-5 text-legal-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">{pages.length}</span>
            <span className="text-xs text-emerald-600 font-medium">({publishedPages} live)</span>
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            {draftPages} drafts • {hiddenPages} hidden
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Legal Insights</span>
            <BookOpen className="w-5 h-5 text-legal-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">{blogArticles.length}</span>
            <span className="text-xs text-emerald-600 font-medium">({publishedArticles} live)</span>
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            Thought leadership briefs
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Intake Forms</span>
            <ClipboardList className="w-5 h-5 text-legal-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">{forms.length}</span>
            <span className="text-xs text-stone-500 font-medium">Active</span>
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            Confidential inquiry workflows
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Media Assets</span>
            <Image className="w-5 h-5 text-legal-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">{mediaAssets.length}</span>
            <span className="text-xs text-stone-500 font-medium">Files</span>
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            Library photos & documents
          </p>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/admin/navigation"
          className="p-5 rounded-lg bg-white border border-stone-200 hover:border-legal-700/60 shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-legal-50 text-legal-800 flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Navigation Menus</h4>
              <p className="text-xs text-stone-500">{menus.length} menus configured</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-legal-800 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/admin/sections"
          className="p-5 rounded-lg bg-white border border-stone-200 hover:border-legal-700/60 shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-legal-50 text-legal-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Section Library</h4>
              <p className="text-xs text-stone-500">12 component types ready</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-legal-800 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/admin/settings"
          className="p-5 rounded-lg bg-white border border-stone-200 hover:border-legal-700/60 shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-legal-50 text-legal-800 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Website Settings</h4>
              <p className="text-xs text-stone-500">Header, footer & branding</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-legal-800 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Pages Table Summary */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">Managed Website Pages</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Structured section-based pages and publication status
            </p>
          </div>
          <Link
            href="/admin/pages"
            className="text-xs font-semibold uppercase tracking-wider text-legal-700 hover:text-legal-900 flex items-center gap-1"
          >
            <span>View All ({pages.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-mono">
              <tr>
                <th className="py-3 px-6">Page Title</th>
                <th className="py-3 px-6">Slug</th>
                <th className="py-3 px-6">Sections</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Visibility</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {pages.slice(0, 6).map((page) => (
                <tr key={page.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-stone-900">
                    <Link href={`/admin/pages/${page.id}`} className="hover:text-legal-700">
                      {page.title}
                    </Link>
                  </td>
                  <td className="py-3.5 px-6 text-stone-500 font-mono">
                    /{page.slug}
                  </td>
                  <td className="py-3.5 px-6 text-stone-600">
                    {page.sections.length} sections
                  </td>
                  <td className="py-3.5 px-6">
                    <AdminBadge variant={page.status === 'published' ? 'success' : 'neutral'}>
                      {page.status}
                    </AdminBadge>
                  </td>
                  <td className="py-3.5 px-6">
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
                  <td className="py-3.5 px-6 text-right space-x-2">
                    <Link
                      href={`/admin/pages/${page.id}`}
                      className="text-legal-700 hover:text-legal-950 font-semibold"
                    >
                      Edit Builder
                    </Link>
                    <span className="text-stone-300">|</span>
                    <Link
                      href={`/${page.slug}`}
                      target="_blank"
                      className="text-stone-500 hover:text-stone-800"
                    >
                      Preview
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
