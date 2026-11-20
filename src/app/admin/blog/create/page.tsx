'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { slugify } from '@/lib/utils';
import { BlogArticle, PublishStatus } from '@/types/cms';
import { ImageUploadField } from '@/components/admin/common/ImageUploadField';
import { ArrowLeft, Save, Sparkles, AlertCircle } from 'lucide-react';

export default function CreateBlogArticlePage() {
  const router = useRouter();
  const { saveArticle } = useCMS();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('<p>Write your detailed legal analysis, statutory references, and partner insights here...</p>');
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80');
  const [author, setAuthor] = useState('Eleanor Sterling');
  const [authorRole, setAuthorRole] = useState('Senior Managing Partner');
  const [category, setCategory] = useState('Corporate Governance');
  const [tagsInput, setTagsInput] = useState('M&A, Compliance, Governance');
  const [status, setStatus] = useState<PublishStatus>('published');
  const [isVisible, setIsVisible] = useState(true);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(slugify(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newArticle: BlogArticle = {
      id: `art-${Date.now()}`,
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      excerpt: excerpt.trim(),
      body: body.trim(),
      featuredImage: featuredImage.trim(),
      author: author.trim(),
      authorRole: authorRole.trim(),
      category: category.trim(),
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      status,
      isVisible,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seo: {
        title: `${title.trim()} | Vanguard & Sterling LLP`,
        description: excerpt.trim() || title.trim(),
        robotsIndex: true,
        robotsFollow: true,
      },
    };

    saveArticle(newArticle);
    router.push('/admin/blog');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-stone-900">New Legal Publication</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Navigating Multi-Jurisdictional Antitrust Reviews"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-legal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-legal-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Excerpt / Abstract
            </label>
            <textarea
              rows={2}
              placeholder="High-level executive summary of this legal brief..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Article Body (HTML / Rich Text)
            </label>
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm font-mono"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Author Role
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <ImageUploadField
              label="Article Featured Cover Image *"
              value={featuredImage}
              onChange={(url) => setFeaturedImage(url)}
              aspectRatio="wide"
              recommendedSize="1200 x 675px (16:9)"
              description="Upload primary hero visual for this publication."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Comma-separated Tags
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-stone-300 text-sm"
            />
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Publication Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="text-xs p-2 rounded border border-stone-300 bg-white"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="art-vis"
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
                  className="rounded text-legal-700 focus:ring-legal-700"
                />
                <label htmlFor="art-vis" className="text-xs font-semibold text-stone-700">
                  Publicly Visible
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              Publish Brief
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
