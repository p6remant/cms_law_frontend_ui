'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cmsStore';
import { MediaAsset } from '@/types/cms';
import { formatBytes, formatDate } from '@/lib/utils';
import { ConfirmModal } from '@/components/admin/common/ConfirmModal';
import {
  Image as ImageIcon,
  UploadCloud,
  Search,
  Filter,
  Grid,
  List,
  Copy,
  Trash2,
  Edit2,
  ExternalLink,
  Check,
  FileText,
  Video,
  AlertTriangle,
  X,
  Eye,
} from 'lucide-react';

export default function MediaLibraryPage() {
  const { mediaAssets, saveMedia, deleteMedia } = useCMS();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video' | 'document'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload simulation state
  const [uploadName, setUploadName] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploadType, setUploadType] = useState<'image' | 'video' | 'document'>('image');

  const filtered = mediaAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.filename.toLowerCase().includes(search.toLowerCase()) ||
      asset.altText.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleCopyUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName || !uploadUrl) return;

    const newAsset: MediaAsset = {
      id: `med-${Date.now()}`,
      name: uploadName.trim(),
      filename: uploadName.toLowerCase().replace(/\s+/g, '-') + (uploadType === 'image' ? '.jpg' : '.pdf'),
      url: uploadUrl.trim(),
      type: uploadType,
      sizeBytes: Math.floor(Math.random() * 800000) + 400000,
      dimensions: uploadType === 'image' ? { width: 1600, height: 1067 } : undefined,
      altText: uploadAlt.trim() || uploadName.trim(),
      createdAt: new Date().toISOString(),
      usedInCount: 0,
      usages: [],
    };

    saveMedia(newAsset);
    setShowUploadModal(false);
    setUploadName('');
    setUploadUrl('');
    setUploadAlt('');
  };

  const targetDeleteAsset = mediaAssets.find((a) => a.id === deleteTargetId);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Media & Asset Library</h1>
          <p className="text-xs text-stone-500 mt-1">
            Central repository for photography, executive portraits, brochures, and jurisprudence PDFs
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload / Register Asset</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by filename, name or alt text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-legal-700 bg-stone-50/50"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
            {(['all', 'image', 'document', 'video'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${
                  typeFilter === t ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center border border-stone-200 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-stone-100 text-stone-900' : 'text-stone-400'}`}
              title="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-stone-100 text-stone-900' : 'text-stone-400'}`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                {asset.type === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset.url}
                    alt={asset.altText}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-4">
                    <FileText className="w-12 h-12 text-legal-700 mb-2" />
                    <span className="text-xs uppercase font-mono">{asset.filename}</span>
                  </div>
                )}

                {asset.usedInCount !== undefined && asset.usedInCount > 0 && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-legal-950/80 text-white text-[10px] font-mono backdrop-blur-xs">
                    Used in {asset.usedInCount}
                  </span>
                )}
              </div>

              <div className="p-4">
                <h4 className="text-xs font-semibold text-stone-900 truncate" title={asset.name}>
                  {asset.name}
                </h4>
                <p className="text-[11px] text-stone-400 font-mono truncate mt-0.5">
                  {asset.filename}
                </p>

                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-3 mt-3 border-t border-stone-100">
                  <span>{formatBytes(asset.sizeBytes)}</span>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(asset)}
                      className="p-1 hover:text-stone-900"
                      title="Copy URL"
                    >
                      {copiedId === asset.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(asset.id)}
                      className="p-1 hover:text-red-600"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Media List View */
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-mono">
              <tr>
                <th className="py-3.5 px-6">Preview & File</th>
                <th className="py-3.5 px-6">Alt Text</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Size</th>
                <th className="py-3.5 px-6">Used In</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className="hover:bg-stone-50/70 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                      {asset.type === 'image' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={asset.url} alt={asset.altText} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-legal-700">
                          <FileText className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">{asset.name}</p>
                      <p className="font-mono text-stone-400 text-[11px]">{asset.filename}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-stone-600 max-w-xs truncate">
                    {asset.altText}
                  </td>
                  <td className="py-3.5 px-6 uppercase font-mono text-[11px]">
                    {asset.type}
                  </td>
                  <td className="py-3.5 px-6 text-stone-500">
                    {formatBytes(asset.sizeBytes)}
                  </td>
                  <td className="py-3.5 px-6">
                    {asset.usedInCount && asset.usedInCount > 0 ? (
                      <span className="px-2 py-0.5 rounded bg-legal-50 text-legal-800 font-medium">
                        {asset.usedInCount} places
                      </span>
                    ) : (
                      <span className="text-stone-400">Unused</span>
                    )}
                  </td>
                  <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(asset)}
                        className="p-1 hover:text-stone-900 text-stone-500"
                        title="Copy URL"
                      >
                        {copiedId === asset.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(asset.id)}
                        className="p-1 hover:text-red-600 text-stone-400"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Asset Detail / Inspector Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-stone-200">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-stone-900">Asset Metadata & Usage</h3>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="aspect-[16/9] rounded-lg bg-stone-100 overflow-hidden border border-stone-200 flex items-center justify-center">
                {selectedAsset.type === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selectedAsset.url} alt={selectedAsset.altText} className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-16 h-16 text-legal-700" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block font-mono">FILE NAME:</span>
                  <span className="font-semibold text-stone-900">{selectedAsset.filename}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-mono">FILE SIZE:</span>
                  <span className="font-semibold text-stone-900">{formatBytes(selectedAsset.sizeBytes)}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-mono">DIMENSIONS:</span>
                  <span className="font-semibold text-stone-900">
                    {selectedAsset.dimensions ? `${selectedAsset.dimensions.width} × ${selectedAsset.dimensions.height} px` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block font-mono">CREATED:</span>
                  <span className="font-semibold text-stone-900">{formatDate(selectedAsset.createdAt)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Accessible Alt Text (Screen Readers)
                </label>
                <input
                  type="text"
                  value={selectedAsset.altText}
                  onChange={(e) => setSelectedAsset({ ...selectedAsset, altText: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Public Resource URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedAsset.url}
                    className="w-full px-3 py-2 text-xs rounded border border-stone-200 bg-stone-50 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(selectedAsset)}
                    className="px-3 py-2 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Usage references (Section 10) */}
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-1">
                  Content References:
                </span>
                <p className="text-xs text-stone-600">
                  {selectedAsset.usedInCount && selectedAsset.usedInCount > 0
                    ? `Currently referenced in ${selectedAsset.usedInCount} published pages and firm sections.`
                    : 'This asset is currently unreferenced. It is safe to archive or delete.'}
                </p>
              </div>
            </div>

            <div className="bg-stone-50 px-6 py-4 flex items-center justify-between border-t border-stone-200">
              <button
                type="button"
                onClick={() => {
                  setDeleteTargetId(selectedAsset.id);
                  setSelectedAsset(null);
                }}
                className="text-xs font-semibold uppercase text-red-600 hover:text-red-700"
              >
                Delete Asset
              </button>
              <button
                type="button"
                onClick={() => {
                  saveMedia(selectedAsset);
                  setSelectedAsset(null);
                }}
                className="px-5 py-2 rounded bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Save Metadata
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200">
            <form onSubmit={handleUploadSubmit}>
              <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-stone-900">Upload / Register Asset</h3>
                <button type="button" onClick={() => setShowUploadModal(false)} className="text-stone-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Asset Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New York Federal Courthouse Entrance"
                    value={uploadName}
                    onChange={(e) => setUploadName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Asset Type
                  </label>
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm rounded border border-stone-300 bg-white"
                  >
                    <option value="image">Photography / Image (JPG/PNG/WebP)</option>
                    <option value="document">Legal Document / Brief (PDF)</option>
                    <option value="video">Conference / Oral Argument Video (MP4)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Select File From Device or Paste URL
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (!uploadName) {
                            setUploadName(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
                          }
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            setUploadUrl(ev.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full text-xs file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-legal-800 file:text-white hover:file:bg-legal-700 text-stone-600 border border-stone-300 rounded p-1"
                    />

                    <input
                      type="text"
                      required
                      placeholder="Or paste external URL (https://images.unsplash.com/...)"
                      value={uploadUrl}
                      onChange={(e) => setUploadUrl(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Alt Text (Accessibility)
                  </label>
                  <input
                    type="text"
                    placeholder="Descriptive alt text for screen readers..."
                    value={uploadAlt}
                    onChange={(e) => setUploadAlt(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded border border-stone-300"
                  />
                </div>
              </div>

              <div className="bg-stone-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-legal-800 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Register Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation (Section 10: Warn if referenced by content) */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deleteMedia(deleteTargetId);
        }}
        title="Confirm Asset Deletion"
        description={
          targetDeleteAsset?.usedInCount && targetDeleteAsset.usedInCount > 0
            ? `WARNING: "${targetDeleteAsset.name}" is currently referenced by ${targetDeleteAsset.usedInCount} section(s). Deleting it will cause broken image links on live pages.`
            : `Are you sure you want to permanently delete "${targetDeleteAsset?.name}"?`
        }
        confirmLabel="Delete Asset"
        danger={true}
      />
    </div>
  );
}
