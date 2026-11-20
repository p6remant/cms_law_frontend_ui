'use client';

import React, { useState } from 'react';
import { useCMS } from '@/lib/cmsStore';
import { NavigationMenu, NavigationItem } from '@/types/cms';
import { AdminBadge } from '@/components/admin/common/AdminBadge';
import { AdminSwitch } from '@/components/admin/common/AdminSwitch';
import { ConfirmModal } from '@/components/admin/common/ConfirmModal';
import { NavigationItemModal } from '@/components/admin/navigation/NavigationItemModal';
import {
  Navigation,
  Plus,
  MoveUp,
  MoveDown,
  Edit2,
  Trash2,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle,
  Smartphone,
  Monitor,
  Layers,
  FolderTree,
} from 'lucide-react';

export default function NavigationManagementPage() {
  const { menus, pages, saveMenu } = useCMS();

  const [activeMenuId, setActiveMenuId] = useState<string>(menus[0]?.id || 'nav-main');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: NavigationItem | null;
    parentId: string | null;
  }>({
    isOpen: false,
    item: null,
    parentId: null,
  });
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const currentMenu = menus.find((m) => m.id === activeMenuId) || menus[0];

  const handleToggleMenuVisibility = (checked: boolean) => {
    if (!currentMenu) return;
    saveMenu({ ...currentMenu, isVisible: checked });
  };

  const handleMoveTopLevelItem = (index: number, direction: 'up' | 'down') => {
    if (!currentMenu) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentMenu.items.length) return;

    const newItems = [...currentMenu.items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const reordered = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    saveMenu({ ...currentMenu, items: reordered });
  };

  const handleMoveChildItem = (parentId: string, childIndex: number, direction: 'up' | 'down') => {
    if (!currentMenu) return;
    const parent = currentMenu.items.find((p) => p.id === parentId);
    if (!parent || !parent.children) return;

    const targetIndex = direction === 'up' ? childIndex - 1 : childIndex + 1;
    if (targetIndex < 0 || targetIndex >= parent.children.length) return;

    const newChildren = [...parent.children];
    const temp = newChildren[childIndex];
    newChildren[childIndex] = newChildren[targetIndex];
    newChildren[targetIndex] = temp;

    const reordered = newChildren.map((item, idx) => ({ ...item, order: idx + 1 }));

    const updatedItems = currentMenu.items.map((item) =>
      item.id === parentId ? { ...item, children: reordered } : item
    );
    saveMenu({ ...currentMenu, items: updatedItems });
  };

  const handleToggleItemVisibility = (itemId: string) => {
    if (!currentMenu) return;
    const updateRecursive = (items: NavigationItem[]): NavigationItem[] => {
      return items.map((item) => {
        if (item.id === itemId) {
          return { ...item, isVisible: !item.isVisible };
        }
        if (item.children) {
          return { ...item, children: updateRecursive(item.children) };
        }
        return item;
      });
    };
    saveMenu({ ...currentMenu, items: updateRecursive(currentMenu.items) });
  };

  // Open modal for a new top-level link
  const handleAddNewItem = () => {
    setModalState({
      isOpen: true,
      item: null,
      parentId: null,
    });
  };

  // Open modal for a new child link under a specific parent
  const handleAddChildItem = (parentItemId: string) => {
    setModalState({
      isOpen: true,
      item: null,
      parentId: parentItemId,
    });
  };

  // Open modal for editing an item
  const handleEditItem = (itemToEdit: NavigationItem, currentParentId: string | null) => {
    setModalState({
      isOpen: true,
      item: itemToEdit,
      parentId: currentParentId,
    });
  };

  // Save handler with full re-parenting support
  const handleSaveItemModal = (savedItem: NavigationItem, targetParentId: string | null) => {
    if (!currentMenu) return;

    // Helper: remove item from tree by ID
    const removeItemById = (items: NavigationItem[], idToRemove: string): NavigationItem[] => {
      return items
        .filter((i) => i.id !== idToRemove)
        .map((i) => ({
          ...i,
          children: i.children ? removeItemById(i.children, idToRemove) : undefined,
        }));
    };

    // Step 1: Clean tree without this item
    let baseItems = removeItemById(currentMenu.items, savedItem.id);

    // Step 2: Insert into destination
    if (!targetParentId) {
      // Top-level item
      const itemWithOrder = {
        ...savedItem,
        order: baseItems.length + 1,
      };
      baseItems.push(itemWithOrder);
    } else {
      // Child of target parent
      baseItems = baseItems.map((parent) => {
        if (parent.id === targetParentId) {
          const children = parent.children || [];
          const itemWithOrder = {
            ...savedItem,
            order: children.length + 1,
          };
          return {
            ...parent,
            children: [...children, itemWithOrder],
          };
        }
        return parent;
      });
    }

    saveMenu({ ...currentMenu, items: baseItems });
    setModalState({ isOpen: false, item: null, parentId: null });
  };

  const handleDeleteItem = () => {
    if (!deleteTargetId || !currentMenu) return;
    const removeRecursive = (items: NavigationItem[]): NavigationItem[] => {
      return items
        .filter((i) => i.id !== deleteTargetId)
        .map((i) => ({
          ...i,
          children: i.children ? removeRecursive(i.children) : undefined,
        }));
    };
    saveMenu({ ...currentMenu, items: removeRecursive(currentMenu.items) });
    setDeleteTargetId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Navigation Management</h1>
          <p className="text-xs text-stone-500 mt-1">
            Configure header and footer menus, nested dropdowns, and independent item visibility
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNewItem}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-legal-800 hover:bg-legal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menu Link</span>
        </button>
      </div>

      {/* Menu Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        {menus.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActiveMenuId(m.id)}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
              activeMenuId === m.id
                ? 'border-legal-700 text-legal-900 bg-white rounded-t-lg border-t border-x border-stone-200 -mb-[1px]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>{m.name}</span>
            <AdminBadge variant={m.isVisible ? 'success' : 'neutral'}>
              {m.isVisible ? 'Visible' : 'Hidden'}
            </AdminBadge>
          </button>
        ))}
      </div>

      {/* Active Menu Configuration Card */}
      {currentMenu && (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">{currentMenu.name}</h3>
                <p className="text-xs text-stone-500 font-mono">Location: {currentMenu.location}</p>
              </div>

              <AdminSwitch
                label="Menu Active"
                checked={currentMenu.isVisible}
                onChange={handleToggleMenuVisibility}
              />
            </div>

            {/* Menu Items List with Nested Support */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Menu Hierarchy & Order ({currentMenu.items.length} top-level links)
                </span>
                <span className="text-[11px] text-stone-400">
                  Use ↑ ↓ to reorder items
                </span>
              </div>

              {currentMenu.items.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                  <p className="text-sm font-semibold text-stone-700 mb-1">No links in this menu</p>
                  <p className="text-xs text-stone-500 mb-4">Click below to add your first navigation link.</p>
                  <button
                    type="button"
                    onClick={handleAddNewItem}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-legal-800 text-white text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add First Link</span>
                  </button>
                </div>
              ) : (
                currentMenu.items
                  .sort((a, b) => a.order - b.order)
                  .map((item, idx) => (
                    <div key={item.id} className="space-y-2">
                      <div
                        className={`p-3.5 rounded-lg border flex items-center justify-between transition-all ${
                          item.isVisible
                            ? 'bg-stone-50/80 border-stone-200 hover:border-stone-300'
                            : 'bg-stone-100/50 border-stone-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded bg-stone-200 text-stone-600 font-mono text-[10px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-stone-900">{item.label}</span>
                              {item.isButton && (
                                <span className="px-2 py-0.5 rounded bg-gold-50 text-gold-700 border border-gold-300 text-[10px] font-semibold">
                                  Button CTA
                                </span>
                              )}
                              {item.target === '_blank' && (
                                <span className="text-[10px] text-stone-400 font-mono">
                                  [new window]
                                </span>
                              )}
                            </div>
                            <span className="text-stone-400 font-mono text-[11px] block mt-0.5">
                              {item.url}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveTopLevelItem(idx, 'up')}
                            className="p-1.5 text-stone-400 hover:text-stone-800 disabled:opacity-20 transition-colors"
                            title="Move up"
                          >
                            <MoveUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === currentMenu.items.length - 1}
                            onClick={() => handleMoveTopLevelItem(idx, 'down')}
                            className="p-1.5 text-stone-400 hover:text-stone-800 disabled:opacity-20 transition-colors"
                            title="Move down"
                          >
                            <MoveDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleItemVisibility(item.id)}
                            className="p-1.5 text-stone-400 hover:text-stone-800 transition-colors"
                            title="Toggle visibility"
                          >
                            {item.isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-stone-400" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditItem(item, null)}
                            className="p-1.5 text-stone-400 hover:text-legal-800 transition-colors"
                            title="Edit link"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddChildItem(item.id)}
                            className="px-2 py-1 rounded bg-stone-200 text-stone-700 text-[10px] font-semibold uppercase hover:bg-stone-300 transition-colors ml-1"
                            title="Add nested child dropdown item"
                          >
                            + Child
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTargetId(item.id)}
                            className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                            title="Delete link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Nested Children */}
                      {item.children && item.children.length > 0 && (
                        <div className="pl-6 space-y-2 border-l-2 border-legal-200 ml-4">
                          {item.children.map((child, childIdx) => (
                            <div
                              key={child.id}
                              className={`p-2.5 rounded-lg bg-white border flex items-center justify-between text-xs transition-all ${
                                child.isVisible ? 'border-stone-200 hover:border-stone-300' : 'border-stone-200 opacity-50'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <ChevronRight className="w-3.5 h-3.5 text-legal-600" />
                                <div>
                                  <span className="font-semibold text-stone-800">{child.label}</span>
                                  <span className="text-stone-400 font-mono text-[10px] ml-2">{child.url}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={childIdx === 0}
                                  onClick={() => handleMoveChildItem(item.id, childIdx, 'up')}
                                  className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-20"
                                  title="Move up"
                                >
                                  <MoveUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={childIdx === (item.children?.length ?? 0) - 1}
                                  onClick={() => handleMoveChildItem(item.id, childIdx, 'down')}
                                  className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-20"
                                  title="Move down"
                                >
                                  <MoveDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleToggleItemVisibility(child.id)}
                                  className="p-1 text-stone-400 hover:text-stone-800"
                                  title="Toggle visibility"
                                >
                                  {child.isVisible ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleEditItem(child, item.id)}
                                  className="p-1 text-stone-400 hover:text-legal-800"
                                  title="Edit sub-link"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteTargetId(child.id)}
                                  className="p-1 text-stone-400 hover:text-red-600"
                                  title="Delete sub-link"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Interactive Navigation Preview */}
          <div className="lg:col-span-5 bg-legal-950 p-6 rounded-xl border border-legal-800 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-legal-800 pb-3">
              <span className="text-xs font-serif font-bold text-gold-400">
                Menu Simulation Preview
              </span>
              <div className="flex items-center gap-1 bg-legal-900 p-1 rounded-md">
                <button
                  type="button"
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-1.5 rounded text-xs transition-colors ${previewMode === 'desktop' ? 'bg-legal-800 text-gold-400' : 'text-legal-400 hover:text-white'}`}
                  title="Desktop Preview"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-1.5 rounded text-xs transition-colors ${previewMode === 'mobile' ? 'bg-legal-800 text-gold-400' : 'text-legal-400 hover:text-white'}`}
                  title="Mobile Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className={`p-5 rounded-lg bg-legal-900/80 border border-legal-800 ${previewMode === 'mobile' ? 'max-w-xs mx-auto' : 'w-full'}`}>
              <div className="text-[10px] uppercase font-mono text-legal-400 mb-4 block">
                {currentMenu.isVisible ? 'Status: Active (Visible on site)' : 'Status: Hidden Menu'}
              </div>

              {currentMenu.isVisible ? (
                <div className={previewMode === 'desktop' ? 'flex flex-wrap items-center gap-3 text-xs' : 'space-y-3 text-xs'}>
                  {currentMenu.items
                    .filter((i) => i.isVisible)
                    .map((item) => (
                      <div key={item.id} className="relative group">
                        <span
                          className={`inline-block py-1.5 px-2.5 rounded cursor-default text-xs font-medium ${
                            item.isButton
                              ? 'bg-gold-500 text-legal-950 font-bold shadow-xs'
                              : 'text-legal-100 hover:text-gold-400'
                          }`}
                        >
                          {item.label}
                        </span>

                        {item.children && item.children.filter((c) => c.isVisible).length > 0 && (
                          <div className={previewMode === 'desktop' ? 'mt-1 pl-2 text-[11px] text-legal-300' : 'pl-4 pt-1 space-y-1.5'}>
                            {item.children
                              .filter((c) => c.isVisible)
                              .map((c) => (
                                <div key={c.id} className="text-legal-400 hover:text-white text-[11px]">
                                  ↳ {c.label}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-xs text-stone-500 italic">This menu is currently hidden from the public website.</p>
              )}
            </div>

            <p className="text-[11px] text-legal-400 leading-relaxed font-light">
              Hierarchical rule enforced: If an ancestor menu item is toggled hidden, its child dropdown links are automatically suppressed from public rendering.
            </p>
          </div>
        </div>
      )}

      {/* Edit / Add Link Modal */}
      <NavigationItemModal
        isOpen={modalState.isOpen}
        item={modalState.item}
        parentId={modalState.parentId}
        topLevelItems={currentMenu?.items || []}
        pages={pages}
        onSave={handleSaveItemModal}
        onClose={() => setModalState({ isOpen: false, item: null, parentId: null })}
      />

      {/* Delete Item Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteItem}
        title="Remove Menu Item"
        description="Are you sure you want to remove this navigation item and any nested child links?"
        confirmLabel="Remove Link"
        danger={true}
      />
    </div>
  );
}
