'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { DynamicPageRenderer } from '@/components/website/DynamicPageRenderer';

// Reserved routes list to strictly avoid collisions (Section 4.1 of plan)
const RESERVED_ROUTES = new Set([
  'the-firm',
  'practice',
  'foreword',
  'partners',
  'questions',
  'contact',
  'blog',
  'admin',
  'api',
]);

export default function CatchAllCMSPage() {
  const params = useParams();
  const slug = params?.slug as string;

  if (RESERVED_ROUTES.has(slug)) {
    // Let Next.js handle reserved routes via their dedicated folder files
    return null;
  }

  return <DynamicPageRenderer slug={slug} />;
}
