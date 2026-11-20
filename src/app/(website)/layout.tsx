'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { WebsiteHeader } from '@/components/website/layout/Header';
import { WebsiteFooter } from '@/components/website/layout/Footer';
import { TemplatePreviewBar } from '@/components/website/TemplatePreviewBar';
import { useCMS } from '@/lib/cmsStore';
import { Eye, ShieldAlert, Sparkles } from 'lucide-react';
import { TemplateId } from '@/types/cms';

function WebsiteLayoutInner({ children }: { children: React.ReactNode }) {
  const { settings, isLoaded } = useCMS();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const previewParam = searchParams.get('template') as TemplateId | null;
  const activeTemplate = previewParam || settings.activeTemplate || 'default1';

  // Template 2 homepage has its own integrated bespoke editorial header and footer
  const isTemplate2Home = activeTemplate === 'default2' && (pathname === '/' || pathname === '');

  return (
    <div className="min-h-screen flex flex-col selection:bg-accent/15 selection:text-ink">
      {/* Dynamic Template Preview Banner if viewing preview */}
      <TemplatePreviewBar />

      {/* Top Admin Quick Bar for seamless CMS navigation */}
      <aside aria-label="CMS Navigation Quick Bar" className="bg-legal-950 border-b border-legal-800 text-legal-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-legal-200">
            Active: {activeTemplate === 'default2' ? 'Template 2 (Editorial Law Chambers)' : 'Template 1 (Classic Law Firm)'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/templates"
            className="flex items-center gap-1.5 text-gold-500 hover:text-white transition-colors font-medium text-[11px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Templates Switcher</span>
          </Link>
          <span className="text-legal-700">|</span>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-legal-300 hover:text-white transition-colors font-medium text-[11px]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>CMS Admin</span>
          </Link>
        </div>
      </aside>

      {/* Global Master Website Switch Banner */}
      {isLoaded && !settings.isEnabled && (
        <div className="bg-amber-600 text-white text-sm py-3 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>
            Notice: The public website is currently toggled to <strong>OFFLINE</strong> in Website Settings. Only administrators can view pages.
          </span>
        </div>
      )}

      {/* When Template 1 is active (or on non-home subpages), use Template 1 Header */}
      {!isTemplate2Home && <WebsiteHeader />}

      <main className="flex-1">{children}</main>

      {/* When Template 1 is active (or on non-home subpages), use Template 1 Footer */}
      {!isTemplate2Home && <WebsiteFooter />}
    </div>
  );
}

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Suspense fallback={null}>
      <WebsiteLayoutInner>{children}</WebsiteLayoutInner>
    </React.Suspense>
  );
}
