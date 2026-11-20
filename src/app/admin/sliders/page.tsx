'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cmsStore';
import { SliderConfig, SlideItem } from '@/types/cms';
import { AdminBadge } from '@/components/admin/common/AdminBadge';
import { AdminSwitch } from '@/components/admin/common/AdminSwitch';
import { ConfirmModal } from '@/components/admin/common/ConfirmModal';
import { ImageUploadField } from '@/components/admin/common/ImageUploadField';
import {
  Sliders,
  Plus,
  Play,
  RotateCw,
  Image,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  CheckCircle,
  X,
  MoveUp,
  MoveDown,
} from 'lucide-react';

export default function SlidersManagementPage() {
  const { sliders, saveSlider, deleteSlider } = useCMS();

  const [activeSlider, setActiveSlider] = useState<SliderConfig | null>(sliders[0] || null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Clean Modal for Add / Edit Slide
  const [slideModal, setSlideModal] = useState<{
    isOpen: boolean;
    editIndex: number | null;
    data: any;
  }>({
    isOpen: false,
    editIndex: null,
    data: null,
  });

  const handleToggleSliderVisibility = (checked: boolean) => {
    if (!activeSlider) return;
    const updated = { ...activeSlider, isVisible: checked };
    setActiveSlider(updated);
    saveSlider(updated);
  };

  const handleOpenAddSlideModal = () => {
    if (!activeSlider) return;
    setSlideModal({
      isOpen: true,
      editIndex: null,
      data: {
        id: `slide-${Date.now()}`,
        title: '',
        subtitle: '',
        description: '',
        desktopImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1800&q=80',
        overlayOpacity: 0.6,
        ctaLabel: 'Learn More',
        ctaUrl: '/practice',
        order: activeSlider.slides.length + 1,
        isVisible: true,
      },
    });
  };

  const handleSaveSlideModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSlider || !slideModal.data) return;

    const slides = [...activeSlider.slides];
    if (slideModal.editIndex !== null) {
      slides[slideModal.editIndex] = slideModal.data;
    } else {
      slides.push(slideModal.data);
    }

    const updated = { ...activeSlider, slides };
    setActiveSlider(updated);
    saveSlider(updated);
    setSlideModal({ isOpen: false, editIndex: null, data: null });
  };

  const handleRemoveSlide = (slideId: string) => {
    if (!activeSlider) return;
    const updated = {
      ...activeSlider,
      slides: activeSlider.slides.filter((s) => s.id !== slideId).map((s, i) => ({ ...s, order: i + 1 })),
    };
    setActiveSlider(updated);
    saveSlider(updated);
  };

  const handleToggleSlideVisibility = (slideId: string) => {
    if (!activeSlider) return;
    const updated = {
      ...activeSlider,
      slides: activeSlider.slides.map((s) => (s.id === slideId ? { ...s, isVisible: !s.isVisible } : s)),
    };
    setActiveSlider(updated);
    saveSlider(updated);
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    if (!activeSlider) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= activeSlider.slides.length) return;

    const slides = [...activeSlider.slides];
    const temp = slides[index];
    slides[index] = slides[targetIndex];
    slides[targetIndex] = temp;

    const updated = { ...activeSlider, slides };
    setActiveSlider(updated);
    saveSlider(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Sliders & Carousels</h1>
          <p className="text-xs text-stone-500 mt-1">
            Configure institutional hero sliders, partner carousels, autoplay timers, and slide overlays
          </p>
        </div>
      </div>

      {/* Sliders list cards */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Available Collections ({sliders.length})
          </span>

          <div className="space-y-3">
            {sliders.map((s) => {
              const isSelected = activeSlider?.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setActiveSlider(s)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-legal-50/70 border-legal-700 ring-2 ring-legal-700/20 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-stone-900">{s.name}</h3>
                    <AdminBadge variant={s.isVisible ? 'success' : 'neutral'}>
                      {s.isVisible ? 'Visible' : 'Hidden'}
                    </AdminBadge>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
                    <span>Type: {s.type}</span>
                    <span>•</span>
                    <span>{s.slides.length} slides</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Slider Settings & Slides */}
        {activeSlider && (
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">{activeSlider.name}</h3>
                <p className="text-xs text-stone-500 font-mono">Collection Type: {activeSlider.type}</p>
              </div>

              <AdminSwitch
                label="Collection Visible"
                checked={activeSlider.isVisible}
                onChange={handleToggleSliderVisibility}
              />
            </div>

            {/* Slider Playback Options (Section 15) */}
            <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-lg bg-stone-50 border border-stone-200 text-xs">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={activeSlider.autoplay}
                  onChange={(e) => {
                    const updated = { ...activeSlider, autoplay: e.target.checked };
                    setActiveSlider(updated);
                    saveSlider(updated);
                  }}
                  className="rounded text-legal-700"
                />
                <span className="font-medium text-stone-700">Autoplay Slides</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={activeSlider.showArrows}
                  onChange={(e) => {
                    const updated = { ...activeSlider, showArrows: e.target.checked };
                    setActiveSlider(updated);
                    saveSlider(updated);
                  }}
                  className="rounded text-legal-700"
                />
                <span className="font-medium text-stone-700">Show Navigation Arrows</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={activeSlider.showDots}
                  onChange={(e) => {
                    const updated = { ...activeSlider, showDots: e.target.checked };
                    setActiveSlider(updated);
                    saveSlider(updated);
                  }}
                  className="rounded text-legal-700"
                />
                <span className="font-medium text-stone-700">Show Indicator Dots</span>
              </label>
            </div>

            {/* Clean Slides list with Modal trigger */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Slides in Collection ({activeSlider.slides.length})
                  </h4>
                  <p className="text-[11px] text-stone-400">Order and content of carousel slides</p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddSlideModal}
                  className="px-3.5 py-1.5 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Slide</span>
                </button>
              </div>

              <div className="space-y-3">
                {activeSlider.slides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between hover:bg-stone-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-20 aspect-[16/9] rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-300 shadow-xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={slide.desktopImage} alt={slide.title} className="w-full h-full object-cover" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded bg-stone-200 text-stone-700 text-[10px] font-mono font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h5 className="text-xs font-bold text-stone-900 line-clamp-1">
                            {slide.title || 'Untitled Slide'}
                          </h5>
                          {!slide.isVisible && <AdminBadge variant="warning">Hidden</AdminBadge>}
                        </div>
                        {slide.subtitle && (
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {slide.subtitle}
                          </p>
                        )}
                        <p className="text-[10px] text-legal-700 font-mono mt-0.5">
                          CTA: {slide.ctaLabel} ({slide.ctaUrl})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveSlide(idx, 'up')}
                        className="p-1.5 rounded text-stone-400 hover:text-stone-800 disabled:opacity-20"
                        title="Move slide up"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === activeSlider.slides.length - 1}
                        onClick={() => handleMoveSlide(idx, 'down')}
                        className="p-1.5 rounded text-stone-400 hover:text-stone-800 disabled:opacity-20"
                        title="Move slide down"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleSlideVisibility(slide.id)}
                        className="p-1.5 rounded text-stone-500 hover:text-stone-900 bg-white border border-stone-200"
                        title="Toggle visibility"
                      >
                        {slide.isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSlideModal({
                            isOpen: true,
                            editIndex: idx,
                            data: { ...slide },
                          })
                        }
                        className="p-1.5 rounded bg-white text-stone-600 hover:text-legal-900 border border-stone-200"
                        title="Edit slide"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSlide(slide.id)}
                        className="p-1.5 rounded bg-white text-stone-400 hover:text-red-600 border border-stone-200"
                        title="Delete slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide Modal */}
      {slideModal.isOpen && slideModal.data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200">
            <form onSubmit={handleSaveSlideModal}>
              <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {slideModal.editIndex !== null ? 'Edit Showcase Slide' : 'Add Showcase Slide'}
                </h3>
                <button
                  type="button"
                  onClick={() => setSlideModal({ isOpen: false, editIndex: null, data: null })}
                  className="text-stone-400 hover:text-stone-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Slide Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Decisive Advocates in High-Stakes Litigation"
                    value={slideModal.data.title || ''}
                    onChange={(e) =>
                      setSlideModal({
                        ...slideModal,
                        data: { ...slideModal.data, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Subtitle / Eyebrow
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Federal & Supreme Court Practice"
                    value={slideModal.data.subtitle || ''}
                    onChange={(e) =>
                      setSlideModal({
                        ...slideModal,
                        data: { ...slideModal.data, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Highlighting decisive victories..."
                    value={slideModal.data.description || ''}
                    onChange={(e) =>
                      setSlideModal({
                        ...slideModal,
                        data: { ...slideModal.data, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <ImageUploadField
                    label="Slide Desktop Image *"
                    value={slideModal.data.desktopImage}
                    onChange={(url) =>
                      setSlideModal({
                        ...slideModal,
                        data: { ...slideModal.data, desktopImage: url },
                      })
                    }
                    aspectRatio="wide"
                    recommendedSize="1920 x 1080px"
                    description="Upload photography for hero slides."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      CTA Button Label
                    </label>
                    <input
                      type="text"
                      placeholder="Explore Practice Areas"
                      value={slideModal.data.ctaLabel || ''}
                      onChange={(e) =>
                        setSlideModal({
                          ...slideModal,
                          data: { ...slideModal.data, ctaLabel: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      CTA Button URL
                    </label>
                    <input
                      type="text"
                      placeholder="/practice"
                      value={slideModal.data.ctaUrl || ''}
                      onChange={(e) =>
                        setSlideModal({
                          ...slideModal,
                          data: { ...slideModal.data, ctaUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setSlideModal({ isOpen: false, editIndex: null, data: null })}
                  className="px-4 py-2 text-xs font-semibold uppercase text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
