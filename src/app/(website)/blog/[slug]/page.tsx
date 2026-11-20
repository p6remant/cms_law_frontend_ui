'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCMS } from '@/lib/cmsStore';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, User, ShieldAlert, ArrowRight } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { blogArticles, isLoaded } = useCMS();

  const article = blogArticles.find((a) => a.slug === slug);

  if (!isLoaded) {
    return <div className="py-24 text-center">Loading publication...</div>;
  }

  if (!article) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold text-legal-950 mb-4">Brief Not Found</h1>
        <p className="text-gray-600 mb-8">This publication may have been archived or removed from the registry.</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Legal Insights</span>
        </Link>
      </div>
    );
  }

  // Publication / Visibility check
  if (article.status !== 'published' || !article.isVisible) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4 bg-amber-50 rounded-lg my-12 border border-amber-200">
        <ShieldAlert className="w-10 h-10 text-amber-600 mx-auto mb-4" />
        <h2 className="text-2xl font-serif font-bold text-legal-950 mb-2">Unpublished Publication</h2>
        <p className="text-sm text-gray-600 mb-6">
          This article is currently marked as {article.status.toUpperCase()} and hidden from public distribution.
        </p>
        <Link
          href={`/admin/blog/${article.id}`}
          className="px-6 py-2.5 rounded bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider"
        >
          Edit in CMS Admin
        </Link>
      </div>
    );
  }

  return (
    <article className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-legal-700 hover:text-legal-950 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Publications</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded bg-legal-50 border border-legal-200 text-legal-800 text-xs font-semibold uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-xs text-gray-500 font-sans flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-legal-950 leading-tight mb-6">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 py-4 border-y border-stone-200 mb-10 text-sm text-gray-700">
          <div className="w-10 h-10 rounded-full bg-legal-800 text-gold-500 flex items-center justify-center font-serif font-bold">
            {article.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-legal-950">{article.author}</p>
            {article.authorRole && <p className="text-xs text-gray-500">{article.authorRole}</p>}
          </div>
        </div>

        {article.featuredImage && (
          <div className="rounded-lg overflow-hidden border border-stone-200 mb-12 aspect-[16/9] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div
          className="prose prose-lg prose-neutral max-w-none 
            prose-headings:font-serif prose-headings:text-legal-950 
            prose-p:text-gray-700 prose-p:leading-relaxed 
            prose-blockquote:border-l-4 prose-blockquote:border-legal-700 prose-blockquote:bg-[#fbfbfa] prose-blockquote:p-6 prose-blockquote:italic prose-blockquote:text-legal-900"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mr-2">Tags:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded bg-stone-100 text-stone-700 text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Editorial Disclaimer as requested in plan section 9 */}
        <div className="mt-12 p-6 rounded-lg bg-stone-50 border border-stone-200 text-xs text-gray-600 leading-relaxed">
          <p className="font-semibold text-legal-950 mb-1">Editorial Notice & Legal Disclaimer</p>
          <p>
            The analysis presented in this publication reflects the perspectives of the authoring partners and is intended solely for educational and general informational purposes. It does not constitute legal advice or opinion, nor does it establish an attorney-client relationship. Prior outcomes do not guarantee similar results.
          </p>
        </div>
      </div>
    </article>
  );
}
