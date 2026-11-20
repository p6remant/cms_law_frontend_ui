'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { formatDate } from '@/lib/utils';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

export default function BlogListingPage() {
  const { blogArticles, isLoaded } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const published = blogArticles.filter((a) => a.status === 'published' && a.isVisible);

  // Categories list
  const categories = ['All', ...Array.from(new Set(published.map((a) => a.category)))];

  const filtered = published.filter((a) => {
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-legal-700 uppercase font-sans mb-3 block">
            Publications & Commentary
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-legal-950 tracking-tight mb-4">
            Legal Insights & Jurisprudence
          </h1>
          <p className="text-gray-600 text-lg font-light leading-relaxed">
            Analytical commentary on landmark appellate decisions, regulatory transformations, and corporate governance architecture.
          </p>
        </div>

        {/* Filter and search bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-6 border-b border-stone-200">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-legal-800 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-stone-200/70 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search briefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700 bg-white"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500 bg-white rounded-lg border border-stone-200">
            <p className="font-serif text-lg">No published legal insights found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
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
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-legal-950/90 text-white text-[11px] font-medium uppercase tracking-wider backdrop-blur-sm">
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
                    <span>Read Full Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
