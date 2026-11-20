'use client';

import React, { useRef, useState } from 'react';
import { useCMS } from '@/lib/cmsStore';
import { MediaAsset } from '@/types/cms';
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  FolderOpen,
  Link as LinkIcon,
  X,
  Check,
} from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  description?: string;
  recommendedSize?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'wide' | 'square' | 'auto';
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  onRemove,
  description,
  recommendedSize,
  aspectRatio = 'auto',
  className = '',
}) => {
  const { mediaAssets, saveMedia } = useCMS();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');

  // Handle local file selection
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, or SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return;

      // Automatically register asset in central Media Library
      const assetName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const newAsset: MediaAsset = {
        id: `med-${Date.now()}`,
        name: assetName,
        filename: file.name,
        url: dataUrl,
        type: 'image',
        sizeBytes: file.size,
        altText: assetName,
        createdAt: new Date().toISOString(),
        usedInCount: 1,
      };

      try {
        saveMedia(newAsset);
      } catch (err) {
        console.warn('Could not auto-sync media asset to localStorage:', err);
      }

      onChange(dataUrl);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
  };

  const handleSelectFromLibrary = (asset: MediaAsset) => {
    onChange(asset.url);
    setShowLibraryModal(false);
  };

  const handleApplyUrl = () => {
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
      setUrlInputValue('');
      setShowUrlFallback(false);
    }
  };

  // Aspect ratio class resolution
  const aspectClass =
    aspectRatio === 'portrait'
      ? 'aspect-[4/5] max-w-[200px]'
      : aspectRatio === 'wide'
      ? 'aspect-[16/9] max-w-[340px]'
      : aspectRatio === 'landscape'
      ? 'aspect-[4/3] max-w-[280px]'
      : aspectRatio === 'square'
      ? 'aspect-square max-w-[180px]'
      : 'max-h-48 w-auto';

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label and Recommended Sizing */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
          {label}
        </label>
        {recommendedSize && (
          <span className="text-[10px] text-stone-400 font-mono">
            Rec: {recommendedSize}
          </span>
        )}
      </div>

      {description && (
        <p className="text-[11px] text-stone-500 leading-normal">{description}</p>
      )}

      {/* Hidden native file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />

      {/* STATE 1: IMAGE ALREADY PRESENT (PREVIEW + CONTROLS) */}
      {value ? (
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
          <div className="flex items-start gap-3">
            {/* Live Thumbnail Preview */}
            <div
              className={`relative rounded-lg overflow-hidden bg-stone-100 border border-stone-300 shrink-0 shadow-xs ${aspectClass}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt={label} className="w-full h-full object-cover" />
            </div>

            {/* Quick action buttons */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-300 shadow-2xs transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-legal-700" />
                  <span>Replace File</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowLibraryModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-300 shadow-2xs transition-colors"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-blue-700" />
                  <span>From Library</span>
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-red-50 text-red-600 text-xs font-semibold border border-stone-300 hover:border-red-300 shadow-2xs transition-colors"
                  title="Remove Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="text-[10px] text-stone-400 font-mono truncate max-w-md pt-1">
                {value.startsWith('data:') ? 'Local uploaded file (stored in browser)' : value}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* STATE 2: EMPTY STATE (CLEAN DROPZONE / UPLOAD PROMPT) */
        <div className="space-y-2">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-6 border-2 border-dashed rounded-xl cursor-pointer text-center transition-all ${
              isDragging
                ? 'border-legal-700 bg-legal-50/70 ring-2 ring-legal-700/20'
                : 'border-stone-300 hover:border-legal-600 bg-stone-50/60 hover:bg-stone-50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white border border-stone-200 text-legal-800 flex items-center justify-center mx-auto mb-2 shadow-2xs">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-stone-800">
              Click to upload image <span className="font-normal text-stone-500">or drag and drop</span>
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              Supports PNG, JPG, WEBP, or SVG
            </p>
          </div>

          {/* Secondary Options: From Media Library or Direct Link */}
          <div className="flex items-center justify-between text-xs pt-1 px-1">
            <button
              type="button"
              onClick={() => setShowLibraryModal(true)}
              className="inline-flex items-center gap-1.5 text-legal-800 hover:text-legal-950 font-semibold text-xs"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Choose from Media Library</span>
            </button>

            <button
              type="button"
              onClick={() => setShowUrlFallback(!showUrlFallback)}
              className="text-stone-500 hover:text-stone-800 inline-flex items-center gap-1 text-[11px]"
            >
              <LinkIcon className="w-3 h-3" />
              <span>{showUrlFallback ? 'Hide URL input' : 'Paste web URL'}</span>
            </button>
          </div>

          {/* Direct URL Input Fallback */}
          {showUrlFallback && (
            <div className="p-3 bg-white rounded-lg border border-stone-200 flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                value={urlInputValue}
                onChange={(e) => setUrlInputValue(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded border border-stone-300 font-mono focus:outline-none focus:ring-1 focus:ring-legal-700"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-1.5 rounded bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}

      {/* SELECT FROM MEDIA LIBRARY MODAL */}
      {showLibraryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200 flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-legal-800" />
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Select Image from Media Library
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowLibraryModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto">
              {mediaAssets.filter((a) => a.type === 'image').length === 0 ? (
                <div className="p-12 text-center text-stone-400 text-xs">
                  No images found in your Media Library. Upload an image above to populate the library.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {mediaAssets
                    .filter((a) => a.type === 'image')
                    .map((asset) => {
                      const isCurrentlySelected = value === asset.url;
                      return (
                        <div
                          key={asset.id}
                          onClick={() => handleSelectFromLibrary(asset)}
                          className={`group relative rounded-lg overflow-hidden border cursor-pointer transition-all aspect-[4/3] bg-stone-100 ${
                            isCurrentlySelected
                              ? 'border-legal-700 ring-2 ring-legal-700'
                              : 'border-stone-200 hover:border-legal-600 shadow-2xs'
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white">
                            <p className="text-[11px] font-semibold truncate leading-tight">
                              {asset.name}
                            </p>
                          </div>

                          {isCurrentlySelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-legal-800 text-white flex items-center justify-center shadow-xs">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                {mediaAssets.filter((a) => a.type === 'image').length} available photos
              </span>
              <button
                type="button"
                onClick={() => setShowLibraryModal(false)}
                className="px-4 py-1.5 rounded bg-stone-200 text-stone-700 font-semibold hover:bg-stone-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
