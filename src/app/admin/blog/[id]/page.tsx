'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { BlogArticle, PublishStatus } from '@/types/cms';
import { ImageUploadField } from '@/components/admin/common/ImageUploadField';
import { ArrowLeft, Save, Sparkles, ExternalLink } from 'lucide-react';

export default function EditBlogArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params?.id as string;

  const { blogArticles, saveArticle, isLoaded } = useCMS();
  const [article, setArticle] = useState<BlogArticle | null>(null);

  useEffect(() => {
    if (isLoaded) {
      const found = blogArticles.find((a) => a.id === articleId);
      if (found) {
        setArticle(JSON.parse(JSON.stringify(found)));
      }
    }
  }, [isLoaded, articleId, blogArticles]);

  if (!isLoaded || !article) {
    return <div className="py-24 text-center">Loading publication...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveArticle(article);
    router.push('/admin/blog');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-stone-900">{article.title}</h1>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          target="_blank"
          className="px-4 py-2 rounded border border-stone-300 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Public View</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Title
              </label>
              <input
                type="text"
                required
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-legal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                required
                value={article.slug}
                onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-legal-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Excerpt
            </label>
            <textarea
              rows={2}
              value={article.excerpt}
              onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Body Content (HTML / Rich Text)
            </label>
            <textarea
              rows={10}
              value={article.body}
              onChange={(e) => setArticle({ ...article, body: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm font-mono"
            />
          </div>

          <div className="pt-2">
            <ImageUploadField
              label="Article Featured Cover Image *"
              value={article.featuredImage}
              onChange={(url) => setArticle({ ...article, featuredImage: url })}
              aspectRatio="wide"
              recommendedSize="1200 x 675px (16:9)"
              description="Upload primary hero visual for this publication."
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={article.author}
                onChange={(e) => setArticle({ ...article, author: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={article.category}
                onChange={(e) => setArticle({ ...article, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Status
              </label>
              <select
                value={article.status}
                onChange={(e) => setArticle({ ...article, status: e.target.value as PublishStatus })}
                className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm bg-white"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="vis-toggle"
                checked={article.isVisible}
                onChange={(e) => setArticle({ ...article, isVisible: e.target.checked })}
                className="rounded text-legal-700 focus:ring-legal-700"
              />
              <label htmlFor="vis-toggle" className="text-xs font-semibold text-stone-700">
                Visible to Public
              </label>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
