'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCMS } from '@/lib/cmsStore';
import { Eye, CheckCircle2, X, ArrowRight, Sparkles } from 'lucide-react';
import { TemplateId } from '@/types/cms';

export function TemplatePreviewBarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { settings, setActiveTemplate, isLoaded } = useCMS();

  const previewTemplate = searchParams.get('template') as TemplateId | null;
  const activeTemplate = settings.activeTemplate || 'default1';

  // Only show the special preview banner if an explicit template is requested via URL
  if (!isLoaded || !previewTemplate) {
    return null;
  }

  const isAlreadyActive = previewTemplate === activeTemplate;
  const templateName =
    previewTemplate === 'default2'
      ? 'Template 2 (Editorial Law Chambers)'
      : 'Template 1 (Classic Law Firm)';

  const handlePublishNow = () => {
    setActiveTemplate(previewTemplate);
    // Remove query param to view as public published template
    router.push(pathname);
  };

  const handleExitPreview = () => {
    router.push(pathname);
  };

  return (
    <aside
      aria-label="Template preview status"
      className="sticky top-0 z-50 bg-stone-900 border-b border-stone-700 text-stone-100 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-md"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" />
          Preview Mode:
        </span>
        <span className="text-stone-200">
          Viewing <strong>{templateName}</strong>
        </span>
        {isAlreadyActive ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-900/80 text-emerald-300 border border-emerald-600/50">
            Currently Published (Live)
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-900/70 text-amber-300 border border-amber-600/50">
            Draft (Not Live to Public)
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!isAlreadyActive && (
          <button
            type="button"
            onClick={handlePublishNow}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Publish This Template Live</span>
          </button>
        )}

        <Link
          href="/admin/templates"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
        >
          <Sparkles className="w-3 h-3 text-gold-500" />
          <span>Manage Templates</span>
        </Link>

        <button
          type="button"
          onClick={handleExitPreview}
          title="Exit preview mode"
          className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

export function TemplatePreviewBar() {
  return (
    <React.Suspense fallback={null}>
      <TemplatePreviewBarContent />
    </React.Suspense>
  );
}
