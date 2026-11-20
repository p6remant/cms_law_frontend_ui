'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { Page, PageSection, SectionType } from '@/types/cms';
import { AdminBadge } from '@/components/admin/common/AdminBadge';
import { ConfirmModal } from '@/components/admin/common/ConfirmModal';
import { ImageUploadField } from '@/components/admin/common/ImageUploadField';
import { SectionRenderer } from '@/components/website/sections/SectionRenderer';
import { SectionList } from '@/components/admin/page-builder/SectionList';
import { SectionInspector } from '@/components/admin/page-builder/SectionInspector';
import { SectionLibraryModal } from '@/components/admin/page-builder/SectionLibraryModal';
import { PartnerModal, PartnerData } from '@/components/admin/page-builder/modals/PartnerModal';
import { FaqModal, FaqData } from '@/components/admin/page-builder/modals/FaqModal';
import { PracticeModal, PracticeData } from '@/components/admin/page-builder/modals/PracticeModal';
import { TestimonialModal, TestimonialData } from '@/components/admin/page-builder/modals/TestimonialModal';
import { StatisticModal, StatisticData } from '@/components/admin/page-builder/modals/StatisticModal';
import { SlideModal, SlideData } from '@/components/admin/page-builder/modals/SlideModal';
import {
  ArrowLeft,
  Save,
  Layers,
  Settings,
  Sparkles,
  ExternalLink,
  CheckCircle,
  X,
} from 'lucide-react';

export default function PageBuilderScreen() {
  const params = useParams();
  const router = useRouter();
  const pageId = params?.id as string;

  const { pages, savePage, isLoaded } = useCMS();

  const [page, setPage] = useState<Page | null>(null);
  const [activeTab, setActiveTab] = useState<'sections' | 'metadata' | 'seo'>('sections');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [deleteSectionTargetId, setDeleteSectionTargetId] = useState<string | null>(null);
  const [previewSectionId, setPreviewSectionId] = useState<string | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Modals state for items
  const [partnerModal, setPartnerModal] = useState<{
    isOpen: boolean;
    editIndex: number | null;
    data: PartnerData | null;
  }>({ isOpen: false, editIndex: null, data: null });

  const [faqModal, setFaqModal] = useState<{
    isOpen: boolean;
    editIndex: number | null;
    data: FaqData | null;
  }>({ isOpen: false, editIndex: null, data: null });

  const [practiceModal, setPracticeModal] = useState<{
    isOpen: boolean;
    editIndex: number | null;
    data: PracticeData | null;
  }>({ isOpen: false, editIndex: null, data: null });

  const [testimonialModal, setTestimonialModal] = useState<{
    isOpen: boolean;
    editIndex: number | null;
    data: TestimonialData | null;
  }>({ isOpen: false, editIndex: null, data: null });

  const [statisticModal, setStatisticModal] = useState<{
    isOpen: boolean;
    editIndex: number | null;
    data: StatisticData | null;
  }>({ isOpen: false, editIndex: null, data: null });

  const [slideModal, setSlideModal] = useState<{
    isOpen: boolean;
    editIndex: number | null;
    data: SlideData | null;
  }>({ isOpen: false, editIndex: null, data: null });

  // Load page & sync URL
  useEffect(() => {
    if (isLoaded) {
      const found = pages.find((p) => p.id === pageId);
      if (found) {
        setPage(JSON.parse(JSON.stringify(found)));

        if (typeof window !== 'undefined') {
          const searchParams = new URLSearchParams(window.location.search);
          const paramSecId = searchParams.get('sectionId');
          const paramTab = searchParams.get('tab');

          if (paramTab === 'metadata' || paramTab === 'seo' || paramTab === 'sections') {
            setActiveTab(paramTab);
          }

          if (paramSecId && found.sections.some((s) => s.id === paramSecId)) {
            setEditingSectionId(paramSecId);
          } else if (found.sections.length > 0) {
            setEditingSectionId(found.sections[0].id);
          }
        }
      }
    }
  }, [isLoaded, pageId, pages]);

  if (!isLoaded || !page) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-4 border-legal-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-500 text-sm">Loading page builder...</p>
      </div>
    );
  }

  const currentEditingSection = page.sections.find((s) => s.id === editingSectionId);

  const handleSelectSection = (secId: string) => {
    setEditingSectionId(secId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('sectionId', secId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleSavePage = () => {
    savePage(page);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  // Section Operations
  const handleAddSectionFromLibrary = (type: SectionType) => {
    const newSection: PageSection = {
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      name: getDefaultNameForType(type),
      order: page.sections.length + 1,
      isVisible: true,
      isReusable: false,
      settings: { containerWidth: 'normal' },
      content: getDefaultContentForType(type),
    };

    const updatedSections = [...page.sections, newSection];
    const updatedPage = { ...page, sections: updatedSections };
    setPage(updatedPage);
    savePage(updatedPage);
    setSectionModalOpen(false);
    handleSelectSection(newSection.id);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= page.sections.length) return;

    const newSections = [...page.sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    const reordered = newSections.map((s, idx) => ({ ...s, order: idx + 1 }));
    const updatedPage = { ...page, sections: reordered };
    setPage(updatedPage);
    savePage(updatedPage);
  };

  const handleDuplicateSection = (secId: string) => {
    const target = page.sections.find((s) => s.id === secId);
    if (!target) return;

    const duplicated: PageSection = {
      ...JSON.parse(JSON.stringify(target)),
      id: `sec-${Date.now()}`,
      name: `${target.name} (Copy)`,
      order: page.sections.length + 1,
    };

    const updatedPage = { ...page, sections: [...page.sections, duplicated] };
    setPage(updatedPage);
    savePage(updatedPage);
    handleSelectSection(duplicated.id);
  };

  const handleDeleteSectionConfirm = () => {
    if (!deleteSectionTargetId) return;
    const filtered = page.sections
      .filter((s) => s.id !== deleteSectionTargetId)
      .map((s, idx) => ({ ...s, order: idx + 1 }));
    const updatedPage = { ...page, sections: filtered };
    setPage(updatedPage);
    savePage(updatedPage);
    setDeleteSectionTargetId(null);
    if (editingSectionId === deleteSectionTargetId) {
      setEditingSectionId(filtered[0]?.id || null);
    }
  };

  const handleToggleSectionVisibility = (secId: string) => {
    const updated = page.sections.map((s) => (s.id === secId ? { ...s, isVisible: !s.isVisible } : s));
    const updatedPage = { ...page, sections: updated };
    setPage(updatedPage);
    savePage(updatedPage);
  };

  const handleToggleSectionReusable = () => {
    if (!currentEditingSection) return;
    const updated = page.sections.map((s) =>
      s.id === currentEditingSection.id ? { ...s, isReusable: !s.isReusable } : s
    );
    const updatedPage = { ...page, sections: updated };
    setPage(updatedPage);
    savePage(updatedPage);
  };

  const handleUpdateCurrentContent = (newContent: any) => {
    if (!currentEditingSection) return;
    const updated = page.sections.map((s) =>
      s.id === currentEditingSection.id ? { ...s, content: newContent } : s
    );
    const updatedPage = { ...page, sections: updated };
    setPage(updatedPage);
    savePage(updatedPage);
  };

  const handleUpdateCurrentSettings = (newSettings: any) => {
    if (!currentEditingSection) return;
    const updated = page.sections.map((s) =>
      s.id === currentEditingSection.id ? { ...s, settings: { ...s.settings, ...newSettings } } : s
    );
    const updatedPage = { ...page, sections: updated };
    setPage(updatedPage);
    savePage(updatedPage);
  };

  const handleUpdateCurrentName = (name: string) => {
    if (!currentEditingSection) return;
    const updated = page.sections.map((s) =>
      s.id === currentEditingSection.id ? { ...s, name } : s
    );
    const updatedPage = { ...page, sections: updated };
    setPage(updatedPage);
    savePage(updatedPage);
  };

  // Reordering sub-items
  const handleMoveSubItem = (key: 'items' | 'slides', index: number, direction: 'up' | 'down') => {
    if (!currentEditingSection) return;
    const items = [...(currentEditingSection.content[key] || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;

    handleUpdateCurrentContent({ ...currentEditingSection.content, [key]: items });
  };

  const handleDeleteSubItem = (key: 'items' | 'slides', index: number) => {
    if (!currentEditingSection) return;
    const items = [...(currentEditingSection.content[key] || [])].filter((_, i) => i !== index);
    handleUpdateCurrentContent({ ...currentEditingSection.content, [key]: items });
  };

  // Modal Save Handlers
  const handleSavePartner = (data: PartnerData) => {
    if (!currentEditingSection) return;
    const items = [...(currentEditingSection.content.items || [])];
    if (partnerModal.editIndex !== null) {
      items[partnerModal.editIndex] = data;
    } else {
      items.push(data);
    }
    handleUpdateCurrentContent({ ...currentEditingSection.content, items });
    setPartnerModal({ isOpen: false, editIndex: null, data: null });
  };

  const handleSaveFaq = (data: FaqData) => {
    if (!currentEditingSection) return;
    const items = [...(currentEditingSection.content.items || [])];
    if (faqModal.editIndex !== null) {
      items[faqModal.editIndex] = data;
    } else {
      items.push(data);
    }
    handleUpdateCurrentContent({ ...currentEditingSection.content, items });
    setFaqModal({ isOpen: false, editIndex: null, data: null });
  };

  const handleSavePractice = (data: PracticeData) => {
    if (!currentEditingSection) return;
    const items = [...(currentEditingSection.content.items || [])];
    if (practiceModal.editIndex !== null) {
      items[practiceModal.editIndex] = data;
    } else {
      items.push(data);
    }
    handleUpdateCurrentContent({ ...currentEditingSection.content, items });
    setPracticeModal({ isOpen: false, editIndex: null, data: null });
  };

  const handleSaveTestimonial = (data: TestimonialData) => {
    if (!currentEditingSection) return;
    const items = [...(currentEditingSection.content.items || [])];
    if (testimonialModal.editIndex !== null) {
      items[testimonialModal.editIndex] = data;
    } else {
      items.push(data);
    }
    handleUpdateCurrentContent({ ...currentEditingSection.content, items });
    setTestimonialModal({ isOpen: false, editIndex: null, data: null });
  };

  const handleSaveStatistic = (data: StatisticData) => {
    if (!currentEditingSection) return;
    const items = [...(currentEditingSection.content.items || [])];
    if (statisticModal.editIndex !== null) {
      items[statisticModal.editIndex] = data;
    } else {
      items.push(data);
    }
    handleUpdateCurrentContent({ ...currentEditingSection.content, items });
    setStatisticModal({ isOpen: false, editIndex: null, data: null });
  };

  const handleSaveSlide = (data: SlideData) => {
    if (!currentEditingSection) return;
    const slides = [...(currentEditingSection.content.slides || [])];
    if (slideModal.editIndex !== null) {
      slides[slideModal.editIndex] = data;
    } else {
      slides.push(data);
    }
    handleUpdateCurrentContent({ ...currentEditingSection.content, slides });
    setSlideModal({ isOpen: false, editIndex: null, data: null });
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            <Link href="/admin/pages" className="hover:text-stone-900 inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Pages</span>
            </Link>
            <span>/</span>
            <span className="text-stone-900">{page.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif font-bold text-stone-900">{page.title}</h1>
            <AdminBadge variant={page.status === 'published' ? 'success' : 'neutral'}>
              {page.status}
            </AdminBadge>
            {!page.isVisible && <AdminBadge variant="warning">Hidden</AdminBadge>}
          </div>
          <p className="text-xs text-stone-400 font-mono mt-0.5">Route: /{page.slug}</p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccessNotice && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Saved Successfully</span>
            </span>
          )}

          <Link
            href={`/${page.slug}`}
            target="_blank"
            className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Page</span>
          </Link>

          <button
            type="button"
            onClick={handleSavePage}
            className="px-5 py-2 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-xs font-semibold uppercase tracking-wider text-stone-500">
        <button
          type="button"
          onClick={() => setActiveTab('sections')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'sections'
              ? 'border-legal-700 text-legal-900'
              : 'border-transparent hover:text-stone-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Page Sections ({page.sections.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('metadata')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'metadata'
              ? 'border-legal-700 text-legal-900'
              : 'border-transparent hover:text-stone-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>General Settings & Status</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'seo'
              ? 'border-legal-700 text-legal-900'
              : 'border-transparent hover:text-stone-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>SEO & Metadata</span>
        </button>
      </div>

      {/* TAB 1: SECTION BUILDER */}
      {activeTab === 'sections' && (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Section List (Left Column) */}
          <div className="lg:col-span-5">
            <SectionList
              sections={page.sections}
              selectedSectionId={editingSectionId}
              previewSectionId={previewSectionId}
              onSelectSection={handleSelectSection}
              onOpenLibrary={() => setSectionModalOpen(true)}
              onMoveSection={handleMoveSection}
              onToggleVisibility={handleToggleSectionVisibility}
              onDuplicateSection={handleDuplicateSection}
              onRequestDeleteSection={(id) => setDeleteSectionTargetId(id)}
              onTogglePreview={(id) => setPreviewSectionId(previewSectionId === id ? null : id)}
            />
          </div>

          {/* Section Inspector (Right Column) */}
          <div className="lg:col-span-7">
            {currentEditingSection ? (
              <SectionInspector
                section={currentEditingSection}
                onUpdateContent={handleUpdateCurrentContent}
                onUpdateSettings={handleUpdateCurrentSettings}
                onUpdateName={handleUpdateCurrentName}
                onToggleReusable={handleToggleSectionReusable}
                onOpenPartnerModal={(index, data) => setPartnerModal({ isOpen: true, editIndex: index ?? null, data: data ?? null })}
                onOpenFaqModal={(index, data) => setFaqModal({ isOpen: true, editIndex: index ?? null, data: data ?? null })}
                onOpenPracticeModal={(index, data) => setPracticeModal({ isOpen: true, editIndex: index ?? null, data: data ?? null })}
                onOpenTestimonialModal={(index, data) => setTestimonialModal({ isOpen: true, editIndex: index ?? null, data: data ?? null })}
                onOpenStatisticModal={(index, data) => setStatisticModal({ isOpen: true, editIndex: index ?? null, data: data ?? null })}
                onOpenSlideModal={(index, data) => setSlideModal({ isOpen: true, editIndex: index ?? null, data: data ?? null })}
                onDeleteItem={handleDeleteSubItem}
                onMoveItem={handleMoveSubItem}
              />
            ) : (
              <div className="p-12 text-center bg-white rounded-xl border border-stone-200 text-stone-400">
                <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="font-serif">Select a section on the left to edit its content and styling.</p>
              </div>
            )}

            {/* Live Section Preview Box */}
            {previewSectionId && (
              <div className="mt-8 bg-white rounded-xl border border-stone-200 overflow-hidden shadow-lg">
                <div className="bg-legal-950 text-white px-4 py-2.5 flex items-center justify-between text-xs font-mono">
                  <span>Isolated Section Live Preview</span>
                  <button
                    type="button"
                    onClick={() => setPreviewSectionId(null)}
                    className="text-stone-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-2 border-t border-stone-200">
                  {page.sections.find((s) => s.id === previewSectionId) && (
                    <SectionRenderer
                      section={page.sections.find((s) => s.id === previewSectionId)!}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: METADATA & PUBLISHING RULES */}
      {activeTab === 'metadata' && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs max-w-3xl space-y-6">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Page Attributes & Publishing Rules
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Page Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. International Arbitration"
                value={page.title ?? ''}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                className="w-full px-4 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                URL Slug *
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-stone-100 text-stone-500 text-xs border border-r-0 border-stone-300 rounded-l-lg font-mono">
                  /
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. international-arbitration"
                  value={page.slug ?? ''}
                  onChange={(e) => setPage({ ...page, slug: e.target.value.toLowerCase().replace(/[^\w-]/g, '') })}
                  className="w-full px-4 py-2 text-sm rounded-r-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700 font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Page Template Blueprint
            </label>
            <select
              value={page.template}
              onChange={(e) => setPage({ ...page, template: e.target.value })}
              className="w-full px-4 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700 bg-white"
            >
              <option value="Standard content">Standard content</option>
              <option value="Landing page">Landing page</option>
              <option value="Practice area listing">Practice area listing</option>
              <option value="Practice area detail">Practice area detail</option>
              <option value="Partner listing">Partner listing</option>
              <option value="Partner profile">Partner profile</option>
              <option value="Blog listing">Blog listing</option>
              <option value="Blog detail">Blog detail</option>
              <option value="Contact">Contact</option>
              <option value="FAQ">FAQ</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Page Description
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Overview of Vanguard & Sterling's cross-border arbitration practice and tribunal representations..."
              value={page.description ?? ''}
              onChange={(e) => setPage({ ...page, description: e.target.value })}
              className="w-full px-4 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700"
            />
          </div>

          <div>
            <ImageUploadField
              label="Page Featured Image (Header Banner / Share Fallback)"
              value={page.featuredImage}
              onChange={(url) => setPage({ ...page, featuredImage: url })}
              aspectRatio="wide"
              recommendedSize="1200 x 630px"
              description="Primary banner asset and fallback social media preview image for this page."
            />
          </div>

          <div className="pt-4 border-t border-stone-100 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Publication Status (Principle 5)
              </label>
              <select
                value={page.status}
                onChange={(e) => setPage({ ...page, status: e.target.value as any })}
                className="w-full px-4 py-2 text-sm rounded-lg border border-stone-300 bg-white"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Visibility Setting (Principle 4)
              </label>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="page-vis-cb"
                  checked={page.isVisible}
                  onChange={(e) => setPage({ ...page, isVisible: e.target.checked })}
                  className="rounded text-legal-700 w-4 h-4"
                />
                <label htmlFor="page-vis-cb" className="text-xs font-medium text-stone-700">
                  Page is visible in navigation & public routing
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SEO & METADATA */}
      {activeTab === 'seo' && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs max-w-3xl space-y-6">
          <h2 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
            Search Engine & OpenGraph Metadata
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              SEO Meta Title
            </label>
            <input
              type="text"
              placeholder={`e.g. ${page.title || 'Page Title'} | Vanguard & Sterling LLP`}
              value={page.seo?.title ?? ''}
              onChange={(e) =>
                setPage({
                  ...page,
                  seo: {
                    robotsIndex: true,
                    robotsFollow: true,
                    ...page.seo,
                    title: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Meta Description
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Leading counsel for multinational arbitrations, enterprise reorganizations, and appellate briefs..."
              value={page.seo?.description ?? ''}
              onChange={(e) =>
                setPage({
                  ...page,
                  seo: {
                    robotsIndex: true,
                    robotsFollow: true,
                    ...page.seo,
                    description: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Canonical URL
            </label>
            <input
              type="text"
              placeholder={`e.g. https://vanguardsterling.com/${page.slug || ''}`}
              value={page.seo?.canonicalUrl ?? ''}
              onChange={(e) =>
                setPage({
                  ...page,
                  seo: {
                    robotsIndex: true,
                    robotsFollow: true,
                    ...page.seo,
                    canonicalUrl: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700 font-mono text-xs"
            />
          </div>

          <div className="pt-2">
            <ImageUploadField
              label="OpenGraph Social Sharing Card (og:image)"
              value={page.seo?.ogImage}
              onChange={(url) =>
                setPage({
                  ...page,
                  seo: {
                    robotsIndex: true,
                    robotsFollow: true,
                    ...page.seo,
                    ogImage: url,
                  },
                })
              }
              aspectRatio="wide"
              recommendedSize="1200 x 630px (Aspect 1.91:1)"
              description="Upload the exact preview card image shown when this page is shared on LinkedIn, X/Twitter, or Facebook."
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="no-index-cb"
              checked={page.seo?.robotsIndex === false}
              onChange={(e) =>
                setPage({
                  ...page,
                  seo: {
                    robotsFollow: true,
                    ...page.seo,
                    robotsIndex: !e.target.checked,
                  },
                })
              }
              className="rounded text-legal-700 w-4 h-4"
            />
            <label htmlFor="no-index-cb" className="text-xs font-medium text-stone-700">
              Disallow Indexing (Instruct search engine robots not to index this page)
            </label>
          </div>
        </div>
      )}

      {/* Modals */}
      <PartnerModal
        isOpen={partnerModal.isOpen}
        initialData={partnerModal.data}
        onSave={handleSavePartner}
        onClose={() => setPartnerModal({ isOpen: false, editIndex: null, data: null })}
      />

      <FaqModal
        isOpen={faqModal.isOpen}
        initialData={faqModal.data}
        onSave={handleSaveFaq}
        onClose={() => setFaqModal({ isOpen: false, editIndex: null, data: null })}
      />

      <PracticeModal
        isOpen={practiceModal.isOpen}
        initialData={practiceModal.data}
        onSave={handleSavePractice}
        onClose={() => setPracticeModal({ isOpen: false, editIndex: null, data: null })}
      />

      <TestimonialModal
        isOpen={testimonialModal.isOpen}
        initialData={testimonialModal.data}
        onSave={handleSaveTestimonial}
        onClose={() => setTestimonialModal({ isOpen: false, editIndex: null, data: null })}
      />

      <StatisticModal
        isOpen={statisticModal.isOpen}
        initialData={statisticModal.data}
        onSave={handleSaveStatistic}
        onClose={() => setStatisticModal({ isOpen: false, editIndex: null, data: null })}
      />

      <SlideModal
        isOpen={slideModal.isOpen}
        initialData={slideModal.data}
        onSave={handleSaveSlide}
        onClose={() => setSlideModal({ isOpen: false, editIndex: null, data: null })}
      />

      <SectionLibraryModal
        isOpen={sectionModalOpen}
        onSelect={handleAddSectionFromLibrary}
        onClose={() => setSectionModalOpen(false)}
        currentTemplate={page.template}
      />

      {/* Delete Section Confirm Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteSectionTargetId)}
        onClose={() => setDeleteSectionTargetId(null)}
        onConfirm={handleDeleteSectionConfirm}
        title="Remove Section"
        description="Are you sure you want to remove this section from the page? Any unsaved edits will be discarded."
        confirmLabel="Remove Section"
        danger={true}
      />
    </div>
  );
}

// Helpers for default labels & contents
function getDefaultNameForType(type: SectionType): string {
  switch (type) {
    // Template 2 Specific
    case 't2-hero': return 'Orbital Practice Area Hero';
    case 't2-highlights': return 'Statutory Practice Highlights';
    case 't2-ticker': return 'Practice Marquee Ticker';
    case 't2-statistics': return 'Chambers Benchmarks & Stats';
    case 't2-overview': return 'Institutional Milestones Timeline';
    case 't2-practice-areas': return '13 Codified Practice Drawers';
    case 't2-foreword': return "Founder's Foreword Address";
    case 't2-partners': return 'Partners & Senior Counsel';
    case 't2-faq': return 'Categorized Statutory FAQs';
    case 't2-judgments': return 'Supreme Court Reported Judgments';
    case 't2-contact': return 'Kathmandu Chambers Consultation';

    // Template 1 & Shared
    case 'hero': return 'Hero Header';
    case 'slider':
    case 'carousel': return 'Case Showcase Carousel';
    case 'richText': return 'Editorial Overview';
    case 'introduction': return 'Managing Partner Address';
    case 'practiceAreas': return 'Core Practice Disciplines';
    case 'partners': return 'Senior Partners';
    case 'testimonials': return 'Client Accolades';
    case 'faq': return 'Frequently Asked Questions';
    case 'cta': return 'Call to Action';
    case 'contact': return 'Office & Inquiries';
    case 'latestArticles': return 'Recent Publications';
    case 'gallery': return 'Firm Gallery';
    case 'statistics': return 'Firm Benchmarks';
    default: return 'New Section';
  }
}

function getDefaultContentForType(type: SectionType): Record<string, any> {
  switch (type) {
    // Template 2 Section Defaults
    case 't2-hero':
      return {
        eyebrow: 'RAMSHAH PATH, KATHMANDU',
        nepaliEyebrow: 'न्याय',
        headlineLine1: 'Defending for',
        headlineLine2: 'impartial justice.',
        lead: 'A full-service law firm practising in Nepal since 1998 — in the courts, and in the drafting of the statutes those courts apply.',
        primaryCtaLabel: 'Contact the Firm',
        primaryCtaHref: '#contact',
        secondaryCtaLabel: 'Our Practice',
        secondaryCtaHref: '#practice-areas',
      };
    case 't2-highlights':
      return {
        eyebrow: 'Law Chambers · Core Mandates',
        heading: 'Principal areas of statutory & courtroom practice.',
        description: 'Select a principal practice group below to examine the governing Nepali statute and scope of representation.',
      };
    case 't2-ticker':
      return { title: 'Practice Marquee Ticker' };
    case 't2-statistics':
      return { title: 'Firm Benchmarks & Key Metrics' };
    case 't2-overview':
      return {
        eyebrow: '01 / THE FIRM',
        heading: 'An enduring tradition of disciplined legal scholarship and courtroom advocacy.',
        leadParagraph: 'Law Chambers & Legal Research was established with a singular premise: that effective advocacy before the courts of Nepal requires rigorous preparation in primary statutory texts, comparative jurisprudence, and procedural discipline.',
      };
    case 't2-practice-areas':
      return {
        eyebrow: '02 / What We Do',
        heading: 'Practice areas.',
        description: 'Our chambers provide advisory, transactional, and courtroom representation across thirteen codified areas of Nepali law.',
      };
    case 't2-foreword':
      return {
        eyebrow: '03 / FOREWORD',
        heading: 'A word from our founder.',
        pullQuote: '“Law is not only about resolving disputes. It is about building trust, protecting rights, and advancing society.”',
        founderName: 'Devendra Raj Acharya',
        nepaliName: 'वरिष्ठ अधिवक्ता देवेन्द्र राज आचार्य',
        designation: 'Senior Advocate, Founder and Senior Partner',
        credentials: 'B.L. (Tribhuvan University), LL.M. (Constitutional & Commercial Law)',
      };
    case 't2-partners':
      return {
        eyebrow: '04 / The Partners',
        heading: 'Partners & senior counsel.',
        description: 'Each brief accepted by our chambers is supervised directly by a partner admitted to practice before the Courts of Nepal.',
      };
    case 't2-faq':
      return {
        eyebrow: '05 / Questions & Statutory Guidance',
        heading: 'Frequently asked questions.',
        description: 'Responses below outline general statutory procedures under Nepali law for informational reference only.',
      };
    case 't2-judgments':
      return {
        eyebrow: '06 / From the Record',
        heading: 'Selected Supreme Court judgments.',
        description: 'A curated index of reported decisions published in the Nepal Kanoon Patrika (NKP) of relevance to civil transactions and commercial arbitration.',
      };
    case 't2-contact':
      return {
        eyebrow: '07 / Confidential Consultation',
        heading: 'Inquire with our chambers in Kathmandu.',
        description: 'To arrange an in-person or virtual legal consultation, please contact the chambers secretariat by telephone or written correspondence.',
      };
    case 'hero':
      return {
        headline: 'Decisive Legal Counsel',
        subheadline: 'Vanguard & Sterling',
        description: 'Providing strategic counsel to global corporations and high-net-worth clients.',
        primaryButtonLabel: 'Schedule Consultation',
        primaryButtonUrl: '/contact',
      };
    case 'slider':
    case 'carousel':
      return {
        title: 'Institutional Showcase',
        description: 'Defining precedents and high-stakes legal outcomes.',
        autoplay: true,
        interval: 5000,
        showArrows: true,
        showDots: true,
        slides: [
          {
            id: 'slide-1',
            title: 'Counsel of Distinction. Unyielding Defense.',
            subtitle: 'Global Corporate & Appellate Advocacy',
            description: 'Vanguard & Sterling LLP delivers resolute strategic counsel to multinational enterprises.',
            desktopImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=80',
            ctaLabel: 'Explore Practice Areas',
            ctaUrl: '/practice',
          },
        ],
      };
    case 'richText':
      return {
        title: 'Section Overview',
        htmlContent: '<p>Enter your editorial content, jurisprudence briefs, or statutory analysis here.</p>',
      };
    case 'introduction':
      return {
        eyebrow: 'Institutional Ethos',
        title: 'Precision in Advocacy',
        paragraphs: ['Founded on principles of uncompromised diligence and partner devotion.'],
        signatureName: 'Senior Managing Partner',
      };
    case 'partners':
      return {
        eyebrow: 'Leadership',
        title: 'Senior Partners',
        description: 'Our partners combine prestigious judicial clerkships, federal agency leadership, and decades of trial mastery.',
        autoplay: true,
        interval: 4500,
        showArrows: true,
        showDots: true,
        items: [
          {
            id: `p-${Date.now()}`,
            name: 'Eleanor Sterling',
            role: 'Senior Managing Partner',
            slug: 'eleanor-sterling',
            imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            bio: 'Former clerk for the U.S. Second Circuit Court of Appeals and veteran corporate strategist.',
            email: 'e.sterling@vanguardsterling.com',
            phone: '+1 (212) 555-0101',
          },
        ],
      };
    case 'cta':
      return {
        title: 'Initiate a Confidential Matter Assessment',
        description: 'Our senior partners review all inquiries under strict discretion.',
        primaryButtonLabel: 'Contact the Firm',
        primaryButtonUrl: '/contact',
      };
    case 'faq':
      return {
        title: 'Frequently Asked Questions',
        items: [
          {
            id: 'faq-1',
            question: 'How are potential conflicts of interest evaluated?',
            answer: 'Our ethics committee executes comprehensive electronic registry checks before engagement.',
          },
        ],
      };
    case 'practiceAreas':
      return {
        eyebrow: 'Disciplines',
        title: 'Core Practice Domains',
        description: 'Focusing on high-consequence matters where strategic acumen dictates the outcome.',
        items: [
          {
            id: 'pa-1',
            title: 'Corporate Governance & M&A',
            slug: 'corporate-governance',
            shortDescription: 'Advising public and private boards on complex transactional architecture.',
          },
        ],
      };
    case 'testimonials':
      return {
        eyebrow: 'Reputation',
        title: 'Client Accolades',
        description: 'What corporate leadership and general counsels say regarding our advocacy.',
        items: [
          {
            id: 't-1',
            quote: 'Vanguard & Sterling provided decisive clarity during our most contentious regulatory challenge.',
            author: 'David Vance',
            title: 'General Counsel',
            organization: 'Fortune 100 Enterprise',
          },
        ],
      };
    case 'statistics':
      return {
        eyebrow: 'Distinction in Numbers',
        title: 'Firm Benchmarks',
        description: 'Measured not by sheer volume of attorneys, but by decisive victories and enterprise-preserving outcomes.',
        items: [
          { value: '48+', label: 'Years in Practice', sublabel: 'Est. 1978 in New York' },
          { value: '98%', label: 'Federal Affirmance Rate', sublabel: 'Across federal circuit matters' },
        ],
      };
    default:
      return { title: 'New Section Content' };
  }
}
