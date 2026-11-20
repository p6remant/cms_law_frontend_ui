'use client';

import React, { useState, useEffect } from 'react';
import { PageSection, SectionType } from '@/types/cms';
import { ImageUploadField } from '@/components/admin/common/ImageUploadField';
import {
  Settings,
  Share2,
  AlertTriangle,
  ListOrdered,
  FileText,
  Palette,
  Plus,
  User,
  HelpCircle,
  Briefcase,
  Quote,
  BarChart2,
  Sliders,
  MoveUp,
  MoveDown,
  Edit2,
  Trash2,
} from 'lucide-react';

export function isCollectionSection(type?: SectionType): boolean {
  if (!type) return false;
  return ['partners', 'faq', 'practiceAreas', 'testimonials', 'statistics', 'slider', 'carousel'].includes(type);
}

interface SectionInspectorProps {
  section: PageSection;
  onUpdateContent: (newContent: any) => void;
  onUpdateSettings: (newSettings: any) => void;
  onUpdateName: (name: string) => void;
  onToggleReusable: () => void;
  onOpenPartnerModal: (index?: number, data?: any) => void;
  onOpenFaqModal: (index?: number, data?: any) => void;
  onOpenPracticeModal: (index?: number, data?: any) => void;
  onOpenTestimonialModal: (index?: number, data?: any) => void;
  onOpenStatisticModal: (index?: number, data?: any) => void;
  onOpenSlideModal: (index?: number, data?: any) => void;
  onDeleteItem: (key: 'items' | 'slides', index: number) => void;
  onMoveItem: (key: 'items' | 'slides', index: number, direction: 'up' | 'down') => void;
}

export const SectionInspector: React.FC<SectionInspectorProps> = ({
  section,
  onUpdateContent,
  onUpdateSettings,
  onUpdateName,
  onToggleReusable,
  onOpenPartnerModal,
  onOpenFaqModal,
  onOpenPracticeModal,
  onOpenTestimonialModal,
  onOpenStatisticModal,
  onOpenSlideModal,
  onDeleteItem,
  onMoveItem,
}) => {
  const isCollection = isCollectionSection(section.type);
  const [subTab, setSubTab] = useState<'items' | 'content' | 'settings'>(
    isCollection ? 'items' : 'content'
  );

  useEffect(() => {
    if (isCollection) {
      setSubTab('items');
    } else {
      setSubTab('content');
    }
  }, [section.id, isCollection]);

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Inspector Top Bar */}
      <div className="p-5 border-b border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold text-legal-700 tracking-wider">
              Section Inspector
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-[11px] font-mono text-stone-500 font-semibold uppercase">
              {section.type}
            </span>
          </div>
          <h2 className="text-lg font-serif font-bold text-stone-900">{section.name}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleReusable}
            className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border transition-colors flex items-center gap-1.5 ${
              section.isReusable
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{section.isReusable ? 'Shared (Global)' : 'Page Specific'}</span>
          </button>
        </div>
      </div>

      {/* Reusable Section Warning */}
      {section.isReusable && (
        <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200 text-xs text-amber-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            <strong>Shared Record (Section 7.5):</strong> Changes here update all pages referencing this shared record.
          </span>
        </div>
      )}

      {/* Sub-Tabs */}
      <div className="flex border-b border-stone-200 px-5 gap-6 text-xs font-semibold uppercase tracking-wider bg-white">
        {isCollection && (
          <button
            type="button"
            onClick={() => setSubTab('items')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              subTab === 'items'
                ? 'border-legal-700 text-legal-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>
              {section.type === 'partners'
                ? `Partners (${section.content.items?.length || 0})`
                : section.type === 'faq'
                ? `Questions (${section.content.items?.length || 0})`
                : section.type === 'practiceAreas'
                ? `Practices (${section.content.items?.length || 0})`
                : section.type === 'slider' || section.type === 'carousel'
                ? `Slides (${section.content.slides?.length || 0})`
                : `Items (${section.content.items?.length || 0})`}
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setSubTab('content')}
          className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
            subTab === 'content'
              ? 'border-legal-700 text-legal-900 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Headings & Copy</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('settings')}
          className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
            subTab === 'settings'
              ? 'border-legal-700 text-legal-900 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Layout & Styling</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SUB-TAB 1: COLLECTION ITEMS */}
      {/* ========================================================= */}
      {subTab === 'items' && isCollection && (
        <div className="p-6 space-y-4">
          {/* PARTNERS */}
          {section.type === 'partners' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-900">
                    Partners in Carousel
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Cards displayed in the Senior Partners automatic sliding carousel
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenPartnerModal()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Partner</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {section.content.items && section.content.items.length > 0 ? (
                  section.content.items.map((partner: any, pIdx: number) => (
                    <div
                      key={partner.id || pIdx}
                      className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between hover:bg-stone-100/70 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-300 shadow-xs">
                          {partner.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={partner.imageUrl} alt={partner.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                              <User className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-stone-200 text-stone-700 text-[10px] font-mono font-bold flex items-center justify-center">
                              {pIdx + 1}
                            </span>
                            <h5 className="text-xs font-bold text-stone-900">
                              {partner.name || 'Unnamed Partner'}
                            </h5>
                          </div>
                          <p className="text-[11px] text-legal-700 font-medium mt-0.5">
                            {partner.role || 'Partner'}
                          </p>
                          <p className="text-[10px] text-stone-400 font-mono">{partner.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={pIdx === 0}
                          onClick={() => onMoveItem('items', pIdx, 'up')}
                          className="p-1.5 rounded text-stone-400 hover:text-stone-800 disabled:opacity-20"
                          title="Move up"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={pIdx === section.content.items.length - 1}
                          onClick={() => onMoveItem('items', pIdx, 'down')}
                          className="p-1.5 rounded text-stone-400 hover:text-stone-800 disabled:opacity-20"
                          title="Move down"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenPartnerModal(pIdx, partner)}
                          className="p-1.5 rounded bg-white text-stone-600 hover:text-legal-900 border border-stone-200"
                          title="Edit Partner Card"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteItem('items', pIdx)}
                          className="p-1.5 rounded bg-white text-stone-400 hover:text-red-600 border border-stone-200"
                          title="Remove Partner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                    <User className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-stone-700">No partners in this carousel yet</p>
                    <p className="text-xs text-stone-400 mt-1 mb-3">Click &quot;Add Partner&quot; to open the modal.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FAQ */}
          {section.type === 'faq' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-900">FAQ Questions</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Interactive accordion Q&A pairs</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenFaqModal()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Question</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {section.content.items && section.content.items.length > 0 ? (
                  section.content.items.map((item: any, fIdx: number) => (
                    <div
                      key={item.id || fIdx}
                      className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between hover:bg-stone-100/70"
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded bg-stone-200 text-stone-700 text-[10px] font-mono font-bold flex items-center justify-center">
                            {fIdx + 1}
                          </span>
                          <h5 className="text-xs font-bold text-stone-900 line-clamp-1">{item.question}</h5>
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-1 pl-6">{item.answer}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          disabled={fIdx === 0}
                          onClick={() => onMoveItem('items', fIdx, 'up')}
                          className="p-1.5 rounded text-stone-400 hover:text-stone-800 disabled:opacity-20"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={fIdx === section.content.items.length - 1}
                          onClick={() => onMoveItem('items', fIdx, 'down')}
                          className="p-1.5 rounded text-stone-400 hover:text-stone-800 disabled:opacity-20"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenFaqModal(fIdx, item)}
                          className="p-1.5 rounded bg-white text-stone-600 hover:text-legal-900 border border-stone-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteItem('items', fIdx)}
                          className="p-1.5 rounded bg-white text-stone-400 hover:text-red-600 border border-stone-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                    <HelpCircle className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-xs text-stone-500">No FAQ questions added yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PRACTICE AREAS */}
          {section.type === 'practiceAreas' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-900">Practice Disciplines</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Legal practice cards and areas of focus</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenPracticeModal()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Discipline</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {section.content.items && section.content.items.length > 0 ? (
                  section.content.items.map((item: any, pIdx: number) => (
                    <div
                      key={item.id || pIdx}
                      className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between hover:bg-stone-100/70"
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded bg-stone-200 text-stone-700 text-[10px] font-mono font-bold flex items-center justify-center">
                            {pIdx + 1}
                          </span>
                          <h5 className="text-xs font-bold text-stone-900">{item.title}</h5>
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-1 pl-6">{item.shortDescription}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          disabled={pIdx === 0}
                          onClick={() => onMoveItem('items', pIdx, 'up')}
                          className="p-1.5 rounded text-stone-400 hover:text-stone-800 disabled:opacity-20"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={pIdx === section.content.items.length - 1}
                          onClick={() => onMoveItem('items', pIdx, 'down')}
                          className="p-1.5 rounded text-stone-400 hover:text-stone-800 disabled:opacity-20"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenPracticeModal(pIdx, item)}
                          className="p-1.5 rounded bg-white text-stone-600 hover:text-legal-900 border border-stone-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteItem('items', pIdx)}
                          className="p-1.5 rounded bg-white text-stone-400 hover:text-red-600 border border-stone-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                    <Briefcase className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-xs text-stone-500">No practice areas added yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TESTIMONIALS */}
          {section.type === 'testimonials' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-900">Client Accolades</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Approved quotations from corporate counsel and clients</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenTestimonialModal()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Accolade</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {section.content.items && section.content.items.length > 0 ? (
                  section.content.items.map((item: any, tIdx: number) => (
                    <div
                      key={item.id || tIdx}
                      className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between hover:bg-stone-100/70"
                    >
                      <div className="flex-1 pr-4">
                        <p className="text-xs italic text-stone-800 line-clamp-1">&ldquo;{item.quote}&rdquo;</p>
                        <p className="text-[11px] font-semibold text-legal-700 mt-1">
                          {item.author} — <span className="font-normal text-stone-500">{item.title}, {item.organization}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => onOpenTestimonialModal(tIdx, item)}
                          className="p-1.5 rounded bg-white text-stone-600 hover:text-legal-900 border border-stone-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteItem('items', tIdx)}
                          className="p-1.5 rounded bg-white text-stone-400 hover:text-red-600 border border-stone-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                    <Quote className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-xs text-stone-500">No client accolades added yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STATISTICS */}
          {section.type === 'statistics' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-900">Firm Benchmarks</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Substantiated figures, affirmance rates, and metrics</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenStatisticModal()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Benchmark</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {section.content.items && section.content.items.length > 0 ? (
                  section.content.items.map((item: any, sIdx: number) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between hover:bg-stone-100/70"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base font-serif font-bold text-legal-800">{item.value || '0'}</span>
                        <div>
                          <h5 className="text-xs font-bold text-stone-900">{item.label}</h5>
                          {item.sublabel && <p className="text-[10px] text-stone-400">{item.sublabel}</p>}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenStatisticModal(sIdx, item)}
                          className="p-1.5 rounded bg-white text-stone-600 hover:text-legal-900 border border-stone-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteItem('items', sIdx)}
                          className="p-1.5 rounded bg-white text-stone-400 hover:text-red-600 border border-stone-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                    <BarChart2 className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-xs text-stone-500">No firm benchmarks added yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SLIDER / CAROUSEL */}
          {(section.type === 'slider' || section.type === 'carousel') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-900">Slides in Carousel</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Hero carousel slides with photography and CTA</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenSlideModal()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Slide</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {section.content.slides && section.content.slides.length > 0 ? (
                  section.content.slides.map((slide: any, sIdx: number) => (
                    <div
                      key={slide.id || sIdx}
                      className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between hover:bg-stone-100/70"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={slide.desktopImage} alt={slide.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-stone-900 line-clamp-1">{slide.title || 'Untitled Slide'}</h5>
                          <p className="text-[10px] text-stone-400 font-mono">{slide.subtitle || slide.ctaLabel}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenSlideModal(sIdx, slide)}
                          className="p-1.5 rounded bg-white text-stone-600 hover:text-legal-900 border border-stone-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteItem('slides', sIdx)}
                          className="p-1.5 rounded bg-white text-stone-400 hover:text-red-600 border border-stone-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                    <Sliders className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-xs text-stone-500">No slides configured yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-TAB 2: HEADINGS & COPY */}
      {/* ========================================================= */}
      {subTab === 'content' && (
        <div className="p-6 space-y-4">
          {/* Heading (Template 2) */}
          {section.content.heading !== undefined && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Section Heading</label>
              <input
                type="text"
                placeholder="e.g. Practice areas."
                value={section.content.heading ?? ''}
                onChange={(e) => onUpdateContent({ ...section.content, heading: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>
          )}

          {/* 2-Line Hero Display Headlines */}
          {section.content.headlineLine1 !== undefined && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Display Line 1</label>
                <input
                  type="text"
                  placeholder="e.g. Defending for"
                  value={section.content.headlineLine1 ?? ''}
                  onChange={(e) => onUpdateContent({ ...section.content, headlineLine1: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Display Line 2 (Italic Accent)</label>
                <input
                  type="text"
                  placeholder="e.g. impartial justice."
                  value={section.content.headlineLine2 ?? ''}
                  onChange={(e) => onUpdateContent({ ...section.content, headlineLine2: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                />
              </div>
            </div>
          )}

          {/* Headline or Section Title */}
          {(section.content.title !== undefined || section.content.headline !== undefined) && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {section.content.headline !== undefined ? 'Headline' : 'Section Title'}
              </label>
              <input
                type="text"
                placeholder="e.g. Decisive Strategic Counsel"
                value={
                  section.content.headline !== undefined
                    ? section.content.headline ?? ''
                    : section.content.title ?? ''
                }
                onChange={(e) => {
                  if (section.content.headline !== undefined) {
                    onUpdateContent({ ...section.content, headline: e.target.value });
                  } else {
                    onUpdateContent({ ...section.content, title: e.target.value });
                  }
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>
          )}

          {/* Subheadline or Eyebrow */}
          {(section.content.eyebrow !== undefined || section.content.subheadline !== undefined) && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {section.content.subheadline !== undefined ? 'Subheadline' : 'Eyebrow / Category Tag'}
              </label>
              <input
                type="text"
                placeholder="e.g. Institutional Ethos"
                value={
                  section.content.subheadline !== undefined
                    ? section.content.subheadline ?? ''
                    : section.content.eyebrow ?? ''
                }
                onChange={(e) => {
                  if (section.content.subheadline !== undefined) {
                    onUpdateContent({ ...section.content, subheadline: e.target.value });
                  } else {
                    onUpdateContent({ ...section.content, eyebrow: e.target.value });
                  }
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>
          )}

          {/* Description */}
          {section.content.description !== undefined && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Description / Narrative</label>
              <textarea
                rows={3}
                placeholder="e.g. Providing counsel of distinction to multinational corporations and high-net-worth clients..."
                value={section.content.description ?? ''}
                onChange={(e) => onUpdateContent({ ...section.content, description: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700 leading-relaxed"
              />
            </div>
          )}

          {/* Lead Paragraph */}
          {section.content.lead !== undefined && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Lead Introductory Text</label>
              <textarea
                rows={2}
                placeholder="e.g. A full-service law firm practising in Nepal since 1998..."
                value={section.content.lead ?? ''}
                onChange={(e) => onUpdateContent({ ...section.content, lead: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
              />
            </div>
          )}

          {/* Pull Quote */}
          {section.content.pullQuote !== undefined && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Pull Quote / Creed</label>
              <textarea
                rows={2}
                placeholder="e.g. “Law is not only about resolving disputes. It is about building trust...”"
                value={section.content.pullQuote ?? ''}
                onChange={(e) => onUpdateContent({ ...section.content, pullQuote: e.target.value })}
                className="w-full px-3 py-2 text-xs italic rounded-lg border border-stone-300 font-serif"
              />
            </div>
          )}

          {/* Devanagari / Nepali Subtitle / Watermark */}
          {(section.content.nepaliEyebrow !== undefined || section.content.nepaliName !== undefined) && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nepali Subtitle / Devanagari Watermark</label>
              <input
                type="text"
                placeholder="e.g. न्याय or ल चेम्बर्स एण्ड रिसर्च सेन्टर"
                value={section.content.nepaliEyebrow ?? section.content.nepaliName ?? ''}
                onChange={(e) => {
                  if (section.content.nepaliEyebrow !== undefined) {
                    onUpdateContent({ ...section.content, nepaliEyebrow: e.target.value });
                  } else {
                    onUpdateContent({ ...section.content, nepaliName: e.target.value });
                  }
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 font-sans"
              />
            </div>
          )}

          {/* Primary & Secondary Buttons (Template 2) */}
          {section.content.primaryCtaLabel !== undefined && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Primary Button Label</label>
                <input
                  type="text"
                  placeholder="e.g. Contact the Firm"
                  value={section.content.primaryCtaLabel ?? ''}
                  onChange={(e) => onUpdateContent({ ...section.content, primaryCtaLabel: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Primary Button Link</label>
                <input
                  type="text"
                  placeholder="e.g. #contact"
                  value={section.content.primaryCtaHref ?? ''}
                  onChange={(e) => onUpdateContent({ ...section.content, primaryCtaHref: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 font-mono"
                />
              </div>
            </div>
          )}

          {section.content.secondaryCtaLabel !== undefined && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Secondary Button Label</label>
                <input
                  type="text"
                  placeholder="e.g. Our Practice"
                  value={section.content.secondaryCtaLabel ?? ''}
                  onChange={(e) => onUpdateContent({ ...section.content, secondaryCtaLabel: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Secondary Button Link</label>
                <input
                  type="text"
                  placeholder="e.g. #practice-areas"
                  value={section.content.secondaryCtaHref ?? ''}
                  onChange={(e) => onUpdateContent({ ...section.content, secondaryCtaHref: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 font-mono"
                />
              </div>
            </div>
          )}

          {/* Section Image Upload (Hero, Introduction, Gallery) */}
          {(section.content.imageUrl !== undefined ||
            section.type === 'hero' ||
            section.type === 'introduction' ||
            section.type === 'gallery') && (
            <div className="pt-2">
              <ImageUploadField
                label="Section Photography / Imagery"
                value={section.content.imageUrl}
                onChange={(url) => onUpdateContent({ ...section.content, imageUrl: url })}
                aspectRatio={section.type === 'introduction' ? 'portrait' : 'wide'}
                recommendedSize={section.type === 'introduction' ? '800 x 1000px' : '1600 x 900px'}
                description="Upload photography for hero backdrops, partner portraits, or editorial layouts."
              />
            </div>
          )}

          {/* RichText HTML body */}
          {section.content.htmlContent !== undefined && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                HTML Body (Sanitized)
              </label>
              <textarea
                rows={6}
                placeholder="<p>Enter formatted editorial jurisprudence, case digests, or statutory text here...</p>"
                value={section.content.htmlContent ?? ''}
                onChange={(e) => onUpdateContent({ ...section.content, htmlContent: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
            </div>
          )}

          {/* Primary CTA Buttons */}
          {section.content.primaryButtonLabel !== undefined && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">CTA Label</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule Consultation"
                  value={section.content.primaryButtonLabel ?? ''}
                  onChange={(e) => onUpdateContent({ ...section.content, primaryButtonLabel: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">CTA URL</label>
                <input
                  type="text"
                  placeholder="e.g. /contact"
                  value={section.content.primaryButtonUrl ?? ''}
                  onChange={(e) => onUpdateContent({ ...section.content, primaryButtonUrl: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 font-mono"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-TAB 3: LAYOUT & STYLING */}
      {/* ========================================================= */}
      {subTab === 'settings' && (
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Internal Section Label
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Partners Carousel"
              value={section.name ?? ''}
              onChange={(e) => onUpdateName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-legal-700"
            />
            <p className="text-[11px] text-stone-400 mt-1">Used to identify this section in the CMS admin.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Container Width</label>
              <select
                value={section.settings.containerWidth || 'normal'}
                onChange={(e) => onUpdateSettings({ containerWidth: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="normal">Normal</option>
                <option value="narrow">Narrow (Editorial)</option>
                <option value="wide">Wide</option>
                <option value="full">Full Bleed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Background Style</label>
              <select
                value={section.settings.backgroundColor || '#ffffff'}
                onChange={(e) => onUpdateSettings({ backgroundColor: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
              >
                <option value="#ffffff">Pure White</option>
                <option value="#fbfbfa">Warm Law Neutral (#fbfbfa)</option>
                <option value="#1b3a2f">Legal Deep Green (#1b3a2f)</option>
                <option value="#091712">Dark Night (#091712)</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-stone-900">Reusable Component Record (Section 7.5)</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  When enabled, edits to this section sync across all pages referencing it.
                </p>
              </div>
              <button
                type="button"
                onClick={onToggleReusable}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  section.isReusable
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                {section.isReusable ? 'Shared (Global)' : 'Page-Specific'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
