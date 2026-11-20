'use client';

import { useState, useEffect } from 'react';
import {
  Page,
  PageSection,
  NavigationMenu,
  NavigationItem,
  BlogArticle,
  MediaAsset,
  FormDefinition,
  ButtonConfig,
  SliderConfig,
  ContentRecord,
  WebsiteSettings,
} from '@/types/cms';
import {
  initialPages,
  initialNavigationMenus,
  initialBlogArticles,
  initialMediaAssets,
  initialForms,
  initialButtons,
  initialSliders,
  initialContentRecords,
  initialWebsiteSettings,
} from '@/lib/initialData';

const STORAGE_KEYS = {
  PAGES: 'lawfirm_cms_pages_v4',
  MENUS: 'lawfirm_cms_menus_v1',
  BLOG: 'lawfirm_cms_blog_v1',
  MEDIA: 'lawfirm_cms_media_v1',
  FORMS: 'lawfirm_cms_forms_v1',
  BUTTONS: 'lawfirm_cms_buttons_v1',
  SLIDERS: 'lawfirm_cms_sliders_v1',
  CONTENT: 'lawfirm_cms_content_v1',
  SETTINGS: 'lawfirm_cms_settings_v1',
};

// Safe SSR / Client storage accessor
function getStoredItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    const parsed = JSON.parse(item);
    // Migration: ensure homepage has Senior Partners card carousel and no institutional showcase
    if (key === STORAGE_KEYS.PAGES && Array.isArray(parsed)) {
      const homePage = parsed.find((p: any) => p.id === 'page-home');
      if (homePage) {
        // Remove institutional showcase if present
        homePage.sections = homePage.sections.filter((s: any) => s.id !== 'sec-home-carousel');

        // Ensure partner section has all 6 partners and carousel controls
        const partnersSec = homePage.sections.find((s: any) => s.type === 'partners');
        const initialHome = (defaultValue as any[]).find((p: any) => p.id === 'page-home');
        const initialPartners = initialHome?.sections?.find((s: any) => s.type === 'partners');

        if (partnersSec && initialPartners) {
          partnersSec.content = {
            ...partnersSec.content,
            autoplay: true,
            interval: 4500,
            showArrows: true,
            showDots: true,
            items: initialPartners.content.items,
          };
        }
        window.localStorage.setItem(key, JSON.stringify(parsed));
      }
    }
    return parsed;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // Trigger custom event so other components update synchronously
    window.dispatchEvent(new Event('cms-storage-update'));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
  }
}

export function useCMS() {
  const [pages, setPages] = useState<Page[]>(() => getStoredItem(STORAGE_KEYS.PAGES, initialPages));
  const [menus, setMenus] = useState<NavigationMenu[]>(() => getStoredItem(STORAGE_KEYS.MENUS, initialNavigationMenus));
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>(() => getStoredItem(STORAGE_KEYS.BLOG, initialBlogArticles));
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => getStoredItem(STORAGE_KEYS.MEDIA, initialMediaAssets));
  const [forms, setForms] = useState<FormDefinition[]>(() => getStoredItem(STORAGE_KEYS.FORMS, initialForms));
  const [buttons, setButtons] = useState<ButtonConfig[]>(() => getStoredItem(STORAGE_KEYS.BUTTONS, initialButtons));
  const [sliders, setSliders] = useState<SliderConfig[]>(() => getStoredItem(STORAGE_KEYS.SLIDERS, initialSliders));
  const [contentRecords, setContentRecords] = useState<ContentRecord[]>(() => getStoredItem(STORAGE_KEYS.CONTENT, initialContentRecords));
  const [settings, setSettings] = useState<WebsiteSettings>(() => getStoredItem(STORAGE_KEYS.SETTINGS, initialWebsiteSettings));
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshFromStorage = () => {
    setPages(getStoredItem(STORAGE_KEYS.PAGES, initialPages));
    setMenus(getStoredItem(STORAGE_KEYS.MENUS, initialNavigationMenus));
    setBlogArticles(getStoredItem(STORAGE_KEYS.BLOG, initialBlogArticles));
    setMediaAssets(getStoredItem(STORAGE_KEYS.MEDIA, initialMediaAssets));
    setForms(getStoredItem(STORAGE_KEYS.FORMS, initialForms));
    setButtons(getStoredItem(STORAGE_KEYS.BUTTONS, initialButtons));
    setSliders(getStoredItem(STORAGE_KEYS.SLIDERS, initialSliders));
    setContentRecords(getStoredItem(STORAGE_KEYS.CONTENT, initialContentRecords));
    setSettings(getStoredItem(STORAGE_KEYS.SETTINGS, initialWebsiteSettings));
  };

  useEffect(() => {
    refreshFromStorage();
    setIsLoaded(true);

    const handleStorageChange = () => {
      refreshFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cms-storage-update', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cms-storage-update', handleStorageChange);
    };
  }, []);

  // --- PAGES ACTIONS ---
  const savePage = (pageToSave: Page) => {
    const updated = pages.map((p) => (p.id === pageToSave.id ? { ...pageToSave, updatedAt: new Date().toISOString() } : p));
    if (!pages.some((p) => p.id === pageToSave.id)) {
      updated.push({
        ...pageToSave,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    setPages(updated);
    setStoredItem(STORAGE_KEYS.PAGES, updated);
  };

  const deletePage = (id: string) => {
    const updated = pages.filter((p) => p.id !== id);
    setPages(updated);
    setStoredItem(STORAGE_KEYS.PAGES, updated);
  };

  const duplicatePage = (id: string) => {
    const target = pages.find((p) => p.id === id);
    if (!target) return null;
    const newId = `page-${Date.now()}`;
    const newPage: Page = {
      ...target,
      id: newId,
      title: `${target.title} (Copy)`,
      slug: `${target.slug ? target.slug + '-copy' : 'copy-' + Date.now()}`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sections: target.sections.map((s) => ({
        ...s,
        id: `sec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      })),
    };
    savePage(newPage);
    return newPage;
  };

  const togglePageVisibility = (id: string) => {
    const target = pages.find((p) => p.id === id);
    if (!target) return;
    savePage({ ...target, isVisible: !target.isVisible });
  };

  const togglePagePublish = (id: string) => {
    const target = pages.find((p) => p.id === id);
    if (!target) return;
    const newStatus = target.status === 'published' ? 'draft' : 'published';
    savePage({ ...target, status: newStatus });
  };

  // --- BLOG ARTICLES ACTIONS ---
  const saveArticle = (articleToSave: BlogArticle) => {
    const updated = blogArticles.map((a) => (a.id === articleToSave.id ? { ...articleToSave, updatedAt: new Date().toISOString() } : a));
    if (!blogArticles.some((a) => a.id === articleToSave.id)) {
      updated.unshift({
        ...articleToSave,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    setBlogArticles(updated);
    setStoredItem(STORAGE_KEYS.BLOG, updated);
  };

  const deleteArticle = (id: string) => {
    const updated = blogArticles.filter((a) => a.id !== id);
    setBlogArticles(updated);
    setStoredItem(STORAGE_KEYS.BLOG, updated);
  };

  const toggleArticleVisibility = (id: string) => {
    const target = blogArticles.find((a) => a.id === id);
    if (!target) return;
    saveArticle({ ...target, isVisible: !target.isVisible });
  };

  const toggleArticlePublish = (id: string) => {
    const target = blogArticles.find((a) => a.id === id);
    if (!target) return;
    const newStatus = target.status === 'published' ? 'draft' : 'published';
    saveArticle({ ...target, status: newStatus });
  };

  // --- NAVIGATION MENUS ---
  const saveMenu = (menuToSave: NavigationMenu) => {
    const updated = menus.map((m) => (m.id === menuToSave.id ? menuToSave : m));
    if (!menus.some((m) => m.id === menuToSave.id)) {
      updated.push(menuToSave);
    }
    setMenus(updated);
    setStoredItem(STORAGE_KEYS.MENUS, updated);
  };

  const toggleMenuVisibility = (id: string) => {
    const target = menus.find((m) => m.id === id);
    if (!target) return;
    saveMenu({ ...target, isVisible: !target.isVisible });
  };

  // --- MEDIA ASSETS ---
  const saveMedia = (asset: MediaAsset) => {
    const updated = mediaAssets.map((m) => (m.id === asset.id ? asset : m));
    if (!mediaAssets.some((m) => m.id === asset.id)) {
      updated.unshift(asset);
    }
    setMediaAssets(updated);
    setStoredItem(STORAGE_KEYS.MEDIA, updated);
  };

  const deleteMedia = (id: string) => {
    const updated = mediaAssets.filter((m) => m.id !== id);
    setMediaAssets(updated);
    setStoredItem(STORAGE_KEYS.MEDIA, updated);
  };

  // --- FORMS ---
  const saveForm = (formToSave: FormDefinition) => {
    const updated = forms.map((f) => (f.id === formToSave.id ? formToSave : f));
    if (!forms.some((f) => f.id === formToSave.id)) {
      updated.push(formToSave);
    }
    setForms(updated);
    setStoredItem(STORAGE_KEYS.FORMS, updated);
  };

  const deleteForm = (id: string) => {
    const updated = forms.filter((f) => f.id !== id);
    setForms(updated);
    setStoredItem(STORAGE_KEYS.FORMS, updated);
  };

  // --- BUTTONS ---
  const saveButton = (btnToSave: ButtonConfig) => {
    const updated = buttons.map((b) => (b.id === btnToSave.id ? btnToSave : b));
    if (!buttons.some((b) => b.id === btnToSave.id)) {
      updated.push(btnToSave);
    }
    setButtons(updated);
    setStoredItem(STORAGE_KEYS.BUTTONS, updated);
  };

  const deleteButton = (id: string) => {
    const updated = buttons.filter((b) => b.id !== id);
    setButtons(updated);
    setStoredItem(STORAGE_KEYS.BUTTONS, updated);
  };

  // --- SLIDERS ---
  const saveSlider = (sliderToSave: SliderConfig) => {
    const updated = sliders.map((s) => (s.id === sliderToSave.id ? sliderToSave : s));
    if (!sliders.some((s) => s.id === sliderToSave.id)) {
      updated.push(sliderToSave);
    }
    setSliders(updated);
    setStoredItem(STORAGE_KEYS.SLIDERS, updated);
  };

  const deleteSlider = (id: string) => {
    const updated = sliders.filter((s) => s.id !== id);
    setSliders(updated);
    setStoredItem(STORAGE_KEYS.SLIDERS, updated);
  };

  // --- CONTENT RECORDS ---
  const saveContentRecord = (rec: ContentRecord) => {
    const updated = contentRecords.map((c) => (c.id === rec.id ? rec : c));
    if (!contentRecords.some((c) => c.id === rec.id)) {
      updated.push(rec);
    }
    setContentRecords(updated);
    setStoredItem(STORAGE_KEYS.CONTENT, updated);
  };

  const deleteContentRecord = (id: string) => {
    const updated = contentRecords.filter((c) => c.id !== id);
    setContentRecords(updated);
    setStoredItem(STORAGE_KEYS.CONTENT, updated);
  };

  // --- SETTINGS ---
  const saveSettings = (newSettings: WebsiteSettings) => {
    setSettings(newSettings);
    setStoredItem(STORAGE_KEYS.SETTINGS, newSettings);
  };

  // Reset all to defaults
  const resetToFactoryDefaults = () => {
    setPages(initialPages);
    setStoredItem(STORAGE_KEYS.PAGES, initialPages);
    setMenus(initialNavigationMenus);
    setStoredItem(STORAGE_KEYS.MENUS, initialNavigationMenus);
    setBlogArticles(initialBlogArticles);
    setStoredItem(STORAGE_KEYS.BLOG, initialBlogArticles);
    setMediaAssets(initialMediaAssets);
    setStoredItem(STORAGE_KEYS.MEDIA, initialMediaAssets);
    setForms(initialForms);
    setStoredItem(STORAGE_KEYS.FORMS, initialForms);
    setButtons(initialButtons);
    setStoredItem(STORAGE_KEYS.BUTTONS, initialButtons);
    setSliders(initialSliders);
    setStoredItem(STORAGE_KEYS.SLIDERS, initialSliders);
    setContentRecords(initialContentRecords);
    setStoredItem(STORAGE_KEYS.CONTENT, initialContentRecords);
    setSettings(initialWebsiteSettings);
    setStoredItem(STORAGE_KEYS.SETTINGS, initialWebsiteSettings);
  };

  // Effective Visibility Checks (as specified in Section 16 of implementation plan)
  const isEffectiveWebsiteEnabled = settings.isEnabled;

  const isEffectivePageVisible = (page: Page): boolean => {
    if (!isEffectiveWebsiteEnabled) return false;
    if (page.status !== 'published') return false;
    return page.isVisible;
  };

  const isEffectiveSectionVisible = (section: PageSection, page: Page): boolean => {
    if (!isEffectivePageVisible(page)) return false;
    return section.isVisible;
  };

  const isEffectiveMenuVisible = (menu: NavigationMenu): boolean => {
    if (!isEffectiveWebsiteEnabled) return false;
    return menu.isVisible;
  };

  const isEffectiveMenuItemVisible = (item: NavigationItem, menu: NavigationMenu, parentVisible: boolean = true): boolean => {
    if (!isEffectiveMenuVisible(menu)) return false;
    if (!parentVisible) return false;
    return item.isVisible;
  };

  return {
    isLoaded,
    pages,
    menus,
    blogArticles,
    mediaAssets,
    forms,
    buttons,
    sliders,
    contentRecords,
    settings,
    // Page ops
    savePage,
    deletePage,
    duplicatePage,
    togglePageVisibility,
    togglePagePublish,
    // Blog ops
    saveArticle,
    deleteArticle,
    toggleArticleVisibility,
    toggleArticlePublish,
    // Nav ops
    saveMenu,
    toggleMenuVisibility,
    // Media ops
    saveMedia,
    deleteMedia,
    // Form ops
    saveForm,
    deleteForm,
    // Button ops
    saveButton,
    deleteButton,
    // Slider ops
    saveSlider,
    deleteSlider,
    // Content ops
    saveContentRecord,
    deleteContentRecord,
    // Settings ops
    saveSettings,
    resetToFactoryDefaults,
    // Hierarchical visibility checks
    isEffectiveWebsiteEnabled,
    isEffectivePageVisible,
    isEffectiveSectionVisible,
    isEffectiveMenuVisible,
    isEffectiveMenuItemVisible,
  };
}
