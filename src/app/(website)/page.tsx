'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useCMS } from '@/lib/cmsStore';
import { DynamicPageRenderer } from '@/components/website/DynamicPageRenderer';
import { Template2View } from '@/components/templates/default2/Template2View';
import { TemplateId } from '@/types/cms';

function HomePageContent() {
  const { settings, isLoaded } = useCMS();
  const searchParams = useSearchParams();

  const previewTemplate = searchParams.get('template') as TemplateId | null;
  const activeTemplate = previewTemplate || settings.activeTemplate || 'default1';

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-legal-800 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (activeTemplate === 'default2') {
    return <Template2View />;
  }

  return <DynamicPageRenderer slug="" />;
}

export default function HomePage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-legal-800 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <HomePageContent />
    </React.Suspense>
  );
}
