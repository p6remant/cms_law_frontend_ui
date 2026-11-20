'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import {
  LayoutTemplate,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  Settings,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Clock,
  Palette,
  RotateCcw,
} from 'lucide-react';
import { TemplateId } from '@/types/cms';

export default function TemplatesPage() {
  const { settings, setActiveTemplate, saveSettings, isLoaded } = useCMS();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedTemplateForPreview, setSelectedTemplateForPreview] = useState<TemplateId>('default2');
  const [showDevicePreview, setShowDevicePreview] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const activeTemplate: TemplateId = settings.activeTemplate || 'default1';

  const handlePublish = (templateId: TemplateId) => {
    if (templateId === activeTemplate) return;
    setActiveTemplate(templateId);
    setNotification(
      `Successfully published ${
        templateId === 'default2' ? 'Template 2 (Editorial Law Chambers)' : 'Template 1 (Classic Law Firm)'
      }! It is now the live public UI.`
    );
    setTimeout(() => setNotification(null), 5000);
  };

  const getDeviceWidth = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'w-[375px]';
      case 'tablet':
        return 'w-[768px]';
      default:
        return 'w-full';
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-legal-800 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Banner / Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-legal-400 font-mono mb-2">
          <Link href="/admin" className="hover:text-white transition-colors">CMS Admin</Link>
          <span>/</span>
          <span className="text-legal-200">Templates &amp; Themes</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-3">
              <LayoutTemplate className="w-7 h-7 text-gold-500" />
              <span>UI Template Management</span>
            </h1>
            <p className="text-legal-300 text-sm mt-1 max-w-2xl">
              Design, customize, and switch between your website UI themes. Both templates can be configured independently, but only <strong>one</strong> is published live at a time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-legal-800 text-legal-200 hover:text-white hover:bg-legal-700 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-4 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 flex items-center justify-between shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-medium">{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs text-emerald-400 hover:text-white underline ml-4 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Current Active Template Banner */}
      <div className="bg-legal-900 border border-legal-800/80 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Currently Published
                </span>
                <span className="text-xs text-legal-400 font-mono">
                  activeTemplate = &quot;{activeTemplate}&quot;
                </span>
              </div>
              <h2 className="text-lg font-serif font-bold text-white mt-1">
                {activeTemplate === 'default1'
                  ? 'Template 1: Classic Law Firm (Vanguard & Sterling)'
                  : 'Template 2: Editorial Research Chambers (Law Chambers)'}
              </h2>
              <p className="text-xs text-legal-300 mt-0.5">
                All public visitors visiting your homepage will see this active template.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const other = activeTemplate === 'default1' ? 'default2' : 'default1';
                handlePublish(other);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-gold-600 hover:bg-gold-500 text-legal-950 font-semibold text-xs tracking-wider uppercase transition-colors shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>
                Switch to {activeTemplate === 'default1' ? 'Template 2' : 'Template 1'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Template Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TEMPLATE 1 CARD */}
        <div
          className={`rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden bg-legal-900/60 ${
            activeTemplate === 'default1'
              ? 'border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
              : 'border-legal-800 hover:border-legal-700'
          }`}
        >
          {/* Card Header */}
          <div className="p-6 border-b border-legal-800/80 bg-legal-950/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-500 block">
                  Template Slot 01
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  Classic Law Firm UI
                </h3>
                <p className="text-xs text-legal-400 mt-1">
                  Vanguard &amp; Sterling Corporate Practice
                </p>
              </div>

              {activeTemplate === 'default1' ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live (Active)
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-stone-800 text-stone-400 border border-stone-700 shrink-0">
                  Draft (Standby)
                </span>
              )}
            </div>
          </div>

          {/* Visual Preview / Thumbnail Representation */}
          <div className="p-6 space-y-4">
            <div className="aspect-[16/9] w-full rounded-lg bg-stone-900 border border-legal-800 p-4 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-legal-950/80 to-stone-900/90 flex flex-col justify-between p-4">
                <div className="flex items-center justify-between border-b border-legal-800 pb-2">
                  <span className="font-serif text-sm font-bold text-white tracking-wider">
                    VANGUARD &amp; STERLING
                  </span>
                  <div className="flex gap-2">
                    <span className="h-1.5 w-6 rounded-full bg-legal-700" />
                    <span className="h-1.5 w-6 rounded-full bg-legal-700" />
                  </div>
                </div>

                <div className="space-y-2 py-4">
                  <div className="h-3 w-3/4 bg-gold-500/40 rounded" />
                  <div className="h-2 w-1/2 bg-legal-600 rounded" />
                  <div className="h-6 w-24 bg-gold-600/60 rounded mt-2" />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-legal-800/60">
                  <div className="h-8 bg-legal-800/40 rounded p-1 text-[9px] text-legal-400 text-center flex items-center justify-center">Corporate</div>
                  <div className="h-8 bg-legal-800/40 rounded p-1 text-[9px] text-legal-400 text-center flex items-center justify-center">Litigation</div>
                  <div className="h-8 bg-legal-800/40 rounded p-1 text-[9px] text-legal-400 text-center flex items-center justify-center">Partners</div>
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-legal-300">
              Traditional full-width corporate layout with full-bleed hero slider, 6 practice area card grid, senior partner carousel, and institutional law firm layout.
            </p>

            <div className="space-y-1.5 pt-2 border-t border-legal-800/60 text-xs">
              <div className="flex items-center justify-between text-legal-400">
                <span>Color Palette:</span>
                <span className="text-legal-200 font-mono">Forest Green (#1b3a2f) &amp; Gold (#c5a880)</span>
              </div>
              <div className="flex items-center justify-between text-legal-400">
                <span>Typography:</span>
                <span className="text-legal-200">Playfair Display &amp; Inter</span>
              </div>
              <div className="flex items-center justify-between text-legal-400">
                <span>Section Architecture:</span>
                <span className="text-legal-200">CMS Section Builder Compatible</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-legal-950/60 border-t border-legal-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Link
                href="/?template=default1"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-medium transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-gold-500" />
                <span>Preview Template 1</span>
              </Link>
              <Link
                href="/admin/pages"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-legal-700 hover:bg-legal-800 text-legal-300 hover:text-white text-xs font-medium transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Edit Sections</span>
              </Link>
            </div>

            {activeTemplate === 'default1' ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Currently Live</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handlePublish('default1')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Publish (Make Active)</span>
              </button>
            )}
          </div>
        </div>

        {/* TEMPLATE 2 CARD */}
        <div
          className={`rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden bg-legal-900/60 ${
            activeTemplate === 'default2'
              ? 'border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
              : 'border-legal-800 hover:border-legal-700'
          }`}
        >
          {/* Card Header */}
          <div className="p-6 border-b border-legal-800/80 bg-legal-950/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block">
                  Template Slot 02
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  Editorial Research Chambers UI
                </h3>
                <p className="text-xs text-legal-400 mt-1">
                  Law Chambers &amp; Legal Research (Kathmandu)
                </p>
              </div>

              {activeTemplate === 'default2' ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live (Active)
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-stone-800 text-stone-400 border border-stone-700 shrink-0">
                  Draft (Standby)
                </span>
              )}
            </div>
          </div>

          {/* Visual Preview / Thumbnail Representation */}
          <div className="p-6 space-y-4">
            <div className="aspect-[16/9] w-full rounded-lg bg-[#F7F6F2] border border-[#DCD9D1] p-4 flex flex-col justify-between overflow-hidden relative group text-[#191919]">
              <div className="absolute inset-0 bg-[#F7F6F2] flex flex-col justify-between p-4">
                <div className="flex items-center justify-between border-b border-[#DCD9D1] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-[#1B633E] flex items-center justify-center text-[8px] text-[#1B633E]">⚖️</span>
                    <span className="font-serif text-xs font-bold text-[#191919] tracking-wider">
                      LAW CHAMBERS
                    </span>
                  </div>
                  <span className="text-[8px] font-serif text-[#1B633E]">ल चेम्बर्स</span>
                </div>

                <div className="grid grid-cols-12 gap-2 items-center py-2">
                  <div className="col-span-7 space-y-1">
                    <span className="text-[8px] uppercase tracking-wider text-[#1B633E] font-medium block">RAMSHAH PATH</span>
                    <div className="font-serif text-sm font-semibold text-[#191919] leading-tight">
                      Defending for <span className="italic text-[#1B633E]">impartial justice.</span>
                    </div>
                  </div>
                  <div className="col-span-5 flex justify-center">
                    <div className="w-12 h-12 rounded-full border border-[#1B633E]/30 bg-[#1B633E] flex items-center justify-center text-[7px] text-white font-serif text-center p-1">
                      Practice Areas
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#DCD9D1] pt-1.5 flex justify-between text-[8px] text-[#66645F]">
                  <span>2055 B.S.</span>
                  <span>28 Yrs Practice</span>
                  <span>13 Statutory Areas</span>
                  <span>04 Counsel</span>
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-legal-300">
              High-end scholarly legal editorial design: interactive orbiting practice area wheel, horizontal continuous ticker, chronology timeline (2055-2080 B.S.), 13 codified practice drawers, founder address, Supreme Court judgments, and statutory FAQ guide.
            </p>

            <div className="space-y-1.5 pt-2 border-t border-legal-800/60 text-xs">
              <div className="flex items-center justify-between text-legal-400">
                <span>Color Palette:</span>
                <span className="text-legal-200 font-mono">Parchment (#F7F6F2) &amp; Forest Green (#1B633E)</span>
              </div>
              <div className="flex items-center justify-between text-legal-400">
                <span>Typography:</span>
                <span className="text-legal-200">Cormorant Garamond &amp; Devanagari</span>
              </div>
              <div className="flex items-center justify-between text-legal-400">
                <span>Special Features:</span>
                <span className="text-legal-200">Orbital Ring, Ticker, Categorized FAQ, Judgments</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-legal-950/60 border-t border-legal-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Link
                href="/?template=default2"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-medium transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>Preview Template 2</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplateForPreview('default2');
                  setShowDevicePreview(!showDevicePreview);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-legal-700 hover:bg-legal-800 text-legal-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>{showDevicePreview ? 'Hide Live Preview Frame' : 'Preview Device View'}</span>
              </button>
            </div>

            {activeTemplate === 'default2' ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Currently Live</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handlePublish('default2')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Publish (Make Active)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Device Viewport Simulator */}
      {showDevicePreview && (
        <div className="bg-legal-950 border border-legal-800 rounded-xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-legal-800">
            <div>
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <Monitor className="w-4 h-4 text-gold-500" />
                <span>Device Viewport Simulation</span>
              </h3>
              <p className="text-xs text-legal-400">
                Testing responsive layout for{' '}
                <strong>
                  {selectedTemplateForPreview === 'default2' ? 'Template 2 (Editorial)' : 'Template 1 (Classic)'}
                </strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg border border-legal-800 bg-legal-900 p-1">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'desktop' ? 'bg-legal-800 text-white shadow-xs' : 'text-legal-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'tablet' ? 'bg-legal-800 text-white shadow-xs' : 'text-legal-400 hover:text-white'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet (768px)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'mobile' ? 'bg-legal-800 text-white shadow-xs' : 'text-legal-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile (375px)</span>
                </button>
              </div>

              <select
                value={selectedTemplateForPreview}
                onChange={(e) => setSelectedTemplateForPreview(e.target.value as TemplateId)}
                className="bg-legal-900 border border-legal-700 text-white text-xs rounded px-3 py-1.5"
              >
                <option value="default2">Template 2 (Editorial)</option>
                <option value="default1">Template 1 (Classic)</option>
              </select>
            </div>
          </div>

          <div className="w-full flex justify-center bg-stone-950/80 rounded-lg p-4 overflow-x-auto min-h-[600px] border border-legal-800/50">
            <div className={`${getDeviceWidth()} transition-all duration-300 shadow-2xl rounded-lg overflow-hidden border border-stone-800 bg-white`}>
              <iframe
                src={`/?template=${selectedTemplateForPreview}`}
                title="Template Live Preview"
                className="w-full h-[650px] border-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Architectural Information Guide */}
      <div className="rounded-xl bg-legal-900/40 border border-legal-800 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-500 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Multi-Template Architecture &amp; Single Active Switch</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-legal-300 leading-relaxed">
          <div className="space-y-1">
            <h4 className="font-semibold text-white">1. Independent Configuration</h4>
            <p>
              Each template preserves its independent layout tree, typography, data mapping, and styling without interfering with the other.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-white">2. Mutually Exclusive Active Mutex</h4>
            <p>
              Publishing Template 2 instantly switches the global <code>activeTemplate</code> pointer, automatically parking Template 1 in draft mode.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-white">3. Frictionless Previewing</h4>
            <p>
              Admins can preview unpublished templates with the <code>?template=defaultX</code> query string and publish directly from the live preview banner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
