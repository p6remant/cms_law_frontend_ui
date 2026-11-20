'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  LayoutTemplate,
  FileText,
  Layers,
  Database,
  BookOpen,
  Navigation,
  MousePointerClick,
  Sliders,
  Image,
  ClipboardList,
  Search,
  Settings,
  Shield,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const pathname = usePathname();

  const navGroups = [
    {
      label: 'General',
      items: [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      label: 'Website Management',
      items: [
        { label: 'Templates & Themes', href: '/admin/templates', icon: LayoutTemplate },
        { label: 'Pages', href: '/admin/pages', icon: FileText },
        { label: 'Sections', href: '/admin/sections', icon: Layers },
        { label: 'Content', href: '/admin/content', icon: Database },
        { label: 'Blog', href: '/admin/blog', icon: BookOpen },
        { label: 'Navigation Links', href: '/admin/navigation', icon: Navigation },
        { label: 'Buttons & CTAs', href: '/admin/buttons', icon: MousePointerClick },
        { label: 'Sliders & Carousels', href: '/admin/sliders', icon: Sliders },
      ],
    },
    {
      label: 'Assets & Configuration',
      items: [
        { label: 'Media Library', href: '/admin/media', icon: Image },
        { label: 'Forms', href: '/admin/forms', icon: ClipboardList },
        { label: 'SEO', href: '/admin/seo', icon: Search },
      ],
    },
    {
      label: 'System',
      items: [
        { label: 'Website Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-legal-950 text-legal-100 border-r border-legal-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-20 px-6 border-b border-legal-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-legal-800 border border-gold-500/40 flex items-center justify-center text-gold-500">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-sm tracking-wide text-white block uppercase">
                Vanguard & Sterling
              </span>
              <span className="text-[10px] text-legal-400 uppercase tracking-widest block font-mono">
                CMS Management
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-legal-400 font-mono">
                {group.label}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-legal-800 text-gold-400 font-semibold shadow-xs border-l-2 border-gold-500'
                          : 'text-legal-300 hover:text-white hover:bg-legal-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-legal-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-gold-500/70" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Public site link */}
        <div className="p-4 border-t border-legal-800/80 bg-legal-950/60">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded bg-legal-900 hover:bg-legal-800 text-legal-200 text-xs font-medium border border-legal-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Public Live Website</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-legal-400" />
          </Link>
        </div>
      </aside>
    </>
  );
};
