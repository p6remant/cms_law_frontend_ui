'use client';

import React from 'react';
import Link from 'next/link';
import { LatestArticlesSectionContent, SectionSettings } from '@/types/cms';
import { useCMS } from '@/lib/cmsStore';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface LatestArticlesProps {
  content: LatestArticlesSectionContent;
  settings?: SectionSettings;
}

export const LatestArticlesSection: React.FC<LatestArticlesProps> = ({ content }) => {
  const { blogArticles, isLoaded } = useCMS();

  // Filter only published and visible articles
  const publishedArticles = blogArticles
    .filter((a) => a.status === 'published' && a.isVisible)
    .slice(0, content.count || 3);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            {content.eyebrow && (
              <span className="text-xs font-semibold tracking-widest text-legal-700 uppercase font-sans mb-3 block">
                {content.eyebrow}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-legal-950 tracking-tight">
              {content.title || 'Recent Legal Briefs & Commentary'}
            </h2>
            {content.description && (
              <p className="mt-4 text-gray-600 text-lg font-light leading-relaxed">
                {content.description}
              </p>
            )}
          </div>
          <Link
            href={content.viewAllUrl || '/blog'}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-legal-700 hover:text-legal-900 group"
          >
            <span>Browse All Publications</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {publishedArticles.length === 0 && isLoaded ? (
          <p className="text-gray-500 italic">No published articles currently available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedArticles.map((article) => (
              <article
                key={article.id}
                className="bg-[#fbfbfa] rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {article.featuredImage && (
                    <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-legal-900/90 text-white text-[11px] font-medium uppercase tracking-wider backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-sans">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(article.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {article.author}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-legal-950 mb-3 hover:text-legal-700 transition-colors leading-snug">
                      <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed font-light mb-6">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-legal-700 hover:text-legal-900"
                  >
                    <span>Read Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
