'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCMS } from '@/lib/cmsStore';
import {
  Menu,
  Eye,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  X,
  Smartphone,
  Tablet,
  Monitor,
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

export const AdminHeader: React.FC<HeaderProps> = ({ onOpenMobileSidebar }) => {
  const pathname = usePathname();
  const { settings } = useCMS();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Breadcrumbs generation
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => {
    const url = `/${segments.slice(0, i + 1).join('/')}`;
    const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
    return { url, label };
  });

  return (
    <>
      <header className="h-16 bg-white border-b border-stone-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        {/* Left: Mobile trigger and breadcrumbs */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="p-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 lg:hidden"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <Link href="/admin" className="hover:text-legal-800 transition-colors">
              CMS Admin
            </Link>
            {breadcrumbs.slice(1).map((crumb, idx) => (
              <React.Fragment key={crumb.url}>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                {idx === breadcrumbs.length - 2 ? (
                  <span className="text-stone-900 font-semibold">{crumb.label}</span>
                ) : (
                  <Link href={crumb.url} className="hover:text-legal-800 transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Right: Master Status & Global Preview Option (Accessible from every module) */}
        <div className="flex items-center gap-3">
          {/* Global Master Website Enabled Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border bg-stone-50">
            {settings.isEnabled ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-stone-700">Site Status: <strong className="text-emerald-700">Online</strong></span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-stone-700">Site Status: <strong className="text-amber-700">Offline</strong></span>
              </>
            )}
          </div>

          {/* Global Preview Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            title="Preview public website across viewport sizes"
          >
            <Eye className="w-3.5 h-3.5 text-gold-400" />
            <span>Global Preview</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="p-1.5 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Open live site in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Global Preview Modal with responsive viewport switcher (desktop, tablet, mobile) */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col animate-in fade-in">
          {/* Modal header bar */}
          <div className="h-14 px-6 bg-legal-950 border-b border-legal-800 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-sm font-serif font-bold text-gold-400">Public Website Live Simulation</span>
              <span className="text-xs text-legal-300 font-mono hidden sm:inline">| Responsive Engine</span>
            </div>

            {/* Viewport switchers */}
            <div className="flex items-center gap-1 bg-legal-900 p-1 rounded border border-legal-800">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  previewDevice === 'desktop' ? 'bg-legal-800 text-gold-400' : 'text-legal-300 hover:text-white'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden md:inline">Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  previewDevice === 'tablet' ? 'bg-legal-800 text-gold-400' : 'text-legal-300 hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-4 h-4" />
                <span className="hidden md:inline">Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  previewDevice === 'mobile' ? 'bg-legal-800 text-gold-400' : 'text-legal-300 hover:text-white'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden md:inline">Mobile</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1 text-xs text-legal-300 hover:text-white"
              >
                <span>New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded text-legal-400 hover:text-white hover:bg-legal-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Iframe Viewport container */}
          <div className="flex-1 bg-stone-900 overflow-auto p-4 flex items-center justify-center">
            <div
              className={`bg-white transition-all duration-300 rounded-lg shadow-2xl overflow-hidden h-[95%] border border-stone-700 flex flex-col ${
                previewDevice === 'desktop'
                  ? 'w-full max-w-6xl'
                  : previewDevice === 'tablet'
                  ? 'w-[768px]'
                  : 'w-[375px]'
              }`}
            >
              <iframe
                src="/"
                title="CMS Live Website Global Preview"
                className="w-full flex-1 border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
