'use client';

import React from 'react';
import { DynamicPageRenderer } from '@/components/website/DynamicPageRenderer';
import { WebsiteHeader } from '@/components/website/layout/Header';
import { WebsiteFooter } from '@/components/website/layout/Footer';

export function Template1View({ slug = '' }: { slug?: string }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfa] text-stone-900 selection:bg-gold-500 selection:text-legal-950">
      <WebsiteHeader />
      <main className="flex-1">
        <DynamicPageRenderer slug={slug} />
      </main>
      <WebsiteFooter />
    </div>
  );
}

export default Template1View;
