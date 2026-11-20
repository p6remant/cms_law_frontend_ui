'use client';

import React, { useState, useEffect } from 'react';
import { NavigationItem, Page } from '@/types/cms';
import { Link as LinkIcon, X, ExternalLink, Hash, FolderTree, Sparkles } from 'lucide-react';

interface NavigationItemModalProps {
  isOpen: boolean;
  item: NavigationItem | null;
  parentId: string | null;
  topLevelItems: NavigationItem[];
  pages: Page[];
  onSave: (item: NavigationItem, targetParentId: string | null) => void;
  onClose: () => void;
}

export const NavigationItemModal: React.FC<NavigationItemModalProps> = ({
  isOpen,
  item,
  parentId,
  topLevelItems,
  pages,
  onSave,
  onClose,
}) => {
  const isEditing = Boolean(item && item.label);

  const [label, setLabel] = useState('');
  const [type, setType] = useState<'page' | 'external' | 'custom'>('page');
  const [url, setUrl] = useState('');
  const [targetParentId, setTargetParentId] = useState<string | null>(parentId);
  const [isButton, setIsButton] = useState(false);
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Initialize or reset when modal opens or item changes
  useEffect(() => {
    if (isOpen) {
      if (item) {
        setLabel(item.label ?? '');
        setType(item.type ?? 'page');
        setUrl(item.url ?? '');
        setIsButton(Boolean(item.isButton));
        setOpenInNewTab(item.target === '_blank');
        setIsVisible(item.isVisible !== false);
      } else {
        const defaultPage = pages[0];
        setLabel(defaultPage ? defaultPage.title : '');
        setType('page');
        setUrl(defaultPage ? `/${defaultPage.slug}` : '/');
        setIsButton(false);
        setOpenInNewTab(false);
        setIsVisible(true);
      }
      setTargetParentId(parentId);
    }
  }, [isOpen, item, parentId, pages]);

  if (!isOpen) return null;

  // When changing CMS page, auto-suggest label if empty or previously matched a page title
  const handlePageSelect = (pageSlug: string) => {
    const selectedPage = pages.find((p) => `/${p.slug}` === pageSlug);
    const newUrl = selectedPage ? `/${selectedPage.slug}` : pageSlug;
    setUrl(newUrl);

    // If current label is empty or matches one of the existing pages' title, auto-sync
    const matchesAnyPage = pages.some((p) => p.title.toLowerCase() === label.trim().toLowerCase());
    if (!label.trim() || matchesAnyPage) {
      if (selectedPage) {
        setLabel(selectedPage.title);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !url.trim()) return;

    const savedItem: NavigationItem = {
      id: item?.id || `nav-${Date.now()}`,
      label: label.trim(),
      type,
      url: url.trim(),
      order: item?.order || 1,
      isVisible,
      isButton,
      target: openInNewTab ? '_blank' : '_self',
      children: item?.children,
    };

    onSave(savedItem, targetParentId);
  };

  // Filter out the item itself from potential parents to prevent recursive loops
  const eligibleParents = topLevelItems.filter((i) => i.id !== item?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-legal-800" />
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {isEditing ? 'Edit Navigation Link' : 'Add Navigation Link'}
                </h3>
                <p className="text-[11px] text-stone-500">
                  {targetParentId ? 'Configuring nested dropdown sub-menu item' : 'Configuring primary navigation link'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-5 overflow-y-auto flex-1">
            {/* Placement in Menu Hierarchy */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                <FolderTree className="w-3.5 h-3.5 text-stone-500" />
                <span>Menu Placement</span>
              </label>
              <select
                value={targetParentId || '__root__'}
                onChange={(e) => setTargetParentId(e.target.value === '__root__' ? null : e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-legal-700"
              >
                <option value="__root__">Top-Level Link (Main Navigation Bar)</option>
                {eligibleParents.length > 0 && (
                  <optgroup label="Place inside Dropdown Menu">
                    {eligibleParents.map((parent) => (
                      <option key={parent.id} value={parent.id}>
                        ↳ Sub-item under: &quot;{parent.label}&quot;
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
              <p className="text-[11px] text-stone-400 mt-1">
                Choose whether this link sits on the top bar or appears in a hover dropdown.
              </p>
            </div>

            {/* Destination Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Link Destination Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setType('page')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                    type === 'page'
                      ? 'bg-legal-900 text-white border-legal-900 shadow-xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  CMS Page
                </button>
                <button
                  type="button"
                  onClick={() => setType('external')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center flex items-center justify-center gap-1 ${
                    type === 'external'
                      ? 'bg-legal-900 text-white border-legal-900 shadow-xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>External URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('custom')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center flex items-center justify-center gap-1 ${
                    type === 'custom'
                      ? 'bg-legal-900 text-white border-legal-900 shadow-xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Hash className="w-3 h-3" />
                  <span>Anchor / Hash</span>
                </button>
              </div>
            </div>

            {/* Destination Selector or Input */}
            {type === 'page' ? (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Select Target CMS Page
                </label>
                <select
                  value={url}
                  onChange={(e) => handlePageSelect(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-legal-700"
                >
                  {pages.map((p) => (
                    <option key={p.id} value={`/${p.slug}`}>
                      {p.title} (/{p.slug})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-stone-400 mt-1">
                  Selecting a page automatically populates the link label below.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  {type === 'external' ? 'External URL' : 'Anchor / Hash Target'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={type === 'external' ? 'https://example.com/portal' : '#consultation'}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-legal-700"
                />
              </div>
            )}

            {/* Link Label */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Link Display Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Practice Areas, About Us, Contact"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-legal-700"
              />
            </div>

            {/* Options */}
            <div className="pt-2 border-t border-stone-100 space-y-3">
              <label className="flex items-center gap-2.5 text-xs font-medium text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isButton}
                  onChange={(e) => setIsButton(e.target.checked)}
                  className="rounded text-legal-700 focus:ring-legal-700"
                />
                <span>Highlight as Call-to-Action Button (Gold styling)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={openInNewTab}
                  onChange={(e) => setOpenInNewTab(e.target.checked)}
                  className="rounded text-legal-700 focus:ring-legal-700"
                />
                <span>Open in new browser window/tab (target=&quot;_blank&quot;)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
                  className="rounded text-legal-700 focus:ring-legal-700"
                />
                <span>Visible in live navigation</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-stone-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              {isEditing ? 'Save Changes' : 'Add Link to Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
