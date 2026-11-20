'use client';

import React from 'react';
import Link from 'next/link';
import { WebsiteHeader } from '@/components/website/layout/Header';
import { WebsiteFooter } from '@/components/website/layout/Footer';
import { useCMS } from '@/lib/cmsStore';
import { Eye, ShieldAlert } from 'lucide-react';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings, isLoaded } = useCMS();

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfa] text-stone-900 selection:bg-gold-500 selection:text-legal-950">
      {/* Top Admin Quick Bar for seamless CMS navigation */}
      <div className="bg-legal-950 border-b border-legal-800 text-legal-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-legal-200">Public Live Preview</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-gold-500 hover:text-white transition-colors font-medium text-[11px]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Open CMS Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Global Master Website Switch Banner (as specified in 16.3: Website disabled state) */}
      {isLoaded && !settings.isEnabled && (
        <div className="bg-amber-600 text-white text-sm py-3 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>
            Notice: The public website is currently toggled to <strong>OFFLINE</strong> in Website Settings. Only administrators can view pages.
          </span>
        </div>
      )}

      <WebsiteHeader />
      <main className="flex-1">{children}</main>
      <WebsiteFooter />
    </div>
  );
}
