'use client';

import React from 'react';
import { GallerySectionContent, SectionSettings } from '@/types/cms';

interface GalleryProps {
  content: GallerySectionContent;
  settings?: SectionSettings;
}

export const GallerySection: React.FC<GalleryProps> = ({ content }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#fbfbfa] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(content.title || content.eyebrow) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {content.eyebrow && (
              <span className="text-xs font-semibold tracking-widest text-legal-700 uppercase font-sans mb-3 block">
                {content.eyebrow}
              </span>
            )}
            {content.title && (
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-legal-950 tracking-tight">
                {content.title}
              </h2>
            )}
            {content.description && (
              <p className="mt-4 text-gray-600 text-lg font-light leading-relaxed">
                {content.description}
              </p>
            )}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.images && content.images.map((img, idx) => (
            <div
              key={idx}
              className="group relative rounded-lg overflow-hidden border border-stone-200 shadow-sm aspect-[4/3] bg-stone-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt || 'Gallery photo'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {img.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-legal-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-xs text-white font-medium">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
