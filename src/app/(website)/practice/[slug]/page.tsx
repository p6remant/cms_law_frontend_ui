'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCMS } from '@/lib/cmsStore';
import { ArrowLeft, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

export default function PracticeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { pages } = useCMS();

  // Find practice area from page sections in "practice" or "page-home"
  const practicePage = pages.find((p) => p.slug === 'practice' || p.id === 'page-home');
  const practiceSection = practicePage?.sections.find((s) => s.type === 'practiceAreas');
  const practiceItem = practiceSection?.content?.items?.find((i: any) => i.slug === slug) || {
    title: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Practice Area',
    shortDescription: 'Comprehensive legal strategy and dispute advisory.',
    longDescription: 'Our senior partners provide tailored legal counsel in this practice area, representing corporate enterprises and boards through pivotal matters.',
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-legal-700 hover:text-legal-950 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Practice Areas</span>
        </Link>

        <span className="text-xs font-semibold tracking-widest text-legal-700 uppercase font-sans mb-3 block">
          Practice Area Focus
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-legal-950 mb-6">
          {practiceItem.title}
        </h1>

        <p className="text-xl text-gray-700 font-light leading-relaxed mb-10 pb-8 border-b border-stone-200">
          {practiceItem.shortDescription}
        </p>

        <div className="prose prose-neutral max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            {practiceItem.longDescription ||
              'Our firm provides authoritative counsel on all matters regarding this practice. We collaborate closely with in-house legal departments, executive boards, and international co-counsel to minimize risk and protect proprietary interests.'}
          </p>
          <h3 className="font-serif text-2xl font-bold text-legal-950 pt-4">Strategic Representation Highlights</h3>
          <ul className="space-y-3 pl-0 list-none">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-legal-700 shrink-0 mt-0.5" />
              <span>Full-spectrum advisory from pretrial motions through Supreme Court review.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-legal-700 shrink-0 mt-0.5" />
              <span>Direct oversight by founding partners with relevant judicial clerkship backgrounds.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-legal-700 shrink-0 mt-0.5" />
              <span>Comprehensive cross-border risk mitigation and sovereign clearance coordination.</span>
            </li>
          </ul>
        </div>

        <div className="mt-16 p-8 rounded-xl bg-[#fbfbfa] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif font-bold text-xl text-legal-950">Engage a Practice Leader</h4>
            <p className="text-sm text-gray-600 font-light mt-1">Schedule a discreet preliminary conflict assessment.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded bg-legal-800 hover:bg-legal-700 text-white font-medium text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <span>Inquire Regarding This Practice</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
